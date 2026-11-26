export interface StateLegalHub {
  state: 'Haryana' | 'Uttar Pradesh' | 'Rajasthan' | 'Delhi NCR';
  tagline: string;
  advocateCount: string;
  leadAdvocate: string;
  leadExperience: string;
  primaryCourts: string[];
  keySpecialties: string[];
  stateLawsAndActs: string[];
  jurisdictionAnalysis: string;
  seoFocusPoints: string[];
}

export interface LegalServiceCategory {
  id: string;
  title: string;
  hindiTitle: string;
  shortDesc: string;
  fullDesc: string;
  sectionsAndActs: string[];
  statesCovered: string[];
  urgency: '24/7 Emergency' | 'High Priority' | 'Standard Advisory';
  freeConsultationOffer: string;
}

export interface NetworkAdvocate {
  id: string;
  name: string;
  designation: string;
  state: 'Haryana' | 'Uttar Pradesh' | 'Rajasthan' | 'Delhi NCR';
  primaryCourt: string;
  experienceYears: number;
  specialization: string[];
  education: string;
  barEnrollment: string;
  phone: string;
  freeConsultationAvailable: boolean;
}

export interface CasePrecedent {
  id: string;
  court: string;
  state: string;
  matterType: string;
  summary: string;
  reliefGranted: string;
  year: string;
}

export interface StateArticle {
  id: string;
  state: string;
  title: string;
  slug: string;
  readTime: string;
  author: string;
  excerpt: string;
  keywords: string[];
  content: string[];
}

export const FIRM_INFO = {
  name: "Punia Associates",
  brandWebsite: "puniaassociates.site",
  appUrl: "https://puniaassociates.site",
  tagline: "Advocates & Legal Consultants | Haryana • Uttar Pradesh • Rajasthan • Delhi NCR",
  experience: "20+ Years of Advocacy Practice",
  networkSize: "Multi-State Advocate Network",
  helplinePhone: "+91 90532 81218",
  secondaryPhone: "+91 81989 82053",
  whatsappNumber: "+919053281218",
  secondaryWhatsapp: "+918198982053",
  email: "counsel@puniaassociates.site",
  successRate: "Extensive Record of Courtroom Relief & Bail Grants",
  casesHandled: "Extensive Trial & Appellate Experience",
  freeConsultationText: "Consult an Advocate for Preliminary Assessment",
  offices: [
    {
      state: "Haryana",
      city: "Gurugram & Chandigarh",
      address: "Chamber No. 412, District & Sessions Court Complex, Sector 12, Gurugram, Haryana 122001 (Also at P&H High Court Bar, Chandigarh)",
      phone: "+91 90532 81218",
      altPhone: "+91 81989 82053",
      court: "Punjab & Haryana High Court & All Haryana District Courts",
    },
    {
      state: "Uttar Pradesh",
      city: "Noida / Greater Noida & Prayagraj",
      address: "Chamber No. 118, Lawyers Block, District Court Surajpur, Greater Noida, UP 201306 (Also at High Court Allahabad & Lucknow)",
      phone: "+91 81989 82053",
      altPhone: "+91 90532 81218",
      court: "Allahabad High Court, Lucknow Bench & District Courts",
    },
    {
      state: "Rajasthan",
      city: "Jaipur & Jodhpur",
      address: "Near High Court Circle, C-Scheme, Jaipur, Rajasthan 302005 (Also at High Court Principal Bench, Jodhpur)",
      phone: "+91 90532 81218",
      altPhone: "+91 81989 82053",
      court: "Rajasthan High Court (Jaipur & Jodhpur) & District Courts",
    },
    {
      state: "Delhi NCR",
      city: "New Delhi (Supreme Court Chambers)",
      address: "Lawyers Chambers Block, Supreme Court of India & Patiala House Courts, New Delhi 110001",
      phone: "+91 81989 82053",
      altPhone: "+91 90532 81218",
      court: "Supreme Court of India & Delhi High Court",
    },
  ],
};

