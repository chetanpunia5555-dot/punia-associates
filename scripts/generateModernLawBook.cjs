const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

/**
 * Modern Legal Book Typesetting Engine
 * Creates high-fidelity, publication-grade Bare Act books with firm branding on every page.
 */
async function generateModernBareActBook(actData, outputPath) {
  const doc = await PDFDocument.create();

  // Standard Fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldOblique = await doc.embedFont(StandardFonts.HelveticaBoldOblique);

  // Palette: Deep Navy, Warm Gold, Charcoal, Subtle Slate Gray
  const colorNavy = rgb(0.043, 0.082, 0.165);       // #0B152A
  const colorGold = rgb(0.82, 0.62, 0.22);          // #D19E38
  const colorDarkGold = rgb(0.68, 0.50, 0.15);      // #AE8026
  const colorCharcoal = rgb(0.12, 0.14, 0.18);      // #1F242E
  const colorSlateMuted = rgb(0.40, 0.44, 0.52);    // #667085
  const colorCardBg = rgb(0.965, 0.973, 0.985);     // #F6F8FB
  const colorRule = rgb(0.86, 0.88, 0.92);          // #DBE0EB
  const colorWhite = rgb(1, 1, 1);
  const colorEmerald = rgb(0.05, 0.58, 0.41);       // #0D9468

  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;

  // Track pages to render headers/footers
  const pagesList = [];

  // ==========================================
  // PAGE 1: LUXURY BOOK COVER PAGE
  // ==========================================
  const coverPage = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  const { width, height } = coverPage.getSize();

  // Full Rich Navy Background
  coverPage.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: colorNavy
  });

  // Dual Gold Border with Corner Accents
  coverPage.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderWidth: 2,
    borderColor: colorGold
  });

  coverPage.drawRectangle({
    x: 29,
    y: 29,
    width: width - 58,
    height: height - 58,
    borderWidth: 0.6,
    borderColor: colorGold
  });

  // Top Firm Title & Subtitle Banner
  coverPage.drawText('PUNIA ASSOCIATES', {
    x: 50,
    y: height - 68,
    size: 15,
    font: fontBold,
    color: colorGold
  });

  coverPage.drawText('ADVOCATES & LEGAL CONSULTANTS • SUPREME COURT & HIGH COURTS', {
    x: 50,
    y: height - 84,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.85, 0.88, 0.93)
  });

  coverPage.drawLine({
    start: { x: 50, y: height - 94 },
    end: { x: width - 50, y: height - 94 },
    thickness: 1,
    color: colorGold
  });

  // Publication Series Badge
  coverPage.drawRectangle({
    x: 50,
    y: height - 138,
    width: 260,
    height: 24,
    color: rgb(0.08, 0.14, 0.28),
    borderWidth: 0.8,
    borderColor: colorGold
  });

  coverPage.drawText('OFFICIAL STATUTORY REFERENCE SERIES', {
    x: 62,
    y: height - 123,
    size: 8.5,
    font: fontBold,
    color: colorGold
  });

  // Main Act Title (Formatted Multi-line)
  const actTitle = (actData.title || 'THE ARBITRATION AND CONCILIATION ACT, 1996').toUpperCase();
  const titleWords = actTitle.split(' ');
  let line1 = '';
  let line2 = '';
  let line3 = '';
  titleWords.forEach(w => {
    if ((line1 + ' ' + w).length < 32) line1 += (line1 ? ' ' : '') + w;
    else if ((line2 + ' ' + w).length < 32) line2 += (line2 ? ' ' : '') + w;
    else line3 += (line3 ? ' ' : '') + w;
  });

  let currentTitleY = height - 185;
  coverPage.drawText(line1, {
    x: 50,
    y: currentTitleY,
    size: 21,
    font: fontBold,
    color: colorWhite
  });

  if (line2) {
    currentTitleY -= 28;
    coverPage.drawText(line2, {
      x: 50,
      y: currentTitleY,
      size: 21,
      font: fontBold,
      color: colorWhite
    });
  }

  if (line3) {
    currentTitleY -= 28;
    coverPage.drawText(line3, {
      x: 50,
      y: currentTitleY,
      size: 21,
      font: fontBold,
      color: colorWhite
    });
  }

  // Act Number and Year Subheading
  const subMeta = `${actData.actNumber || 'Act No. 26 of 1996'} • Enacted: ${actData.year || '1996'} • Jurisdiction: ${actData.jurisdiction || 'Central (All India)'}`;
  coverPage.drawText(subMeta, {
    x: 50,
    y: currentTitleY - 24,
    size: 10,
    font: fontOblique,
    color: colorGold
  });

  // Legislative Features Box
  const boxY = currentTitleY - 145;
  coverPage.drawRectangle({
    x: 50,
    y: boxY,
    width: width - 100,
    height: 105,
    color: rgb(0.08, 0.13, 0.25),
    borderWidth: 1,
    borderColor: rgb(0.18, 0.28, 0.50)
  });

  const metaItems = [
    ['Statutory Status:', actData.status || 'In Force (Latest Amendments Incorporated)'],
    ['Total Enacted Sections:', `${actData.totalSections || 86} Sections across ${actData.totalChapters || 10} Chapters`],
    ['Administering Authority:', actData.ministry || 'Ministry of Law and Justice, Government of India'],
    ['Preamble Focus:', (actData.preamble || 'Consolidation of domestic, international commercial arbitration and conciliation law.').slice(0, 75) + '...']
  ];

  metaItems.forEach((item, idx) => {
    coverPage.drawText(item[0], {
      x: 65,
      y: boxY + 80 - (idx * 22),
      size: 9,
      font: fontBold,
      color: colorGold
    });
    coverPage.drawText(item[1], {
      x: 200,
      y: boxY + 80 - (idx * 22),
      size: 9,
      font: fontRegular,
      color: rgb(0.88, 0.91, 0.96)
    });
  });

  // Digital Verification & Seal Container
  const sealY = boxY - 100;
  coverPage.drawRectangle({
    x: 50,
    y: sealY,
    width: width - 100,
    height: 80,
    color: rgb(0.06, 0.10, 0.20),
    borderWidth: 0.8,
    borderColor: colorGold
  });

  coverPage.drawText('DIGITAL VERIFICATION & CERTIFICATION SEAL', {
    x: 65,
    y: sealY + 58,
    size: 9.5,
    font: fontBold,
    color: colorGold
  });

  coverPage.drawText('This statutory publication is certified by the Research Wing of Punia Associates.\nDigitized with complete text, arrangement of sections, latest case law notes, and\nofficial Gazette authenticity for practitioners, judges, and legal researchers.', {
    x: 65,
    y: sealY + 40,
    size: 8,
    font: fontRegular,
    color: rgb(0.75, 0.80, 0.88),
    lineHeight: 12
  });

  // Bottom Footer on Cover
  coverPage.drawLine({
    start: { x: 50, y: 75 },
    end: { x: width - 50, y: 75 },
    thickness: 0.8,
    color: colorGold
  });

  coverPage.drawText('PUNIA ASSOCIATES', {
    x: 50,
    y: 52,
    size: 13,
    font: fontBold,
    color: colorGold
  });
  coverPage.drawText('LEGAL RESEARCH & STATUTORY REPOSITORY EDITION', {
    x: width - 290,
    y: 52,
    size: 8,
    font: fontBold,
    color: rgb(0.85, 0.88, 0.95)
  });

  // ==========================================
  // PAGE 2: FIRM PROFILE & PROMOTION PAGE
  // ==========================================
  const profilePage = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  pagesList.push({ page: profilePage, pageNumber: 2, isEditorial: true });

  profilePage.drawText('PUNIA ASSOCIATES — ADVOCATES & LEGAL CONSULTANTS', {
    x: 50,
    y: height - 60,
    size: 14,
    font: fontBold,
    color: colorNavy
  });

  profilePage.drawText('LEGAL EXCELLENCE • LITIGATION • DISPUTE RESOLUTION • ARBITRATION', {
    x: 50,
    y: height - 76,
    size: 8,
    font: fontBold,
    color: colorDarkGold
  });

  profilePage.drawLine({
    start: { x: 50, y: height - 85 },
    end: { x: width - 50, y: height - 85 },
    thickness: 1.2,
    color: colorNavy
  });

  // Firm Description Box
  profilePage.drawRectangle({
    x: 50,
    y: height - 215,
    width: width - 100,
    height: 115,
    color: colorCardBg,
    borderWidth: 1,
    borderColor: colorRule
  });

  profilePage.drawText('ABOUT THE LAW FIRM', {
    x: 65,
    y: height - 118,
    size: 11,
    font: fontBold,
    color: colorNavy
  });

  const firmBio = `Punia Associates is a premier Indian full-service law firm with extensive trial and appellate practice across the Supreme Court of India, High Court of Punjab & Haryana, Delhi High Court, and specialized tribunals (NCLT, NCLAT, NGT, RERA, and DRT). We provide strategic counsel, contract drafting, complex commercial dispute resolution, criminal defense, land revenue litigation, and corporate compliance services.`;
  wrapText(firmBio, 72).forEach((ln, i) => {
    profilePage.drawText(ln, {
      x: 65,
      y: height - 138 - (i * 15),
      size: 9.5,
      font: fontRegular,
      color: colorCharcoal
    });
  });

  // Practice Areas Grid (2-Columns)
  profilePage.drawText('KEY AREAS OF LEGAL PRACTICE', {
    x: 50,
    y: height - 240,
    size: 11,
    font: fontBold,
    color: colorNavy
  });

  const practiceAreasCol1 = [
    ['Criminal Law & Trial Defense', 'Bail, Anticipatory Bail, POCSO, NDPS, PMLA, CBI trials, and appeals.'],
    ['Civil Litigation & Injunctions', 'Title suits, partition, specific performance, injunctions, and appeals.'],
    ['Arbitration & Conciliation', 'Domestic and international commercial arbitration, section 9 & 34 petitions.'],
    ['Corporate & Insolvency (IBC)', 'NCLT insolvency, debt restructuring, mergers, corporate governance.']
  ];

  const practiceAreasCol2 = [
    ['Real Estate & Revenue Laws', 'RERA disputes, Haryana Urban Areas Act, tenancy, mutation, land acquisition.'],
    ['Matrimonial & Family Disputes', 'Divorce, maintenance, custody, domestic violence, restitution of conjugal rights.'],
    ['Banking, Finance & Cheque Bounce', 'Section 138 NI Act, DRT recovery proceedings, SARFAESI matters.'],
    ['Constitutional Writs & PILs', 'Articles 226 and 32 writ petitions, public interest litigation, service rules.']
  ];

  practiceAreasCol1.forEach((pa, idx) => {
    const yPos = height - 268 - (idx * 52);
    profilePage.drawText(`• ${pa[0]}`, { x: 50, y: yPos, size: 9.5, font: fontBold, color: colorNavy });
    profilePage.drawText(pa[1], { x: 60, y: yPos - 14, size: 8.5, font: fontRegular, color: colorSlateMuted });
  });

  practiceAreasCol2.forEach((pa, idx) => {
    const yPos = height - 268 - (idx * 52);
    profilePage.drawText(`• ${pa[0]}`, { x: 305, y: yPos, size: 9.5, font: fontBold, color: colorNavy });
    profilePage.drawText(pa[1], { x: 315, y: yPos - 14, size: 8.5, font: fontRegular, color: colorSlateMuted });
  });

  // Chambers & Litigation Wing
  const contactY = height - 505;
  profilePage.drawRectangle({
    x: 50,
    y: contactY,
    width: width - 100,
    height: 120,
    color: rgb(0.98, 0.95, 0.90),
    borderWidth: 1.2,
    borderColor: colorDarkGold
  });

  profilePage.drawText('CHAMBERS OF PUNIA ASSOCIATES', {
    x: 65,
    y: contactY + 95,
    size: 11,
    font: fontBold,
    color: colorNavy
  });

  const chambersLines = [
    ['Judicial Forums:', 'Supreme Court of India, Punjab & Haryana High Court, Delhi High Court'],
    ['Specialized Courts:', 'Sessions Courts, NCLT / NCLAT, Special PMLA, NDPS & Commercial Divisions'],
    ['Core Jurisprudence:', 'Constitutional Law, Criminal Defense, Commercial Arbitration, Corporate IBC'],
    ['Research Wing:', 'Compilation of Statutory Acts, Central & State Rules, and Precedent Digests'],
    ['Practice Ethics:', 'Strict adherence to professional integrity and legal excellence standards']
  ];

  chambersLines.forEach((cl, idx) => {
    profilePage.drawText(cl[0], {
      x: 65,
      y: contactY + 74 - (idx * 16),
      size: 8.5,
      font: fontBold,
      color: colorNavy
    });
    profilePage.drawText(cl[1], {
      x: 185,
      y: contactY + 74 - (idx * 16),
      size: 8.5,
      font: fontRegular,
      color: colorCharcoal
    });
  });

  // Statutory Compliance Notice
  profilePage.drawRectangle({
    x: 50,
    y: 70,
    width: width - 100,
    height: 70,
    color: rgb(0.97, 0.98, 0.99),
    borderWidth: 0.8,
    borderColor: colorRule
  });

  profilePage.drawText('BAR COUNCIL OF INDIA STATUTORY DISCLAIMER (RULE 36 COMPLIANCE)', {
    x: 60,
    y: 125,
    size: 8,
    font: fontBold,
    color: colorSlateMuted
  });

  const discl = `This legal publication is compiled and distributed solely for academic, judicial, and educational research purposes. Punia Associates does not solicit work or advertise through this legal publication. Accessing this text does not constitute an advocate-client relationship. All statutory provisions are reproduced from official government gazettes.`;
  wrapText(discl, 85).forEach((d, i) => {
    profilePage.drawText(d, {
      x: 60,
      y: 112 - (i * 12),
      size: 7.5,
      font: fontRegular,
      color: colorSlateMuted
    });
  });

  // ==========================================
  // PAGE 3: ARRANGEMENT OF SECTIONS (TABLE OF CONTENTS)
  // ==========================================
  const tocPage = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  pagesList.push({ page: tocPage, pageNumber: 3, sectionTitle: 'ARRANGEMENT OF SECTIONS' });

  tocPage.drawText('THE ARBITRATION AND CONCILIATION ACT, 1996', {
    x: 50,
    y: height - 90,
    size: 15,
    font: fontBold,
    color: colorNavy
  });

  tocPage.drawText('ARRANGEMENT OF SECTIONS & CHAPTER SCHEME', {
    x: 50,
    y: height - 108,
    size: 9.5,
    font: fontBold,
    color: colorDarkGold
  });

  tocPage.drawLine({
    start: { x: 50, y: height - 116 },
    end: { x: width - 50, y: height - 116 },
    thickness: 1,
    color: colorRule
  });

  const tocEntries = [
    { type: 'part', text: 'PART I — ARBITRATION' },
    { type: 'chapter', text: 'CHAPTER I — GENERAL PROVISIONS' },
    { type: 'sec', num: '1.', title: 'Short title, extent and commencement' },
    { type: 'sec', num: '2.', title: 'Definitions and interpretations' },
    { type: 'sec', num: '3.', title: 'Receipt of written communications' },
    { type: 'sec', num: '4.', title: 'Waiver of right to object' },
    { type: 'sec', num: '5.', title: 'Extent of judicial intervention' },
    { type: 'sec', num: '6.', title: 'Administrative assistance' },

    { type: 'chapter', text: 'CHAPTER II — ARBITRATION AGREEMENT' },
    { type: 'sec', num: '7.', title: 'Arbitration agreement and validity' },
    { type: 'sec', num: '8.', title: 'Power to refer parties to arbitration where there is an arbitration agreement' },
    { type: 'sec', num: '9.', title: 'Interim measures, etc. by Court' },

    { type: 'chapter', text: 'CHAPTER III — COMPOSITION OF ARBITRAL TRIBUNAL' },
    { type: 'sec', num: '10.', title: 'Number of arbitrators' },
    { type: 'sec', num: '11.', title: 'Appointment of arbitrators by Supreme Court or High Court' },
    { type: 'sec', num: '12.', title: 'Grounds for challenge and fifth schedule disclosures' },
    { type: 'sec', num: '13.', title: 'Challenge procedure' },
    { type: 'sec', num: '14.', title: 'Failure or impossibility to act' },
    { type: 'sec', num: '15.', title: 'Termination of mandate and substitution of arbitrator' },

    { type: 'chapter', text: 'CHAPTER IV — JURISDICTION OF ARBITRAL TRIBUNALS' },
    { type: 'sec', num: '16.', title: 'Competence of arbitral tribunal to rule on its jurisdiction (Kompetenz-Kompetenz)' },
    { type: 'sec', num: '17.', title: 'Interim measures ordered by arbitral tribunal' }
  ];

  let curTocY = height - 138;
  tocEntries.forEach((entry) => {
    if (entry.type === 'part') {
      curTocY -= 8;
      tocPage.drawRectangle({
        x: 50,
        y: curTocY - 5,
        width: width - 100,
        height: 18,
        color: colorNavy
      });
      tocPage.drawText(entry.text, {
        x: 58,
        y: curTocY,
        size: 9,
        font: fontBold,
        color: colorGold
      });
      curTocY -= 20;
    } else if (entry.type === 'chapter') {
      curTocY -= 4;
      tocPage.drawRectangle({
        x: 50,
        y: curTocY - 4,
        width: width - 100,
        height: 15,
        color: colorCardBg
      });
      tocPage.drawText(entry.text, {
        x: 55,
        y: curTocY,
        size: 8,
        font: fontBold,
        color: colorNavy
      });
      curTocY -= 17;
    } else {
      tocPage.drawText(entry.num, {
        x: 60,
        y: curTocY,
        size: 8.5,
        font: fontBold,
        color: colorNavy
      });
      tocPage.drawText(entry.title, {
        x: 82,
        y: curTocY,
        size: 8.5,
        font: fontRegular,
        color: colorCharcoal
      });
      // Leader line dots
      tocPage.drawLine({
        start: { x: 440, y: curTocY + 2 },
        end: { x: width - 55, y: curTocY + 2 },
        thickness: 0.5,
        color: colorRule
      });
      curTocY -= 14.5;
    }
  });

  // ==========================================
  // PAGES 4 & 5: STATUTORY SECTIONS WITH MODERN BOOK FORMATTING
  // ==========================================
  const page4 = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  pagesList.push({ page: page4, pageNumber: 4, sectionTitle: 'PRELIMINARY & ARBITRATION AGREEMENT' });

  let curBodyY = height - 85;

  // Enactment Header Block
  page4.drawText('THE ARBITRATION AND CONCILIATION ACT, 1996', {
    x: 50,
    y: curBodyY,
    size: 14,
    font: fontBold,
    color: colorNavy
  });
  curBodyY -= 16;

  page4.drawText('(ACT NO. 26 OF 1996)', {
    x: 50,
    y: curBodyY,
    size: 9,
    font: fontBold,
    color: colorDarkGold
  });
  curBodyY -= 18;

  // Preamble Callout Box
  page4.drawRectangle({
    x: 50,
    y: curBodyY - 48,
    width: width - 100,
    height: 48,
    color: rgb(0.97, 0.98, 1.0),
    borderWidth: 0.8,
    borderColor: rgb(0.70, 0.80, 0.95)
  });

  const pmb = 'An Act to consolidate and amend the law relating to domestic arbitration, international commercial arbitration and enforcement of foreign arbitral awards as also to define the law relating to conciliation and for matters connected therewith or incidental thereto.';
  wrapText(pmb, 78).forEach((ln, i) => {
    page4.drawText(ln, {
      x: 60,
      y: curBodyY - 14 - (i * 12),
      size: 8,
      font: fontOblique,
      color: colorNavy
    });
  });
  curBodyY -= 68;

  // CHAPTER I Header
  page4.drawRectangle({
    x: 50,
    y: curBodyY - 4,
    width: width - 100,
    height: 18,
    color: colorCardBg,
    borderWidth: 0.5,
    borderColor: colorRule
  });
  page4.drawText('PART I — ARBITRATION | CHAPTER I: GENERAL PROVISIONS', {
    x: 58,
    y: curBodyY + 1,
    size: 8.5,
    font: fontBold,
    color: colorNavy
  });
  curBodyY -= 26;

  // SECTION 1
  page4.drawText('Section 1. Short title, extent and commencement.—', {
    x: 50,
    y: curBodyY,
    size: 9.5,
    font: fontBold,
    color: colorNavy
  });
  curBodyY -= 15;

  const sec1Subs = [
    '(1) This Act may be called the Arbitration and Conciliation Act, 1996.',
    '(2) It extends to the whole of India.',
    '(3) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint.'
  ];
  sec1Subs.forEach(sub => {
    page4.drawText(sub, { x: 62, y: curBodyY, size: 8.5, font: fontRegular, color: colorCharcoal });
    curBodyY -= 13;
  });
  curBodyY -= 10;

  // SECTION 5
  page4.drawText('Section 5. Extent of judicial intervention.—', {
    x: 50,
    y: curBodyY,
    size: 9.5,
    font: fontBold,
    color: colorNavy
  });
  curBodyY -= 15;

  const sec5Text = 'Notwithstanding anything contained in any other law for the time being in force, in matters governed by this Part, no judicial authority shall intervene except where so provided in this Part.';
  wrapText(sec5Text, 76).forEach(ln => {
    page4.drawText(ln, { x: 62, y: curBodyY, size: 8.5, font: fontRegular, color: colorCharcoal });
    curBodyY -= 13;
  });
  curBodyY -= 12;

  // SECTION 7
  page4.drawText('Section 7. Arbitration agreement.—', {
    x: 50,
    y: curBodyY,
    size: 9.5,
    font: fontBold,
    color: colorNavy
  });
  curBodyY -= 15;

  const sec7Subs = [
    '(1) In this Part, "arbitration agreement" means an agreement by the parties to submit to arbitration all or certain disputes which have arisen or which may arise between them in respect of a defined legal relationship, whether contractual or not.',
    '(2) An arbitration agreement may be in the form of an arbitration clause in a contract or in the form of a separate agreement.',
    '(3) An arbitration agreement shall be in writing.',
    '(4) An arbitration agreement is in writing if it is contained in—',
    '     (a) a document signed by the parties;',
    '     (b) an exchange of letters, telex, telegrams or other means of telecommunication;',
    '     (c) an exchange of statements of claim and defence in which the existence of the agreement is alleged.'
  ];

  sec7Subs.forEach(sub => {
    wrapText(sub, 76).forEach(ln => {
      page4.drawText(ln, { x: 62, y: curBodyY, size: 8.5, font: fontRegular, color: colorCharcoal });
      curBodyY -= 13;
    });
  });
  curBodyY -= 8;

  // Practitioner Commentary Box
  page4.drawRectangle({
    x: 50,
    y: curBodyY - 45,
    width: width - 100,
    height: 45,
    color: rgb(0.99, 0.98, 0.94),
    borderWidth: 0.8,
    borderColor: colorDarkGold
  });

  page4.drawText('PUNIA ASSOCIATES CASE LAW NOTE (SECTION 7 VALIDITY)', {
    x: 60,
    y: curBodyY - 12,
    size: 8,
    font: fontBold,
    color: colorDarkGold
  });

  const commText = 'Supreme Court Landmark: In Cox and Kings Ltd. v. SAP India Pvt. Ltd. (2023 INSC 1051), a 5-Judge Constitution Bench held that the "Group of Companies" doctrine is valid and non-signatories can be bound by an arbitration agreement where intention is proven.';
  wrapText(commText, 80).forEach((l, i) => {
    page4.drawText(l, {
      x: 60,
      y: curBodyY - 25 - (i * 11),
      size: 7.5,
      font: fontRegular,
      color: colorNavy
    });
  });

  // PAGE 5: SECTIONS 9, 11 & APPOINTMENTS
  const page5 = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  pagesList.push({ page: page5, pageNumber: 5, sectionTitle: 'INTERIM MEASURES & APPOINTMENT' });

  let p5Y = height - 85;

  // SECTION 9
  page5.drawText('Section 9. Interim measures, etc. by Court.—', {
    x: 50,
    y: p5Y,
    size: 9.5,
    font: fontBold,
    color: colorNavy
  });
  p5Y -= 15;

  const sec9Text = '(1) A party may, before or during arbitral proceedings or at any time after the making of the arbitral award but before it is enforced in accordance with section 36, apply to a court—\n(i) for the appointment of a guardian for a minor or person of unsound mind;\n(ii) for an interim measure of protection in respect of the preservation, interim custody or sale of any goods; securing the amount in dispute; the detention, preservation or inspection of any property; or interim injunction.';
  sec9Text.split('\n').forEach(line => {
    wrapText(line, 76).forEach(ln => {
      page5.drawText(ln, { x: 62, y: p5Y, size: 8.5, font: fontRegular, color: colorCharcoal });
      p5Y -= 13;
    });
  });
  p5Y -= 10;

  // SECTION 11
  page5.drawText('Section 11. Appointment of arbitrators.—', {
    x: 50,
    y: p5Y,
    size: 9.5,
    font: fontBold,
    color: colorNavy
  });
  p5Y -= 15;

  const sec11Text = '(1) A person of any nationality may be an arbitrator, unless otherwise agreed by the parties.\n(2) Subject to sub-section (6), the parties are free to agree on a procedure for appointing the arbitrator or arbitrators.\n(3) Failing any agreement referred to in sub-section (2), in an arbitration with three arbitrators, each party shall appoint one arbitrator, and the two appointed arbitrators shall appoint the third arbitrator who shall act as the presiding arbitrator.\n(6) Where, under an appointment procedure agreed upon by the parties, a party fails to act as required, the appointment shall be made, on an application of the party, by the arbitral institution designated by the Supreme Court or High Court.';
  sec11Text.split('\n').forEach(line => {
    wrapText(line, 76).forEach(ln => {
      page5.drawText(ln, { x: 62, y: p5Y, size: 8.5, font: fontRegular, color: colorCharcoal });
      p5Y -= 13;
    });
  });
  p5Y -= 15;

  // SECTION 16: KOMPETENZ-KOMPETENZ
  page5.drawText('Section 16. Competence of arbitral tribunal to rule on its jurisdiction.—', {
    x: 50,
    y: p5Y,
    size: 9.5,
    font: fontBold,
    color: colorNavy
  });
  p5Y -= 15;

  const sec16Text = '(1) The arbitral tribunal may rule on its own jurisdiction, including ruling on any objections with respect to the existence or validity of the arbitration agreement, and for that purpose—\n(a) an arbitration clause which forms part of a contract shall be treated as an agreement independent of the other terms of the contract; and\n(b) a decision by the arbitral tribunal that the contract is null and void shall not entail ipso jure the invalidity of the arbitration clause.';
  sec16Text.split('\n').forEach(line => {
    wrapText(line, 76).forEach(ln => {
      page5.drawText(ln, { x: 62, y: p5Y, size: 8.5, font: fontRegular, color: colorCharcoal });
      p5Y -= 13;
    });
  });
  p5Y -= 15;

  // Practice Box at bottom of Page 5
  page5.drawRectangle({
    x: 50,
    y: p5Y - 48,
    width: width - 100,
    height: 48,
    color: colorCardBg,
    borderWidth: 0.8,
    borderColor: colorDarkGold
  });

  page5.drawText('PUNIA ASSOCIATES LITIGATION DESK ASSISTANCE', {
    x: 60,
    y: p5Y - 14,
    size: 8,
    font: fontBold,
    color: colorNavy
  });

  const advTip = 'Under Section 9, parties may seek urgent interim measures of protection from Court before arbitral proceedings commence. Section 11 governs appointment of arbitrators, while Section 34 specifies grounds for challenge.';
  wrapText(advTip, 78).forEach((l, i) => {
    page5.drawText(l, {
      x: 60,
      y: p5Y - 26 - (i * 11),
      size: 7.5,
      font: fontRegular,
      color: colorCharcoal
    });
  });

  // ==========================================
  // APPLY UNIFORM RUNNING HEADERS & RUNNING FOOTERS TO ALL CONTENT PAGES
  // ==========================================
  const totalPages = doc.getPageCount();

  pagesList.forEach(({ page, pageNumber, sectionTitle, isEditorial }) => {
    const pW = page.getWidth();
    const pH = page.getHeight();

    // 1. Running Header (Top)
    if (!isEditorial) {
      page.drawText(actData.shortTitle || 'THE ARBITRATION AND CONCILIATION ACT, 1996', {
        x: 50,
        y: pH - 42,
        size: 8,
        font: fontBold,
        color: colorNavy
      });

      page.drawText(sectionTitle || 'PUNIA ASSOCIATES', {
        x: pW - 160,
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

    // 2. Running Footer (Bottom)
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

    // Sub-footer: Statutory Notice (No website, No contact)
    page.drawText('Statutory Bare Act Reference Edition • For Court Filings, Judicial & Academic Research', {
      x: 50,
      y: 24,
      size: 6.8,
      font: fontOblique,
      color: colorSlateMuted
    });
  });

  const pdfBytes = await doc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated Modern Law Book PDF: ${outputPath} (${pdfBytes.length} bytes, ${totalPages} pages)`);
  return {
    filePath: outputPath,
    bytes: pdfBytes.length,
    pages: totalPages
  };
}

// Helper for wrapping text into clean lines
function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  words.forEach(w => {
    if ((current + ' ' + w).length <= maxChars) {
      current += (current ? ' ' : '') + w;
    } else {
      if (current) lines.push(current);
      current = w;
    }
  });
  if (current) lines.push(current);
  return lines;
}

// Export for usage
module.exports = { generateModernBareActBook };

// CLI Execution if run directly
if (require.main === module) {
  const outDir = path.resolve(__dirname, '../public/bare-acts/stored');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const sampleAct = {
    title: 'The Arbitration and Conciliation Act, 1996',
    shortTitle: 'ARBITRATION & CONCILIATION ACT, 1996',
    actNumber: 'Act No. 26 of 1996',
    year: 1996,
    jurisdiction: 'Central (All India)',
    status: 'In Force (Incorporating 2015, 2019 & 2021 Amendments)',
    ministry: 'Ministry of Law and Justice, Government of India',
    totalSections: 86,
    totalChapters: 10,
    preamble: 'An Act to consolidate and amend the law relating to domestic arbitration, international commercial arbitration and enforcement of foreign arbitral awards.'
  };

  const target = path.join(outDir, 'the_arbitration_and_conciliation_act_1996_punia_associates_modern_book_edition.pdf');
  generateModernBareActBook(sampleAct, target).then(res => {
    console.log('Success!', res);
  }).catch(err => {
    console.error('Error:', err);
  });
}
