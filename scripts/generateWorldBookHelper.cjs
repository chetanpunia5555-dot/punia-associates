const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const OUT_DIR = path.resolve(__dirname, '..', 'public', 'bare-acts', 'stored');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Luxury Navy & Gold Color Palette
const NAVY = rgb(11 / 255, 19 / 255, 37 / 255);       // #0B1325
const GOLD = rgb(212 / 255, 175 / 255, 55 / 255);    // #D4AF37
const DEEP_GOLD = rgb(184 / 255, 134 / 255, 11 / 255);// #B8860B
const SLATE_DARK = rgb(30 / 255, 41 / 255, 59 / 255); // #1E293B
const SLATE_MUTED = rgb(100 / 255, 116 / 255, 139 / 255);
const WHITE = rgb(1, 1, 1);
const LIGHT_CREAM = rgb(253 / 255, 252 / 255, 248 / 255);
const BORDER_COLOR = rgb(226 / 255, 232 / 255, 240 / 255);

// Wrap text to fit inside max width
function wrapText(text, maxChars = 85) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    if (!current) {
      current = w;
    } else if ((current + ' ' + w).length <= maxChars) {
      current += ' ' + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Generate luxury PDF book for a given world statute
async function generateWorldBook(statute) {
  const doc = await PDFDocument.create();
  const timesBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const timesRoman = await doc.embedFont(StandardFonts.TimesRoman);
  const timesItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const helvBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helvRegular = await doc.embedFont(StandardFonts.Helvetica);

  // 1. COVER PAGE (Page 1)
  const coverPage = doc.addPage([595.28, 841.89]); // A4
  const { width: W, height: H } = coverPage.getSize();

  // Royal Navy background
  coverPage.drawRectangle({
    x: 0,
    y: 0,
    width: W,
    height: H,
    color: NAVY
  });

  // Double Gold Border
  coverPage.drawRectangle({
    x: 24,
    y: 24,
    width: W - 48,
    height: H - 48,
    borderColor: GOLD,
    borderWidth: 2
  });
  coverPage.drawRectangle({
    x: 30,
    y: 30,
    width: W - 60,
    height: H - 60,
    borderColor: GOLD,
    borderWidth: 0.8
  });

  // Masthead: PUNIA ASSOCIATES
  const firmName = 'P U N I A   A S S O C I A T E S';
  const firmW = timesBold.widthOfTextAtSize(firmName, 22);
  coverPage.drawText(firmName, {
    x: (W - firmW) / 2,
    y: H - 95,
    size: 22,
    font: timesBold,
    color: GOLD
  });

  const subDivision = 'GLOBAL COMPARATIVE JURISPRUDENCE & STATUTORY REPOSITORY';
  const subDivW = helvBold.widthOfTextAtSize(subDivision, 8.5);
  coverPage.drawText(subDivision, {
    x: (W - subDivW) / 2,
    y: H - 115,
    size: 8.5,
    font: helvBold,
    color: WHITE
  });

  // Decorative divider line
  coverPage.drawLine({
    start: { x: W / 2 - 140, y: H - 130 },
    end: { x: W / 2 + 140, y: H - 130 },
    thickness: 1,
    color: GOLD
  });

  // Country / Jurisdiction Badge
  const badgeText = `${statute.jurisdiction.toUpperCase()} | ${statute.category.toUpperCase()} LAW`;
  const badgeW = helvBold.widthOfTextAtSize(badgeText, 9.5);
  coverPage.drawRectangle({
    x: (W - badgeW - 30) / 2,
    y: H - 220,
    width: badgeW + 30,
    height: 24,
    borderColor: GOLD,
    borderWidth: 1,
    color: rgb(18 / 255, 30 / 255, 58 / 255)
  });
  coverPage.drawText(badgeText, {
    x: (W - badgeW) / 2,
    y: H - 212,
    size: 9.5,
    font: helvBold,
    color: GOLD
  });

  // Statute Title (wrapped)
  const titleLines = wrapText(statute.title, 42);
  let titleY = H - 280;
  for (const line of titleLines) {
    const lw = timesBold.widthOfTextAtSize(line, 20);
    coverPage.drawText(line, {
      x: (W - lw) / 2,
      y: titleY,
      size: 20,
      font: timesBold,
      color: WHITE
    });
    titleY -= 28;
  }

  // Act metadata subtitle
  if (statute.actNumber) {
    const actNumW = timesItalic.widthOfTextAtSize(statute.actNumber, 11);
    coverPage.drawText(statute.actNumber, {
      x: (W - actNumW) / 2,
      y: titleY - 10,
      size: 11,
      font: timesItalic,
      color: GOLD
    });
  }

  // Center Emblem / Seal
  const sealY = H / 2 - 20;
  coverPage.drawCircle({
    x: W / 2,
    y: sealY,
    size: 42,
    borderColor: GOLD,
    borderWidth: 1.5
  });
  coverPage.drawCircle({
    x: W / 2,
    y: sealY,
    size: 38,
    borderColor: GOLD,
    borderWidth: 0.6
  });
  const sealInitials = 'PA';
  const siW = timesBold.widthOfTextAtSize(sealInitials, 24);
  coverPage.drawText(sealInitials, {
    x: (W - siW) / 2,
    y: sealY - 8,
    size: 24,
    font: timesBold,
    color: GOLD
  });

  // Metadata Box at Bottom of Cover
  const metaBoxY = 110;
  const metaLines = [
    `Jurisdiction: ${statute.jurisdiction}`,
    `Year of Enactment: ${statute.year}`,
    `Official Source: ${statute.authority || 'Government Legislation Service'}`,
    `Edition: Punia Associates Verbatim Statutory Library Edition`
  ];
  let mY = metaBoxY + 55;
  for (const ml of metaLines) {
    const mlW = helvRegular.widthOfTextAtSize(ml, 9);
    coverPage.drawText(ml, {
      x: (W - mlW) / 2,
      y: mY,
      size: 9,
      font: helvRegular,
      color: rgb(203 / 255, 213 / 255, 225 / 255)
    });
    mY -= 15;
  }

  // 2. PAGE 2: FIRM PROFILE & EDITORIAL NOTE
  const p2 = doc.addPage([595.28, 841.89]);
  p2.drawRectangle({ x: 0, y: 0, width: W, height: H, color: LIGHT_CREAM });
  p2.drawRectangle({ x: 36, y: 36, width: W - 72, height: H - 72, borderColor: BORDER_COLOR, borderWidth: 1 });

  p2.drawText('P U N I A   A S S O C I A T E S', {
    x: 54,
    y: H - 75,
    size: 16,
    font: timesBold,
    color: NAVY
  });
  p2.drawText('Advocates, Legal Consultants & Appellate Counsel', {
    x: 54,
    y: H - 92,
    size: 9.5,
    font: helvBold,
    color: DEEP_GOLD
  });
  p2.drawLine({ start: { x: 54, y: H - 102 }, end: { x: W - 54, y: H - 102 }, thickness: 1, color: GOLD });

  p2.drawText('ABOUT THIS STATUTORY REPOSITORY EDITION', {
    x: 54,
    y: H - 135,
    size: 11,
    font: helvBold,
    color: NAVY
  });

  const edNote = [
    `This publication of "${statute.title}" is curated, typeset, and published by Punia Associates as part of its Global Comparative Jurisprudence and World Legislation initiative.`,
    `The initiative provides legal professionals, judicial officers, researchers, scholars, and citizens with verbatim, authoritative statutory texts from primary sovereign jurisdictions across the globe, including India, the United Kingdom, the United States of America, Australia, Singapore, Germany, France, Canada, and Multilateral Treaty Organizations.`,
    `Every statute included in this repository has been prepared from authenticated government gazettes, parliamentary archives, and official legislative repositories to preserve statutory integrity, chapter divisions, section numbering, and verbatim schedules.`,
    `Editorial Classification:`,
    `  * Sovereign Jurisdiction: ${statute.jurisdiction}`,
    `  * Statutory Subject: ${statute.category}`,
    `  * Official Act Citation: ${statute.actNumber || 'Primary Legislation'}`,
    `  * Enactment Year: ${statute.year}`,
    `  * Repository Classification: Primary Law & International Standards`
  ];

  let edY = H - 165;
  for (const block of edNote) {
    const lines = wrapText(block, 78);
    for (const l of lines) {
      p2.drawText(l, { x: 54, y: edY, size: 9.5, font: timesRoman, color: SLATE_DARK });
      edY -= 15;
    }
    edY -= 6;
  }

  // Preamble section if available
  if (statute.preamble) {
    p2.drawText('STATUTORY PREAMBLE / STATEMENT OF OBJECTS', {
      x: 54,
      y: edY - 10,
      size: 11,
      font: helvBold,
      color: NAVY
    });
    edY -= 30;
    const pLines = wrapText(statute.preamble, 78);
    for (const pl of pLines) {
      p2.drawText(pl, { x: 54, y: edY, size: 9.5, font: timesItalic, color: SLATE_DARK });
      edY -= 15;
    }
  }

  // 3. STATUTORY BODY PAGES (Sections, Chapters, Schedules)
  const allSections = statute.sections || [];
  let currentPage = null;
  let curY = 0;
  const bodyPages = [];

  function startNewBodyPage() {
    const page = doc.addPage([595.28, 841.89]);
    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: LIGHT_CREAM });
    page.drawRectangle({ x: 36, y: 36, width: W - 72, height: H - 72, borderColor: BORDER_COLOR, borderWidth: 0.8 });

    // Running Header
    const headText = `${statute.shortTitle || statute.title} (${statute.jurisdiction})`;
    page.drawText(headText.slice(0, 60), { x: 54, y: H - 55, size: 8.5, font: helvBold, color: SLATE_MUTED });
    page.drawLine({ start: { x: 54, y: H - 62 }, end: { x: W - 54, y: H - 62 }, thickness: 0.5, color: BORDER_COLOR });

    bodyPages.push(page);
    currentPage = page;
    curY = H - 85;
    return page;
  }

  startNewBodyPage();

  for (const sec of allSections) {
    // Check if space is left on current page
    if (curY < 130) {
      startNewBodyPage();
    }

    // Chapter or Part Header if present
    if (sec.isChapterHeader) {
      curY -= 10;
      currentPage.drawRectangle({
        x: 50,
        y: curY - 20,
        width: W - 100,
        height: 24,
        color: rgb(241 / 255, 245 / 255, 249 / 255),
        borderColor: GOLD,
        borderWidth: 0.8
      });
      currentPage.drawText(sec.title.toUpperCase(), {
        x: 60,
        y: curY - 14,
        size: 9.5,
        font: helvBold,
        color: NAVY
      });
      curY -= 36;
      continue;
    }

    // Section title / number
    const secHeading = `${sec.sectionNumber ? sec.sectionNumber + '. ' : ''}${sec.title}`;
    const headLines = wrapText(secHeading, 74);
    for (const hl of headLines) {
      if (curY < 90) startNewBodyPage();
      currentPage.drawText(hl, {
        x: 54,
        y: curY,
        size: 10,
        font: helvBold,
        color: NAVY
      });
      curY -= 15;
    }

    // Section Content
    const contentLines = wrapText(sec.content, 78);
    for (const cl of contentLines) {
      if (curY < 90) startNewBodyPage();
      currentPage.drawText(cl, {
        x: 54,
        y: curY,
        size: 9.5,
        font: timesRoman,
        color: SLATE_DARK
      });
      curY -= 14;
    }

    // Extra spacing between sections
    curY -= 12;
  }

  // 4. APPLY UNIFORM RUNNING FOOTER TO ALL PAGES
  // Strict rule: "PUNIA ASSOCIATES" (left) | "Page X of Y" (right). NO phone numbers, NO website URL.
  const totalPages = doc.getPageCount();
  const allPages = doc.getPages();

  for (let i = 0; i < totalPages; i++) {
    const page = allPages[i];
    const pageNum = i + 1;

    if (pageNum === 1) {
      // Cover page footer
      const coverFooter = 'PUNIA ASSOCIATES';
      const cfW = timesBold.widthOfTextAtSize(coverFooter, 10);
      page.drawText(coverFooter, {
        x: (W - cfW) / 2,
        y: 42,
        size: 10,
        font: timesBold,
        color: GOLD
      });
    } else {
      // Internal page footer
      page.drawLine({
        start: { x: 54, y: 55 },
        end: { x: W - 54, y: 55 },
        thickness: 0.5,
        color: GOLD
      });

      // Left footer
      page.drawText('PUNIA ASSOCIATES', {
        x: 54,
        y: 42,
        size: 8.5,
        font: timesBold,
        color: NAVY
      });

      // Right footer
      const pageStr = `Page ${pageNum} of ${totalPages}`;
      const pw = helvRegular.widthOfTextAtSize(pageStr, 8.5);
      page.drawText(pageStr, {
        x: W - 54 - pw,
        y: 42,
        size: 8.5,
        font: helvRegular,
        color: SLATE_MUTED
      });
    }
  }

  const pdfBytes = await doc.save();
  const fileName = `${statute.id}_punia_associates_complete_book.pdf`;
  const outPath = path.join(OUT_DIR, fileName);
  fs.writeFileSync(outPath, pdfBytes);

  return {
    id: statute.id,
    fileName: fileName,
    pageCount: totalPages,
    fileSizeKb: Math.round(pdfBytes.length / 1024),
    pdfUrl: `/bare-acts/stored/${fileName}`
  };
}

module.exports = { generateWorldBook };
