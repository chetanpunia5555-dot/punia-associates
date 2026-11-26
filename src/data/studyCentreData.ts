export interface LegalShortNote {
  id: string;
  subject: 'Criminal Law (BNS/BNSS)' | 'Civil Procedure (CPC)' | 'Constitutional Law' | 'Evidence (BSA)' | 'Contract & Commercial' | 'Family Law' | 'Property Law';
  title: string;
  topicTag: string;
  statutoryReference: string;
  essentialIngredients: string[];
  keyDistinctions?: {
    conceptA: string;
    conceptB: string;
    points: { basis: string; differenceA: string; differenceB: string }[];
  };
  landmarkPrecedents: { title: string; citation: string; rule: string }[];
  mainsAnswerFramingTips: string[];
  lastUpdated: string;
}

export interface CaseBriefItem {
  id: string;
  caseTitle: string;
  citation: string;
  court: string;
  bench: string;
  decisionDate: string;
  legalSubject: string;
  factsBrief: string[];
  issuesFramed: string[];
  ratioDecidendi: string;
  obiterDicta: string;
  significanceForAdvocatesAndExams: string;
}

export interface CurrentAffairItem {
  id: string;
  category: 'Legal & Judicial' | 'National & Policy' | 'International & Treaties';
  title: string;
  headlineSummary: string;
  eventDate: string;
  publicationDate: string;
  issuingAuthority: string;
  verifiedSourceUrl: string;
  content: string;
  bulletPoints: string[];
  relatedActs?: string[];
}

