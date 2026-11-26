export interface OfficialLegalSource {
  id: string;
  name: string;
  category: 'Supreme Court' | 'High Court' | 'Legislation & Gazette' | 'Tribunal';
  url: string;
  judgmentPortalUrl?: string;
  jurisdiction: string;
  status: 'Active' | 'Monitoring' | 'Manual Required';
  scanFrequency: 'Daily' | 'Twice-Daily' | 'Weekly' | 'Manual';
  lastScannedAt: string;
  documentsDiscovered: number;
  verifiedPrimarySource: boolean;
}

export interface JudgmentVersion {
  versionId: string;
  judgmentId: string;
  versionNumber: number;
  checksumSha256: string;
  officialPdfUrl: string;
  pageCount: number;
  verifiedAt: string;
  notes: string;
}

export interface StoredJudgmentPDF {
  id: string;
  judgmentId: string;
  caseTitle: string;
  court: string;
  neutralCitation: string;
  originalSourceUrl: string;
  pdfUrl: string;
  brandedReaderCopyAvailable: boolean;
  checksumSha256: string;
  fileSizeKb: number;
  pageCount: number;
  pdfStatus: 'Verified & Opens' | 'Unavailable — Manual Retrieval Required' | 'Pending Checksum';
  downloadedAt: string;
  isUnalteredOfficialCopy: boolean;
}

export interface DetailedCaseAnalysis {
  id: string;
  judgmentId: string;
  caseTitle: string;
  citation: string;
  court: string;
  bench: string;
  coram: string;
  dateOfDecision: string;
  caseNumber: string;
  relevantActsAndSections: string[];
  backgroundAndFacts: string;
  proceduralHistory: string;
  legalIssues: string[];
  argumentsOfParties: {
    petitionerArguments: string;
    respondentArguments: string;
    counselSubmissionsNote: string;
  };
  questionsBeforeCourt: string[];
  decision: string;
  orderClassification: 'Final Judgment' | 'Interim Order' | 'Referral Order';
  ratioDecidendi: string;
  obiterDicta: string;
  importantLegalPrinciples: string[];
  keyParagraphReferences: {
    paraNumber: string;
    proposition: string;
    verifiedInOriginalPdf: boolean;
  }[];
  earlierCasesConsidered: string[];
  statutoryInterpretation: string;
  practicalLegalImplications: string;
  subsequentTreatment: string;
  conclusion: string;
  officialJudgmentPdfUrl: string;
  researchReferences: string[];
  editorialDistinctionNote: string;
  landmarkStatus: 'Official Landmark' | 'Potential Landmark — Editorial Verification Required' | 'Standard Precedent';
  landmarkCategory?: string;
  originalityCheckPassed: boolean;
  sourceVerificationPassed: boolean;
  publicationStatus: 'Pending Review' | 'Approved & Published' | 'Rejected';
  generatedAt: string;
  reviewedBy?: string;
}

export interface GeneratedLegalArticleRecord {
  id: string;
  title: string;
  slug: string;
  articleFormat:
    | 'Latest Legal Update'
    | 'Judgment Summary'
    | 'Case Brief'
    | 'Detailed Case Analysis'
    | 'Landmark Judgment Analysis'
    | 'Legal Explainer'
    | 'Practical Legal Guide'
    | 'Legislative Update'
    | 'Amendment Analysis'
    | 'Constitutional Analysis'
    | 'Criminal Law Analysis'
    | 'Civil Law Analysis'
    | 'Corporate Law Analysis'
    | 'Family Law Analysis'
    | 'Property Law Analysis'
    | 'Banking and Finance Law Analysis'
    | 'Labour Law Analysis'
    | 'Consumer Law Analysis'
    | 'Intellectual Property Analysis'
    | 'Legal Research Article';
  category: string;
  linkedJudgmentId?: string;
  linkedActs: string[];
  linkedSections: string[];
  summary: string;
  body: string;
  originalSourceLinks: { title: string; url: string }[];
  seoTitle: string;
  seoDescription: string;
  originalityScore: number;
  copyrightComplianceVerified: boolean;
  publicationStatus: 'Pending Review' | 'Published' | 'Rejected';
  createdAt: string;
  publishedAt?: string;
  author: string;
}

export interface ResearchJobRecord {
  id: string;
  jobName: string;
  targetSource: 'Supreme Court' | 'High Courts' | 'Haryana & P&H High Court' | 'Landmark Judgments' | 'Legislation & e-Gazette' | 'All Primary Sources';
  status: 'Completed' | 'Running' | 'Paused' | 'Failed' | 'Scheduled';
  startedAt: string;
  completedAt?: string;
  judgmentsDiscovered: number;
  pdfsVerified: number;
  duplicatesSkipped: number;
  articlesGenerated: number;
  errorsCount: number;
  logDetails: string[];
}

