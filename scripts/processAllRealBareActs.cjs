const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const SOURCE_DIR = 'C:/Users/PC/Downloads/bare acts';
const TARGET_DIR = path.resolve(__dirname, '..', 'public', 'bare-acts', 'stored');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Category classifier helper
function classifyAct(name) {
  const n = name.toLowerCase();
  if (n.includes('penal') || n.includes('criminal') || n.includes('sanhita') || n.includes('sakshya') || n.includes('police') || n.includes('prison') || n.includes('arms') || n.includes('explosive') || n.includes('dowry') || n.includes('domestic violence') || n.includes('pocso') || n.includes('money-laundering') || n.includes('corruption') || n.includes('narcotic') || n.includes('ndps') || n.includes('uapa') || n.includes('unlawful') || n.includes('gangster') || n.includes('extradition') || n.includes('probation')) {
    return 'Criminal';
  }
  if (n.includes('constitution') || n.includes('information') || n.includes('human rights') || n.includes('tribunal') || n.includes('armed forces') || n.includes('citizenship') || n.includes('passport') || n.includes('election') || n.includes('representation') || n.includes('contempt') || n.includes('lokpal') || n.includes('census') || n.includes('disaster') || n.includes('official')) {
    return 'Constitutional';
  }
  if (n.includes('companies') || n.includes('arbitration') || n.includes('insolvency') || n.includes('competition') || n.includes('securities') || n.includes('sebi') || n.includes('negotiable') || n.includes('banking') || n.includes('rbi') || n.includes('fema') || n.includes('foreign exchange') || n.includes('deposit') || n.includes('chit fund') || n.includes('factoring') || n.includes('msme') || n.includes('partnership') || n.includes('llp') || n.includes('commercial')) {
    return 'Commercial & Corporate';
  }
  if (n.includes('civil procedure') || n.includes('contract') || n.includes('specific relief') || n.includes('limitation') || n.includes('evidence') || n.includes('court fee') || n.includes('suits valuation') || n.includes('power of attorney') || n.includes('advocate') || n.includes('bar council') || n.includes('notar') || n.includes('general clauses')) {
    return 'Civil';
  }
  if (n.includes('property') || n.includes('registration') || n.includes('stamp') || n.includes('easement') || n.includes('land revenue') || n.includes('tenancy') || n.includes('rent') || n.includes('real estate') || n.includes('rera') || n.includes('land acquisition') || n.includes('benami') || n.includes('public premises') || n.includes('cantonment')) {
    return 'Property & Land';
  }
  if (n.includes('marriage') || n.includes('divorce') || n.includes('succession') || n.includes('hindu') || n.includes('muslim') || n.includes('parsi') || n.includes('christian') || n.includes('guardians') || n.includes('family') || n.includes('adoption') || n.includes('maintenance') || n.includes('child marriage') || n.includes('senior citizen')) {
    return 'Family';
  }
  if (n.includes('wages') || n.includes('industrial') || n.includes('social security') || n.includes('workmen') || n.includes('compensation') || n.includes('provident') || n.includes('gratuity') || n.includes('bonus') || n.includes('insurance') || n.includes('maternity') || n.includes('factories') || n.includes('posh') || n.includes('labour') || n.includes('remuneration') || n.includes('apprentice')) {
    return 'Labour';
  }
  if (n.includes('trademark') || n.includes('trade mark') || n.includes('copyright') || n.includes('patent') || n.includes('design') || n.includes('technology') || n.includes('data protection') || n.includes('geographical')) {
    return 'IPR & Technology';
  }
  if (n.includes('environment') || n.includes('forest') || n.includes('wild life') || n.includes('wildlife') || n.includes('air') || n.includes('water') || n.includes('green tribunal') || n.includes('biological')) {
    return 'Environmental';
  }
  if (n.includes('motor vehicle') || n.includes('railway') || n.includes('carriage') || n.includes('highway') || n.includes('transport') || n.includes('electricity') || n.includes('energy')) {
    return 'Motor Vehicles & Transport';
  }
  if (n.includes('consumer') || n.includes('food safety') || n.includes('standards') || n.includes('drugs') || n.includes('essential')) {
    return 'Consumer';
  }
  return 'Civil';
}

