// Comprehensive Data Models, Classification Taxonomy, Statutory Mappings & Seeded Records
// for PuniaAssociates AI Legal Document Intelligence, Bulk Import & Confidential Matter Vault

export type LegalDocumentType =
  | 'Court Judgment'
  | 'Interim Order'
  | 'Final Order'
  | 'Tribunal Decision'
  | 'Writ Petition'
  | 'Petition / Plaint'
  | 'Written Statement'
  | 'Rejoinder'
  | 'Affidavit'
  | 'Vakalatnama'
  | 'Legal Notice'
  | 'Contract / Agreement'
  | 'Statutory Provision / Bare Act'
  | 'Statutory Amendment'
  | 'Government Notification'
  | 'Regulation / Rule'
  | 'Departmental Circular'
  | 'Legal Research Paper'
  | 'Legal Article / Explainer'
  | 'Legal Opinion'
  | 'Court Filing / Application'
  | 'Evidence Document'
  | 'Client Correspondence'
  | 'Lawyer Profile / CV'
  | 'Legal FAQ'
  | 'Provisional / Verification Queue';

export const ALL_26_DOCUMENT_TYPES: LegalDocumentType[] = [
  'Court Judgment',
  'Interim Order',
  'Final Order',
  'Tribunal Decision',
  'Writ Petition',
  'Petition / Plaint',
  'Written Statement',
  'Rejoinder',
  'Affidavit',
  'Vakalatnama',
  'Legal Notice',
  'Contract / Agreement',
  'Statutory Provision / Bare Act',
  'Statutory Amendment',
  'Government Notification',
  'Regulation / Rule',
  'Departmental Circular',
  'Legal Research Paper',
  'Legal Article / Explainer',
  'Legal Opinion',
  'Court Filing / Application',
  'Evidence Document',
  'Client Correspondence',
  'Lawyer Profile / CV',
  'Legal FAQ',
  'Provisional / Verification Queue'
];

export type LegalPracticeArea =
  | 'Constitutional Law'
  | 'Civil Litigation and General Civil Disputes'
  | 'Criminal Law and Criminal Litigation'
  | 'Bharatiya Nyaya Sanhita and Criminal Substantive Law'
  | 'Criminal Procedure and Bharatiya Nagarik Suraksha Sanhita'
  | 'Evidence Law and Bharatiya Sakshya Adhiniyam'
  | 'Property Law and Real Estate'
  | 'Contract Law and Commercial Agreements'
  | 'Corporate and Company Law'
  | 'Arbitration, Conciliation and Alternative Dispute Resolution'
  | 'Family Law and Matrimonial Disputes'
  | 'Succession, Wills and Inheritance'
  | 'Labour and Employment Law'
  | 'Service Law and Government Employment'
  | 'Administrative Law'
  | 'Banking and Financial Law'
  | 'Insolvency and Bankruptcy Law'
  | 'Consumer Protection Law'
  | 'Intellectual Property Law'
  | 'Taxation and Revenue Law'
  | 'Cyber Law and Data Protection'
  | 'Environmental Law'
  | 'Motor Accident Claims and Insurance Law'
  | 'Consumer Property, Tenancy and Housing Disputes'
  | 'Education, University and Regulatory Law'
  | 'Writ Petitions and Public Interest Litigation'
  | 'Tribunal and Regulatory Litigation';

export const ALL_27_PRACTICE_AREAS: {
  id: string;
  area: LegalPracticeArea;
  partNumber: number;
  mappedWebsiteRoute: string;
  keyStatutes: string[];
  classificationRules: string;
}[] = [
  {
    id: 'pa-09',
    area: 'Constitutional Law',
    partNumber: 9,
    mappedWebsiteRoute: '/constitutional-law',
    keyStatutes: ['Constitution of India, 1950 (Articles 14, 19, 21, 32, 136, 141, 142, 226)'],
    classificationRules: 'Distinguishes substantive constitutional challenge or fundamental-rights adjudication from cases merely citing Article 14 or 226 procedurally.'
  },
  {
    id: 'pa-10',
    area: 'Civil Litigation and General Civil Disputes',
    partNumber: 10,
    mappedWebsiteRoute: '/civil-law',
    keyStatutes: ['Code of Civil Procedure, 1908', 'Specific Relief Act, 1963', 'Limitation Act, 1963'],
    classificationRules: 'Distinguishes recovery suits from title disputes, declarations from injunctions, and procedural adjournments from substantive decrees.'
  },
  {
    id: 'pa-11',
    area: 'Criminal Law and Criminal Litigation',
    partNumber: 11,
    mappedWebsiteRoute: '/criminal-law',
    keyStatutes: ['Bharatiya Nyaya Sanhita, 2023', 'Indian Penal Code, 1860', 'NDPS Act, 1985', 'POCSO Act, 2012'],
    classificationRules: 'Strictly separates FIR allegation, charge-sheet, framed charge, trial evidence, conviction, and acquittal. Never treats accused as convicted from an FIR.'
  },
  {
    id: 'pa-12',
    area: 'Bharatiya Nyaya Sanhita and Criminal Substantive Law',
    partNumber: 12,
    mappedWebsiteRoute: '/criminal-law',
    keyStatutes: ['Bharatiya Nyaya Sanhita, 2023 (Act 45 of 2023)', 'Indian Penal Code, 1860 (Historical Predecessor)'],
    classificationRules: 'Preserves exact historical IPC section numbers in pre-July 2024 judgments without silent substitution; links verified BNS comparisons separately.'
  },
  {
    id: 'pa-13',
    area: 'Criminal Procedure and Bharatiya Nagarik Suraksha Sanhita',
    partNumber: 13,
    mappedWebsiteRoute: '/criminal-law',
    keyStatutes: ['Bharatiya Nagarik Suraksha Sanhita, 2023 (Act 46 of 2023)', 'Code of Criminal Procedure, 1973'],
    classificationRules: 'Covers arrest, Sec 35 BNSS / Sec 41A CrPC notices, remand, anticipatory/regular bail, cognizance, discharge, and Sec 528 BNSS / Sec 482 CrPC quashing.'
  },
  {
    id: 'pa-14',
    area: 'Evidence Law and Bharatiya Sakshya Adhiniyam',
    partNumber: 14,
    mappedWebsiteRoute: '/criminal-law',
    keyStatutes: ['Bharatiya Sakshya Adhiniyam, 2023 (Act 47 of 2023)', 'Indian Evidence Act, 1872'],
    classificationRules: 'Covers admissibility, electronic records (Sec 63 BSA / Sec 65B IEA), burden of proof, dying declarations, and expert testimony.'
  },
  {
    id: 'pa-15',
    area: 'Property Law and Real Estate',
    partNumber: 15,
    mappedWebsiteRoute: '/property-law',
    keyStatutes: ['Transfer of Property Act, 1882', 'Registration Act, 1908', 'Punjab Land Revenue Act, 1887', 'UP Revenue Code, 2006'],
    classificationRules: 'Distinguishes title/ownership disputes from contractual sale disputes, agricultural Sanad Takseem partition, and land acquisition.'
  },
  {
    id: 'pa-16',
    area: 'Contract Law and Commercial Agreements',
    partNumber: 16,
    mappedWebsiteRoute: '/corporate-law',
    keyStatutes: ['Indian Contract Act, 1872', 'Specific Relief Act, 1963', 'Commercial Courts Act, 2015'],
    classificationRules: 'Separates contractual obligations from statutory duties; routes private executed agreements to Confidential Client Matter Vault by default.'
  },
  {
    id: 'pa-17',
    area: 'Corporate and Company Law',
    partNumber: 17,
    mappedWebsiteRoute: '/corporate-law',
    keyStatutes: ['Companies Act, 2013', 'Companies Act, 1956', 'SEBI Act, 1992', 'LLP Act, 2008'],
    classificationRules: 'Covers director duties, oppression and mismanagement (Secs 241-242), shareholder rights, and corporate restructuring.'
  },
  {
    id: 'pa-18',
    area: 'Arbitration, Conciliation and Alternative Dispute Resolution',
    partNumber: 18,
    mappedWebsiteRoute: '/international-arbitration',
    keyStatutes: ['Arbitration and Conciliation Act, 1996', 'Mediation Act, 2023'],
    classificationRules: 'Distinguishes Sec 8/11 referral orders, Sec 9 interim measures, Sec 16 Kompetenz-Kompetenz rulings, Sec 34 award challenges, and Sec 36 enforcement.'
  },
  {
    id: 'pa-19',
    area: 'Family Law and Matrimonial Disputes',
    partNumber: 19,
    mappedWebsiteRoute: '/family-law',
    keyStatutes: ['Hindu Marriage Act, 1955', 'Special Marriage Act, 1954', 'Guardians and Wards Act, 1890', 'PWDVA, 2005', 'Sec 144 BNSS / Sec 125 CrPC'],
    classificationRules: 'Default-private screening for personal/matrimonial records and minor identities; distinguishes maintenance, divorce, custody, and DV proceedings.'
  },
  {
    id: 'pa-20',
    area: 'Succession, Wills and Inheritance',
    partNumber: 20,
    mappedWebsiteRoute: '/family-law',
    keyStatutes: ['Indian Succession Act, 1925', 'Hindu Succession Act, 1956 (Sec 6 Coparcenary)'],
    classificationRules: 'Identifies testamentary vs. intestate succession, probate, letters of administration, and applicable personal law context.'
  },
  {
    id: 'pa-21',
    area: 'Labour and Employment Law',
    partNumber: 21,
    mappedWebsiteRoute: '/corporate-law',
    keyStatutes: ['Industrial Disputes Act, 1947', 'Industrial Relations Code, 2020', 'EPF Act, 1952', 'Payment of Gratuity Act, 1972'],
    classificationRules: 'Distinguishes industrial workmen disputes from managerial service contracts and social-security compliance.'
  },
  {
    id: 'pa-22',
    area: 'Service Law and Government Employment',
    partNumber: 22,
    mappedWebsiteRoute: '/constitutional-law',
    keyStatutes: ['Constitution of India (Articles 16, 309, 311)', 'Administrative Tribunals Act, 1985', 'Haryana Civil Services Rules'],
    classificationRules: 'Separates public/government service litigation (recruitment, seniority, ACR, disciplinary inquiry, pension) from private employment.'
  },
  {
    id: 'pa-23',
    area: 'Administrative Law',
    partNumber: 23,
    mappedWebsiteRoute: '/constitutional-law',
    keyStatutes: ['Constitution of India (Articles 14, 226)', 'Right to Information Act, 2005'],
    classificationRules: 'Covers natural justice (audi alteram partem), delegated legislation vires, proportionality, and judicial review of executive actions.'
  },
  {
    id: 'pa-24',
    area: 'Banking and Financial Law',
    partNumber: 24,
    mappedWebsiteRoute: '/corporate-law',
    keyStatutes: ['SARFAESI Act, 2002', 'Recovery of Debts and Bankruptcy Act, 1993', 'Negotiable Instruments Act, 1881 (Sec 138)'],
    classificationRules: 'Distinguishes DRT recovery, SARFAESI Sec 13(2)/13(4) enforcement, and NI Act Sec 138/143A cheque dishonour trials.'
  },
  {
    id: 'pa-25',
    area: 'Insolvency and Bankruptcy Law',
    partNumber: 25,
    mappedWebsiteRoute: '/mergers-acquisitions',
    keyStatutes: ['Insolvency and Bankruptcy Code, 2016 (Sec 7, 9, 14, 30, 31, 60)'],
    classificationRules: 'Distinguishes pre-admission default disputes from CIRP moratorium, CoC commercial wisdom, resolution plan approval, and liquidation.'
  },
  {
    id: 'pa-26',
    area: 'Consumer Protection Law',
    partNumber: 26,
    mappedWebsiteRoute: '/consumer-law',
    keyStatutes: ['Consumer Protection Act, 2019', 'Consumer Protection Act, 1986'],
    classificationRules: 'Distinguishes "consumer" vs. "commercial purpose" exclusions, medical negligence, product liability, and DCDRC/SCDRC/NCDRC stages.'
  },
  {
    id: 'pa-27',
    area: 'Intellectual Property Law',
    partNumber: 27,
    mappedWebsiteRoute: '/corporate-law',
    keyStatutes: ['Trade Marks Act, 1999', 'Copyright Act, 1957', 'Patents Act, 1970', 'Designs Act, 2000'],
    classificationRules: 'Distinguishes statutory infringement of registered marks/patents from common-law passing off and trade secret protection.'
  },
  {
    id: 'pa-28',
    area: 'Taxation and Revenue Law',
    partNumber: 28,
    mappedWebsiteRoute: '/corporate-law',
    keyStatutes: ['Income-tax Act, 1961', 'Central Goods and Services Tax Act, 2017', 'Customs Act, 1962'],
    classificationRules: 'Preserves assessment year (AY) statutory version; distinguishes show-cause notices (SCN), assessment orders, ITAT/CESTAT appeals, and High Court tax references.'
  },
  {
    id: 'pa-29',
    area: 'Cyber Law and Data Protection',
    partNumber: 29,
    mappedWebsiteRoute: '/cyber-law',
    keyStatutes: ['Information Technology Act, 2000', 'Digital Personal Data Protection Act, 2023', 'Bharatiya Sakshya Adhiniyam, 2023 (Sec 63)'],
    classificationRules: 'Separates cybercrime prosecution (Sec 66C/66D IT Act) from intermediary safe-harbour (Sec 79) and data protection compliance.'
  },
  {
    id: 'pa-30',
    area: 'Environmental Law',
    partNumber: 30,
    mappedWebsiteRoute: '/constitutional-law',
    keyStatutes: ['National Green Tribunal Act, 2010', 'Environment (Protection) Act, 1986', 'Water Act, 1974', 'Air Act, 1981'],
    classificationRules: 'Covers NGT jurisdiction, EIA clearances, polluter-pays principle, precautionary principle, and forest/wildlife conservation.'
  },
  {
    id: 'pa-31',
    area: 'Motor Accident Claims and Insurance Law',
    partNumber: 31,
    mappedWebsiteRoute: '/civil-law',
    keyStatutes: ['Motor Vehicles Act, 1988 (Secs 166, 164)', 'Insurance Act, 1938'],
    classificationRules: 'Covers MACT multiplier computation (Pranay Sethi / Sarla Verma), pay-and-recover directions, and policy breach defenses.'
  },
  {
    id: 'pa-32',
    area: 'Consumer Property, Tenancy and Housing Disputes',
    partNumber: 32,
    mappedWebsiteRoute: '/property-law',
    keyStatutes: ['Real Estate (Regulation and Development) Act, 2016 (RERA / HRERA / UP-RERA)', 'Haryana Urban Rent Act, 1973'],
    classificationRules: 'Distinguishes RERA delayed-possession refund/interest claims and statutory tenancy eviction from civil title suits.'
  },
  {
    id: 'pa-33',
    area: 'Education, University and Regulatory Law',
    partNumber: 33,
    mappedWebsiteRoute: '/constitutional-law',
    keyStatutes: ['UGC Act, 1956', 'National Medical Commission Act, 2019', 'Right of Children to Free and Compulsory Education Act, 2009'],
    classificationRules: 'Covers admission eligibility, NEET/university examination disputes, institutional affiliation, and academic disciplinary rules.'
  },
  {
    id: 'pa-34',
    area: 'Writ Petitions and Public Interest Litigation',
    partNumber: 34,
    mappedWebsiteRoute: '/constitutional-law',
    keyStatutes: ['Constitution of India (Articles 32 and 226)'],
    classificationRules: 'Treats Writ/PIL as procedural & constitutional posture while assigning primary substantive area (e.g., Service Law or Property Law) alongside Writ classification.'
  },
  {
    id: 'pa-35',
    area: 'Tribunal and Regulatory Litigation',
    partNumber: 35,
    mappedWebsiteRoute: '/courts',
    keyStatutes: ['Companies Act, 2013 (NCLT/NCLAT)', 'Consumer Protection Act, 2019', 'NGT Act, 2010', 'Armed Forces Tribunal Act, 2007'],
    classificationRules: 'Preserves tribunal order identity distinct from High Court/Supreme Court judgments; records statutory appeal route.'
  }
];

