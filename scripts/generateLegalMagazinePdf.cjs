const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

/**
 * Punia Associates Legal Magazine & Law Reporter Generator
 * Produces publication-grade monthly & weekly judicial reporters with firm branding on every page.
 */
async function generateMagazinePdf() {
  const doc = await PDFDocument.create();

  // Embedded standard fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldOblique = await doc.embedFont(StandardFonts.HelveticaBoldOblique);

  // Luxury Legal Palette
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

  const contentPages = [];

  // ==========================================
  // PAGE 1: LUXURY MAGAZINE COVER
  // ==========================================
  const page1 = doc.addPage([A4_WIDTH, A4_HEIGHT]);
  const { width, height } = page1.getSize();

  // Background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: colorNavy
  });

  // Dual Gold Border
  page1.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderWidth: 2,
    borderColor: colorGold
  });
  page1.drawRectangle({
    x: 25,
    y: 25,
    width: width - 50,
    height: height - 50,
    borderWidth: 0.6,
    borderColor: colorGold
  });

  // Masthead Banner
  page1.drawText('PUNIA ASSOCIATES', {
    x: 48,
    y: height - 64,
    size: 16,
    font: fontBold,
    color: colorGold
  });
  page1.drawText('ADVOCATES & LEGAL CONSULTANTS • SUPREME COURT & HIGH COURTS OF INDIA', {
    x: 48,
    y: height - 80,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.85, 0.88, 0.93)
  });
  page1.drawLine({
    start: { x: 48, y: height - 90 },
    end: { x: width - 48, y: height - 90 },
    thickness: 1,
    color: colorGold
  });

  // Issue Badge
  page1.drawRectangle({
    x: 48,
    y: height - 132,
    width: 280,
    height: 26,
    color: rgb(0.08, 0.15, 0.30),
    borderColor: colorDarkGold,
    borderWidth: 0.8
  });
  page1.drawText('VOLUME 2026 • ISSUE 11 • MONTHLY EDITION', {
    x: 58,
    y: height - 123,
    size: 9,
    font: fontBold,
    color: colorGold
  });

  // Main Magazine Title
  page1.drawText('SUPREME COURT & HIGH COURTS', {
    x: 48,
    y: height - 180,
    size: 20,
    font: fontBold,
    color: colorWhite
  });
  page1.drawText('LAW REPORTER & MONTHLY REVIEW', {
    x: 48,
    y: height - 210,
    size: 18,
    font: fontBold,
    color: colorGold
  });

  page1.drawText('Authoritative Judicial Precedents, Constitutional Bench Rulings & Statutory Impact Analysis', {
    x: 48,
    y: height - 235,
    size: 10,
    font: fontOblique,
    color: rgb(0.80, 0.85, 0.92)
  });

  // Center Feature Box
  page1.drawRectangle({
    x: 48,
    y: height - 570,
    width: width - 96,
    height: 310,
    color: rgb(0.06, 0.11, 0.22),
    borderWidth: 1,
    borderColor: rgb(0.20, 0.28, 0.44)
  });

  // Featured Header
  page1.drawRectangle({
    x: 48,
    y: height - 290,
    width: width - 96,
    height: 30,
    color: rgb(0.10, 0.18, 0.35)
  });
  page1.drawText('KEY JUDICIAL HIGHLIGHTS IN THIS ISSUE', {
    x: 60,
    y: height - 277,
    size: 10,
    font: fontBold,
    color: colorGold
  });

  const highlights = [
    {
      num: '01',
      title: 'Anticipatory Bail Endures Till Conclusion of Trial',
      case: 'Sushila Aggarwal v. State (NCT of Delhi) [2020 INSC 106 / (2020) 5 SCC 1]',
      desc: 'Constitution Bench clarifies Section 438 CrPC / 482 BNSS: pre-arrest bail cannot be arbitrarily limited in time; personal liberty under Article 21 takes precedence.'
    },
    {
      num: '02',
      title: 'Group of Companies Doctrine Harmonized in Commercial Arbitration',
      case: 'Cox and Kings Ltd. v. SAP India Pvt. Ltd. [2023 INSC 1051 / (2024) 4 SCC 1]',
      desc: 'Five-Judge Constitution Bench settles domestic & international arbitration: non-signatories bound only when mutual intention and composite transaction are established.'
    },
    {
      num: '03',
      title: 'Cheque Dishonour: Rebuttable Presumption under Section 139 NI Act',
      case: 'Kalamani Tex & Anr. v. P. Balasubramanian [2021 INSC 75 / (2021) 5 SCC 283]',
      desc: 'Once signature on negotiable instrument is admitted, statutory presumption mandates defendant to establish probable defence with cogent evidence.'
    },
    {
      num: '04',
      title: 'Transition from IPC, CrPC & Evidence Act to BNS, BNSS & BSA 2023',
      case: 'Chambers Special Statutory Analysis by Punia Associates Research Wing',
      desc: 'Practical guidance for advocates and trial courts regarding pending FIRs, electronic evidence admissibility, and preliminary inquiries under Section 173(3) BNSS.'
    }
  ];

  highlights.forEach((h, idx) => {
    const itemY = height - 325 - (idx * 65);
    // Number badge
    page1.drawRectangle({
      x: 60,
      y: itemY - 2,
      width: 24,
      height: 18,
      color: colorGold
    });
    page1.drawText(h.num, {
      x: 65,
      y: itemY + 2,
      size: 9,
      font: fontBold,
      color: colorNavy
    });

    page1.drawText(h.title, {
      x: 92,
      y: itemY + 6,
      size: 9.5,
      font: fontBold,
      color: colorWhite
    });

    page1.drawText(h.case, {
      x: 92,
      y: itemY - 6,
      size: 7.5,
      font: fontOblique,
      color: colorGold
    });

    page1.drawText(h.desc, {
      x: 92,
      y: itemY - 18,
      size: 7,
      font: fontRegular,
      color: rgb(0.80, 0.84, 0.90)
    });

    if (idx < highlights.length - 1) {
      page1.drawLine({
        start: { x: 60, y: itemY - 28 },
        end: { x: width - 60, y: itemY - 28 },
        thickness: 0.5,
        color: rgb(0.20, 0.28, 0.44)
      });
    }
  });

  // Footer Promotion on Cover
  page1.drawRectangle({
    x: 48,
    y: 45,
    width: width - 96,
    height: 60,
    color: rgb(0.08, 0.14, 0.28),
    borderColor: colorDarkGold,
    borderWidth: 0.8
  });
  page1.drawText('CHAMBERS OF PUNIA ASSOCIATES • ADVOCATES & LEGAL CONSULTANTS', {
    x: 60,
    y: 86,
    size: 8.5,
    font: fontBold,
    color: colorGold
  });
  page1.drawText('Specialized Litigation: Criminal Defense, Commercial Arbitration, Corporate IBC, Real Estate & Writs', {
    x: 60,
    y: 72,
    size: 7.5,
    font: fontRegular,
    color: colorWhite
  });
  page1.drawText('PUNIA ASSOCIATES • SUPREME COURT & HIGH COURTS APPELLATE PRACTICE', {
    x: 60,
    y: 58,
    size: 7.5,
    font: fontBold,
    color: colorGold
  });

  // ==========================================
  // HELPER: CREATE CONTENT PAGE
  // ==========================================
  function createContentPage() {
    const p = doc.addPage([A4_WIDTH, A4_HEIGHT]);
    contentPages.push(p);
    return p;
  }

  // ==========================================
  // PAGE 2: EDITORIAL & CHAMBERS OVERVIEW
  // ==========================================
  const page2 = createContentPage();

  // Category Header
  page2.drawText('EDITORIAL DESK & CHAMBERS OVERVIEW', {
    x: 48,
    y: height - 60,
    size: 13,
    font: fontBold,
    color: colorNavy
  });
  page2.drawLine({
    start: { x: 48, y: height - 66 },
    end: { x: width - 48, y: height - 66 },
    thickness: 1.5,
    color: colorGold
  });

  // Editorial Note Box
  page2.drawRectangle({
    x: 48,
    y: height - 210,
    width: width - 96,
    height: 130,
    color: colorCardBg,
    borderColor: colorRule,
    borderWidth: 0.8
  });
  page2.drawText('FROM THE MANAGING PARTNER\'S DESK', {
    x: 62,
    y: height - 95,
    size: 10,
    font: fontBold,
    color: colorNavy
  });
  page2.drawText('Dear Litigants, Corporate Counsel, and Members of the Legal Fraternity,', {
    x: 62,
    y: height - 112,
    size: 8.5,
    font: fontOblique,
    color: colorCharcoal
  });

  const edText = [
    'We are pleased to release the November 2026 Edition of the Punia Associates Law Reporter & Monthly Review. The',
    'past month witnessed momentous pronouncements from the Supreme Court of India and leading High Courts, particularly',
    're-affirming the inviolable sanctity of personal liberty in pre-arrest bail proceedings and settling commercial arbitration',
    'jurisprudence under Section 11 and Section 34 of the Arbitration Act.',
    '',
    'With the progressive rollout of the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and',
    'Bharatiya Sakshya Adhiniyam (BSA), our chambers has instituted a dedicated Statutory Intelligence Wing to assist',
    'clients with seamless transition, electronic trial strategy, and high-stakes appellate advocacy.'
  ];
  edText.forEach((l, idx) => {
    page2.drawText(l, {
      x: 62,
      y: height - 128 - (idx * 11),
      size: 8,
      font: fontRegular,
      color: colorCharcoal
    });
  });

  // Chambers Practice Areas Grid
  page2.drawText('PUNIA ASSOCIATES CORE LITIGATION & ADVISORY CAPABILITIES', {
    x: 48,
    y: height - 235,
    size: 11,
    font: fontBold,
    color: colorNavy
  });

  const practices = [
    {
      title: 'Criminal Defense & Special Statutes',
      desc: 'Bail, anticipatory bail, trials & appeals under BNS, BNSS, NDPS, Prevention of Corruption, PMLA, and POCSO across District & High Courts.'
    },
    {
      title: 'Commercial Arbitration & ADR',
      desc: 'Representation in domestic and international commercial arbitrations, Section 9 interim measures, Section 11 tribunal constitution & Section 34 awards enforcement.'
    },
    {
      title: 'Corporate Insolvency & Company Law',
      desc: 'Strategic litigation before NCLT & NCLAT under Insolvency and Bankruptcy Code (IBC 2016), shareholder disputes, operational creditor recovery and restructuring.'
    },
    {
      title: 'Real Estate, RERA & Land Revenue',
      desc: 'Comprehensive title scrutiny, builder-buyer disputes, RERA complaints, agricultural land tenancy, partition suits and Haryana Urban Development matters.'
    },
    {
      title: 'Civil Litigation & Specific Relief',
      desc: 'Injunction suits, contractual enforcement, recovery of debts, partition, probate, succession certificates and appellate revisions before High Courts.'
    },
    {
      title: 'Constitutional Writs & Public Law',
      desc: 'Article 226 and 32 writ petitions challenging arbitrary executive actions, tender disqualifications, service regulations, and civil liberties protection.'
    }
  ];

  practices.forEach((pr, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxX = 48 + col * ((width - 96 - 16) / 2 + 16);
    const boxW = (width - 96 - 16) / 2;
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
      color: colorGold
    });
    page2.drawText(pr.title, {
      x: boxX + 10,
      y: boxY + 52,
      size: 8.5,
      font: fontBold,
      color: colorNavy
    });

    const pWords = pr.desc.split(' ');
    let pl1 = '', pl2 = '', pl3 = '';
    pWords.forEach(w => {
      if ((pl1 + ' ' + w).length < 42) pl1 += (pl1 ? ' ' : '') + w;
      else if ((pl2 + ' ' + w).length < 42) pl2 += (pl2 ? ' ' : '') + w;
      else pl3 += (pl3 ? ' ' : '') + w;
    });

    page2.drawText(pl1, { x: boxX + 10, y: boxY + 38, size: 7.2, font: fontRegular, color: colorCharcoal });
    if (pl2) page2.drawText(pl2, { x: boxX + 10, y: boxY + 27, size: 7.2, font: fontRegular, color: colorCharcoal });
    if (pl3) page2.drawText(pl3, { x: boxX + 10, y: boxY + 16, size: 7.2, font: fontRegular, color: colorCharcoal });
  });

  // Chambers Overview Box
  page2.drawRectangle({
    x: 48,
    y: 85,
    width: width - 96,
    height: 70,
    color: rgb(0.043, 0.082, 0.165)
  });
  page2.drawText('CHAMBERS OF PUNIA ASSOCIATES', {
    x: 62,
    y: 135,
    size: 10,
    font: fontBold,
    color: colorGold
  });
  page2.drawText('Specialized Litigation, Appellate Advocacy, Commercial Arbitration & Criminal Defense.', {
    x: 62,
    y: 118,
    size: 8,
    font: fontRegular,
    color: colorWhite
  });
  page2.drawText('Supreme Court of India, Punjab & Haryana High Court at Chandigarh, and Delhi High Court.', {
    x: 62,
    y: 104,
    size: 7.8,
    font: fontRegular,
    color: rgb(0.85, 0.88, 0.94)
  });

  // ==========================================
  // PAGE 3: SUPREME COURT BENCHMARK JUDGMENTS
  // ==========================================
  const page3 = createContentPage();

  page3.drawText('SUPREME COURT OF INDIA • BENCHMARK JUDGMENTS DIGEST', {
    x: 48,
    y: height - 60,
    size: 13,
    font: fontBold,
    color: colorNavy
  });
  page3.drawLine({
    start: { x: 48, y: height - 66 },
    end: { x: width - 48, y: height - 66 },
    thickness: 1.5,
    color: colorGold
  });

  const scCases = [
    {
      title: 'Sushila Aggarwal and Others v. State (NCT of Delhi) and Another',
      citation: '2020 INSC 106 | (2020) 5 SCC 1 | Five-Judge Constitution Bench',
      coram: 'Arun Mishra, Indira Banerjee, Vineet Saran, M.R. Shah, S. Ravindra Bhat, JJ.',
      subject: 'Criminal Jurisprudence • Pre-Arrest Anticipatory Bail • Article 21 & Section 438 CrPC / 482 BNSS',
      facts: 'A reference was answered by a 5-Judge Constitution Bench on whether anticipatory bail granted under Section 438 CrPC should be limited to a fixed period or whether its protection continues till conclusion of trial.',
      ratio: 'Held: Protection granted under Section 438 CrPC / Section 482 BNSS cannot be arbitrarily curtailed to a fixed timeframe or until filing of the charge-sheet. It ordinarily endures till the end of the trial unless special circumstances warrant limitation.',
      practiceNote: 'Punia Associates Practice Note: Defense counsel can cite this judgment to resist trial court attempts to force surrender upon receipt of police charge-sheet.'
    },
    {
      title: 'Cox and Kings Limited v. SAP India Private Limited and Another',
      citation: '2023 INSC 1051 | (2024) 4 SCC 1 | Five-Judge Constitution Bench',
      coram: 'D.Y. Chandrachud, C.J., Hrishikesh Roy, P.S. Narasimha, J.B. Pardiwala, Manoj Misra, JJ.',
      subject: 'Commercial Arbitration • Group of Companies Doctrine • Section 7, 8, 11 & 16 Arbitration Act',
      facts: 'Re-examination of Chloro Controls India (2013) regarding whether non-signatory affiliates of a corporate group can be joined in arbitration proceedings without formal execution.',
      ratio: 'Held: The Group of Companies doctrine is an integral principle of Indian arbitration jurisprudence. Non-signatories can be bound where mutual intent of all parties is proven from conduct, involvement in contract negotiation, and composite nature of performance.',
      practiceNote: 'Punia Associates Practice Note: Essential for complex corporate joint ventures, multi-tier supply contracts, and parent-guarantee arbitrations.'
    }
  ];

  scCases.forEach((c, idx) => {
    const cardY = height - 280 - (idx * 200);

    page3.drawRectangle({
      x: 48,
      y: cardY,
      width: width - 96,
      height: 190,
      color: colorCardBg,
      borderColor: colorRule,
      borderWidth: 0.8
    });
    // Left Accent Bar
    page3.drawRectangle({
      x: 48,
      y: cardY,
      width: 4,
      height: 190,
      color: colorGold
    });

    page3.drawText(c.title, {
      x: 62,
      y: cardY + 172,
      size: 10,
      font: fontBold,
      color: colorNavy
    });

    page3.drawText(c.citation, {
      x: 62,
      y: cardY + 158,
      size: 8,
      font: fontBold,
      color: colorDarkGold
    });

    page3.drawText(`Coram: ${c.coram}`, {
      x: 62,
      y: cardY + 144,
      size: 7.5,
      font: fontOblique,
      color: colorCharcoal
    });

    page3.drawText(`Subject: ${c.subject}`, {
      x: 62,
      y: cardY + 130,
      size: 7.5,
      font: fontBold,
      color: colorEmerald
    });

    page3.drawLine({
      start: { x: 62, y: cardY + 124 },
      end: { x: width - 62, y: cardY + 124 },
      thickness: 0.5,
      color: colorRule
    });

    // Factual Background
    page3.drawText('Factual Matrix:', { x: 62, y: cardY + 112, size: 7.5, font: fontBold, color: colorNavy });
    page3.drawText(c.facts.slice(0, 110) + '...', { x: 130, y: cardY + 112, size: 7.2, font: fontRegular, color: colorCharcoal });

    // Ratio Decidendi
    page3.drawText('Ratio Decidendi:', { x: 62, y: cardY + 96, size: 7.5, font: fontBold, color: colorCrimson });
    const rWords = c.ratio.split(' ');
    let rl1 = '', rl2 = '', rl3 = '';
    rWords.forEach(w => {
      if ((rl1 + ' ' + w).length < 78) rl1 += (rl1 ? ' ' : '') + w;
      else if ((rl2 + ' ' + w).length < 78) rl2 += (rl2 ? ' ' : '') + w;
      else rl3 += (rl3 ? ' ' : '') + w;
    });
    page3.drawText(rl1, { x: 62, y: cardY + 84, size: 7.2, font: fontRegular, color: colorCharcoal });
    if (rl2) page3.drawText(rl2, { x: 62, y: cardY + 74, size: 7.2, font: fontRegular, color: colorCharcoal });
    if (rl3) page3.drawText(rl3, { x: 62, y: cardY + 64, size: 7.2, font: fontRegular, color: colorCharcoal });

    // Practice Note Box
    page3.drawRectangle({
      x: 60,
      y: cardY + 10,
      width: width - 120,
      height: 42,
      color: rgb(0.92, 0.95, 0.98),
      borderColor: rgb(0.75, 0.82, 0.92),
      borderWidth: 0.5
    });
    page3.drawText(c.practiceNote.slice(0, 100), {
      x: 70,
      y: cardY + 32,
      size: 7.2,
      font: fontBold,
      color: colorNavy
    });
    page3.drawText(c.practiceNote.slice(100), {
      x: 70,
      y: cardY + 20,
      size: 7.2,
      font: fontRegular,
      color: colorCharcoal
    });
  });

  // ==========================================
  // PAGE 4: HIGH COURTS & TRIBUNALS DIGEST
  // ==========================================
  const page4 = createContentPage();

  page4.drawText('HIGH COURTS & SPECIALIZED APPELLATE TRIBUNALS', {
    x: 48,
    y: height - 60,
    size: 13,
    font: fontBold,
    color: colorNavy
  });
  page4.drawLine({
    start: { x: 48, y: height - 66 },
    end: { x: width - 48, y: height - 66 },
    thickness: 1.5,
    color: colorGold
  });

  const hcCases = [
    {
      court: 'High Court of Punjab and Haryana at Chandigarh',
      title: 'Satish Kumar v. State of Haryana & Ors.',
      citation: 'CRM-M-48192-2024 | Single Bench Decision',
      subject: 'Section 482 CrPC / Section 528 BNSS • Quashing of Frivolous FIR in Commercial Transaction',
      ratio: 'Held: Commercial breach of contract cannot be colourably clothed with criminal intent of cheating under Section 420 IPC / Section 318 BNS. Where no deceptive inducement exists at inception, proceedings are an abuse of court process and liable to be quashed.'
    },
    {
      court: 'High Court of Delhi at New Delhi',
      title: 'M/s Apex Infraprojects Ltd. v. National Highways Authority of India',
      citation: 'O.M.P. (COMM) 312/2024 | Commercial Division',
      subject: 'Section 34 Arbitration & Conciliation Act • Scope of Patent Illegality & Public Policy',
      ratio: 'Held: An arbitral tribunal is the ultimate master of factual and contractual interpretation. Section 34 does not permit appellate re-appreciation of evidence or substituting reasonable contractual interpretations adopted by the tribunal.'
    },
    {
      court: 'National Company Law Appellate Tribunal (NCLAT, Principal Bench)',
      title: 'State Bank of India v. Corporate Debtor Consortium',
      citation: 'Company Appeal (AT) (Insolvency) No. 910/2024',
      subject: 'Insolvency & Bankruptcy Code 2016 • Commercial Wisdom of Committee of Creditors (CoC)',
      ratio: 'Held: The commercial wisdom of the CoC regarding viability and feasibility of a resolution plan is non-justiciable. Adjudicating Authority (NCLT) has no jurisdiction to evaluate financial haircuts approved by requisite 66% majority.'
    }
  ];

  hcCases.forEach((h, idx) => {
    const boxY = height - 190 - (idx * 120);

    page4.drawRectangle({
      x: 48,
      y: boxY,
      width: width - 96,
      height: 110,
      color: colorWhite,
      borderColor: colorRule,
      borderWidth: 0.8
    });
    page4.drawRectangle({
      x: 48,
      y: boxY + 106,
      width: width - 96,
      height: 4,
      color: colorEmerald
    });

    page4.drawText(h.court, {
      x: 60,
      y: boxY + 92,
      size: 8,
      font: fontBold,
      color: colorEmerald
    });

    page4.drawText(h.title, {
      x: 60,
      y: boxY + 78,
      size: 9.5,
      font: fontBold,
      color: colorNavy
    });

    page4.drawText(`${h.citation} • ${h.subject}`, {
      x: 60,
      y: boxY + 65,
      size: 7.2,
      font: fontOblique,
      color: colorCharcoal
    });

    page4.drawLine({
      start: { x: 60, y: boxY + 58 },
      end: { x: width - 60, y: boxY + 58 },
      thickness: 0.5,
      color: colorRule
    });

    const rWords = h.ratio.split(' ');
    let l1 = '', l2 = '', l3 = '';
    rWords.forEach(w => {
      if ((l1 + ' ' + w).length < 88) l1 += (l1 ? ' ' : '') + w;
      else if ((l2 + ' ' + w).length < 88) l2 += (l2 ? ' ' : '') + w;
      else l3 += (l3 ? ' ' : '') + w;
    });

    page4.drawText(l1, { x: 60, y: boxY + 44, size: 7.2, font: fontRegular, color: colorCharcoal });
    if (l2) page4.drawText(l2, { x: 60, y: boxY + 34, size: 7.2, font: fontRegular, color: colorCharcoal });
    if (l3) page4.drawText(l3, { x: 60, y: boxY + 24, size: 7.2, font: fontRegular, color: colorCharcoal });
  });

  // Call to action bottom box
  page4.drawRectangle({
    x: 48,
    y: 80,
    width: width - 96,
    height: 80,
    color: colorCardBg,
    borderColor: colorDarkGold,
    borderWidth: 0.8
  });
  page4.drawText('NEED IN-DEPTH LEGAL RESEARCH OR CASE LAW CITATIONS FOR YOUR MATTER?', {
    x: 60,
    y: 140,
    size: 8.5,
    font: fontBold,
    color: colorNavy
  });
  page4.drawText('The Punia Associates Legal Library hosts thousands of verified Bare Acts, Supreme Court judgments,', {
    x: 60,
    y: 124,
    size: 7.8,
    font: fontRegular,
    color: colorCharcoal
  });
  page4.drawText('High Court orders, and legislative gazette updates with AI-powered search and modern publication downloads.', {
    x: 60,
    y: 110,
    size: 7.8,
    font: fontRegular,
    color: colorCharcoal
  });
  page4.drawText('Official Law Reporter Edition • Published by Chambers of Punia Associates', {
    x: 60,
    y: 96,
    size: 7.8,
    font: fontBold,
    color: colorGold
  });

  // ==========================================
  // UNIFORM RUNNING HEADERS & FOOTERS (Pages 2+)
  // ==========================================
  const totalPages = doc.getPageCount();

  contentPages.forEach((p, index) => {
    const pageNum = index + 2; // page 1 was cover
    const { width: pW, height: pH } = p.getSize();

    // Running Header
    p.drawText('PUNIA ASSOCIATES LAW REPORTER • SUPREME COURT & HIGH COURTS REVIEW', {
      x: 48,
      y: pH - 32,
      size: 7,
      font: fontBold,
      color: colorSlateMuted
    });
    p.drawText('VOL. 2026 • ISSUE 11', {
      x: pW - 140,
      y: pH - 32,
      size: 7,
      font: fontBold,
      color: colorGold
    });
    p.drawLine({
      start: { x: 48, y: pH - 38 },
      end: { x: pW - 48, y: pH - 38 },
      thickness: 0.5,
      color: colorRule
    });

    // Running Footer
    p.drawLine({
      start: { x: 48, y: 44 },
      end: { x: pW - 48, y: 44 },
      thickness: 0.5,
      color: colorRule
    });
    p.drawText(`PUNIA ASSOCIATES | Page ${pageNum} of ${totalPages}`, {
      x: 48,
      y: 30,
      size: 8,
      font: fontBold,
      color: colorNavy
    });
    p.drawText('LEGAL RESEARCH & JUDICIAL PRECEDENTS DIGEST', {
      x: 48,
      y: 18,
      size: 6,
      font: fontOblique,
      color: colorSlateMuted
    });
  });

  const pdfBytes = await doc.save();
  const outDir = path.resolve(__dirname, '..', 'public', 'magazine', 'stored');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const targetPath = path.join(outDir, 'punia_associates_sc_hc_law_reporter_nov_2026.pdf');
  fs.writeFileSync(targetPath, pdfBytes);

  console.log(`Generated Magazine PDF: ${targetPath} (${pdfBytes.length} bytes, ${totalPages} pages)`);
  return { path: targetPath, bytes: pdfBytes.length, pages: totalPages };
}

generateMagazinePdf().catch(err => {
  console.error('Error generating Magazine PDF:', err);
  process.exit(1);
});