export const STATE_HUBS: StateLegalHub[] = [
  {
    state: "Haryana",
    tagline: "Punjab & Haryana High Court & 22 District Courts Coverage",
    advocateCount: "Advocates Panel for Haryana",
    leadAdvocate: "Adv. Rajeshwar S. Punia (Senior High Court Advocate)",
    leadExperience: "24 Years Bar Standing",
    primaryCourts: [
      "Punjab & Haryana High Court, Chandigarh",
      "Gurugram District & Sessions Court",
      "Faridabad District Court",
      "Rohtak District & Sessions Court",
      "Hisar District Court",
      "Karnal, Panipat & Sonipat Courts",
      "Panchkula & Ambala Courts",
    ],
    keySpecialties: [
      "Emergency Anticipatory Bail (Sec 438 CrPC / 482 BNSS) in P&H High Court",
      "HRERA Gurugram & HRERA Panchkula Builder Fraud Litigation",
      "Haryana Land Revenue Sanad Takseem & Agricultural Partition Disputes",
      "Quashing of FIR under Section 482 CrPC (Matrimonial & Financial)",
      "Panchayati Raj & Municipal Corporation Election Petitions",
    ],
    stateLawsAndActs: [
      "Punjab Land Revenue Act 1887 (Applicable in Haryana)",
      "Real Estate (Regulation and Development) Act - HRERA Rules",
      "Haryana Urban Development Authority (HSVP) Regulations",
      "Punjab Village Common Lands (Regulation) Act 1961",
      "Bharatiya Nagarik Suraksha Sanhita (BNSS) & CrPC",
    ],
    jurisdictionAnalysis: "Haryana features active industrial and corporate hubs in Gurugram, Faridabad, and Sonipat alongside extensive rural agricultural revenue jurisdictions. Our advocates in Haryana provide courtroom appearances in Gurugram and High Court motion filings in Chandigarh for interim protection against coercive action.",
    seoFocusPoints: [
      "Criminal defense lawyer Gurugram District Court",
      "Bail advocate Punjab and Haryana High Court Chandigarh",
      "HRERA Gurugram delayed possession refund lawyer",
      "Haryana agricultural land partition dispute advocates",
      "Anticipatory bail in Hisar, Rohtak, Faridabad court",
    ],
  },
  {
    state: "Uttar Pradesh",
    tagline: "Allahabad High Court, Lucknow Bench & Western UP Trial Courts",
    advocateCount: "Advocates Panel for Uttar Pradesh",
    leadAdvocate: "Adv. Vikram Singh Punia (High Court & Appellate Specialist)",
    leadExperience: "22 Years Bar Standing",
    primaryCourts: [
      "Allahabad High Court (Principal Bench, Prayagraj)",
      "Allahabad High Court (Lucknow Bench)",
      "Gautam Buddha Nagar District Court (Surajpur, Greater Noida)",
      "Ghaziabad District & Sessions Court",
      "Meerut District Court",
      "Agra, Kanpur Nagar & Varanasi District Courts",
      "Lucknow Civil Court",
    ],
    keySpecialties: [
      "Urgent High Court Bail & Criminal Appeals in Prayagraj & Lucknow",
      "UP Revenue Code 2006 (Gata Partition, Khatauni Rectification & Mutation)",
      "UP Gangsters Act & Anti-Social Activities Defense",
      "UP RERA (Greater Noida & Lucknow) Flat Buyer Adjudication",
      "Commercial Contract Breach & Government Tender Arbitration",
    ],
    stateLawsAndActs: [
      "Uttar Pradesh Revenue Code 2006",
      "UP Gangsters and Anti-Social Activities (Prevention) Act 1986",
      "UP Real Estate Regulatory Authority (UP-RERA) Regulations",
      "UP Zamindari Abolition and Land Reforms Act (Historical matters)",
      "Negotiable Instruments Act (Section 138 UP District Trials)",
    ],
    jurisdictionAnalysis: "In Uttar Pradesh, procedural swiftness before the Hon'ble Allahabad High Court and district sessions is pivotal. Our senior advocates represent clients facing state enactments, false FIRs, revenue appeals, and real estate disputes in Greater Noida and Ghaziabad.",
    seoFocusPoints: [
      "High Court advocate in Allahabad for Bail",
      "Criminal lawyer in Surajpur Greater Noida Court",
      "UP RERA flat possession execution lawyer Lucknow",
      "UP Revenue Code 2006 land dispute advocate",
      "Anticipatory bail advocate in Ghaziabad Meerut Court",
    ],
  },
  {
    state: "Rajasthan",
    tagline: "Rajasthan High Court (Jodhpur & Jaipur) & Division Benches",
    advocateCount: "Advocates Panel for Rajasthan",
    leadAdvocate: "Adv. Mahaveer Punia (High Court Trial & Writ Counsel)",
    leadExperience: "20 Years Bar Standing",
    primaryCourts: [
      "Rajasthan High Court (Principal Seat, Jodhpur)",
      "Rajasthan High Court (Jaipur Bench)",
      "Jaipur District & Sessions Courts (Session & Metropolitan)",
      "Jodhpur Metropolitan & District Court",
      "Alwar District Court (NCR Division)",
      "Kota, Udaipur & Bikaner District Courts",
      "Sikar & Jhunjhunu Sessions Courts",
    ],
    keySpecialties: [
      "Bail matters before Rajasthan High Court Jaipur & Jodhpur",
      "Rajasthan Tenancy Act 1955 & Khatedari Rights Litigation",
      "Anti-Corruption Bureau (ACB) & Prevention of Corruption Act Defense",
      "Raj RERA Jaipur Buyer-Builder Disputes & RERA Appellate Tribunal",
      "Mining Leases, Marble & Mineral Concession Legal Appeals",
    ],
    stateLawsAndActs: [
      "Rajasthan Tenancy Act 1955",
      "Rajasthan Land Revenue Act 1956",
      "Mines and Minerals (Development and Regulation) Act (MMDR)",
      "Rajasthan Rent Control Act 2001",
      "Prevention of Corruption Act 1988 (Special Courts in Rajasthan)",
    ],
    jurisdictionAnalysis: "Rajasthan's legal landscape spans mining disputes, revenue land claims under the Rajasthan Tenancy Act, and criminal litigation across Jaipur, Jodhpur, and Shekhawati regions. Punia Associates coordinates trial and High Court appellate strategies with local bar presence.",
    seoFocusPoints: [
      "Advocate representation in Rajasthan High Court Jaipur Bench",
      "Bail lawyer in Jodhpur High Court",
      "Rajasthan Tenancy Act Khatedari land dispute advocate",
      "Criminal defense lawyer in Jaipur Session Court",
      "Raj RERA Jaipur real estate dispute advocate",
    ],
  },
  {
    state: "Delhi NCR",
    tagline: "Supreme Court of India & All Delhi District Courts",
    advocateCount: "Advocates Panel for Delhi & Supreme Court",
    leadAdvocate: "Adv. S. K. Punia (Advocate-on-Record & Constitutional Litigator)",
    leadExperience: "25 Years Bar Standing",
    primaryCourts: [
      "Supreme Court of India",
      "Delhi High Court (Sher Shah Suri Road)",
      "Patiala House Courts",
      "Saket District Courts",
      "Tis Hazari Courts Complex",
      "Dwarka & Rohini District Courts",
      "Karkardooma Courts",
    ],
    keySpecialties: [
      "Special Leave Petitions (SLP Criminal & Civil) in Supreme Court",
      "Inter-state Transfer Petitions (Matrimonial & Criminal cases)",
      "Section 482 Quashing Petitions in Delhi High Court",
      "Economic Offences Wing (EOW), CBI & ED Bail Petitions",
      "National Company Law Tribunal (NCLT) & NCLAT Corporate Insolvency",
    ],
    stateLawsAndActs: [
      "Constitution of India (Articles 32, 136, 139A, 226)",
      "Insolvency and Bankruptcy Code (IBC) 2016",
      "Prevention of Money Laundering Act (PMLA) 2002",
      "Commercial Courts Act 2015",
      "Arbitration and Conciliation Act 1996",
    ],
    jurisdictionAnalysis: "Serving as the strategic apex for our Haryana, UP, and Rajasthan clients. When High Courts decline relief, our Supreme Court team prepares SLPs to secure appropriate interim stay orders and bail hearings.",
    seoFocusPoints: [
      "Supreme Court of India SLP lawyer",
      "Criminal defense advocate Delhi High Court",
      "Transfer petition lawyer Supreme Court Haryana UP Rajasthan",
      "Economic offences EOW bail lawyer Delhi",
      "NCLT insolvency corporate advocate Delhi NCR",
    ],
  },
];

