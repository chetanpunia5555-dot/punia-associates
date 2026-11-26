import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Upload,
  FolderArchive,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Eye,
  Search,
  RefreshCw,
  Layers,
  GitCompare,
  FileCode,
  ArrowRight,
  X,
  Cpu,
  Database,
  Play,
  SlidersHorizontal
} from 'lucide-react';
import {
  ALL_27_PRACTICE_AREAS,
  ALL_26_DOCUMENT_TYPES,
  IngestedLegalDocumentRecord,
  BulkImportJobRecord,
  ConfidentialClientMatter,
  CriminalLawStatutoryMapping,
  LegislationAmendmentRecord,
  LegalDraftingTemplate,
  LawyerProfileExtractionRecord,
  LegalPracticeArea,
  LegalDocumentType
} from '../data/documentIntelligenceData';
import { Judgment } from '../data/legalCmsData';
import { BareAct } from '../data/bareActsData';

interface OverviewResponse {
  practiceAreasTaxonomy: typeof ALL_27_PRACTICE_AREAS;
  ingestedDocuments: IngestedLegalDocumentRecord[];
  bulkImportJobs: BulkImportJobRecord[];
  confidentialMatters: ConfidentialClientMatter[];
  statutoryMappings: CriminalLawStatutoryMapping[];
  legislationAmendments: LegislationAmendmentRecord[];
  legalTemplates: LegalDraftingTemplate[];
  lawyerProfilesQueue: LawyerProfileExtractionRecord[];
  metrics: {
    totalIngested: number;
    caseLawCount: number;
    legislationCount: number;
    confidentialVaultCount: number;
    verificationQueueCount: number;
    ocrFlaggedCount: number;
    verifiedCommittedCount: number;
  };
}

interface GroundedResearchResponse {
  query: string;
  hasSufficientSources: boolean;
  matchedJudgments: Judgment[];
  matchedBareActs: BareAct[];
  matchedMappings: CriminalLawStatutoryMapping[];
  groundedSynthesis: string;
  confidentialVaultExcluded: boolean;
}

