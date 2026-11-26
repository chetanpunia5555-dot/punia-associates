# PDF ingestion, download and update strategy

## A. Use official-source-first retrieval

Use the Government of India's India Code portal as the principal discovery/index source for Central Acts, State and UT legislation, and subordinate legislation. The portal provides search options for Acts, Sections, subordinate legislations and document types such as Rules, Regulations, Notifications, Orders, Ordinances, Statutes and Circulars.

Use these additional official sources where relevant:

- e-Gazette of India: https://egazette.gov.in/
- Supreme Court of India: https://www.sci.gov.in/
- eSCR / Judgments and Orders: https://judgments.ecourts.gov.in/
- High Court Services: https://hcservices.ecourts.gov.in/hcservices/
- Bar Council of India rules: https://www.barcouncilofindia.org/info/bci-rules

## B. Do not claim complete coverage prematurely

The catalogue must include all 28 States and 8 Union Territories as filter values, but do not show a jurisdiction as fully covered until its source records have been inventoried and checked. The official portal's own disclaimer states that updating of State/UT Acts is continuous and the material is supplied “as is”; it does not warrant that every record is complete or up to date. Display jurisdiction coverage statuses such as:

- Not yet inventoried
- Inventory in progress
- Source record found
- PDF available
- Text searchable
- Needs amendment check
- Legal review complete
- Coverage gap / source unavailable

## C. Store the original PDF safely

For each locally mirrored document (only after reuse terms are checked):

1. Download only from the official source URL.
2. Record the exact source URL and retrieval timestamp.
3. Record jurisdiction, Act number/year, language and document type.
4. Record HTTP metadata where available (ETag, Last-Modified, content length).
5. Verify the file is actually a PDF and scan it for malware.
6. Compute a SHA-256 checksum.
7. Store the original file as an immutable object with a version ID.
8. Never silently overwrite an earlier version.
9. Create a new version when an official revised/consolidated copy appears.
10. Retain a link to the official source record on every public resource page.

## D. PDF delivery modes

Support these modes per resource:

1. Official-source link only — safest default where rehosting permission is unclear.
2. Locally stored official PDF — only after reuse terms/permissions are checked and documented.
3. Embedded document viewer — use the local copy or permitted source URL; provide an open-original link.
4. Direct download — serve the verified file with a clear title, language, version/as-of date, source and checksum.

Do not create unofficial “consolidated Bare Acts” by merging amendments into an official PDF. If the firm creates an editorial consolidation, label it as an editorial compilation, cite every amendment and source, show the consolidation date, name the reviewer, and warn users to check the official text.

## E. OCR and searchable PDFs

If the official source is a scanned PDF:

- Keep the original scan unchanged.
- Create a separate OCR/searchable derivative.
- Label the derivative clearly as OCR-generated and not the official original.
- Preserve page references to the source scan.
- Require human legal review of section numbers, provisos, schedules, tables and punctuation before calling the text verified.
- Never rely on OCR output alone for legal advice or quotations.

## F. Amendment and commencement tracking

Keep separate fields for:

- Enactment date
- Publication/Gazette date
- Commencement date
- Amendment Act / notification
- Effective date of amendment
- Consolidated text “as of” date
- Last source check
- Last legal review

Run scheduled source checks, but do not automatically certify a resource as current just because a URL responds. A human editor/legal reviewer must confirm amendment and commencement status before the page displays “Verified current as of [date]”.

## G. State and UT coverage

Use `jurisdictions.csv` for all 28 States and 8 UTs. Import the list first, then inventory each jurisdiction from India Code and, where necessary, the relevant official State/UT legislative department or Gazette portal. Record missing or inaccessible source material as a coverage gap; do not fabricate records or PDFs.

## H. Legal Books and Commentaries

Bare Acts and official legal texts should be kept distinct from commercial commentaries, textbooks, journals and publisher PDFs. Do not upload or mirror copyrighted books without a licence or permission. For books without permission, provide bibliographic information and a legitimate publisher/library link only.

## I. Public-facing disclaimer

“Legal materials are provided for research and general information. The official Act, Gazette notification, court record and applicable amendments prevail in case of any discrepancy. Users should verify commencement, amendments, rules and judicial interpretation before relying on a document. This library is not a substitute for advice on the facts of an individual matter.”
