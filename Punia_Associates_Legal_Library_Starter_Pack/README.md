# Punia Associates — Legal Library Starter Pack

This is a **starter import/index package**, not a downloaded corpus of every Indian Bare Act. It contains a reusable catalogue schema, jurisdiction index, illustrative Central Act seed rows, subject taxonomy, source registry, sample import manifest, and a safe PDF-ingestion strategy for the website developer/Gemini Agent.

## Selected product structure

- Mobile UI: Modern Legal-Tech (white, emerald/dark green, restrained gold).
- Homepage priority: Articles & Judgments appear immediately near the top.
- No “Our Lawyers” section on the homepage. Lawyers are reached through the hamburger menu and a separate `/lawyers` page.
- Legal Resources is a separate library with dedicated pages for Bare Acts, State Acts, Rules & Regulations, Codes, Books & PDFs, Notifications & Circulars, and Forms & Formats.
- Library coverage: Central + all States + all Union Territories.
- Delivery modes: link to the official source and, where legally and technically appropriate, provide a locally stored PDF copy with provenance and version metadata.

## Official sources to configure

1. India Code — Government of India / Legislative Department / NIC: https://www.indiacode.nic.in/
   - Search for Acts, Sections, Subordinate Legislations, Rules, Regulations, Notifications, Orders, Ordinances, Statutes and Circulars.
   - Official site identifies Ministries/Departments as content providers and NIC as site developer.
2. e-Gazette of India: https://egazette.gov.in/
   - Use to verify Gazette notifications and amendment publications where relevant.
3. Supreme Court of India: https://www.sci.gov.in/
   - Official judgments, orders, notices and related court material.
4. eSCR / Judgments and Orders portal: https://judgments.ecourts.gov.in/
   - Search judgments and orders using supported fields and link to the source record.
5. High Court Services: https://hcservices.ecourts.gov.in/hcservices/
   - Court orders and judgments, searched by High Court/Bench and available search criteria.

## What each file is for

- `jurisdictions.csv`: 28 States + 8 Union Territories for catalogue filters.
- `central_acts_seed.csv`: illustrative initial Central Act records. These are **not a complete or certified current law list**; verify current title, Act number, commencement, amendments, repeals and official record before publishing.
- `acts_import_template.csv`: blank reusable bulk-import template for Acts and subordinate legislation.
- `judgments_articles_import_template.csv`: template for case-law digest/article records, not for republishing full copyrighted commentary.
- `subject_taxonomy.csv`: initial legal-library subject/category hierarchy.
- `source_registry.csv`: official source directory and recommended source purpose.
- `legal_resource.schema.json`: machine-readable resource record schema.
- `sample_import_manifest.json`: example import batch manifest.
- `PDF_INGESTION_AND_UPDATE_STRATEGY.md`: detailed local-PDF, verification, versioning and update process.

## Critical legal-content rule

Do not claim that this starter pack contains every Central, State or UT Act. India Code coverage and document formats can vary by jurisdiction and by record. Some records may have section-level text; others may be presented as scanned documents or linked PDFs. Display coverage gaps instead of silently omitting records.

Do not assume that a public government URL grants unrestricted permission to mirror, modify or redistribute every file. Preserve official source links, check applicable reuse terms, and obtain legal review before local rehosting at scale. Never alter the official PDF. Keep editorial commentary and case notes as separate, clearly labelled original content.

## Import workflow

1. Upload or import the catalogue metadata first.
2. Resolve each record to the official India Code/Gazette/Court source page.
3. Verify title, jurisdiction, Act number/year, document type, status, commencement, amendment/currency note and source URL.
4. Download the original PDF only where the source and reuse terms permit. Otherwise, store the official source URL and offer an outbound link.
5. Compute SHA-256 for every locally stored file.
6. Keep the original file immutable. Store OCR/searchable derivatives separately and label them as derivatives.
7. Require an editor/legal reviewer to approve the record before public display.
8. Schedule source checks and review amendment notifications. Never automatically label a document “latest” solely because the PDF exists.

## Suggested public disclaimer

“Legal materials are provided for research and general information. The official source document and applicable Gazette/court record prevail in case of any discrepancy. Users should verify the current law, commencement, amendments, rules and judicial interpretation before relying on any material. Content on this website is not a substitute for advice on the facts of an individual matter.”

Have this wording and all website consultation/marketing language reviewed for the applicable Bar Council rules and professional-conduct requirements before launch.