// 9 Independent Confidence Scores (Part 14, Section 67)
export interface IndependentConfidenceMatrix {
  documentTypeDetection: number; // 0-100
  textExtractionQuality: number; // 0-100
  courtIdentification: number;   // 0-100
  citationExtraction: number;    // 0-100
  statuteRecognition: number;    // 0-100
  primaryCategory: number;       // 0-100
  secondaryCategory: number;     // 0-100
  sourceAuthenticity: number;    // 0-100
  privacyClassification: number; // 0-100
}

// Explainable Legal Decision (Part 14, Section 66)
export interface ExplainableLegalClassification {
  primaryPracticeArea: LegalPracticeArea;
  secondaryPracticeAreas: LegalPracticeArea[];
  documentType: LegalDocumentType;
  reasoningSummary: string;
  keyIndicatorsFound: string[];
  proceduralPosture: string;
  substantiveVsProceduralNote: string;
  statutoryVersionNote: string;
  confidentialityReason: string;
  isLawyerVerified: boolean;
  verifiedByLawyer?: string;
  verifiedAt?: string;
}

// Jurisdiction & Court Classification (Part 4, Sections 6-8)
export interface ExtractedJurisdictionMetadata {
  country: 'India' | 'International / Comparative' | 'Foreign Jurisdiction';
  courtLevel:
    | 'Supreme Court of India'
    | 'High Court'
    | 'District and Sessions Court'
    | 'Civil Court'
    | 'Criminal Court'
    | 'Family Court'
    | 'Commercial Court'
    | 'Tribunal / Regulatory Commission'
    | 'Non-Judicial / Statutory / Contract';
  officialCourtName: string;
  stateOrUT?: string;
  district?: string;
  benchType?: 'Constitution Bench' | 'Full Bench' | 'Division Bench' | 'Single Bench' | 'Tribunal Bench' | 'Trial Court';
  coramJudges: string[];
  isHaryanaRelated: boolean;
  haryanaDistrict?: string;
  precedentialStatusNote: string; // e.g. "Assisted Analysis — Subject to verification of subsequent treatment"
}

// Extracted Citation & Statutory Mapping (Part 7, Sections 42-44)
export interface ExtractedStatutoryReference {
  statuteTitle: string;
  year: number;
  section: string;
  subsectionOrClause?: string;
  roleInDocument: 'Central to Decision' | 'Interpreted' | 'Procedurally Invoked' | 'Merely Mentioned';
  statutoryEra: 'Current Enactment (BNS/BNSS/BSA/Current)' | 'Historical Predecessor (IPC/CrPC/IEA/Repealed)';
  linkedBareActId?: string;
}

export interface ExtractedCaseCitation {
  rawCitationString: string;
  normalizedCaseTitle?: string;
  citationFormat: 'Neutral Citation (INSC/PHHC/DHC)' | 'SCC' | 'AIR' | 'SCR' | 'RCR' | 'Case Number Only' | 'Unverified Reference';
  issuingCourt?: string;
  decisionYear?: string;
  verificationStatus: 'Verified in Primary Repository' | 'Format Valid — Unverified External' | 'Research Required';
}

// Individual Processed Document Record inside an Ingestion Batch
export interface IngestedLegalDocumentRecord {
  id: string;
  batchJobId: string;
  sourceFileName: string;
  fileHierarchyPath: string;
  fileFormat: 'PDF' | 'DOCX' | 'DOC' | 'TXT' | 'HTML' | 'MD' | 'CSV' | 'XLSX' | 'JSON' | 'JSONL' | 'XML' | 'SCAN_IMAGE' | 'ZIP_ENTRY';
  fileSizeBytes: number;
  checksumSha256: string;
  uploadedAt: string;

  // Extraction & OCR Status
  ocrRequired: boolean;
  ocrStatus: 'Native Digital Text' | 'OCR Extracted (Marked as Assisted Transcription)' | 'Low Scan Quality — Flagged for Review';
  pageCount: number;
  extractedTextExcerpt: string;
  detectedSubDocumentsCount: number; // Detects combined PDFs without merging separate cases

  // Document Identification & Jurisdiction
  documentType: LegalDocumentType;
  isProvisionalType: boolean; // True if confidence < threshold -> Verification Queue
  jurisdiction: ExtractedJurisdictionMetadata;

  // Case / Statute / Matter Specific Metadata
  extractedTitle: string;
  caseNumber?: string;
  neutralCitation?: string;
  reporterCitation?: string;
  decisionOrDocumentDate?: string;
  parties?: { petitionerOrFirstParty: string; respondentOrSecondParty: string };
  statutesExtracted: ExtractedStatutoryReference[];
  citationsExtracted: ExtractedCaseCitation[];

  // AI Ratio / Obiter / Research Analysis (if Judgment/Order)
  judgmentAnalysis?: {
    factsSummary: string;
    proceduralHistory: string;
    questionsFramed: string[];
    petitionerArguments: string;
    respondentArguments: string;
    probableRatioDecidendi: string;
    ratioParagraphRefs: string[];
    probableObiterDicta: string;
    obiterParagraphRefs: string[];
    finalOperativeOrder: string;
    subsequentTreatmentStatus: 'Verified Good Law' | 'Distinguished / Explained' | 'Research Required — Not Verified';
    aiAssistedDisclaimer: string;
  };

  // Explainable Classification & 9 Independent Confidence Scores
  classification: ExplainableLegalClassification;
  confidenceMatrix: IndependentConfidenceMatrix;

  // Confidentiality & Target Domain Routing (Part 10)
  accessClassification: 'Public Knowledge Candidate' | 'Authorised Legal Research Library' | 'Confidential Client Matter Vault';
  containsSensitivePIIOrClientData: boolean;
  sensitivityFlags: string[];
  targetDomain:
    | 'Case Law Library'
    | 'Bare Acts & Legislation Library'
    | 'Public Legal Articles & FAQs'
    | 'Confidential Client Matter Vault'
    | 'Lawyer & Firm Profile Manager'
    | 'Legal Drafting & Templates Library'
    | 'Document Verification Queue';
  duplicateStatus: 'Unique Record' | 'Exact Checksum Duplicate' | 'Citation / Case Number Duplicate' | 'New Version / Amendment';
  reviewStatus: 'Auto-Segregated Confidential' | 'Awaiting Lawyer Verification' | 'Verified & Committed' | 'Rejected / Hold';
}

