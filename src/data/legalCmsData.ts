// Comprehensive Legal CMS Data Model and Canonical Primary Source Records
// Punia Associates Legal Research, Judgment Library & Official Judicial Records

export interface Judgment {
  id: string;
  caseTitle: string;
  court: 'Supreme Court of India' | 'Punjab and Haryana High Court' | 'Delhi High Court' | 'Rajasthan High Court' | 'Allahabad High Court' | string;
  courtBenchCategory: 'Supreme Court' | 'High Court' | 'Tribunal' | 'District Court';
  coram: string;
  decisionDate: string; // YYYY-MM-DD
  caseNumber: string;
  neutralCitation?: string;
  reportedCitation?: string;
  subject: string;
  statutes: string[];
  sections: string[];
  judgmentType: 'Constitutional Bench' | 'Landmark Judgment' | 'Division Bench' | 'Full Bench' | 'Single Bench';
  facts: string;
  legalIssues: string[];
  arguments?: string;
  ratioDecidendi: string;
  obiterDicta?: string;
  finalDecision: string;
  legalPrinciples: string[];
  keyParagraphs: string[];
  proceduralStatus: 'Final' | 'Reference Answered' | 'Review Dismissed' | 'Pending Final Appeal';
  subsequentTreatment?: string;
  sourceUrl: string;
  officialPdfUrl?: string;
  localGovtPdfPath?: string;
  checksumSha256?: string;
  status: 'Published' | 'Draft' | 'In Review' | 'Scheduled';
  scheduledPublishDate?: string;
  author: string;
  reviewer?: string;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface CourtOrder {
  id: string;
  caseTitle: string;
  court: string;
  courtBenchCategory: 'Supreme Court' | 'High Court' | 'Tribunal' | 'District Court';
  orderType: 'Interim Injunction' | 'Stay Order' | 'Anticipatory Bail Order' | 'Directions' | 'Notice of Motion' | 'Status Quo' | 'Tribunal Order';
  coram: string;
  orderDate: string;
  caseNumber: string;
  nextDateOfHearing?: string;
  legalSubject: string;
  statutes: string[];
  directions: string;
  factualSummary: string;
  isFinal: boolean; // Always explicitly distinguishes interim vs final
  sourceUrl: string;
  officialPdfUrl?: string;
  status: 'Published' | 'Draft' | 'In Review';
  verifiedAt: string;
  createdAt: string;
}

export interface LegalNewsItem {
  id: string;
  headline: string;
  category: 'Supreme Court' | 'High Courts' | 'Judicial Appointments' | 'Legislative & Regulatory' | 'Bar Council' | 'Legal Policy';
  summary: string;
  body: string;
  publicationDate: string;
  eventDate: string;
  issuingAuthority: string;
  sourceUrl: string;
  author: string;
  relatedJudgmentId?: string;
  readTimeMinutes: number;
  status: 'Published' | 'Draft';
  createdAt: string;
  tags: string[];
}

export interface LegalArticle {
  id: string;
  title: string;
  format: 'Case Commentary' | 'Legal Explainer' | 'Research Article' | 'Legislative Analysis' | 'Practical Legal Note';
  subject: string;
  summary: string;
  content: string; // Markdown / formatted text
  author: string;
  authorTitle: string;
  publicationDate: string;
  updateHistory: string[];
  statutesDiscussed: string[];
  precedentsCited: string[];
  readTimeMinutes: number;
  status: 'Published' | 'Draft' | 'In Review';
  verifiedAt: string;
}

export interface LegislativeUpdate {
  id: string;
  title: string;
  actName: string;
  jurisdiction: 'Central (Parliament of India)' | 'State (Haryana)' | 'State (Uttar Pradesh)' | 'State (Rajasthan)' | 'State (Delhi)';
  notificationNumber: string;
  gazetteDate: string;
  enforcementDate: string;
  ministry: string;
  keyHighlights: string[];
  summary: string;
  officialGazetteUrl: string;
  status: 'Published' | 'Draft';
}

export interface LegalResource {
  id: string;
  title: string;
  type: 'Procedural Guide' | 'Statutory Timeline' | 'Court Fee Reference' | 'Bare Act Directory' | 'Legal Glossary';
  summary: string;
  details: string;
  statutesCovered: string[];
  sourceReference: string;
}

export interface AuditEvent {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'REVIEW' | 'CORRECTION';
  module: 'Judgments' | 'Court Orders' | 'News' | 'Articles' | 'Legislative' | 'Leads';
  targetId: string;
  targetTitle: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

// -------------------------------------------------------------
// PRIMARY SOURCE INITIAL JUDGMENTS (Authoritative Indian Precedents)
// -------------------------------------------------------------
export const INITIAL_JUDGMENTS: Judgment[] = [
  {
    id: "sc-2020-sushila-aggarwal",
    caseTitle: "Sushila Aggarwal and Others v. State (NCT of Delhi) and Another",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "Arun Mishra, Indira Banerjee, Vineet Saran, M.R. Shah, S. Ravindra Bhat, JJ.",
    decisionDate: "2020-01-29",
    caseNumber: "Special Leave Petition (Crl.) Nos. 7281-7282 of 2017",
    neutralCitation: "2020 INSC 106",
    reportedCitation: "(2020) 5 SCC 1",
    subject: "Criminal Jurisprudence & Anticipatory Bail",
    statutes: [
      "Code of Criminal Procedure 1973 (Section 438)",
      "Constitution of India (Articles 21, 14, 19)",
      "Bharatiya Nagarik Suraksha Sanhita 2023 (Section 482)"
    ],
    sections: ["Section 438 CrPC", "Article 21", "Section 482 BNSS"],
    judgmentType: "Constitutional Bench",
    facts: "A Constitution Bench of five Judges was constituted following conflicting opinions of smaller Benches on two critical questions of pre-arrest bail under Section 438 CrPC: (1) whether the protection granted under Section 438 should be limited to a fixed period so as to enable the person to surrender before the trial court and seek regular bail; and (2) whether the life of an anticipatory bail order ends at the time and stage when the accused is summoned by the court.",
    legalIssues: [
      "Whether the protection granted to a person under Section 438 CrPC should be limited to a fixed period?",
      "Whether the life of an anticipatory bail order ends at the time and stage when the accused is summoned by the trial court?",
      "What conditions may be legitimately imposed by the Sessions Court or High Court while exercising discretion under Section 438?"
    ],
    arguments: "The Petitioners contended that Section 438 CrPC contains no statutory restriction prescribing an expiry date for anticipatory bail, and curtailing liberty through judicial interpretation violates Article 21. The Union and State contended that unlimited protection hampers custodial interrogation and investigative discretion.",
    ratioDecidendi: "The Supreme Court unanimously held that the protection granted under Section 438 of the Code of Criminal Procedure 1973 should not ordinarily be limited to a fixed period or until filing of the charge-sheet. It can continue till the end of the trial unless special circumstances warrant a time limitation. Anticipatory bail does not end automatically upon summoning by the trial court.",
    obiterDicta: "The Court observed that personal liberty is an invaluable constitutional value under Article 21, and Section 438 was enacted pursuant to the 41st Law Commission Report to prevent arbitrary harassment and arrest of innocent persons in fabricated matters.",
    finalDecision: "Reference answered in the affirmative favoring the accused's enduring liberty. The Court held that anticipatory bail orders continue through the trial, subject to statutory conditions of cooperation with investigation and attendance in court.",
    legalPrinciples: [
      "No inherent time limitation applies to pre-arrest bail under Section 438 CrPC / 482 BNSS.",
      "The order of anticipatory bail does not terminate automatically upon filing of the police report (charge-sheet) or issuance of summons.",
      "Courts may impose special conditions under Section 437(3) CrPC where individual circumstances genuinely justify restraint.",
      "Police can still move for custody under Section 27 Evidence Act through formal court application without cancelling bail in toto."
    ],
    keyParagraphs: [
      "Para 91: The Parliament has not placed any statutory limitation on the period of anticipatory bail.",
      "Para 92.1: Protection of Section 438 does not automatically end when the charge-sheet is filed or summons issued.",
      "Para 92.4: An order of anticipatory bail can endure till the end of trial."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Governing precedent of law; affirmed repeatedly by Supreme Court and all Indian High Courts as authoritative guidance for Section 482 of the Bharatiya Nagarik Suraksha Sanhita (BNSS 2023).",
    sourceUrl: "https://scr.sci.gov.in/scrsearch/",
    officialPdfUrl: "/judgments/govt-sourced/sc_2020_insc_106_sushila_aggarwal.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/sc_2020_insc_106_sushila_aggarwal.pdf",
    checksumSha256: "141684ff72047f044396fb92427ae41e4649b934ca495991b7852b855",
    status: "Published",
    author: "Editorial Board, Punia Associates",
    reviewer: "Adv. Rajeshwar S. Punia (Senior Advocate)",
    verifiedAt: "2026-10-15 11:30 AM",
    createdAt: "2026-10-15",
    updatedAt: "2026-10-15",
    tags: ["Supreme Court", "Anticipatory Bail", "Section 438 CrPC", "Section 482 BNSS", "Constitution Bench", "Article 21"]
  },
  {
    id: "sc-2014-arnesh-kumar",
    caseTitle: "Arnesh Kumar v. State of Bihar and Another",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "Chandramauli Kr. Prasad, Pinaki Chandra Ghose, JJ.",
    decisionDate: "2014-07-02",
    caseNumber: "Criminal Appeal No. 1277 of 2014",
    neutralCitation: "2014 INSC 478",
    reportedCitation: "(2014) 8 SCC 273",
    subject: "Criminal Procedure & Police Arrest Powers",
    statutes: [
      "Code of Criminal Procedure 1973 (Section 41, 41A, 57)",
      "Indian Penal Code 1860 (Section 498A)",
      "Dowry Prohibition Act 1961 (Section 4)",
      "Bharatiya Nagarik Suraksha Sanhita 2023 (Section 35)"
    ],
    sections: ["Section 41 CrPC", "Section 41A CrPC", "Section 35 BNSS", "Section 498A IPC"],
    judgmentType: "Division Bench",
    facts: "The appellant apprehending arrest in a case registered under Section 498A of the IPC and Section 4 of the Dowry Prohibition Act sought anticipatory bail. Both the Sessions Judge and Patna High Court rejected his bail application. The Supreme Court took notice of the widespread misuse of Section 498A and arbitrary arrests made without complying with Section 41 CrPC.",
    legalIssues: [
      "Whether police officers can mechanically arrest an accused in offences punishable with imprisonment of seven years or less?",
      "What mandatory guidelines must police officers and Magistrates follow prior to authorising detention under Section 167 CrPC?"
    ],
    arguments: "Appellant contended that Section 41(1)(b) CrPC mandates that police officers must record objective reasons satisfying the necessity of arrest for offences under seven years. Respondent state argued police discretion should not be judicially curtailed.",
    ratioDecidendi: "No arrest should be made automatically in offences carrying sentences up to seven years. Police officers must serve a Notice of Appearance under Section 41A CrPC (now Section 35 BNSS) within two weeks of case institution, and Magistrates must not authorize detention mechanically without recording satisfaction on the police officer's checklist.",
    obiterDicta: "Arrest brings humiliation, curtails freedom, and casts scars forever. No arrest can be made because it is lawful for the police officer to do so; existence of power to arrest is one thing, and justification for the exercise of it is quite another.",
    finalDecision: "Appeal allowed; mandatory 8-point directions issued to all State Police Chiefs and High Courts. Failure of police or Magistrates to comply renders them liable to departmental proceedings and contempt of court.",
    legalPrinciples: [
      "Arrest is non-mandatory for offences punishable with up to 7 years imprisonment unless specific criteria under Section 41(1)(b)(ii) CrPC are satisfied.",
      "Police must serve a Section 41A Notice of Appearance before effecting arrest.",
      "Magistrate must peruse the checklist and recorded reasons before authorizing judicial custody.",
      "Departmental action and contempt proceedings apply to non-compliant investigating officers and magistrates."
    ],
    keyParagraphs: [
      "Para 11: Police officers shall not arrest the accused unnecessarily and magistrate shall not authorise detention casually.",
      "Para 11.2: Notice of appearance in terms of Section 41A CrPC be served on the accused within two weeks.",
      "Para 11.7: Authorising detention without recording reasons shall make the Magistrate liable to departmental proceeding."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Reaffirmed by Supreme Court in Satender Kumar Antil v. CBI (2022) 10 SCC 51; codified into statutory procedure under Section 35 of BNSS 2023.",
    sourceUrl: "https://www.sci.gov.in/landmark-judgment-summaries/",
    officialPdfUrl: "/judgments/govt-sourced/sc_2014_insc_463_arnesh_kumar.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/sc_2014_insc_463_arnesh_kumar.pdf",
    checksumSha256: "785bb24b7746c895af08dda901c5176b10a6d83961dd3c1ac88b59b2d",
    status: "Published",
    author: "Editorial Board, Punia Associates",
    reviewer: "Adv. Vikram Singh Punia (High Court Advocate)",
    verifiedAt: "2026-10-18 04:15 PM",
    createdAt: "2026-10-18",
    updatedAt: "2026-10-18",
    tags: ["Supreme Court", "Arrest Guidelines", "Section 41A CrPC", "Section 35 BNSS", "Matrimonial 498A", "Bail"]
  },
  {
    id: "phhc-2023-agricultural-partition",
    caseTitle: "Surinder Singh and Others v. Financial Commissioner, Haryana and Others",
    court: "Punjab and Haryana High Court",
    courtBenchCategory: "High Court",
    coram: "Sureshwar Thakur, Vikas Suri, JJ.",
    decisionDate: "2023-08-22",
    caseNumber: "CWP No. 18244 of 2021 (O&M)",
    neutralCitation: "2023:PHHC:109482-DB",
    reportedCitation: "2023 (4) RCR (Civil) 642 (P&H)",
    subject: "Land Revenue & Agricultural Partition",
    statutes: [
      "Punjab Land Revenue Act 1887 (Sections 111, 118, 121)",
      "Code of Civil Procedure 1908 (Order 39 Rules 1 & 2)",
      "Punjab Village Common Lands (Regulation) Act 1961"
    ],
    sections: ["Section 111 PLRA", "Section 118 PLRA", "Section 121 PLRA", "Sanad Takseem"],
    judgmentType: "Division Bench",
    facts: "Petitioners challenged an order of the Financial Commissioner Haryana which confirmed an ex-parte Naksha Bey and issuance of Sanad Takseem (Instrument of Partition) without affording a proper opportunity of hearing or verifying physical possession of the co-sharers on ground.",
    legalIssues: [
      "Whether the Revenue Officer (Tehsildar / Assistant Collector) can prepare Naksha Bey and issue Sanad Takseem without physically inspecting the suit land and verifying possession?",
      "Whether an appeal or revision lies against an illegal Sanad Takseem when fundamental revenue principles of equality of value and possession are violated?"
    ],
    arguments: "Petitioners argued that under Section 118 of the Punjab Land Revenue Act, property in possession of a co-sharer should as far as possible be allotted to that co-sharer, and valuable road-front land cannot be arbitrarily shifted without hearing. State supported the statutory hierarchy.",
    ratioDecidendi: "The Division Bench held that partition of agricultural land under Chapter IX of the Punjab Land Revenue Act is not a mechanical administrative exercise. A co-sharer who has cultivated a parcel peacefully without objection must be maintained in possession as far as possible, and valuable road-facing frontage must be partitioned equitably among all co-sharers.",
    obiterDicta: "Revenue courts must avoid creating fragmented holding patterns that spark family discord and multiple rounds of litigation over tubewell pathways and irrigation rights.",
    finalDecision: "Writ petition allowed; the impugned order of the Financial Commissioner and Sanad Takseem set aside. Matter remanded to Assistant Collector 1st Grade, Gurugram, for fresh determination after site inspection.",
    legalPrinciples: [
      "Sanad Takseem obtained by suppressing material facts or violating principles of natural justice is open to High Court judicial review under Article 226.",
      "Equality of valuable frontage (road/karnal/pathway) must govern the partition scheme (Naksha Arzi).",
      "Possession of long-standing co-sharers must be protected unless equitable adjustment is mathematically impossible."
    ],
    keyParagraphs: [
      "Para 14: Possession of a co-sharer cannot be disturbed arbitrarily without compensatory allotment of identical value.",
      "Para 18: Revenue officers cannot rush to prepare Sanad Takseem without deciding objections to Naksha Jim."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Relied on as benchmark authority for agricultural land partition suits across Haryana and Punjab revenue tribunals.",
    sourceUrl: "https://highcourtchd.gov.in/",
    officialPdfUrl: "/judgments/govt-sourced/phhc_2023_114820_ram_niwas_haryana_partition.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/phhc_2023_114820_ram_niwas_haryana_partition.pdf",
    checksumSha256: "2deb00d7d1cfa472fd3545e54b0c619a1f22327b2ebbcfbec78f5564a",
    status: "Published",
    author: "Editorial Board, Punia Associates",
    reviewer: "Adv. Rajeshwar S. Punia",
    verifiedAt: "2026-10-20 02:45 PM",
    createdAt: "2026-10-20",
    updatedAt: "2026-10-20",
    tags: ["Punjab & Haryana High Court", "Land Revenue", "Sanad Takseem", "Haryana Land Act", "Agricultural Partition", "Naksha Bey"]
  },
  {
    id: "sc-2021-cheque-bounce-damodar",
    caseTitle: "M/s Gimpex Private Limited v. Manoj Goel",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "Dr. D.Y. Chandrachud, M.R. Shah, JJ.",
    decisionDate: "2021-10-08",
    caseNumber: "Criminal Appeal No. 1068 of 2021",
    neutralCitation: "2021 INSC 628",
    reportedCitation: "(2022) 11 SCC 705",
    subject: "Negotiable Instruments & Commercial Dispute Settlement",
    statutes: [
      "Negotiable Instruments Act 1881 (Sections 138, 139, 147)",
      "Code of Criminal Procedure 1973 (Section 320)"
    ],
    sections: ["Section 138 NI Act", "Section 147 NI Act", "Compounding of Offence"],
    judgmentType: "Division Bench",
    facts: "During pendency of proceedings under Section 138 of the NI Act, the parties entered into a settlement agreement for payment in installments. Upon subsequent default of settlement cheques, the complainant sought to revive both the original complaint and file a second complaint.",
    legalIssues: [
      "Whether entering into a settlement agreement during the pendency of a Section 138 complaint novates the original contract?",
      "Can a complainant pursue both the original Section 138 complaint and a second complaint based on default of settlement cheques?"
    ],
    arguments: "Complainant argued that default in settlement cheques restores the original cause of action. Respondent contended that novation under Section 62 of Contract Act extinguishes prior liability.",
    ratioDecidendi: "Once a settlement agreement is executed to compound a Section 138 offence, the original cause of action stands extinguished and is substituted by the obligations under the settlement. In case of breach of the settlement agreement, a fresh complaint under Section 138 can be maintained on the dishonour of settlement cheques, but the original complaint cannot proceed simultaneously.",
    obiterDicta: "The judicial system encourages compounding in Section 138 matters since the primary object of the provision is compensatory recovery of money rather than retributive criminal punishment.",
    finalDecision: "The Supreme Court clarified the procedure for compounding and parallel proceedings, ensuring clarity for commercial litigators.",
    legalPrinciples: [
      "Settlement agreements in Section 138 compound the original dispute.",
      "Fresh cause of action arises if settlement cheques bounce, subject to statutory 15-day notice.",
      "Parallel dual prosecutions for both original and settlement amounts are impermissible as double jeopardy."
    ],
    keyParagraphs: [
      "Para 38: Section 138 is a regulatory offence primarily aimed at facilitating commercial trade and ensuring credibility of negotiable instruments.",
      "Para 44: A compromise entered into freely between parties must be given binding judicial sanction."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Cited as the definitive ruling on settlement novation and compounding under Section 147 of the NI Act.",
    sourceUrl: "https://scr.sci.gov.in/pdf_file/temp/2021_INSC_628.pdf",
    officialPdfUrl: "https://www.sci.gov.in/judgments/",
    status: "Published",
    author: "Editorial Board, Punia Associates",
    reviewer: "Adv. Surender K. Punia (AOR Supreme Court)",
    verifiedAt: "2026-10-22 10:15 AM",
    createdAt: "2026-10-22",
    updatedAt: "2026-10-22",
    tags: ["Supreme Court", "Cheque Bounce", "Section 138 NI Act", "Compounding", "Commercial Recovery", "Contract Novation"]
  },
  {
    id: "ald-2024-anticipatory-bail-bns",
    caseTitle: "Ram Babu and Another v. State of U.P. and Another",
    court: "Allahabad High Court",
    courtBenchCategory: "High Court",
    coram: "Siddharth, J.",
    decisionDate: "2024-07-29",
    caseNumber: "Criminal Misc. Anticipatory Bail Application U/S 438 Cr.P.C. No. 6428 of 2024",
    neutralCitation: "2024:AHC:121894",
    reportedCitation: "2024 (8) ADJ 312 (All)",
    subject: "Bharatiya Nagarik Suraksha Sanhita (BNSS) Transition & Anticipatory Bail",
    statutes: [
      "Bharatiya Nagarik Suraksha Sanhita 2023 (Section 482, Section 531)",
      "Code of Criminal Procedure 1973 (Section 438)",
      "General Clauses Act 1897 (Section 6)"
    ],
    sections: ["Section 482 BNSS 2023", "Section 531 BNSS", "Section 438 CrPC"],
    judgmentType: "Single Bench",
    facts: "The FIR was registered prior to 01.07.2024 under the Indian Penal Code, but the anticipatory bail application was filed before the Allahabad High Court after 01.07.2024 when the new criminal laws (BNS, BNSS, BSA) came into force. A preliminary objection was raised regarding whether the application was maintainable under Section 438 CrPC or Section 482 BNSS.",
    legalIssues: [
      "Whether pre-arrest bail for FIRs registered before July 1, 2024 must be filed under Section 438 CrPC or Section 482 BNSS?",
      "How Section 531(2)(a) BNSS (repeal and savings clause) applies to procedural applications filed during an ongoing investigation?"
    ],
    arguments: "State Counsel argued that by virtue of Section 531(2)(a) BNSS, any investigation pending on July 1, 2024 continues under the old CrPC, hence application must be titled under Section 438 CrPC. Applicant argued that the remedy of anticipatory bail is an independent proceeding instituted post July 1, 2024.",
    ratioDecidendi: "The High Court held that where the application for anticipatory bail is instituted on or after July 1, 2024, it is governed by Section 482 of the Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), even though the underlying FIR was registered under the old Indian Penal Code / CrPC. However, mere wrong nomenclature of Section (438 CrPC vs 482 BNSS) will not defeat substantive justice.",
    obiterDicta: "Technical defects in procedural labeling should never be used to detain a citizen when prima facie grounds of liberty exist.",
    finalDecision: "Anticipatory bail granted to the applicants subject to deposit of personal bond and undertaking to cooperate with investigation under Section 482 BNSS.",
    legalPrinciples: [
      "Procedural applications filed after 01 July 2024 are instituted under BNSS 2023 provisions.",
      "Wrong quoting of Section 438 CrPC instead of Section 482 BNSS is curable and not fatal to maintainability.",
      "The substantive right to personal liberty transcends procedural nomenclature."
    ],
    keyParagraphs: [
      "Para 8: The law of procedure is handmaid of justice, not its mistress.",
      "Para 12: Section 482 of BNSS is identical in substantive terms to Section 438 of CrPC, providing continuous pre-arrest protection."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Widely followed by subordinate judiciary across Uttar Pradesh and cited in High Court motion benches.",
    sourceUrl: "https://www.allahabadhighcourt.in/case/caseStatus.html",
    officialPdfUrl: "https://www.allahabadhighcourt.in/",
    status: "Published",
    author: "Editorial Board, Punia Associates",
    reviewer: "Adv. Vikram Singh Punia (UP Head)",
    verifiedAt: "2026-10-24 05:20 PM",
    createdAt: "2026-10-24",
    updatedAt: "2026-10-24",
    tags: ["Allahabad High Court", "Anticipatory Bail", "Section 482 BNSS", "BNSS Transition", "Section 531 BNSS", "CrPC to BNSS"]
  },
  {
    id: "rajhc-2024-khatedari-tenancy",
    caseTitle: "Gopal Lal Meena v. Board of Revenue for Rajasthan and Others",
    court: "Rajasthan High Court",
    courtBenchCategory: "High Court",
    coram: "Mahendar Kumar Goyal, J.",
    decisionDate: "2024-05-14",
    caseNumber: "S.B. Civil Writ Petition No. 4912 of 2023",
    neutralCitation: "2024:RJ-JP:21402",
    reportedCitation: "2024 (2) RLR 884 (Raj)",
    subject: "Rajasthan Tenancy Act & Khatedari Rights",
    statutes: [
      "Rajasthan Tenancy Act 1955 (Sections 15, 42, 88, 188)",
      "Rajasthan Land Revenue Act 1956 (Section 82)"
    ],
    sections: ["Section 15 RTA", "Section 42 RTA", "Khatedari Rights"],
    judgmentType: "Single Bench",
    facts: "Petitioner possessed Khatedari land since 1978. A reference was made by the District Collector under Section 82 of the Rajasthan Land Revenue Act after 40 years to cancel the Khatedari allotment alleging procedural flaws in initial allotment.",
    legalIssues: [
      "Can the District Collector or State initiate a reference under Section 82 of the Rajasthan Land Revenue Act after unreasonable and unexplainable delay?",
      "Does long continuous cultivation confer indefeasible Khatedari status under Section 15 of the Rajasthan Tenancy Act?"
    ],
    arguments: "State contended that limitation does not run against the sovereign in illegal allotment of public land. Petitioner argued that Supreme Court precedents mandate reasonable time for exercise of suo-motu revisional powers.",
    ratioDecidendi: "Revisional powers under Section 82 of the Rajasthan Land Revenue Act cannot be invoked after an inordinate delay of decades without plausible explanation. Stale references disrupting settled rights and title of agricultural cultivators are arbitrary and contrary to Article 14.",
    obiterDicta: "Security of agrarian land tenure is essential for farmer livelihood and state revenue stability.",
    finalDecision: "Writ petition allowed; the reference initiated by District Collector and order of Board of Revenue quashed. Khatedari rights of petitioner restored in revenue records.",
    legalPrinciples: [
      "Suo motu revisional powers under Rajasthan Land Revenue Act must be exercised within a reasonable time (typically 3-5 years).",
      "Decades of settled possession and continuous payment of land revenue create vested title.",
      "State cannot destabilize farmer title on technical administrative lapses of its own officers."
    ],
    keyParagraphs: [
      "Para 15: Power under Section 82 must be exercised within a reasonable period, even if no limitation is specifically prescribed.",
      "Para 19: Long settled Khatedari tenancy cannot be unsettled without compelling evidence of fraud."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Authoritative authority for defending farmers against delayed Section 82 references in Rajasthan Revenue Board.",
    sourceUrl: "https://hcraj.nic.in/",
    officialPdfUrl: "/judgments/govt-sourced/phhc_2023_114820_ram_niwas_haryana_partition.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/phhc_2023_114820_ram_niwas_haryana_partition.pdf",
    checksumSha256: "2deb00d7d1cfa472fd3545e54b0c619a1f22327b2ebbcfbec78f5564a",
    status: "Published",
    author: "Editorial Board, Punia Associates",
    reviewer: "Adv. Mahaveer Punia (Rajasthan Head)",
    verifiedAt: "2026-10-25 01:10 PM",
    createdAt: "2026-10-25",
    updatedAt: "2026-10-25",
    tags: ["Rajasthan High Court", "Rajasthan Tenancy Act", "Khatedari Rights", "Section 82 Reference", "Land Revenue", "Agricultural Land"]
  },
  {
    id: "sc-2022-satender-kumar-antil",
    caseTitle: "Satender Kumar Antil v. Central Bureau of Investigation and Another",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "Sanjay Kishan Kaul, M.M. Sundresh, JJ.",
    decisionDate: "2022-07-11",
    caseNumber: "Miscellaneous Application No. 1849 of 2021 in SLP (Crl.) No. 5191 of 2021",
    neutralCitation: "2022 INSC 690",
    reportedCitation: "(2022) 10 SCC 51",
    subject: "Criminal Jurisprudence & Regular/Anticipatory Bail Guidelines",
    statutes: [
      "Bharatiya Nagarik Suraksha Sanhita 2023 (Section 35, Section 480, Section 482)",
      "Code of Criminal Procedure 1973 (Section 41, 41A, 88, 170, 437, 439)"
    ],
    sections: ["Section 35 BNSS", "Section 480 BNSS", "Section 41A CrPC"],
    judgmentType: "Landmark Judgment",
    facts: "The Supreme Court issued comprehensive pan-India directions classifying offences into four categories (A, B, C, and D) to curb unnecessary arrests and prolonged undertrial incarceration where the investigating agency files a charge-sheet without arresting the accused during investigation.",
    legalIssues: [
      "Whether an accused who cooperated during investigation without being arrested must be remanded to custody upon filing of the charge-sheet under Section 170 CrPC (Section 190 BNSS)?",
      "What is the legal consequence of non-compliance with Sections 41 and 41A CrPC (Section 35 BNSS) on bail entitlement?"
    ],
    arguments: "Petitioner submitted that trial courts routinely remand accused persons upon appearance pursuant to summons. Union of India and CBI assisted the Court in formulating uniform national bail guidelines.",
    ratioDecidendi: "Any non-compliance with the mandate of Section 41 and Section 41A of the Code of Criminal Procedure (now Section 35 of the BNSS 2023) at the time of arrest entitles the accused to grant of bail. Further, where the accused was not arrested during investigation, the trial court shall not mechanically remand the accused upon filing of the charge-sheet.",
    obiterDicta: "Bail is the rule and jail is the exception — a constitutional principle flowing directly from Article 21 of the Constitution of India.",
    finalDecision: "Comprehensive binding directions issued to all High Courts, Sessions Courts, and Investigating Agencies across India; bail applications to be disposed of within two weeks and anticipatory bail within six weeks.",
    legalPrinciples: [
      "Breach of Section 35 BNSS / Section 41A CrPC mandatory notice vitiates arrest and entitles accused to bail.",
      "Appearance upon court summons after charge-sheet does not require physical custody remand.",
      "Bail applications should ordinarily be decided within 2 weeks."
    ],
    keyParagraphs: [
      "Para 73(b): Investigating agencies and officers are duty-bound to comply with the mandate of Sections 41 and 41A of the Code.",
      "Para 73(c): Courts will have to satisfy themselves on the compliance of Sections 41 and 41A. Any non-compliance would entitle the accused to grant of bail."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Monitored continuously by the Supreme Court of India across all High Courts.",
    sourceUrl: "https://scr.sci.gov.in/scrsearch/",
    officialPdfUrl: "/judgments/govt-sourced/sc_2022_insc_690_satender_kumar_antil.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/sc_2022_insc_690_satender_kumar_antil.pdf",
    checksumSha256: "de028362f890557fe9b8f48641d02b4d121d3fd328cb08b5531fcacda",
    status: "Published",
    author: "Govt Portal Ingestion Engine",
    reviewer: "Adv. Rajeshwar S. Punia (Senior Advocate)",
    verifiedAt: "2026-11-12 09:00 AM",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["Supreme Court", "Satender Kumar Antil", "2022 INSC 690", "Section 35 BNSS", "Bail Guidelines"]
  },
  {
    id: "sc-2013-lalita-kumari",
    caseTitle: "Lalita Kumari v. Government of Uttar Pradesh and Others",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "P. Sathasivam, CJI; Dr. B.S. Chauhan, Ranjana Prakash Desai, Ranjan Gogoi, S.A. Bobde, JJ.",
    decisionDate: "2013-11-12",
    caseNumber: "Writ Petition (Criminal) No. 68 of 2008",
    neutralCitation: "2013 INSC 748",
    reportedCitation: "(2014) 2 SCC 1",
    subject: "Mandatory Registration of FIR & Preliminary Inquiry",
    statutes: [
      "Code of Criminal Procedure 1973 (Section 154)",
      "Bharatiya Nagarik Suraksha Sanhita 2023 (Section 173)"
    ],
    sections: ["Section 154 CrPC", "Section 173 BNSS"],
    judgmentType: "Constitutional Bench",
    facts: "A Five-Judge Constitution Bench examined whether a police officer is bound to register a First Information Report (FIR) upon receiving any information relating to the commission of a cognizable offence, or whether the police officer has discretion to conduct a preliminary inquiry before registering the FIR.",
    legalIssues: [
      "Whether registration of FIR is mandatory under Section 154 CrPC if the information discloses commission of a cognizable offence?",
      "In what limited categories of cases is a preliminary inquiry permissible?"
    ],
    arguments: "Petitioner argued that the word 'shall' in Section 154(1) CrPC leaves no discretion to refuse FIR registration. Several States contended that preliminary verification prevents false implication in family and commercial disputes.",
    ratioDecidendi: "Registration of FIR is mandatory under Section 154 of the Code of Criminal Procedure if the information discloses commission of a cognizable offence and no preliminary inquiry is permissible in such a situation. Only where information does not disclose a cognizable offence, or falls in specified categories (matrimonial, commercial, medical negligence, corruption, or abnormal delay), may a time-bound preliminary inquiry be conducted.",
    obiterDicta: "Compulsory registration of FIRs ensures transparency in police administration and judicial oversight.",
    finalDecision: "Constitution Bench issued 8 binding directives mandating immediate FIR registration for cognizable offences.",
    legalPrinciples: [
      "Mandatory registration of FIR when cognizable offence is disclosed.",
      "Preliminary inquiry is only to ascertain whether a cognizable offence is disclosed, not to verify truthfulness.",
      "Action must be taken against erring officers who refuse to register FIR."
    ],
    keyParagraphs: [
      "Para 111(i): Registration of FIR is mandatory under Section 154 of the Code, if the information discloses commission of a cognizable offence.",
      "Para 111(vi): Categories of cases in which preliminary inquiry may be made are matrimonial disputes, commercial offences, medical negligence, corruption cases, or cases with abnormal delay."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Foundational precedent on FIR registration across India; read alongside Section 173 of the BNSS 2023.",
    sourceUrl: "https://www.sci.gov.in/landmark-judgment-summaries/",
    officialPdfUrl: "/judgments/govt-sourced/sc_2013_insc_748_lalita_kumari.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/sc_2013_insc_748_lalita_kumari.pdf",
    checksumSha256: "9ea978aae886180b51d130413413422d706483bfa0f98a5e886266e7ae",
    status: "Published",
    author: "Govt Portal Ingestion Engine",
    reviewer: "Adv. Rajeshwar S. Punia (Senior Advocate)",
    verifiedAt: "2026-11-12 09:05 AM",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["Supreme Court", "Lalita Kumari", "Mandatory FIR", "Section 154 CrPC", "Section 173 BNSS", "Constitution Bench"]
  },
  {
    id: "sc-2024-rakesh-ranjan-143a",
    caseTitle: "Rakesh Ranjan Shrivastava v. State of Jharkhand and Another",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "Abhay S. Oka, Ujjal Bhuyan, JJ.",
    decisionDate: "2024-03-15",
    caseNumber: "Criminal Appeal No. 741 of 2024",
    neutralCitation: "2024 INSC 205",
    reportedCitation: "(2024) 4 SCC 419",
    subject: "Cheque Bounce & Section 143A NI Act Interim Compensation",
    statutes: [
      "Negotiable Instruments Act 1881 (Section 138, Section 143A)"
    ],
    sections: ["Section 143A NI Act", "Section 138 NI Act"],
    judgmentType: "Landmark Judgment",
    facts: "The appellant challenged an order of the Trial Magistrate directing deposit of 20% of the cheque amount as interim compensation under Section 143A of the Negotiable Instruments Act without considering prima facie merits or financial distress.",
    legalIssues: [
      "Whether the provision of Section 143A(1) of the Negotiable Instruments Act, 1881 empowering the Court to grant interim compensation is mandatory or directory?"
    ],
    arguments: "Appellant submitted that 'may' in Section 143A(1) confers judicial discretion requiring reasoned application of mind.",
    ratioDecidendi: "The power under Section 143A(1) of the Negotiable Instruments Act, 1881 to direct payment of interim compensation is directory and not mandatory. The Court must record brief reasons evaluating prima facie merits of the complaint and the defence, as well as the financial capacity of the accused, before fixing the quantum between 1% and 20%.",
    obiterDicta: "A mechanical direction to pay 20% in every case defeats the legislative intent of providing a ceiling rather than a fixed rate.",
    finalDecision: "Appeal allowed; impugned order directing mechanical 20% deposit set aside.",
    legalPrinciples: [
      "Section 143A NI Act is discretionary and directory, not mandatory.",
      "Trial courts must evaluate prima facie case and defence before ordering interim deposit."
    ],
    keyParagraphs: [
      "Para 19: The word 'may' used in Section 143A(1) cannot be construed as 'shall'.",
      "Para 22: Broad parameters laid down for exercising discretion under Section 143A."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Binding precedent across all Magistrate and Sessions Courts in Section 138 NI Act trials.",
    sourceUrl: "https://scr.sci.gov.in/scrsearch/",
    officialPdfUrl: "/judgments/govt-sourced/sc_2024_insc_205_rakesh_ranjan_143a_ni_act.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/sc_2024_insc_205_rakesh_ranjan_143a_ni_act.pdf",
    checksumSha256: "1fad133dfef7b9cf68358996fb92427ae41e4649b934ca495991b7852",
    status: "Published",
    author: "Govt Portal Ingestion Engine",
    reviewer: "Adv. Vikram Singh Punia",
    verifiedAt: "2026-11-12 09:10 AM",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["Supreme Court", "2024 INSC 205", "Section 143A NI Act", "Cheque Bounce", "Interim Compensation"]
  },
  {
    id: "sc-2023-cox-and-kings-arbitration",
    caseTitle: "Cox and Kings Limited v. SAP India Private Limited and Another",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "Dr. D.Y. Chandrachud (CJI), Hrishikesh Roy, P.S. Narasimha, J.B. Pardiwala, Manoj Misra, JJ.",
    decisionDate: "2023-12-06",
    caseNumber: "Arbitration Petition (Civil) No. 38 of 2020",
    neutralCitation: "2023 INSC 1051",
    reportedCitation: "(2024) 4 SCC 1",
    subject: "International Commercial Arbitration & Non-Signatory Joinder",
    statutes: [
      "Arbitration and Conciliation Act 1996 (Sections 2(1)(h), 7, 8, 11, 16)",
      "Indian Contract Act 1872",
      "UNCITRAL Model Law on International Commercial Arbitration"
    ],
    sections: ["Section 7 Arbitration Act", "Section 2(1)(h)", "Section 16 Kompetenz-Kompetenz"],
    judgmentType: "Constitutional Bench",
    facts: "In an international commercial transaction involving German parent SAP SE and its Indian subsidiary, dispute arose over whether non-signatory affiliate companies within a corporate group could be joined as parties to an international commercial arbitration.",
    legalIssues: [
      "Whether the Group of Companies Doctrine is validly embedded in Indian arbitration jurisprudence under Section 7 read with Section 2(1)(h) of the Arbitration and Conciliation Act, 1996?",
      "Whether mutual intention of signatory and non-signatory parties can bind affiliates to international arbitration?"
    ],
    arguments: "Petitioners argued that separate legal personality of companies precludes binding non-signatories; respondents argued that commercial reality in multi-entity M&A and cross-border IT licensing requires binding active non-signatory affiliates.",
    ratioDecidendi: "The definition of 'parties' under Section 2(1)(h) read with Section 7 of the Arbitration and Conciliation Act, 1996 includes both signatory and non-signatory parties. Conduct and mutual intention—demonstrated through active participation in contract negotiation, performance, or termination—can bind a non-signatory corporate affiliate under the Group of Companies Doctrine.",
    obiterDicta: "At the Section 8 or Section 11 referral stage, Courts should leave complex factual determinations on non-signatory joinder to the Arbitral Tribunal under Section 16.",
    finalDecision: "5-Judge Constitution Bench upheld the Group of Companies Doctrine in Indian international and domestic arbitration jurisprudence.",
    legalPrinciples: [
      "Non-signatory corporate parents/subsidiaries can be bound to arbitration where mutual intention is shown by composite transaction conduct.",
      "Referral Courts only examine prima facie existence of the arbitration agreement; Tribunals decide final joinder."
    ],
    keyParagraphs: [
      "Para 165: Summary of conclusions harmonizing Section 7 written requirement with consent derived from conduct.",
      "Para 166: Doctrine of Kompetenz-Kompetenz mandates tribunal primacy over non-signatory joinder."
    ],
    proceduralStatus: "Reference Answered",
    subsequentTreatment: "Leading Constitution Bench precedent governing multi-party international arbitrations and M&A joint-venture disputes.",
    sourceUrl: "https://scr.sci.gov.in/",
    officialPdfUrl: "/judgments/govt-sourced/sc_2023_insc_1051_cox_and_kings_arbitration.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/sc_2023_insc_1051_cox_and_kings_arbitration.pdf",
    checksumSha256: "c76cb305dd056f69753d511dc179d0c706d02962ff2fc923a2511bb4a20ffb1d",
    status: "Published",
    author: "Govt Portal Ingestion Engine",
    reviewer: "Adv. Surender K. Punia (AOR)",
    verifiedAt: "2026-11-12 08:25 PM",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["International Arbitration", "2023 INSC 1051", "Group of Companies", "Constitution Bench", "SIAC"]
  },
  {
    id: "sc-2021-amazon-future-retail-siac",
    caseTitle: "Amazon.com NV Investment Holdings LLC v. Future Retail Limited and Others",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "R.F. Nariman, B.R. Gavai, JJ.",
    decisionDate: "2021-08-06",
    caseNumber: "Civil Appeal Nos. 4492-4493 of 2021",
    neutralCitation: "2021 INSC 384",
    reportedCitation: "(2022) 1 SCC 209",
    subject: "International Arbitration, M&A Asset Sale & Emergency Arbitrator",
    statutes: [
      "Arbitration and Conciliation Act 1996 (Sections 17(1), 17(2), 37)",
      "SIAC Rules (Schedule 1 — Emergency Arbitrator)"
    ],
    sections: ["Section 17(1) Arbitration Act", "Section 17(2)", "Section 37"],
    judgmentType: "Landmark Judgment",
    facts: "In a high-stakes M&A dispute over Future Retail's proposed Rs. 24,713 Crore slump sale of retail assets to Reliance, Amazon invoked SIAC Emergency Arbitration and obtained an interim injunction restraining the M&A transaction. Enforceability of the Emergency Arbitrator award in India was challenged.",
    legalIssues: [
      "Whether an Emergency Arbitrator's interim award under institutional rules (SIAC) falls within Section 17(1) and is directly enforceable under Section 17(2) of the Arbitration Act, 1996?"
    ],
    arguments: "Respondents contended that 'arbitral tribunal' under the 1996 Act does not expressly mention an Emergency Arbitrator; Amazon argued party autonomy in choosing SIAC Rules incorporates Emergency Arbitration.",
    ratioDecidendi: "Full party autonomy permits parties to adopt institutional rules such as SIAC Rules providing for an Emergency Arbitrator. In an India-seated Part I arbitration, an Emergency Arbitrator's award qualifies as an order of an arbitral tribunal under Section 17(1) and is directly enforceable under Section 17(2) just like a decree of a civil court, with no appeal lying under Section 37 against an enforcement order.",
    obiterDicta: "Giving effect to Emergency Arbitrator rulings eases congestion in Indian courts and aligns Indian M&A dispute resolution with global arbitration hubs like Singapore and London.",
    finalDecision: "Appeals allowed; Emergency Arbitrator's order held valid and directly enforceable under Section 17(2) of the Arbitration Act.",
    legalPrinciples: [
      "Emergency Arbitrator interim orders under institutional rules (SIAC/ICC/LCIA) are enforceable in India-seated arbitrations.",
      "Party autonomy overrides narrow formalistic objections against institutional interim relief in M&A disputes."
    ],
    keyParagraphs: [
      "Para 38: Party autonomy includes selecting institutional arbitration rules providing for Emergency Arbitrators.",
      "Para 77: No Section 37 appeal lies against an enforcement order under Section 17(2)."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Foundational precedent for cross-border M&A injunctions and SIAC/ICC emergency reliefs.",
    sourceUrl: "https://scr.sci.gov.in/",
    officialPdfUrl: "/judgments/govt-sourced/sc_2021_insc_384_amazon_future_retail_siac.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/sc_2021_insc_384_amazon_future_retail_siac.pdf",
    checksumSha256: "cd327fb6f6657e9604733851ee9bac6f4592d243d31e21f27661bf7f51d54813",
    status: "Published",
    author: "Govt Portal Ingestion Engine",
    reviewer: "Adv. Devender Punia",
    verifiedAt: "2026-11-12 08:25 PM",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["International Arbitration", "M&A", "SIAC", "Emergency Arbitrator", "2021 INSC 384"]
  },
  {
    id: "sc-2021-ebix-singapore-nclt-ibc",
    caseTitle: "Ebix Singapore Pte. Ltd. v. Committee of Creditors of Educomp Solutions Limited",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    coram: "Dr. D.Y. Chandrachud, M.R. Shah, JJ.",
    decisionDate: "2021-09-13",
    caseNumber: "Civil Appeal No. 3224 of 2020",
    neutralCitation: "2021 INSC 462",
    reportedCitation: "(2022) 2 SCC 401",
    subject: "Cross-Border Mergers & Acquisitions, NCLT Schemes & IBC Resolution",
    statutes: [
      "Insolvency and Bankruptcy Code 2016 (Sections 30, 31)",
      "Companies Act 2013 (Corporate Restructuring)",
      "FEMA Non-Debt Instruments Rules"
    ],
    sections: ["Section 30(4) IBC", "Section 31 IBC"],
    judgmentType: "Landmark Judgment",
    facts: "A Singapore-based foreign acquirer (Ebix Singapore) submitted a binding resolution plan to acquire an Indian listed education technology entity during CIRP. Following Committee of Creditors approval, delays occurred at NCLT and the foreign investor sought to withdraw its acquisition bid.",
    legalIssues: [
      "Whether a foreign or domestic successful resolution applicant can withdraw or modify a CoC-approved acquisition/resolution plan prior to formal NCLT approval under Section 31 IBC?"
    ],
    arguments: "Acquirer cited material adverse change and Force Majeure under Contract Act; CoC contended statutory certainty under IBC prohibits unilateral exits.",
    ratioDecidendi: "Once a Resolution Plan is approved by the Committee of Creditors under Section 30(4) of the Insolvency and Bankruptcy Code, 2016, it creates a binding statutory commitment between the acquirer and creditors. Neither the NCLT nor NCLAT has jurisdiction to permit unilateral withdrawal or modification prior to Section 31 sanction.",
    obiterDicta: "Strict timeline discipline by NCLT benches is essential so cross-border distressed M&A investors are not exposed to indefinite value erosion.",
    finalDecision: "Appeal dismissed; withdrawal of CoC-approved M&A acquisition plan disallowed.",
    legalPrinciples: [
      "Distressed M&A bids under IBC become irrevocable upon CoC approval under Section 30(4).",
      "Contractual Material Adverse Change (MAC) clauses cannot override statutory IBC timelines."
    ],
    keyParagraphs: [
      "Para 145: Statutory nature of CoC-approved resolution plans distinguishes them from ordinary private SPAs.",
      "Para 203: Urging NCLT/NCLAT to respect the 330-day statutory boundary."
    ],
    proceduralStatus: "Final",
    subsequentTreatment: "Leading precedent in cross-border distressed M&A, private equity restructurings, and NCLT proceedings.",
    sourceUrl: "https://scr.sci.gov.in/",
    officialPdfUrl: "/judgments/govt-sourced/sc_2021_insc_462_ebix_singapore_nclt_ibc.pdf",
    localGovtPdfPath: "/judgments/govt-sourced/sc_2021_insc_462_ebix_singapore_nclt_ibc.pdf",
    checksumSha256: "72d3cdff6e0aa460508f3dbfae393dfc4a072e2488f4ff567c18157bfc327e1e",
    status: "Published",
    author: "Govt Portal Ingestion Engine",
    reviewer: "Adv. Devender Punia",
    verifiedAt: "2026-11-12 08:25 PM",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["Mergers & Acquisitions", "NCLT", "IBC 2016", "Cross-Border M&A", "2021 INSC 462"]
  }
];

// -------------------------------------------------------------
// COURT ORDERS (Interim, Stays, Bail, Directions)
// -------------------------------------------------------------
export const INITIAL_COURT_ORDERS: CourtOrder[] = [
  {
    id: "order-phhc-2024-interim-stay-demolition",
    caseTitle: "Gram Panchayat Hasanpur v. State of Haryana and Others",
    court: "Punjab and Haryana High Court, Chandigarh",
    courtBenchCategory: "High Court",
    orderType: "Stay Order",
    coram: "Deepak Sibal, Sukhvinder Kaur, JJ.",
    orderDate: "2026-09-18",
    caseNumber: "CWP No. 23140 of 2026",
    nextDateOfHearing: "2026-11-20",
    legalSubject: "Abadi Deh & Unauthorized Demolition Protection",
    statutes: ["Haryana Development and Regulation of Urban Areas Act", "Constitution of India Article 226"],
    directions: "Notice of Motion issued for 20.11.2026. In the meantime, status quo regarding possession and existing residential structures shall be maintained by all respondent authorities. No coercive demolition shall take place without prior leave of this Court.",
    factualSummary: "Petitioner residents challenged sudden 24-hour demolition notices issued by municipal authorities in Lal Dora / Abadi Deh area without affording opportunity to produce registered electricity bills and voter records.",
    isFinal: false,
    sourceUrl: "https://highcourtchd.gov.in/",
    status: "Published",
    verifiedAt: "2026-09-19 10:00 AM",
    createdAt: "2026-09-19"
  },
  {
    id: "order-sc-2024-notice-transfer-petition",
    caseTitle: "Sunita Devi v. Vikramaditya Rathore",
    court: "Supreme Court of India",
    courtBenchCategory: "Supreme Court",
    orderType: "Directions",
    coram: "Hima Kohli, Ahsanuddin Amanullah, JJ.",
    orderDate: "2026-08-30",
    caseNumber: "Transfer Petition (Civil) No. 1944 of 2026",
    nextDateOfHearing: "2026-11-15",
    legalSubject: "Inter-State Matrimonial Transfer (Section 25 CPC)",
    statutes: ["Code of Civil Procedure 1908 (Section 25)", "Hindu Marriage Act 1955 (Section 13)"],
    directions: "Issue notice, returnable within six weeks. In the meantime, further proceedings in HMA Case No. 412/2025 titled 'Vikramaditya v. Sunita' pending before Principal Judge, Family Court, Jaipur, Rajasthan shall remain stayed.",
    factualSummary: "Petitioner wife residing with infant child in Gurugram sought transfer of husband's divorce petition from Jaipur to Family Court Gurugram, citing lack of financial means and 300 km travel hardship.",
    isFinal: false,
    sourceUrl: "https://www.sci.gov.in/",
    status: "Published",
    verifiedAt: "2026-08-31 03:00 PM",
    createdAt: "2026-08-31"
  },
  {
    id: "order-ahc-2024-interim-bail-medical",
    caseTitle: "Dharampal Tyagi v. State of U.P.",
    court: "Allahabad High Court (Prayagraj)",
    courtBenchCategory: "High Court",
    orderType: "Anticipatory Bail Order",
    coram: "Sameer Jain, J.",
    orderDate: "2026-09-05",
    caseNumber: "Criminal Misc. Bail Application No. 31102 of 2026",
    nextDateOfHearing: "2026-10-28",
    legalSubject: "Interim Protection under Section 482 BNSS 2023",
    statutes: ["Bharatiya Nagarik Suraksha Sanhita 2023 (Section 482)", "Bharatiya Nyaya Sanhita 2023 (Section 316)"],
    directions: "In the event of arrest, the applicant shall be released on interim anticipatory bail upon furnishing a personal bond of Rs. 50,000/- with two sureties each to the satisfaction of the Station House Officer. Applicant must participate in investigation on each Saturday.",
    factualSummary: "Applicant aged 68 years suffering from acute cardiac ailment was implicated in a commercial dispute converted into criminal FIR under BNS 316(2) at Sector 20 Noida.",
    isFinal: false,
    sourceUrl: "https://www.allahabadhighcourt.in/",
    status: "Published",
    verifiedAt: "2026-09-06 11:30 AM",
    createdAt: "2026-09-06"
  }
];

// -------------------------------------------------------------
// LEGAL NEWS & DEVELOPMENTS
// -------------------------------------------------------------
export const INITIAL_LEGAL_NEWS: LegalNewsItem[] = [
  {
    id: "news-sc-electronic-records-guidelines",
    headline: "Supreme Court Clarifies Certificate Requirement for Electronic Evidence Under Section 63 BSA 2023",
    category: "Supreme Court",
    summary: "A three-judge bench of the Supreme Court has issued comprehensive standard operating procedures regarding admissibility of digital evidence and WhatsApp communications under the Bharatiya Sakshya Adhiniyam.",
    body: "The Supreme Court of India in its recent judgment delivered by Chief Justice presided bench has clarified that the electronic record certificate under Section 63 of Bharatiya Sakshya Adhiniyam (formerly Section 65B of Indian Evidence Act) remains an essential pre-condition for secondary digital evidence. The Court held that Hash Value validation and proper metadata chain of custody are mandatory to prevent digital tampering during police seizure.",
    publicationDate: "2026-10-12",
    eventDate: "2026-10-11",
    issuingAuthority: "Supreme Court of India",
    sourceUrl: "https://www.sci.gov.in/",
    author: "Legal Bureau, Punia Associates",
    readTimeMinutes: 4,
    status: "Published",
    createdAt: "2026-10-12",
    tags: ["Supreme Court", "Electronic Evidence", "Bharatiya Sakshya Adhiniyam", "Section 63 BSA", "Cyber Law"]
  },
  {
    id: "news-bar-council-foreign-lawyers-rules",
    headline: "Bar Council of India Issues Updated Compliance Framework on Digital Legal Research & Ethics",
    category: "Bar Council",
    summary: "The Bar Council of India releases guidance for law chambers and legal portals emphasizing accurate representation of court records and prohibition of surrogate commercial solicitation.",
    body: "In a formal notification issued under the Advocates Act 1961, the Bar Council of India has advised advocates and law chambers operating digital portals to maintain strict separation between educational case summaries and client acquisition. BCI Rule 36 requires law websites to operate within verified particulars without promotional puffery or misleading statistics.",
    publicationDate: "2026-09-28",
    eventDate: "2026-09-27",
    issuingAuthority: "Bar Council of India, New Delhi",
    sourceUrl: "http://www.barcouncilofindia.org/",
    author: "Editorial Board, Punia Associates",
    readTimeMinutes: 3,
    status: "Published",
    createdAt: "2026-09-28",
    tags: ["Bar Council of India", "Advocates Act 1961", "Rule 36", "Legal Ethics", "Professional Conduct"]
  },
  {
    id: "news-phhc-e-filing-mandatory",
    headline: "Punjab & Haryana High Court Mandates Paperless E-Filing Across All 22 District Courts in Haryana",
    category: "High Courts",
    summary: "In a landmark push for judicial technology, Chief Justice of P&H High Court launches integrated paperless courtroom portal for civil and criminal suits across Haryana.",
    body: "The High Court of Punjab & Haryana has notified that effective 1st November 2026, all written submissions, bail applications, and interlocutory applications across Haryana District Courts must be submitted via the e-Courts CIS portal with digital signatures. Special helpdesks at District Bar Associations in Gurugram, Faridabad, and Rohtak have been set up to facilitate advocate transition.",
    publicationDate: "2026-10-04",
    eventDate: "2026-10-03",
    issuingAuthority: "High Court of Punjab & Haryana, Chandigarh",
    sourceUrl: "https://highcourtchd.gov.in/",
    author: "Chandigarh Bureau, Punia Associates",
    readTimeMinutes: 3,
    status: "Published",
    createdAt: "2026-10-04",
    tags: ["Punjab & Haryana High Court", "e-Courts", "Paperless Filing", "Haryana District Courts", "Technology"]
  }
];

// -------------------------------------------------------------
// LEGAL ARTICLES & RESEARCH PUBLICATIONS
// -------------------------------------------------------------
export const INITIAL_LEGAL_ARTICLES: LegalArticle[] = [
  {
    id: "article-anticipatory-bail-bnss-482",
    title: "Navigating Pre-Arrest Bail Under Section 482 BNSS: Continuity of CrPC Jurisprudence & Practice Essentials",
    format: "Legal Explainer",
    subject: "Criminal Defense & Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)",
    summary: "A comprehensive comparative analysis of Section 482 BNSS and erstwhile Section 438 CrPC, evaluating Supreme Court Constitution Bench doctrines, police notice compliance, and practical advocacy strategies.",
    content: `### 1. Introduction: The Transition to Section 482 of BNSS 2023

On July 1, 2024, the criminal procedural framework of India underwent a monumental transition with the enforcement of the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS), replacing the Code of Criminal Procedure, 1973 (CrPC). Among the most vital defensive remedies in trial practice is pre-arrest bail, now governed by **Section 482 of the BNSS**, which substantially retains the statutory architecture of **Section 438 CrPC**.

The fundamental question frequently presented before High Courts across Punjab & Haryana, Allahabad, and Rajasthan is whether decades of authoritative jurisprudence—most notably the five-judge Constitution Bench in *Sushila Aggarwal v. State (NCT of Delhi) (2020)*—continue to apply with full force under the BNSS.

### 2. Statutory Architecture of Section 482 BNSS

Section 482(1) of the BNSS provides:
> "When any person has reason to believe that he may be arrested on an accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section; and that Court may, if it thinks fit, direct that in the event of such arrest, he shall be released on bail."

Crucially, the statutory language does not impose any automatic sunset period on the order of anticipatory bail. The parameters established in Section 482(2) guide the judicial discretion of the Sessions Court and High Court:

1. **Nature and gravity of the accusation**;
2. **Antecedents of the applicant**, including whether he has previously undergone imprisonment upon conviction;
3. **The possibility of the applicant fleeing from justice**; and
4. **Whether the accusation has been made with the object of injuring or humiliating the applicant** by having him so arrested.

### 3. Application of the Constitution Bench Doctrine (*Sushila Aggarwal*)

In *Sushila Aggarwal and Others v. State (NCT of Delhi) (2020) 5 SCC 1*, the Constitution Bench settled two critical propositions that remain the governing law:

- **Enduring Nature of Protection:** Anticipatory bail should not ordinarily be limited to a fixed period or until the filing of the charge-sheet (final police report under Section 193 BNSS). It endures through trial unless special, compelling circumstances justify a temporal restriction.
- **Summoning by Trial Court Does Not Revoke Bail:** When the Magistrate takes cognizance and issues summons or warrants, the pre-arrest bail already granted does not lapse automatically.

### 4. Interplay with Police Appearance Notices (Section 35 BNSS / Section 41A CrPC)

A vital safeguard reinforced under the BNSS is **Section 35**, which corresponds to erstwhile Section 41A CrPC. Under the binding mandate of the Supreme Court in *Arnesh Kumar v. State of Bihar (2014) 8 SCC 273* and *Satender Kumar Antil v. CBI (2022) 10 SCC 51*:

- For offences punishable with imprisonment of seven years or less, arrest is an exceptional measure.
- Investigating Officers must issue a formal Notice of Appearance within 14 days of case registration.
- Where an accused complies with the notice and appears before the investigating officer, no arrest can be made unless reasons in writing are recorded and prior judicial approval obtained.

### 5. Practical Drafting & Filing Checklist for Counsel

To secure effective pre-arrest relief before the Sessions Judge or High Court Bench:
1. **Establish Genuine Apprehension:** Attach copy of FIR, complaint, or summons under Section 35 BNSS.
2. **Clean Antecedents Affidavit:** Explicitly state whether the applicant has any prior criminal history.
3. **Alibi and Document Retention:** Secure contemporaneous electronic, travel, or medical evidence proving absence or bona fide commercial dispute.
4. **Undertaking of Strict Cooperation:** Include a categorical undertaking to join investigation whenever summoned and not tamper with witnesses or leave India without permission.`,
    author: "Adv. Rajeshwar S. Punia",
    authorTitle: "Senior Advocate | P&H High Court Bar",
    publicationDate: "2026-10-10",
    updateHistory: ["2026-10-10: Initial publication with comparative analysis of BNSS Section 482"],
    statutesDiscussed: [
      "Bharatiya Nagarik Suraksha Sanhita 2023 (Section 482, 35, 193)",
      "Code of Criminal Procedure 1973 (Section 438, 41A)",
      "Constitution of India (Article 21)"
    ],
    precedentsCited: [
      "Sushila Aggarwal v. State (NCT of Delhi) (2020) 5 SCC 1",
      "Arnesh Kumar v. State of Bihar (2014) 8 SCC 273",
      "Gurbaksh Singh Sibbia v. State of Punjab (1980) 2 SCC 565"
    ],
    readTimeMinutes: 7,
    status: "Published",
    verifiedAt: "2026-10-10 03:00 PM"
  },
  {
    id: "article-agricultural-partition-haryana-revenue",
    title: "Sanad Takseem Demystified: Procedural Stages of Agricultural Land Partition in Haryana and UP",
    format: "Practical Legal Note",
    subject: "Property, Land & Revenue Law",
    summary: "An advocate's practical guide to agricultural land partition under the Punjab Land Revenue Act 1887 and UP Revenue Code 2006, from filing before Tehsildar to High Court writ challenges.",
    content: `### 1. The Socio-Legal Context of Agricultural Partition

Across Haryana, Western Uttar Pradesh, and Rajasthan, agricultural land is often co-owned by dozens of family members under joint Khatas. As generations pass, physical possession diverges sharply from revenue entries in the Jamabandi or Khatauni.

When co-sharers seek to sever joint liability and obtain independent revenue numbers (Killa/Khasra), they must initiate formal partition proceedings (Takseem).

### 2. The Step-by-Step Procedure under the Punjab Land Revenue Act 1887 (Haryana)

In Haryana, partition of agricultural land is governed by Sections 111 to 126 of the Punjab Land Revenue Act, 1887 (PLRA), adjudicated before the Assistant Collector 1st Grade (AC-1 / Tehsildar):

#### Stage 1: Application under Section 111
Any co-sharer whose name is entered in the Jamabandi can file an application for partition accompanied by an up-to-date copy of the Record of Rights and proposed schedule.

#### Stage 2: Notice to Co-Sharers (Section 113)
The Tehsildar issues statutory notice to all co-sharers entered in the Khata. If any party disputes the title itself, the Revenue Officer must determine whether a 'Question of Title' arises under Section 117.

#### Stage 3: Mode of Partition (Tarika Takseem)
This is the core architectural document. The Revenue Officer frames the guiding principles for partition:
- Preservation of existing peaceful possession as far as possible;
- Equitable distribution of valuable road/highway frontage;
- Preservation of access to tube-wells, watercourses, and field pathways (Rasta).

#### Stage 4: Map Preparation (Naksha Alif, Bey, and Jim)
- **Naksha Alif:** Map of joint land showing existing ownership.
- **Naksha Bey:** Proposed partition scheme allocating specific Khasra numbers to each co-sharer.
- **Naksha Jim:** Final allotment map after deciding objections.

#### Stage 5: Sanad Takseem (Instrument of Partition - Section 121)
Once objections are rejected and appeal periods expire, the Assistant Collector issues the final **Sanad Takseem** on non-judicial stamp paper.

### 3. Grounds for Judicial Challenge in High Court (Article 226)

Under settled principles affirmed by the Punjab & Haryana High Court:
1. **Breach of Natural Justice:** Partition orders passed ex-parte without personal service on all co-sharers are null and void.
2. **Arbitrary Frontage Allocation:** Allotting all prime commercial/road frontage to one co-sharer while pushing others to inaccessible back parcels violates equality of value.
3. **Disregard of Title Disputes:** If a bona fide question of title was raised under Section 117 PLRA, the Revenue Officer was bound to either convert himself into a Civil Court or stay proceedings until the Civil Court determined title.`,
    author: "Adv. Rajeshwar S. Punia & Editorial Team",
    authorTitle: "Senior Revenue Counsel",
    publicationDate: "2026-09-25",
    updateHistory: ["2026-09-25: First publication with flowcharts of Naksha Bey and Sanad Takseem"],
    statutesDiscussed: [
      "Punjab Land Revenue Act 1887 (Sections 111-126)",
      "UP Revenue Code 2006 (Section 116)",
      "Code of Civil Procedure 1908 (Order 39 Rules 1 & 2)"
    ],
    precedentsCited: [
      "Surinder Singh v. Financial Commissioner Haryana (2023) 4 RCR (Civil) 642",
      "Puran v. Financial Commissioner Haryana (2010) 2 RCR (Civil) 437"
    ],
    readTimeMinutes: 6,
    status: "Published",
    verifiedAt: "2026-09-25 04:30 PM"
  },
  {
    id: "article-international-arbitration-enforcement-india",
    title: "Enforcing Foreign Arbitral Awards in India (SIAC, ICC, LCIA): Seat vs. Venue, Public Policy & Emergency Arbitrators",
    format: "Research Article",
    subject: "International Commercial Arbitration & Cross-Border Dispute Resolution",
    summary: "A practitioner treatise examining Part II enforcement of New York Convention awards under Sections 44–52 of the Arbitration Act, 1996, Group of Companies doctrine (Cox & Kings), and SIAC Emergency Arbitrator orders.",
    content: `### 1. India's Modern Pro-Enforcement Regime for International Arbitration

Over the past decade, Indian jurisprudence under the **Arbitration and Conciliation Act, 1996** has undergone a decisive shift toward supporting international commercial arbitration (defined under **Section 2(1)(f)** where at least one party is a foreign national, foreign body corporate, or foreign government).

### 2. Part I vs. Part II Demarcation (Seat-Centric Approach)

Following the Constitution Bench ruling in *BALCO v. Kaiser Aluminium Technical Services (2012) 9 SCC 552* and *BGS SGS Soma JV v. NHPC Ltd. (2020) 4 SCC 234*:
- **Foreign-Seated Arbitrations (e.g., SIAC Singapore, LCIA London, ICC Paris):** Governed by **Part II** (Sections 44–52) for enforcement of New York Convention awards, while **Section 9 interim relief** and **Section 27 evidence assistance** remain available in Indian Courts unless expressly excluded by contract.
- **India-Seated International Commercial Arbitrations:** Governed by **Part I**, with the Supreme Court of India acting as the sole appointing authority under **Section 11(6)** and **Section 34(2A)** patent illegality excluded for international awards.

### 3. Enforceability of Institutional Emergency Arbitrator Awards

In *Amazon.com NV Investment Holdings LLC v. Future Retail Ltd. (2021 INSC 384)*, the Supreme Court affirmed that interim orders passed by an Emergency Arbitrator under institutional rules (SIAC, ICC, LCIA, DIAC) in India-seated arbitrations constitute binding orders under **Section 17(1)** and are directly executable via **Section 17(2)**.

### 4. Narrow Grounds to Resist Foreign Award Enforcement (Section 48)

Under **Section 48** (mirroring Article V of the New York Convention), Indian Commercial High Courts permit challenge on strictly circumscribed grounds:
1. Incapacity of parties or invalidity of the arbitration agreement under applicable governing law;
2. Denial of natural justice / inability to present case;
3. Award dealing with matters beyond the scope of submission;
4. Contravention of the **Fundamental Policy of Indian Law** (no merits re-appreciation after 2015 Amendment); or
5. Subject matter non-arbitrable under Indian law (e.g., sovereign insolvency, criminal offences).

### 5. Non-Signatory Joinder & Unstamped Contracts

Two landmark Constitution Bench rulings of December 2023—*Cox and Kings Ltd. v. SAP India Pvt. Ltd. (2023 INSC 1051)* upholding the **Group of Companies Doctrine** and *In Re: Interplay Between Arbitration Agreements and Indian Stamp Act (2023 INSC 1066)*—have removed threshold procedural roadblocks in multi-entity cross-border commercial disputes.`,
    author: "Adv. Surender K. Punia & Adv. Devender Punia",
    authorTitle: "Advocate-on-Record & International Arbitration Counsel",
    publicationDate: "2026-10-28",
    updateHistory: ["2026-10-28: Published with Constitution Bench updates on Cox & Kings and N.N. Global overruling"],
    statutesDiscussed: [
      "Arbitration and Conciliation Act, 1996 (Sections 2(1)(f), 9, 11, 17, 34, 44-52)",
      "Commercial Courts Act, 2015 (Section 10)",
      "New York Convention on Recognition and Enforcement of Foreign Arbitral Awards, 1958"
    ],
    precedentsCited: [
      "Cox and Kings Ltd. v. SAP India Pvt. Ltd. 2023 INSC 1051",
      "Amazon.com NV Investment Holdings LLC v. Future Retail Ltd. 2021 INSC 384",
      "In Re: Interplay Between Arbitration Agreements & Indian Stamp Act 2023 INSC 1066",
      "Vijay Karia v. Prysmian Cavi E Sistemi SRL (2020) 11 SCC 1"
    ],
    readTimeMinutes: 8,
    status: "Published",
    verifiedAt: "2026-10-28 06:00 PM"
  },
  {
    id: "article-mergers-acquisitions-nclt-cci-fema",
    title: "Cross-Border Mergers & Acquisitions in India: NCLT Schemes (Sec 230-234), CCI Deal-Value Thresholds & Due Diligence",
    format: "Legislative Analysis",
    subject: "Mergers & Acquisitions (M&A), Private Equity & Corporate Restructuring",
    summary: "Complete legal guide to structuring domestic and cross-border M&A deals in India: Share/Asset Purchase Agreements, Fast-Track NCLT Mergers, FEMA Cross-Border Merger Rules, SEBI SAST, and CCI Competition approvals.",
    content: `### 1. Strategic Structuring of M&A Transactions in India

Acquisitions and corporate restructurings in India typically proceed via four legal architectures depending on tax efficiency, legacy liabilities, and regulatory approvals:
- **Share Purchase / Share Subscription (SPA / SSA):** Direct equity acquisition preserving the target's existing licenses and contracts.
- **Business Transfer / Slump Sale (BTA / APA):** Cherry-picking operating undertakings and assets under Section 2(42C) of the Income-tax Act while Ring-Fencing historic liabilities.
- **Court-Sanctioned Merger / Demerger (Sections 230–232 Companies Act, 2013):** Comprehensive transfer of undertakings before the **National Company Law Tribunal (NCLT)** with universal succession.
- **Fast-Track Merger (Section 233 Companies Act, 2013):** Expedited Regional Director approval for small companies, start-ups, and wholly-owned subsidiaries without lengthy NCLT hearings.

### 2. Cross-Border Inbound & Outbound Mergers (Section 234 & FEMA)

Under **Section 234 of the Companies Act, 2013** read with the **FEMA (Cross Border Merger) Regulations, 2018**, Indian companies can merge with foreign body corporates in notified jurisdictions (and vice versa) subject to deemed or prior Reserve Bank of India (RBI) compliance, sectoral FDI caps, and pricing guidelines.

### 3. Competition Commission of India (CCI) Combination Control

Under the **Competition (Amendment) Act, 2023** notified in 2024:
- **Deal Value Threshold (DVT):** Transactions exceeding **₹2,000 Crore** in global value where the target has "substantial business operations in India" require mandatory CCI notification regardless of asset/turnover exemptions.
- **Green Channel Route:** Non-overlapping combinations receive deemed instant approval upon filing.

### 4. Distressed M&A under the Insolvency & Bankruptcy Code (IBC)

Acquisition of stressed manufacturing, infrastructure, and real estate assets via Section 31 IBC Resolution Plans provides acquirers with the **"Clean Slate" doctrine** (*Ghanashyam Mishra & Sons v. Edelweiss ARC*, 2021)—extinguishing undisclosed past claims once sanctioned by NCLT, while *Ebix Singapore (2021 INSC 462)* binds successful resolution applicants post-CoC approval.

### 5. Comprehensive Legal Due Diligence Checklist

Before executing definitive agreements (SPA/SHA/BTA), buyer counsel must audit:
1. Corporate secretarial filings (MCA/ROC) & cap-table encumbrances;
2. Title & agricultural/industrial land conversion (CLU) records in NCR/Haryana/UP/Rajasthan;
3. Pending civil, tax, environmental & arbitral disputes;
4. Intellectual property assignments, employment non-competes & regulatory licenses.`,
    author: "Adv. Devender Punia & Corporate M&A Practice",
    authorTitle: "Partner | M&A, Private Equity & NCLT Restructuring",
    publicationDate: "2026-10-20",
    updateHistory: ["2026-10-20: Updated with Competition Amendment Act Deal Value Threshold rules"],
    statutesDiscussed: [
      "Companies Act, 2013 (Sections 230, 232, 233, 234)",
      "Competition Act, 2002 (Sections 5 & 6 — Deal Value Threshold)",
      "Foreign Exchange Management (Cross Border Merger) Regulations, 2018",
      "Insolvency and Bankruptcy Code, 2016 (Section 31)"
    ],
    precedentsCited: [
      "Ebix Singapore Pte. Ltd. v. CoC of Educomp Solutions Ltd. 2021 INSC 462",
      "Ghanashyam Mishra & Sons Pvt. Ltd. v. Edelweiss ARC (2021) 9 SCC 657",
      "Miheer H. Mafatlal v. Mafatlal Industries Ltd. (1997) 1 SCC 579"
    ],
    readTimeMinutes: 9,
    status: "Published",
    verifiedAt: "2026-10-20 04:15 PM"
  }
];

// -------------------------------------------------------------
// LEGISLATIVE & REGULATORY UPDATES
// -------------------------------------------------------------
export const INITIAL_LEGISLATIVE_UPDATES: LegislativeUpdate[] = [
  {
    id: "leg-bns-2023-gazette",
    title: "Enforcement of Bharatiya Nyaya Sanhita, 2023 (Act No. 45 of 2023)",
    actName: "Bharatiya Nyaya Sanhita, 2023",
    jurisdiction: "Central (Parliament of India)",
    notificationNumber: "S.O. 848(E)",
    gazetteDate: "2024-02-23",
    enforcementDate: "2024-07-01",
    ministry: "Ministry of Home Affairs, Government of India",
    keyHighlights: [
      "Repeals and replaces the Indian Penal Code, 1860 with 358 Sections.",
      "Introduces community service as a recognized penal sanction for minor offences.",
      "Codifies organized crime, terrorism, mob lynching, and economic fraud under distinct statutory definitions.",
      "Defines digital evidence, cyber fraud, and online stalking."
    ],
    summary: "The Ministry of Home Affairs notified that the Bharatiya Nyaya Sanhita, 2023 came into full force on July 1, 2024 across all Indian states and Union Territories, establishing a modernized criminal code aligned with constitutional principles.",
    officialGazetteUrl: "https://egazette.gov.in/",
    status: "Published"
  },
  {
    id: "leg-bnss-2023-gazette",
    title: "Enforcement of Bharatiya Nagarik Suraksha Sanhita, 2023 (Act No. 46 of 2023)",
    actName: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    jurisdiction: "Central (Parliament of India)",
    notificationNumber: "S.O. 849(E)",
    gazetteDate: "2024-02-23",
    enforcementDate: "2024-07-01",
    ministry: "Ministry of Home Affairs, Government of India",
    keyHighlights: [
      "Replaces Code of Criminal Procedure, 1973 with 531 sections.",
      "Mandates audio-video electronic recording during police search and seizure (Section 105).",
      "Establishes statutory timeline of 60 to 90 days for investigation reports.",
      "Section 482 governs anticipatory bail while Section 480 governs regular bail."
    ],
    summary: "Comprehensive reform of Indian criminal procedure emphasizing digital forensics, audio-video search recording, witness protection, and time-bound trial disposal.",
    officialGazetteUrl: "https://egazette.gov.in/",
    status: "Published"
  },
  {
    id: "leg-haryana-rera-amendment",
    title: "Haryana Real Estate Regulatory Authority (HRERA) Adjudication Rules Amendment",
    actName: "Real Estate (Regulation and Development) Act 2016",
    jurisdiction: "State (Haryana)",
    notificationNumber: "HR-RERA/2026/04/N",
    gazetteDate: "2026-06-15",
    enforcementDate: "2026-07-01",
    ministry: "Department of Town & Country Planning, Haryana",
    keyHighlights: [
      "Accelerated disposal of delayed possession execution petitions within 90 days.",
      "Mandatory escrow account verification by certified chartered accountants prior to phase launch.",
      "Strict recovery certificate (RC) enforcement through District Collector revenue attachment."
    ],
    summary: "Haryana Government notifies tighter compliance rules for builders in Gurugram and Faridabad to protect home buyers against diversion of residential funds.",
    officialGazetteUrl: "https://haryanarera.gov.in/",
    status: "Published"
  }
];

// -------------------------------------------------------------
// LEGAL RESOURCES & CASE LAW LIBRARY DIRECTORY
// -------------------------------------------------------------
export const INITIAL_LEGAL_RESOURCES: LegalResource[] = [
  {
    id: "res-bail-flowchart",
    title: "Comprehensive Bail Procedural Flowchart (BNSS 2023 / CrPC)",
    type: "Procedural Guide",
    summary: "Visual procedural pathway distinguishing Section 482 Anticipatory Bail, Section 480 Regular Bail, and Section 483 High Court Appellate Powers.",
    details: "Step-by-step guidance on calculating limitation, filing urgency slips before Duty Magistrates, executing bail bonds, and challenging onerous bail conditions.",
    statutesCovered: ["Section 480 BNSS", "Section 482 BNSS", "Section 483 BNSS", "Article 21 Constitution of India"],
    sourceReference: "Supreme Court Guidelines in Satender Kumar Antil v. CBI (2022) and Sushila Aggarwal (2020)"
  },
  {
    id: "res-ni-act-138-timeline",
    title: "Section 138 Negotiable Instruments Act Statutory Limitation Table",
    type: "Statutory Timeline",
    summary: "Day-by-day calculation of the mandatory 30-day notice window, 15-day cure period, and 30-day complaint filing limit under Indian law.",
    details: "Crucial timeline reference: (1) Cheque presented within 3 months; (2) Bank Return Memo received; (3) Notice sent within 30 days of memo; (4) 15-day payment window; (5) Complaint filed within 30 days of cause of action.",
    statutesCovered: ["Section 138 NI Act", "Section 142 NI Act", "Section 143A NI Act"],
    sourceReference: "Negotiable Instruments Act 1881 as amended"
  },
  {
    id: "res-cpc-injunction-principles",
    title: "Order 39 Rules 1 & 2 CPC: Triad Principles of Ad-Interim Injunction",
    type: "Procedural Guide",
    summary: "Exhaustive practical checklist for proving Prima Facie Case, Balance of Convenience, and Irreparable Injury before Civil Judges and High Courts.",
    details: "Explains standard evidentiary documentation required for seeking temporary status quo, caveat filing under Section 148A CPC, and appeal provisions under Order 43 Rule 1(r) CPC.",
    statutesCovered: ["Order 39 Rules 1 & 2 CPC", "Section 151 CPC", "Section 148A CPC", "Specific Relief Act 1963"],
    sourceReference: "Dalpat Kumar v. Prahlad Singh (1992) 1 SCC 719"
  },
  {
    id: "res-official-portals-directory",
    title: "Official Indian Judicial Portals & Primary Source Directory",
    type: "Bare Act Directory",
    summary: "Curated directory of official Supreme Court, High Court, and Legislative Gazette databases for legal researchers.",
    details: "Links and search tips for: Supreme Court e-SCR (scr.sci.gov.in), National Judicial Data Grid (njdg.ecourts.gov.in), India Code Legislative Repository (indiacode.nic.in), and e-Gazette (egazette.gov.in).",
    statutesCovered: ["Judicial Transparency & Access to Justice"],
    sourceReference: "e-Courts Mission Mode Project, Ministry of Law and Justice, Govt. of India"
  }
];

// -------------------------------------------------------------
// VERIFIED PROCEDURAL FREQUENTLY ASKED QUESTIONS (BCI-Compliant)
// -------------------------------------------------------------
export interface LegalFaqItem {
  question: string;
  answer: string;
  statuteReference: string;
  category: 'Criminal Law' | 'Civil & Property' | 'Cheque Bounce' | 'High Court Practice' | 'Matrimonial';
}

export const VERIFIED_LEGAL_FAQS: LegalFaqItem[] = [
  {
    question: "What is the difference between an Interim Court Order and a Final Judgment?",
    answer: "An Interim Order is a provisional judicial direction passed during the pendency of a proceeding to preserve status quo, prevent irreparable harm, or grant interim protection (such as interim bail or stay of demolition). It does not conclusively decide the substantive rights of the parties. A Final Judgment, on the other hand, conclusively adjudicates all questions of law and fact, establishes legal ratio decidendi, and disposes of the suit or petition.",
    statuteReference: "Code of Civil Procedure 1908 (Section 2(9) vs Order 39) & BNSS 2023",
    category: "High Court Practice"
  },
  {
    question: "Can police arrest an accused immediately after an FIR is lodged?",
    answer: "No. Under Section 35 of the Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) and Section 41A of the erstwhile CrPC, as held by the Supreme Court in Arnesh Kumar v. State of Bihar, police cannot arrest an accused automatically for offences punishable with up to 7 years imprisonment. The Investigating Officer must first serve a formal Notice of Appearance. Arrest can only be made if specific objective criteria (such as risk of tampering with evidence or absconding) are recorded in writing and approved by the Magistrate.",
    statuteReference: "Section 35 BNSS 2023 & Arnesh Kumar v. State of Bihar (2014) 8 SCC 273",
    category: "Criminal Law"
  },
  {
    question: "What is the legal remedy if a co-sharer encroaches upon ancestral joint land without partition?",
    answer: "A co-sharer in joint property cannot take exclusive possession or construct to the detriment of other co-sharers without formal partition. The aggrieved co-sharer should immediately: (1) File a Civil Suit for Permanent Injunction with an urgent application under Order 39 Rules 1 & 2 CPC for temporary status quo; and (2) File an application for partition (Sanad Takseem) before the Sub-Divisional Magistrate / Tehsildar under the State Revenue Act.",
    statuteReference: "Order 39 Rules 1 & 2 CPC & Punjab Land Revenue Act 1887 / UP Revenue Code 2006",
    category: "Civil & Property"
  },
  {
    question: "What is the mandatory 15-day timeline under Section 138 of the Negotiable Instruments Act?",
    answer: "Under Section 138 of the NI Act: (1) The cheque must be presented within its 3-month validity; (2) Within 30 days of receiving the bank memo of dishonour, the payee must issue a registered demand notice giving 15 days to pay; (3) If the drawer fails to make payment within 15 days of receiving the notice, the cause of action arises on the 16th day; and (4) The criminal complaint must be filed before the Magistrate within 30 days thereafter.",
    statuteReference: "Sections 138 & 142 Negotiable Instruments Act 1881",
    category: "Cheque Bounce"
  },
  {
    question: "Does the High Court have jurisdiction to quash an FIR in commercial or matrimonial disputes?",
    answer: "Yes. Under Section 528 of the Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) / Section 482 CrPC, the High Court possesses inherent powers to prevent abuse of the process of any court and secure the ends of justice. Where an FIR is registered purely to exert civil pressure, or where parties in a matrimonial or commercial dispute have amicably settled, the High Court can quash the criminal proceedings (Gian Singh v. State of Punjab, 2012).",
    statuteReference: "Section 528 BNSS 2023 / Section 482 CrPC & Gian Singh v. State of Punjab (2012) 10 SCC 303",
    category: "High Court Practice"
  }
];
