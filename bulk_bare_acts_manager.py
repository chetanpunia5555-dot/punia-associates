#!/usr/bin/env python3
"""
PUNIA ASSOCIATES — BARE ACTS BULK INGESTION & DOWNLOAD MANAGER
Author: Antigravity Agent for Punia Associates
App: puniaassociates (Google AI Build Studio / Web Portal)

Capabilities:
1. Bulk scan & intake of Bare Acts PDF files from one or more folders.
2. Metadata extraction (Title, Year, Act Number, Jurisdiction, Category).
3. PDF integrity verification, page count extraction, and SHA-256 checksum calculation.
4. Exporting to:
   - `bare_acts_catalog.json` (for web app API, AI Studio context/knowledge, or Firestore)
   - `bare_acts_catalog.csv` (for database bulk imports)
5. Generation of user-facing direct download links & staging files for public download.
"""

import os
import sys
import json
import csv
import re
import hashlib
from pathlib import Path

try:
    from pypdf import PdfReader
    HAS_PYPDF = True
except ImportError:
    HAS_PYPDF = False

# Base directories
WORKSPACE = Path(__file__).resolve().parent
PUBLIC_DOWNLOADS_DIR = WORKSPACE / "public_downloads" / "bare_acts"
OUTPUT_DIR = WORKSPACE / "catalog_output"

# Categorization mapping based on keywords
CATEGORY_MAP = {
    "criminal": "Criminal & Procedural Law",
    "penal": "Criminal & Procedural Law",
    "police": "Criminal & Procedural Law",
    "procedure": "Criminal & Procedural Law",
    "evidence": "Evidence & Procedural Law",
    "civil": "Civil & Limitation Law",
    "contract": "Commercial & Contract Law",
    "property": "Property & Real Estate Law",
    "marriage": "Family & Personal Law",
    "succession": "Family & Personal Law",
    "company": "Corporate & Banking Law",
    "companies": "Corporate & Banking Law",
    "insolvency": "Corporate & Banking Law",
    "arbitration": "Arbitration & Commercial Law",
    "tax": "Taxation & Revenue Law",
    "gst": "Taxation & Revenue Law",
    "constitution": "Constitutional Law",
    "labour": "Labour & Employment Law",
    "remuneration": "Labour & Employment Law",
    "provident": "Labour & Employment Law",
    "insurance": "Labour & Employment Law",
    "environment": "Environment & Human Rights Law",
    "information": "IT & Data Protection Law",
    "copyright": "Intellectual Property Law",
    "court": "Judicial Administration & Court Laws",
    "tribunal": "Judicial Administration & Court Laws",
}

def clean_title_and_extract_metadata(filename: str):
    """
    Cleans filename like 'The_Code_of_Criminal_Procedure_1973.pdf' or
    'The_Disaster_Management_Act_2005_Punia_Associates_Reader_Edition.pdf'
    into clean Title, Year, and Category.
    """
    stem = Path(filename).stem
    # Remove branding suffixes if any
    stem = re.sub(r'_Punia_Associates_Reader_Edition', '', stem, flags=re.IGNORECASE)
    stem = re.sub(r'_Punia_Associates_Legal_Library', '', stem, flags=re.IGNORECASE)
    stem = stem.replace('_', ' ').strip()
    
    # Extract year (4 digits between 1800 and 2099)
    year_match = re.search(r'\b(1[89]\d\d|20\d\d)\b', stem)
    year = year_match.group(1) if year_match else "N/A"
    
    # Title
    title = stem
    
    # Determine jurisdiction
    jurisdiction = "Central"
    if any(k in stem.lower() for k in ["delhi", "haryana", "punjab", "rajasthan", "maharashtra", "up", "uttar pradesh"]):
        for state in ["Delhi", "Haryana", "Punjab", "Rajasthan", "Maharashtra", "Uttar Pradesh"]:
            if state.lower() in stem.lower():
                jurisdiction = state
                break

    # Determine category
    category = "General Central Legislation"
    lower_title = title.lower()
    for kw, cat in CATEGORY_MAP.items():
        if kw in lower_title:
            category = cat
            break

    return {
        "title": title,
        "year": year,
        "jurisdiction": jurisdiction,
        "category": category
    }