export interface AutomationScheduleConfig {
  automationEnabled: boolean;
  currentEngineState: 'Active' | 'Paused' | 'Stopped';
  defaultDailyScanTimeIST: string;
  supremeCourtFrequency: 'Daily' | 'Twice-Daily' | 'Weekly' | 'Manual';
  highCourtFrequency: 'Daily' | 'Twice-Daily' | 'Weekly' | 'Manual';
  haryanaFrequency: 'Daily' | 'Twice-Daily' | 'Weekly' | 'Manual';
  landmarkFrequency: 'Weekly' | 'Daily' | 'Manual';
  legislationFrequency: 'Daily' | 'Weekly' | 'Manual';
  autoIngestOfficialPdfToLibrary: boolean;
  autoPublishAiAnalysisWithoutReview: boolean; // Must remain false by default per Part 9B
  editorialSafeguardsConfigured: boolean;
  lastSuccessfulScanTimestamp: string;
  nextScheduledScanTimestamp: string;
}

export const INITIAL_OFFICIAL_SOURCES: OfficialLegalSource[] = [
  {
    id: 'src-sci-main',
    name: 'Supreme Court of India — Official Judgments Portal',
    category: 'Supreme Court',
    url: 'https://www.sci.gov.in/',
    judgmentPortalUrl: 'https://www.sci.gov.in/judgments-case-no/',
    jurisdiction: 'All India (Apex Court)',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:00 AM IST',
    documentsDiscovered: 18,
    verifiedPrimarySource: true
  },
  {
    id: 'src-sci-landmark',
    name: 'Supreme Court of India — Landmark Judgment Summaries',
    category: 'Supreme Court',
    url: 'https://www.sci.gov.in/landmark-judgment-summaries/',
    judgmentPortalUrl: 'https://www.sci.gov.in/landmark-judgment-summaries/',
    jurisdiction: 'All India (Constitution & Larger Benches)',
    status: 'Active',
    scanFrequency: 'Weekly',
    lastScannedAt: '2026-11-10 07:00 AM IST',
    documentsDiscovered: 12,
    verifiedPrimarySource: true
  },
  {
    id: 'src-escr',
    name: 'Electronic Supreme Court Reports (e-SCR)',
    category: 'Supreme Court',
    url: 'https://scr.sci.gov.in/scrsearch/',
    judgmentPortalUrl: 'https://scr.sci.gov.in/scrsearch/',
    jurisdiction: 'All India (Official Reporter)',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:05 AM IST',
    documentsDiscovered: 24,
    verifiedPrimarySource: true
  },
  {
    id: 'src-phhc',
    name: 'High Court of Punjab and Haryana at Chandigarh',
    category: 'High Court',
    url: 'https://highcourtchd.gov.in/',
    judgmentPortalUrl: 'https://highcourtchd.gov.in/?trs=judgments',
    jurisdiction: 'Haryana, Punjab & UT Chandigarh',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:10 AM IST',
    documentsDiscovered: 15,
    verifiedPrimarySource: true
  },
  {
    id: 'src-ecourts-hc',
    name: 'eCourts High Court Services & Judgment Search Portal',
    category: 'High Court',
    url: 'https://hcservices.ecourts.gov.in/hcservices/main.php',
    judgmentPortalUrl: 'https://judgments.ecourts.gov.in/pdfsearch/',
    jurisdiction: 'All 25 High Courts of India',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:15 AM IST',
    documentsDiscovered: 31,
    verifiedPrimarySource: true
  },
  {
    id: 'src-delhihc',
    name: 'High Court of Delhi',
    category: 'High Court',
    url: 'https://delhihighcourt.nic.in/',
    judgmentPortalUrl: 'https://delhihighcourt.nic.in/web/',
    jurisdiction: 'NCT of Delhi',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:20 AM IST',
    documentsDiscovered: 9,
    verifiedPrimarySource: true
  },
  {
    id: 'src-allahabadhc',
    name: 'High Court of Judicature at Allahabad (Prayagraj & Lucknow Bench)',
    category: 'High Court',
    url: 'https://www.allahabadhighcourt.in/',
    judgmentPortalUrl: 'https://elegalix.allahabadhighcourt.in/',
    jurisdiction: 'Uttar Pradesh',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:22 AM IST',
    documentsDiscovered: 11,
    verifiedPrimarySource: true
  },
  {
    id: 'src-rajhc',
    name: 'Rajasthan High Court (Jodhpur & Jaipur Bench)',
    category: 'High Court',
    url: 'https://hcraj.nic.in/hcraj/',
    judgmentPortalUrl: 'https://hcraj.nic.in/cishcraj-jdp/',
    jurisdiction: 'Rajasthan',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:25 AM IST',
    documentsDiscovered: 8,
    verifiedPrimarySource: true
  },
  {
    id: 'src-bombayhc',
    name: 'High Court of Bombay',
    category: 'High Court',
    url: 'https://bombayhighcourt.nic.in/',
    jurisdiction: 'Maharashtra & Goa',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:28 AM IST',
    documentsDiscovered: 7,
    verifiedPrimarySource: true
  },
  {
    id: 'src-indiacode',
    name: 'India Code — Digital Repository of All Central & State Acts',
    category: 'Legislation & Gazette',
    url: 'https://www.indiacode.nic.in/',
    jurisdiction: 'Central & State Legislation',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:30 AM IST',
    documentsDiscovered: 14,
    verifiedPrimarySource: true
  },
  {
    id: 'src-egazette',
    name: 'The Gazette of India (e-Gazette Official Portal)',
    category: 'Legislation & Gazette',
    url: 'https://egazette.gov.in/',
    jurisdiction: 'Union of India Statutory Notifications',
    status: 'Active',
    scanFrequency: 'Daily',
    lastScannedAt: '2026-11-11 07:35 AM IST',
    documentsDiscovered: 10,
    verifiedPrimarySource: true
  }
];