// Durable Background Import Job (Part 16, Section 74)
export interface BulkImportJobRecord {
  jobId: string;
  jobName: string;
  initiatedBy: string;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  status: 'Discovering' | 'Extracting & OCR' | 'AI Classifying' | 'Confidentiality Screening' | 'Paused' | 'Completed' | 'Cancelled';
  totalFilesDetected: number;
  processedFilesCount: number;
  batchSize: number;
  concurrencyLimit: number;
  currentCheckpointIndex: number;
  summaryCounts: {
    judgments: number;
    ordersAndTribunals: number;
    bareActsAndAmendments: number;
    pleadingsAndPetitions: number;
    contractsAndAgreements: number;
    legalNotices: number;
    researchPapersAndArticles: number;
    lawyerProfilesAndFaqs: number;
    imagesAndExhibits: number;
    unknownOrAmbiguous: number;
    ocrRequiredCount: number;
    poorQualityFlaggedCount: number;
    duplicatesSkippedCount: number;
    confidentialVaultRoutedCount: number;
    verificationQueueCount: number;
  };
  documentIds: string[];
  processingLogs: string[];
}

// Confidential Client Matter Vault Record (Part 10, Sections 53-55)
export interface ConfidentialClientMatter {
  id: string;
  matterReferenceCode: string; // e.g. "PA-MAT-2026-089"
  clientName: string;
  matterTitle: string;
  primaryPracticeArea: LegalPracticeArea;
  courtOrForum: string;
  caseNumber?: string;
  AssignedLeadAdvocate: string;
  authorizedTeamRoles: ('SuperAdmin' | 'ManagingLawyer' | 'AssignedAdvocate')[];
  opposingParty?: string;
  filingDate?: string;
  nextHearingDate?: string;
  suggestedLimitationNote?: string; // Explicitly marked as unverified suggestion requiring lawyer confirmation
  matterStatus: 'Active Litigation' | 'Pre-Litigation / Notice Stage' | 'Advisory / Contract Review' | 'Stay Granted' | 'Disposed / Archived';
  confidentialityLevel: 'Strictly Confidential — Client Privileged' | 'Sensitive Family / Minor Record' | 'Financial / Corporate Secret';
  publicIndexingBlocked: true; // Hard invariant: always true
  externalAiTransmissionBlocked: boolean;
  documents: {
    docId: string;
    fileName: string;
    documentType: LegalDocumentType;
    uploadedAt: string;
    uploadedBy: string;
    storagePath: string; // Protected private path
    checksumSha256: string;
    privateLawyerNotes: string;
    extractedExplicitDates: string[];
  }[];
  auditTrail: {
    timestamp: string;
    actor: string;
    action: string;
  }[];
}

// Old vs. New Criminal Law Statutory Cross-Reference (Part 6, Section 39)
export interface CriminalLawStatutoryMapping {
  id: string;
  topic: string;
  historicalAct: 'Indian Penal Code, 1860' | 'Code of Criminal Procedure, 1973' | 'Indian Evidence Act, 1872';
  historicalSection: string;
  historicalHeading: string;
  historicalTextSummary: string;
  newAct: 'Bharatiya Nyaya Sanhita, 2023' | 'Bharatiya Nagarik Suraksha Sanhita, 2023' | 'Bharatiya Sakshya Adhiniyam, 2023';
  newSection: string;
  newHeading: string;
  commencementDate: string; // "2024-07-01"
  equivalenceType: 'Substantially Equivalent with Updated Wording' | 'Modified Scope / Procedural Timelines Added' | 'Newly Introduced Offence / Provision' | 'No Direct One-to-One Equivalent';
  keyLegislativeChanges: string[];
  transitionalRuleNote: string;
  verifiedLandmarksOnHistoricalSection: string[];
}

// Legislation Amendment & Version Tracking Record (Part 6, Section 38)
export interface LegislationAmendmentRecord {
  id: string;
  principalActId: string;
  principalActTitle: string;
  instrumentType: 'Principal Enactment' | 'Amending Act' | 'Statutory Rule' | 'Commencement Notification' | 'Departmental Circular';
  title: string;
  actOrNotificationNumber: string;
  enactmentDate: string;
  commencementDate: string;
  commencementStatus: 'In Force (Verified Notification)' | 'Partially Notified' | 'Awaiting Commencement Notification — Flagged';
  sectionsAmended: {
    sectionNumber: string;
    action: 'Substituted' | 'Inserted' | 'Omitted' | 'Amended';
    summaryOfChange: string;
  }[];
  transitionalProvisionsNote: string;
  officialSourceUrl: string;
  versionLabel: string;
}

// Legal Drafting Template (Part 12, Sections 58-59)
export interface LegalDraftingTemplate {
  id: string;
  title: string;
  documentType: LegalDocumentType;
  primaryPracticeArea: LegalPracticeArea;
  jurisdiction: string;
  courtForum: string;
  applicableStatutes: string[];
  version: string;
  reviewStatus: 'Lawyer Approved Template' | 'Draft Template — Review Required';
  approvedBy: string;
  requiredFactPlaceholders: string[];
  templateBody: string;
  proceduralNotes: string;
}

// Lawyer Profile Extraction Queue (Part 11, Section 56)
export interface LawyerProfileExtractionRecord {
  id: string;
  sourceFileName: string;
  proposedName: string;
  proposedDesignation: string;
  academicQualifications: string[]; // Distinguished from professional licence
  barEnrolmentDetails: string;      // Distinguished from academic degree
  enrolmentVerificationStatus: 'Verified by Admin' | 'Pending Bar Verification — Do Not Publish';
  proposedPracticeAreas: LegalPracticeArea[];
  proposedPrimaryCourts: string[];
  experienceYearsClaimed?: number;
  languages: string[];
  publicationsExtracted: string[];
  biographyDraft: string;
  publicationApprovalStatus: 'Approved & Published on Team Page' | 'Pending Admin Verification';
  extractedAt: string;
}

// ---------------------------------------------------------------------------
// SEEDED OLD vs NEW CRIMINAL LAW MAPPINGS (IPC/CrPC/IEA <-> BNS/BNSS/BSA)
// ---------------------------------------------------------------------------
export const CRIMINAL_LAW_STATUTORY_MAPPINGS: CriminalLawStatutoryMapping[] = [
  {
    id: 'map-crpc438-bnss482',
    topic: 'Direction for grant of bail to person apprehending arrest (Anticipatory Bail)',
    historicalAct: 'Code of Criminal Procedure, 1973',
    historicalSection: 'Section 438 CrPC',
    historicalHeading: 'Direction for grant of bail to person apprehending arrest',
    historicalTextSummary: 'Empowered the High Court or Court of Session to direct release on bail in the event of arrest for a non-bailable offence, with factors including nature and gravity of accusation and antecedents.',
    newAct: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    newSection: 'Section 482 BNSS',
    newHeading: 'Direction for grant of bail to person apprehending arrest',
    commencementDate: '2024-07-01',
    equivalenceType: 'Modified Scope / Procedural Timelines Added',
    keyLegislativeChanges: [
      'Sub-section (4) of Section 482 BNSS excludes anticipatory bail for offences under Section 65 and Section 70(2) of BNS 2023 (gang rape on woman under 18 years).',
      'Retains the core discretionary framework interpreted by the 5-Judge Constitution Bench in Sushila Aggarwal v. State (NCT of Delhi), 2020 INSC 106.'
    ],
    transitionalRuleNote: 'Under Section 531 BNSS, FIRs registered prior to 01-07-2024 continue to be governed by CrPC 1973 for pending proceedings, while fresh FIRs on or after 01-07-2024 invoke Section 482 BNSS.',
    verifiedLandmarksOnHistoricalSection: [
      'Gurbaksh Singh Sibbia v. State of Punjab, (1980) 2 SCC 565',
      'Sushila Aggarwal v. State (NCT of Delhi), 2020 INSC 106'
    ]
  },
  {
    id: 'map-crpc41a-bnss35',
    topic: 'Notice of appearance before police officer & conditions of arrest',
    historicalAct: 'Code of Criminal Procedure, 1973',
    historicalSection: 'Sections 41 & 41A CrPC',
    historicalHeading: 'When police may arrest without warrant & Notice of appearance',
    historicalTextSummary: 'Mandated checklist satisfaction for offences punishable up to 7 years and issuance of Section 41A notice of appearance where arrest is not immediately required.',
    newAct: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    newSection: 'Section 35 BNSS',
    newHeading: 'When police may arrest without warrant and Notice of appearance',
    commencementDate: '2024-07-01',
    equivalenceType: 'Modified Scope / Procedural Timelines Added',
    keyLegislativeChanges: [
      'Consolidates Sections 41 and 41A CrPC into a single composite Section 35 BNSS.',
      'Section 35(7) BNSS introduces a new safeguard: no arrest shall be made without prior permission of an officer not below the rank of Deputy Superintendent of Police (DSP) in case of an offence punishable for less than 3 years where the person is infirm or above 60 years of age.'
    ],
    transitionalRuleNote: 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 and Satender Kumar Antil v. CBI (2022) 10 SCC 51 guidelines apply with full force to Section 35 BNSS.',
    verifiedLandmarksOnHistoricalSection: [
      'Arnesh Kumar v. State of Bihar, 2014 INSC 478',
      'Satender Kumar Antil v. CBI, 2022 INSC 690'
    ]
  },
  {
    id: 'map-crpc482-bnss528',
    topic: 'Saving of inherent powers of High Court (Quashing of FIR / Criminal Proceedings)',
    historicalAct: 'Code of Criminal Procedure, 1973',
    historicalSection: 'Section 482 CrPC',
    historicalHeading: 'Saving of inherent powers of High Court',
    historicalTextSummary: 'Preserved inherent power of the High Court to make orders necessary to give effect to any order under the Code, prevent abuse of the process of any Court, or secure the ends of justice.',
    newAct: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    newSection: 'Section 528 BNSS',
    newHeading: 'Saving of inherent powers of High Court',
    commencementDate: '2024-07-01',
    equivalenceType: 'Substantially Equivalent with Updated Wording',
    keyLegislativeChanges: [
      'Verbatim preservation of the High Court’s plenary inherent jurisdiction ("nothing in this Sanhita shall be deemed to limit or affect the inherent powers of the High Court").',
      'Original source references in pre-2024 judgments must remain cited as Section 482 CrPC.'
    ],
    transitionalRuleNote: 'Petitions challenging FIRs registered post July 1, 2024 are styled under Section 528 BNSS.',
    verifiedLandmarksOnHistoricalSection: [
      'State of Haryana v. Bhajan Lal, 1992 Supp (1) SCC 335',
      'Gian Singh v. State of Punjab, (2012) 10 SCC 303',
      'Neeharika Infrastructure Pvt. Ltd. v. State of Maharashtra, 2021 INSC 253'
    ]
  },
  {
    id: 'map-iea65b-bsa63',
    topic: 'Admissibility of Electronic Records & Certificate Requirement',
    historicalAct: 'Indian Evidence Act, 1872',
    historicalSection: 'Section 65B IEA',
    historicalHeading: 'Admissibility of electronic records',
    historicalTextSummary: 'Required a mandatory certificate under Section 65B(4) identifying the electronic record and describing the manner in which it was produced by a computer.',
    newAct: 'Bharatiya Sakshya Adhiniyam, 2023',
    newSection: 'Section 63 BSA',
    newHeading: 'Admissibility of electronic records',
    commencementDate: '2024-07-01',
    equivalenceType: 'Modified Scope / Procedural Timelines Added',
    keyLegislativeChanges: [
      'Expands scope to include semiconductor memories, communication devices, server logs, and cloud-stored electronic records.',
      'Prescribes a standardized Schedule certificate format signed by both the person in charge of the device and an expert where applicable.'
    ],
    transitionalRuleNote: 'Do not assume a Section 65B IEA certificate automatically satisfies the two-part Schedule format of Section 63 BSA for trials governed by the 2023 Adhiniyam.',
    verifiedLandmarksOnHistoricalSection: [
      'Anvar P.V. v. P.K. Basheer, (2014) 10 SCC 473',
      'Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal, (2020) 7 SCC 1'
    ]
  },
  {
    id: 'map-ipc420-bns318',
    topic: 'Cheating and dishonestly inducing delivery of property',
    historicalAct: 'Indian Penal Code, 1860',
    historicalSection: 'Section 420 IPC',
    historicalHeading: 'Cheating and dishonestly inducing delivery of property',
    historicalTextSummary: 'Punished cheating and dishonestly inducing delivery of any property or alteration/destruction of a valuable security with imprisonment up to 7 years and fine.',
    newAct: 'Bharatiya Nyaya Sanhita, 2023',
    newSection: 'Section 318(4) BNS',
    newHeading: 'Cheating (Sub-section 4: dishonestly inducing delivery of property)',
    commencementDate: '2024-07-01',
    equivalenceType: 'Modified Scope / Procedural Timelines Added',
    keyLegislativeChanges: [
      'Consolidates cheating definitions (formerly Sec 415, 417, 420 IPC) into subsections of Section 318 BNS.',
      'Section 318(2) enhances punishment for simple cheating from 1 year (under Sec 417 IPC) to 3 years; Section 318(4) retains up to 7 years imprisonment for dishonestly inducing delivery of property.'
    ],
    transitionalRuleNote: 'Always preserve "Section 420 IPC" when citing historical judgments; cross-reference Section 318(4) BNS only for offences committed on or after 01-07-2024.',
    verifiedLandmarksOnHistoricalSection: [
      'Hridaya Ranjan Prasad Verma v. State of Bihar, (2000) 4 SCC 168',
      'Lalita Kumari v. Govt. of UP, 2013 INSC 748 (Preliminary Inquiry in Commercial Offences)'
    ]
  },
  {
    id: 'map-ipc302-bns103',
    topic: 'Punishment for Murder & Mob Lynching Sub-classification',
    historicalAct: 'Indian Penal Code, 1860',
    historicalSection: 'Section 302 IPC',
    historicalHeading: 'Punishment for murder',
    historicalTextSummary: 'Prescribed death or imprisonment for life, and fine, for anyone who commits murder.',
    newAct: 'Bharatiya Nyaya Sanhita, 2023',
    newSection: 'Section 103(1) & 103(2) BNS',
    newHeading: 'Punishment for murder',
    commencementDate: '2024-07-01',
    equivalenceType: 'Modified Scope / Procedural Timelines Added',
    keyLegislativeChanges: [
      'Section 103(1) BNS corresponds to Section 302 IPC.',
      'Section 103(2) BNS introduces a distinct statutory provision where a group of five or more persons acting in concert commits murder on grounds of race, caste, community, sex, place of birth, language, or personal belief.'
    ],
    transitionalRuleNote: 'Do not retroactively label pre-July 2024 trials under Section 103 BNS.',
    verifiedLandmarksOnHistoricalSection: [
      'Bachan Singh v. State of Punjab, (1980) 2 SCC 684',
      'Virsa Singh v. State of Punjab, 1958 SCR 1495'
    ]
  }
];