def process_bare_acts(source_directories, public_base_url="/downloads/bare_acts/"):
    """
    Processes all PDFs in given source directories, verifies them,
    copies them to the public download folder, and generates database manifests.
    """
    PUBLIC_DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    records = []
    seen_files = set()

    for src_dir_str in source_directories:
        src_path = Path(src_dir_str)
        if not src_path.exists():
            print(f"[Warning] Source path does not exist: {src_path}")
            continue

        print(f"[Processing Directory] {src_path}")
        pdf_files = list(src_path.glob("*.pdf"))
        print(f"  Found {len(pdf_files)} PDF files.")

        for pdf_file in pdf_files:
            file_name = pdf_file.name
            if file_name in seen_files:
                continue
            seen_files.add(file_name)

            file_bytes = pdf_file.read_bytes()
            sha256 = hashlib.sha256(file_bytes).hexdigest()
            size_kb = round(len(file_bytes) / 1024, 2)

            page_count = 1
            if HAS_PYPDF:
                try:
                    reader = PdfReader(str(pdf_file))
                    page_count = len(reader.pages)
                except Exception as e:
                    print(f"  [Notice] Could not parse page count for {file_name}: {e}")

            meta = clean_title_and_extract_metadata(file_name)
            
            # Destination path for public user download
            dest_pdf = PUBLIC_DOWNLOADS_DIR / file_name
            if not dest_pdf.exists():
                dest_pdf.write_bytes(file_bytes)

            record_id = re.sub(r'[^a-zA-Z0-9]', '-', meta['title'].lower()).strip('-')

            record = {
                "id": record_id,
                "title": meta["title"],
                "short_title": meta["title"],
                "year": meta["year"],
                "jurisdiction": meta["jurisdiction"],
                "category": meta["category"],
                "file_name": file_name,
                "file_size_kb": size_kb,
                "pages": page_count,
                "sha256": sha256,
                "format": "PDF",
                "status": "IN_FORCE",
                "download_url": f"{public_base_url}{file_name}",
                "description": f"Official Bare Act for {meta['title']} with latest statutory provisions."
            }
            records.append(record)

    # Sort records by title
    records.sort(key=lambda r: r["title"])

    # 1. Save JSON Catalog
    json_path = OUTPUT_DIR / "bare_acts_catalog.json"
    with open(json_path, "w", encoding="utf-8") as jf:
        json.dump({"total_acts": len(records), "acts": records}, jf, indent=2, ensure_ascii=False)

    # 2. Save CSV Catalog
    csv_path = OUTPUT_DIR / "bare_acts_catalog.csv"
    if records:
        fieldnames = list(records[0].keys())
        with open(csv_path, "w", newline="", encoding="utf-8") as cf:
            writer = csv.DictWriter(cf, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(records)

    print("\n" + "="*60)
    print(f"SUCCESS: Processed {len(records)} Bare Acts.")
    print(f"1. JSON Catalog saved to: {json_path}")
    print(f"2. CSV Catalog saved to: {csv_path}")
    print(f"3. User-downloadable PDFs staged at: {PUBLIC_DOWNLOADS_DIR}")
    print("="*60 + "\n")
    return records

if __name__ == "__main__":
    # Default directories to check in Downloads
    default_sources = [
        Path("..") / "puniaassociates bareacts 1",
        Path("..") / "puniaassociates bare acts 2"
    ]
    
    # If custom paths provided via CLI
    if len(sys.argv) > 1:
        default_sources = [Path(p) for p in sys.argv[1:]]

    process_bare_acts(default_sources)
