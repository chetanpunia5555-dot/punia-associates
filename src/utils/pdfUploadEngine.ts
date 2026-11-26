import { PDFDocument } from 'pdf-lib';

export type PdfCompressionMode = 'smart' | 'extreme' | 'none';

export interface PdfCompressionResult {
  file: File;
  originalBytes: number;
  compressedBytes: number;
  savedBytes: number;
  savedPercent: number;
  pageCount: number;
  wasCompressed: boolean;
}

export interface ChunkUploadProgress {
  phase: 'COMPRESSING' | 'UPLOADING_CHUNKS' | 'FINALIZING';
  fileName: string;
  fileIndex: number;
  totalFiles: number;
  chunkIndex: number;
  totalChunks: number;
  uploadedBytes: number;
  totalBytes: number;
  percent: number;
  speedMBps: number;
  originalBytes: number;
  compressedBytes: number;
  savedPercent: number;
}

export interface ChunkUploadOptions {
  resourceCategory?: string;
  compressionMode?: PdfCompressionMode;
  autoCommit?: boolean;
  title?: string;
  jurisdiction?: string;
  year?: string;
  author?: string;
  summary?: string;
  fileIndex?: number;
  totalFiles?: number;
  onProgress?: (progress: ChunkUploadProgress) => void;
  shouldAbort?: () => boolean;
}

// 4 MB chunk size safely bypasses Google Cloud Run's 32 MB HTTP/1.1 request limit
export const CHUNK_SIZE_BYTES = 4 * 1024 * 1024; // 4 MB
export const MAX_SINGLE_FILE_BYTES = 500 * 1024 * 1024; // 500 MB
export const MAX_BATCH_TOTAL_BYTES = 2048 * 1024 * 1024; // 2 GB (2,048 MB)
export const MAX_FILES_PER_BATCH = 300;

export function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 KB';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Client-side PDF Size Shortener & Structural Optimizer (modeled after iLovePDF / Smallpdf / PDF24).
 * Strips redundant XMP/XML metadata, pieceInfo, thumbnails, and re-packs PDF objects into
 * compressed PDF 1.5+ Object Streams (FlateDecode) without degrading legal text clarity.
 */