// ---------------------------------------------------------------------------
// SEEDED LEGISLATION AMENDMENT & VERSION TRACKING RECORDS
// ---------------------------------------------------------------------------
export const INITIAL_LEGISLATION_AMENDMENTS: LegislationAmendmentRecord[] = [
  {
    id: 'amd-bnss-commencement-2024',
    principalActId: 'bharatiya-nagarik-suraksha-sanhita-2023',
    principalActTitle: 'The Bharatiya Nagarik Suraksha Sanhita, 2023 (Act No. 46 of 2023)',
    instrumentType: 'Commencement Notification',
    title: 'MHA Gazette Notification S.O. 848(E) — Commencement of BNSS, 2023',
    actOrNotificationNumber: 'S.O. 848(E), Ministry of Home Affairs',
    enactmentDate: '2023-12-25',
    commencementDate: '2024-07-01',
    commencementStatus: 'In Force (Verified Notification)',
    sectionsAmended: [
      {
        sectionNumber: 'Section 1(3)',
        action: 'Amended',
        summaryOfChange: 'Brought all provisions of the Bharatiya Nagarik Suraksha Sanhita, 2023 into force w.e.f. 1st July, 2024.'
      }
    ],
    transitionalProvisionsNote: 'Section 531(2) BNSS governs pending appeals, applications, trials, inquiries, and investigations pending immediately before 01-07-2024 under CrPC 1973.',
    officialSourceUrl: 'https://egazette.gov.in/',
    versionLabel: 'v2024.07 (Enforced Text)'
  },
  {
    id: 'amd-bns-commencement-2024',
    principalActId: 'bharatiya-nyaya-sanhita-2023',
    principalActTitle: 'The Bharatiya Nyaya Sanhita, 2023 (Act No. 45 of 2023)',
    instrumentType: 'Commencement Notification',
    title: 'MHA Gazette Notification S.O. 850(E) — Commencement of BNS, 2023 (Except Sec 106(2))',
    actOrNotificationNumber: 'S.O. 850(E), Ministry of Home Affairs',
    enactmentDate: '2023-12-25',
    commencementDate: '2024-07-01',
    commencementStatus: 'Partially Notified',
    sectionsAmended: [
      {
        sectionNumber: 'Section 106(2)',
        action: 'Amended',
        summaryOfChange: 'Commencement of Section 106(2) (enhanced punishment in hit-and-run cases without reporting) kept in abeyance pending separate notification; Section 106(1) enforced w.e.f. 01-07-2024.'
      }
    ],
    transitionalProvisionsNote: 'Demonstrates critical distinction between Presidential Assent date (25-12-2023) and selective Commencement Notification date (01-07-2024). Section 106(2) flagged as awaiting separate commencement notification.',
    officialSourceUrl: 'https://egazette.gov.in/',
    versionLabel: 'v2024.07 (Partial Commencement Flagged)'
  },
  {
    id: 'amd-arbitration-2015-2019-2021',
    principalActId: 'arbitration-conciliation-act-1996',
    principalActTitle: 'The Arbitration and Conciliation Act, 1996 (Act No. 26 of 1996)',
    instrumentType: 'Amending Act',
    title: 'The Arbitration and Conciliation (Amendment) Act, 2021 (Act No. 3 of 2021)',
    actOrNotificationNumber: 'Act No. 3 of 2021',
    enactmentDate: '2021-03-11',
    commencementDate: '2015-10-23',
    commencementStatus: 'In Force (Verified Notification)',
    sectionsAmended: [
      {
        sectionNumber: 'Section 36(3) Proviso',
        action: 'Inserted',
        summaryOfChange: 'Inserted second proviso empowering Court to grant unconditional stay of arbitral award where prima facie satisfied that the arbitration agreement/contract or making of the award was induced or effected by fraud or corruption.'
      },
      {
        sectionNumber: 'Section 43J & Eighth Schedule',
        action: 'Omitted',
        summaryOfChange: 'Omitted the Eighth Schedule prescribing qualifications and norms for accreditation of arbitrators.'
      }
    ],
    transitionalProvisionsNote: 'Version history preserved separately from the 1996 Principal Act, 2015 Amendment Act, and 2019 Amendment Act.',
    officialSourceUrl: 'https://www.indiacode.nic.in/',
    versionLabel: 'v2021.03 (Amended Statutory Version)'
  }
];

// ---------------------------------------------------------------------------
// SEEDED CONFIDENTIAL CLIENT MATTERS (Segregated Private Vault — Part 10)
// ---------------------------------------------------------------------------
export const INITIAL_CONFIDENTIAL_MATTERS: ConfidentialClientMatter[] = [
  {
    id: 'matter-vault-001',
    matterReferenceCode: 'PA-MAT-2026-HR-041',
    clientName: 'Rao Inderjeet Singh & Co-Sharers (Private Chamber Record)',
    matterTitle: 'Agricultural Partition Challenge & Interim Stay on Khewats 44-48, Tehsil Manesar, Gurugram',
    primaryPracticeArea: 'Property Law and Real Estate',
    courtOrForum: 'High Court of Punjab and Haryana at Chandigarh',
    caseNumber: 'CWP-29410-2026 (Draft / Filing Stage)',
    AssignedLeadAdvocate: 'Adv. Rajeshwar S. Punia',
    authorizedTeamRoles: ['SuperAdmin', 'ManagingLawyer', 'AssignedAdvocate'],
    opposingParty: 'Financial Commissioner Revenue Haryana & Ors.',
    filingDate: '2026-11-04',
    nextHearingDate: '2026-11-24',
    suggestedLimitationNote: '[UNVERIFIED AI SUGGESTION — REQUIRES LAWYER CONFIRMATION]: Impugned Financial Commissioner order dated 2026-09-18; writ petition filed within 47 days (no rigid statutory limitation under Art. 226, laches doctrine satisfied).',
    matterStatus: 'Active Litigation',
    confidentialityLevel: 'Strictly Confidential — Client Privileged',
    publicIndexingBlocked: true,
    externalAiTransmissionBlocked: true,
    documents: [
      {
        docId: 'vault-doc-101',
        fileName: 'Draft_Civil_Writ_Petition_Sanad_Takseem_Manesar_Privileged.docx',
        documentType: 'Writ Petition',
        uploadedAt: '2026-11-05 04:15 PM',
        uploadedBy: 'Adv. Rajeshwar S. Punia',
        storagePath: '/private-vault/matters/PA-MAT-2026-HR-041/Draft_Civil_Writ_Petition.docx',
        checksumSha256: '8f9d2a1b4c3e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01',
        privateLawyerNotes: 'Contains private Jamabandi khewat numbers, family settlement deed, and client Aadhaar redactions. Strictly excluded from public search.',
        extractedExplicitDates: ['2026-09-18 (Impugned Order Date)', '2026-11-04 (Affidavit Verification Date)', '2026-11-24 (Listed Motion Date)']
      },
      {
        docId: 'vault-doc-102',
        fileName: 'Signed_Vakalatnama_and_Jamabandi_Annexure_P1.pdf',
        documentType: 'Vakalatnama',
        uploadedAt: '2026-11-05 04:20 PM',
        uploadedBy: 'Adv. Rajeshwar S. Punia',
        storagePath: '/private-vault/matters/PA-MAT-2026-HR-041/Signed_Vakalatnama.pdf',
        checksumSha256: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
        privateLawyerNotes: 'Original signed Vakalatnama and certified mutation copy.',
        extractedExplicitDates: ['2026-11-03 (Execution Date)']
      }
    ],
    auditTrail: [
      {
        timestamp: '2026-11-05 04:15 PM IST',
        actor: 'Adv. Rajeshwar S. Punia (SuperAdmin)',
        action: 'Auto-segregated uploaded client writ petition into Confidential Client Matter Vault; blocked public SEO & search indexing.'
      }
    ]
  },
  {
    id: 'matter-vault-002',
    matterReferenceCode: 'PA-MAT-2026-DL-088',
    clientName: 'Confidential Matrimonial Petitioner (Identity Protected under Sec 22 HMA)',
    matterTitle: 'Mutual Consent Divorce & Child Custody Settlement Memorandum, Family Court Saket',
    primaryPracticeArea: 'Family Law and Matrimonial Disputes',
    courtOrForum: 'Principal Judge, Family Court, Saket, New Delhi',
    caseNumber: 'HMA Petition No. 1429/2026',
    AssignedLeadAdvocate: 'Adv. S. K. Punia',
    authorizedTeamRoles: ['SuperAdmin', 'ManagingLawyer'],
    filingDate: '2026-10-29',
    nextHearingDate: '2026-12-02',
    suggestedLimitationNote: '[UNVERIFIED AI SUGGESTION — REQUIRES LAWYER CONFIRMATION]: Second motion cooling-off waiver application under Section 13B(2) HMA per Amardeep Singh v. Harveen Kaur (2017) 8 SCC 746.',
    matterStatus: 'Active Litigation',
    confidentialityLevel: 'Sensitive Family / Minor Record',
    publicIndexingBlocked: true,
    externalAiTransmissionBlocked: true,
    documents: [
      {
        docId: 'vault-doc-201',
        fileName: 'Confidential_MOU_Child_Visitation_and_Alimony_Schedule.pdf',
        documentType: 'Contract / Agreement',
        uploadedAt: '2026-10-29 11:30 AM',
        uploadedBy: 'Adv. S. K. Punia',
        storagePath: '/private-vault/matters/PA-MAT-2026-DL-088/Confidential_MOU.pdf',
        checksumSha256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
        privateLawyerNotes: 'Contains minor child school particulars and bank account numbers. Protected by default under Part 5 Section 19 & Part 10 Section 53.',
        extractedExplicitDates: ['2026-10-28 (MOU Signing Date)', '2026-12-02 (First Motion Recording Date)']
      }
    ],
    auditTrail: [
      {
        timestamp: '2026-10-29 11:30 AM IST',
        actor: 'System Confidentiality Classifier',
        action: 'Detected matrimonial MOU & minor details; enforced strict vault isolation.'
      }
    ]
  }
];