export const LEGAL_CATEGORIES: LegalServiceCategory[] = [
  {
    id: "bail-advocacy",
    title: "Regular & Anticipatory Bail Advocacy",
    hindiTitle: "जमानत एवं अग्रिम जमानत (Bail)",
    shortDesc: "Immediate legal defense to secure bail in Sessions Courts, High Courts & Supreme Court under CrPC & BNSS.",
    fullDesc: "Getting arrested or anticipating an imminent police arrest is a life-altering crisis. Punia Associates operates an emergency 24/7 Bail Desk across Haryana, Uttar Pradesh, and Rajasthan. We draft and argue anticipatory bail petitions (Section 438 CrPC / Section 482 BNSS) and regular bail (Section 439 CrPC / Section 483 BNSS) with proven precedents.",
    sectionsAndActs: [
      "Section 438 CrPC / Sec 482 BNSS (Anticipatory Bail)",
      "Section 439 CrPC / Sec 483 BNSS (Regular Bail)",
      "Section 167(2) CrPC (Default / Statutory Bail)",
      "Interim Protection & Stay of Arrest Writs",
    ],
    statesCovered: ["Haryana", "Uttar Pradesh", "Rajasthan", "Delhi NCR"],
    urgency: "24/7 Emergency",
    freeConsultationOffer: "100% Free Initial Bail Eligibility & Case Merit Review",
  },
  {
    id: "criminal-defense",
    title: "Criminal Defense & Trial Litigation",
    hindiTitle: "आपराधिक मुकदमों की पैरवी (Criminal Defense)",
    shortDesc: "Aggressive courtroom defense for Murder, Attempt, NDPS, POCSO, Cheating, Cyber Crime & Arms Act.",
    fullDesc: "Criminal allegations require razor-sharp cross-examination, evidentiary scrutiny, and constitutional defense. With over 20 years of criminal trial experience, our advocates examine police FIRs, call detail records (CDR), forensic reports, and eyewitness contradictions to secure discharges and acquittals.",
    sectionsAndActs: [
      "Bharatiya Nyaya Sanhita (BNS) & IPC 302, 307, 420, 406",
      "NDPS Act (Commercial & Intermediate Quantity)",
      "POCSO Act & Juvenile Justice Board Defense",
      "Arms Act & Gangsters Act Trials",
      "Section 482 CrPC FIR Quashing in High Court",
    ],
    statesCovered: ["Haryana", "Uttar Pradesh", "Rajasthan", "Delhi NCR"],
    urgency: "24/7 Emergency",
    freeConsultationOffer: "Free Charge-Sheet & FIR Legal Analysis",
  },
  {
    id: "contracts-commercial",
    title: "Contract, Commercial & Business Agreements",
    hindiTitle: "अनुबंध, कॉर्पोरेट एवं व्यापारिक विवाद (Contracts)",
    shortDesc: "Commercial contract drafting, breach of contract suits, arbitration, partnership disputes & specific performance.",
    fullDesc: "Business agreements require airtight drafting to prevent costly litigation. When breaches occur, Punia Associates enforces contractual remedies through Section 9 Interim Measures, Section 11 Arbitrator Appointments, and Commercial Court summary suits across Gurugram, Noida, Jaipur, and Delhi.",
    sectionsAndActs: [
      "Indian Contract Act 1872",
      "Specific Relief Act 1963",
      "Arbitration and Conciliation Act 1996",
      "Commercial Courts Act 2015",
      "Partnership Act & Companies Act 2013",
    ],
    statesCovered: ["Haryana", "Uttar Pradesh", "Rajasthan", "Delhi NCR"],
    urgency: "High Priority",
    freeConsultationOffer: "Free Agreement Clause & Dispute Viability Check",
  },
  {
    id: "property-land-revenue",
    title: "Property, Land & Revenue Litigation",
    hindiTitle: "जमीन, संपत्ति एवं राजस्व विवाद (Land & Property)",
    shortDesc: "Agricultural land partition (Takseem), Gata disputes, illegal possession, mutation, registry cancellation & boundary demarcation.",
    fullDesc: "Land disputes across Haryana, UP, and Rajasthan involve intricate revenue laws. Our veteran revenue advocates represent farmers, families, and builders before Tehsildar, Sub-Divisional Magistrate (SDM), Revenue Board, Collector, and High Courts for clear title declaration, partition, and injunction.",
    sectionsAndActs: [
      "Punjab Land Revenue Act 1887 (Haryana)",
      "UP Revenue Code 2006 (Gata Partition & Khatauni)",
      "Rajasthan Tenancy Act 1955 & Land Revenue Act 1956",
      "Transfer of Property Act 1882",
      "Specific Relief Act (Permanent Injunction)",
    ],
    statesCovered: ["Haryana", "Uttar Pradesh", "Rajasthan", "Delhi NCR"],
    urgency: "High Priority",
    freeConsultationOffer: "Free Land Registry & Revenue Record Verification",
  },
  {
    id: "matrimonial-family",
    title: "Matrimonial, Family & Divorce Law",
    hindiTitle: "पारिवारिक एवं वैवाहिक विवाद (Matrimonial & Divorce)",
    shortDesc: "Mutual consent divorce, contested divorce, Section 498A defense, Section 125 CrPC maintenance, child custody & domestic violence.",
    fullDesc: "Matrimonial disputes demand both empathy and strategic legal toughness. We provide discrete counsel for mutual consent divorce under Section 13B, contested divorce on grounds of cruelty/desertion, defense against fabricated 498A dowry allegations, and child custody arrangements.",
    sectionsAndActs: [
      "Hindu Marriage Act 1955 (Sec 13, 13B, 24, 25)",
      "Special Marriage Act 1954",
      "Section 125 CrPC (Maintenance for Wife & Children)",
      "Protection of Women from Domestic Violence Act 2005",
      "Guardians and Wards Act 1890 (Child Custody)",
    ],
    statesCovered: ["Haryana", "Uttar Pradesh", "Rajasthan", "Delhi NCR"],
    urgency: "Standard Advisory",
    freeConsultationOffer: "Free Matrimonial Settlement & Rights Guidance",
  },
  {
    id: "cheque-bounce-recovery",
    title: "Cheque Bounce (Sec 138 NI Act) & Debt Recovery",
    hindiTitle: "चेक बाउंस एवं रिकवरी (Section 138 NI Act)",
    shortDesc: "Fast-track recovery under Section 138 Negotiable Instruments Act, legal notice drafting, summary recovery suits & mediation.",
    fullDesc: "Dishonored cheques disrupt business liquidity. We serve mandatory 15-day statutory legal notices within 30 days of memo receipt and file complaints before Metropolitan/Judicial Magistrates. We also represent accused individuals in establishing absence of legally enforceable debt.",
    sectionsAndActs: [
      "Section 138 Negotiable Instruments Act 1881",
      "Section 141 NI Act (Company & Director Liability)",
      "Section 143A NI Act (Interim 20% Compensation)",
      "Order 37 CPC (Summary Money Recovery Suit)",
    ],
    statesCovered: ["Haryana", "Uttar Pradesh", "Rajasthan", "Delhi NCR"],
    urgency: "High Priority",
    freeConsultationOffer: "Free 15-Day Statutory Notice Review",
  },
  {
    id: "rera-consumer-law",
    title: "RERA Real Estate & Consumer Disputes",
    hindiTitle: "रेरा एवं उपभोक्ता विवाद (RERA & Consumer)",
    shortDesc: "Flat delayed possession, refund with interest, builder fraud, HRERA Gurugram, UP RERA & Raj RERA litigation.",
    fullDesc: "Homebuyers in Gurugram, Noida, Greater Noida, and Jaipur face project abandonment and unfulfilled promises. We represent flat buyers before HRERA (Gurugram/Panchkula), UP-RERA, Raj-RERA, and the National Consumer Commission (NCDRC) for possession recovery and compensation.",
    sectionsAndActs: [
      "Section 18 RERA (Refund with Interest for Delay)",
      "Section 31 RERA (Complaint for Violations)",
      "Consumer Protection Act 2019",
      "Insolvency and Bankruptcy Code (Homebuyers as Financial Creditors)",
    ],
    statesCovered: ["Haryana", "Uttar Pradesh", "Rajasthan", "Delhi NCR"],
    urgency: "High Priority",
    freeConsultationOffer: "Free Builder-Buyer Agreement (BBA) Audit",
  },
  {
    id: "service-employment",
    title: "Service, Government Employment & CAT",
    hindiTitle: "सेवा एवं सरकारी नौकरी विवाद (Service Law & CAT)",
    shortDesc: "Government employee promotion disputes, wrongful termination, suspension revocation, pension & Armed Forces Tribunal (AFT).",
    fullDesc: "Serving central and state government employees across Haryana, UP, and Rajasthan. We file Original Applications (OAs) in Central Administrative Tribunal (CAT) Principal Bench Delhi, Chandigarh Bench, and Allahabad Bench, as well as High Court writ petitions against arbitrary disciplinary inquiries.",
    sectionsAndActs: [
      "Administrative Tribunals Act 1985 (CAT)",
      "Armed Forces Tribunal Act 2007 (AFT)",
      "Article 309, 310, 311 of the Constitution of India",
      "Central Civil Services (CCA) Rules 1965",
    ],
    statesCovered: ["Haryana", "Uttar Pradesh", "Rajasthan", "Delhi NCR"],
    urgency: "Standard Advisory",
    freeConsultationOffer: "Free Service Seniority & Disciplinary Order Review",
  },
  {
    id: "international-arbitration",
    title: "International Arbitration & Cross-Border Disputes",
    hindiTitle: "अंतर्राष्ट्रीय मध्यस्थता एवं विदेशी अवार्ड (International Arbitration)",
    shortDesc: "SIAC, ICC, LCIA, DIAC & UNCITRAL international commercial arbitrations, Emergency Arbitrator reliefs, and foreign award enforcement in India.",
    fullDesc: "Punia Associates represents multinational corporations, joint venture partners, and Indian enterprises in India-seated and foreign-seated International Commercial Arbitrations (SIAC, ICC, LCIA, HKIAC, DIAC), Section 9 interim asset freezes, Section 11 Supreme Court appointments, and Part II New York Convention award enforcement.",
    sectionsAndActs: [
      "Arbitration and Conciliation Act 1996 (Part I & Part II)",
      "SIAC, ICC, LCIA & UNCITRAL Arbitration Rules",
      "New York Convention on Foreign Arbitral Awards 1958",
      "Commercial Courts Act 2015 & Bilateral Investment Treaties (BIT)",
    ],
    statesCovered: ["Delhi NCR", "Haryana", "Uttar Pradesh", "Rajasthan"],
    urgency: "High Priority",
    freeConsultationOffer: "Free Arbitration Clause & Foreign Award Enforcement Appraisal",
  },
  {
    id: "mergers-acquisitions",
    title: "Mergers & Acquisitions (M&A), Private Equity & NCLT",
    hindiTitle: "विलय एवं अधिग्रहण, एनसीएलटी एवं कॉर्पोरेट सौदे (M&A & PE)",
    shortDesc: "End-to-end M&A deal structuring, Legal Due Diligence, Share/Asset Purchase Agreements, NCLT Schemes (Sec 230-234), CCI & FEMA.",
    fullDesc: "Our Corporate M&A and Transactional practice advises strategic acquirers, promoters, startups, and private equity investors on inbound/outbound mergers, slump sales, joint ventures, shareholder agreements, CCI combination filings, SEBI takeover compliance, and IBC distressed acquisitions before NCLT.",
    sectionsAndActs: [
      "Companies Act 2013 (Sections 230–234 Mergers & Fast-Track Schemes)",
      "Competition Act 2002 (CCI Combinations & Deal Value Thresholds)",
      "FEMA Cross-Border Merger Regulations 2018 & FDI Policy",
      "Insolvency and Bankruptcy Code (IBC) 2016 Distressed M&A",
    ],
    statesCovered: ["Delhi NCR", "Haryana", "Uttar Pradesh", "Rajasthan"],
    urgency: "High Priority",
    freeConsultationOffer: "Free M&A Term Sheet, Due Diligence & NCLT Scheme Review",
  },
];