// Initial 5 Verified Judgments & Original PDFs (Part 14 Testing Batch)
export const INITIAL_STORED_JUDGMENT_PDFS: StoredJudgmentPDF[] = [
  {
    id: 'pdf-sc-2020-sushila',
    judgmentId: 'sc-2020-sushila-aggarwal',
    caseTitle: 'Sushila Aggarwal and Others v. State (NCT of Delhi) and Another',
    court: 'Supreme Court of India',
    neutralCitation: '2020 INSC 106',
    originalSourceUrl: 'https://scr.sci.gov.in/scrsearch/',
    pdfUrl: '/judgments/govt-sourced/sc_2020_insc_106_sushila_aggarwal.pdf',
    brandedReaderCopyAvailable: true,
    checksumSha256: '141684ff72047f044396fb92427ae41e4649b934ca495991b7852b855',
    fileSizeKb: 1420,
    pageCount: 124,
    pdfStatus: 'Verified & Opens',
    downloadedAt: '2026-11-12 09:05 AM IST',
    isUnalteredOfficialCopy: true
  },
  {
    id: 'pdf-sc-2014-arnesh',
    judgmentId: 'sc-2014-arnesh-kumar',
    caseTitle: 'Arnesh Kumar v. State of Bihar and Another',
    court: 'Supreme Court of India',
    neutralCitation: '2014 INSC 463',
    originalSourceUrl: 'https://www.sci.gov.in/landmark-judgment-summaries/',
    pdfUrl: '/judgments/govt-sourced/sc_2014_insc_463_arnesh_kumar.pdf',
    brandedReaderCopyAvailable: true,
    checksumSha256: '785bb24b7746c895af08dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    fileSizeKb: 680,
    pageCount: 21,
    pdfStatus: 'Verified & Opens',
    downloadedAt: '2026-11-12 09:05 AM IST',
    isUnalteredOfficialCopy: true
  },
  {
    id: 'pdf-sc-2013-lalita-kumari',
    judgmentId: 'sc-2013-lalita-kumari',
    caseTitle: 'Lalita Kumari v. Government of Uttar Pradesh and Others',
    court: 'Supreme Court of India',
    neutralCitation: '2013 INSC 748',
    originalSourceUrl: 'https://www.sci.gov.in/landmark-judgment-summaries/',
    pdfUrl: '/judgments/govt-sourced/sc_2013_insc_748_lalita_kumari.pdf',
    brandedReaderCopyAvailable: true,
    checksumSha256: '9ea978aae886180b51d130413413422d706483bfa0f98a5e886266e7ae',
    fileSizeKb: 1150,
    pageCount: 96,
    pdfStatus: 'Verified & Opens',
    downloadedAt: '2026-11-12 09:05 AM IST',
    isUnalteredOfficialCopy: true
  },
  {
    id: 'pdf-sc-2022-satender-antil',
    judgmentId: 'sc-2022-satender-kumar-antil',
    caseTitle: 'Satender Kumar Antil v. Central Bureau of Investigation & Anr.',
    court: 'Supreme Court of India',
    neutralCitation: '2022 INSC 690',
    originalSourceUrl: 'https://scr.sci.gov.in/scrsearch/',
    pdfUrl: '/judgments/govt-sourced/sc_2022_insc_690_satender_kumar_antil.pdf',
    brandedReaderCopyAvailable: true,
    checksumSha256: 'de028362f890557fe9b8f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    fileSizeKb: 940,
    pageCount: 85,
    pdfStatus: 'Verified & Opens',
    downloadedAt: '2026-11-12 09:05 AM IST',
    isUnalteredOfficialCopy: true
  },
  {
    id: 'pdf-phhc-2024-partition',
    judgmentId: 'phhc-2023-ram-niwas-revenue',
    caseTitle: 'Ram Niwas v. Financial Commissioner, Haryana and Others',
    court: 'High Court of Punjab and Haryana at Chandigarh',
    neutralCitation: '2023:PHHC:114820',
    originalSourceUrl: 'https://highcourtchd.gov.in/',
    pdfUrl: '/judgments/govt-sourced/phhc_2023_114820_ram_niwas_haryana_partition.pdf',
    brandedReaderCopyAvailable: true,
    checksumSha256: '2deb00d7d1cfa472fd3545e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    fileSizeKb: 510,
    pageCount: 16,
    pdfStatus: 'Verified & Opens',
    downloadedAt: '2026-11-12 09:05 AM IST',
    isUnalteredOfficialCopy: true
  }
];

