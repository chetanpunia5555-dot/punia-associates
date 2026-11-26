import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  FolderArchive,
  FileText,
  CheckCircle2,
  X,
  RefreshCw,
  Eye,
  Trash2,
  Pause,
  Play,
  RotateCcw,
  ShieldAlert,
  Check,
  SlidersHorizontal,
  Sparkles,
  Download,
  Zap,
  HardDrive,
  ShieldCheck,
  Gauge,
  Minimize2,
  Info
} from 'lucide-react';
import { BatchProgress } from './BatchProgress';
import {
  BareActBatchJob,
  BareActBatchItem,
  BareActJurisdiction,
  BareActCategory,
  BatchCommitResponse
} from '../data/bareActsBulkTypes';
import {
  PdfCompressionMode,
  compressPdfClientSide,
  uploadSingleFileChunked,
  formatBytes,
  CHUNK_SIZE_BYTES
} from '../utils/pdfUploadEngine';

interface Props {
  onImportComplete?: () => void;
  selectedCategoryType?: string;
}

interface QueuedFileTelemetry {
  id: string;
  file: File;
  compressedBlobUrl?: string;
  originalBytes: number;
  compressedBytes: number;
  savedBytes: number;
  savedPercent: number;
  pageCount?: number;
  status: 'QUEUED' | 'COMPRESSING' | 'UPLOADING_CHUNKS' | 'FINALIZING' | 'PUBLISHED' | 'COMPRESSED_READY' | 'ERROR';
  chunkIndex: number;
  totalChunks: number;
  percent: number;
  speedMBps: number;
  storedPdfUrl?: string;
  detectedTitle?: string;
  errorMsg?: string;
}

const JURISDICTIONS: BareActJurisdiction[] = [
  'Central',
  'Haryana',
  'Punjab',
  'Uttar Pradesh',
  'Rajasthan',
  'Delhi',
  'Union Territory'
];

const CATEGORIES: BareActCategory[] = [
  'Constitutional',
  'Criminal',
  'Civil & Procedural',
  'Commercial & Corporate',
  'Family & Personal',
  'Property & Revenue',
  'Taxation',
  'Labour & Service',
  'Special & Local Laws'
];