export const NETWORK_ADVOCATES: NetworkAdvocate[] = [
  {
    id: "adv-rajeshwar-punia",
    name: "Adv. Rajeshwar S. Punia",
    designation: "Senior Advocate | Managing Partner (Haryana Head)",
    state: "Haryana",
    primaryCourt: "Punjab & Haryana High Court, Chandigarh & Gurugram Court",
    experienceYears: 24,
    specialization: ["Criminal Defense", "Anticipatory Bail", "HRERA Disputes", "Land Revenue"],
    education: "LL.M. (Criminal Jurisprudence), Kurukshetra University; B.A. LL.B., Campus Law Centre",
    barEnrollment: "Bar Council of Punjab & Haryana (P/1988/2002)",
    phone: "+91 90532 81218",
    freeConsultationAvailable: true,
  },
  {
    id: "adv-vikram-punia",
    name: "Adv. Vikram Singh Punia",
    designation: "Senior Advocate | Appellate Counsel (UP Head)",
    state: "Uttar Pradesh",
    primaryCourt: "Allahabad High Court (Prayagraj & Lucknow) & Surajpur Noida",
    experienceYears: 22,
    specialization: ["High Court Bail", "UP Revenue Code", "Gangsters Act", "UP RERA"],
    education: "LL.B., Faculty of Law, University of Allahabad",
    barEnrollment: "Bar Council of Uttar Pradesh (UP/2412/2004)",
    phone: "+91 81989 82053",
    freeConsultationAvailable: true,
  },
  {
    id: "adv-mahaveer-punia",
    name: "Adv. Mahaveer Punia",
    designation: "Senior Advocate | Trial & Writ Counsel (Rajasthan Head)",
    state: "Rajasthan",
    primaryCourt: "Rajasthan High Court (Jaipur Bench & Jodhpur)",
    experienceYears: 20,
    specialization: ["High Court Writs", "Rajasthan Tenancy Act", "ACB Defense", "Mining Leases"],
    education: "LL.M., University of Rajasthan, Jaipur",
    barEnrollment: "Bar Council of Rajasthan (R/1844/2006)",
    phone: "+91 90532 81218",
    freeConsultationAvailable: true,
  },
  {
    id: "adv-sk-punia",
    name: "Adv. Surender K. Punia",
    designation: "Advocate-on-Record | Supreme Court of India",
    state: "Delhi NCR",
    primaryCourt: "Supreme Court of India & Delhi High Court",
    experienceYears: 25,
    specialization: ["Special Leave Petitions (SLP)", "Transfer Petitions", "Constitutional Writs", "EOW / CBI"],
    education: "LL.B., Faculty of Law, Delhi University; Advocate-on-Record (AOR)",
    barEnrollment: "Supreme Court Bar Association (SCBA / Delhi Bar Council)",
    phone: "+91 81989 82053",
    freeConsultationAvailable: true,
  },
  {
    id: "adv-anita-punia",
    name: "Adv. Anita Punia",
    designation: "Partner | Matrimonial & Family Dispute Head",
    state: "Haryana",
    primaryCourt: "Gurugram Family Courts, Faridabad & P&H High Court",
    experienceYears: 18,
    specialization: ["Divorce 13B", "498A Dowry Defense", "Child Custody", "Domestic Violence"],
    education: "LL.B., Maharshi Dayanand University (MDU Rohtak)",
    barEnrollment: "Bar Council of Punjab & Haryana",
    phone: "+91 90532 81218",
    freeConsultationAvailable: true,
  },
  {
    id: "adv-devender-punia",
    name: "Adv. Devender Punia",
    designation: "Partner | Commercial Arbitration & Contracts",
    state: "Uttar Pradesh",
    primaryCourt: "Commercial Courts Noida, Ghaziabad & NCLT Delhi",
    experienceYears: 19,
    specialization: ["Commercial Contracts", "Arbitration Act", "IBC Insolvency", "Section 138 NI"],
    education: "LL.B., CCS University, Meerut",
    barEnrollment: "Bar Council of Uttar Pradesh",
    phone: "+91 81989 82053",
    freeConsultationAvailable: true,
  },
];