// ---------------------------------------------------------------------------
// SEEDED LEGAL DRAFTING TEMPLATES (Part 12, Sections 58-59)
// ---------------------------------------------------------------------------
export const INITIAL_LEGAL_DRAFTING_TEMPLATES: LegalDraftingTemplate[] = [
  {
    id: 'tpl-bnss-482-anticipatory-bail',
    title: 'Petition for Anticipatory Bail under Section 482 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (High Court Format)',
    documentType: 'Petition / Plaint',
    primaryPracticeArea: 'Criminal Procedure and Bharatiya Nagarik Suraksha Sanhita',
    jurisdiction: 'Haryana & Punjab (High Court of Punjab and Haryana at Chandigarh)',
    courtForum: 'High Court of Punjab and Haryana at Chandigarh',
    applicableStatutes: ['Bharatiya Nagarik Suraksha Sanhita, 2023 (Section 482)', 'Bharatiya Nyaya Sanhita, 2023'],
    version: 'v2026.2 (BNSS Compliant)',
    reviewStatus: 'Lawyer Approved Template',
    approvedBy: 'Adv. Rajeshwar S. Punia (Senior Advocate)',
    requiredFactPlaceholders: [
      'PETITIONER_FULL_NAME_AND_AGE',
      'FIR_NUMBER_AND_DATE',
      'POLICE_STATION_AND_DISTRICT',
      'OFFENCE_SECTIONS_INVOKED',
      'DATE_OF_SESSIONS_COURT_REJECTION_ORDER',
      'SPECIFIC_ROLE_AND_ALLEGATION_IN_FIR',
      'GROUNDS_FOR_FALSE_IMPLICATION_AND_COOPERATION'
    ],
    proceduralNotes: 'Requires certified/true typed copy of FIR (Annexure P-1), Sessions Court rejection order (Annexure P-2), and mandatory declaration regarding non-pendency of any other petition before any court.',
    templateBody: `[DRAFT FOR LAWYER REVIEW ONLY — DO NOT FILE WITHOUT VERIFICATION]

IN THE HIGH COURT OF PUNJAB AND HARYANA AT CHANDIGARH
CRM-M No. ________ of 2026

IN THE MATTER OF:
{{PETITIONER_FULL_NAME_AND_AGE}}
...Petitioner
VERSUS
State of Haryana through Station House Officer, {{POLICE_STATION_AND_DISTRICT}}
...Respondent

PETITION UNDER SECTION 482 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 FOR GRANT OF ANTICIPATORY BAIL IN FIR NO. {{FIR_NUMBER_AND_DATE}} REGISTERED UNDER SECTIONS {{OFFENCE_SECTIONS_INVOKED}} AT POLICE STATION {{POLICE_STATION_AND_DISTRICT}}.

RESPECTFULLY SHOWETH:
1. That the petitioner is a law-abiding citizen and has been falsely implicated in the present FIR No. {{FIR_NUMBER_AND_DATE}}.
2. That a bare perusal of the FIR reveals the following factual allegations: {{SPECIFIC_ROLE_AND_ALLEGATION_IN_FIR}}.
3. That the learned Court of Session declined pre-arrest bail vide order dated {{DATE_OF_SESSIONS_COURT_REJECTION_ORDER}} (Annexure P-2).
4. That custodial interrogation of the petitioner is not warranted on the following grounds: {{GROUNDS_FOR_FALSE_IMPLICATION_AND_COOPERATION}}.
5. That the petitioner undertakes to join investigation as and when directed under Section 35 BNSS and abide by all conditions under Section 482(2) BNSS.

PRAYER:
It is, therefore, respectfully prayed that this Hon'ble Court may graciously be pleased to grant anticipatory bail to the petitioner in the event of arrest in FIR No. {{FIR_NUMBER_AND_DATE}}.

PLACE: CHANDIGARH
THROUGH COUNSEL:
PUNIA ASSOCIATES, ADVOCATES`
  },
  {
    id: 'tpl-ni138-statutory-notice',
    title: 'Statutory Demand Notice under Section 138 Proviso (b) of the Negotiable Instruments Act, 1881',
    documentType: 'Legal Notice',
    primaryPracticeArea: 'Banking and Financial Law',
    jurisdiction: 'All India (15-Day Statutory Limitation Period)',
    courtForum: 'Pre-Litigation Statutory Notice (Judicial Magistrate 1st Class)',
    applicableStatutes: ['Negotiable Instruments Act, 1881 (Sections 138, 139, 141, 142)'],
    version: 'v2026.1',
    reviewStatus: 'Lawyer Approved Template',
    approvedBy: 'Adv. Vikram Singh Punia',
    requiredFactPlaceholders: [
      'CREDITOR_CLIENT_NAME_AND_ADDRESS',
      'DRAWER_ACCUSED_NAME_AND_ADDRESS',
      'NATURE_OF_LEGALLY_ENFORCEABLE_DEBT',
      'CHEQUE_NUMBER_DATE_AND_AMOUNT',
      'DRAWEE_BANK_AND_BRANCH',
      'RETURN_MEMO_DATE_AND_DISHONOUR_REASON'
    ],
    proceduralNotes: 'Must be dispatched within 30 days of receipt of the bank return memo. The drawer has 15 days from receipt of notice to make payment, failing which cause of action arises under Section 142(1)(b) NI Act.',
    templateBody: `[DRAFT FOR LAWYER REVIEW ONLY — VERIFY LIMITATION DATES BEFORE DISPATCH]

STATUTORY LEGAL DEMAND NOTICE UNDER SECTION 138(b) OF THE NEGOTIABLE INSTRUMENTS ACT, 1881
BY REGISTERED AD / SPEED POST / WHATSAPP

To,
{{DRAWER_ACCUSED_NAME_AND_ADDRESS}}

Under instructions from and on behalf of our client, {{CREDITOR_CLIENT_NAME_AND_ADDRESS}}, we hereby serve upon you the following statutory legal notice:

1. That in discharge of your legally enforceable debt and liability arising out of {{NATURE_OF_LEGALLY_ENFORCEABLE_DEBT}}, you issued Cheque No. {{CHEQUE_NUMBER_DATE_AND_AMOUNT}} drawn on {{DRAWEE_BANK_AND_BRANCH}}.
2. That upon presentation, the said cheque was dishonoured and returned unpaid vide Bank Return Memo dated {{RETURN_MEMO_DATE_AND_DISHONOUR_REASON}}.
3. You are hereby called upon to pay the exact cheque amount of {{CHEQUE_NUMBER_DATE_AND_AMOUNT}} within 15 (fifteen) days from the receipt of this notice, failing which our client shall initiate criminal prosecution under Section 138 read with Section 142 of the Negotiable Instruments Act, 1881, alongside civil recovery remedies.

ADVOCATE SIGNATURE
PUNIA ASSOCIATES CHAMBERS`
  },
  {
    id: 'tpl-cpc-order39-injunction',
    title: 'Application for Ad-Interim Temporary Injunction under Order XXXIX Rules 1 & 2 read with Section 151 CPC, 1908',
    documentType: 'Court Filing / Application',
    primaryPracticeArea: 'Civil Litigation and General Civil Disputes',
    jurisdiction: 'Haryana, Punjab, Delhi NCR, UP & Rajasthan Civil Courts',
    courtForum: 'Court of Civil Judge (Senior Division)',
    applicableStatutes: ['Code of Civil Procedure, 1908 (Order XXXIX Rules 1 & 2, Section 151)', 'Specific Relief Act, 1963 (Section 38)'],
    version: 'v2026.1',
    reviewStatus: 'Lawyer Approved Template',
    approvedBy: 'Adv. Rajeshwar S. Punia',
    requiredFactPlaceholders: [
      'PLAINTIFF_NAME',
      'DEFENDANT_NAME',
      'SUIT_PROPERTY_DESCRIPTION_AND_KHEWAT_NO',
      'DOCUMENTARY_PROOF_OF_POSSESSION',
      'DATE_OF_THREATENED_DISPOSSESSION_OR_ALIENATION'
    ],
    proceduralNotes: 'Must be accompanied by a duly sworn affidavit and compliance with Order XXXIX Rule 3 proviso if ex-parte ad-interim stay is prayed for.',
    templateBody: `[DRAFT FOR LAWYER REVIEW ONLY — DO NOT FILE WITHOUT VERIFICATION]

IN THE COURT OF CIVIL JUDGE (SENIOR DIVISION)
Civil Suit No. ________ of 2026

{{PLAINTIFF_NAME}} ...Plaintiff/Applicant
Versus
{{DEFENDANT_NAME}} ...Defendant/Respondent

APPLICATION UNDER ORDER XXXIX RULES 1 AND 2 READ WITH SECTION 151 OF THE CODE OF CIVIL PROCEDURE, 1908 FOR GRANT OF AD-INTERIM TEMPORARY INJUNCTION.

RESPECTFULLY SHOWETH:
1. That the plaintiff has filed the accompanying suit for permanent injunction concerning property described as: {{SUIT_PROPERTY_DESCRIPTION_AND_KHEWAT_NO}}.
2. That the plaintiff is in settled peaceful possession as evidenced by: {{DOCUMENTARY_PROOF_OF_POSSESSION}}.
3. That on {{DATE_OF_THREATENED_DISPOSSESSION_OR_ALIENATION}}, the defendant threatened to forcibly dispossess the plaintiff and create third-party rights.
4. That the plaintiff has a strong prima facie case, the balance of convenience lies in favour of the plaintiff, and irreparable loss would be caused if status quo is not maintained.

PRAYER:
It is prayed that an ad-interim injunction restraining the defendant from interfering in peaceful possession or alienating {{SUIT_PROPERTY_DESCRIPTION_AND_KHEWAT_NO}} may kindly be granted during the pendency of the suit.`
  }
];

