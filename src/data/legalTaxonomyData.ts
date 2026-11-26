// PUNIA ASSOCIATES — LEGAL TAXONOMY SPECIFICATION (CATEGORIES A TO Q)
// Author: Antigravity Legal-Tech Architecture

export interface LegalSubCategory {
  id: string;
  name: string;
  description?: string;
  documentCount?: number;
}

export interface LegalCategory {
  id: string;
  letter: string;
  name: string;
  slug: string;
  description: string;
  subcategories: LegalSubCategory[];
  isStateSpecific?: boolean;
  jurisdictionScope?: 'All India' | 'State' | 'Central' | 'Both';
  documentCount?: number;
}

export const INITIAL_LEGAL_TAXONOMY: LegalCategory[] = [
  {
    id: "cat-constitutional",
    letter: "A",
    name: "Constitutional Law",
    slug: "constitutional-law",
    description: "Foundational constitutional provisions, fundamental rights, directive principles, governance structures, and writ jurisdiction.",
    jurisdictionScope: "Central",
    subcategories: [
      { id: "sub-coi", name: "Constitution of India" },
      { id: "sub-const-amend", name: "Constitutional Amendments" },
      { id: "sub-fund-rights", name: "Fundamental Rights" },
      { id: "sub-dpsp", name: "Directive Principles" },
      { id: "sub-fund-duties", name: "Fundamental Duties" },
      { id: "sub-union-govt", name: "Union Government" },
      { id: "sub-state-govt", name: "State Government" },
      { id: "sub-parliament", name: "Parliament" },
      { id: "sub-state-leg", name: "State Legislatures" },
      { id: "sub-judiciary", name: "Judiciary" },
      { id: "sub-const-auth", name: "Constitutional Authorities" },
      { id: "sub-emergency", name: "Emergency Provisions" },
      { id: "sub-federal", name: "Federal Relations" },
      { id: "sub-election", name: "Election Laws" },
      { id: "sub-reservation", name: "Reservation and Social Justice" }
    ]
  },
  {
    id: "cat-criminal",
    letter: "B",
    name: "Criminal Law",
    slug: "criminal-law",
    description: "Substantive offenses, criminal procedure, evidence, bail, investigation, trials, and special penal statutes.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-bns", name: "Bharatiya Nyaya Sanhita, 2023" },
      { id: "sub-bnss", name: "Bharatiya Nagarik Suraksha Sanhita, 2023" },
      { id: "sub-bsa", name: "Bharatiya Sakshya Adhiniyam, 2023" },
      { id: "sub-ipc-hist", name: "Indian Penal Code, 1860 (Historical / Transitional)" },
      { id: "sub-crpc-hist", name: "Code of Criminal Procedure, 1973 (Historical / Transitional)" },
      { id: "sub-iea-hist", name: "Indian Evidence Act, 1872 (Historical / Transitional)" },
      { id: "sub-special-crim", name: "Special Criminal Laws" },
      { id: "sub-bail", name: "Bail & Anticipatory Bail" },
      { id: "sub-arrest", name: "Arrest & Custody" },
      { id: "sub-investigation", name: "Investigation & Chargesheet" },
      { id: "sub-trial", name: "Trial & Prosecution" },
      { id: "sub-sentencing", name: "Sentencing & Appeals" },
      { id: "sub-jjb", name: "Juvenile Justice Act" },
      { id: "sub-pocso", name: "POCSO Act" },
      { id: "sub-ndps", name: "NDPS Act" },
      { id: "sub-pca", name: "Prevention of Corruption Act" },
      { id: "sub-pmla", name: "Money Laundering (PMLA)" },
      { id: "sub-cybercrime", name: "Cybercrime & IT Offenses" },
      { id: "sub-prisons", name: "Prison & Correctional Laws" },
      { id: "sub-crim-rules", name: "Criminal Rules and Regulations" }
    ]
  },
  {
    id: "cat-civil",
    letter: "C",
    name: "Civil Law",
    slug: "civil-law",
    description: "Civil procedure, limitation periods, specific performance, property transfer, easements, and court fees.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-cpc", name: "Code of Civil Procedure, 1908" },
      { id: "sub-limitation", name: "Limitation Act, 1963" },
      { id: "sub-sra", name: "Specific Relief Act, 1963" },
      { id: "sub-tpa", name: "Transfer of Property Act, 1882" },
      { id: "sub-easements", name: "Indian Easements Act, 1882" },
      { id: "sub-registration", name: "Registration Act, 1908" },
      { id: "sub-court-fees", name: "Court Fees & Suits Valuation" },
      { id: "sub-suits", name: "Suits and Original Proceedings" },
      { id: "sub-injunctions", name: "Injunctions & Interlocutory Relief" },
      { id: "sub-execution", name: "Execution of Decrees" },
      { id: "sub-appeals-rev", name: "Civil Appeals, Revisions & Reviews" },
      { id: "sub-civil-rules", name: "Civil Court Rules & Practice Directions" }
    ]
  },
  {
    id: "cat-contract-commercial",
    letter: "D",
    name: "Contract and Commercial Law",
    slug: "contract-and-commercial-law",
    description: "Mercantile transactions, partnerships, LLPs, negotiable instruments, domestic/international arbitration, and mediation.",
    jurisdictionScope: "Central",
    subcategories: [
      { id: "sub-ica", name: "Indian Contract Act, 1872" },
      { id: "sub-soga", name: "Sale of Goods Act, 1930" },
      { id: "sub-partnership", name: "Partnership Act, 1932" },
      { id: "sub-llp", name: "Limited Liability Partnership Act, 2008" },
      { id: "sub-ni-act", name: "Negotiable Instruments Act, 1881" },
      { id: "sub-comm-courts", name: "Commercial Courts Act, 2015" },
      { id: "sub-arbitration", name: "Arbitration and Conciliation Act, 1996" },
      { id: "sub-mediation", name: "Mediation Act, 2023" },
      { id: "sub-competition", name: "Competition Act, 2002" },
      { id: "sub-comm-disputes", name: "Contractual & Commercial Disputes" },
      { id: "sub-comm-agreements", name: "Commercial Agreements" },
      { id: "sub-banking-finance", name: "Banking & Finance Laws" }
    ]
  },
  {
    id: "cat-family",
    letter: "E",
    name: "Family Law",
    slug: "family-law",
    description: "Matrimonial disputes, personal status laws, succession, adoption, custody, guardianship, and domestic violence.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-hma", name: "Hindu Marriage Act, 1955" },
      { id: "sub-hsa", name: "Hindu Succession Act, 1956" },
      { id: "sub-hama", name: "Hindu Adoption and Maintenance Act, 1956" },
      { id: "sub-sma", name: "Special Marriage Act, 1954" },
      { id: "sub-gwa", name: "Guardians and Wards Act, 1890" },
      { id: "sub-muslim-law", name: "Muslim Personal Law (Shariat) Application Act" },
      { id: "sub-divorce", name: "Divorce & Judicial Separation" },
      { id: "sub-maintenance", name: "Maintenance & Alimony (125 CrPC / BNSS / HMA)" },
      { id: "sub-dv-act", name: "Protection of Women from Domestic Violence Act, 2005" },
      { id: "sub-dowry", name: "Dowry Prohibition Act, 1961" },
      { id: "sub-family-courts", name: "Family Courts Act, 1984" },
      { id: "sub-adoption-custody", name: "Child Custody and Adoption Regulations" },
      { id: "sub-succession", name: "Succession, Probate and Wills" }
    ]
  },
  {
    id: "cat-property-land",
    letter: "F",
    name: "Property and Land Law",
    slug: "property-and-land-law",
    description: "Real estate transactions, stamp duty, land acquisition, tenancy, revenue records, Haryana land ceiling, and RERA.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-tpa-prop", name: "Transfer of Property Act, 1882" },
      { id: "sub-reg-prop", name: "Registration Act & Rules" },
      { id: "sub-stamp", name: "Indian Stamp Act & State Stamp Rules" },
      { id: "sub-land-acq", name: "Right to Fair Compensation & Transparency in Land Acquisition (RFCTLARR)" },
      { id: "sub-revenue-laws", name: "State Revenue Codes & Land Records" },
      { id: "sub-haryana-revenue", name: "Haryana Land Revenue Act, 1887 & Mutation Manual" },
      { id: "sub-tenancy", name: "Urban & Agricultural Tenancy Laws" },
      { id: "sub-agri-land", name: "Agricultural Land Reforms & Ceiling Laws" },
      { id: "sub-rera", name: "Real Estate (Regulation and Development) Act (RERA)" },
      { id: "sub-housing", name: "Apartment Ownership & Housing Societies Acts" },
      { id: "sub-municipal", name: "Municipal & Urban Local Bodies Acts" },
      { id: "sub-dev-authorities", name: "Development Authority Regulations (HSVP/HUDA/DDA)" },
      { id: "sub-mutation", name: "Land Mutation, Jamabandi & Revenue Records" },
      { id: "sub-title-suits", name: "Possession, Partition & Title Declarations" }
    ]
  },
  {
    id: "cat-company-insolvency",
    letter: "G",
    name: "Company and Insolvency Law",
    slug: "company-and-insolvency-law",
    description: "Corporate formation, governance, SEBI compliance, insolvency resolution (CIRP), liquidation, and NCLT/NCLAT procedures.",
    jurisdictionScope: "Central",
    subcategories: [
      { id: "sub-companies-act", name: "Companies Act, 2013" },
      { id: "sub-ibc", name: "Insolvency and Bankruptcy Code, 2016" },
      { id: "sub-sebi", name: "SEBI Act, Regulations & Circulars" },
      { id: "sub-securities", name: "Securities Contracts (Regulation) Act, 1956" },
      { id: "sub-corp-governance", name: "Corporate Governance & Secretarial Standards" },
      { id: "sub-llp-reg", name: "LLP Rules & Compliances" },
      { id: "sub-winding-up", name: "Winding Up & Dissolution Rules" },
      { id: "sub-nclt-rules", name: "NCLT / NCLAT Rules and Procedures" },
      { id: "sub-corp-compliance", name: "Corporate Filings & RoC Compliances" }
    ]
  },
  {
    id: "cat-labour-employment",
    letter: "H",
    name: "Labour and Employment Law",
    slug: "labour-and-employment-law",
    description: "Industrial relations, 4 Labour Codes, EPF, ESI, gratuity, factory inspections, Haryana local employment, and service contracts.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-labour-codes", name: "4 Central Labour Codes (Wages, IR, Social Security, OSH)" },
      { id: "sub-ir-code", name: "Industrial Relations Code, 2020" },
      { id: "sub-wages-code", name: "Code on Wages, 2019" },
      { id: "sub-social-sec", name: "Code on Social Security, 2020" },
      { id: "sub-osh-code", name: "Occupational Safety, Health and Working Conditions Code, 2020" },
      { id: "sub-factories", name: "Factories Act, 1948" },
      { id: "sub-shops-est", name: "Shops and Commercial Establishments Acts" },
      { id: "sub-epf", name: "Employees' Provident Funds Act, 1952" },
      { id: "sub-esi", name: "Employees' State Insurance Act, 1948" },
      { id: "sub-gratuity", name: "Payment of Gratuity Act, 1972" },
      { id: "sub-ind-disputes", name: "Industrial Disputes Act, 1947" },
      { id: "sub-emp-contracts", name: "Employment Agreements, NDAs & Non-Competes" },
      { id: "sub-haryana-labour", name: "Haryana State Labour Regulations & Domicile Rules" }
    ]
  },
  {
    id: "cat-taxation",
    letter: "I",
    name: "Taxation Law",
    slug: "taxation-law",
    description: "Direct taxes, GST legislation, customs duties, central excise, state vat, tax tribunals, and search & seizure procedures.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-income-tax", name: "Income-tax Act, 1961" },
      { id: "sub-gst", name: "Central GST (CGST) Act, 2017 & State GST Acts" },
      { id: "sub-customs", name: "Customs Act, 1962" },
      { id: "sub-excise", name: "Central Excise & Service Tax Legacy Provisions" },
      { id: "sub-state-tax", name: "State VAT & Stamp Duties" },
      { id: "sub-finance-acts", name: "Annual Finance Acts" },
      { id: "sub-tax-notifications", name: "CBDT & CBIC Circulars / Notifications" },
      { id: "sub-tax-rules", name: "Income Tax & GST Rules" },
      { id: "sub-tax-appeals", name: "ITAT, GSTAT & High Court Tax Appeals" },
      { id: "sub-tax-procedures", name: "Assessment, Search & Seizure Procedures" }
    ]
  },
  {
    id: "cat-consumer-human-rights",
    letter: "J",
    name: "Consumer and Human Rights Law",
    slug: "consumer-and-human-rights-law",
    description: "Consumer disputes, NCDRC/SCDRC/DCDRC forums, Right to Information, senior citizen protection, and legal services aid.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-cpa", name: "Consumer Protection Act, 2019" },
      { id: "sub-consumer-rules", name: "Consumer Protection (E-Commerce & Mediation) Rules" },
      { id: "sub-human-rights", name: "Protection of Human Rights Act, 1993" },
      { id: "sub-rti", name: "Right to Information Act, 2005 (RTI)" },
      { id: "sub-leg-services", name: "Legal Services Authorities Act, 1987 (NALSA/HALSA)" },
      { id: "sub-women-child", name: "Women & Child Protection Laws" },
      { id: "sub-disability", name: "Rights of Persons with Disabilities Act, 2016" },
      { id: "sub-senior-citizens", name: "Maintenance and Welfare of Parents and Senior Citizens Act, 2007" },
      { id: "sub-social-welfare", name: "Social Welfare & Affirmative Action Schemes" }
    ]
  },
  {
    id: "cat-environment-infra",
    letter: "K",
    name: "Environment and Infrastructure Law",
    slug: "environment-and-infrastructure-law",
    description: "Environmental clearance, air/water pollution control, forest conservation, wildlife protection, and National Green Tribunal (NGT).",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-epa", name: "Environment (Protection) Act, 1986" },
      { id: "sub-air-act", name: "Air (Prevention and Control of Pollution) Act, 1981" },
      { id: "sub-water-act", name: "Water (Prevention and Control of Pollution) Act, 1974" },
      { id: "sub-forest", name: "Forest (Conservation) Act & Van Sanrakshan Rules" },
      { id: "sub-wildlife", name: "Wild Life (Protection) Act, 1972" },
      { id: "sub-biodiversity", name: "Biological Diversity Act, 2002" },
      { id: "sub-ngt", name: "National Green Tribunal (NGT) Act & Procedures" },
      { id: "sub-infra-regs", name: "Highways, Energy & Infrastructure Regulations" }
    ]
  },
  {
    id: "cat-ip-technology",
    letter: "L",
    name: "Intellectual Property and Technology Law",
    slug: "intellectual-property-and-technology-law",
    description: "Copyrights, trademarks, patents, designs, Information Technology Act, Digital Personal Data Protection (DPDP), and cyber laws.",
    jurisdictionScope: "Central",
    subcategories: [
      { id: "sub-copyright", name: "Copyright Act, 1957" },
      { id: "sub-trademarks", name: "Trade Marks Act, 1999" },
      { id: "sub-patents", name: "Patents Act, 1970" },
      { id: "sub-designs", name: "Designs Act, 2000" },
      { id: "sub-gi", name: "Geographical Indications of Goods Act, 1999" },
      { id: "sub-it-act", name: "Information Technology Act, 2000" },
      { id: "sub-dpdp", name: "Digital Personal Data Protection Act, 2023 (DPDP)" },
      { id: "sub-intermediary", name: "IT Intermediary Guidelines & Digital Media Ethics" },
      { id: "sub-elec-evidence", name: "Electronic Records & Section 65B/BSA Certification" },
      { id: "sub-privacy-cyber", name: "Cybersecurity & Data Governance Norms" }
    ]
  },
  {
    id: "cat-motor-vehicles",
    letter: "M",
    name: "Motor Vehicle and Transport Law",
    slug: "motor-vehicle-and-transport-law",
    description: "Motor Vehicles Act, motor accident claims tribunal (MACT), vehicular insurance mandates, transport rules, and road safety.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-mva", name: "Motor Vehicles Act, 1988 (Amended 2019)" },
      { id: "sub-mact", name: "Motor Accident Claims Tribunal (MACT) Rules & Case Law" },
      { id: "sub-road-safety", name: "Road Safety & Speed Regulatory Orders" },
      { id: "sub-veh-insurance", name: "Third-Party Insurance Mandates" },
      { id: "sub-transport-rules", name: "State Motor Vehicles Rules & Carrier Norms" },
      { id: "sub-traffic-reg", name: "Traffic Penalties & Electronic Enforcement Rules" }
    ]
  },
  {
    id: "cat-administrative-service",
    letter: "N",
    name: "Administrative and Service Law",
    slug: "administrative-and-service-law",
    description: "Central and State administrative tribunals (CAT/SAT), public recruitment rules, civil service regulations, and disciplinary actions.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-cat", name: "Administrative Tribunals Act, 1985" },
      { id: "sub-central-service", name: "Central Civil Services (Conduct & Leave) Rules" },
      { id: "sub-state-service", name: "State Civil Services Rules" },
      { id: "sub-haryana-service", name: "Haryana Civil Services (HCS) Rules, 2016" },
      { id: "sub-recruitment", name: "Public Service Commission Recruitment Rules" },
      { id: "sub-service-reservation", name: "Roster Points & Service Reservation Norms" },
      { id: "sub-pension", name: "Pension, GPF & Retirement Gratuity Rules" },
      { id: "sub-disciplinary", name: "CCS (CCA) Rules & Departmental Inquiries" },
      { id: "sub-inquiries", name: "Vigilance, Charge-sheets & Inquiry Officer Procedures" },
      { id: "sub-service-appeals", name: "High Court Service Writs under Article 226" }
    ]
  },
  {
    id: "cat-haryana-state",
    letter: "O",
    name: "Haryana and State-Specific Laws",
    slug: "haryana-and-state-specific-laws",
    description: "Dedicated compendium for Haryana State Acts, subordinate rules, municipal laws, panchayati raj, and regional enactments.",
    isStateSpecific: true,
    jurisdictionScope: "State",
    subcategories: [
      { id: "sub-hry-acts", name: "Haryana Legislative Acts" },
      { id: "sub-hry-rules", name: "Haryana Subordinate Rules" },
      { id: "sub-hry-regs", name: "Haryana Statutory Regulations" },
      { id: "sub-hry-notifications", name: "Haryana Gazette Notifications" },
      { id: "sub-hry-orders", name: "Haryana Government Executive Orders" },
      { id: "sub-hry-revenue", name: "Haryana Land Revenue & Tenancy Enactments" },
      { id: "sub-hry-municipal", name: "Haryana Municipal Act & Corporation Act, 1994" },
      { id: "sub-hry-panchayat", name: "Haryana Panchayati Raj Act, 1994" },
      { id: "sub-hry-police", name: "Haryana Police Act, 2007 & Police Rules" },
      { id: "sub-hry-service-rules", name: "Haryana Government Service Rules" },
      { id: "sub-hry-court-rules", name: "Punjab & Haryana High Court Rules & Orders" },
      { id: "sub-punjab-laws", name: "Applicable Punjab Historical Enactments" },
      { id: "sub-other-states", name: "Other State Legislation (Delhi, UP, Rajasthan, etc.)" }
    ]
  },
  {
    id: "cat-court-rules",
    letter: "P",
    name: "Court Rules and Procedures",
    slug: "court-rules-and-procedures",
    description: "Statutory rules governing filings, registry timelines, virtual hearings, practice directions, and tribunal codes.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-sc-rules", name: "Supreme Court Rules, 2013" },
      { id: "sub-hc-rules", name: "High Court Rules & Orders (Vols I-V)" },
      { id: "sub-district-rules", name: "District Court Rules and Circulars" },
      { id: "sub-tribunal-rules", name: "Tribunal Rules (NCLT, NGT, DRT, CAT, ITAT)" },
      { id: "sub-civ-court-proc", name: "Civil Court Manual Procedures" },
      { id: "sub-crim-court-proc", name: "Criminal Courts Manual Procedures" },
      { id: "sub-filing-rules", name: "Registry Scrutiny & Filing Checklists" },
      { id: "sub-practice-dir", name: "Official Judicial Practice Directions" },
      { id: "sub-court-notifs", name: "Court Rosters & Standing Notifications" },
      { id: "sub-efiling", name: "e-Filing & Video Conferencing Rules" }
    ]
  },
  {
    id: "cat-templates-formats",
    letter: "Q",
    name: "Legal Templates and Formats",
    slug: "legal-templates-and-formats",
    description: "Standard drafting templates, court pleadings, affidavits, agreements, petitions, and procedural checklists.",
    jurisdictionScope: "Both",
    subcategories: [
      { id: "sub-tmpl-plaint", name: "Plaint (Civil Suits)" },
      { id: "sub-tmpl-ws", name: "Written Statement (Defense)" },
      { id: "sub-tmpl-repl", name: "Replication & Rejoinder" },
      { id: "sub-tmpl-civ-app", name: "Civil Interlocutory Applications (Order 39, Order 7 Rule 11)" },
      { id: "sub-tmpl-crim-app", name: "Criminal Applications (Section 156(3), CrPC/BNSS)" },
      { id: "sub-tmpl-bail", name: "Regular Bail Applications" },
      { id: "sub-tmpl-ant-bail", name: "Anticipatory Bail Applications" },
      { id: "sub-tmpl-appeals", name: "Memorandum of Civil & Criminal Appeals" },
      { id: "sub-tmpl-revisions", name: "Civil & Criminal Revision Petitions" },
      { id: "sub-tmpl-writs", name: "Writ Petitions (Article 226 / Article 32)" },
      { id: "sub-tmpl-affidavits", name: "Affidavits & Verification Formats" },
      { id: "sub-tmpl-notices", name: "Legal Notices (Section 138 NI Act, Section 80 CPC)" },
      { id: "sub-tmpl-agreements", name: "Commercial & Employment Agreements" },
      { id: "sub-tmpl-sale-deeds", name: "Sale Deeds & Conveyance Formats" },
      { id: "sub-tmpl-lease", name: "Commercial & Residential Lease Deeds" },
      { id: "sub-tmpl-poa", name: "General & Special Power of Attorney (GPA/SPA)" },
      { id: "sub-tmpl-vakalatnama", name: "Standard Court Vakalatnama Formats" },
      { id: "sub-tmpl-evidence-aff", name: "Affidavits in Lieu of Examination-in-Chief" },
      { id: "sub-tmpl-submissions", name: "Written Arguments & Submissions" },
      { id: "sub-tmpl-checklists", name: "Filing Checklists & Scrutiny Guides" }
    ]
  },
  {
    id: "cat-global-law",
    letter: "R",
    name: "Global & International Law",
    slug: "global-international-law",
    description: "Sovereign primary statutes, constitutional charters, model laws, and international conventions across the United States, United Kingdom, Singapore, Australia, Germany, France, Canada, and the United Nations.",
    jurisdictionScope: "All India",
    subcategories: [
      { id: "sub-us-law", name: "United States Federal & Commercial Law" },
      { id: "sub-uk-law", name: "United Kingdom Parliament & Common Law Statutes" },
      { id: "sub-singapore-law", name: "Singapore Statutory & Corporate Codes" },
      { id: "sub-australia-law", name: "Australia Commonwealth Acts & Corporations Law" },
      { id: "sub-germany-law", name: "Germany Basic Law (Grundgesetz) & Civil Codes" },
      { id: "sub-france-law", name: "France Civil Code (Code Napoléon) & Commercial Law" },
      { id: "sub-canada-law", name: "Canada Constitution & Federal Statutes" },
      { id: "sub-un-treaties", name: "United Nations Conventions & International Arbitration (New York Convention / UNCITRAL)" }
    ]
  }
];

export function findCategoryBySlug(slug: string): LegalCategory | undefined {
  return INITIAL_LEGAL_TAXONOMY.find(c => c.slug === slug || c.id === slug);
}

export function getAllCategories(): LegalCategory[] {
  return INITIAL_LEGAL_TAXONOMY;
}