export const CASE_PREPARED_RESULTS: CasePrecedent[] = [
  {
    id: "prec-1",
    court: "Punjab & Haryana High Court, Chandigarh",
    state: "Haryana",
    matterType: "Anticipatory Bail (FIR No. 248 under Sec 420/406/467 IPC)",
    summary: "Commercial transaction falsely implicated as criminal cheating over industrial land sale in Gurugram.",
    reliefGranted: "Full Pre-Arrest Bail Granted with blanket protection from coercive action.",
    year: "2025",
  },
  {
    id: "prec-2",
    court: "Allahabad High Court, Prayagraj",
    state: "Uttar Pradesh",
    matterType: "UP Gangsters Act Bail & Quashing (Criminal Misc Writ No. 8914)",
    summary: "Client falsely included in gang-chart based on single resolved property dispute in Gautam Buddha Nagar.",
    reliefGranted: "Bail Granted & Gangster proceedings stayed by Division Bench.",
    year: "2025",
  },
  {
    id: "prec-3",
    court: "Rajasthan High Court, Jaipur Bench",
    state: "Rajasthan",
    matterType: "Rajasthan Tenancy Act Land Mutation & Partition Appeal",
    summary: "Illegal cancellation of Khatedari agricultural rights of farmers across 45 bighas in Alwar district.",
    reliefGranted: "Board of Revenue order quashed; Khatedari ownership restored in revenue jamabandi.",
    year: "2024",
  },
  {
    id: "prec-4",
    court: "Supreme Court of India, New Delhi",
    state: "Delhi NCR",
    matterType: "Special Leave Petition (Criminal SLP No. 1104/2026)",
    summary: "Urgent challenge against High Court order denying regular bail in multi-crore GST invoice matter.",
    reliefGranted: "Supreme Court granted regular bail citing parity and prolonged custody without trial.",
    year: "2026",
  },
  {
    id: "prec-5",
    court: "Haryana Real Estate Regulatory Authority (HRERA Gurugram)",
    state: "Haryana",
    matterType: "HRERA Complaint for 6-Year Delayed Luxury Project",
    summary: "Real estate promoter failed to deliver possession of Sector 65 apartment booked in 2018.",
    reliefGranted: "Order directing full refund of ₹1.85 Crores along with SBI MCLR + 2% interest.",
    year: "2024",
  },
  {
    id: "prec-6",
    court: "District Court, Ghaziabad",
    state: "Uttar Pradesh",
    matterType: "Section 138 NI Act Cheque Bounce Defense",
    summary: "Fraudulent presentation of blank security cheque issued for machinery lease in 2021.",
    reliefGranted: "Hon'ble Court acquitted accused with finding of no enforceable legal liability.",
    year: "2025",
  },
];

