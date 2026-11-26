import { BareAct } from './bareActsData';

export type BareActJurisdiction =
  | 'Central'
  | 'Haryana'
  | 'Punjab'
  | 'Uttar Pradesh'
  | 'Rajasthan'
  | 'Delhi'
  | 'Union Territory';

export type BareActCategory =
  | 'Constitutional'
  | 'Criminal'
  | 'Civil & Procedural'
  | 'Commercial & Corporate'
  | 'Family & Personal'
  | 'Property & Revenue'
  | 'Taxation'
  | 'Labour & Service'
  | 'Special & Local Laws';

export type BatchItemValidationStatus =
  | 'VALID'
  | 'DUPLICATE'
  | 'METADATA_REVIEW_REQUIRED'
  | 'INVALID_CORRUPT'
  | 'INVALID_PASSWORD';

export interface ManifestBareActEntry {
  filename: string;
  title: string;
  jurisdiction?: string;
  year?: string | number;
  category?: string;
  sourceUrl?: string;
}

export interface BareActBatchItem {
  id: string;
  originalFileName: string;
  storedPdfUrl: string;
  fileSizeBytes: number;
  checksumSha256: string;
  pageCount: number;
  extractedTextExcerpt: string;

  // Metadata extracted or from manifest
  detectedTitle: string;
  actNumber: string;
  year: number;
  jurisdiction: BareActJurisdiction;
  category: BareActCategory;
  preamble: string;

  // Validation & status
  validationStatus: BatchItemValidationStatus;
  validationMessage: string;
  isDuplicate: boolean;
  duplicateActTitle?: string;
  manifestMatched: boolean;
  sourceUrl?: string;
  confidenceScore: number; // 0-100
}

export interface BareActBatchJob {
  jobId: string;
  jobName: string;
  batchType: 'ZIP_ARCHIVE' | 'MULTIPLE_PDFS';
  archiveFileName: string;
  archiveSizeBytes: number;
  createdAt: string;
  updatedAt: string;
  status: 'PREVIEW_READY' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

  totalFilesFound: number;
  totalPdfsFound: number;
  successfulPdfValidations: number;
  duplicateFiles: number;
  invalidPdfs: number;
  metadataReviewRequiredCount: number;
  totalPdfPages: number;
  totalArchiveSizeBytes: number;

  items: BareActBatchItem[];
  logs: string[];
}

export interface BatchCommitRequest {
  jobId: string;
  selectedItemIds?: string[];
  editedItems?: Array<{
    id: string;
    title: string;
    actNumber?: string;
    year: number;
    jurisdiction: BareActJurisdiction;
    category: BareActCategory;
    preamble?: string;
  }>;
}

export interface BatchCommitResponse {
  success: boolean;
  jobId: string;
  importedCount: number;
  skippedDuplicatesCount: number;
  errors: string[];
  importedActs: BareAct[];
}