export const SHORT_NOTES_DATA: LegalShortNote[] = [
  {
    id: 'note-01-anticipatory-bail',
    subject: 'Criminal Law (BNS/BNSS)',
    title: 'Anticipatory Bail: Section 482 BNSS, 2023 (Section 438 CrPC, 1973)',
    topicTag: 'Bail Jurisprudence & Liberty',
    statutoryReference: 'Section 482 of the Bharatiya Nagarik Suraksha Sanhita, 2023',
    essentialIngredients: [
      'Reasonable belief or apprehension of imminent arrest in a non-bailable offence.',
      'Accusation must not be vague; there must be discernible material leading to genuine apprehension.',
      'Application must be preferred before either the High Court or the Court of Session.',
      'Court must balance individual liberty under Article 21 with societal interest in free and fair investigation.',
      'Conditions can be imposed: cooperation with investigation officer, not leaving the country without permission, no tampering with witnesses.'
    ],
    keyDistinctions: {
      conceptA: 'Anticipatory Bail (Sec 482 BNSS)',
      conceptB: 'Regular Bail (Sec 480/483 BNSS)',
      points: [
        {
          basis: 'Timing of Application',
          differenceA: 'Sought prior to actual arrest when arrest is apprehended.',
          differenceB: 'Sought after the person has already been arrested or surrendered into custody.'
        },
        {
          basis: 'Operative Effect',
          differenceA: 'Directs that in the event of arrest, the accused shall be released on bail.',
          differenceB: 'Releases the person from existing physical or judicial custody.'
        },
        {
          basis: 'Forum Jurisdiction',
          differenceA: 'Only Sessions Court or High Court can grant.',
          differenceB: 'Can be granted by Magistrate Court, Sessions Court, or High Court.'
        }
      ]
    },
    landmarkPrecedents: [
      {
        title: 'Gurbaksh Singh Sibbia v. State of Punjab',
        citation: '(1980) 2 SCC 565 (5-Judge Bench)',
        rule: 'Power to grant anticipatory bail is extraordinary; it is not to be cabined within narrow limitations not prescribed by the Legislature.'
      },
      {
        title: 'Sushila Aggarwal v. State (NCT of Delhi)',
        citation: '(2020) 5 SCC 1 (5-Judge Bench)',
        rule: 'Anticipatory bail should not ordinarily be restricted to a specific time period; it can continue till the end of the trial unless special circumstances warrant limitation.'
      }
    ],
    mainsAnswerFramingTips: [
      'Begin answer with Article 21 constitutional underpinning (Personal liberty).',
      'Cite Section 482 BNSS with its predecessor Section 438 CrPC.',
      'Quote Sibbia and Sushila Aggarwal principles on absence of automatic expiry.',
      'Conclude with the 4-fold test: nature of accusation, antecedents of applicant, flight risk, and bona fides of prosecution.'
    ],
    lastUpdated: '2026-10-20'
  },
  {
    id: 'note-02-res-judicata',
    subject: 'Civil Procedure (CPC)',
    title: 'Doctrine of Res Judicata: Section 11 Code of Civil Procedure, 1908',
    topicTag: 'Finality of Litigation',
    statutoryReference: 'Section 11 and Explanations I to VIII of CPC, 1908',
    essentialIngredients: [
      'The matter directly and substantially in issue in the subsequent suit must have been directly and substantially in issue in the former suit.',
      'The former suit must have been between the same parties or between parties under whom they or any of them claim.',
      'The parties must have been litigating under the same title in both suits.',
      'The court which decided the former suit must have been a court competent to try the subsequent suit.',
      'The matter in issue must have been heard and finally decided by the court in the former suit.'
    ],
    keyDistinctions: {
      conceptA: 'Res Judicata (Section 11 CPC)',
      conceptB: 'Res Sub Judice (Section 10 CPC)',
      points: [
        {
          basis: 'Stage of Prior Proceeding',
          differenceA: 'Applies where the former suit has been finally heard and decided.',
          differenceB: 'Applies where the former suit is still pending trial in a competent court.'
        },
        {
          basis: 'Effect on Subsequent Suit',
          differenceA: 'Bars the entire trial and cognizance of the issue permanently.',
          differenceB: 'Only stays the proceedings of the second suit until first suit is disposed.'
        },
        {
          basis: 'Public Policy Objective',
          differenceA: 'Interest reipublicae ut sit finis litium (End to litigation).',
          differenceB: 'Prevents conflicting decrees on the identical subject matter.'
        }
      ]
    },
    landmarkPrecedents: [
      {
        title: 'Daryao v. State of U.P.',
        citation: 'AIR 1961 SC 1457',
        rule: 'The rule of Res Judicata is not a technical rule of procedure but a doctrine of public policy based on common sense and finality of judicial determinations; it applies even to writ petitions under Article 32.'
      },
      {
        title: 'Forward Construction Co. v. Prabhat Mandal',
        citation: '(1986) 1 SCC 100',
        rule: 'Explanation IV (Constructive Res Judicata) applies where any matter might and ought to have been made a ground of defence or attack in the former suit.'
      }
    ],
    mainsAnswerFramingTips: [
      'Define the two Roman maxims: Nemo debet bis vexari pro una et eadem causa and Interest reipublicae ut sit finis litium.',
      'Explain all 5 conditions precedent methodically.',
      'Elaborate Constructive Res Judicata under Explanation IV.',
      'Highlight that Section 11 is not exhaustive (Inherent principles apply even before Tribunals).'
    ],
    lastUpdated: '2026-10-18'
  },
  {
    id: 'note-03-cheque-bounce-presumption',
    subject: 'Contract & Commercial',
    title: 'Statutory Presumptions in Cheque Bounce: Sections 118 & 139 NI Act, 1881',
    topicTag: 'Commercial Negotiable Instruments',
    statutoryReference: 'Sections 138, 139, 118(a) and 143A of Negotiable Instruments Act, 1881',
    essentialIngredients: [
      'Drawing of the cheque by drawer on an account maintained by him for discharge of debt/liability.',
      'Dishonour memo received with endorsement "insufficient funds", "account closed" or "exceeds arrangement".',
      'Demand notice issued within 30 days of intimation from bank.',
      'Failure of drawer to make payment within 15 days of notice service.',
      'Complaint filed within 30 days from accrual of cause of action.'
    ],
    landmarkPrecedents: [
      {
        title: 'Rangappa v. Sri Mohan',
        citation: '(2010) 11 SCC 441 (3-Judge Bench)',
        rule: 'Presumption mandated by Section 139 does include the existence of a legally enforceable debt or liability. The standard of proof to rebut is preponderance of probabilities.'
      },
      {
        title: 'Kalamani Tex v. P. Balasubramanian',
        citation: '(2021) 5 SCC 283',
        rule: 'Once signature on the cheque and execution is admitted, the court is duty bound to raise statutory presumption under Section 139 NI Act in favour of the complainant.'
      }
    ],
    mainsAnswerFramingTips: [
      'Draw the 15-day, 30-day statutory timeline chart clearly.',
      'Clarify that the reverse onus shifts to the accused only after preliminary execution is proved or admitted.',
      'Discuss how the accused can rebut without stepping into the witness box through cross-examination.'
    ],
    lastUpdated: '2026-10-15'
  }
];