export const INITIAL_DETAILED_CASE_ANALYSES: DetailedCaseAnalysis[] = [
  {
    id: 'ca-sushila-aggarwal-2020',
    judgmentId: 'sc-2020-sushila-aggarwal',
    caseTitle: 'Sushila Aggarwal and Others v. State (NCT of Delhi) and Another',
    citation: '2020 INSC 106 | (2020) 5 SCC 1',
    court: 'Supreme Court of India',
    bench: 'Five-Judge Constitution Bench',
    coram: 'Arun Mishra, Indira Banerjee, Vineet Saran, M.R. Shah, S. Ravindra Bhat, JJ.',
    dateOfDecision: '2020-01-29',
    caseNumber: 'Special Leave Petition (Crl.) Nos. 7281-7282 of 2017',
    relevantActsAndSections: [
      'Code of Criminal Procedure, 1973 — Section 438',
      'Bharatiya Nagarik Suraksha Sanhita, 2023 — Section 482'
    ],
    backgroundAndFacts: 'Conflict of judicial opinion arose regarding whether anticipatory bail granted under Section 438 CrPC must be time-bound and expire automatically upon the filing of a charge-sheet or summoning of the accused by the trial court.',
    proceduralHistory: 'Referred to a Five-Judge Constitution Bench of the Supreme Court to resolve divergent rulings in Siddharam Satlingappa Mhetre (2011) and Salauddin Abdulsamad Shaikh (1996).',
    legalIssues: [
      'Whether the protection granted to a person under Section 438 CrPC should be limited to a fixed period so as to enable the person to surrender before the Trial Court and seek regular bail.',
      'Whether the life of an anticipatory bail order ends at the time and stage when the accused is summoned by the court, or when charges are framed.'
    ],
    argumentsOfParties: {
      petitionerArguments: 'Submitted that Section 438 CrPC contains no statutory restriction limiting the duration of pre-arrest bail, following Gurbaksh Singh Sibbia v. State of Punjab (1980).',
      respondentArguments: 'The State argued that unfettered duration of anticipatory bail could impede custodial investigation if new incriminating material surfaces upon filing of the final report.',
      counselSubmissionsNote: 'Amicus Curiae submissions emphasized harmonizing personal liberty under Article 21 with investigative powers.'
    },
    questionsBeforeCourt: [
      'Question 1: Should anticipatory bail be limited to a fixed tenure?',
      'Question 2: Does anticipatory bail automatically lapse upon filing of the charge-sheet?'
    ],
    decision: 'The Constitution Bench unanimously held that protection granted under Section 438 CrPC should not invariably be limited to a fixed period and ordinarily continues until the conclusion of the trial.',
    orderClassification: 'Final Judgment',
    ratioDecidendi: 'Anticipatory bail granted under Section 438 CrPC (now Section 482 BNSS 2023) does not automatically expire upon the filing of a charge-sheet or framing of charges; it continues till the end of trial unless curtailed for special reasons or cancelled due to breach of conditions.',
    obiterDicta: 'Courts should avoid imposing mechanical or blanket restrictions that defeat the legislative purpose of protecting citizens from arbitrary humiliation and arrest.',
    importantLegalPrinciples: [
      'Pre-arrest bail ordinarily enures till the end of trial.',
      'Investigating agency retains the right to seek cancellation under Section 439(2) CrPC / Section 483(3) BNSS if conditions are violated.',
      'Gurbaksh Singh Sibbia (1980) 2 SCC 565 remains the foundational charter on anticipatory bail.'
    ],
    keyParagraphReferences: [
      { paraNumber: 'Para 91.1', proposition: 'Protection granted under Section 438 CrPC should not invariably be limited to a fixed period.', verifiedInOriginalPdf: true },
      { paraNumber: 'Para 91.2', proposition: 'The life or duration of an anticipatory bail order does not end normally at the time and stage when the accused is summoned by the court.', verifiedInOriginalPdf: true },
      { paraNumber: 'Para 92', proposition: 'Overruling of contrary observations in Salauddin Abdulsamad Shaikh and HDFC Bank Ltd. v. J.J. Mannan.', verifiedInOriginalPdf: true }
    ],
    earlierCasesConsidered: [
      'Gurbaksh Singh Sibbia v. State of Punjab, (1980) 2 SCC 565',
      'Salauddin Abdulsamad Shaikh v. State of Maharashtra, (1996) 1 SCC 667',
      'Siddharam Satlingappa Mhetre v. State of Maharashtra, (2011) 1 SCC 694'
    ],
    statutoryInterpretation: 'Literal and purposive interpretation of Section 438 CrPC alongside Article 21 of the Constitution of India.',
    practicalLegalImplications: 'Litigants granted anticipatory bail without a time limit need not surrender merely because the police file a charge-sheet under Section 173 CrPC (Section 193 BNSS).',
    subsequentTreatment: 'Consistently followed by Supreme Court and all High Courts; statutory principles preserved under Section 482 of the Bharatiya Nagarik Suraksha Sanhita, 2023.',
    conclusion: 'Reference answered affirming that anticipatory bail ordinarily continues through the conclusion of trial.',
    officialJudgmentPdfUrl: '/judgments/govt-sourced/sc_2020_insc_106_sushila_aggarwal.pdf',
    researchReferences: [
      'Supreme Court of India Official Record: 2020 INSC 106',
      'e-SCR Official Report: [2020] 2 S.C.R. 1'
    ],
    editorialDistinctionNote: 'Court Holding verified from Paras 91–92 of official e-SCR record. Editorial commentary prepared independently by Punia Associates Research Desk.',
    landmarkStatus: 'Official Landmark',
    landmarkCategory: 'Criminal Law',
    originalityCheckPassed: true,
    sourceVerificationPassed: true,
    publicationStatus: 'Approved & Published',
    generatedAt: '2026-11-10 09:00 AM IST',
    reviewedBy: 'Adv. Rajeshwar S. Punia'
  },
  {
    id: 'ca-satender-antil-2022',
    judgmentId: 'sc-2022-satender-kumar-antil',
    caseTitle: 'Satender Kumar Antil v. Central Bureau of Investigation & Anr.',
    citation: '2022 INSC 690 | (2022) 10 SCC 51',
    court: 'Supreme Court of India',
    bench: 'Division Bench',
    coram: 'Sanjay Kishan Kaul, M.M. Sundresh, JJ.',
    dateOfDecision: '2022-07-11',
    caseNumber: 'Miscellaneous Application No. 1849 of 2021 in SLP (Crl.) No. 5191 of 2021',
    relevantActsAndSections: [
      'Code of Criminal Procedure, 1973 — Sections 41, 41A, 88, 170, 437, 439',
      'Bharatiya Nagarik Suraksha Sanhita, 2023 — Sections 35, 91, 190, 480, 483'
    ],
    backgroundAndFacts: 'Persistent non-compliance by police and trial courts with mandatory notice procedures under Section 41A CrPC and mechanical remand of accused persons appearing upon summons.',
    proceduralHistory: 'Continuous mandamus proceedings wherein the Supreme Court classified offences into four categories (A, B, C, D) to streamline bail adjudication.',
    legalIssues: [
      'Whether an accused who was not arrested during investigation can be mechanically remanded to custody upon filing of the charge-sheet under Section 170 CrPC.',
      'What are the consequences of non-compliance with Sections 41 and 41A CrPC?'
    ],
    argumentsOfParties: {
      petitionerArguments: 'Contended that trial courts routinely insist on physical custody when a charge-sheet is presented, misinterpreting the word "custody" in Section 170 CrPC.',
      respondentArguments: 'Investigating agencies submitted that in grave economic and special statute offences, stringent bail conditions apply.',
      counselSubmissionsNote: 'Senior counsel highlighted overcrowding of prisons with undertrials in offences punishable up to 7 years.'
    },
    questionsBeforeCourt: [
      'Does Section 170 CrPC mandate arrest at the time of filing the charge-sheet?',
      'Does violation of Section 41/41A CrPC entitle the accused to bail?'
    ],
    decision: 'The Supreme Court issued comprehensive binding directions holding that non-compliance with Sections 41 and 41A CrPC entitles the accused to grant of bail, and Courts must not mechanically remand accused appearing on summons.',
    orderClassification: 'Final Judgment',
    ratioDecidendi: 'Investigating agencies are bound to comply with Sections 41 and 41A CrPC (Section 35 BNSS). Any dereliction entitles the accused to bail. Further, where an accused was not arrested during investigation, the trial court should not remand them to custody upon filing of the charge-sheet.',
    obiterDicta: 'Bail is the rule and jail is the exception, a principle rooted in the presumption of innocence and Article 21.',
    importantLegalPrinciples: [
      'Mandatory compliance with Section 41A CrPC / Section 35 BNSS notice before arrest for offences punishable up to 7 years.',
      'No mechanical custody under Section 170 CrPC when accused cooperated without arrest during investigation.',
      'Bail applications should ordinarily be decided within two weeks, and anticipatory bail within six weeks.'
    ],
    keyParagraphReferences: [
      { paraNumber: 'Para 73(b)', proposition: 'Investigating agencies and their officers are duty-bound to comply with the mandate of Section 41 and 41A of the Code.', verifiedInOriginalPdf: true },
      { paraNumber: 'Para 73(e)', proposition: 'There need not be any insistence of a bail application while considering the application under Section 88, 170, 204 and 209 of the Code.', verifiedInOriginalPdf: true }
    ],
    earlierCasesConsidered: [
      'Arnesh Kumar v. State of Bihar, (2014) 8 SCC 273',
      'Siddharth v. State of Uttar Pradesh, (2022) 1 SCC 676'
    ],
    statutoryInterpretation: 'Harmonious construction of Sections 41, 41A, 88, and 170 CrPC in light of Article 21.',
    practicalLegalImplications: 'Provides immediate grounds for bail where police arrest without recording reasons or serving a Section 35 BNSS / 41A CrPC notice.',
    subsequentTreatment: 'Monitored actively by the Supreme Court across all State High Courts in 2023–2026.',
    conclusion: 'Binding guidelines issued to all High Courts, District Judiciary, and Police Directorates.',
    officialJudgmentPdfUrl: '/judgments/govt-sourced/sc_2022_insc_690_satender_kumar_antil.pdf',
    researchReferences: [
      'Supreme Court Official Record: 2022 INSC 690'
    ],
    editorialDistinctionNote: 'Verified from operative directions in Para 73 of the judgment.',
    landmarkStatus: 'Official Landmark',
    landmarkCategory: 'Criminal Law',
    originalityCheckPassed: true,
    sourceVerificationPassed: true,
    publicationStatus: 'Pending Review',
    generatedAt: '2026-11-11 07:30 AM IST'
  },
  {
    id: 'ca-phhc-partition-2023',
    judgmentId: 'phhc-2023-ram-niwas-revenue',
    caseTitle: 'Ram Niwas v. Financial Commissioner, Haryana and Others',
    citation: '2023:PHHC:114820',
    court: 'High Court of Punjab and Haryana at Chandigarh',
    bench: 'Single Bench',
    coram: 'Sureshwar Thakur, J.',
    dateOfDecision: '2023-09-14',
    caseNumber: 'CWP No. 18420 of 2021',
    relevantActsAndSections: [
      'Punjab Land Revenue Act, 1887 (as applicable to Haryana) — Sections 111, 118, 121',
      'Constitution of India — Article 226'
    ],
    backgroundAndFacts: 'Challenge to Sanad Takseem (instrument of partition) issued by Assistant Collector 1st Grade in agricultural land partition proceedings where one co-sharer alleged unequal allotment of road-frontage land.',
    proceduralHistory: 'Writ Petition under Article 226 of the Constitution challenging concurrent orders of the Collector, Commissioner, and Financial Commissioner, Haryana.',
    legalIssues: [
      'Scope of interference under Article 226 against a finalized Sanad Takseem when the Mode of Partition (Naksha Be) was not challenged in time.',
      'Principle of equitable distribution of agricultural frontage according to quality and value of land.'
    ],
    argumentsOfParties: {
      petitionerArguments: 'Asserted that Naksha Bey violated the agreed mode of partition by denying contiguous possession.',
      respondentArguments: 'Pointed out that petitioner never filed objections to Naksha Bey before the Assistant Collector and approached the writ court after Sanad Takseem was drawn.',
      counselSubmissionsNote: 'Relied upon Full Bench precedent on finality of Mode of Partition.'
    },
    questionsBeforeCourt: [
      'Whether a co-sharer who acquiesced in the Mode of Partition can challenge the final Sanad Takseem on factual grounds?'
    ],
    decision: 'Writ petition dismissed; concurrent revenue authorities orders upheld as possession and frontage were proportionately allotted.',
    orderClassification: 'Final Judgment',
    ratioDecidendi: 'Once the Mode of Partition attains finality without objection, Naksha Bey prepared strictly in accordance therewith cannot be reopened unless patent illegality or violation of natural justice is demonstrated.',
    obiterDicta: 'Revenue courts must ensure minimal fragmentation of holdings while respecting quality and frontage.',
    importantLegalPrinciples: [
      'Finality of Mode of Partition under Section 118 of the Land Revenue Act.',
      'Supervisory jurisdiction of Financial Commissioner and High Court against Sanad Takseem.'
    ],
    keyParagraphReferences: [
      { paraNumber: 'Para 8', proposition: 'Naksha Bey must conform to the sanctioned Mode of Partition.', verifiedInOriginalPdf: true },
      { paraNumber: 'Para 11', proposition: 'No perversity found in proportionate road frontage allocation.', verifiedInOriginalPdf: true }
    ],
    earlierCasesConsidered: [
      'Amar Khan v. State of Punjab, 2009 (1) RCR (Civil) 741 (Division Bench)'
    ],
    statutoryInterpretation: 'Interpretation of Sections 111 to 122 of the Punjab Land Revenue Act, 1887 (Haryana).',
    practicalLegalImplications: 'Litigants in Haryana revenue courts must file timely objections at the stage of Mode of Partition and Naksha Bey rather than waiting until Sanad Takseem.',
    subsequentTreatment: 'Binding High Court precedent for Haryana & Punjab revenue courts.',
    conclusion: 'Sanad Takseem affirmed.',
    officialJudgmentPdfUrl: '/judgments/govt-sourced/phhc_2023_114820_ram_niwas_haryana_partition.pdf',
    researchReferences: [
      'Punjab and Haryana High Court Official Portal: 2023:PHHC:114820'
    ],
    editorialDistinctionNote: 'Actual High Court order verified. Practical implications authored by Punia Associates Revenue Desk.',
    landmarkStatus: 'Potential Landmark — Editorial Verification Required',
    landmarkCategory: 'Property Law',
    originalityCheckPassed: true,
    sourceVerificationPassed: true,
    publicationStatus: 'Pending Review',
    generatedAt: '2026-11-11 07:45 AM IST'
  }
];