export const AdminDocumentIntelligenceHub: React.FC = () => {
  const [subTab, setSubTab] = useState<
    | 'bulk-import-analysis'
    | 'category-review-27'
    | 'criminal-law-mapping'
    | 'retrieval-research'
    | 'drafting-profiles'
    | 'confidential-vault'
  >('bulk-import-analysis');

  const [data, setData] = useState<OverviewResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusBanner, setStatusBanner] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);

  // Bulk Upload & Batch Simulation State
  const [uploadingBatch, setUploadingBatch] = useState<boolean>(false);
  const [customFileName, setCustomFileName] = useState<string>('');
  const [customArchivePath, setCustomArchivePath] = useState<string>('');
  const [customRawText, setCustomRawText] = useState<string>('');

  // Inspector & Reclassification State
  const [inspectedDoc, setInspectedDoc] = useState<IngestedLegalDocumentRecord | null>(null);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [filterPracticeArea, setFilterPracticeArea] = useState<string>('ALL');
  const [filterDocType, setFilterDocType] = useState<string>('ALL');
  const [filterCourtLevel, setFilterCourtLevel] = useState<string>('ALL');
  const [filterReviewStatus, setFilterReviewStatus] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Reclassification Controls
  const [targetPracticeArea, setTargetPracticeArea] = useState<LegalPracticeArea>('Criminal Law and Criminal Litigation');
  const [targetDocType, setTargetDocType] = useState<LegalDocumentType>('Court Judgment');
  const [bulkConfirmModalOpen, setBulkConfirmModalOpen] = useState<boolean>(false);

  // Retrieval-Grounded Research State
  const [researchQuery, setResearchQuery] = useState<string>(
    'Anticipatory bail under Section 482 BNSS and Section 438 CrPC'
  );
  const [researchResult, setResearchResult] = useState<GroundedResearchResponse | null>(null);
  const [runningResearch, setRunningResearch] = useState<boolean>(false);

  // Legal Drafting State
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [draftFacts, setDraftFacts] = useState<Record<string, string>>({});
  const [generatedDraftOutput, setGeneratedDraftOutput] = useState<{
    templateTitle: string;
    jurisdiction: string;
    missingPlaceholders: string[];
    populatedDraft: string;
    mandatoryReviewNotice: string;
  } | null>(null);

  // Confidential Client Matter Form State
  const [newClientName, setNewClientName] = useState<string>('Confidential Landowner Group — Rohtak NH-9 Acquisition');
  const [newMatterTitle, setNewMatterTitle] = useState<string>('Section 64 RFCTLARR Act Reference Enhancement Claim');
  const [newMatterType, setNewMatterType] = useState<LegalDocumentType>('Petition / Plaint');
  const [newPracticeArea, setNewPracticeArea] = useState<LegalPracticeArea>('Property Law and Real Estate');
  const [newCourtForum, setNewCourtForum] = useState<string>('Reference Court / ADJ Rohtak, Haryana');
  const [newAssignedAdvocate, setNewAssignedAdvocate] = useState<string>('Adv. Rajeshwar S. Punia');
  const [newPrivateNotes, setNewPrivateNotes] = useState<string>(
    'Contains confidential landowner compensation bank details and Award calculations. Strictly isolated from public search.'
  );

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/doc-intelligence/overview');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.toLowerCase().includes('application/json')) {
        const json: OverviewResponse = await res.json();
        setData(json);
        if (!selectedTemplateId && json.legalTemplates.length > 0) {
          setSelectedTemplateId(json.legalTemplates[0].id);
        }
      }
    } catch (err) {
      console.warn('Document Intelligence overview fetch fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  // Filtered Documents for Category Review & Inspector
  const filteredDocs = useMemo(() => {
    if (!data) return [];
    return data.ingestedDocuments.filter((doc) => {
      if (
        filterPracticeArea !== 'ALL' &&
        doc.classification.primaryPracticeArea !== filterPracticeArea &&
        !doc.classification.secondaryPracticeAreas.includes(filterPracticeArea as LegalPracticeArea)
      ) {
        return false;
      }
      if (filterDocType !== 'ALL' && doc.documentType !== filterDocType) {
        return false;
      }
      if (filterCourtLevel !== 'ALL' && doc.jurisdiction.courtLevel !== filterCourtLevel) {
        return false;
      }
      if (filterReviewStatus !== 'ALL' && doc.reviewStatus !== filterReviewStatus) {
        return false;
      }
      if (searchKeyword.trim() !== '') {
        const q = searchKeyword.toLowerCase();
        const matchTitle = doc.extractedTitle.toLowerCase().includes(q);
        const matchFile = doc.sourceFileName.toLowerCase().includes(q);
        const matchStatute = doc.statutesExtracted.some(
          (s) => s.statuteTitle.toLowerCase().includes(q) || s.section.toLowerCase().includes(q)
        );
        const matchCitation = doc.citationsExtracted.some((c) => c.rawCitationString.toLowerCase().includes(q));
        if (!matchTitle && !matchFile && !matchStatute && !matchCitation) return false;
      }
      return true;
    });
  }, [data, filterPracticeArea, filterDocType, filterCourtLevel, filterReviewStatus, searchKeyword]);

  // Run Representative Batch Upload (5, 25, or 100 Mixed Legal Files per Part 18 Section 79)
  const handleRunBatchTest = async (batchSize: 5 | 25 | 100) => {
    setUploadingBatch(true);
    setStatusBanner(null);
    try {
      const baseSamples = [
        {
          fileName: 'Supreme_Court_Bail_Article21_Ruling_2025.pdf',
          filePath: '/SC_Judgments/2025/Criminal/Supreme_Court_Bail_Article21_Ruling_2025.pdf',
          fileFormat: 'PDF',
          fileSizeBytes: 420000,
          rawText:
            "IN THE SUPREME COURT OF INDIA CRIMINAL APPELLATE JURISDICTION. 2025 INSC 412. Coram: Hon'ble Justice B.R. Gavai and Hon'ble Justice K.V. Viswanathan. Held: Prolonged incarceration without trial violates Article 21 of the Constitution of India. Bail under Section 483 BNSS (formerly Section 439 CrPC) granted."
        },
        {
          fileName: 'judgment.pdf',
          filePath: '/Haryana_District_Courts/Rohtak/2026/judgment.pdf',
          fileFormat: 'SCAN_IMAGE',
          fileSizeBytes: 185000,
          rawText:
            'IN THE COURT OF SHRI SANDEEP GARG, ADDITIONAL SESSIONS JUDGE, ROHTAK, HARYANA. Present: Shri R.S. Punia, Counsel for applicant. Learned Public Prosecutor seeks time to file police reply. Case adjourned to 14.12.2026 for filing reply and arguments on bail application.'
        },
        {
          fileName: 'BNS_BNSS_Comparative_Practice_Note_2026.docx',
          filePath: '/Practice_Notes/Criminal_Law/BNS_BNSS_Comparative_Practice_Note_2026.docx',
          fileFormat: 'DOCX',
          fileSizeBytes: 310000,
          rawText:
            'PUNIA ASSOCIATES LEGAL ARTICLE & PRACTICE COMMENTARY: Transition from Indian Penal Code 1860 and CrPC 1973 to Bharatiya Nyaya Sanhita (BNS) 2023 and Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023. Analysis of Section 482 BNSS anticipatory bail and Section 63 BSA electronic evidence.'
        },
        {
          fileName: 'Confidential_Client_Divorce_Settlement_Hisar.docx',
          filePath: '/Client_Vault_Uploads/2026/Confidential_Client_Divorce_Settlement_Hisar.docx',
          fileFormat: 'DOCX',
          fileSizeBytes: 255000,
          rawText:
            'CONFIDENTIAL CLIENT SETTLEMENT AGREEMENT & VAKALATNAMA. Principal Judge, Family Court, Hisar, Haryana. Petition under Section 13B of Hindu Marriage Act, 1955. Contains client Aadhaar [REDACTED], bank RTGS details, and child custody terms.'
        },
        {
          fileName: 'PHHC_Land_Acquisition_RFCTLARR_Judgment_2026.pdf',
          filePath: '/PHHC_Chandigarh/2026/Land_Acquisition/PHHC_Land_Acquisition_RFCTLARR_Judgment_2026.pdf',
          fileFormat: 'PDF',
          fileSizeBytes: 680000,
          rawText:
            "IN THE HIGH COURT OF PUNJAB AND HARYANA AT CHANDIGARH. 2026:PHHC:029841. RFA-1920-2025. Coram: Hon'ble Justice Harkesh Manuja. Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 Section 26 and Section 64. Market value of acquired land in Sonipat enhanced with statutory solatium."
        }
      ];

      const extraTemplates = [
        {
          fileName: 'NCLT_Chandigarh_IBC_Sec9_Order.pdf',
          filePath: '/Tribunals/NCLT_Chandigarh/NCLT_Chandigarh_IBC_Sec9_Order.pdf',
          fileFormat: 'PDF',
          fileSizeBytes: 510000,
          rawText:
            'NATIONAL COMPANY LAW TRIBUNAL CHANDIGARH BENCH. CP (IB) No. 114/Chd/Hry/2025. Operational Creditor application under Section 9 of the Insolvency and Bankruptcy Code, 2016 dismissed due to pre-existing dispute.'
        },
        {
          fileName: 'NGT_Environmental_Sand_Mining_Yamuna_Order.pdf',
          filePath: '/Tribunals/NGT_Delhi/NGT_Environmental_Sand_Mining_Yamuna_Order.pdf',
          fileFormat: 'PDF',
          fileSizeBytes: 390000,
          rawText:
            'BEFORE THE NATIONAL GREEN TRIBUNAL PRINCIPAL BENCH, NEW DELHI. OA No. 412/2025. Environment (Protection) Act, 1986 and National Green Tribunal Act, 2010. Directions issued to Haryana State Pollution Control Board.'
        },
        {
          fileName: 'Arbitration_Award_Construction_Contract_Gurugram.pdf',
          filePath: '/Commercial_Courts/Gurugram/Arbitration_Award_Construction_Contract_Gurugram.pdf',
          fileFormat: 'PDF',
          fileSizeBytes: 740000,
          rawText:
            'IN THE COMMERCIAL COURT AT GURUGRAM, HARYANA. Objection petition under Section 34 of the Arbitration and Conciliation Act, 1996 challenging arbitral award in infrastructure contract dispute. Held: Patent illegality not established.'
        },
        {
          fileName: 'Haryana_RERA_Panchkula_Refund_Order.pdf',
          filePath: '/Tribunals/HRERA_Panchkula/Haryana_RERA_Panchkula_Refund_Order.pdf',
          fileFormat: 'PDF',
          fileSizeBytes: 460000,
          rawText:
            'HARYANA REAL ESTATE REGULATORY AUTHORITY PANCHKULA. Complaint under Section 18 and Section 31 of Real Estate (Regulation and Development) Act, 2016 (RERA). Promoter directed to refund homebuyer amount with prescribed SBI MCLR interest.'
        },
        {
          fileName: 'MACT_Karnal_Motor_Accident_Award_2026.pdf',
          filePath: '/Haryana_District_Courts/Karnal/MACT_Karnal_Motor_Accident_Award_2026.pdf',
          fileFormat: 'PDF',
          fileSizeBytes: 320000,
          rawText:
            'MOTOR ACCIDENT CLAIMS TRIBUNAL (MACT), KARNAL, HARYANA. Claim Petition under Section 166 of the Motor Vehicles Act, 1988. Multiplier method and future prospects applied as per Pranay Sethi.'
        }
      ];

      const filesToSend = [];
      for (let i = 0; i < batchSize; i++) {
        const pool = i < 5 ? baseSamples[i] : extraTemplates[i % extraTemplates.length];
        filesToSend.push({
          ...pool,
          fileName: i < 5 ? pool.fileName : `BatchDoc_${String(i + 1).padStart(3, '0')}_${pool.fileName}`,
          filePath:
            i < 5
              ? pool.filePath
              : `/Batch_${batchSize}_Import/Set_${Math.floor(i / 10) + 1}/BatchDoc_${String(i + 1).padStart(3, '0')}_${pool.fileName}`
        });
      }

      const res = await fetch('/api/admin/doc-intelligence/bulk-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobName: `PuniaAssociates_${batchSize}_Document_Mixed_Legal_Archive.zip`,
          batchSize: 25,
          concurrencyLimit: 4,
          files: filesToSend
        })
      });

      if (res.ok) {
        const result = await res.json();
        await fetchOverview();
        setStatusBanner({
          type: 'success',
          message: `Completed ${batchSize}-Document Intelligent Batch Ingestion (${result.job.jobId}): ${result.job.summaryCounts.judgments} Judgments, ${result.job.summaryCounts.ordersAndTribunals} Orders/Tribunals, ${result.job.summaryCounts.confidentialVaultRoutedCount} Confidential Client Files Isolated, ${result.job.summaryCounts.ocrRequiredCount} Scanned/OCR Files Flagged.`
        });
      }
    } catch (err) {
      console.error('Batch upload error:', err);
      setStatusBanner({
        type: 'error',
        message: 'Failed to execute batch ingestion test.'
      });
    } finally {
      setUploadingBatch(false);
    }
  };

  // Real File Upload Handler (PDF, ZIP, DOCX, TXT)
  const handleRealFileSelection = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadingBatch(true);
    setStatusBanner(null);
    try {
      const formData = new FormData();
      Array.from(fileList).forEach((f) => formData.append('files', f));
      formData.append('jobName', fileList.length === 1 ? fileList[0].name : `Batch_${fileList.length}_Legal_Documents`);

      const res = await fetch('/api/admin/doc-intelligence/bulk-upload', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      if (res.ok && result.success) {
        await fetchOverview();
        const firstDoc: IngestedLegalDocumentRecord | undefined = result.documents?.[0];
        if (firstDoc) setInspectedDoc(firstDoc);
        setStatusBanner({
          type: 'success',
          message: `Successfully uploaded & classified ${result.documents?.length || fileList.length} document(s)! Bare Act PDFs have also been published directly to the Bare Acts repository.`
        });
      } else {
        setStatusBanner({
          type: 'error',
          message: result.error || 'Failed to upload and classify selected files.'
        });
      }
    } catch (err: any) {
      setStatusBanner({
        type: 'error',
        message: err?.message || 'Network error while uploading files.'
      });
    } finally {
      setUploadingBatch(false);
    }
  };

  // Single / Custom Document Intelligent Upload (Zero Manual Category Required)
  const handleCustomIntelligentUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFileName.trim() || !customRawText.trim()) return;
    setUploadingBatch(true);
    setStatusBanner(null);
    try {
      const ext = customFileName.split('.').pop()?.toUpperCase() || 'PDF';
      const res = await fetch('/api/admin/doc-intelligence/bulk-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobName: `Single Content-First Upload: ${customFileName.trim()}`,
          files: [
            {
              fileName: customFileName.trim(),
              filePath: customArchivePath.trim() || `/Direct_Uploads/${customFileName.trim()}`,
              fileFormat: ext,
              fileSizeBytes: Math.max(48000, customRawText.length * 16),
              rawText: customRawText.trim()
            }
          ]
        })
      });
      if (res.ok) {
        const result = await res.json();
        const created: IngestedLegalDocumentRecord | undefined = result.documents?.[0];
        await fetchOverview();
        setCustomFileName('');
        setCustomArchivePath('');
        setCustomRawText('');
        if (created) {
          setInspectedDoc(created);
          const isVault = created.targetDomain === 'Confidential Client Matter Vault';
          setStatusBanner({
            type: isVault ? 'warning' : 'success',
            message: `AI Content Inspection Complete: "${created.sourceFileName}" classified as [${created.documentType}] under [${created.classification.primaryPracticeArea}] (${created.confidenceMatrix.primaryCategory}% confidence). Routed to: ${created.targetDomain}.`
          });
        }
      }
    } catch (err) {
      console.error('Custom upload failed:', err);
    } finally {
      setUploadingBatch(false);
    }
  };

  // Handle Single or Bulk Verify / Reclassify
  const executeReclassification = async (ids: string[], confirmedBulk: boolean) => {
    try {
      const res = await fetch('/api/admin/doc-intelligence/verify-or-reclassify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentIds: ids,
          newPrimaryPracticeArea: targetPracticeArea,
          newDocumentType: targetDocType,
          action: 'VerifyAndCommit',
          confirmedBulkChange: confirmedBulk
        })
      });
      if (res.ok) {
        setBulkConfirmModalOpen(false);
        setSelectedDocIds([]);
        await fetchOverview();
        setStatusBanner({
          type: 'success',
          message: `Verified & committed ${ids.length} legal record(s) to [${targetDocType}] • [${targetPracticeArea}].`
        });
      } else {
        const errJson = await res.json();
        setStatusBanner({
          type: 'error',
          message: errJson.error || errJson.message || 'Verification blocked by security policy.'
        });
      }
    } catch (err) {
      console.error('Reclassification failed:', err);
    }
  };

  // Handle Retrieval-Grounded Research Query
  const handleRunRetrievalQuery = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setRunningResearch(true);
    try {
      const res = await fetch('/api/admin/doc-intelligence/research-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: researchQuery
        })
      });
      if (res.ok) {
        const json: GroundedResearchResponse = await res.json();
        setResearchResult(json);
      }
    } catch (err) {
      console.error('Research query error:', err);
    } finally {
      setRunningResearch(false);
    }
  };

  // Generate Legal Draft from Verified Template
  const handleGenerateDraft = async () => {
    try {
      const res = await fetch('/api/admin/doc-intelligence/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplateId,
          providedFacts: draftFacts
        })
      });
      if (res.ok) {
        const json = await res.json();
        setGeneratedDraftOutput(json);
      }
    } catch (err) {
      console.error('Draft generation error:', err);
    }
  };

  // Approve or Reject Lawyer Profile
  const handleLawyerVerification = async (profileId: string, decision: 'Approve' | 'Hold') => {
    try {
      const res = await fetch('/api/admin/doc-intelligence/approve-lawyer-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId, decision })
      });
      if (res.ok) {
        await fetchOverview();
        setStatusBanner({
          type: 'success',
          message: `Lawyer profile ${profileId} updated (${decision}).`
        });
      }
    } catch (err) {
      console.error('Failed to update lawyer profile:', err);
    }
  };

  // Add Confidential Client Matter
  const handleCreateConfidentialMatter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/confidential-vault/matters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: newClientName,
          matterTitle: newMatterTitle,
          primaryPracticeArea: newPracticeArea,
          courtOrForum: newCourtForum,
          AssignedLeadAdvocate: newAssignedAdvocate,
          documentType: newMatterType,
          fileName: 'Confidential_Client_Chamber_Brief.pdf',
          privateLawyerNotes: newPrivateNotes
        })
      });
      if (res.ok) {
        const created = await res.json();
        await fetchOverview();
        setStatusBanner({
          type: 'warning',
          message: `Confidential Client Matter [${created.matter?.matterReferenceCode}] stored in Private Vault with publicIndexingBlocked=true & externalAiTransmissionBlocked=true.`
        });
      }
    } catch (err) {
      console.error('Error creating confidential matter:', err);
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-8 text-center space-y-3">
        <RefreshCw className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-300 font-medium">
          Loading AI Legal Document Intelligence, 27-Practice-Area Taxonomy & Confidential Client Vault...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ENTERPRISE MODULE HEADER & METRICS RIBBON */}
      <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                AI Legal Document Intelligence Engine v4.0
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold">
                26 Doc Types • 27 Practice Areas • Content-First Inspection
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-white mt-1.5">
              Zero-Pre-Sorting Bulk Legal Ingestion, Statutory Versioning & Confidential Matter Vault
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspects actual headings, coram, citations, and operative text—overriding misleading filenames while strictly isolating private client records from public search.
            </p>
          </div>

          {/* 6 Live Telemetry Counters */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { label: 'Total Ingested', value: data.metrics.totalIngested, color: 'text-white border-slate-700 bg-slate-800/90' },
              { label: 'Case Law', value: data.metrics.caseLawCount, color: 'text-emerald-300 border-emerald-500/30 bg-emerald-950/30' },
              { label: 'Vault Isolated', value: data.metrics.confidentialVaultCount, color: 'text-red-300 border-red-500/30 bg-red-950/30' },
              { label: 'Verify Queue', value: data.metrics.verificationQueueCount, color: 'text-amber-300 border-amber-500/30 bg-amber-950/30' },
              { label: 'OCR Flagged', value: data.metrics.ocrFlaggedCount, color: 'text-orange-300 border-orange-500/30 bg-orange-950/30' },
              { label: 'Committed', value: data.metrics.verifiedCommittedCount, color: 'text-cyan-300 border-cyan-500/30 bg-cyan-950/30' }
            ].map((stat) => (
              <div key={stat.label} className={`px-3 py-2 rounded-xl border text-center ${stat.color}`}>
                <div className="text-base font-bold font-mono">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-wider opacity-85">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SUB-NAVIGATION BAR FOR THE 6 SPECIALIZED WORKSPACES */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'bulk-import-analysis', label: '1. Bulk Import & AI Content Inspection', icon: FolderArchive },
            { id: 'category-review-27', label: `2. 27-Practice-Area Category Review (${data.ingestedDocuments.length})`, icon: SlidersHorizontal },
            { id: 'criminal-law-mapping', label: '3. IPC/CrPC/IEA ↔ BNS/BNSS/BSA & Amendments', icon: GitCompare },
            { id: 'retrieval-research', label: '4. Retrieval-Grounded Research & Comparison', icon: Search },
            { id: 'drafting-profiles', label: '5. Legal Drafting & Lawyer Verification Queue', icon: FileCode },
            { id: 'confidential-vault', label: `6. Confidential Client Vault (${data.confidentialMatters.length})`, icon: Lock }
          ].map((item) => {
            const Icon = item.icon;
            const active = subTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSubTab(item.id as typeof subTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? item.id === 'confidential-vault'
                      ? 'bg-red-600 text-white shadow-lg ring-2 ring-red-400/50'
                      : 'bg-amber-500 text-slate-950 shadow-lg ring-2 ring-amber-400/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {statusBanner && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between gap-3 ${
              statusBanner.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : statusBanner.type === 'warning'
                ? 'bg-amber-950/60 border-amber-500/40 text-amber-200'
                : 'bg-red-950/60 border-red-500/40 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusBanner.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span>{statusBanner.message}</span>
            </div>
            <button onClick={() => setStatusBanner(null)} className="text-slate-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          WORKSPACE 1: BULK IMPORT & AI CONTENT INSPECTION (PART 2 & PART 18)
      ====================================================================== */}
      {subTab === 'bulk-import-analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Zero-Manual-Sorting Intelligent Upload & Batch Test Triggers */}
            <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-slate-700 pb-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-amber-400" />
                    <span>Zero-Pre-Sorting Intelligent Legal Ingestion</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Drop mixed files or nested ZIP archives (Judgments, Bare Acts, Gazette Notifications, Articles, or Client Files). AI inspects actual legal structure—no manual category dropdown required.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-amber-300 font-mono shrink-0">
                  ZIP Path-Traversal Guard: ACTIVE
                </span>
              </div>

              {/* Direct Real File Upload Dropzone */}
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRealFileSelection(e.dataTransfer.files);
                }}
                className="p-6 bg-slate-950/90 border-2 border-dashed border-amber-500/60 hover:border-amber-400 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all space-y-2 shadow-lg"
              >
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-white">
                  {uploadingBatch ? 'Uploading & Classifying Documents...' : 'Click Here or Drag & Drop PDFs, ZIP Archives, or DOCX Files'}
                </div>
                <p className="text-xs text-slate-400 max-w-lg">
                  Select 1 or multiple <strong>.pdf</strong> files, a <strong>.zip</strong> archive, or <strong>.docx / .txt</strong> documents. Bare Act PDFs are automatically extracted and published to the Bare Acts Library.
                </p>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow mt-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose PDF / ZIP / DOCX Files</span>
                </span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.zip,.docx,.txt,.csv,.json,application/pdf,application/zip,application/x-zip-compressed"
                  onChange={(e) => {
                    handleRealFileSelection(e.target.files);
                    e.target.value = '';
                  }}
                  className="hidden"
                />
              </label>

              {/* Representative Batch Verification Suites (Part 18 Section 79) */}
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" />
                    End-to-End Batch Verification & Stress Testing (Part 18, Section 79)
                  </span>
                  <span className="text-[11px] text-slate-400">Tests filename overrides, OCR flags & confidential isolation</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    disabled={uploadingBatch}
                    onClick={() => handleRunBatchTest(5)}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-left transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>5-Doc Representative Audit</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      SC Bail, Misnamed `judgment.pdf` Adjournment, BNS Article, Confidential Divorce File & PHHC Land Ruling
                    </p>
                  </button>

                  <button
                    type="button"
                    disabled={uploadingBatch}
                    onClick={() => handleRunBatchTest(25)}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-emerald-500/40 text-left transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>25-Doc Mixed Archive</span>
                      <FolderArchive className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Multi-court ZIP simulation (SC, PHHC, NCLT, NGT, MACT, HRERA, Commercial Courts)
                    </p>
                  </button>

                  <button
                    type="button"
                    disabled={uploadingBatch}
                    onClick={() => handleRunBatchTest(100)}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-left transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>100-Doc Scale Stress Test</span>
                      <Database className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Tests high-volume deduplication, hierarchy preservation & confidence scoring
                    </p>
                  </button>
                </div>
              </div>

              {/* Live Content-Based Document Analyzer Form */}
              <form onSubmit={handleCustomIntelligentUpload} className="space-y-3 pt-2 border-t border-slate-700/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200">
                    Test Live Content-Based Classification (Try a misleading filename like <code className="text-amber-300">judgment.pdf</code>):
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomFileName('judgment.pdf');
                      setCustomArchivePath('/Rohtak_Sessions_Upload/2026/judgment.pdf');
                      setCustomRawText(
                        'IN THE COURT OF ADDITIONAL SESSIONS JUDGE, ROHTAK, HARYANA. Present: Counsel for petitioner. Learned Public Prosecutor requests adjournment as Investigating Officer has not brought the police file. Adjourned to 22.11.2026 for filing reply.'
                      );
                    }}
                    className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                  >
                    Load Misnamed `judgment.pdf` Demo
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Original Filename (Supported: PDF, DOCX, ZIP, TXT, JSON, CSV, XML)
                    </label>
                    <input
                      type="text"
                      value={customFileName}
                      onChange={(e) => setCustomFileName(e.target.value)}
                      placeholder="e.g., judgment.pdf or Client_Settlement_Hisar.docx"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Archive Folder Hierarchy (Preserved as Context Signal)
                    </label>
                    <input
                      type="text"
                      value={customArchivePath}
                      onChange={(e) => setCustomArchivePath(e.target.value)}
                      placeholder="/Court_Uploads/Haryana/Rohtak/2026/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Document Text / Extracted OCR Stream (AI inspects headings, coram, party titles, citations & privacy signals)
                  </label>
                  <textarea
                    rows={4}
                    value={customRawText}
                    onChange={(e) => setCustomRawText(e.target.value)}
                    placeholder="Paste court heading, coram, statutory provisions, or client agreement text here..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploadingBatch}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {uploadingBatch ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                  <span>Run Content-Based AI Classification & Privacy Gate</span>
                </button>
              </form>
            </div>

            {/* Right 5 Cols: Bulk Import Job History & Breakdown */}
            <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Bulk Import Analysis Log</span>
              </h3>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {data.bulkImportJobs.map((job) => (
                  <div key={job.jobId} className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-white block">{job.jobName}</span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {job.jobId} • {job.startedAt}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                        {job.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="p-1.5 rounded bg-slate-800 border border-slate-700">
                        <div className="text-xs font-bold text-white">{job.totalFilesDetected}</div>
                        <div className="text-[10px] text-slate-400">Files</div>
                      </div>
                      <div className="p-1.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                        <div className="text-xs font-bold text-emerald-300">{job.summaryCounts.judgments}</div>
                        <div className="text-[10px] text-emerald-400">Judgments</div>
                      </div>
                      <div className="p-1.5 rounded bg-red-950/40 border border-red-500/30">
                        <div className="text-xs font-bold text-red-300">{job.summaryCounts.confidentialVaultRoutedCount}</div>
                        <div className="text-[10px] text-red-400">Vaulted</div>
                      </div>
                      <div className="p-1.5 rounded bg-amber-950/40 border border-amber-500/30">
                        <div className="text-xs font-bold text-amber-300">{job.summaryCounts.ocrRequiredCount}</div>
                        <div className="text-[10px] text-amber-400">OCR</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 space-y-1 max-h-24 overflow-y-auto bg-slate-950 p-2 rounded border border-slate-800 font-mono">
                      {job.processingLogs.slice(0, 4).map((logLine, i) => (
                        <div key={i} className="truncate">
                          {logLine}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EXPLAINABLE AI DECISION & 9-SCORE CONFIDENCE MATRIX INSPECTOR */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-amber-400" />
                  <span>Ingested Document Pipeline & Explainable AI Confidence Matrix (9 Independent Scores)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Click any ingested record below to inspect its 9 independent confidence scores, court hierarchy differentiation, and statutory mappings.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-[11px] uppercase text-slate-400">
                    <th className="py-2.5 px-3">File & Archive Path</th>
                    <th className="py-2.5 px-3">Content-Detected Type</th>
                    <th className="py-2.5 px-3">Issuing Court / Authority</th>
                    <th className="py-2.5 px-3">Primary Practice Area</th>
                    <th className="py-2.5 px-3">9-Score Avg / OCR</th>
                    <th className="py-2.5 px-3">Target Domain & Status</th>
                    <th className="py-2.5 px-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-xs">
                  {data.ingestedDocuments.slice(0, 15).map((doc) => {
                    const scores = Object.values(doc.confidenceMatrix);
                    const avgConfidence = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
                    const isVault = doc.targetDomain === 'Confidential Client Matter Vault';
                    return (
                      <tr
                        key={doc.id}
                        onClick={() => setInspectedDoc(doc)}
                        className={`hover:bg-slate-700/40 transition cursor-pointer ${
                          inspectedDoc?.id === doc.id ? 'bg-amber-500/10' : ''
                        }`}
                      >
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{doc.sourceFileName}</div>
                          <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs">{doc.fileHierarchyPath}</div>
                          {doc.sensitivityFlags.some((f) => f.includes('Filename')) && (
                            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                              ⚠️ Filename Overridden by Content
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 font-semibold">
                            {doc.documentType}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-200">{doc.jurisdiction.officialCourtName}</div>
                          <div className="text-[11px] text-slate-400">
                            {doc.jurisdiction.courtLevel} {doc.jurisdiction.district ? `• ${doc.jurisdiction.district}` : ''}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-white">{doc.classification.primaryPracticeArea}</div>
                          {doc.classification.secondaryPracticeAreas.length > 0 && (
                            <div className="text-[11px] text-slate-400">
                              +{doc.classification.secondaryPracticeAreas.join(', ')}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-mono font-bold text-emerald-300">{avgConfidence}% Confidence</div>
                          <div className="text-[11px] text-slate-400">{doc.ocrStatus}</div>
                        </td>
                        <td className="py-3 px-3">
                          {isVault ? (
                            <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold flex items-center gap-1 w-fit">
                              <Lock className="w-3 h-3" /> {doc.targetDomain}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold w-fit block">
                              {doc.targetDomain}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400 block mt-0.5">{doc.reviewStatus}</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInspectedDoc(doc);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Deep Explainable AI Inspector Panel */}
            {inspectedDoc && (
              <div className="mt-4 bg-slate-950/90 border-2 border-amber-500/40 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold uppercase">
                        Explainable AI Audit Record • {inspectedDoc.id}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">SHA-256: {inspectedDoc.checksumSha256.slice(0, 24)}...</span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white mt-1">{inspectedDoc.extractedTitle}</h4>
                    <p className="text-xs text-slate-400">
                      Original Filename: <strong className="text-slate-200">{inspectedDoc.sourceFileName}</strong> • Path:{' '}
                      <code className="text-amber-300">{inspectedDoc.fileHierarchyPath}</code>
                    </p>
                  </div>
                  <button
                    onClick={() => setInspectedDoc(null)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                  >
                    Close Inspector
                  </button>
                </div>

                {/* 9 Independent Confidence Scores Grid (Part 14 Section 67) */}
                <div>
                  <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                    9 Independent AI Confidence Dimensions (Part 14, Section 67)
                  </h5>
                  <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
                    {[
                      { label: 'Doc Type', val: inspectedDoc.confidenceMatrix.documentTypeDetection },
                      { label: 'OCR / Text', val: inspectedDoc.confidenceMatrix.textExtractionQuality },
                      { label: 'Court ID', val: inspectedDoc.confidenceMatrix.courtIdentification },
                      { label: 'Citations', val: inspectedDoc.confidenceMatrix.citationExtraction },
                      { label: 'Statutes', val: inspectedDoc.confidenceMatrix.statuteRecognition },
                      { label: 'Primary Cat', val: inspectedDoc.confidenceMatrix.primaryCategory },
                      { label: 'Second Cat', val: inspectedDoc.confidenceMatrix.secondaryCategory },
                      { label: 'Source Auth', val: inspectedDoc.confidenceMatrix.sourceAuthenticity },
                      { label: 'Privacy Gate', val: inspectedDoc.confidenceMatrix.privacyClassification }
                    ].map((score) => (
                      <div key={score.label} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <div
                          className={`text-sm font-bold font-mono ${
                            score.val >= 85 ? 'text-emerald-400' : score.val >= 70 ? 'text-amber-400' : 'text-red-400'
                          }`}
                        >
                          {score.val}%
                        </div>
                        <div className="text-[10px] text-slate-400">{score.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explainable AI Signals & Jurisdiction Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300">Why AI Classified This Document (Explainable Signals):</div>
                    <p className="text-slate-300">
                      <strong className="text-white">Reasoning Summary:</strong> {inspectedDoc.classification.reasoningSummary}
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-white">Procedural Posture:</strong> {inspectedDoc.classification.proceduralPosture}
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-white">Privacy & Confidentiality Gate:</strong>{' '}
                      {inspectedDoc.classification.confidentialityReason}
                    </p>
                    <div className="pt-1">
                      <span className="text-[11px] text-slate-400 block mb-1">Detected Structural Phrases:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {inspectedDoc.classification.keyIndicatorsFound.map((sig) => (
                          <span
                            key={sig}
                            className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-amber-200 font-mono"
                          >
                            "{sig}"
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-emerald-300">Jurisdiction & Case Law Extraction:</div>
                    <p className="text-slate-300">
                      <strong className="text-white">Issuing Court / Authority:</strong> {inspectedDoc.jurisdiction.officialCourtName} (
                      {inspectedDoc.jurisdiction.courtLevel})
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-white">Coram / Bench:</strong>{' '}
                      {inspectedDoc.jurisdiction.coramJudges.join(', ') || 'Not specified'}
                    </p>
                    <p className="text-slate-300">
                      <strong className="text-white">Precedential Note:</strong> {inspectedDoc.jurisdiction.precedentialStatusNote}
                    </p>
                    {inspectedDoc.judgmentAnalysis && (
                      <div className="pt-1 border-t border-slate-800 space-y-1">
                        <p className="text-slate-200">
                          <strong className="text-amber-300">Ratio Decidendi:</strong>{' '}
                          {inspectedDoc.judgmentAnalysis.probableRatioDecidendi}
                        </p>
                        <p className="text-slate-300">
                          <strong className="text-white">Operative Order:</strong>{' '}
                          {inspectedDoc.judgmentAnalysis.finalOperativeOrder}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 2: 27-PRACTICE-AREA CATEGORY REVIEW & RECLASSIFICATION (PART 5 & 13)
      ====================================================================== */}
      {subTab === 'category-review-27' && (
        <div className="space-y-6">
          {/* 27 Practice Areas Master Taxonomy Overview Grid */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  27-Practice-Area Legal Classification Framework (Part 5, Sections 9–35)
                </h3>
                <p className="text-xs text-slate-400">
                  Click any practice area pill to filter ingested legal documents by primary or secondary legal subject.
                </p>
              </div>
              {filterPracticeArea !== 'ALL' && (
                <button
                  onClick={() => setFilterPracticeArea('ALL')}
                  className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Clear Filter ({filterPracticeArea})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {ALL_27_PRACTICE_AREAS.map((item) => {
                const count = data.ingestedDocuments.filter(
                  (d) =>
                    d.classification.primaryPracticeArea === item.area ||
                    d.classification.secondaryPracticeAreas.includes(item.area)
                ).length;
                const selected = filterPracticeArea === item.area;
                return (
                  <button
                    key={item.id}
                    onClick={() => setFilterPracticeArea(selected ? 'ALL' : item.area)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-start justify-between gap-2 ${
                      selected
                        ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                        : 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-amber-500/40'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">
                        §{item.partNumber}. {item.area}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${selected ? 'text-slate-900' : 'text-slate-400'}`}>
                        {item.keyStatutes.slice(0, 2).join(' • ')}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                        selected ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-amber-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter & Bulk Reclassification Toolbar */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Search Title, Citation or Statute</label>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="e.g., 482 BNSS, Rohtak, 2023:PHHC..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Filter by Document Type (26 Types)</label>
                <select
                  value={filterDocType}
                  onChange={(e) => setFilterDocType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="ALL">All 26 Legal Document Types</option>
                  {ALL_26_DOCUMENT_TYPES.map((t: LegalDocumentType) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Filter by Court Hierarchy</label>
                <select
                  value={filterCourtLevel}
                  onChange={(e) => setFilterCourtLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="ALL">All Court Levels</option>
                  <option value="Supreme Court of India">Supreme Court of India</option>
                  <option value="High Court">High Courts</option>
                  <option value="District and Sessions Court">District and Sessions Courts</option>
                  <option value="Family Court">Family Courts</option>
                  <option value="Commercial Court">Commercial Courts</option>
                  <option value="Tribunal / Regulatory Commission">Tribunals (NCLT / NGT / RERA / MACT)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Filter by Review Status</label>
                <select
                  value={filterReviewStatus}
                  onChange={(e) => setFilterReviewStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="ALL">All Review States</option>
                  <option value="Awaiting Lawyer Verification">Awaiting Lawyer Verification</option>
                  <option value="Auto-Segregated Confidential">Auto-Segregated Confidential</option>
                  <option value="Verified & Committed">Verified & Committed</option>
                </select>
              </div>
            </div>

            {/* Reclassification Action Bar */}
            {selectedDocIds.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-amber-200 font-semibold">
                  Selected <strong className="text-white">{selectedDocIds.length}</strong> record(s) for verification / reclassification:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={targetDocType}
                    onChange={(e) => setTargetDocType(e.target.value as LegalDocumentType)}
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    {ALL_26_DOCUMENT_TYPES.map((t: LegalDocumentType) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <select
                    value={targetPracticeArea}
                    onChange={(e) => setTargetPracticeArea(e.target.value as LegalPracticeArea)}
                    className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    {ALL_27_PRACTICE_AREAS.map((a) => (
                      <option key={a.id} value={a.area}>
                        {a.area}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedDocIds.length > 1) {
                        setBulkConfirmModalOpen(true);
                      } else {
                        executeReclassification(selectedDocIds, false);
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Verify & Commit ({selectedDocIds.length})
                  </button>
                </div>
              </div>
            )}

            {/* Bulk Operation Safeguard Modal (Part 13 Section 62 & Part 17 Section 78) */}
            {bulkConfirmModalOpen && (
              <div className="p-4 rounded-xl bg-red-950/80 border-2 border-red-500/60 space-y-3">
                <div className="flex items-center gap-2 text-red-200 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Mandatory Bulk Reclassification Safeguard Confirmation (Part 13, Section 62)</span>
                </div>
                <p className="text-xs text-slate-200">
                  You are about to reclassify and commit <strong>{selectedDocIds.length} legal documents</strong> simultaneously to{' '}
                  <strong className="text-amber-300">{targetDocType}</strong> under{' '}
                  <strong className="text-amber-300">{targetPracticeArea}</strong>. Please confirm this bulk action.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => executeReclassification(selectedDocIds, true)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Confirm Bulk Reclassification ({selectedDocIds.length} Records)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBulkConfirmModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Filtered Documents Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-[11px] uppercase text-slate-400">
                    <th className="py-2 px-2">
                      <input
                        type="checkbox"
                        checked={filteredDocs.length > 0 && selectedDocIds.length === filteredDocs.length}
                        onChange={(e) => setSelectedDocIds(e.target.checked ? filteredDocs.map((d) => d.id) : [])}
                      />
                    </th>
                    <th className="py-2 px-3">Document Title & File</th>
                    <th className="py-2 px-3">Detected Type</th>
                    <th className="py-2 px-3">Primary & Secondary Practice Areas</th>
                    <th className="py-2 px-3">Statutes Linked</th>
                    <th className="py-2 px-3">Review Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-700/30">
                      <td className="py-2.5 px-2">
                        <input
                          type="checkbox"
                          checked={selectedDocIds.includes(doc.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDocIds((prev) => [...prev, doc.id]);
                            } else {
                              setSelectedDocIds((prev) => prev.filter((id) => id !== doc.id));
                            }
                          }}
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{doc.extractedTitle}</div>
                        <div className="text-[11px] text-slate-400">{doc.sourceFileName}</div>
                      </td>
                      <td className="py-2.5 px-3 text-amber-300 font-semibold">{doc.documentType}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-white">{doc.classification.primaryPracticeArea}</div>
                        <div className="text-[11px] text-slate-400">{doc.classification.secondaryPracticeAreas.join(' • ')}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex flex-wrap gap-1">
                          {doc.statutesExtracted.map((s, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-200"
                            >
                              {s.statuteTitle} ({s.section})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            doc.reviewStatus === 'Verified & Committed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : doc.reviewStatus === 'Auto-Segregated Confidential'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {doc.reviewStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 3: LEGISLATION AMENDMENTS & CRIMINAL LAW MAPPING (PART 6)
      ====================================================================== */}
      {subTab === 'criminal-law-mapping' && (
        <div className="space-y-6">
          {/* Old vs New Criminal Law Mapping Matrix (IPC/CrPC/IEA <-> BNS/BNSS/BSA) */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="border-b border-slate-700 pb-3">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                Part 6, Section 39 • Non-Destructive Historical Statutory Mapping
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">
                IPC 1860 / CrPC 1973 / IEA 1872 ↔ BNS 2023 / BNSS 2023 / BSA 2023 Cross-Reference Engine
              </h3>
              <p className="text-xs text-slate-400">
                Historical judgments citing IPC, CrPC, or IEA retain their original statutory references intact while surfacing verified comparative equivalents for modern research.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.statutoryMappings.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-bold text-slate-200">
                      {item.historicalAct} • {item.historicalSection}
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-xs font-bold text-amber-300">
                      {item.newAct} • {item.newSection}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white">{item.topic}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.keyLegislativeChanges.join(' ')}</p>
                  <div className="text-[11px] text-amber-200/90 bg-slate-950 p-2 rounded border border-slate-800">
                    <strong>Transitional Rule:</strong> {item.transitionalRuleNote}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    Effective Transition Date: {item.commencementDate} (Historical citations preserved)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legislation & Amendment Version History (Part 6 Sections 37-38) */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="border-b border-slate-700 pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                Statutory Amendment Version History & Gazette Commencement Tracker (Sections 37–38)
              </h3>
              <p className="text-xs text-slate-400">
                Explicitly distinguishes Parliamentary Enactment Date from Gazette Commencement Notification Date and flags unnotified provisions.
              </p>
            </div>

            <div className="space-y-3">
              {data.legislationAmendments.map((amd) => (
                <div key={amd.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-serif font-bold text-sm text-white">
                      {amd.principalActTitle} — <span className="text-amber-300">{amd.title}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        amd.commencementStatus.includes('Partially')
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {amd.commencementStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Enactment / Assent Date:</span>
                      <strong className="text-white font-mono">{amd.enactmentDate}</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Gazette Commencement Notification:</span>
                      <strong className="text-emerald-300 font-mono">{amd.commencementDate}</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Gazette / Act Reference:</span>
                      <strong className="text-amber-300 font-mono">{amd.actOrNotificationNumber}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">{amd.transitionalProvisionsNote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 4: RETRIEVAL-GROUNDED RESEARCH & MULTI-JUDGMENT COMPARISON
      ====================================================================== */}
      {subTab === 'retrieval-research' && (
        <div className="space-y-6">
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="border-b border-slate-700 pb-3">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                Part 8, Sections 44–47 • Retrieval-Grounded Research (Zero Fabricated Citations)
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">
                Natural-Language Legal Research & Multi-Judgment Side-by-Side Comparison
              </h3>
              <p className="text-xs text-slate-400">
                Strictly grounded in verified public repository records (Confidential Client Vault records are automatically excluded). Visually separates Official Statutory Text, Summarised Judgments, and AI-Assisted Legal Analysis.
              </p>
            </div>

            <form onSubmit={handleRunRetrievalQuery} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Enter Natural-Language Legal Proposition or Statutory Query:
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={researchQuery}
                    onChange={(e) => setResearchQuery(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    disabled={runningResearch}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-2 shrink-0"
                  >
                    {runningResearch ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    <span>Run Grounded Research</span>
                  </button>
                </div>
              </div>

              {/* Quick Sample Legal Queries */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Anticipatory bail under Section 482 BNSS and Section 438 CrPC',
                  'Haryana agricultural land partition Sanad Takseem and Punjab Land Revenue Act',
                  'Electronic evidence admissibility certificate under Section 63 BSA 2023 vs Section 65B Evidence Act'
                ].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setResearchQuery(sample)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </form>

            {researchResult && (
              <div className="space-y-4 pt-3 border-t border-slate-700">
                {/* Mandatory Verification Banner */}
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center justify-between">
                  <span>⚖️ AI-Assisted Legal Analysis — Verification Required (Confidential Client Vault Excluded)</span>
                  <span className="font-mono text-[11px]">
                    Grounded Judgments: {researchResult.matchedJudgments.length} • Statutes: {researchResult.matchedBareActs.length}
                  </span>
                </div>

                {/* 3 Distinct Layers per Part 8 Section 47 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Layer 1: Official Statutory Text Referenced */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/40 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase">
                      1. Official Statutory Provisions & Mappings
                    </span>
                    <div className="space-y-2 text-xs text-slate-200 pt-1">
                      {researchResult.matchedBareActs.map((act) => (
                        <div key={act.id} className="p-2 rounded bg-slate-950 border border-slate-800">
                          <div className="font-bold text-white">{act.title}</div>
                          <div className="text-[11px] text-blue-300 font-mono">Act No. {act.actNumber} ({act.year})</div>
                        </div>
                      ))}
                      {researchResult.matchedMappings.map((m) => (
                        <div key={m.id} className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px]">
                          {m.historicalSection} ({m.historicalAct}) ↔ {m.newSection} ({m.newAct})
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layer 2: Verified Summarised Judgments */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                      2. Verified Precedents & Ratio Decidendi
                    </span>
                    <div className="space-y-2 pt-1">
                      {researchResult.matchedJudgments.map((j) => (
                        <div key={j.id} className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1 text-xs">
                          <div className="font-bold text-white">{j.caseTitle}</div>
                          <div className="text-[11px] text-amber-300 font-mono">
                            {j.neutralCitation || j.caseNumber} • {j.court}
                          </div>
                          <p className="text-slate-300 text-[11px]">{j.ratioDecidendi}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layer 3: AI-Assisted Grounded Synthesis */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                      3. AI-Assisted Legal Synthesis — Verification Required
                    </span>
                    <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed pt-1">
                      {researchResult.groundedSynthesis}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 5: LEGAL DRAFTING ASSISTANT & LAWYER PROFILE VERIFICATION
      ====================================================================== */}
      {subTab === 'drafting-profiles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: Legal Drafting & Template Assistant (Part 12) */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="border-b border-slate-700 pb-3">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                Part 12, Sections 58–59 • Guardrailed Legal Drafting Assistant
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">
                Verified Legal Notice, Bail Application & Petition Drafting
              </h3>
              <p className="text-xs text-slate-400">
                Flags missing factual placeholders rather than inventing dates, amounts, or citations.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Select Verified Legal Template:</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => {
                    setSelectedTemplateId(e.target.value);
                    setGeneratedDraftOutput(null);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  {data.legalTemplates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.title} ({tpl.primaryPracticeArea})
                    </option>
                  ))}
                </select>
              </div>

              {(() => {
                const activeTpl = data.legalTemplates.find((t) => t.id === selectedTemplateId);
                if (!activeTpl) return null;
                return (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeTpl.requiredFactPlaceholders.map((field) => (
                        <div key={field}>
                          <label className="block text-[11px] text-slate-400 mb-0.5 font-mono">{`{{${field}}}`}</label>
                          <input
                            type="text"
                            value={draftFacts[field] || ''}
                            onChange={(e) => setDraftFacts((prev) => ({ ...prev, [field]: e.target.value }))}
                            placeholder={`Enter ${field} (leave blank to test missing-fact flag)`}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleGenerateDraft}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Generate Verified Legal Draft & Check Placeholders
                    </button>
                  </div>
                );
              })()}

              {generatedDraftOutput && (
                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-300">{generatedDraftOutput.mandatoryReviewNotice}</span>
                    {generatedDraftOutput.missingPlaceholders.length > 0 && (
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold">
                        Missing Placeholders Flagged: {generatedDraftOutput.missingPlaceholders.join(', ')}
                      </span>
                    )}
                  </div>
                  <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {generatedDraftOutput.populatedDraft}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Cols: Lawyer Profile & Credentials Verification Queue (Part 11) */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="border-b border-slate-700 pb-3">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase">
                Part 11, Sections 56–57 • Lawyer Profile Approval Queue
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">
                Advocate Bio & Bar Council Credential Verification
              </h3>
              <p className="text-xs text-slate-400">
                Separates academic degrees from Bar Council enrolment and requires human approval before public profile publication.
              </p>
            </div>

            <div className="space-y-3">
              {data.lawyerProfilesQueue.map((prof) => (
                <div key={prof.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{prof.proposedName}</div>
                      <div className="text-[11px] text-amber-300">{prof.proposedDesignation}</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prof.publicationApprovalStatus.includes('Approved')
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {prof.publicationApprovalStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-300">
                    <div>
                      <strong className="text-white">Bar Council Enrolment:</strong> {prof.barEnrolmentDetails} ({prof.enrolmentVerificationStatus})
                    </div>
                    <div>
                      <strong className="text-white">Academic Qualifications:</strong> {prof.academicQualifications.join(', ')}
                    </div>
                    <div>
                      <strong className="text-white">Courts Practised In:</strong> {prof.proposedPrimaryCourts.join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleLawyerVerification(prof.id, 'Approve')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Verify Enrolment & Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLawyerVerification(prof.id, 'Hold')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                    >
                      Hold for Bar Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE 6: CONFIDENTIAL CLIENT MATTER VAULT (PART 10 & PART 13 SEC 65)
      ====================================================================== */}
      {subTab === 'confidential-vault' && (
        <div className="space-y-6">
          <div className="bg-red-950/40 border-2 border-red-500/50 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-500/30 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold uppercase">
                    STRICT CONFIDENTIALITY BOUNDARY • PART 10, SECTIONS 53–55
                  </span>
                  <span className="text-xs text-red-200 font-mono">
                    publicIndexingBlocked: TRUE • externalAiTransmissionBlocked: TRUE
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-400" />
                  <span>Confidential Client Matter Vault (Role-Restricted Private Workspace)</span>
                </h3>
                <p className="text-xs text-red-200/90">
                  Private client pleadings, settlement MOUs, vakalatnamas, Aadhaar/PAN, and bank details are strictly isolated here and can NEVER be indexed into public search or public articles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 Cols: Vaulted Client Matters List */}
              <div className="lg:col-span-7 space-y-3">
                {data.confidentialMatters.map((matter) => (
                  <div key={matter.id} className="p-4 rounded-xl bg-slate-950/90 border border-red-500/40 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-amber-300">{matter.matterReferenceCode}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold">
                          Public Search Blocked
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {matter.authorizedTeamRoles.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="font-bold text-white text-sm">
                      {matter.clientName} — <span className="text-amber-200">{matter.matterTitle}</span>
                    </div>
                    <div className="text-slate-300">
                      <strong>Practice Area:</strong> {matter.primaryPracticeArea} • <strong>Status:</strong> {matter.matterStatus}
                    </div>
                    <div className="text-slate-300">
                      <strong>Forum:</strong> {matter.courtOrForum} • <strong>Assigned Lead:</strong> {matter.AssignedLeadAdvocate}
                    </div>

                    {matter.suggestedLimitationNote && (
                      <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-200 text-[11px]">
                        <strong>Procedural & Limitation Advisory (Unverified until Lawyer Confirmation):</strong>
                        <div className="mt-0.5">{matter.suggestedLimitationNote}</div>
                      </div>
                    )}

                    <div className="text-[10px] text-slate-400 font-mono">
                      Audit Trail: {matter.auditTrail.map((a) => `${a.timestamp} (${a.actor}): ${a.action}`).join(' | ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right 5 Cols: Register New Confidential Client Matter */}
              <div className="lg:col-span-5 bg-slate-900/95 border border-slate-700 rounded-xl p-4 space-y-3">
                <h4 className="font-serif text-base font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Log Private Client Matter in Vault</span>
                </h4>
                <form onSubmit={handleCreateConfidentialMatter} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">Client Name / Redacted Alias</label>
                    <input
                      type="text"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">Confidential Matter Title</label>
                    <input
                      type="text"
                      value={newMatterTitle}
                      onChange={(e) => setNewMatterTitle(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">Court / Forum</label>
                    <input
                      type="text"
                      value={newCourtForum}
                      onChange={(e) => setNewCourtForum(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-0.5">Private Chamber Notes</label>
                    <textarea
                      rows={3}
                      value={newPrivateNotes}
                      onChange={(e) => setNewPrivateNotes(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Isolate in Confidential Client Vault</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