// ---------------------------------------------------------------------------
// SEEDED LAWYER PROFILE EXTRACTION QUEUE (Part 11, Section 56)
// ---------------------------------------------------------------------------
export const INITIAL_LAWYER_PROFILE_EXTRACTIONS: LawyerProfileExtractionRecord[] = [
  {
    id: 'lp-ext-01',
    sourceFileName: 'Adv_Rajeshwar_S_Punia_Verified_Chamber_Profile.pdf',
    proposedName: 'Adv. Rajeshwar S. Punia',
    proposedDesignation: 'Senior High Court Advocate & Managing Partner',
    academicQualifications: ['LL.B., Panjab University, Chandigarh', 'B.A. (Hons.) Political Science'],
    barEnrolmentDetails: 'Bar Council of Punjab & Haryana (Enrolment Verified — 24+ Years Standing)',
    enrolmentVerificationStatus: 'Verified by Admin',
    proposedPracticeAreas: [
      'Criminal Procedure and Bharatiya Nagarik Suraksha Sanhita',
      'Property Law and Real Estate',
      'Constitutional Law',
      'Writ Petitions and Public Interest Litigation'
    ],
    proposedPrimaryCourts: ['Supreme Court of India', 'High Court of Punjab and Haryana at Chandigarh', 'Gurugram District & Sessions Court'],
    experienceYearsClaimed: 24,
    languages: ['English', 'Hindi', 'Punjabi', 'Haryanvi'],
    publicationsExtracted: [
      'Commentary on Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)',
      'Agricultural Land Partition & Sanad Takseem Jurisprudence in Haryana'
    ],
    biographyDraft: 'Senior High Court and Supreme Court counsel heading Punia Associates Chambers across Haryana, Punjab, and Delhi NCR.',
    publicationApprovalStatus: 'Approved & Published on Team Page',
    extractedAt: '2026-11-01'
  },
  {
    id: 'lp-ext-02',
    sourceFileName: 'CV_Associate_Counsel_Priya_Chaudhary_2026.docx',
    proposedName: 'Adv. Priya Chaudhary',
    proposedDesignation: 'Associate Counsel — Corporate & Arbitration Practice',
    academicQualifications: ['B.A. LL.B. (Hons.), National Law University', 'LL.M. (Commercial & Corporate Law)'],
    barEnrolmentDetails: 'Bar Council of Delhi (Enrolment Certificate Uploaded — Pending Admin Verification)',
    enrolmentVerificationStatus: 'Pending Bar Verification — Do Not Publish',
    proposedPracticeAreas: [
      'Arbitration, Conciliation and Alternative Dispute Resolution',
      'Corporate and Company Law',
      'Insolvency and Bankruptcy Law'
    ],
    proposedPrimaryCourts: ['High Court of Delhi', 'NCLT New Delhi Bench'],
    experienceYearsClaimed: 7,
    languages: ['English', 'Hindi'],
    publicationsExtracted: ['Unstamped Arbitration Clauses After the Seven-Judge Bench Ruling (2024)'],
    biographyDraft: 'Extracted from uploaded CV file. Distinguished academic qualifications (B.A. LL.B., LL.M.) from Bar Council enrolment record. Held in verification queue per Part 11 Section 56 until Managing Partner approval.',
    publicationApprovalStatus: 'Pending Admin Verification',
    extractedAt: '2026-11-12'
  }
];