export const INITIAL_GENERATED_ARTICLES: GeneratedLegalArticleRecord[] = [
  {
    id: 'ai-art-bnss-bail-2026',
    title: 'Anticipatory and Regular Bail Jurisprudence under BNSS 2023: A Comparative Analysis with Supreme Court Precedents',
    slug: 'anticipatory-and-regular-bail-jurisprudence-bnss-2023-analysis',
    articleFormat: 'Criminal Law Analysis',
    category: 'Criminal Law',
    linkedJudgmentId: 'sc-2020-sushila-aggarwal',
    linkedActs: ['Bharatiya Nagarik Suraksha Sanhita, 2023', 'Code of Criminal Procedure, 1973'],
    linkedSections: ['Section 482 BNSS', 'Section 480 BNSS', 'Section 35 BNSS'],
    summary: 'An original analytical examination of pre-arrest and regular bail provisions under the Bharatiya Nagarik Suraksha Sanhita, 2023, read in light of Sushila Aggarwal v. State (NCT of Delhi) and Satender Kumar Antil v. CBI.',
    body: `### 1. Statutory Transition from CrPC 1973 to BNSS 2023\n\nThe enactment of the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) reorganizes the procedural framework governing arrest and bail across Indian criminal courts. Section 482 of the BNSS corresponds to the erstwhile Section 438 of the Code of Criminal Procedure, 1973 (anticipatory bail), while Section 35 consolidates the provisions of Sections 41 and 41A CrPC regarding arrest without warrant and mandatory notice of appearance.\n\n### 2. Enduring Force of Constitution Bench Precedents\n\nIn *Sushila Aggarwal v. State (NCT of Delhi)* (2020 INSC 106), a Five-Judge Constitution Bench of the Supreme Court settled that anticipatory bail does not automatically lapse upon the filing of a police report (charge-sheet) under Section 173 CrPC (now Section 193 BNSS). Because the statutory text of Section 482 BNSS preserves the substantive power of the Court of Session and the High Court to direct release in the event of arrest, the ratio decidendi of *Sushila Aggarwal* applies with full force to proceedings under the BNSS.\n\n### 3. Mandatory Notice Compliance under Section 35 BNSS\n\nFollowing *Arnesh Kumar v. State of Bihar* (2014 INSC 463) and *Satender Kumar Antil v. CBI* (2022 INSC 690), police officers investigating offences punishable with imprisonment up to seven years must record concrete statutory reasons prior to arrest and issue a notice of appearance under Section 35(3) BNSS. Non-compliance with this statutory safeguard continues to constitute a primary ground for judicial relief.`,
    originalSourceLinks: [
      { title: 'Supreme Court of India — Sushila Aggarwal (2020 INSC 106)', url: 'https://scr.sci.gov.in/scrsearch/' },
      { title: 'India Code — Bharatiya Nagarik Suraksha Sanhita, 2023', url: 'https://www.indiacode.nic.in/' }
    ],
    seoTitle: 'Bail Jurisprudence under BNSS 2023 & Supreme Court Precedents | Punia Associates',
    seoDescription: 'Original legal research analysis on Section 482 and Section 35 BNSS 2023 read with Sushila Aggarwal and Satender Kumar Antil Supreme Court rulings.',
    originalityScore: 99,
    copyrightComplianceVerified: true,
    publicationStatus: 'Pending Review',
    createdAt: '2026-11-11 08:00 AM IST',
    author: 'Punia Associates AI Legal Research Desk (Pending Editorial Review)'
  },
  {
    id: 'ai-art-phhc-partition-2026',
    title: 'Procedure for Agricultural Land Partition (Takseem) in Haryana: Stages from Application to Sanad Takseem',
    slug: 'agricultural-land-partition-takseem-haryana-legal-guide',
    articleFormat: 'Property Law Analysis',
    category: 'Property Law',
    linkedJudgmentId: 'phhc-2023-ram-niwas-revenue',
    linkedActs: ['Punjab Land Revenue Act, 1887 (as applicable to Haryana)'],
    linkedSections: ['Section 111', 'Section 118', 'Section 121', 'Section 122'],
    summary: 'Practical legal guide explaining each statutory stage of agricultural land partition before Revenue Officers in Haryana, including Naksha Alif, Mode of Partition, Naksha Bey, and Sanad Takseem.',
    body: `### 1. Statutory Right of Co-Sharers to Seek Partition\n\nUnder Section 111 of the Punjab Land Revenue Act, 1887 (as applicable to the State of Haryana), any joint owner of agricultural land recorded in the Jamabandi may apply to the Assistant Collector 1st Grade (Tehsildar exercising powers) for partition (*Takseem*) of the joint holding.\n\n### 2. Critical Stages of Revenue Partition\n\n1. **Naksha Alif:** Preliminary statement of shares prepared by the Halqa Patwari verifying the recorded ownership of each co-sharer.\n2. **Mode of Partition (Tarik-e-Takseem):** The foundational order under Section 118 determining whether partition will disturb existing possession, how road frontage and irrigation sources will be divided, and valuation of land classes.\n3. **Naksha Bey:** The field map and allotment schedule prepared strictly in conformity with the sanctioned Mode of Partition.\n4. **Sanad Takseem:** The final instrument of partition drawn under Section 121 after expiry of the appeal period, followed by delivery of physical possession (*Dakhal*) under Section 122.\n\n### 3. Judicial Review before the High Court\n\nAs reiterated by the Punjab and Haryana High Court in *Ram Niwas v. Financial Commissioner, Haryana* (2023:PHHC:114820), a party who fails to challenge the Mode of Partition at the appropriate stage cannot belatedly seek to overturn the final *Sanad Takseem* without demonstrating a violation of natural justice.`,
    originalSourceLinks: [
      { title: 'High Court of Punjab and Haryana Official Portal', url: 'https://highcourtchd.gov.in/' },
      { title: 'India Code — State Revenue Legislation', url: 'https://www.indiacode.nic.in/' }
    ],
    seoTitle: 'Agricultural Land Partition (Takseem) Law in Haryana | Punia Associates',
    seoDescription: 'Complete guide to Section 111–122 Land Revenue Act partition stages in Haryana: Naksha Alif, Mode of Partition, Naksha Bey, and Sanad Takseem.',
    originalityScore: 98,
    copyrightComplianceVerified: true,
    publicationStatus: 'Pending Review',
    createdAt: '2026-11-11 08:15 AM IST',
    author: 'Punia Associates AI Legal Research Desk (Pending Editorial Review)'
  }
];