export const CASE_BRIEFS_DATA: CaseBriefItem[] = [
  {
    id: 'brief-01-sushila-aggarwal',
    caseTitle: 'Sushila Aggarwal and Others v. State (NCT of Delhi) and Another',
    citation: '(2020) 5 SCC 1 | 2020 INSC 106',
    court: 'Supreme Court of India (Constitution Bench)',
    bench: 'Arun Mishra, Indira Banerjee, Vineet Saran, M.R. Shah, and S. Ravindra Bhat, JJ.',
    decisionDate: '2020-01-29',
    legalSubject: 'Criminal Procedure & Constitutional Liberty (Anticipatory Bail)',
    factsBrief: [
      'A reference was made to a 5-Judge Constitution Bench due to conflicting 3-Judge bench opinions regarding whether anticipatory bail under Section 438 CrPC should be granted only for a limited period.',
      'Earlier judgments in Salauddin Abdulsamad Shaikh (1996) had held that anticipatory bail should be limited in time, which conflicted with the Constitution bench ruling in Gurbaksh Singh Sibbia (1980).'
    ],
    issuesFramed: [
      'Whether the protection granted under Section 438 of the Code of Criminal Procedure should be limited to a fixed period so as to enable the person to surrender before the trial court?',
      'Whether the life of an anticipatory bail order should automatically end when the accused is summoned by the court or charges are framed?'
    ],
    ratioDecidendi: 'The protection granted under Section 438 CrPC does not automatically come to an end upon framing of charges or filing of chargesheet. Anticipatory bail can continue till the conclusion of the trial. Courts are not required to restrict the duration of anticipatory bail to a fixed period unless special features or circumstances exist.',
    obiterDicta: 'Observations were made cautioning that anticipatory bail cannot be wielded as an unbridled blanket license. When an accused refuses to cooperate or where recovery under Section 27 Evidence Act (now BSA Sec 23) is required, the prosecution can move for modification or recall under Section 439(2).',
    significanceForAdvocatesAndExams: 'Foundational authority for all anticipatory bail applications under Section 482 BNSS 2023. Essential for judicial mains answers on bail jurisprudence.'
  },
  {
    id: 'brief-02-arnesh-kumar',
    caseTitle: 'Arnesh Kumar v. State of Bihar & Another',
    citation: '(2014) 8 SCC 273 | AIR 2014 SC 2756',
    court: 'Supreme Court of India',
    bench: 'Chandramauli Kumar Prasad and Pinaki Chandra Ghose, JJ.',
    decisionDate: '2014-07-02',
    legalSubject: 'Criminal Procedure (Arrest Restrictions & Section 41A CrPC)',
    factsBrief: [
      'Petitioner was the husband apprehending arrest in an FIR lodged under Section 498A IPC and Section 4 of Dowry Prohibition Act.',
      'The Supreme Court noticed widespread mechanical arrests of relatives and aged parents without objective satisfaction of investigating officers.'
    ],
    issuesFramed: [
      'Whether police officers can mechanically arrest an accused in offences punishable with imprisonment of seven years or less without recording reasons under Section 41 CrPC?'
    ],
    ratioDecidendi: 'Police officers shall not automatically arrest when a case under Section 498-A IPC or other offences punishable with 7 years or less is registered. Police must satisfy themselves about the necessity for arrest under parameters of Section 41(1)(b). In all other cases, notice of appearance under Section 41A CrPC (now Section 35(3) BNSS) must be served within two weeks.',
    obiterDicta: 'Magistrates authorizing detention without perusing the checklist submitted by police officers shall be liable for departmental action by the High Courts.',
    significanceForAdvocatesAndExams: 'Directly codified into statutory law under Section 35 of Bharatiya Nagarik Suraksha Sanhita, 2023. Prime shield against arbitrary police arrest.'
  },
  {
    id: 'brief-03-afcons-infrastructure',
    caseTitle: 'Afcons Infrastructure Ltd. v. Cherian Varkey Construction Co. (P) Ltd.',
    citation: '(2010) 8 SCC 24',
    court: 'Supreme Court of India',
    bench: 'R.V. Raveendran and J.M. Panchal, JJ.',
    decisionDate: '2010-07-26',
    legalSubject: 'Civil Procedure & Alternate Dispute Resolution (Section 89 CPC)',
    factsBrief: [
      'Dispute arose out of a sub-contract work for construction of bridges. Respondent sued for recovery of ₹2.10 crores and applied under Section 89 CPC to refer the matter to arbitration. Appellants refused consent.'
    ],
    issuesFramed: [
      'What is the procedure to be followed by the court in implementing Section 89 and Order 10 Rule 1A of CPC?',
      'Can a court refer the parties to arbitration without mutual consent under Section 89 CPC?'
    ],
    ratioDecidendi: 'Section 89 CPC must be interpreted harmoniously. The court cannot refer a dispute to private arbitration without the consent of all parties. However, reference to conciliation, mediation, or Lok Adalat does not require prior consent if the court considers the matter fit for ADR.',
    obiterDicta: 'The Supreme Court categorized cases suitable for ADR (commercial, matrimonial, partnership disputes) versus cases unsuitable for ADR (representative suits, election disputes, serious fraud allegations).',
    significanceForAdvocatesAndExams: 'The definitive authority on Section 89 CPC and court-annexed mediation in India.'
  }
];

