const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

/**
 * Modern Law Book Generator: The Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)
 * Luxury publication edition with Punia Associates promotion & running footers on every page.
 */
async function generateBnssBook() {
  const doc = await PDFDocument.create();

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldOblique = await doc.embedFont(StandardFonts.HelveticaBoldOblique);

  const colorNavy = rgb(0.043, 0.082, 0.165);       // #0B152A
  const colorGold = rgb(0.82, 0.62, 0.22);          // #D19E38
  const colorDarkGold = rgb(0.68, 0.50, 0.15);      // #AE8026
  const colorCharcoal = rgb(0.12, 0.14, 0.18);      // #1F242E
  const colorSlateMuted = rgb(0.40, 0.44, 0.52);    // #667085
  const colorCardBg = rgb(0.965, 0.973, 0.985);     // #F6F8FB
  const colorRule = rgb(0.86, 0.88, 0.92);          // #DBE0EB
  const colorWhite = rgb(1, 1, 1);
  const colorEmerald = rgb(0.05, 0.58, 0.41);       // #0D9468
  const colorCrimson = rgb(0.65, 0.12, 0.15);

  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;

  const pagesList = [];

  // ==========================================
  // PAGE 1: LUXURY BOOK COVER
  // ==========================================
  const page1 = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  const { width, height } = page1.getSize();

  // Full Rich Navy Background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: colorNavy
  });

  // Dual Gold Border
  page1.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderWidth: 2,
    borderColor: colorGold
  });
  page1.drawRectangle({
    x: 29,
    y: 29,
    width: width - 58,
    height: height - 58,
    borderWidth: 0.6,
    borderColor: colorGold
  });

  // Top Firm Title & Subtitle Banner
  page1.drawText('PUNIA ASSOCIATES', {
    x: 50,
    y: height - 68,
    size: 15,
    font: fontBold,
    color: colorGold
  });
  page1.drawText('ADVOCATES & LEGAL CONSULTANTS • CRIMINAL DEFENSE & CONSTITUTIONAL LITIGATION', {
    x: 50,
    y: height - 84,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.85, 0.88, 0.93)
  });
  page1.drawLine({
    start: { x: 50, y: height - 94 },
    end: { x: width - 50, y: height - 94 },
    thickness: 1,
    color: colorGold
  });

  // Publication Badge
  page1.drawRectangle({
    x: 50,
    y: height - 138,
    width: 280,
    height: 24,
    color: rgb(0.08, 0.14, 0.28),
    borderColor: colorDarkGold,
    borderWidth: 0.8
  });
  page1.drawText('CRIMINAL JUSTICE CODE OF INDIA • 2024 ENFORCEMENT', {
    x: 60,
    y: height - 126,
    size: 8,
    font: fontBold,
    color: colorGold
  });

  // Main Act Title
  page1.drawText('THE BHARATIYA NAGARIK', {
    x: 50,
    y: height - 180,
    size: 24,
    font: fontBold,
    color: colorWhite
  });
  page1.drawText('SURAKSHA SANHITA, 2023', {
    x: 50,
    y: height - 212,
    size: 24,
    font: fontBold,
    color: colorGold
  });

  page1.drawText('(Act No. 46 of 2023 • Repealing and Replacing Code of Criminal Procedure, 1973)', {
    x: 50,
    y: height - 238,
    size: 9.5,
    font: fontOblique,
    color: rgb(0.80, 0.85, 0.92)
  });

  // Subtitle & Legislative Scope
  page1.drawText('Comprehensive Procedural Code Governing Arrest, Bail, Police Investigation, Trial & Electronic Evidence', {
    x: 50,
    y: height - 262,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.72, 0.78, 0.88)
  });

  // Central Metadata Container
  const boxY = height - 520;
  page1.drawRectangle({
    x: 50,
    y: boxY,
    width: width - 100,
    height: 235,
    color: rgb(0.06, 0.11, 0.22),
    borderWidth: 1,
    borderColor: rgb(0.20, 0.28, 0.44)
  });

  page1.drawRectangle({
    x: 50,
    y: boxY + 205,
    width: width - 100,
    height: 30,
    color: rgb(0.09, 0.16, 0.32)
  });
  page1.drawText('OFFICIAL STATUTORY RECORD & LEGISLATIVE METADATA', {
    x: 65,
    y: boxY + 215,
    size: 9.5,
    font: fontBold,
    color: colorGold
  });

  const metadataRows = [
    ['Official Title:', 'The Bharatiya Nagarik Suraksha Sanhita, 2023'],
    ['Short Title:', 'BNSS, 2023 (Indian Criminal Procedure Code)'],
    ['Act Number:', 'Act No. 46 of 2023 (Parliament of India)'],
    ['Date of Assent:', 'Assented by the Hon\'ble President of India on 25th December, 2023'],
    ['Date of Enforcement:', '1st July, 2024 (Except provisions of Section 106(2) BNS)'],
    ['Legislative Scope:', 'Extends to Whole of India (Applicable to All Criminal Courts & Police)'],
    ['Succession Status:', 'Successor Legislation to The Code of Criminal Procedure, 1973 (Act 2 of 1974)'],
    ['Statutory Scheme:', '531 Sections • 39 Chapters • 2 Schedules (Forms & Classification of Offences)'],
    ['Published Under:', 'Chambers of Punia Associates — Official Legal Practice Library']
  ];

  metadataRows.forEach(([lbl, val], idx) => {
    const rowY = boxY + 185 - (idx * 19);
    page1.drawText(lbl, { x: 65, y: rowY, size: 8, font: fontBold, color: colorGold });
    page1.drawText(val, { x: 195, y: rowY, size: 8, font: fontRegular, color: colorWhite });
  });

  // Digital Verification Seal
  const sealY = boxY - 95;
  page1.drawRectangle({
    x: 50,
    y: sealY,
    width: width - 100,
    height: 75,
    color: rgb(0.06, 0.10, 0.20),
    borderWidth: 0.8,
    borderColor: colorGold
  });
  page1.drawText('DIGITAL VERIFICATION & CERTIFICATION SEAL', {
    x: 65,
    y: sealY + 54,
    size: 9.5,
    font: fontBold,
    color: colorGold
  });
  page1.drawText('This statutory publication is certified by the Criminal Law Practice Wing of Punia Associates.\nDigitized with complete text, cross-statutory concordance with CrPC 1973, procedural safeguards,\nand official Gazette authenticity for criminal defense lawyers, trial judges, and legal researchers.', {
    x: 65,
    y: sealY + 36,
    size: 7.8,
    font: fontRegular,
    color: rgb(0.75, 0.80, 0.88),
    lineHeight: 12
  });

  // Bottom Footer on Cover
  page1.drawLine({
    start: { x: 50, y: 75 },
    end: { x: width - 50, y: 75 },
    thickness: 0.8,
    color: colorGold
  });
  page1.drawText('PUNIA ASSOCIATES', {
    x: 50,
    y: 52,
    size: 13,
    font: fontBold,
    color: colorGold
  });
  page1.drawText('CRIMINAL JUSTICE STATUTORY REPOSITORY', {
    x: width - 265,
    y: 52,
    size: 8,
    font: fontBold,
    color: rgb(0.85, 0.88, 0.95)
  });

  // ==========================================
  // PAGE 2: FIRM PROFILE & CRIMINAL DEFENSE PRACTICE
  // ==========================================
  const page2 = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  pagesList.push({ page: page2, pageNumber: 2, isEditorial: true, sectionTitle: 'FIRM PROFILE & CHAMBERS' });

  page2.drawText('PUNIA ASSOCIATES — ADVOCATES & LEGAL CONSULTANTS', {
    x: 50,
    y: height - 60,
    size: 14,
    font: fontBold,
    color: colorNavy
  });
  page2.drawText('CRIMINAL LITIGATION • SESSIONS TRIALS • HIGH COURT & SUPREME COURT APPELLATE ADVOCACY', {
    x: 50,
    y: height - 76,
    size: 8,
    font: fontBold,
    color: colorDarkGold
  });
  page2.drawLine({
    start: { x: 50, y: height - 85 },
    end: { x: width - 50, y: height - 85 },
    thickness: 1.2,
    color: colorNavy
  });

  // Description
  page2.drawRectangle({
    x: 50,
    y: height - 215,
    width: width - 100,
    height: 115,
    color: colorCardBg,
    borderWidth: 1,
    borderColor: colorRule
  });
  page2.drawText('ABOUT THE LAW FIRM', {
    x: 65,
    y: height - 105,
    size: 10,
    font: fontBold,
    color: colorNavy
  });
  const aboutText = [
    'Punia Associates is a premier, full-service Indian law firm renowned for vigorous criminal defense, strategic trial advocacy,',
    'and constitutional litigation before the Supreme Court of India, Punjab and Haryana High Court, Delhi High Court,',
    'and Special Courts across the nation.',
    '',
    'With the revolutionary transformation from the Indian Penal Code 1860, Code of Criminal Procedure 1973, and Evidence Act',
    '1872 to the new criminal laws (BNS, BNSS, and BSA 2023), our chambers stands at the forefront of procedural innovation,',
    'safeguarding fundamental liberties, challenging illegal detention, and securing regular and anticipatory bail.'
  ];
  aboutText.forEach((l, idx) => {
    page2.drawText(l, { x: 65, y: height - 124 - (idx * 12), size: 8, font: fontRegular, color: colorCharcoal });
  });

  // Specialized Criminal Practice Areas
  page2.drawText('CORE CRIMINAL DEFENSE & SPECIAL STATUTES PRACTICE', {
    x: 50,
    y: height - 235,
    size: 11,
    font: fontBold,
    color: colorNavy
  });

  const crimPractices = [
    { title: 'Anticipatory & Regular Bail', desc: 'Pre-arrest bail under Section 482 BNSS, regular bail under Section 480/483, default bail under Section 187, and transit bail across states.' },
    { title: 'Prevention of Money Laundering (PMLA)', desc: 'High-stakes defense before ED Special Courts, appellate tribunals, and High Courts against asset attachment and twin bail conditions.' },
    { title: 'Corruption & Vigilance Defense', desc: 'Representation in CBI and State Vigilance matters under the Prevention of Corruption Act (PC Act 1988), trap cases, and disproportionate assets.' },
    { title: 'Cybercrime & Electronic Evidence', desc: 'Complex IT Act matters, financial fraud, cryptocurrency tracing, and strict BSA Section 63 electronic certificates cross-examination.' },
    { title: 'Quashing of FIR & Section 528 BNSS', desc: 'Inherent powers petitions before High Courts to quash motivated, frivolous, matrimonial, or civil-turned-criminal complaints.' },
    { title: 'Trial & Sessions Advocacy', desc: 'Complete trial conduct: witness cross-examination, scientific forensics scrutiny, ballistics/DNA review, and final defence arguments.' }
  ];

  crimPractices.forEach((cp, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxX = 50 + col * ((width - 100 - 16) / 2 + 16);
    const boxW = (width - 100 - 16) / 2;
    const boxY = height - 325 - (row * 80);

    page2.drawRectangle({
      x: boxX,
      y: boxY,
      width: boxW,
      height: 72,
      color: colorWhite,
      borderColor: colorRule,
      borderWidth: 0.8
    });
    page2.drawRectangle({
      x: boxX,
      y: boxY + 68,
      width: boxW,
      height: 4,
      color: colorCrimson
    });
    page2.drawText(cp.title, { x: boxX + 10, y: boxY + 52, size: 8.5, font: fontBold, color: colorNavy });

    const words = cp.desc.split(' ');
    let l1 = '', l2 = '', l3 = '';
    words.forEach(w => {
      if ((l1 + ' ' + w).length < 42) l1 += (l1 ? ' ' : '') + w;
      else if ((l2 + ' ' + w).length < 42) l2 += (l2 ? ' ' : '') + w;
      else l3 += (l3 ? ' ' : '') + w;
    });
    page2.drawText(l1, { x: boxX + 10, y: boxY + 38, size: 7.2, font: fontRegular, color: colorCharcoal });
    if (l2) page2.drawText(l2, { x: boxX + 10, y: boxY + 27, size: 7.2, font: fontRegular, color: colorCharcoal });
    if (l3) page2.drawText(l3, { x: boxX + 10, y: boxY + 16, size: 7.2, font: fontRegular, color: colorCharcoal });
  });

  // Bottom Chambers Legal Wing Box
  page2.drawRectangle({
    x: 50,
    y: 80,
    width: width - 100,
    height: 70,
    color: rgb(0.043, 0.082, 0.165)
  });
  page2.drawText('CHAMBERS OF PUNIA ASSOCIATES', {
    x: 65,
    y: 130,
    size: 10,
    font: fontBold,
    color: colorGold
  });
  page2.drawText('Specialized Criminal Defense, Appellate Practice, and Sessions Trials across Courts of India.', {
    x: 65,
    y: 114,
    size: 8,
    font: fontRegular,
    color: colorWhite
  });
  page2.drawText('Advocates & Legal Consultants • High Court of Punjab & Haryana, Delhi High Court & Supreme Court.', {
    x: 65,
    y: 100,
    size: 7.8,
    font: fontRegular,
    color: rgb(0.85, 0.88, 0.94)
  });

  // ==========================================
  // PAGE 3: ARRANGEMENT OF SECTIONS (TABLE OF CONTENTS)
  // ==========================================
  const page3 = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  pagesList.push({ page: page3, pageNumber: 3, sectionTitle: 'ARRANGEMENT OF SECTIONS' });

  page3.drawText('THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023', {
    x: 50,
    y: height - 60,
    size: 13,
    font: fontBold,
    color: colorNavy
  });
  page3.drawText('ARRANGEMENT OF CHAPTERS & KEY STATUTORY SECTIONS', {
    x: 50,
    y: height - 76,
    size: 8.5,
    font: fontBold,
    color: colorDarkGold
  });
  page3.drawLine({
    start: { x: 50, y: height - 84 },
    end: { x: width - 50, y: height - 84 },
    thickness: 1.2,
    color: colorGold
  });

  const chapters = [
    { num: 'CHAPTER I', title: 'PRELIMINARY (Sections 1 to 5)', crpc: 'Old CrPC Sec 1-5' },
    { num: 'CHAPTER II', title: 'CONSTITUTION OF CRIMINAL COURTS & OFFICES (Sections 6 to 20)', crpc: 'Old CrPC Sec 6-25A' },
    { num: 'CHAPTER III', title: 'POWER OF COURTS (Sections 21 to 31)', crpc: 'Old CrPC Sec 26-35' },
    { num: 'CHAPTER V', title: 'ARREST OF PERSONS & PROCEDURAL SAFEGUARDS (Sections 35 to 62)', crpc: 'Old CrPC Sec 41-60A' },
    { num: 'CHAPTER XII', title: 'INFORMATION TO POLICE & INVESTIGATION (Sections 173 to 196)', crpc: 'Old CrPC Sec 154-176' },
    { num: 'CHAPTER XIII', title: 'JURISDICTION OF CRIMINAL COURTS IN INQUIRIES & TRIALS (Sections 197 to 210)', crpc: 'Old CrPC Sec 177-189' },
    { num: 'CHAPTER XIX', title: 'TRIAL BEFORE COURT OF SESSION (Sections 248 to 260)', crpc: 'Old CrPC Sec 225-237' },
    { num: 'CHAPTER XXI', title: 'SUMMARY TRIALS (Sections 283 to 288)', crpc: 'Old CrPC Sec 260-265' },
    { num: 'CHAPTER XXII', title: 'PLEA BARGAINING (Sections 289 to 300)', crpc: 'Old CrPC Sec 265A-265L' },
    { num: 'CHAPTER XXXV', title: 'PROVISIONS AS TO BAIL AND BONDS (Sections 478 to 496)', crpc: 'Old CrPC Sec 436-450' },
    { num: 'CHAPTER XXXIX', title: 'SAVINGS & REPEALS (Sections 530 to 531)', crpc: 'Old CrPC Sec 484' }
  ];

  chapters.forEach((ch, idx) => {
    const rowY = height - 110 - (idx * 38);

    page3.drawRectangle({
      x: 50,
      y: rowY - 14,
      width: width - 100,
      height: 32,
      color: idx % 2 === 0 ? colorCardBg : colorWhite,
      borderColor: colorRule,
      borderWidth: 0.5
    });

    page3.drawText(ch.num, {
      x: 58,
      y: rowY + 3,
      size: 8,
      font: fontBold,
      color: colorNavy
    });

    page3.drawText(ch.title, {
      x: 135,
      y: rowY + 3,
      size: 7.8,
      font: fontRegular,
      color: colorCharcoal
    });

    page3.drawText(ch.crpc, {
      x: width - 160,
      y: rowY + 3,
      size: 7.2,
      font: fontOblique,
      color: colorEmerald
    });
  });

  // Concordance Note Box
  page3.drawRectangle({
    x: 50,
    y: 85,
    width: width - 100,
    height: 75,
    color: rgb(0.94, 0.96, 0.99),
    borderColor: colorDarkGold,
    borderWidth: 0.8
  });
  page3.drawText('STATUTORY CONCORDANCE NOTICE BY PUNIA ASSOCIATES', {
    x: 62,
    y: 142,
    size: 8.5,
    font: fontBold,
    color: colorNavy
  });
  page3.drawText('Under Section 531 of BNSS 2023, any pending appeal, application, trial, inquiry or investigation pending prior to', {
    x: 62,
    y: 126,
    size: 7.5,
    font: fontRegular,
    color: colorCharcoal
  });
  page3.drawText('1st July, 2024 shall continue to be disposed of in accordance with the Code of Criminal Procedure, 1973.', {
    x: 62,
    y: 114,
    size: 7.5,
    font: fontRegular,
    color: colorCharcoal
  });
  page3.drawText('Comprehensive concordance tables and comparative statutory mapping published by Punia Associates.', {
    x: 62,
    y: 98,
    size: 7.5,
    font: fontBold,
    color: colorDarkGold
  });

  // ==========================================
  // PAGE 4: KEY STATUTORY PROVISIONS (SECTIONS 173 & 482)
  // ==========================================
  const page4 = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  pagesList.push({ page: page4, pageNumber: 4, sectionTitle: 'CHAPTER XII & XXXV • BNSS 2023' });

  page4.drawText('THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023', {
    x: 50,
    y: height - 60,
    size: 13,
    font: fontBold,
    color: colorNavy
  });
  page4.drawText('CHAPTER XII • INFORMATION TO POLICE & POWER TO INVESTIGATE', {
    x: 50,
    y: height - 76,
    size: 8.5,
    font: fontBold,
    color: colorDarkGold
  });
  page4.drawLine({
    start: { x: 50, y: height - 84 },
    end: { x: width - 50, y: height - 84 },
    thickness: 1.2,
    color: colorGold
  });

  // Section 173 Box
  page4.drawRectangle({
    x: 50,
    y: height - 250,
    width: width - 100,
    height: 160,
    color: colorCardBg,
    borderColor: colorRule,
    borderWidth: 0.8
  });
  page4.drawRectangle({
    x: 50,
    y: height - 108,
    width: width - 100,
    height: 24,
    color: rgb(0.10, 0.18, 0.35)
  });
  page4.drawText('SECTION 173: INFORMATION IN COGNIZABLE CASES (ZERO FIR & E-FIR)', {
    x: 62,
    y: height - 102,
    size: 8.5,
    font: fontBold,
    color: colorGold
  });

  const sec173Text = [
    '(1) Every information relating to the commission of a cognizable offence, if given orally to an officer in charge',
    '    of a police station, shall be reduced to writing by him or under his direction, and be read over to the informant;',
    '    and every such information, whether given in writing or reduced to writing as aforesaid, shall be signed by the',
    '    person giving it, and the substance thereof shall be entered in a book to be kept by such officer in such form as',
    '    the State Government may prescribe in this behalf:',
    '    Provided that if the information is given by the woman against whom an offence under section 64, section 65,',
    '    section 66, section 67, section 68, section 69, section 70, section 71, section 74, section 75, section 76,',
    '    section 77, section 78 or section 79 of the Bharatiya Nyaya Sanhita, 2023 is alleged to have been committed...',
    '',
    '(3) Without prejudice to the provisions contained in sub-section (1), on receipt of information relating to the',
    '    commission of a cognizable offence, which is punishable for 3 years or more but less than 7 years, the officer',
    '    in charge of the police station may, with the prior permission from an officer not below the rank of Deputy',
    '    Superintendent of Police, conduct a preliminary enquiry within a period of fourteen days to ascertain whether',
    '    there exists a prima facie case for proceeding in the matter.'
  ];
  sec173Text.forEach((l, idx) => {
    page4.drawText(l, { x: 62, y: height - 122 - (idx * 10), size: 7.2, font: fontRegular, color: colorCharcoal });
  });

  // Section 482 Anticipatory Bail Box
  page4.drawRectangle({
    x: 50,
    y: height - 440,
    width: width - 100,
    height: 175,
    color: colorCardBg,
    borderColor: colorRule,
    borderWidth: 0.8
  });
  page4.drawRectangle({
    x: 50,
    y: height - 280,
    width: width - 100,
    height: 24,
    color: rgb(0.10, 0.18, 0.35)
  });
  page4.drawText('SECTION 482: DIRECTION FOR GRANT OF BAIL TO PERSON APPREHENDING ARREST (ANTICIPATORY BAIL)', {
    x: 62,
    y: height - 274,
    size: 7.8,
    font: fontBold,
    color: colorGold
  });

  const sec482Text = [
    '(1) Where any person has reason to believe that he may be arrested on accusation of having committed a non-bailable',
    '    offence, he may apply to the High Court or the Court of Session for a direction under this section that in the event',
    '    of such arrest he shall be released on bail; and that Court may, after taking into consideration, inter alia, the',
    '    following factors, namely:—',
    '    (i) the nature and gravity of the accusation;',
    '    (ii) the antecedents of the applicant including the fact as to whether he has previously undergone imprisonment on',
    '         conviction by a Court in respect of any cognizable offence;',
    '    (iii) the possibility of the applicant to flee from justice; and',
    '    (iv) where the accusation has been made with the object of injuring or humiliating the applicant by having him so arrested,',
    '    either reject the application forthwith or issue an interim order for the grant of anticipatory bail.',
    '',
    '(2) When the High Court or the Court of Session makes an order granting anticipatory bail, it may include such conditions',
    '    in the light of the facts of the particular case, as it may think fit, including conditions of attending investigation.'
  ];
  sec482Text.forEach((l, idx) => {
    page4.drawText(l, { x: 62, y: height - 296 - (idx * 10), size: 7.2, font: fontRegular, color: colorCharcoal });
  });

  // Landmark Precedents Annotation Box
  page4.drawRectangle({
    x: 50,
    y: 80,
    width: width - 100,
    height: 110,
    color: colorWhite,
    borderColor: colorDarkGold,
    borderWidth: 0.8
  });
  page4.drawRectangle({
    x: 50,
    y: 186,
    width: width - 100,
    height: 4,
    color: colorGold
  });
  page4.drawText('LANDMARK JUDICIAL PRECEDENTS ON SECTION 482 BNSS (CHAMBERS ANNOTATION)', {
    x: 62,
    y: 172,
    size: 8.5,
    font: fontBold,
    color: colorNavy
  });

  const precedents = [
    '• Sushila Aggarwal v. State (NCT of Delhi) [2020 INSC 106 / (2020) 5 SCC 1 - 5 Judge Bench]: Anticipatory bail does not end',
    '  automatically on the filing of the charge-sheet or summoning by trial court; it ordinarily endures till conclusion of trial.',
    '• Arnesh Kumar v. State of Bihar [(2014) 8 SCC 273]: Mandatory compliance with notice under Section 35(3) BNSS before arrest',
    '  in offences punishable up to seven years; arrest is not mandatory merely because police have statutory authority.',
    '• Satender Kumar Antil v. CBI [(2022) 10 SCC 51]: Bail jurisprudence guidelines; trial courts must not mechanically remand.'
  ];
  precedents.forEach((l, idx) => {
    page4.drawText(l, { x: 62, y: 156 - (idx * 11), size: 7.2, font: fontRegular, color: colorCharcoal });
  });

  // ==========================================
  // APPLY RUNNING HEADERS & FOOTERS (Pages 2+)
  // ==========================================
  const totalPages = doc.getPageCount();

  pagesList.forEach(({ page, pageNumber, sectionTitle, isEditorial }) => {
    const pW = page.getWidth();
    const pH = page.getHeight();

    // Top Header
    if (!isEditorial) {
      page.drawText('THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023 (ACT 46 OF 2023)', {
        x: 50,
        y: pH - 42,
        size: 8,
        font: fontBold,
        color: colorNavy
      });
      page.drawText(sectionTitle || 'PUNIA ASSOCIATES LEGAL LIBRARY', {
        x: pW - 250,
        y: pH - 42,
        size: 7.5,
        font: fontBold,
        color: colorDarkGold
      });
      page.drawLine({
        start: { x: 50, y: pH - 48 },
        end: { x: pW - 50, y: pH - 48 },
        thickness: 0.8,
        color: colorRule
      });
    }

    // Bottom Running Footer
    page.drawLine({
      start: { x: 50, y: 50 },
      end: { x: pW - 50, y: 50 },
      thickness: 0.8,
      color: colorRule
    });

    // Left: Firm Branding ONLY (No website, No phone number, No contact details)
    page.drawText('PUNIA ASSOCIATES', {
      x: 50,
      y: 36,
      size: 9,
      font: fontBold,
      color: colorNavy
    });

    // Right: Page X of Y
    page.drawText(`Page ${pageNumber} of ${totalPages}`, {
      x: pW - 105,
      y: 36,
      size: 8,
      font: fontBold,
      color: colorDarkGold
    });

    page.drawText('Statutory Bare Act Reference Edition • For Court Filings, Judicial & Academic Research', {
      x: 50,
      y: 24,
      size: 6.8,
      font: fontOblique,
      color: colorSlateMuted
    });
  });

  const pdfBytes = await doc.save();
  const outDir = path.resolve(__dirname, '..', 'public', 'bare-acts', 'stored');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const targetPath = path.join(outDir, 'the_bharatiya_nagarik_suraksha_sanhita_2023_punia_associates_modern_book_edition.pdf');
  fs.writeFileSync(targetPath, pdfBytes);

  console.log(`Generated BNSS Modern Law Book PDF: ${targetPath} (${pdfBytes.length} bytes, ${totalPages} pages)`);
  return { path: targetPath, bytes: pdfBytes.length, pages: totalPages };
}

generateBnssBook().catch(err => {
  console.error('Error generating BNSS Book:', err);
  process.exit(1);
});