export const STATE_ARTICLES: StateArticle[] = [
  {
    id: "haryana-bail-guide",
    state: "Haryana",
    title: "How to Obtain Anticipatory Bail in Punjab & Haryana High Court: Step-by-Step Procedure",
    slug: "anticipatory-bail-punjab-haryana-high-court",
    readTime: "6 min read",
    author: "Adv. Rajeshwar S. Punia",
    excerpt: "Complete guide on filing Section 438 CrPC / Section 482 BNSS anticipatory bail before Sessions Courts in Gurugram, Faridabad, Rohtak and the Hon'ble High Court at Chandigarh.",
    keywords: ["anticipatory bail haryana", "punjab and haryana high court bail advocate", "bail lawyer gurugram", "stay of arrest chandigarh"],
    content: [
      "1. Ground of Apprehension: Under Section 438 CrPC (and corresponding Section 482 BNSS), an applicant must demonstrate reasonable apprehension of arrest in a non-bailable offence.",
      "2. Jurisdiction Protocol: While concurrent jurisdiction exists between the Sessions Court and High Court, practice in Haryana dictates approaching the District & Sessions Court (e.g. Gurugram, Faridabad, Rohtak) first unless special emergency circumstances exist.",
      "3. Interim Protection (Notice of Motion): Upon listing in the High Court, our senior counsel requests interim protection against arrest subject to joining police investigation.",
      "4. Cooperation with Investigating Officer (IO): The applicant joins investigation at the relevant police station, and an affidavit of compliance is filed before the court.",
    ],
  },
  {
    id: "up-revenue-guide",
    state: "Uttar Pradesh",
    title: "Resolving Gata Land & Agricultural Property Disputes Under UP Revenue Code 2006",
    slug: "up-revenue-code-gata-land-disputes",
    readTime: "7 min read",
    author: "Adv. Vikram Singh Punia",
    excerpt: "Understand partition of agricultural holdings (Section 116), boundary demarcation (Section 24), and mutation correction under the modern UP Revenue Code.",
    keywords: ["UP revenue code 2006", "gata partition noida", "khatauni mutation advocate up", "allahabad high court land revenue"],
    content: [
      "1. Section 116 Suit for Partition: Essential for dividing ancestral agricultural holdings into distinct Kurras (shares) with map allocation before the Sub-Divisional Officer (SDO).",
      "2. Boundary Demarcation under Section 24: When neighboring landowners encroach upon boundaries, an application with revenue fee is filed for official demarcation by Revenue Inspector / Kanoongo.",
      "3. Mutation Rectification under Section 34/35: Ensures succession names are updated in Khatauni records within statutory time limits to prevent fraudulent third-party sale deeds.",
      "4. Appeal to Commissioner and Revenue Board: Challenging illegal SDO orders before the Additional Commissioner and Board of Revenue, UP.",
    ],
  },
  {
    id: "rajasthan-tenancy-guide",
    state: "Rajasthan",
    title: "Protecting Khatedari Land Rights under Rajasthan Tenancy Act 1955",
    slug: "rajasthan-tenancy-act-khatedari-rights",
    readTime: "6 min read",
    author: "Adv. Mahaveer Punia",
    excerpt: "Crucial legal steps to defend Khatedari tenure, prevent unlawful eviction (Section 183), and challenge discriminatory revenue entries in Jaipur and Jodhpur.",
    keywords: ["rajasthan tenancy act 1955", "khatedari land dispute jaipur", "board of revenue jodhpur", "land lawyer rajasthan"],
    content: [
      "1. Declaratory Suits under Section 88: Establishes undisputed title and Khatedari tenancy rights when the Tehsildar or opposing party disputes continuous possession.",
      "2. Suit for Injunction under Section 188: Immediate relief preventing opposing parties from disturbing quiet possession or harvesting crops pending suit.",
      "3. Land Partition under Section 53: Formal division of agricultural joint holdings among co-tenants by metes and bounds.",
      "4. Revenue Board Appeals in Ajmer: Apex appellate jurisdiction under the Rajasthan Land Revenue Act for revising flawed subordinate revenue orders.",
    ],
  },
];