export const BareActsBulkArchiveUploader: React.FC<Props> = ({
  onImportComplete,
  selectedCategoryType = 'Bare Acts'
}) => {
  const [batchFormat, setBatchFormat] = useState<'MULTI_PDF' | 'ZIP' | 'CSV' | 'DOCX'>('MULTI_PDF');

  // Selected Files
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [multiPdfFiles, setMultiPdfFiles] = useState<File[]>([]);
  const unifiedInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const multiPdfInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop & Modern UX state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [autoStartUpload, setAutoStartUpload] = useState<boolean>(true);
  const [autoCommitToRepo, setAutoCommitToRepo] = useState<boolean>(true);

  // Smart PDF Compression Mode (iLovePDF / Smallpdf style)
  const [compressionMode, setCompressionMode] = useState<PdfCompressionMode>('smart');
  const [showLimitsPanel, setShowLimitsPanel] = useState<boolean>(true);
  const [fileQueue, setFileQueue] = useState<QueuedFileTelemetry[]>([]);
  const abortUploadRef = useRef<boolean>(false);

  // Backward compatible text area for CSV/DOCX
  const [csvOrDocxText, setCsvOrDocxText] = useState<string>('');

  // Processing & Progress State
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [processingStage, setProcessingStage] = useState<
    'IDLE' | 'UPLOADING' | 'EXTRACTING' | 'VALIDATING' | 'METADATA_EXTRACTION' | 'PREVIEW_READY' | 'COMMITTING' | 'PAUSED'
  >('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Active Batch Job (Preview Screen)
  const [currentJob, setCurrentJob] = useState<BareActBatchJob | null>(null);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [editedItems, setEditedItems] = useState<Record<string, Partial<BareActBatchItem>>>({});

  // Filter & Search in Preview
  const [previewFilter, setPreviewFilter] = useState<'ALL' | 'VALID' | 'DUPLICATE' | 'REVIEW_REQUIRED' | 'INVALID'>('ALL');
  const [previewSearch, setPreviewSearch] = useState<string>('');

  useEffect(() => {
    localStorage.removeItem('punia_active_batch_job_id');
  }, []);

  // Standalone Client-Side PDF Size Shortener (Compress & Download without uploading if desired)
  const handleCompressOnlyPreview = async (filesToCompress?: File[]) => {
    const targets = filesToCompress || multiPdfFiles;
    if (!targets || targets.length === 0) {
      setErrorMessage('Please select at least one PDF file to shorten/compress its size.');
      return;
    }

    setErrorMessage(null);
    setSuccessBanner(null);
    setIsUploading(true);

    const initialQueue: QueuedFileTelemetry[] = targets.map((f, idx) => ({
      id: `q-${Date.now()}-${idx}`,
      file: f,
      originalBytes: f.size,
      compressedBytes: f.size,
      savedBytes: 0,
      savedPercent: 0,
      status: 'QUEUED',
      chunkIndex: 0,
      totalChunks: Math.max(1, Math.ceil(f.size / CHUNK_SIZE_BYTES)),
      percent: 0,
      speedMBps: 0
    }));
    setFileQueue(initialQueue);

    let totalOriginal = 0;
    let totalCompressed = 0;

    for (let i = 0; i < initialQueue.length; i++) {
      const qItem = initialQueue[i];
      setFileQueue((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, status: 'COMPRESSING', percent: 45 } : item))
      );

      const res = await compressPdfClientSide(qItem.file, compressionMode === 'none' ? 'smart' : compressionMode);
      const blobUrl = URL.createObjectURL(res.file);
      totalOriginal += res.originalBytes;
      totalCompressed += res.compressedBytes;

      setFileQueue((prev) =>
        prev.map((item, idx) =>
          idx === i
            ? {
                ...item,
                file: res.file,
                compressedBlobUrl: blobUrl,
                originalBytes: res.originalBytes,
                compressedBytes: res.compressedBytes,
                savedBytes: res.savedBytes,
                savedPercent: res.savedPercent,
                pageCount: res.pageCount,
                status: 'COMPRESSED_READY',
                percent: 100
              }
            : item
        )
      );
    }

    setIsUploading(false);
    const savedTotal = Math.max(0, totalOriginal - totalCompressed);
    const savedPct = totalOriginal > 0 ? Math.round((savedTotal / totalOriginal) * 100) : 0;
    setSuccessBanner(
      `PDF Size Shortener Complete! Processed ${targets.length} PDF(s): ${formatBytes(totalOriginal)} → ${formatBytes(totalCompressed)} (${savedPct > 0 ? `${savedPct}% smaller` : 'Already maximally compact'}). You can download the shortened PDFs or click "Upload & Publish Now".`
    );
  };

  // Universal Crash-Proof Chunked Batch Upload Dispatcher (4 MB chunks + Sequential Queue + Auto-Retry)
  const executeBatchUpload = async (opts?: { zip?: File | null; pdfs?: File[] }) => {
    const targetZip = opts?.zip !== undefined ? opts.zip : zipFile;
    const targetPdfs = opts?.pdfs !== undefined ? opts.pdfs : multiPdfFiles;

    setErrorMessage(null);
    setSuccessBanner(null);
    abortUploadRef.current = false;

    const allFiles: File[] = [];
    if (targetZip) allFiles.push(targetZip);
    if (targetPdfs && targetPdfs.length > 0) allFiles.push(...targetPdfs);

    if (allFiles.length === 0) {
      setErrorMessage('Please select at least one PDF file (.pdf) or ZIP archive (.zip) to upload.');
      return;
    }

    setIsUploading(true);
    setUploadPercent(5);
    setProcessingStage('UPLOADING');

    const initialQueue: QueuedFileTelemetry[] = allFiles.map((f, idx) => ({
      id: `q-${Date.now()}-${idx}`,
      file: f,
      originalBytes: f.size,
      compressedBytes: f.size,
      savedBytes: 0,
      savedPercent: 0,
      status: 'QUEUED',
      chunkIndex: 0,
      totalChunks: Math.max(1, Math.ceil(f.size / CHUNK_SIZE_BYTES)),
      percent: 0,
      speedMBps: 0
    }));
    setFileQueue(initialQueue);

    const collectedBatchItems: BareActBatchItem[] = [];
    const logs: string[] = [];
    let totalImportedCount = 0;
    let totalOrigBytes = 0;
    let totalOptBytes = 0;
    let failedCount = 0;

    for (let i = 0; i < allFiles.length; i++) {
      if (abortUploadRef.current) break;

      const currentFile = allFiles[i];
      const result = await uploadSingleFileChunked(currentFile, {
        resourceCategory: selectedCategoryType,
        compressionMode,
        autoCommit: autoCommitToRepo,
        fileIndex: i + 1,
        totalFiles: allFiles.length,
        shouldAbort: () => abortUploadRef.current,
        onProgress: (prog) => {
          const overallPercent = Math.round(((i + prog.percent / 100) / allFiles.length) * 100);
          setUploadPercent(Math.max(5, Math.min(99, overallPercent)));
          if (prog.phase === 'COMPRESSING') setProcessingStage('UPLOADING');
          else if (prog.phase === 'UPLOADING_CHUNKS') setProcessingStage('EXTRACTING');
          else setProcessingStage('VALIDATING');

          setFileQueue((prev) =>
            prev.map((q, idx) =>
              idx === i
                ? {
                    ...q,
                    status: prog.phase,
                    chunkIndex: prog.chunkIndex,
                    totalChunks: prog.totalChunks,
                    percent: prog.percent,
                    speedMBps: prog.speedMBps,
                    originalBytes: prog.originalBytes,
                    compressedBytes: prog.compressedBytes,
                    savedBytes: Math.max(0, prog.originalBytes - prog.compressedBytes),
                    savedPercent: prog.savedPercent
                  }
                : q
            )
          );
        }
      });

      const compBlobUrl = URL.createObjectURL(result.compression.file);
      totalOrigBytes += result.compression.originalBytes;
      totalOptBytes += result.compression.compressedBytes;

      if (result.success && result.response) {
        const resp = result.response;
        totalImportedCount += resp.importedCount || (resp.item ? 1 : 0);

        if (resp.job && Array.isArray(resp.job.items)) {
          collectedBatchItems.push(...resp.job.items);
          if (Array.isArray(resp.job.logs)) logs.push(...resp.job.logs);
        } else if (resp.batchItem) {
          collectedBatchItems.push(resp.batchItem);
        }

        const firstItem = resp.batchItem || resp.job?.items?.[0];

        setFileQueue((prev) =>
          prev.map((q, idx) =>
            idx === i
              ? {
                  ...q,
                  compressedBlobUrl: compBlobUrl,
                  originalBytes: result.compression.originalBytes,
                  compressedBytes: result.compression.compressedBytes,
                  savedBytes: result.compression.savedBytes,
                  savedPercent: result.compression.savedPercent,
                  pageCount: firstItem?.pageCount || result.compression.pageCount || 1,
                  status: 'PUBLISHED',
                  percent: 100,
                  storedPdfUrl: firstItem?.storedPdfUrl || resp.item?.pdfUrl,
                  detectedTitle: firstItem?.detectedTitle || resp.item?.title || resp.item?.caseTitle
                }
              : q
          )
        );
      } else {
        failedCount++;
        setFileQueue((prev) =>
          prev.map((q, idx) =>
            idx === i
              ? {
                  ...q,
                  status: 'ERROR',
                  errorMsg: result.error || 'Upload failed'
                }
              : q
          )
        );
      }
    }

    setUploadPercent(100);
    setIsUploading(false);

    if (collectedBatchItems.length > 0) {
      const nowStr = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      const combinedJob: BareActBatchJob = {
        jobId: `batch-ba-${Date.now()}`,
        jobName: allFiles.length === 1 ? allFiles[0].name : `${allFiles.length}_files_chunked_batch`,
        batchType: targetZip ? 'ZIP_ARCHIVE' : 'MULTIPLE_PDFS',
        archiveFileName: allFiles.length === 1 ? allFiles[0].name : `${allFiles.length} Uploaded Files`,
        archiveSizeBytes: totalOptBytes,
        createdAt: nowStr,
        updatedAt: nowStr,
        status: autoCommitToRepo ? 'COMPLETED' : 'PREVIEW_READY',
        totalFilesFound: allFiles.length,
        totalPdfsFound: collectedBatchItems.length,
        successfulPdfValidations: collectedBatchItems.filter((i) => i.validationStatus === 'VALID').length,
        duplicateFiles: collectedBatchItems.filter((i) => i.validationStatus === 'DUPLICATE').length,
        invalidPdfs: collectedBatchItems.filter(
          (i) => i.validationStatus === 'INVALID_CORRUPT' || i.validationStatus === 'INVALID_PASSWORD'
        ).length,
        metadataReviewRequiredCount: collectedBatchItems.filter(
          (i) => i.validationStatus === 'METADATA_REVIEW_REQUIRED'
        ).length,
        totalPdfPages: collectedBatchItems.reduce((acc, i) => acc + (i.pageCount || 0), 0),
        totalArchiveSizeBytes: totalOptBytes,
        items: collectedBatchItems,
        logs
      };

      setCurrentJob(combinedJob);
      setProcessingStage('PREVIEW_READY');
      const validIds = collectedBatchItems
        .filter((item) => item.validationStatus !== 'INVALID_CORRUPT' && item.validationStatus !== 'INVALID_PASSWORD')
        .map((item) => item.id);
      setSelectedItemIds(validIds);
    } else {
      setProcessingStage('IDLE');
    }

    setZipFile(null);
    setMultiPdfFiles([]);

    const savedTotalBytes = Math.max(0, totalOrigBytes - totalOptBytes);
    const savedTotalPct = totalOrigBytes > 0 ? Math.round((savedTotalBytes / totalOrigBytes) * 100) : 0;
    const sizeNote =
      savedTotalBytes > 0
        ? ` | Size Reduced: ${formatBytes(totalOrigBytes)} → ${formatBytes(totalOptBytes)} (${savedTotalPct}% saved)`
        : ` | Total Transferred: ${formatBytes(totalOptBytes)}`;

    if (failedCount === 0) {
      setSuccessBanner(
        `Successfully uploaded & published ${totalImportedCount || allFiles.length} document(s) via 4 MB Crash-Proof Chunked Streaming${sizeNote}!`
      );
      if (onImportComplete) onImportComplete();
    } else {
      setErrorMessage(
        `Completed with ${failedCount} failed file(s) and ${allFiles.length - failedCount} succeeded${sizeNote}. Check queue table below.`
      );
      if (onImportComplete) onImportComplete();
    }
  };

  // Sync all PDFs from /public/assets/aistudio
  const handleSyncUploadedAssets = async () => {
    setErrorMessage(null);
    setSuccessBanner(null);
    setIsUploading(true);
    setUploadPercent(35);
    setProcessingStage('EXTRACTING');
    try {
      const res = await fetch('/api/admin/bare-acts/sync-assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUploadPercent(100);
        setProcessingStage('IDLE');
        setSuccessBanner(
          `Project Assets Synced! Total Bare Acts in Repository: ${data.totalBareActs} (${data.syncedCount} newly added, ${data.updatedCount} updated with full PDFs).`
        );
        if (onImportComplete) onImportComplete();
      } else {
        setErrorMessage(data.error || 'Failed to sync asset PDFs.');
        setProcessingStage('IDLE');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error while syncing project assets.');
      setProcessingStage('IDLE');
    } finally {
      setIsUploading(false);
    }
  };

  // Instant Demo: Load 5 sample Bare Acts in memory (.zip)
  const handleLoadSampleArchive = async () => {
    setErrorMessage(null);
    setSuccessBanner(null);
    setIsUploading(true);
    setUploadPercent(25);
    setProcessingStage('UPLOADING');

    try {
      const res = await fetch(`/api/admin/bare-acts/sample-archive?autoCommit=${autoCommitToRepo ? 'true' : 'false'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (res.ok && data.success && data.job) {
        setUploadPercent(100);
        setProcessingStage('PREVIEW_READY');
        setCurrentJob(data.job);
        const validIds = data.job.items
          .filter((item: BareActBatchItem) => item.validationStatus === 'VALID' || item.validationStatus === 'DUPLICATE')
          .map((item: BareActBatchItem) => item.id);
        setSelectedItemIds(validIds);
        setSuccessBanner(
          `Demo Archive Loaded & Published: 5 Indian Bare Act PDFs extracted and saved to repository!`
        );
        if (onImportComplete) onImportComplete();
      } else {
        setErrorMessage(data.error || 'Failed to load demo archive.');
        setProcessingStage('IDLE');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to load demo archive.');
      setProcessingStage('IDLE');
    } finally {
      setIsUploading(false);
    }
  };

  // Unified file handler (accepts both .pdf and .zip together!)
  const handleUnifiedFilesSelected = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const filesArray = Array.from(fileList);

    const detectedZip = filesArray.find(
      (f) =>
        f.name.toLowerCase().endsWith('.zip') ||
        f.type === 'application/zip' ||
        f.type === 'application/x-zip-compressed'
    );
    const detectedPdfs = filesArray.filter(
      (f) => f !== detectedZip && (f.name.toLowerCase().endsWith('.pdf') || f.type === 'application/pdf')
    );

    if (!detectedZip && detectedPdfs.length === 0) {
      setErrorMessage('Unsupported file format. Please select .pdf files or a .zip archive.');
      return;
    }

    if (detectedZip) {
      setBatchFormat('ZIP');
      setZipFile(detectedZip);
    }
    if (detectedPdfs.length > 0) {
      if (!detectedZip) setBatchFormat('MULTI_PDF');
      setMultiPdfFiles(detectedPdfs);
    }
    setErrorMessage(null);

    if (autoStartUpload) {
      executeBatchUpload({
        zip: detectedZip || null,
        pdfs: detectedPdfs
      });
    } else {
      // Pre-populate queue preview so user can inspect or compress before uploading
      const allSelected = [...(detectedZip ? [detectedZip] : []), ...detectedPdfs];
      setFileQueue(
        allSelected.map((f, idx) => ({
          id: `q-${Date.now()}-${idx}`,
          file: f,
          originalBytes: f.size,
          compressedBytes: f.size,
          savedBytes: 0,
          savedPercent: 0,
          status: 'QUEUED',
          chunkIndex: 0,
          totalChunks: Math.max(1, Math.ceil(f.size / CHUNK_SIZE_BYTES)),
          percent: 0,
          speedMBps: 0
        }))
      );
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUnifiedFilesSelected(e.target.files);
    e.target.value = '';
  };

  const handleMultiPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUnifiedFilesSelected(e.target.files);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleUnifiedFilesSelected(e.dataTransfer.files);
  };

  // Manual Process Upload button fallback
  const handleProcessUpload = async () => {
    setErrorMessage(null);
    setSuccessBanner(null);

    if (batchFormat === 'CSV' || batchFormat === 'DOCX') {
      if (!csvOrDocxText.trim()) {
        setErrorMessage('Please paste CSV rows or structured document content.');
        return;
      }
      setIsUploading(true);
      try {
        const res = await fetch('/api/admin/bulk-import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            targetModule: selectedCategoryType,
            fileType: batchFormat,
            rawContent: csvOrDocxText
          })
        });
        const json = await res.json();
        if (res.ok) {
          setSuccessBanner(`Successfully imported ${json.importedCount || 0} items (${json.skippedDuplicatesCount || 0} duplicates skipped).`);
          setCsvOrDocxText('');
          if (onImportComplete) onImportComplete();
        } else {
          setErrorMessage(json.error || 'Failed to process bulk upload');
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Network error during upload');
      } finally {
        setIsUploading(false);
      }
      return;
    }

    executeBatchUpload();
  };

  // Job Controls: Pause / Resume / Cancel / Retry Failed
  const handleJobControl = async (action: 'pause' | 'resume' | 'cancel' | 'retry-failed') => {
    if (!currentJob) return;
    if (action === 'cancel') {
      abortUploadRef.current = true;
      setCurrentJob(null);
      localStorage.removeItem('punia_active_batch_job_id');
      setProcessingStage('IDLE');
      setZipFile(null);
      setMultiPdfFiles([]);
      return;
    }
    try {
      const res = await fetch(`/api/admin/bare-acts/batch-control/${currentJob.jobId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentJob(data.job);
        if (action === 'pause') setProcessingStage('PAUSED');
        if (action === 'resume') setProcessingStage('PREVIEW_READY');
      }
    } catch (err) {
      console.error('Job control failed:', err);
    }
  };

  // Inline Metadata Edits
  const handleItemFieldChange = (id: string, field: keyof BareActBatchItem, value: any) => {
    setEditedItems((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value
      }
    }));
  };

  // Remove Item from Batch
  const handleRemoveItem = (id: string) => {
    if (!currentJob) return;
    const updatedItems = currentJob.items.filter((item) => item.id !== id);
    setCurrentJob({
      ...currentJob,
      items: updatedItems,
      totalPdfsFound: updatedItems.length,
      successfulPdfValidations: updatedItems.filter((i) => i.validationStatus === 'VALID').length,
      duplicateFiles: updatedItems.filter((i) => i.validationStatus === 'DUPLICATE').length,
      invalidPdfs: updatedItems.filter((i) => i.validationStatus === 'INVALID_CORRUPT' || i.validationStatus === 'INVALID_PASSWORD').length,
      metadataReviewRequiredCount: updatedItems.filter((i) => i.validationStatus === 'METADATA_REVIEW_REQUIRED').length
    });
    setSelectedItemIds((prev) => prev.filter((item) => item !== id));
  };

  // Remove Selected Items
  const handleRemoveSelected = () => {
    if (!currentJob || selectedItemIds.length === 0) return;
    const updatedItems = currentJob.items.filter((item) => !selectedItemIds.includes(item.id));
    setCurrentJob({
      ...currentJob,
      items: updatedItems,
      totalPdfsFound: updatedItems.length,
      successfulPdfValidations: updatedItems.filter((i) => i.validationStatus === 'VALID').length,
      duplicateFiles: updatedItems.filter((i) => i.validationStatus === 'DUPLICATE').length,
      invalidPdfs: updatedItems.filter((i) => i.validationStatus === 'INVALID_CORRUPT' || i.validationStatus === 'INVALID_PASSWORD').length,
      metadataReviewRequiredCount: updatedItems.filter((i) => i.validationStatus === 'METADATA_REVIEW_REQUIRED').length
    });
    setSelectedItemIds([]);
  };

  // Commit Batch (Import All or Selected)
  const handleCommitBatch = async (importOnlySelected: boolean = false) => {
    if (!currentJob) return;
    setErrorMessage(null);
    setSuccessBanner(null);
    setIsUploading(true);
    setProcessingStage('COMMITTING');

    const targetIds = importOnlySelected
      ? selectedItemIds
      : currentJob.items
          .filter((i) => i.validationStatus !== 'INVALID_CORRUPT' && i.validationStatus !== 'INVALID_PASSWORD')
          .map((i) => i.id);

    if (targetIds.length === 0) {
      setErrorMessage('No valid items to import.');
      setIsUploading(false);
      setProcessingStage('PREVIEW_READY');
      return;
    }

    const editsPayload = Object.entries(editedItems).map(([id, edits]) => ({
      id,
      title: edits.detectedTitle,
      actNumber: edits.actNumber,
      year: edits.year,
      jurisdiction: edits.jurisdiction,
      category: edits.category,
      preamble: edits.preamble
    }));

    try {
      const res = await fetch('/api/admin/bare-acts/batch-commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: currentJob.jobId,
          selectedItemIds: targetIds,
          editedItems: editsPayload
        })
      });

      const data: BatchCommitResponse = await res.json();
      if (res.ok && data.success) {
        setSuccessBanner(
          `Successfully saved & published ${data.importedCount} Bare Act(s) to the official repository!`
        );
        setCurrentJob(null);
        localStorage.removeItem('punia_active_batch_job_id');
        setProcessingStage('IDLE');
        setZipFile(null);
        setMultiPdfFiles([]);
        setEditedItems({});
        setSelectedItemIds([]);
        if (onImportComplete) onImportComplete();
      } else {
        setErrorMessage(data.errors?.join('; ') || (data as any).error || 'Failed to commit batch to repository.');
        setProcessingStage('PREVIEW_READY');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error while committing batch.');
      setProcessingStage('PREVIEW_READY');
    } finally {
      setIsUploading(false);
    }
  };

  // Filter items in Preview Table
  const visibleItems = (currentJob?.items || []).filter((item) => {
    if (previewFilter === 'VALID' && item.validationStatus !== 'VALID') return false;
    if (previewFilter === 'DUPLICATE' && item.validationStatus !== 'DUPLICATE') return false;
    if (previewFilter === 'REVIEW_REQUIRED' && item.validationStatus !== 'METADATA_REVIEW_REQUIRED') return false;
    if (
      previewFilter === 'INVALID' &&
      item.validationStatus !== 'INVALID_CORRUPT' &&
      item.validationStatus !== 'INVALID_PASSWORD'
    )
      return false;

    if (previewSearch.trim()) {
      const q = previewSearch.toLowerCase();
      const matchFile = item.originalFileName.toLowerCase().includes(q);
      const matchTitle = (editedItems[item.id]?.detectedTitle || item.detectedTitle).toLowerCase().includes(q);
      const matchCat = (editedItems[item.id]?.category || item.category).toLowerCase().includes(q);
      if (!matchFile && !matchTitle && !matchCat) return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-6 shadow-xl">
      {/* HEADER & QUICK ACTIONS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
              Crash-Proof 4 MB Chunked Streamer + Smart PDF Size Shortener
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
              Up to 500 MB / File • 2 GB / Batch
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-white mt-1 flex items-center gap-2">
            <FolderArchive className="w-6 h-6 text-amber-400" />
            <span>Upload {selectedCategoryType} (Single PDF, Multi-PDF & ZIP Archive)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Automatically compresses PDF size in your browser (like iLovePDF / Smallpdf) and streams in 4 MB chunks so large uploads never time out or crash.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLimitsPanel(!showLimitsPanel)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-cyan-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showLimitsPanel ? 'Hide' : 'View'} Upload Limits & Specs</span>
          </button>

          <button
            type="button"
            onClick={handleSyncUploadedAssets}
            disabled={isUploading}
            className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            title="Sync all PDFs uploaded to Project Assets (/public/assets/aistudio)"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isUploading ? 'animate-spin' : ''}`} />
            <span>Sync Uploaded Asset PDFs</span>
          </button>

          <button
            type="button"
            onClick={handleLoadSampleArchive}
            disabled={isUploading}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 border border-amber-400/40 text-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-amber-300 disabled:opacity-50"
            title="Instant 1-click test with 5 pre-packaged Bare Acts & manifest.csv"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load 5 Demo Bare Acts</span>
          </button>
        </div>
      </div>

      {/* SYSTEM UPLOAD LIMITS & PDF COMPRESSION ENGINE PANEL */}
      {showLimitsPanel && (
        <div className="p-4 bg-slate-950/90 border border-cyan-500/30 rounded-2xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Safe Upload Capacity & Anti-Crash Streaming Specifications
                </h4>
                <p className="text-[11px] text-slate-400">
                  Engineered with client-side PDF size reduction (`pdf-lib` Object Streams) + 4 MB disk-appended binary chunks to bypass Cloud Run's 32 MB single-request limit.
                </p>
              </div>
            </div>

            {/* PDF Size Shortener Mode Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 px-2">
                <Minimize2 className="w-3.5 h-3.5" />
                PDF Size Shortener:
              </span>
              {[
                { id: 'smart', label: 'Smart Legal Compress (Recommended)' },
                { id: 'extreme', label: 'Max Size Reduction' },
                { id: 'none', label: 'Original Size' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCompressionMode(m.id as PdfCompressionMode)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    compressionMode === m.id
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                <Zap className="w-4 h-4" />
                <span>Chunk Transfer Size</span>
              </div>
              <div className="text-lg font-extrabold text-white font-mono">4 MB / Chunk</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Slices large files into 4 MB packets (safely under the 32 MB Cloud Run proxy limit).
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                <HardDrive className="w-4 h-4" />
                <span>Max Single File Limit</span>
              </div>
              <div className="text-lg font-extrabold text-white font-mono">500 MB / File</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Supports massive scanned Gazette PDFs & multi-act ZIP archives up to 500 MB each.
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Gauge className="w-4 h-4" />
                <span>Max Batch Capacity</span>
              </div>
              <div className="text-lg font-extrabold text-white font-mono">2,048 MB (300 PDFs)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Sequential queue uploads 1 file at a time with 4x auto-retry so the server never runs out of RAM.
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-1.5 text-purple-400 font-bold mb-1">
                <Minimize2 className="w-4 h-4" />
                <span>In-Browser PDF Shortener</span>
              </div>
              <div className="text-lg font-extrabold text-white font-mono">Object Streams</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Strips redundant XMP metadata, page thumbnails & catalog bloat before uploading.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ERROR & SUCCESS NOTIFICATIONS */}
      {errorMessage && (
        <div className="p-4 bg-red-950/80 border border-red-500/60 rounded-2xl text-xs text-red-200 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successBanner && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/60 rounded-2xl text-xs text-emerald-200 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-emerald-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ALWAYS-VISIBLE UPLOAD MODE & DROPZONE */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Upload Mode:
            </span>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                id="toggle-multi-pdf-mode-btn"
                onClick={() => {
                  setBatchFormat('MULTI_PDF');
                  setErrorMessage(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  batchFormat === 'MULTI_PDF'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF Files (Single / Multiple)</span>
              </button>

              <button
                type="button"
                id="toggle-zip-mode-btn"
                onClick={() => {
                  setBatchFormat('ZIP');
                  setErrorMessage(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  batchFormat === 'ZIP'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FolderArchive className="w-3.5 h-3.5" />
                <span>ZIP Archive (.zip)</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 text-xs">
              <input
                type="checkbox"
                checked={autoStartUpload}
                onChange={(e) => setAutoStartUpload(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
              />
              <span className="text-[11px] font-semibold text-slate-300">
                Auto-Upload on File Select
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 text-xs">
              <input
                type="checkbox"
                checked={autoCommitToRepo}
                onChange={(e) => setAutoCommitToRepo(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
              />
              <span className="text-[11px] font-semibold text-emerald-400">
                1-Step Auto-Publish to Repository
              </span>
            </label>
          </div>
        </div>

        {/* UNIFIED DRAG & DROP + MULTI-FORMAT FILE PICKER */}
        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`p-7 bg-slate-950/80 border-2 border-dashed rounded-3xl transition-all space-y-5 text-center ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01] ring-4 ring-cyan-500/20 shadow-2xl'
              : 'border-cyan-500/40 hover:border-amber-400/70'
          }`}
        >
          {/* Hidden File Inputs */}
          <input
            type="file"
            id="unified-bare-act-file-input"
            ref={unifiedInputRef}
            onChange={handleMultiPdfChange}
            accept=".pdf,.zip,application/pdf,application/zip,application/x-zip-compressed"
            multiple={true}
            className="sr-only"
          />
          <input
            type="file"
            id="multi-pdf-file-input"
            name="pdfFiles"
            ref={multiPdfInputRef}
            onChange={handleMultiPdfChange}
            accept=".pdf,application/pdf"
            multiple={true}
            className="sr-only"
            data-testid="multi-pdf-file-input"
          />
          <input
            type="file"
            id="zip-archive-file-input"
            name="archive"
            ref={zipInputRef}
            onChange={handleZipChange}
            accept=".zip,application/zip,application/x-zip-compressed"
            multiple={false}
            className="sr-only"
            data-testid="zip-archive-file-input"
          />

          <div className="max-w-2xl mx-auto space-y-2">
            <div className="inline-flex p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Upload className="w-9 h-9" />
            </div>
            <h4 className="font-serif text-xl font-bold text-white">
              Click Below or Drag & Drop Bare Act PDFs / ZIP Archive Here
            </h4>
            <p className="text-xs text-slate-300">
              Select <strong>1 PDF</strong>, <strong>100+ PDFs together (Ctrl/Shift + Click)</strong>, or a <strong>.zip archive up to 500 MB</strong>. Files are automatically shortened in size, streamed in 4 MB chunks, and published to the repository.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              id="choose-pdf-files-btn"
              onClick={() => multiPdfInputRef.current?.click()}
              disabled={isUploading}
              className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl transition cursor-pointer flex items-center gap-2.5 active:scale-95 disabled:opacity-50"
            >
              <FileText className="w-5 h-5 text-slate-950" />
              <span>Select PDF File(s) (.pdf)</span>
            </button>

            <button
              type="button"
              id="choose-zip-file-btn"
              onClick={() => zipInputRef.current?.click()}
              disabled={isUploading}
              className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl transition cursor-pointer flex items-center gap-2.5 active:scale-95 disabled:opacity-50"
            >
              <FolderArchive className="w-5 h-5 text-slate-950" />
              <span>Select ZIP Archive (.zip)</span>
            </button>

            <a
              href="/api/admin/bare-acts/download-sample-zip"
              download="Bare_Acts_Bulk_Upload_Sample_Package.zip"
              className="px-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-2xl border border-slate-700 hover:border-emerald-400/50 transition cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Sample Test ZIP</span>
            </a>
          </div>

          {/* Pending manually selected files (if autoStartUpload is unchecked) */}
          {(zipFile || multiPdfFiles.length > 0) && (
            <div className="p-4 bg-slate-900 border border-amber-500/50 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs text-slate-200 max-w-2xl mx-auto shadow-lg">
              <div className="text-left">
                {zipFile && (
                  <div className="font-bold text-amber-300">
                    ZIP Selected: {zipFile.name} ({formatBytes(zipFile.size)})
                  </div>
                )}
                {multiPdfFiles.length > 0 && (
                  <div className="font-bold text-cyan-300">
                    {multiPdfFiles.length} PDF File(s) Selected ({formatBytes(multiPdfFiles.reduce((a, b) => a + b.size, 0))})
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {multiPdfFiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleCompressOnlyPreview(multiPdfFiles)}
                    disabled={isUploading}
                    className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-bold text-xs rounded-xl cursor-pointer transition flex items-center gap-1.5"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Shorten PDF Size First</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleProcessUpload}
                  disabled={isUploading}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer transition"
                >
                  Chunk-Upload & Publish Now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZipFile(null);
                    setMultiPdfFiles([]);
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LIVE CHUNK STREAMING & PDF COMPRESSION QUEUE TABLE */}
      {fileQueue.length > 0 && (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Minimize2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">
                PDF Size Shortener & 4 MB Chunk Transfer Queue ({fileQueue.length} file{fileQueue.length > 1 ? 's' : ''})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFileQueue([])}
              disabled={isUploading}
              className="text-[11px] text-slate-400 hover:text-white cursor-pointer disabled:opacity-40"
            >
              Clear Queue Log
            </button>
          </div>

          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] uppercase text-slate-400 bg-slate-900/70">
                  <th className="py-2 px-3">File Name</th>
                  <th className="py-2 px-3">Original Size</th>
                  <th className="py-2 px-3">Shortened Size</th>
                  <th className="py-2 px-3">Chunk Progress</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-right">Download / View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {fileQueue.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-semibold text-white truncate max-w-[220px]" title={q.file.name}>
                      {q.detectedTitle || q.file.name}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">
                      {formatBytes(q.originalBytes)}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      <span className="text-emerald-400 font-bold">{formatBytes(q.compressedBytes)}</span>
                      {q.savedPercent > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          -{q.savedPercent}%
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 min-w-[160px]">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span>
                          Chunk {q.chunkIndex || 1}/{q.totalChunks}
                        </span>
                        <span>{q.speedMBps > 0 ? `${q.speedMBps} MB/s` : `${q.percent}%`}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-200"
                          style={{ width: `${q.percent}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      {q.status === 'PUBLISHED' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                          PUBLISHED ✓
                        </span>
                      )}
                      {q.status === 'COMPRESSED_READY' && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                          SHORTENED READY
                        </span>
                      )}
                      {(q.status === 'COMPRESSING' || q.status === 'UPLOADING_CHUNKS' || q.status === 'FINALIZING') && (
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold">
                          {q.status.replace(/_/g, ' ')}...
                        </span>
                      )}
                      {q.status === 'QUEUED' && (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">
                          QUEUED
                        </span>
                      )}
                      {q.status === 'ERROR' && (
                        <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold" title={q.errorMsg}>
                          FAILED
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {q.compressedBlobUrl && (
                          <a
                            href={q.compressedBlobUrl}
                            download={`shortened_${q.file.name}`}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-[10px] font-bold flex items-center gap-1"
                            title="Download Shortened / Optimized PDF"
                          >
                            <Download className="w-3 h-3" />
                            <span>Shortened PDF</span>
                          </a>
                        )}
                        {q.storedPdfUrl && (
                          <a
                            href={q.storedPdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-[10px] font-bold flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Read</span>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PROGRESS & TELEMETRY INTERFACE */}
      {isUploading && (
        <BatchProgress
          stage={processingStage}
          percent={uploadPercent}
          fileName={zipFile?.name || (multiPdfFiles.length > 0 ? `${multiPdfFiles.length} PDF files` : 'Streaming 4 MB Chunks...')}
          totalFiles={multiPdfFiles.length || (zipFile ? 1 : 0)}
          errorMessage={errorMessage}
          onPause={() => setProcessingStage('PAUSED')}
          onResume={() => setProcessingStage('EXTRACTING')}
          onCancel={() => {
            abortUploadRef.current = true;
            setIsUploading(false);
            setProcessingStage('IDLE');
            setUploadPercent(0);
          }}
        />
      )}

      {/* PREVIEW & METADATA EDITOR TABLE */}
      {currentJob && (
        <div className="space-y-5 pt-2 border-t border-slate-800">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-white block">
                Recent Upload Batch: <strong className="text-amber-300">{currentJob.archiveFileName}</strong>
              </span>
              <span className="text-[11px] text-slate-400">
                Processed at: {currentJob.createdAt} • {currentJob.totalPdfsFound} PDF(s) • {currentJob.totalPdfPages} Pages • Status:{' '}
                <strong className="text-emerald-400">{currentJob.status}</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {currentJob.status === 'PAUSED' ? (
                <button
                  type="button"
                  onClick={() => handleJobControl('resume')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleJobControl('pause')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleJobControl('retry-failed')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Failed</span>
              </button>

              <button
                type="button"
                onClick={() => handleJobControl('cancel')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close Preview</span>
              </button>
            </div>
          </div>

          {/* SUMMARY TELEMETRY CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {[
              { label: 'PDFs Extracted', value: currentJob.totalPdfsFound, color: 'text-cyan-300 border-cyan-500/30 bg-cyan-950/20' },
              { label: 'Valid & Ready', value: currentJob.successfulPdfValidations, color: 'text-emerald-300 border-emerald-500/30 bg-emerald-950/30' },
              { label: 'Total Pages', value: currentJob.totalPdfPages, color: 'text-purple-300 border-purple-500/30 bg-purple-950/20' },
              { label: 'Review Req.', value: currentJob.metadataReviewRequiredCount, color: 'text-orange-300 border-orange-500/30 bg-orange-950/30' },
              { label: 'Invalid', value: currentJob.invalidPdfs, color: 'text-red-300 border-red-500/30 bg-red-950/30' },
              { label: 'Total Size', value: formatBytes(currentJob.totalArchiveSizeBytes), color: 'text-blue-300 border-blue-500/30 bg-blue-950/20' }
            ].map((stat) => (
              <div key={stat.label} className={`p-3 rounded-2xl border text-center ${stat.color}`}>
                <div className="text-base font-bold font-mono">{stat.value}</div>
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* FILTER & SEARCH TOOLBAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: `All (${currentJob.items.length})` },
                { id: 'VALID', label: `Valid (${currentJob.successfulPdfValidations})` },
                { id: 'REVIEW_REQUIRED', label: `Review Required (${currentJob.metadataReviewRequiredCount})` },
                { id: 'INVALID', label: `Invalid (${currentJob.invalidPdfs})` }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setPreviewFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    previewFilter === f.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={previewSearch}
                onChange={(e) => setPreviewSearch(e.target.value)}
                placeholder="Search extracted acts..."
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* INTERACTIVE PREVIEW TABLE */}
          <div className="overflow-x-auto bg-slate-950/90 border border-slate-800 rounded-2xl shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase text-slate-400 bg-slate-900/60">
                  <th className="py-3 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={visibleItems.length > 0 && visibleItems.every((i) => selectedItemIds.includes(i.id))}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItemIds((prev) => Array.from(new Set([...prev, ...visibleItems.map((i) => i.id)])));
                        } else {
                          setSelectedItemIds((prev) => prev.filter((id) => !visibleItems.some((i) => i.id === id)));
                        }
                      }}
                    />
                  </th>
                  <th className="py-3 px-3">Filename & Size</th>
                  <th className="py-3 px-3 min-w-[240px]">Detected Act Title (Editable)</th>
                  <th className="py-3 px-3 w-24">Year</th>
                  <th className="py-3 px-3 min-w-[140px]">Jurisdiction</th>
                  <th className="py-3 px-3 min-w-[170px]">Category</th>
                  <th className="py-3 px-3 w-16 text-center">Pages</th>
                  <th className="py-3 px-3 min-w-[140px]">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {visibleItems.map((item) => {
                  const currentTitle =
                    editedItems[item.id]?.detectedTitle !== undefined
                      ? editedItems[item.id]?.detectedTitle
                      : item.detectedTitle;
                  const currentYear =
                    editedItems[item.id]?.year !== undefined ? editedItems[item.id]?.year : item.year;
                  const currentJur =
                    editedItems[item.id]?.jurisdiction !== undefined
                      ? editedItems[item.id]?.jurisdiction
                      : item.jurisdiction;
                  const currentCat =
                    editedItems[item.id]?.category !== undefined
                      ? editedItems[item.id]?.category
                      : item.category;

                  const isSelected = selectedItemIds.includes(item.id);

                  return (
                    <tr key={item.id} className="hover:bg-slate-900/50 transition">
                      <td className="py-3 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItemIds((prev) => [...prev, item.id]);
                            } else {
                              setSelectedItemIds((prev) => prev.filter((id) => id !== item.id));
                            }
                          }}
                        />
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate max-w-[200px]" title={item.originalFileName}>
                            {item.originalFileName}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {formatBytes(item.fileSizeBytes)} • SHA: {item.checksumSha256.slice(0, 8)}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <input
                          type="text"
                          value={currentTitle}
                          onChange={(e) => handleItemFieldChange(item.id, 'detectedTitle', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                        />
                      </td>

                      <td className="py-3 px-3">
                        <input
                          type="number"
                          value={currentYear}
                          onChange={(e) => handleItemFieldChange(item.id, 'year', parseInt(e.target.value, 10))}
                          className="w-20 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </td>

                      <td className="py-3 px-3">
                        <select
                          value={currentJur}
                          onChange={(e) => handleItemFieldChange(item.id, 'jurisdiction', e.target.value as BareActJurisdiction)}
                          className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none"
                        >
                          {JURISDICTIONS.map((j) => (
                            <option key={j} value={j}>
                              {j}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-3">
                        <select
                          value={currentCat}
                          onChange={(e) => handleItemFieldChange(item.id, 'category', e.target.value as BareActCategory)}
                          className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-300">
                        {item.pageCount || 1}
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold block w-fit bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {currentJob.status === 'COMPLETED' ? 'PUBLISHED' : item.validationStatus.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5 truncate max-w-xs" title={item.validationMessage}>
                          {item.validationMessage}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.storedPdfUrl ? (
                            <>
                              <a
                                href={item.storedPdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg transition"
                                title="View Extracted PDF"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`/api/bare-acts/download-stored?file=${encodeURIComponent(item.storedPdfUrl.replace('/bare-acts/stored/', ''))}`}
                                download={item.originalFileName || `${item.detectedTitle}.pdf`}
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg transition cursor-pointer"
                                title="Download Extracted PDF"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </a>
                            </>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 rounded-lg transition cursor-pointer"
                            title="Remove from batch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* FINAL ACTION BUTTONS */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Selected <strong className="text-white">{selectedItemIds.length}</strong> of {currentJob.items.length} PDF(s). You can edit any Title, Year, Jurisdiction, or Category above and click Save.
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleRemoveSelected}
                disabled={selectedItemIds.length === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-300 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer disabled:opacity-50"
              >
                Remove Selected ({selectedItemIds.length})
              </button>

              <button
                type="button"
                onClick={() => handleCommitBatch(true)}
                disabled={selectedItemIds.length === 0 || isUploading}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save / Update Selected ({selectedItemIds.length})</span>
              </button>

              <button
                type="button"
                onClick={() => handleCommitBatch(false)}
                disabled={isUploading}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>Save / Publish All ({currentJob.items.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