export const CURRENT_AFFAIRS_DATA: CurrentAffairItem[] = [
  {
    id: 'ca-2026-10-cj-digitisation',
    category: 'Legal & Judicial',
    title: 'Supreme Court Rolls Out Phase-III eCourts Integration Across All District Courts',
    headlineSummary: 'Unified paperless filing, AI-assisted transcription of court proceedings in regional languages, and mandatory e-summons through registered WhatsApp and email addresses.',
    eventDate: '2026-10-24',
    publicationDate: '2026-10-25',
    issuingAuthority: 'e-Committee, Supreme Court of India',
    verifiedSourceUrl: 'https://ecommitteesci.gov.in',
    content: 'The e-Committee of the Supreme Court of India in collaboration with the Department of Justice, Ministry of Law and Justice, has launched the nationwide deployment of Phase-III of the eCourts project. The flagship rollout equips district courts across Haryana, Punjab, Uttar Pradesh, Rajasthan, and Delhi with certified cloud-based virtual hearings and automated digital cause list synchronization.',
    bulletPoints: [
      'Bilingual transcription system enables real-time deposition recording in Hindi, Punjabi, and English.',
      'Paperless e-filing portal upgraded to accept digital signatures with instant acknowledgment receipt.',
      'Integration with Inter-Operable Criminal Justice System (ICJS) to prevent delayed bail bond verification from jails.'
    ],
    relatedActs: ['BNSS 2023 (Section 530 - Digital Evidence & Electronic Appearance)', 'Information Technology Act, 2000']
  },
  {
    id: 'ca-2026-10-bci-foreign-rules',
    category: 'Legal & Judicial',
    title: 'Bar Council of India Clarifies Reciprocity Rules for Cross-Border Corporate Advisory',
    headlineSummary: 'BCI reiterates strict prohibition against foreign lawyers practicing before Indian Courts and Tribunals; advisory limited exclusively to foreign law on non-litigious corporate cross-border matters.',
    eventDate: '2026-10-18',
    publicationDate: '2026-10-19',
    issuingAuthority: 'Bar Council of India, New Delhi',
    verifiedSourceUrl: 'http://www.barcouncilofindia.org',
    content: 'In an official gazette notification, the Bar Council of India has reaffirmed the boundaries of its rules for registration and regulation of foreign lawyers and foreign law firms in India. The Council made it unequivocally clear that the right to appear before any court, tribunal, or statutory authority in India remains strictly reserved for Indian advocates enrolled under Section 24 of the Advocates Act, 1961.',
    bulletPoints: [
      'Foreign law firms cannot advise on Indian laws or draft court pleadings.',
      'Reciprocity principle strictly applied on a country-by-country basis.',
      'Preserves the core litigious practice for domestic advocates.'
    ],
    relatedActs: ['Advocates Act, 1961', 'Bar Council of India Rules (Part VI, Rule 36)']
  },
  {
    id: 'ca-2026-10-cabinet-arbitration',
    category: 'National & Policy',
    title: 'Union Cabinet Approves Institutional Arbitration Modernization Framework',
    headlineSummary: 'Measures introduced to establish India as an international commercial arbitration hub with fast-track disposal standards for commercial claims above ₹100 Crore.',
    eventDate: '2026-10-12',
    publicationDate: '2026-10-14',
    issuingAuthority: 'Press Information Bureau (PIB) / Ministry of Law and Justice',
    verifiedSourceUrl: 'https://pib.gov.in',
    content: 'The Union Cabinet chaired by the Prime Minister has approved legislative proposals to further streamline the Arbitration and Conciliation Act, 1996. The modernization focuses on strengthening the India International Arbitration Centre (IIAC), reducing judicial interference in domestic awards, and setting fixed 6-month timelines for emergency arbitrator orders.',
    bulletPoints: [
      'Enhanced powers for arbitral tribunals to issue self-executory interim measures under Section 17.',
      'Strengthened appellate limits under Section 37 to curtail prolonged appeals.',
      'Specialized commercial benches in High Courts to handle international award enforcement.'
    ],
    relatedActs: ['Arbitration and Conciliation Act, 1996', 'Commercial Courts Act, 2015']
  }
];