// ---------------------------------------------------------------------------
// SEEDED REPRESENTATIVE SAMPLE PACKAGE (Part 18, Section 79 End-to-End Test Set)
// ---------------------------------------------------------------------------
export const INITIAL_INGESTED_DOCUMENTS: IngestedLegalDocumentRecord[] = [
  {
    id: 'ing-doc-001',
    batchJobId: 'batch-job-initial-audit',
    sourceFileName: 'SC_2020_INSC_106_Sushila_Aggarwal_Constitution_Bench.pdf',
    fileHierarchyPath: '/Batch_Archive_01/Judgments/Supreme_Court/SC_2020_INSC_106_Sushila_Aggarwal_Constitution_Bench.pdf',
    fileFormat: 'PDF',
    fileSizeBytes: 1454080,
    checksumSha256: '141684ff72047f044396fb92427ae41e4649b934ca495991b7852b855',
    uploadedAt: '2026-11-12 09:05 AM',
    ocrRequired: false,
    ocrStatus: 'Native Digital Text',
    pageCount: 124,
    extractedTextExcerpt: 'IN THE SUPREME COURT OF INDIA CRIMINAL APPELLATE JURISDICTION SPECIAL LEAVE PETITION (CRL.) NOS. 7281-7282 OF 2017 Sushila Aggarwal and Others v. State (NCT of Delhi)... Coram: Arun Mishra, Indira Banerjee, Vineet Saran, M.R. Shah, S. Ravindra Bhat, JJ.',
    detectedSubDocumentsCount: 1,
    documentType: 'Court Judgment',
    isProvisionalType: false,
    jurisdiction: {
      country: 'India',
      courtLevel: 'Supreme Court of India',
      officialCourtName: 'Supreme Court of India',
      benchType: 'Constitution Bench',
      coramJudges: ['Arun Mishra, J.', 'Indira Banerjee, J.', 'Vineet Saran, J.', 'M.R. Shah, J.', 'S. Ravindra Bhat, J.'],
      isHaryanaRelated: false,
      precedentialStatusNote: 'Five-Judge Constitution Bench — Binding under Article 141 of the Constitution of India.'
    },
    extractedTitle: 'Sushila Aggarwal and Others v. State (NCT of Delhi) and Another',
    caseNumber: 'SLP (Crl.) Nos. 7281-7282 of 2017',
    neutralCitation: '2020 INSC 106',
    reporterCitation: '(2020) 5 SCC 1',
    decisionOrDocumentDate: '2020-01-29',
    parties: {
      petitionerOrFirstParty: 'Sushila Aggarwal and Others',
      respondentOrSecondParty: 'State (NCT of Delhi) and Another'
    },
    statutesExtracted: [
      {
        statuteTitle: 'Code of Criminal Procedure, 1973',
        year: 1973,
        section: 'Section 438',
        roleInDocument: 'Central to Decision',
        statutoryEra: 'Historical Predecessor (IPC/CrPC/IEA/Repealed)',
        linkedBareActId: 'bharatiya-nagarik-suraksha-sanhita-2023'
      },
      {
        statuteTitle: 'Constitution of India',
        year: 1950,
        section: 'Article 21',
        roleInDocument: 'Interpreted',
        statutoryEra: 'Current Enactment (BNS/BNSS/BSA/Current)',
        linkedBareActId: 'constitution-of-india'
      }
    ],
    citationsExtracted: [
      {
        rawCitationString: '2020 INSC 106',
        normalizedCaseTitle: 'Sushila Aggarwal v. State (NCT of Delhi)',
        citationFormat: 'Neutral Citation (INSC/PHHC/DHC)',
        issuingCourt: 'Supreme Court of India',
        decisionYear: '2020',
        verificationStatus: 'Verified in Primary Repository'
      },
      {
        rawCitationString: '(1980) 2 SCC 565',
        normalizedCaseTitle: 'Gurbaksh Singh Sibbia v. State of Punjab',
        citationFormat: 'SCC',
        issuingCourt: 'Supreme Court of India',
        decisionYear: '1980',
        verificationStatus: 'Verified in Primary Repository'
      }
    ],
    judgmentAnalysis: {
      factsSummary: 'Reference to a Five-Judge Constitution Bench to resolve conflicting decisions on whether anticipatory bail under Section 438 CrPC must be time-bound or automatically expires when the trial court issues summons.',
      proceduralHistory: 'Referred by a Three-Judge Bench in 2018 due to divergence between Siddharam Satlingappa Mhetre (2011) and Salauddin Abdulsamad Shaikh (1996).',
      questionsFramed: [
        'Whether the protection granted under Section 438 CrPC should be limited to a fixed period so as to enable the person to surrender before the Trial Court?',
        'Whether the life of an anticipatory bail order ends at the time and stage when the accused is summoned by the court?'
      ],
      petitionerArguments: 'Submitted that Parliament imposed no temporal cap in Section 438 CrPC and reading in a mandatory expiry violates Article 21 and Sibbia principles.',
      respondentArguments: 'Argued that unbridled anticipatory bail fetters investigation and trial court custody powers upon filing of charge-sheet.',
      probableRatioDecidendi: 'Protection granted under Section 438 CrPC should not invariably be limited to a fixed period and does not automatically terminate upon filing of charge-sheet or summoning of the accused; it can continue until the conclusion of trial unless special circumstances warrant limiting its tenure.',
      ratioParagraphRefs: ['Para 91', 'Para 92.1', 'Para 92.4'],
      probableObiterDicta: 'General reflections on societal balance between investigative efficacy and constitutional liberty under Article 21.',
      obiterParagraphRefs: ['Para 54', 'Para 76'],
      finalOperativeOrder: 'Reference answered holding anticipatory bail ordinarily continues till end of trial.',
      subsequentTreatmentStatus: 'Verified Good Law',
      aiAssistedDisclaimer: 'AI-Assisted Legal Analysis — Verified by Adv. Rajeshwar S. Punia against official e-SCR copy.'
    },
    classification: {
      primaryPracticeArea: 'Criminal Procedure and Bharatiya Nagarik Suraksha Sanhita',
      secondaryPracticeAreas: ['Criminal Law and Criminal Litigation', 'Constitutional Law'],
      documentType: 'Court Judgment',
      reasoningSummary: 'Assigned primarily to Criminal Procedure because the core reference adjudicates the statutory scope, duration, and conditions of pre-arrest bail under Section 438 CrPC (historical predecessor to Section 482 BNSS). Constitutional Law (Article 21) is retained as a secondary subject.',
      keyIndicatorsFound: ['Constitution Bench Reference', 'Section 438 CrPC', 'Anticipatory Bail Tenure', 'Operative Para 92 Conclusions'],
      proceduralPosture: 'Final Reference Judgment by Five-Judge Constitution Bench',
      substantiveVsProceduralNote: 'Settles substantive procedural right to pre-arrest liberty.',
      statutoryVersionNote: 'Preserves original historical reference to Section 438 of the Code of Criminal Procedure, 1973; separately linked to Section 482 BNSS 2023 in the statutory mapping table.',
      confidentialityReason: 'Published Supreme Court judgment from official e-SCR repository — authorized for public & research libraries.',
      isLawyerVerified: true,
      verifiedByLawyer: 'Adv. Rajeshwar S. Punia',
      verifiedAt: '2026-11-12 09:30 AM'
    },
    confidenceMatrix: {
      documentTypeDetection: 99,
      textExtractionQuality: 98,
      courtIdentification: 100,
      citationExtraction: 99,
      statuteRecognition: 99,
      primaryCategory: 98,
      secondaryCategory: 95,
      sourceAuthenticity: 100,
      privacyClassification: 100
    },
    accessClassification: 'Public Knowledge Candidate',
    containsSensitivePIIOrClientData: false,
    sensitivityFlags: [],
    targetDomain: 'Case Law Library',
    duplicateStatus: 'Unique Record',
    reviewStatus: 'Verified & Committed'
  },
  {
    id: 'ing-doc-002',
    batchJobId: 'batch-job-initial-audit',
    sourceFileName: 'PHHC_2023_109482_Surinder_Singh_v_FC_Haryana_Sanad_Takseem.pdf',
    fileHierarchyPath: '/Batch_Archive_01/Judgments/Haryana_High_Court/PHHC_2023_109482_Surinder_Singh_v_FC_Haryana_Sanad_Takseem.pdf',
    fileFormat: 'PDF',
    fileSizeBytes: 522240,
    checksumSha256: '2deb00d7d1cfa472fd3545e54b0c619a1f22327b2ebbcfbec78f5564a',
    uploadedAt: '2026-11-12 09:06 AM',
    ocrRequired: false,
    ocrStatus: 'Native Digital Text',
    pageCount: 16,
    extractedTextExcerpt: 'IN THE HIGH COURT OF PUNJAB AND HARYANA AT CHANDIGARH CWP No. 18244 of 2021 (O&M) Date of Decision: 22.08.2023 Surinder Singh and Others ...Petitioners Versus Financial Commissioner, Haryana and Others ...Respondents Coram: Hon’ble Mr. Justice Sureshwar Thakur, Hon’ble Mr. Justice Vikas Suri.',
    detectedSubDocumentsCount: 1,
    documentType: 'Court Judgment',
    isProvisionalType: false,
    jurisdiction: {
      country: 'India',
      courtLevel: 'High Court',
      officialCourtName: 'High Court of Punjab and Haryana at Chandigarh',
      stateOrUT: 'Haryana',
      district: 'Gurugram',
      benchType: 'Division Bench',
      coramJudges: ['Sureshwar Thakur, J.', 'Vikas Suri, J.'],
      isHaryanaRelated: true,
      haryanaDistrict: 'Gurugram',
      precedentialStatusNote: 'Division Bench precedent of the High Court of Punjab and Haryana — Not classified as a Supreme Court judgment despite citing Supreme Court authorities.'
    },
    extractedTitle: 'Surinder Singh and Others v. Financial Commissioner, Haryana and Others',
    caseNumber: 'CWP No. 18244 of 2021 (O&M)',
    neutralCitation: '2023:PHHC:109482-DB',
    reporterCitation: '2023 (4) RCR (Civil) 642 (P&H)',
    decisionOrDocumentDate: '2023-08-22',
    parties: {
      petitionerOrFirstParty: 'Surinder Singh and Others',
      respondentOrSecondParty: 'Financial Commissioner, Haryana and Others'
    },
    statutesExtracted: [
      {
        statuteTitle: 'Punjab Land Revenue Act, 1887',
        year: 1887,
        section: 'Sections 111, 118, 121',
        roleInDocument: 'Central to Decision',
        statutoryEra: 'Current Enactment (BNS/BNSS/BSA/Current)',
        linkedBareActId: 'punjab-land-revenue-act-1887'
      },
      {
        statuteTitle: 'Constitution of India',
        year: 1950,
        section: 'Article 226',
        roleInDocument: 'Procedurally Invoked',
        statutoryEra: 'Current Enactment (BNS/BNSS/BSA/Current)',
        linkedBareActId: 'constitution-of-india'
      }
    ],
    citationsExtracted: [
      {
        rawCitationString: '2023:PHHC:109482-DB',
        normalizedCaseTitle: 'Surinder Singh v. Financial Commissioner, Haryana',
        citationFormat: 'Neutral Citation (INSC/PHHC/DHC)',
        issuingCourt: 'High Court of Punjab and Haryana at Chandigarh',
        decisionYear: '2023',
        verificationStatus: 'Verified in Primary Repository'
      }
    ],
    judgmentAnalysis: {
      factsSummary: 'Challenge under Article 226 to an ex-parte Naksha Bey and Sanad Takseem confirmed by the Financial Commissioner Haryana regarding agricultural land in District Gurugram without adjudicating objections on road-frontage equity.',
      proceduralHistory: 'Arising from partition application before Assistant Collector 1st Grade, Gurugram, appealed up to Financial Commissioner, Haryana.',
      questionsFramed: [
        'Whether revenue authorities can issue Sanad Takseem mechanically without deciding objections to Naksha Bey regarding equitable road-frontage and settled possession?'
      ],
      petitionerArguments: 'Contended violation of Section 118 of the Punjab Land Revenue Act, 1887 and principles of natural justice.',
      respondentArguments: 'Argued that once Sanad Takseem is drawn, revenue revision is concluded.',
      probableRatioDecidendi: 'Partition of agricultural land under the Punjab Land Revenue Act, 1887 requires equitable distribution of valuable road-facing frontage and protection of settled possession of co-sharers as far as practicable; an illegal Sanad Takseem violating natural justice is amenable to writ jurisdiction under Article 226.',
      ratioParagraphRefs: ['Para 14', 'Para 18'],
      probableObiterDicta: 'Observations on preventing rural litigation over tubewell and watercourse pathways.',
      obiterParagraphRefs: ['Para 21'],
      finalOperativeOrder: 'Writ petition allowed; Sanad Takseem set aside and remanded to Assistant Collector 1st Grade, Gurugram.',
      subsequentTreatmentStatus: 'Verified Good Law',
      aiAssistedDisclaimer: 'AI-Assisted Legal Analysis — Verified by Adv. Rajeshwar S. Punia.'
    },
    classification: {
      primaryPracticeArea: 'Property Law and Real Estate',
      secondaryPracticeAreas: ['Writ Petitions and Public Interest Litigation', 'Administrative Law', 'Taxation and Revenue Law'],
      documentType: 'Court Judgment',
      reasoningSummary: 'Although filed procedurally as a Civil Writ Petition under Article 226, the principal substantive dispute concerns agricultural land partition (Naksha Bey / Sanad Takseem) under the Punjab Land Revenue Act, 1887. Therefore classified primarily under Property Law and Real Estate with Writ Petitions and Administrative Law as secondary classifications (per Part 5 Section 34).',
      keyIndicatorsFound: ['Punjab Land Revenue Act 1887', 'Sanad Takseem', 'Naksha Bey', 'CWP under Article 226', 'Financial Commissioner Haryana'],
      proceduralPosture: 'Final Judgment in Civil Writ Petition (Division Bench)',
      substantiveVsProceduralNote: 'Substantive ruling on agricultural partition principles in Haryana.',
      statutoryVersionNote: 'Preserves Punjab Land Revenue Act, 1887 (as applicable to Haryana).',
      confidentialityReason: 'Published High Court judgment — safe for public and research indexing.',
      isLawyerVerified: true,
      verifiedByLawyer: 'Adv. Rajeshwar S. Punia',
      verifiedAt: '2026-11-12 09:35 AM'
    },
    confidenceMatrix: {
      documentTypeDetection: 98,
      textExtractionQuality: 97,
      courtIdentification: 100,
      citationExtraction: 98,
      statuteRecognition: 97,
      primaryCategory: 96,
      secondaryCategory: 94,
      sourceAuthenticity: 99,
      privacyClassification: 100
    },
    accessClassification: 'Public Knowledge Candidate',
    containsSensitivePIIOrClientData: false,
    sensitivityFlags: [],
    targetDomain: 'Case Law Library',
    duplicateStatus: 'Unique Record',
    reviewStatus: 'Verified & Committed'
  },
  {
    id: 'ing-doc-003',
    batchJobId: 'batch-job-initial-audit',
    sourceFileName: 'MHA_Gazette_SO_850E_BNS_2023_Commencement_Notification.pdf',
    fileHierarchyPath: '/Batch_Archive_01/Legislation/Notifications/MHA_Gazette_SO_850E_BNS_2023_Commencement_Notification.pdf',
    fileFormat: 'PDF',
    fileSizeBytes: 215040,
    checksumSha256: '4a5b6c7d8e9f0123456789abcdef0123456789abcdef0123456789abcdef0123',
    uploadedAt: '2026-11-12 09:08 AM',
    ocrRequired: false,
    ocrStatus: 'Native Digital Text',
    pageCount: 2,
    extractedTextExcerpt: 'MINISTRY OF HOME AFFAIRS NOTIFICATION New Delhi, the 23rd February, 2024 S.O. 850(E).—In exercise of the powers conferred by sub-section (2) of section 1 of the Bharatiya Nyaya Sanhita, 2023 (45 of 2023), the Central Government hereby appoints the 1st day of July, 2024 as the date on which the provisions of the said Sanhita, except the provision of sub-section (2) of section 106, shall come into force.',
    detectedSubDocumentsCount: 1,
    documentType: 'Government Notification',
    isProvisionalType: false,
    jurisdiction: {
      country: 'India',
      courtLevel: 'Non-Judicial / Statutory / Contract',
      officialCourtName: 'Ministry of Home Affairs, Government of India (The Gazette of India)',
      coramJudges: ['Ministry of Home Affairs, Government of India'],
      isHaryanaRelated: false,
      precedentialStatusNote: 'Statutory Commencement Notification under Section 1(2) of Act 45 of 2023.'
    },
    extractedTitle: 'MHA Gazette Notification S.O. 850(E) — Commencement of Bharatiya Nyaya Sanhita, 2023 (Except Section 106(2))',
    decisionOrDocumentDate: '2024-02-23',
    statutesExtracted: [
      {
        statuteTitle: 'Bharatiya Nyaya Sanhita, 2023',
        year: 2023,
        section: 'Section 1(2) & Section 106(2)',
        roleInDocument: 'Central to Decision',
        statutoryEra: 'Current Enactment (BNS/BNSS/BSA/Current)',
        linkedBareActId: 'bharatiya-nyaya-sanhita-2023'
      }
    ],
    citationsExtracted: [],
    classification: {
      primaryPracticeArea: 'Bharatiya Nyaya Sanhita and Criminal Substantive Law',
      secondaryPracticeAreas: ['Administrative Law', 'Motor Accident Claims and Insurance Law'],
      documentType: 'Government Notification',
      reasoningSummary: 'Identified as a statutory commencement notification issued in the Gazette of India bringing BNS 2023 into force on 01-07-2024 while explicitly withholding commencement of Section 106(2).',
      keyIndicatorsFound: ['Gazette of India Extraordinary', 'S.O. 850(E)', 'Section 1(2) BNS 2023', 'Section 106(2) Exclusion'],
      proceduralPosture: 'Delegated Statutory Commencement Instrument',
      substantiveVsProceduralNote: 'Establishes commencement date distinct from enactment/assent date (25-12-2023).',
      statutoryVersionNote: 'Flags Section 106(2) BNS as awaiting separate commencement notification per Part 6 Section 38.',
      confidentialityReason: 'Official Gazette of India publication — Public statutory instrument.',
      isLawyerVerified: true,
      verifiedByLawyer: 'Adv. Vikram Singh Punia',
      verifiedAt: '2026-11-12 09:40 AM'
    },
    confidenceMatrix: {
      documentTypeDetection: 99,
      textExtractionQuality: 99,
      courtIdentification: 100,
      citationExtraction: 100,
      statuteRecognition: 100,
      primaryCategory: 99,
      secondaryCategory: 92,
      sourceAuthenticity: 100,
      privacyClassification: 100
    },
    accessClassification: 'Public Knowledge Candidate',
    containsSensitivePIIOrClientData: false,
    sensitivityFlags: [],
    targetDomain: 'Bare Acts & Legislation Library',
    duplicateStatus: 'Unique Record',
    reviewStatus: 'Verified & Committed'
  },
  {
    id: 'ing-doc-004',
    batchJobId: 'batch-job-initial-audit',
    sourceFileName: 'Client_Draft_Writ_Petition_Rao_Inderjeet_Manesar_Land.docx',
    fileHierarchyPath: '/Batch_Archive_01/Mixed_Client_Files/Client_Draft_Writ_Petition_Rao_Inderjeet_Manesar_Land.docx',
    fileFormat: 'DOCX',
    fileSizeBytes: 98304,
    checksumSha256: '8f9d2a1b4c3e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01',
    uploadedAt: '2026-11-12 09:10 AM',
    ocrRequired: false,
    ocrStatus: 'Native Digital Text',
    pageCount: 18,
    extractedTextExcerpt: 'CONFIDENTIAL CLIENT DRAFT — FOR CHAMBER USE ONLY. IN THE HIGH COURT OF PUNJAB AND HARYANA AT CHANDIGARH. Civil Writ Petition under Article 226/227... Petitioner: Rao Inderjeet Singh S/o Late Sh. Hukum Singh, Resident of Village Manesar, Gurugram (Mobile: +91-9811XXXXXX, Aadhaar Redacted)...',
    detectedSubDocumentsCount: 1,
    documentType: 'Writ Petition',
    isProvisionalType: false,
    jurisdiction: {
      country: 'India',
      courtLevel: 'High Court',
      officialCourtName: 'High Court of Punjab and Haryana at Chandigarh',
      stateOrUT: 'Haryana',
      district: 'Gurugram',
      isHaryanaRelated: true,
      haryanaDistrict: 'Gurugram',
      presidingNote: 'Unfiled / Draft Client Pleading'
    } as any,
    extractedTitle: '[CONFIDENTIAL CLIENT PLEADING] Draft Civil Writ Petition — Manesar Khewat 44-48 Partition Challenge',
    caseNumber: 'CWP-29410-2026 (Draft)',
    decisionOrDocumentDate: '2026-11-04',
    parties: {
      petitionerOrFirstParty: 'Rao Inderjeet Singh (Firm Client)',
      respondentOrSecondParty: 'Financial Commissioner Revenue Haryana & Ors.'
    },
    statutesExtracted: [
      {
        statuteTitle: 'Punjab Land Revenue Act, 1887',
        year: 1887,
        section: 'Section 118',
        roleInDocument: 'Central to Decision',
        statutoryEra: 'Current Enactment (BNS/BNSS/BSA/Current)'
      }
    ],
    citationsExtracted: [],
    classification: {
      primaryPracticeArea: 'Property Law and Real Estate',
      secondaryPracticeAreas: ['Writ Petitions and Public Interest Litigation'],
      documentType: 'Writ Petition',
      reasoningSummary: 'Detected unfiled client writ petition containing private residential address, phone number, khewat particulars, and chamber privilege headers. Automatically isolated into Confidential Client Matter Vault per Part 10 Section 53.',
      keyIndicatorsFound: ['CONFIDENTIAL CLIENT DRAFT', 'Client Mobile & Address', 'Unfiled Pleading Structure', 'Vakalatnama Reference'],
      proceduralPosture: 'Client Pleading (Pre-Filing / Motion Stage)',
      substantiveVsProceduralNote: 'Private party pleading — NOT a judicial precedent.',
      statutoryVersionNote: 'Punjab Land Revenue Act, 1887.',
      confidentialityReason: 'CRITICAL: Contains private client PII, unfiled litigation strategy, and privileged property records. Blocked from public website and public search.',
      isLawyerVerified: true,
      verifiedByLawyer: 'Adv. Rajeshwar S. Punia',
      verifiedAt: '2026-11-12 09:42 AM'
    },
    confidenceMatrix: {
      documentTypeDetection: 98,
      textExtractionQuality: 99,
      courtIdentification: 97,
      citationExtraction: 100,
      statuteRecognition: 96,
      primaryCategory: 97,
      secondaryCategory: 95,
      sourceAuthenticity: 95,
      privacyClassification: 100
    },
    accessClassification: 'Confidential Client Matter Vault',
    containsSensitivePIIOrClientData: true,
    sensitivityFlags: ['Client Personal Identity & Phone', 'Private Property Khewat Details', 'Privileged Draft Pleading'],
    targetDomain: 'Confidential Client Matter Vault',
    duplicateStatus: 'Unique Record',
    reviewStatus: 'Auto-Segregated Confidential'
  },
  {
    id: 'ing-doc-005',
    batchJobId: 'batch-job-initial-audit',
    sourceFileName: 'judgment.pdf',
    fileHierarchyPath: '/Batch_Archive_01/Ambiguous_Uploads/judgment.pdf',
    fileFormat: 'SCAN_IMAGE',
    fileSizeBytes: 348160,
    checksumSha256: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    uploadedAt: '2026-11-12 09:12 AM',
    ocrRequired: true,
    ocrStatus: 'Low Scan Quality — Flagged for Review',
    pageCount: 4,
    extractedTextExcerpt: '[OCR EXTRACTED TEXT — PAGE 1 OF 4 — LOW SCAN CONTRAST]: BEFORE THE DISTRICT AND SESSIONS JUDGE, ROHTAK, HARYANA... Bail Application No. 412 of 2026... Order dated 14.10.2026... Adjourned to 28.10.2026 for production of police case diary...',
    detectedSubDocumentsCount: 1,
    documentType: 'Interim Order',
    isProvisionalType: true,
    jurisdiction: {
      country: 'India',
      courtLevel: 'District and Sessions Court',
      officialCourtName: 'Court of District and Sessions Judge, Rohtak, Haryana',
      stateOrUT: 'Haryana',
      district: 'Rohtak',
      benchType: 'Trial Court',
      coramJudges: ['District & Sessions Judge, Rohtak'],
      isHaryanaRelated: true,
      haryanaDistrict: 'Rohtak',
      precedentialStatusNote: 'District Court procedural adjournment order — NOT a High Court precedent and establishes no binding legal principle.'
    },
    extractedTitle: 'Procedural Adjournment Order in Bail Application No. 412/2026 (Sessions Court Rohtak)',
    caseNumber: 'BA-412-2026',
    decisionOrDocumentDate: '2026-10-14',
    statutesExtracted: [
      {
        statuteTitle: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
        year: 2023,
        section: 'Section 483',
        roleInDocument: 'Procedurally Invoked',
        statutoryEra: 'Current Enactment (BNS/BNSS/BSA/Current)'
      }
    ],
    citationsExtracted: [],
    classification: {
      primaryPracticeArea: 'Criminal Procedure and Bharatiya Nagarik Suraksha Sanhita',
      secondaryPracticeAreas: ['Criminal Law and Criminal Litigation'],
      documentType: 'Interim Order',
      reasoningSummary: 'Despite the misleading filename "judgment.pdf" (Part 3 Section 5), deep inspection of the headings and operative text reveals this is a 4-page scanned District & Sessions Court (Rohtak) interim procedural order adjourning a bail hearing for production of the police case diary. Placed in Verification Queue due to low scan quality (64% OCR confidence).',
      keyIndicatorsFound: ['Misleading Filename "judgment.pdf" Overridden', 'Sessions Court Rohtak Heading', 'Adjournment for Case Diary', 'Scanned Image OCR Required'],
      proceduralPosture: 'Non-Speaking Interim Procedural Order (District Court)',
      substantiveVsProceduralNote: 'Purely procedural adjournment — must not be indexed as a substantive bail precedent.',
      statutoryVersionNote: 'BNSS 2023.',
      confidentialityReason: 'Held in Verification Queue due to low OCR scan quality and trial-court party names.',
      isLawyerVerified: false
    },
    confidenceMatrix: {
      documentTypeDetection: 88,
      textExtractionQuality: 64, // Low scan quality triggers review flag
      courtIdentification: 92,
      citationExtraction: 100,
      statuteRecognition: 82,
      primaryCategory: 86,
      secondaryCategory: 80,
      sourceAuthenticity: 72,
      privacyClassification: 85
    },
    accessClassification: 'Authorised Legal Research Library',
    containsSensitivePIIOrClientData: false,
    sensitivityFlags: ['Low Scan Quality OCR (64%) — Human Verification Required', 'Filename ("judgment.pdf") Mismatched Actual Content (Interim Order)'],
    targetDomain: 'Document Verification Queue',
    duplicateStatus: 'Unique Record',
    reviewStatus: 'Awaiting Lawyer Verification'
  }
];

