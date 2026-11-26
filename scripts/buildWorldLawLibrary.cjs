const fs = require('fs');
const path = require('path');
const { generateWorldBook } = require('./generateWorldBookHelper.cjs');
const { worldStatutesCorpus } = require('./worldStatutesData.cjs');

const DB_FILE = path.resolve(__dirname, '..', 'data', 'legalDatabase.json');
const TS_DATA_FILE = path.resolve(__dirname, '..', 'src', 'data', 'bareActsData.ts');

async function main() {
  console.log(`Starting generation of Global World Law Library (${worldStatutesCorpus.length} Sovereign Statutes)...`);

  const generatedWorldActs = [];

  for (let i = 0; i < worldStatutesCorpus.length; i++) {
    const st = worldStatutesCorpus[i];
    process.stdout.write(`[${i + 1}/${worldStatutesCorpus.length}] Generating: ${st.title} (${st.jurisdiction})... `);
    try {
      const res = await generateWorldBook(st);
      generatedWorldActs.push({
        id: st.id,
        title: st.title,
        shortTitle: st.shortTitle || st.title,
        actNumber: st.actNumber || `Official Legislation (${st.year})`,
        year: st.year,
        enactmentDate: `${st.year}-01-01`,
        enforcementDate: `${st.year}-01-01`,
        ministry: st.authority || 'Sovereign Legislative Authority',
        jurisdiction: st.jurisdiction,
        category: st.category,
        status: 'In Force',
        pageCount: res.pageCount,
        fileSizeKb: res.fileSizeKb,
        pdfUrl: res.pdfUrl,
        isModernBookEdition: true,
        editionType: 'Punia Associates Complete Bare Act Book (All Sections)'
      });
      console.log(`DONE (${res.pageCount} Pages, ${res.fileSizeKb} KB)`);
    } catch (err) {
      console.error(`FAILED: ${err.message}`);
    }
  }

  console.log(`Successfully generated ${generatedWorldActs.length} World Law Books!`);

  // Now merge with existing Indian Bare Acts database
  let existingDb = { bareActs: [], judgments: [], articles: [] };
  if (fs.existsSync(DB_FILE)) {
    try {
      existingDb = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch {}
  }

  const existingIndianActs = (existingDb.bareActs || []).filter(a => {
    // Keep acts that are Indian Central/State
    const j = (a.jurisdiction || '').toLowerCase();
    return j === 'central' || j === 'state' || j.includes('india') || j.includes('haryana') || j.includes('punjab');
  });

  console.log(`Retaining ${existingIndianActs.length} existing Indian Bare Acts.`);

  // Combine Indian acts + World acts
  const allCombinedActs = [...existingIndianActs, ...generatedWorldActs];

  // Flagship statutes priority order
  const flagshipOrder = [
    'the-constitution-of-the-united-states',
    'constitution-of-india',
    'code-of-civil-procedure-1908',
    'bharatiya-nagarik-suraksha-sanhita-2023',
    'code-of-criminal-procedure-1973',
    'indian-penal-code',
    'uk-companies-act-2006',
    'uk-magna-carta-1297',
    'singapore-penal-code-1871',
    'singapore-companies-act-1967',
    'australia-corporations-act-2001',
    'german-basic-law-grundgesetz',
    'french-civil-code-napoleon',
    'canada-criminal-code',
    'un-charter-and-icj-statute',
    'un-universal-declaration-of-human-rights-udhr',
    'new-york-arbitration-convention-1958',
    'uncitral-model-law-arbitration',
    'arbitration-and-conciliation-act-1996',
    'the-motor-vehicles-act-1988',
    'the-income-tax-act-1961'
  ];

  allCombinedActs.sort((a, b) => {
    const idxA = flagshipOrder.indexOf(a.id);
    const idxB = flagshipOrder.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.title.localeCompare(b.title);
  });

  // Deduplicate by ID
  const map = new Map();
  allCombinedActs.forEach(a => map.set(a.id, a));
  const uniqueCombinedActs = Array.from(map.values());

  console.log(`Total Unified Global Acts: ${uniqueCombinedActs.length}`);

  // 1. Write to data/legalDatabase.json
  existingDb.bareActs = uniqueCombinedActs;
  existingDb.updatedAt = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(existingDb, null, 2));
  console.log('Saved data/legalDatabase.json successfully.');

  // 2. Generate TypeScript export for src/data/bareActsData.ts
  const tsContent = `// Canonical Statutory Bare Acts Database
// Punia Associates Legal Platform — Complete Bare Act Books (All Verbatim Sections Included)
// Global World Law Library & Indian Legislation Repository

export interface BareActSection {
  sectionNumber: string;
  title: string;
  content: string;
  explanations?: string[];
  illustrations?: string[];
  amendmentFootnotes?: string[];
  crossReferences?: string[];
  isLandmark?: boolean;
  landmarkCases?: string[];
  punishment?: string;
  bailable?: string;
  cognizable?: string;
  compoundable?: string;
}

export interface BareActChapter {
  chapterNumber: string;
  chapterTitle: string;
  sections: BareActSection[];
}

export interface BareAct {
  id: string;
  title: string;
  shortTitle: string;
  actNumber: string;
  year: number;
  enactmentDate?: string;
  enforcementDate?: string;
  ministry?: string;
  jurisdiction: string;
  category: string;
  status: string;
  totalSections?: number;
  totalChapters?: number;
  preamble?: string;
  pdfUrl?: string;
  indiaCodeUrl?: string;
  lastAmendedBy?: string;
  pageCount?: number;
  fileSizeKb?: number;
  isModernBookEdition?: boolean;
  editionType?: string;
  fileChecksum?: string;
}

export const BARE_ACTS_DATABASE: BareAct[] = ${JSON.stringify(uniqueCombinedActs, null, 2)};
`;

  fs.writeFileSync(TS_DATA_FILE, tsContent, 'utf8');
  console.log('Updated src/data/bareActsData.ts successfully with Unified Global Acts!');
}

main().catch(err => {
  console.error('Fatal error building World Law Library:', err);
  process.exit(1);
});
