const fs = require('fs');
const http = require('http');
const { PDFDocument, StandardFonts } = require('pdf-lib');

async function testUpload() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < 5; i++) {
    const page = doc.addPage([595, 842]);
    page.drawText('Official Test Statute Page ' + (i + 1) + ' for Punia Associates Repository', { x: 50, y: 750, size: 14, font });
  }
  const pdfBytes = await doc.save();
  const testBuf = Buffer.from(pdfBytes);
  console.log('Original Upload Bytes:', testBuf.length, '(' + Math.round(testBuf.length / 1024) + ' KB)');

  const uploadId = 'test_fidelity_' + Date.now();
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

  let body = '';
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="uploadId"\r\n\r\n' + uploadId + '\r\n';
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="chunkIndex"\r\n\r\n0\r\n';
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="totalChunks"\r\n\r\n1\r\n';
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="fileName"\r\n\r\nThe_Commercial_Courts_Act_2015.pdf\r\n';
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="chunk"; filename="The_Commercial_Courts_Act_2015.pdf"\r\n';
  body += 'Content-Type: application/pdf\r\n\r\n';

  const pre = Buffer.from(body, 'utf-8');
  const post = Buffer.from('\r\n--' + boundary + '--\r\n', 'utf-8');
  const fullPayload = Buffer.concat([pre, testBuf, post]);

  const chunkReq = http.request('http://localhost:3000/api/admin/upload-chunk', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + boundary,
      'Content-Length': fullPayload.length
    }
  }, (res) => {
    let rData = '';
    res.on('data', c => rData += c);
    res.on('end', () => {
      console.log('Chunk upload response code:', res.statusCode);

      const finPayload = JSON.stringify({
        uploadId,
        fileName: 'The_Commercial_Courts_Act_2015.pdf',
        resourceCategory: 'Bare Acts',
        compressionMode: 'none',
        autoCommit: true,
        title: 'The Commercial Courts Act 2015',
        jurisdiction: 'Central',
        year: '2015'
      });

      const finReq = http.request('http://localhost:3000/api/admin/upload-finalize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(finPayload)
        }
      }, (finRes) => {
        let fData = '';
        finRes.on('data', c => fData += c);
        finRes.on('end', () => {
          const parsed = JSON.parse(fData);
          console.log('Finalize response: success =', parsed.success, '| importedActs =', parsed.importedActs?.length);

          // Now test download
          http.get('http://localhost:3000/api/bare-acts/' + encodeURIComponent('The Commercial Courts Act 2015') + '/download', (dRes) => {
            let dlBytes = 0;
            dRes.on('data', c => dlBytes += c.length);
            dRes.on('end', () => {
              console.log('DOWNLOAD RESULT: Status', dRes.statusCode, '| Downloaded:', dlBytes, 'bytes | Original:', testBuf.length, 'bytes');
              console.log('Fidelity Status:', dlBytes === testBuf.length ? '100% PERFECT BYTE-FOR-BYTE FIDELITY!' : 'MISMATCH');
            });
          });
        });
      });
      finReq.write(finPayload);
      finReq.end();
    });
  });
  chunkReq.write(fullPayload);
  chunkReq.end();
}

testUpload();
