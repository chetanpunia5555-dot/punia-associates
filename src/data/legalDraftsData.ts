export interface LegalDraftField {
  id: string;
  label: string;
  defaultValue: string;
  placeholder: string;
  type?: 'text' | 'date' | 'number' | 'textarea';
}

export interface LegalDraftTemplate {
  id: string;
  title: string;
  category: 'Litigation Notices' | 'Commercial & Corporate' | 'Property & Real Estate' | 'Personal & Family' | 'Statutory & Regulatory';
  statutoryBasis: string;
  governingLaw: string;
  description: string;
  tags: string[];
  fields: LegalDraftField[];
  generateText: (fields: Record<string, string>) => string;
}

export const LEGAL_DRAFTS_COLLECTION: LegalDraftTemplate[] = [
  {
    id: 'cheque-bounce-notice-138',
    title: 'Statutory Demand Notice under Section 138 NI Act',
    category: 'Litigation Notices',
    statutoryBasis: 'Section 138 read with Section 142 of the Negotiable Instruments Act, 1881',
    governingLaw: 'Indian Commercial & Criminal Law',
    description: 'Mandatory pre-litigation demand notice served upon dishonour of cheque for insufficient funds, requiring payment within 15 days of receipt.',
    tags: ['Cheque Bounce', 'Section 138', 'Demand Notice', 'Banking & Finance', 'Recovery'],
    fields: [
      { id: 'advocateName', label: 'Advocate / Law Firm Name', defaultValue: 'PUNIA ASSOCIATES, Advocates & Legal Consultants', placeholder: 'Law firm name' },
      { id: 'clientName', label: 'Complainant / Payee Name', defaultValue: 'ABC Commercial Enterprises Pvt. Ltd.', placeholder: 'Payee name' },
      { id: 'clientAddress', label: 'Complainant Address', defaultValue: 'Chambers Complex, Sector 17, Chandigarh', placeholder: 'Payee address' },
      { id: 'drawerName', label: 'Drawer / Accused Name', defaultValue: 'M/s XYZ Trading Corporation & Its Managing Director', placeholder: 'Drawer name' },
      { id: 'drawerAddress', label: 'Drawer Address', defaultValue: 'Plot No. 45, Industrial Area Phase II, Gurugram, Haryana', placeholder: 'Drawer address' },
      { id: 'chequeNumber', label: 'Cheque Number', defaultValue: '458921', placeholder: 'e.g. 123456' },
      { id: 'chequeDate', label: 'Cheque Date', defaultValue: '15th October 2024', placeholder: 'DD Month YYYY' },
      { id: 'chequeAmount', label: 'Cheque Amount (in INR)', defaultValue: 'Rs. 7,50,000/- (Rupees Seven Lakhs Fifty Thousand Only)', placeholder: 'Amount in figures and words' },
      { id: 'drawnOnBank', label: 'Drawn on Bank & Branch', defaultValue: 'HDFC Bank, Cyber City Branch, Gurugram', placeholder: 'Bank name' },
      { id: 'returnDate', label: 'Bank Return Memo Date', defaultValue: '22nd October 2024', placeholder: 'Return date' },
      { id: 'returnReason', label: 'Reason for Dishonour', defaultValue: 'Funds Insufficient', placeholder: 'Funds Insufficient / Exceeds Arrangement' },
      { id: 'debtCause', label: 'Transaction / Consideration Background', defaultValue: 'supply of industrial electrical components against Invoice No. INV-2024-89', placeholder: 'Reason cheque was given' }
    ],
    generateText: (f) => `LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881
(REGISTERED POST WITH A.D. / SPEED POST / LEGAL EMAIL TRANSMISSION)

Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

FROM:
${f.advocateName || 'PUNIA ASSOCIATES'}
Advocates & Legal Advisors
Office: High Court & Supreme Court Chambers

TO:
${f.drawerName}
Address: ${f.drawerAddress}

SUB: STATUTORY DEMAND NOTICE UNDER SECTION 138 READ WITH SECTION 142 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881 FOR DISHONOUR OF CHEQUE NO. ${f.chequeNumber} DATED ${f.chequeDate} FOR AN AMOUNT OF ${f.chequeAmount}.

Sir/Madam,

Under instructions and on behalf of our client, ${f.clientName}, having office/residence at ${f.clientAddress} (hereinafter referred to as "Our Client"), we do hereby serve upon you this Statutory Legal Demand Notice:

1. That you, the Noticee, in discharge of your legally enforceable debt and subsisting liability towards our Client regarding ${f.debtCause}, issued the following negotiable instrument in favor of our Client:
   - Cheque Number: ${f.chequeNumber}
   - Cheque Date: ${f.chequeDate}
   - Amount: ${f.chequeAmount}
   - Drawn On: ${f.drawnOnBank}

2. That at the time of issuing and handing over the said cheque, you had solemnly assured and represented to our Client that the cheque was genuine and valid and would be honored upon presentation before your bankers.

3. That relying upon your bona fide representation, our Client deposited the said cheque through their banker for realization. However, to the utter shock and dismay of our Client, the said cheque was returned dishonored and unpaid by the banker vide Bank Return Memo dated ${f.returnDate} with the remarks/endorsement: "${f.returnReason}".

4. That you were fully cognizant of the fact that your account did not have sufficient balance or arrangement to honor the cheque, and the same was issued with dishonest, fraudulent, and mala fide intentions to induce our Client into delivering goods/services without genuine consideration.

5. That your conduct constitutes an offence punishable under Section 138 of the Negotiable Instruments Act, 1881, which entails imprisonment for a term which may extend to two years, or with fine which may extend to twice the amount of the cheque, or with both.

DEMAND & NOTICE TO COMPLY:
We, therefore, through this statutory notice, call upon you to make the payment of the cheque amount of ${f.chequeAmount} to our Client within FIFTEEN (15) DAYS from the date of receipt of this notice, failing which our Client shall be constrained to initiate appropriate criminal proceedings against you under Section 138 read with Section 142 of the Negotiable Instruments Act, 1881, as well as Section 318(4) (Cheating) of the Bharatiya Nyaya Sanhita, 2023 (or Section 420 IPC) before the competent jurisdictional Magistrate at your entire risk, cost, and consequence.

Copy retained in our office for future records and legal proceedings.

Advocate for the Complainant
${f.advocateName || 'PUNIA ASSOCIATES'}`
  },

  {
    id: 'money-recovery-legal-notice',
    title: 'Legal Notice for Recovery of Commercial Dues / Money',
    category: 'Litigation Notices',
    statutoryBasis: 'Order XXXVII Civil Procedure Code, 1908 & Indian Contract Act, 1872',
    governingLaw: 'Civil Litigation & Commercial Recovery Laws',
    description: 'Pre-litigation formal demand notice asserting contractual liability, interest accumulation, and notice of summary suit / insolvency petition.',
    tags: ['Money Recovery', 'Summary Suit', 'Commercial Dispute', 'Breach of Contract'],
    fields: [
      { id: 'advocateName', label: 'Advocate / Law Firm Name', defaultValue: 'PUNIA ASSOCIATES, Advocates & Solicitors', placeholder: 'Firm name' },
      { id: 'creditorName', label: 'Creditor / Claimant Name', defaultValue: 'Northland Logistics & Infrastructure LLP', placeholder: 'Creditor name' },
      { id: 'creditorAddress', label: 'Creditor Address', defaultValue: 'Commercial Tower A, Golf Course Road, Gurugram', placeholder: 'Creditor address' },
      { id: 'debtorName', label: 'Debtor / Company Name', defaultValue: 'Apex Builders & Developers Pvt. Ltd.', placeholder: 'Debtor name' },
      { id: 'debtorAddress', label: 'Debtor Address', defaultValue: 'Barakhamba Road, Connaught Place, New Delhi', placeholder: 'Debtor address' },
      { id: 'principalAmount', label: 'Principal Debt Amount (INR)', defaultValue: 'Rs. 24,50,000/-', placeholder: 'Amount' },
      { id: 'interestRate', label: 'Agreed / Commercial Interest Rate', defaultValue: '18% per annum', placeholder: 'e.g. 18% per annum' },
      { id: 'agreementDetails', label: 'Contract / Purchase Order Details', defaultValue: 'Master Service Agreement dated 12th January 2023 and Invoices Nos. 101 through 114', placeholder: 'Contract details' },
      { id: 'defaultPeriodDays', label: 'Cure Period Offered (Days)', defaultValue: '15', placeholder: '15 or 30' }
    ],
    generateText: (f) => `LEGAL NOTICE FOR RECOVERY OF OUTSTANDING DUES & COMMERCIAL LIABILITIES
(WITHOUT PREJUDICE / REGISTERED AD & SPEED POST)

Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

TO:
${f.debtorName}
${f.debtorAddress}

FROM:
${f.advocateName || 'PUNIA ASSOCIATES'}
Chambers of Advocates & Legal Counsel

SUB: FINAL LEGAL DEMAND NOTICE FOR PAYMENT OF OUTSTANDING PRINCIPAL SUM OF ${f.principalAmount} ALONG WITH ACCRUED INTEREST @ ${f.interestRate}.

Sir/Madam,

Under instructions from and on behalf of our client, ${f.creditorName}, having registered address at ${f.creditorAddress} (hereinafter referred to as "Our Client"), we hereby address this Final Demand Notice to you:

1. That our Client is a reputed entity engaged in commercial operations. In the ordinary course of business, you entered into a binding commercial contract with our Client, namely: ${f.agreementDetails}.

2. That pursuant to the mutual agreement, our Client faithfully performed all their contractual obligations and raised corresponding invoices upon you. The goods/services delivered were duly accepted by you without any demur, dispute, or protest as to their quality or quantity.

3. That as per the agreed credit terms, the total outstanding principal amount of ${f.principalAmount} became due and payable by you on or before the due date. Despite repeated telephonic reminders, email correspondences, and ledger confirmations, you have unlawfully withheld the payment without any justifiable cause.

4. That by withholding the legitimate commercial dues of our Client, you are also liable to pay commercial interest at the rate of ${f.interestRate} from the date each invoice fell due until the date of actual realization, as recognized under the Indian Contract Act, 1872 and commercial usages.

DEMAND TO PAY:
We hereby give you notice and call upon you to remit the entire outstanding principal sum of ${f.principalAmount} along with accrued interest within ${f.defaultPeriodDays} (FIFTEEN) DAYS of the receipt of this legal notice.

Please take note that in the event of your failure to comply with this notice within the stipulated timeline, our Client has issued peremptory instructions to:
a. File a Summary Suit for Recovery under Order XXXVII of the Code of Civil Procedure, 1908 before the competent Commercial Court;
b. Initiate insolvency/pre-packaged resolution proceedings under the Insolvency and Bankruptcy Code, 2016 (IBC) if applicable;
c. File criminal complaints under the Bharatiya Nyaya Sanhita, 2023 for criminal breach of trust and cheating;
All entirely at your risk, cost, and legal consequences.

Advocate for Claimant
${f.advocateName || 'PUNIA ASSOCIATES'}`
  },

  {
    id: 'mutual-nda-agreement',
    title: 'Mutual Non-Disclosure Agreement (Bilateral NDA)',
    category: 'Commercial & Corporate',
    statutoryBasis: 'Sections 10, 27 & 73 of the Indian Contract Act, 1872',
    governingLaw: 'Indian Commercial & Contract Law',
    description: 'Comprehensive bilateral confidentiality deed protecting trade secrets, proprietary software, source codes, business plans, and financial disclosures.',
    tags: ['NDA', 'Confidentiality', 'Trade Secrets', 'Corporate', 'IP Protection'],
    fields: [
      { id: 'partyAName', label: 'Disclosing Party A Name', defaultValue: 'Innovatech Systems Private Limited', placeholder: 'Party A name' },
      { id: 'partyAAddress', label: 'Party A Registered Office', defaultValue: 'Cyber Park, Sector 44, Gurugram, Haryana', placeholder: 'Party A address' },
      { id: 'partyBName', label: 'Receiving Party B Name', defaultValue: 'Vanguard Global Capital Partners', placeholder: 'Party B name' },
      { id: 'partyBAddress', label: 'Party B Registered Office', defaultValue: 'Maker Chambers, Nariman Point, Mumbai', placeholder: 'Party B address' },
      { id: 'purpose', label: 'Commercial Purpose of Disclosure', defaultValue: 'evaluating potential strategic equity investment, technology integration, and joint venture collaboration', placeholder: 'Purpose of disclosure' },
      { id: 'jurisdictionCity', label: 'Governing Court Jurisdiction', defaultValue: 'New Delhi / Chandigarh', placeholder: 'e.g. New Delhi' },
      { id: 'confidentialityTerm', label: 'Confidentiality Period (Years)', defaultValue: '3 (Three) Years', placeholder: 'e.g. 2 or 3 years' }
    ],
    generateText: (f) => `MUTUAL NON-DISCLOSURE AND CONFIDENTIALITY AGREEMENT

THIS MUTUAL NON-DISCLOSURE AGREEMENT ("Agreement") is executed on this ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}, by and between:

1. ${f.partyAName}, a company duly incorporated under the Companies Act, having its registered office at ${f.partyAAddress} (hereinafter referred to as the "First Party");
AND
2. ${f.partyBName}, an entity having its principal office at ${f.partyBAddress} (hereinafter referred to as the "Second Party").

(First Party and Second Party are hereinafter individually referred to as "Party" and collectively as "Parties").

WHEREAS the Parties wish to explore and engage in discussions regarding ${f.purpose} ("Purpose"); and in connection therewith, either Party may disclose to the other confidential, technical, financial, and proprietary information.

NOW, THEREFORE, IN CONSIDERATION OF MUTUAL COVENANTS, THE PARTIES AGREE AS FOLLOWS:

1. DEFINITION OF CONFIDENTIAL INFORMATION:
"Confidential Information" means any and all proprietary, technical, operational, commercial, or financial information disclosed by one Party ("Disclosing Party") to the other Party ("Receiving Party"), whether orally, visually, in writing, or electronically, including but not limited to business plans, software architectures, algorithms, customer lists, IP assets, and pricing strategies.

2. OBLIGATIONS OF RECEIVING PARTY:
The Receiving Party agrees:
(a) To hold the Confidential Information in strict confidence and use the same degree of care (not less than reasonable care) as it uses to protect its own confidential information;
(b) Not to disclose, publish, or disseminate Confidential Information to any third party without prior written consent;
(c) To restrict disclosure exclusively to its directors, officers, employees, and professional advisers on a strict "need-to-know" basis who are bound by confidentiality obligations substantially similar to this Agreement;
(d) Not to copy, decompile, reverse-engineer, or commercially exploit any proprietary assets disclosed.

3. EXCLUSIONS FROM CONFIDENTIALITY:
Information shall not be considered Confidential Information if the Receiving Party can prove that:
(a) It was already lawfully in the public domain at the time of disclosure;
(b) It became part of the public domain without breach of this Agreement;
(c) It was already in Receiving Party's possession prior to disclosure without restriction;
(d) It is required to be disclosed pursuant to a mandatory court order or statutory requirement, provided prompt advance notice is given to the Disclosing Party.

4. TERM AND RETURN OF MATERIALS:
This Agreement shall remain in effect for a period of ${f.confidentialityTerm} from the date of execution. Upon written request, Receiving Party shall promptly return or destroy all physical and electronic documents containing Confidential Information.

5. REMEDIES FOR BREACH:
The Parties acknowledge that any breach of confidentiality causes irreparable harm for which monetary damages alone would be inadequate. Therefore, the Disclosing Party shall be entitled to seek injunctive relief and specific performance in addition to damages.

6. GOVERNING LAW AND ARBITRATION:
This Agreement shall be governed by and construed in accordance with the Laws of India. Any dispute arising out of this Agreement shall be referred to sole arbitration seated in ${f.jurisdictionCity} under the Arbitration and Conciliation Act, 1996.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.

For ${f.partyAName}:
Authorized Signatory: _________________________
Name & Designation:

For ${f.partyBName}:
Authorized Signatory: _________________________
Name & Designation:`
  },

  {
    id: 'general-power-of-attorney',
    title: 'General Power of Attorney (GPA) for Property & Legal Affairs',
    category: 'Property & Real Estate',
    statutoryBasis: 'Powers of Attorney Act, 1882 & Registration Act, 1908',
    governingLaw: 'Property and Agency Laws of India',
    description: 'Comprehensive deed authorizing an attorney to manage immovable properties, represent in municipal and revenue registries, sign lease deeds, and institute court suits.',
    tags: ['GPA', 'Power of Attorney', 'Property Management', 'Deed of Agency', 'Court Representation'],
    fields: [
      { id: 'principalName', label: 'Principal (Grantor) Full Name', defaultValue: 'Sh. Rajesh Kumar Punia', placeholder: 'Grantor name' },
      { id: 'principalFather', label: 'Principal Father / Spouse Name', defaultValue: 'Late Sh. Harphool Singh Punia', placeholder: 'Father name' },
      { id: 'principalAddress', label: 'Principal Permanent Address', defaultValue: 'House No. 102, Model Town, Rohtak, Haryana', placeholder: 'Address' },
      { id: 'attorneyName', label: 'Attorney (Agent) Full Name', defaultValue: 'Sh. Vikram Punia', placeholder: 'Attorney name' },
      { id: 'attorneyFather', label: 'Attorney Father / Spouse Name', defaultValue: 'Sh. Rajesh Kumar Punia', placeholder: 'Attorney father name' },
      { id: 'attorneyAddress', label: 'Attorney Address', defaultValue: 'Chambers Complex, Sector 14, Panchkula, Haryana', placeholder: 'Attorney address' },
      { id: 'propertyDetails', label: 'Property Description / Scope', defaultValue: 'Residential Plot No. 248, measuring 350 sq. yards, Sector 21, Urban Estate, Panchkula (Haryana)', placeholder: 'Property description' }
    ],
    generateText: (f) => `GENERAL POWER OF ATTORNEY (GPA)

BE IT KNOWN TO ALL TO WHOM THESE PRESENTS SHALL COME, that I, ${f.principalName}, son/daughter/spouse of ${f.principalFather}, resident of ${f.principalAddress} (hereinafter called the "PRINCIPAL"), do hereby nominate, constitute, and appoint:

${f.attorneyName}, son/daughter/spouse of ${f.attorneyFather}, resident of ${f.attorneyAddress} (hereinafter called the "ATTORNEY"), as my true and lawful attorney in my name and on my behalf to do, execute, and perform all or any of the following acts, deeds, and things regarding:
${f.propertyDetails}

1. MANAGEMENT & ADMINISTRATION:
To take possession, manage, supervise, oversee, and control the aforesaid property, and to pay all municipal taxes, water charges, electricity bills, and statutory cesses payable to competent authorities.

2. TENANCY & LEASING:
To let out or lease the aforesaid property on rent to prospective tenants, execute and register Rent/Lease Deeds, collect monthly rentals, issue valid receipts, and take necessary proceedings to evict defaulting tenants.

3. REVENUE & STATUTORY AUTHORITIES:
To represent me before the Sub-Registrar, Municipal Corporation, Revenue Department, Tehsildar, Electricity Board, Development Authorities (HSVP/PUDA/DDA), and sign all applications, forms, affidavits, and declarations.

4. LEGAL & COURT PROCEEDINGS:
To institute, prosecute, defend, compromise, or settle any suit, appeal, revision, writ petition, arbitration, or other legal proceedings before any Court of Law (Supreme Court, High Court, District Courts, Tribunals), engage advocates, sign plaints, written statements, vakalatnamas, and execution petitions.

5. BANKING TRANSACTIONS:
To operate dedicated bank accounts in connection with the maintenance of the aforesaid property and deposit receipts and issue cheques for maintenance expenses.

RATIFICATION:
AND I, the Principal, hereby agree and undertake to ratify, confirm, and validate all and whatever acts, deeds, and things my said Attorney shall lawfully do or cause to be done in exercise of the powers hereby conferred.

IN WITNESS WHEREOF, I have executed this General Power of Attorney on this ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} at __________________.

PRINCIPAL:
(Signature & Thumb Impression)
Name: ${f.principalName}

ACCEPTED BY ATTORNEY:
(Signature)
Name: ${f.attorneyName}

WITNESSES:
1. Signature: _______________________
   Name:
   Address:

2. Signature: _______________________
   Name:
   Address:`
  },

  {
    id: 'residential-lease-agreement',
    title: 'Residential Lease & Tenancy Deed',
    category: 'Property & Real Estate',
    statutoryBasis: 'Transfer of Property Act, 1882 & State Rent Control Legislations',
    governingLaw: 'Indian Property & Tenancy Law',
    description: 'Standard 11-month residential tenancy agreement with security deposit, notice period, maintenance, and eviction covenants.',
    tags: ['Lease Deed', 'Rent Agreement', 'Tenancy', 'Landlord-Tenant', 'Residential'],
    fields: [
      { id: 'landlordName', label: 'Landlord (Lessor) Full Name', defaultValue: 'Smt. Anita Sharma', placeholder: 'Landlord name' },
      { id: 'landlordAddress', label: 'Landlord Address', defaultValue: 'House No. 34, Sector 7, Chandigarh', placeholder: 'Landlord address' },
      { id: 'tenantName', label: 'Tenant (Lessee) Full Name', defaultValue: 'Mr. Saurabh Verma', placeholder: 'Tenant name' },
      { id: 'tenantAddress', label: 'Tenant Permanent Address', defaultValue: 'Flat 402, Block C, Silver Oak Heights, Mohali, Punjab', placeholder: 'Tenant address' },
      { id: 'premisesAddress', label: 'Leased Premises Address', defaultValue: 'First Floor, House No. 34, Sector 7, Chandigarh (comprising 2 Bedrooms, Hall, Kitchen)', placeholder: 'Address of rented property' },
      { id: 'monthlyRent', label: 'Monthly Rent (INR)', defaultValue: 'Rs. 28,000/-', placeholder: 'Monthly rent' },
      { id: 'securityDeposit', label: 'Interest-free Security Deposit (INR)', defaultValue: 'Rs. 56,000/- (Two Months Rent)', placeholder: 'Deposit amount' },
      { id: 'leaseTenure', label: 'Lease Duration (Months)', defaultValue: '11 (Eleven) Months', placeholder: 'e.g. 11 Months' },
      { id: 'noticePeriodDays', label: 'Notice Period for Termination (Days)', defaultValue: '30 Days', placeholder: 'e.g. 30 Days' }
    ],
    generateText: (f) => `RESIDENTIAL LEASE AND TENANCY AGREEMENT

THIS LEASE AGREEMENT is made and entered into on this ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}, by and between:

LESSOR (LANDLORD):
${f.landlordName}, residing at ${f.landlordAddress} (hereinafter referred to as the "LESSOR", which expression shall include legal heirs, executors, and assigns);
AND
LESSEE (TENANT):
${f.tenantName}, residing at ${f.tenantAddress} (hereinafter referred to as the "LESSEE", which expression shall include legal heirs and successors).

WHEREAS the Lessor is the absolute and rightful owner of premises: ${f.premisesAddress} ("Demised Premises"); and has agreed to let out the same to the Lessee for purely residential purposes on the following terms and conditions:

1. TENURE:
The tenancy shall be for a fixed term of ${f.leaseTenure}, commencing from ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}. The tenancy may be extended by mutual consent in writing upon revision of rent.

2. RENT & PAYMENT TERMS:
The Lessee shall pay a monthly rent of ${f.monthlyRent} to the Lessor in advance on or before the 7th day of each English calendar month via bank transfer/cheque.

3. SECURITY DEPOSIT:
The Lessee has deposited with the Lessor a sum of ${f.securityDeposit} as an interest-free refundable security deposit. This deposit shall be refunded upon vacating the premises, subject to deductions for unpaid utility dues, electricity/water bills, or physical damages to fittings.

4. UTILITIES & ELECTRICITY:
The Lessee shall pay actual electricity and water consumption charges directly to the concerned authorities as per individual sub-meter readings.

5. RESTRICTIONS ON USE & SUB-LETTING:
(a) The premises shall be used exclusively for bona fide residential purposes and not for any commercial, illegal, or offensive activity.
(b) The Lessee shall NOT sub-let, assign, or part with possession of the premises or any portion thereof to any third party.

6. TERMINATION & NOTICE:
Either party may terminate this agreement prior to the expiry of the term by giving a prior written notice of ${f.noticePeriodDays} or paying rent in lieu thereof.

IN WITNESS WHEREOF, the Lessor and Lessee have signed this Deed on the day, month, and year first written above.

LESSOR (Landlord): ____________________
${f.landlordName}

LESSEE (Tenant): ____________________
${f.tenantName}

Witness 1: __________________________
Witness 2: __________________________`
  },

  {
    id: 'international-arbitration-agreement',
    title: 'Model International Commercial Arbitration Clause & Agreement',
    category: 'Commercial & Corporate',
    statutoryBasis: 'UNCITRAL Model Law 1985 / 2006 & New York Convention 1958',
    governingLaw: 'International Commercial Law & Transnational Lex Mercatoria',
    description: 'Gold-standard dispute resolution agreement specifying institutional seat, governing substantive law, procedural rules (SIAC / LCIA / ICC / UNCITRAL), and enforcement of awards.',
    tags: ['Arbitration', 'International Law', 'SIAC', 'ICC', 'UNCITRAL', 'Cross-Border'],
    fields: [
      { id: 'institution', label: 'Arbitral Institution / Rules', defaultValue: 'Singapore International Arbitration Centre (SIAC)', placeholder: 'e.g. SIAC / LCIA / ICC / UNCITRAL' },
      { id: 'seatCity', label: 'Legal Seat / Place of Arbitration', defaultValue: 'Singapore', placeholder: 'e.g. Singapore / London / New York / Paris' },
      { id: 'substantiveLaw', label: 'Governing Substantive Law of Contract', defaultValue: 'Laws of England & Wales (or Laws of India)', placeholder: 'Governing law' },
      { id: 'language', label: 'Language of Arbitration', defaultValue: 'English', placeholder: 'English' },
      { id: 'tribunalSize', label: 'Number of Arbitrators', defaultValue: 'Three (3) Arbitrators', placeholder: 'Sole Arbitrator or Three Arbitrators' }
    ],
    generateText: (f) => `MODEL INTERNATIONAL COMMERCIAL ARBITRATION AGREEMENT & CLAUSE
(COMPLIANT WITH UNCITRAL MODEL LAW & NEW YORK CONVENTION, 1958)

"SECTION [X]: DISPUTE RESOLUTION AND ARBITRATION

1. NEGOTIATION AND EXECUTIVE ESCALATION:
In the event of any controversy, claim, or dispute arising out of or relating to this Agreement, including any question regarding its existence, validity, interpretation, performance, breach, or termination ("Dispute"), the Parties shall first seek to resolve the Dispute amicably through good-faith consultations between their designated senior executives within thirty (30) days from written notice of dispute.

2. INSTITUTIONAL ARBITRATION:
If the Dispute cannot be settled within the thirty (30) day negotiation period, it shall be referred to and finally resolved by binding arbitration administered by the ${f.institution} in accordance with its Arbitration Rules in force at the time of commencement, which Rules are deemed to be incorporated by reference into this clause.

3. LEGAL SEAT AND VENUE:
The legal seat (place of arbitration) shall be ${f.seatCity}. The tribunal may hold hearings or meetings at any physical venue it deems appropriate, or conduct proceedings by secure video-conferencing.

4. COMPOSITION OF TRIBUNAL:
The arbitral tribunal shall consist of ${f.tribunalSize}.
(a) Where a three-member tribunal is agreed, each Party shall nominate one arbitrator within twenty-one (21) days of notice, and the two party-nominated arbitrators shall jointly select the Presiding Arbitrator.
(b) If an arbitrator is not nominated within the time limit, the appointment shall be made by the President of the ${f.institution}.

5. GOVERNING LAW:
The substantive law governing this contract shall be the ${f.substantiveLaw}. The law governing this arbitration agreement shall be the law of the seat (${f.seatCity}).

6. LANGUAGE:
The language of the arbitration shall be ${f.language}. All pleadings, witness statements, hearings, and awards shall be in English.

7. FINALITY AND ENFORCEMENT:
The arbitral award rendered by the tribunal shall be final, conclusive, and binding upon both Parties. Judgment upon the award may be entered and enforced in any court of competent jurisdiction worldwide under the United Nations Convention on the Recognition and Enforcement of Foreign Arbitral Awards (New York Convention, 1958).

8. WAIVER OF IMMUNITY:
Each Party irrevocably waives any claim to sovereign, diplomatic, or state immunity in respect of the arbitral proceedings, the award, and the execution/enforcement of any judgment rendered thereon."`
  },

  {
    id: 'last-will-and-testament',
    title: 'Last Will and Testament Deed',
    category: 'Personal & Family',
    statutoryBasis: 'Section 59 & Section 63 of the Indian Succession Act, 1925',
    governingLaw: 'Indian Succession & Testamentary Law',
    description: 'Bona fide testamentary disposition bequeathing self-acquired movable and immovable properties, appointing executors, and revoking prior wills.',
    tags: ['Will', 'Testament', 'Inheritance', 'Succession Act', 'Estate Planning'],
    fields: [
      { id: 'testatorName', label: 'Testator (Will Maker) Full Name', defaultValue: 'Sh. Surender Nath Punia', placeholder: 'Testator name' },
      { id: 'testatorFather', label: 'Testator Father Name', defaultValue: 'Late Sh. Ram Chander Punia', placeholder: 'Father name' },
      { id: 'testatorAge', label: 'Testator Age (Years)', defaultValue: '68', placeholder: 'e.g. 68' },
      { id: 'testatorAddress', label: 'Permanent Residence', defaultValue: 'Villa No. 12, Rosewood City, Sector 49, Gurugram', placeholder: 'Address' },
      { id: 'executorName', label: 'Executor of Will', defaultValue: 'Sh. Chetan Punia, Advocate', placeholder: 'Executor name' },
      { id: 'primaryBeneficiary', label: 'Primary Beneficiary / Children', defaultValue: 'My beloved spouse and surviving children in equal shares', placeholder: 'Beneficiary details' },
      { id: 'immovableProperties', label: 'Schedule of Immovable Properties', defaultValue: '1. Self-acquired residential villa at Gurugram; 2. Commercial shop at Sector 14, Rohtak', placeholder: 'Property list' }
    ],
    generateText: (f) => `LAST WILL AND TESTAMENT

I, ${f.testatorName}, son of ${f.testatorFather}, aged about ${f.testatorAge} years, residing at ${f.testatorAddress}, do hereby make, publish, and declare this as my LAST WILL AND TESTAMENT on this ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}, revoking all my former wills, codicils, and testamentary dispositions made by me at any time heretofore.

1. SOUND MIND & VOLUNTARY DISPOSITION:
I declare that I am in sound health of body and disposing state of mind. I am executing this Will out of my own free will and volition, without any fear, fraud, coercion, undue influence, or misrepresentation from any person whomsoever.

2. APPOINTMENT OF EXECUTOR:
I hereby nominate and appoint ${f.executorName} to be the sole Executor and Trustee of this my Will. In case he/she predeceases me or is unable/unwilling to act, my legal counsel shall act as alternate executor.

3. NATURE OF ASSETS:
I declare that all the properties mentioned herein are my self-acquired properties acquired through my own personal earnings, investments, and funds, over which I possess absolute, unconditional, and unrestricted right of testamentary alienation.

4. BEQUEST OF IMMOVABLE PROPERTIES:
Regarding my immovable properties:
${f.immovableProperties}
I hereby bequeath and devise the same absolutely and forever unto ${f.primaryBeneficiary}, with full rights of ownership, mutation, and enjoyment.

5. BEQUEST OF MOVABLE PROPERTIES:
All my bank accounts, fixed deposits (FDs), mutual fund units, shares, insurance policies, cash balances, and household articles shall devolve upon the said beneficiaries without objection from any other heirs.

6. FUNERAL EXPENSES & DEBTS:
I direct that my funeral expenses and any outstanding lawful debts shall be first discharged from my liquid bank balances.

IN WITNESS WHEREOF, I, the said Testator, have signed and set my hands to this Will on the day, month, and year first above mentioned.

TESTATOR:
_________________________________
Signature / Thumb Impression
Name: ${f.testatorName}

ATTESTATION BY WITNESSES:
We, the undersigned witnesses, certify that the Testator signed this Will in our presence and sight, and we, at his request and in his presence and in the presence of each other, have subscribed our names as attesting witnesses:

Witness 1:
Signature: __________________________
Name:
Address:

Witness 2:
Signature: __________________________
Name:
Address:`
  },

  {
    id: 'rti-application-draft',
    title: 'Formal RTI Application under Section 6(1)',
    category: 'Statutory & Regulatory',
    statutoryBasis: 'Section 6(1) of the Right to Information Act, 2005',
    governingLaw: 'Administrative & Constitutional Transparency Law',
    description: 'Standard statutory application to Public Information Officer (PIO) seeking certified public records, government inspection notes, and departmental files.',
    tags: ['RTI', 'Public Information Officer', 'Transparency', 'Section 6(1)', 'Citizen Rights'],
    fields: [
      { id: 'applicantName', label: 'Applicant Name', defaultValue: 'Adv. Chetan Punia', placeholder: 'Applicant name' },
      { id: 'applicantAddress', label: 'Applicant Postal Address', defaultValue: 'Chambers Complex, Sector 17, Chandigarh - 160017', placeholder: 'Postal address' },
      { id: 'pioDesignation', label: 'Public Information Officer (PIO) Title', defaultValue: 'The Central Public Information Officer (CPIO)', placeholder: 'e.g. CPIO / SPIO' },
      { id: 'departmentName', label: 'Department / Ministry / Office Name', defaultValue: 'Department of Personnel & Training (DoPT), North Block, New Delhi', placeholder: 'Department address' },
      { id: 'infoSubject', label: 'Subject of Information Sought', defaultValue: 'Certified copies of circulars and file notings regarding judicial appointments and legal aid remuneration', placeholder: 'Information query' },
      { id: 'feeMode', label: 'Mode of RTI Fee Payment', defaultValue: 'Indian Postal Order (IPO) No. 58G 128492 of Rs. 10/-', placeholder: 'IPO / DD / Online' }
    ],
    generateText: (f) => `APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To:
${f.pioDesignation}
${f.departmentName}

1. FULL NAME OF APPLICANT:
${f.applicantName}

2. ADDRESS FOR CORRESPONDENCE:
${f.applicantAddress}
Contact: Available on Registry Records

3. PARTICULARS OF INFORMATION SOUGHT:
(a) Subject Matter:
Information sought under the Right to Information Act, 2005 regarding: ${f.infoSubject}.

(b) Specific Details of Information Required:
i. Provide certified true copies of all official file notings, orders, and minutes of meetings recorded in connection with the subject matter.
ii. Provide certified copies of all policy directives and guidelines issued by the competent authority during the last 3 financial years.
iii. State the designation and name of the officer who has been assigned custody of the relevant departmental records.

(c) Period to which the Information Pertains:
Current and preceding 2 calendar years.

4. CITIZENSHIP STATUS:
I hereby declare that I am a citizen of India and entitled to seek information under Section 3 of the RTI Act, 2005.

5. PAYMENT OF PRESCRIBED APPLICATION FEE:
The prescribed application fee of Rs. 10/- (Rupees Ten only) has been paid via:
${f.feeMode}, enclosed herewith.

6. MODE OF DELIVERY:
Kindly send the certified documents to the applicant's postal address by Registered Post / Speed Post.

Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
Place: Chandigarh / New Delhi

APPLICANT:
_________________________________
Signature
Name: ${f.applicantName}`
  }
];