export async function compressPdfClientSide(
  file: File,
  mode: PdfCompressionMode = 'smart'
): Promise<PdfCompressionResult> {
  const originalBytes = file.size;

  const isPdf =
    file.name.toLowerCase().endsWith('.pdf') ||
    file.type === 'application/pdf';

  if (!isPdf || mode === 'none') {
    return {
      file,
      originalBytes,
      compressedBytes: originalBytes,
      savedBytes: 0,
      savedPercent: 0,
      pageCount: 1,
      wasCompressed: false
    };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: false
    });

    const pageCount = pdfDoc.getPageCount();

    // Strip redundant document metadata bloat
    try {
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');
    } catch {
      // ignore read-only metadata dictionaries
    }

    // In 'extreme' or 'smart' mode, clean heavy non-printable catalog keys (XMP Metadata, PieceInfo, Thumbnails)
    try {
      const catalogDict = (pdfDoc as any).catalog?.dict;
      if (catalogDict && typeof catalogDict.delete === 'function') {
        const pdfName = (pdfDoc as any).context?.obj;
        if (pdfName) {
          catalogDict.delete(pdfName('PieceInfo'));
          catalogDict.delete(pdfName('Metadata'));
          if (mode === 'extreme') {
            catalogDict.delete(pdfName('Perms'));
            catalogDict.delete(pdfName('SpiderInfo'));
            catalogDict.delete(pdfName('OutputIntents'));
          }
        }
      }

      // Remove embedded page thumbnail bitmaps (/Thumb) and pieceInfo from individual pages
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const pageNode = (page as any).node;
        if (pageNode && typeof pageNode.delete === 'function' && (pdfDoc as any).context?.obj) {
          const objFn = (pdfDoc as any).context.obj.bind((pdfDoc as any).context);
          pageNode.delete(objFn('Thumb'));
          pageNode.delete(objFn('PieceInfo'));
          if (mode === 'extreme') {
            pageNode.delete(objFn('Annots'));
          }
        }
      }
    } catch {
      // ignore low-level dictionary cleanup warnings
    }

    // Re-serialize using compressed PDF 1.5 Object Streams
    const compressedUint8 = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 100
    });

    // Keep the compressed buffer only if it is actually smaller than the original
    if (compressedUint8.byteLength < originalBytes) {
      const compressedBlob = new Blob([compressedUint8 as unknown as BlobPart], { type: 'application/pdf' });
      const compressedFile = new File([compressedBlob], file.name, {
        type: 'application/pdf',
        lastModified: Date.now()
      });
      const savedBytes = originalBytes - compressedFile.size;
      const savedPercent = Math.max(1, Math.round((savedBytes / originalBytes) * 100));

      return {
        file: compressedFile,
        originalBytes,
        compressedBytes: compressedFile.size,
        savedBytes,
        savedPercent,
        pageCount,
        wasCompressed: true
      };
    }

    return {
      file,
      originalBytes,
      compressedBytes: originalBytes,
      savedBytes: 0,
      savedPercent: 0,
      pageCount,
      wasCompressed: false
    };
  } catch {
    // Fallback gracefully to original file if PDF uses custom encoding
    return {
      file,
      originalBytes,
      compressedBytes: originalBytes,
      savedBytes: 0,
      savedPercent: 0,
      pageCount: 1,
      wasCompressed: false
    };
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Uploads any single file (PDF or ZIP up to 500 MB) using 4 MB binary chunks with automatic
 * 4x exponential-backoff retry per chunk, completely preventing browser/proxy timeouts and crashes.
 */
export async function uploadSingleFileChunked(
  rawFile: File,
  options: ChunkUploadOptions = {}
): Promise<{
  success: boolean;
  error?: string;
  compression: PdfCompressionResult;
  response?: any;
}> {
  const {
    resourceCategory = 'Bare Acts',
    compressionMode = 'smart',
    autoCommit = true,
    title = '',
    jurisdiction = 'Central',
    year = '2024',
    author = '',
    summary = '',
    fileIndex = 1,
    totalFiles = 1,
    onProgress,
    shouldAbort
  } = options;

  if (rawFile.size > MAX_SINGLE_FILE_BYTES) {
    return {
      success: false,
      error: `File "${rawFile.name}" (${formatBytes(rawFile.size)}) exceeds the 500 MB per-file maximum limit.`,
      compression: {
        file: rawFile,
        originalBytes: rawFile.size,
        compressedBytes: rawFile.size,
        savedBytes: 0,
        savedPercent: 0,
        pageCount: 0,
        wasCompressed: false
      }
    };
  }

  // Step 1: Client-side PDF size reduction / optimization
  if (onProgress) {
    onProgress({
      phase: 'COMPRESSING',
      fileName: rawFile.name,
      fileIndex,
      totalFiles,
      chunkIndex: 0,
      totalChunks: Math.max(1, Math.ceil(rawFile.size / CHUNK_SIZE_BYTES)),
      uploadedBytes: 0,
      totalBytes: rawFile.size,
      percent: 5,
      speedMBps: 0,
      originalBytes: rawFile.size,
      compressedBytes: rawFile.size,
      savedPercent: 0
    });
  }

  const compression = await compressPdfClientSide(rawFile, compressionMode);
  const fileToSend = compression.file;
  const totalBytes = fileToSend.size;
  const totalChunks = Math.max(1, Math.ceil(totalBytes / CHUNK_SIZE_BYTES));
  const uploadId = `up_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const startTime = Date.now();

  // Step 2: Upload 4 MB chunks sequentially with 4x auto-retry
  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    if (shouldAbort && shouldAbort()) {
      return {
        success: false,
        error: 'Upload cancelled by user.',
        compression
      };
    }

    const startOffset = chunkIndex * CHUNK_SIZE_BYTES;
    const endOffset = Math.min(totalBytes, startOffset + CHUNK_SIZE_BYTES);
    const chunkBlob = fileToSend.slice(startOffset, endOffset);

    let chunkSuccess = false;
    let lastChunkError = '';

    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const formData = new FormData();
        formData.append('chunk', chunkBlob, fileToSend.name);
        formData.append('uploadId', uploadId);
        formData.append('chunkIndex', String(chunkIndex));
        formData.append('totalChunks', String(totalChunks));
        formData.append('fileName', fileToSend.name);
        formData.append('totalSize', String(totalBytes));

        const res = await fetch('/api/admin/upload-chunk', {
          method: 'POST',
          body: formData
        });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.toLowerCase().includes('application/json')) {
          const data = await res.json();
          if (data && data.success) {
            chunkSuccess = true;
            break;
          }
          lastChunkError = data?.error || `Chunk ${chunkIndex + 1} rejected`;
        } else {
          lastChunkError = `HTTP ${res.status} on chunk ${chunkIndex + 1}`;
        }
      } catch (err: any) {
        lastChunkError = err?.message || 'Network interruption';
      }

      // Exponential backoff before retry (500ms, 1500ms, 3000ms)
      await sleep(500 * Math.pow(2, attempt));
    }

    if (!chunkSuccess) {
      return {
        success: false,
        error: `Failed uploading chunk ${chunkIndex + 1}/${totalChunks} for "${rawFile.name}": ${lastChunkError}`,
        compression
      };
    }

    const uploadedBytes = endOffset;
    const elapsedSec = Math.max(0.1, (Date.now() - startTime) / 1000);
    const speedMBps = Number(((uploadedBytes / (1024 * 1024)) / elapsedSec).toFixed(2));
    const percent = Math.min(88, Math.round((uploadedBytes / totalBytes) * 80) + 10);

    if (onProgress) {
      onProgress({
        phase: 'UPLOADING_CHUNKS',
        fileName: rawFile.name,
        fileIndex,
        totalFiles,
        chunkIndex: chunkIndex + 1,
        totalChunks,
        uploadedBytes,
        totalBytes,
        percent,
        speedMBps,
        originalBytes: compression.originalBytes,
        compressedBytes: compression.compressedBytes,
        savedPercent: compression.savedPercent
      });
    }
  }

  // Step 3: Finalize assembled file on server, run metadata extraction, and publish
  if (onProgress) {
    onProgress({
      phase: 'FINALIZING',
      fileName: rawFile.name,
      fileIndex,
      totalFiles,
      chunkIndex: totalChunks,
      totalChunks,
      uploadedBytes: totalBytes,
      totalBytes,
      percent: 94,
      speedMBps: 0,
      originalBytes: compression.originalBytes,
      compressedBytes: compression.compressedBytes,
      savedPercent: compression.savedPercent
    });
  }

  let finalizeRes: Response | null = null;
  let finalizeData: any = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      finalizeRes = await fetch('/api/admin/upload-finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uploadId,
          fileName: rawFile.name,
          originalSizeBytes: compression.originalBytes,
          clientCompressedBytes: compression.compressedBytes,
          resourceCategory,
          compressionMode,
          autoCommit,
          title,
          jurisdiction,
          year,
          author,
          summary
        })
      });

      const contentType = finalizeRes.headers.get('content-type') || '';
      if (contentType.toLowerCase().includes('application/json')) {
        finalizeData = await finalizeRes.json();
        if (finalizeRes.ok && finalizeData?.success) {
          break;
        }
      }
    } catch {
      // retry finalize
    }
    await sleep(800 * (attempt + 1));
  }

  if (!finalizeRes || !finalizeRes.ok || !finalizeData?.success) {
    return {
      success: false,
      error: finalizeData?.error || 'Server failed to finalize uploaded file.',
      compression
    };
  }

  if (finalizeData.optimizedSizeBytes && finalizeData.optimizedSizeBytes < compression.compressedBytes) {
    compression.compressedBytes = finalizeData.optimizedSizeBytes;
    compression.savedBytes = compression.originalBytes - finalizeData.optimizedSizeBytes;
    compression.savedPercent = Math.max(
      1,
      Math.round((compression.savedBytes / compression.originalBytes) * 100)
    );
    compression.wasCompressed = true;
  }

  return {
    success: true,
    compression,
    response: finalizeData
  };
}