export const SEO_FAQS = [
  {
    question: "How can I get a 100% Free Consultation with an expert advocate at Punia Associates?",
    answer: "You can click on 'Talk to an Expert for FREE' on puniaassociates.site, enter your phone number, state (Haryana, UP, or Rajasthan), and select your legal problem (Bail, Criminal, Land, Family, or Contract). Our senior advocate reviews your facts and contacts you within 15 to 30 minutes at zero consultation fee.",
  },
  {
    question: "Do you handle emergency bail petitions in Punjab & Haryana High Court and Allahabad High Court?",
    answer: "Yes. We operate an emergency 24/7 Bail Desk. For urgent arrests in Haryana, our Chandigarh team drafts and files interim protection petitions in the Punjab & Haryana High Court. In Uttar Pradesh, our Prayagraj (Allahabad) and Lucknow teams move urgent mentionings before the Hon'ble High Court benches.",
  },
  {
    question: "How does the Punia Associates advocate network operate across Haryana, UP, and Rajasthan?",
    answer: "Punia Associates features a collaborative network of experienced senior advocates, trial lawyers, and legal consultants with over 20 years of active courtroom advocacy across High Courts, District & Sessions Courts, and the Supreme Court of India.",
  },
  {
    question: "What is the procedure for solving builder delay issues in HRERA Gurugram or UP RERA?",
    answer: "We file a formal complaint under Section 31 of RERA before the relevant Authority (HRERA Gurugram or UP RERA Greater Noida/Lucknow). Under Section 18, homebuyers are entitled to full refund of amount paid along with interest at SBI highest marginal cost of funds (MCLR) + 2% per annum, or monthly delay penalty.",
  },
  {
    question: "How do you handle agricultural land disputes (Sanad Takseem / Gata Partition)?",
    answer: "We handle partition, mutation, boundary disputes, and registry cancellation under the Punjab Land Revenue Act in Haryana, UP Revenue Code 2006 in Uttar Pradesh, and Rajasthan Tenancy Act 1955 in Rajasthan, representing clients from the Tehsildar to the Revenue Board and High Court.",
  },
];