export const INITIAL_BULK_IMPORT_JOBS: BulkImportJobRecord[] = [
  {
    jobId: 'batch-job-initial-audit',
    jobName: 'End-to-End Representative Legal Verification Package (Judgments, Gazette Notification, Client Pleading & Scanned Order)',
    initiatedBy: 'Adv. Rajeshwar S. Punia (Managing Partner)',
    startedAt: '2026-11-12 09:05 AM IST',
    updatedAt: '2026-11-12 09:14 AM IST',
    completedAt: '2026-11-12 09:14 AM IST',
    status: 'Completed',
    totalFilesDetected: 5,
    processedFilesCount: 5,
    batchSize: 25,
    concurrencyLimit: 4,
    currentCheckpointIndex: 5,
    summaryCounts: {
      judgments: 2,
      ordersAndTribunals: 1,
      bareActsAndAmendments: 1,
      pleadingsAndPetitions: 1,
      contractsAndAgreements: 0,
      legalNotices: 0,
      researchPapersAndArticles: 0,
      lawyerProfilesAndFaqs: 0,
      imagesAndExhibits: 0,
      unknownOrAmbiguous: 0,
      ocrRequiredCount: 1,
      poorQualityFlaggedCount: 1,
      duplicatesSkippedCount: 0,
      confidentialVaultRoutedCount: 1,
      verificationQueueCount: 1
    },
    documentIds: ['ing-doc-001', 'ing-doc-002', 'ing-doc-003', 'ing-doc-004', 'ing-doc-005'],
    processingLogs: [
      '[09:05:02] Discovered 5 files in archive. Validated MIME signatures and ZIP path-traversal safety.',
      '[09:05:18] File #1 (SC_2020_INSC_106_Sushila_Aggarwal_Constitution_Bench.pdf): Identified as Supreme Court Constitution Bench Judgment. Preserved historical Section 438 CrPC reference and mapped to Section 482 BNSS.',
      '[09:06:11] File #2 (PHHC_2023_109482_Surinder_Singh_v_FC_Haryana_Sanad_Takseem.pdf): Identified as High Court of Punjab & Haryana Division Bench Judgment (Gurugram District). Classified under Property Law (Primary) + Writ Petitions (Secondary).',
      '[09:08:04] File #3 (MHA_Gazette_SO_850E_BNS_2023_Commencement_Notification.pdf): Identified as Gazette Commencement Notification. Flagged Section 106(2) BNS as awaiting separate commencement notification.',
      '[09:10:29] File #4 (Client_Draft_Writ_Petition_Rao_Inderjeet_Manesar_Land.docx): Detected confidential client pleading & PII. Automatically routed to Confidential Client Matter Vault (PA-MAT-2026-HR-041); blocked from public search.',
      '[09:12:45] File #5 (judgment.pdf): Overrode misleading filename — detected scanned District & Sessions Court (Rohtak) Interim Adjournment Order. Flagged for review due to 64% OCR scan quality.'
    ]
  }
];
