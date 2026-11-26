const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function testStamp() {
  const srcPath = 'C:/Users/PC/Downloads/bare acts/THE ARBITRATION AND CONCILIATION ACT, 1996.pdf';
  const outPath = path.resolve('public/bare-acts/stored/the_arbitration_and_conciliation_act_1996_punia_associates_complete_book.pdf');

  console.time('Processing');
  const srcBytes = fs.readFileSync(srcPath);
  const srcDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true });

  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const colorNavy = rgb(0.043, 0.082, 0.165);
  const colorGold = rgb(0.82, 0.62, 0.22);
  const colorRule = rgb(0.86, 0.88, 0.92);

  // 1. Luxury Book Cover Page
  const cover = doc.addPage([595.28, 841.89]);
  const { width, height } = cover.getSize();
  cover.drawRectangle({ x: 0, y: 0, width, height, color: colorNavy });
  cover.drawRectangle({ x: 24, y: 24, width: width - 48, height: height - 48, borderWidth: 2, borderColor: colorGold });
  cover.drawRectangle({ x: 29, y: 29, width: width - 58, height: height - 58, borderWidth: 0.6, borderColor: colorGold });

  cover.drawText('PUNIA ASSOCIATES', { x: 50, y: height - 68, size: 16, font: fontBold, color: colorGold });
  cover.drawText('ADVOCATES & LEGAL CONSULTANTS • SUPREME COURT & HIGH COURTS OF INDIA', {
    x: 50, y: height - 84, size: 7.5, font: fontRegular, color: rgb(0.85, 0.88, 0.93)
  });
  cover.drawLine({ start: { x: 50, y: height - 94 }, end: { x: width - 50, y: height - 94 }, thickness: 1, color: colorGold });

  cover.drawText('THE ARBITRATION AND CONCILIATION ACT, 1996', { x: 50, y: height - 190, size: 20, font: fontBold, color: rgb(1, 1, 1) });
  cover.drawText('COMPLETE STATUTORY BARE ACT • ALL SECTIONS & SCHEDULES', { x: 50, y: height - 215, size: 9.5, font: fontBold, color: colorGold });

  cover.drawText('PUNIA ASSOCIATES', { x: 50, y: 52, size: 13, font: fontBold, color: colorGold });
  cover.drawText('LEGAL RESEARCH & STATUTORY REPOSITORY EDITION', { x: width - 290, y: 52, size: 8, font: fontBold, color: rgb(0.85, 0.88, 0.95) });

  // 2. Chambers Overview Page
  const profile = doc.addPage([595.28, 841.89]);
  profile.drawText('PUNIA ASSOCIATES — ADVOCATES & LEGAL CONSULTANTS', { x: 50, y: height - 60, size: 14, font: fontBold, color: colorNavy });
  profile.drawLine({ start: { x: 50, y: height - 70 }, end: { x: width - 50, y: height - 70 }, thickness: 1.2, color: colorGold });
  profile.drawText('CHAMBERS OF PUNIA ASSOCIATES', { x: 50, y: height - 100, size: 11, font: fontBold, color: colorNavy });
  profile.drawText('Specialized Litigation, Commercial Arbitration, Corporate Insolvency & Criminal Defense.', { x: 50, y: height - 120, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  profile.drawText('Supreme Court of India • High Court of Punjab & Haryana at Chandigarh • Delhi High Court', { x: 50, y: height - 138, size: 8.5, font: fontBold, color: colorGold });

  // 3. Copy all original statutory pages
  const copiedPages = await doc.copyPages(srcDoc, srcDoc.getPageIndices());
  copiedPages.forEach(p => doc.addPage(p));

  const totalPages = doc.getPageCount();

  // 4. Stamp footer on every page (from page 2 onwards)
  for (let idx = 1; idx < totalPages; idx++) {
    const p = doc.getPage(idx);
    const pW = p.getWidth();
    const pH = p.getHeight();

    p.drawLine({ start: { x: 36, y: 28 }, end: { x: pW - 36, y: 28 }, thickness: 0.5, color: colorRule });
    p.drawText('PUNIA ASSOCIATES', { x: 36, y: 16, size: 8, font: fontBold, color: colorNavy });
    p.drawText('Page ' + (idx + 1) + ' of ' + totalPages, { x: pW - 95, y: 16, size: 7.5, font: fontBold, color: colorGold });
  }

  const outBytes = await doc.save();
  fs.writeFileSync(outPath, outBytes);
  console.timeEnd('Processing');
  console.log('Saved:', outPath, '(' + (outBytes.length / 1024).toFixed(1) + ' KB, ' + totalPages + ' pages)');
}

testStamp().catch(console.error);