export const INITIAL_RESEARCH_JOBS: ResearchJobRecord[] = [
  {
    id: 'job-20261111-sc',
    jobName: 'Daily Supreme Court & e-SCR Primary Source Scan',
    targetSource: 'Supreme Court',
    status: 'Completed',
    startedAt: '2026-11-11 07:00 AM IST',
    completedAt: '2026-11-11 07:04 AM IST',
    judgmentsDiscovered: 5,
    pdfsVerified: 5,
    duplicatesSkipped: 2,
    articlesGenerated: 2,
    errorsCount: 0,
    logDetails: [
      'Connected to https://www.sci.gov.in/ and https://scr.sci.gov.in/scrsearch/',
      'Verified SHA-256 checksums for 5 official Supreme Court judgment PDFs.',
      'Skipped 2 duplicate judgments already present in judgmentsDb.',
      'Generated 2 original Case Analyses and marked as Pending Review.'
    ]
  },
  {
    id: 'job-20261111-phhc',
    jobName: 'Punjab & Haryana High Court & eCourts Daily Scan',
    targetSource: 'Haryana & P&H High Court',
    status: 'Completed',
    startedAt: '2026-11-11 07:10 AM IST',
    completedAt: '2026-11-11 07:13 AM IST',
    judgmentsDiscovered: 3,
    pdfsVerified: 3,
    duplicatesSkipped: 1,
    articlesGenerated: 1,
    errorsCount: 0,
    logDetails: [
      'Scanned High Court of Punjab and Haryana (https://highcourtchd.gov.in/) and eCourts portal.',
      'Verified neutral citations (PHHC) and original court order PDFs.',
      'Saved case brief for revenue partition ruling under Pending Review.'
    ]
  }
];

export const INITIAL_AUTOMATION_SCHEDULE: AutomationScheduleConfig = {
  automationEnabled: true,
  currentEngineState: 'Active',
  defaultDailyScanTimeIST: '07:00',
  supremeCourtFrequency: 'Daily',
  highCourtFrequency: 'Daily',
  haryanaFrequency: 'Daily',
  landmarkFrequency: 'Weekly',
  legislationFrequency: 'Daily',
  autoIngestOfficialPdfToLibrary: true,
  autoPublishAiAnalysisWithoutReview: false,
  editorialSafeguardsConfigured: true,
  lastSuccessfulScanTimestamp: '2026-11-11 07:15 AM IST',
  nextScheduledScanTimestamp: '2026-11-12 07:00 AM IST'
};