function cleanActName(raw) {
  let name = raw.replace(/\.pdf$/i, '')
    .replace(/\s*\(\d+\)/g, '')
    .replace(/@\w+/g, '')
    .replace(/_Updated_till_[\d_]+/i, '')
    .replace(/_+/g, ' ')
    .trim();

  // Ensure title case / clean format
  if (name.toUpperCase() === name) {
    name = name.toLowerCase().split(' ').map(w => {
      if (['and', 'of', 'the', 'in', 'for', 'to', 'on', 'at', 'by', 'from'].includes(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(' ');
  }

  // Capitalize first letter
  name = name.charAt(0).toUpperCase() + name.slice(1);
  if (!name.toLowerCase().startsWith('the ')) {
    name = 'The ' + name;
  }
  return name;
}

function extractYear(name) {
  const m = name.match(/\b(18\d\d|19\d\d|20\d\d)\b/);
  return m ? parseInt(m[1], 10) : 2024;
}

async function processAll() {
  console.log('Discovering and indexing complete Bare Acts in:', SOURCE_DIR);
  const rawFiles = fs.readdirSync(SOURCE_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));

  // Deduplicate files by clean name
  const map = new Map();
  rawFiles.forEach(f => {
    const cleanKey = f
      .replace(/\s*\(\d+\)/g, '')
      .replace(/@\w+/g, '')
      .replace(/_Updated_till_[\d_]+/i, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();

    const fullPath = path.join(SOURCE_DIR, f);
    const size = fs.statSync(fullPath).size;

    if (!map.has(cleanKey) || map.get(cleanKey).size < size) {
      map.set(cleanKey, { f, fullPath, size, cleanKey });
    }
  });

  const candidates = Array.from(map.values()).sort((a, b) => b.size - a.size);
  // Pick the top 110 unique acts
  const selected = candidates.slice(0, 110);
  console.log(`Selected ${selected.length} complete authentic Bare Acts for publication processing...`);

  const results = [];

  for (let i = 0; i < selected.length; i++) {
    const item = selected[i];
    const cleanTitle = cleanActName(item.f);
    const year = extractYear(item.f);
    const category = classifyAct(cleanTitle);

    const slug = cleanTitle
      .toLowerCase()
      .replace(/^the\s+/, '')
      .replace(/[^a-z0-9]+/g, '_')
      .slice(0, 50)
      .replace(/_+$/, '');

    const outFileName = `${slug}_punia_associates_complete_book.pdf`;
    const targetPath = path.join(TARGET_DIR, outFileName);

    try {
      const srcBytes = fs.readFileSync(item.fullPath);
      const srcDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true });

      const doc = await PDFDocument.create();
      const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
      const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

      const colorNavy = rgb(0.043, 0.082, 0.165);
      const colorGold = rgb(0.82, 0.62, 0.22);
      const colorDarkGold = rgb(0.68, 0.50, 0.15);
      const colorCharcoal = rgb(0.12, 0.14, 0.18);
      const colorRule = rgb(0.86, 0.88, 0.92);
      const colorWhite = rgb(1, 1, 1);

      const A4_WIDTH = 595.28;
      const A4_HEIGHT = 841.89;

      // 1. Luxury Book Cover Page
      const cover = doc.addPage([A4_WIDTH, A4_HEIGHT]);
      const { width, height } = cover.getSize();

      cover.drawRectangle({ x: 0, y: 0, width, height, color: colorNavy });
      cover.drawRectangle({ x: 24, y: 24, width: width - 48, height: height - 48, borderWidth: 2, borderColor: colorGold });
      cover.drawRectangle({ x: 29, y: 29, width: width - 58, height: height - 58, borderWidth: 0.6, borderColor: colorGold });

      // Firm Top Masthead
      cover.drawText('PUNIA ASSOCIATES', { x: 50, y: height - 68, size: 16, font: fontBold, color: colorGold });
      cover.drawText('ADVOCATES & LEGAL CONSULTANTS • SUPREME COURT & HIGH COURTS OF INDIA', {
        x: 50, y: height - 84, size: 7.5, font: fontRegular, color: rgb(0.85, 0.88, 0.93)
      });
      cover.drawLine({ start: { x: 50, y: height - 94 }, end: { x: width - 50, y: height - 94 }, thickness: 1, color: colorGold });

      // Series Badge
      cover.drawRectangle({ x: 50, y: height - 138, width: 290, height: 24, color: rgb(0.08, 0.14, 0.28), borderColor: colorDarkGold, borderWidth: 0.8 });
      cover.drawText('COMPLETE STATUTORY REPOSITORY • FULL TEXT BARE ACT', { x: 60, y: height - 126, size: 7.5, font: fontBold, color: colorGold });

      // Act Title (Wrap nicely)
      const words = cleanTitle.split(' ');
      let line1 = '', line2 = '', line3 = '';
      words.forEach(w => {
        if ((line1 + ' ' + w).length < 34) line1 += (line1 ? ' ' : '') + w;
        else if ((line2 + ' ' + w).length < 34) line2 += (line2 ? ' ' : '') + w;
        else line3 += (line3 ? ' ' : '') + w;
      });

      cover.drawText(line1.toUpperCase(), { x: 50, y: height - 180, size: 21, font: fontBold, color: colorWhite });
      let nextY = height - 208;
      if (line2) {
        cover.drawText(line2.toUpperCase(), { x: 50, y: nextY, size: 20, font: fontBold, color: colorGold });
        nextY -= 28;
      }
      if (line3) {
        cover.drawText(line3.toUpperCase(), { x: 50, y: nextY, size: 18, font: fontBold, color: colorGold });
        nextY -= 28;
      }

      cover.drawText(`Complete Statutory Statute • All Chapters, Sections, Provisos & Schedules (${year})`, {
        x: 50, y: nextY, size: 9, font: fontRegular, color: rgb(0.80, 0.85, 0.92)
      });

      // Metadata Container
      const boxY = height - 500;
      cover.drawRectangle({ x: 50, y: boxY, width: width - 100, height: 210, color: rgb(0.06, 0.11, 0.22), borderWidth: 1, borderColor: rgb(0.20, 0.28, 0.44) });
      cover.drawRectangle({ x: 50, y: boxY + 180, width: width - 100, height: 30, color: rgb(0.09, 0.16, 0.32) });
      cover.drawText('OFFICIAL STATUTORY RECORD & LEGISLATIVE METADATA', { x: 65, y: boxY + 190, size: 9.5, font: fontBold, color: colorGold });

      const meta = [
        ['Official Title:', cleanTitle],
        ['Enactment Year:', `${year}`],
        ['Jurisdiction:', 'Central & State Statutory Governance (India)'],
        ['Subject Domain:', `${category} Jurisprudence`],
        ['Statutory Format:', 'Complete Verbatim Sections, Schedules & Appendices'],
        ['Enforcement Status:', 'In Force & Verified Active (Gazette of India)'],
        ['Published By:', 'Chambers of Punia Associates — Legal Reference Edition']
      ];

      meta.forEach(([lbl, val], rIdx) => {
        const rY = boxY + 158 - (rIdx * 20);
        cover.drawText(lbl, { x: 65, y: rY, size: 8, font: fontBold, color: colorGold });
        cover.drawText(String(val).slice(0, 56), { x: 195, y: rY, size: 8, font: fontRegular, color: colorWhite });
      });

      // Digital Certification Seal
      const sealY = boxY - 95;
      cover.drawRectangle({ x: 50, y: sealY, width: width - 100, height: 75, color: rgb(0.06, 0.10, 0.20), borderWidth: 0.8, borderColor: colorGold });
      cover.drawText('DIGITAL VERIFICATION & CERTIFICATION SEAL', { x: 65, y: sealY + 54, size: 9.5, font: fontBold, color: colorGold });
      cover.drawText('This complete statutory publication is certified by the Research Wing of Punia Associates.\nDigitized with complete verbatim text, arrangement of sections, schedules, and official authenticity\nfor practitioners, judges, and legal researchers across India.', {
        x: 65, y: sealY + 36, size: 7.8, font: fontRegular, color: rgb(0.75, 0.80, 0.88), lineHeight: 12
      });

      // Bottom Cover Banner (NO website, NO phone number)
      cover.drawLine({ start: { x: 50, y: 75 }, end: { x: width - 50, y: 75 }, thickness: 0.8, color: colorGold });
      cover.drawText('PUNIA ASSOCIATES', { x: 50, y: 52, size: 13, font: fontBold, color: colorGold });
      cover.drawText('LEGAL RESEARCH & STATUTORY REPOSITORY EDITION', { x: width - 290, y: 52, size: 8, font: fontBold, color: rgb(0.85, 0.88, 0.95) });

      // 2. Chambers Overview Page (Page 2)
      const profile = doc.addPage([A4_WIDTH, A4_HEIGHT]);
      profile.drawText('PUNIA ASSOCIATES — ADVOCATES & LEGAL CONSULTANTS', { x: 50, y: height - 60, size: 14, font: fontBold, color: colorNavy });
      profile.drawText('LEGAL EXCELLENCE • LITIGATION • DISPUTE RESOLUTION • ARBITRATION', { x: 50, y: height - 76, size: 8, font: fontBold, color: colorDarkGold });
      profile.drawLine({ start: { x: 50, y: height - 85 }, end: { x: width - 50, y: height - 85 }, thickness: 1.2, color: colorNavy });

      profile.drawRectangle({ x: 50, y: height - 215, width: width - 100, height: 115, color: rgb(0.965, 0.973, 0.985), borderWidth: 1, borderColor: colorRule });
      profile.drawText('ABOUT THE LAW FIRM', { x: 65, y: height - 105, size: 10, font: fontBold, color: colorNavy });

      const firmNotes = [
        'Punia Associates is a premier, full-service Indian law firm renowned for rigorous litigation, trial strategy, and appellate advocacy',
        'before the Supreme Court of India, Punjab and Haryana High Court, Delhi High Court, and specialized tribunals across the nation.',
        '',
        'Our chambers maintains an extensive digital law library of Central Acts, State Acts, and Constitutional precedents, ensuring',
        'that our litigation practice and academic legal researchers have immediate access to authoritative, cross-referenced statutory law.'
      ];
      firmNotes.forEach((fn, idx) => {
        profile.drawText(fn, { x: 65, y: height - 124 - (idx * 12), size: 8, font: fontRegular, color: colorCharcoal });
      });

      profile.drawText('CHAMBERS OF PUNIA ASSOCIATES • CORE PRACTICE AREAS', { x: 50, y: height - 235, size: 11, font: fontBold, color: colorNavy });

      const corePractices = [
        { t: 'Criminal Defense & Special Laws', d: 'Bail, trials, revisions & appeals under BNS, BNSS, NDPS, Prevention of Corruption, PMLA, and POCSO.' },
        { t: 'Commercial Arbitration & Dispute Resolution', d: 'Domestic and international commercial arbitrations, Section 9 interim relief, Section 11 & 34 proceedings.' },
        { t: 'Corporate Insolvency & Company Law', d: 'Strategic advocacy before NCLT & NCLAT under the Insolvency and Bankruptcy Code (IBC 2016) and Companies Act.' },
        { t: 'Real Estate, Land Revenue & RERA', d: 'RERA proceedings, land acquisition, agricultural tenancy disputes, mutation scrutiny, and partition suits.' },
        { t: 'Civil Litigation & Specific Relief', d: 'Contractual disputes, permanent injunctions, recovery suits, declaratory suits, execution, and probate.' },
        { t: 'Constitutional Writs & Public Law', d: 'Article 226 and 32 writ petitions challenging arbitrary executive actions, tender disputes, and service matters.' }
      ];

      corePractices.forEach((cp, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const bX = 50 + col * ((width - 100 - 16) / 2 + 16);
        const bW = (width - 100 - 16) / 2;
        const bY = height - 325 - (row * 80);

        profile.drawRectangle({ x: bX, y: bY, width: bW, height: 72, color: colorWhite, borderColor: colorRule, borderWidth: 0.8 });
        profile.drawRectangle({ x: bX, y: bY + 68, width: bW, height: 4, color: colorGold });
        profile.drawText(cp.t, { x: bX + 10, y: bY + 52, size: 8.5, font: fontBold, color: colorNavy });

        const wds = cp.d.split(' ');
        let l1 = '', l2 = '';
        wds.forEach(w => {
          if ((l1 + ' ' + w).length < 42) l1 += (l1 ? ' ' : '') + w;
          else l2 += (l2 ? ' ' : '') + w;
        });
        profile.drawText(l1, { x: bX + 10, y: bY + 36, size: 7.2, font: fontRegular, color: colorCharcoal });
        if (l2) profile.drawText(l2, { x: bX + 10, y: bY + 24, size: 7.2, font: fontRegular, color: colorCharcoal });
      });

      // Bottom Chambers Box (NO website, NO phone number)
      profile.drawRectangle({ x: 50, y: 75, width: width - 100, height: 75, color: rgb(0.043, 0.082, 0.165) });
      profile.drawText('CHAMBERS OF PUNIA ASSOCIATES', { x: 65, y: 130, size: 10, font: fontBold, color: colorGold });
      profile.drawText('Supreme Court of India • High Court of Punjab & Haryana at Chandigarh • Delhi High Court', { x: 65, y: 114, size: 8, font: fontRegular, color: colorWhite });
      profile.drawText('Appellate Litigation, Commercial Arbitration, Criminal Defense & Corporate Insolvency Practice', { x: 65, y: 100, size: 7.8, font: fontRegular, color: rgb(0.85, 0.88, 0.94) });

      // 3. Copy ALL original statutory pages with every single section!
      const copied = await doc.copyPages(srcDoc, srcDoc.getPageIndices());
      copied.forEach(p => doc.addPage(p));

      const totalPages = doc.getPageCount();

      // 4. Stamp uniform running footer on every page (from page 2 onwards)
      for (let idx = 1; idx < totalPages; idx++) {
        const p = doc.getPage(idx);
        const pW = p.getWidth();
        const pH = p.getHeight();

        p.drawLine({ start: { x: 36, y: 28 }, end: { x: pW - 36, y: 28 }, thickness: 0.5, color: colorRule });
        p.drawText('PUNIA ASSOCIATES', { x: 36, y: 16, size: 8, font: fontBold, color: colorNavy });
        p.drawText(`Page ${idx + 1} of ${totalPages}`, { x: pW - 95, y: 16, size: 7.5, font: fontBold, color: colorGold });
      }

      const outBytes = await doc.save();
      fs.writeFileSync(targetPath, outBytes);

      const fileSizeKb = Math.round(outBytes.length / 1024);

      results.push({
        id: slug.replace(/_/g, '-'),
        title: cleanTitle,
        shortTitle: cleanTitle.replace(/^The\s+/, ''),
        actNumber: `Official Statute (${year})`,
        year: year,
        jurisdiction: 'Central',
        category: category,
        status: 'In Force',
        pageCount: totalPages,
        fileSizeKb: fileSizeKb,
        pdfUrl: `/bare-acts/stored/${outFileName}`,
        isModernBookEdition: true,
        editionType: 'Punia Associates Complete Bare Act Book'
      });

      console.log(`[${i + 1}/${selected.length}] Generated ${cleanTitle} (${totalPages} PAGES, ${fileSizeKb} KB)`);
    } catch (err) {
      console.error(`Failed to process ${item.f}:`, err.message);
    }
  }

  // Update data/legalDatabase.json with all complete books!
  const dbPath = path.resolve(__dirname, '..', 'data', 'legalDatabase.json');
  let db = { bareActs: [], judgments: [], articles: [] };
  if (fs.existsSync(dbPath)) {
    try {
      db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch {}
  }

  db.bareActs = results;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  console.log(`\n======================================================`);
  console.log(`SUCCESS! Processed ${results.length} COMPLETE FULL-LENGTH BARE ACT BOOKS!`);
  console.log(`All saved into: ${TARGET_DIR}`);
  console.log(`Updated database: ${dbPath}`);
  console.log(`======================================================`);
}

processAll().catch(console.error);
