const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const STORED_DIR = path.resolve(__dirname, '..', 'public', 'bare-acts', 'stored');
const DB_FILE = path.resolve(__dirname, '..', 'data', 'legalDatabase.json');
const TS_DATA_FILE = path.resolve(__dirname, '..', 'src', 'data', 'bareActsData.ts');

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

function cleanTitleFromFilename(f) {
  let name = f.replace(/_punia_associates_(complete_book|modern_book_edition)\.pdf$/i, '')
    .replace(/^the_/, '')
    .replace(/_+/g, ' ')
    .trim();

  // Words that stay lowercase unless at start
  const lowerWords = new Set(['and', 'of', 'the', 'in', 'for', 'to', 'on', 'at', 'by', 'from', 'with']);
  const parts = name.split(' ').map((w, idx) => {
    if (idx > 0 && lowerWords.has(w.toLowerCase())) return w.toLowerCase();
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });

  let title = 'The ' + parts.join(' ');
  return title;
}

async function syncAll() {
  console.log('Reading files from:', STORED_DIR);
  const allPdfs = fs.readdirSync(STORED_DIR).filter(f => f.endsWith('.pdf'));

  // Prioritize complete books, then modern book editions
  const completeBooks = allPdfs.filter(f => f.includes('complete_book.pdf'));
  const modernBooks = allPdfs.filter(f => f.includes('modern_book_edition.pdf'));

  console.log(`Found ${completeBooks.length} complete books and ${modernBooks.length} modern book editions.`);

  const actsList = [];
  const processedKeys = new Set();

  // Process complete books first
  for (const f of completeBooks) {
    const fullP = path.join(STORED_DIR, f);
    const stat = fs.statSync(fullP);
    const cleanKey = f.replace(/_punia_associates_complete_book\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    if (processedKeys.has(cleanKey)) continue;
    processedKeys.add(cleanKey);

    const title = cleanTitleFromFilename(f);
    const yearMatch = f.match(/\b(18\d\d|19\d\d|20\d\d)\b/);
    const year = yearMatch ? parseInt(yearMatch[1], 10) : 2024;
    const category = classifyAct(title);
    const slug = f.replace(/_punia_associates_complete_book\.pdf$/i, '').replace(/_/g, '-');

    // Get actual page count from PDF
    let pageCount = Math.round(stat.size / 6000);
    try {
      const b = fs.readFileSync(fullP);
      const doc = await PDFDocument.load(b, { ignoreEncryption: true });
      pageCount = doc.getPageCount();
    } catch {}

    const actObj = {
      id: slug,
      title: title,
      shortTitle: title.replace(/^The\s+/, ''),
      actNumber: `Official Statute (${year})`,
      year: year,
      enactmentDate: `${year}-01-01`,
      enforcementDate: `${year}-01-01`,
      ministry: 'Ministry of Law and Justice, Government of India',
      jurisdiction: 'Central',
      category: category,
      status: 'In Force',
      pageCount: pageCount,
      fileSizeKb: Math.round(stat.size / 1024),
      pdfUrl: `/bare-acts/stored/${f}`,
      isModernBookEdition: true,
      editionType: 'Punia Associates Complete Bare Act Book (All Sections)'
    };

    actsList.push(actObj);

    // Also add aliases for common ID lookups
    if (slug.includes('penal-code')) {
      actsList.push({ ...actObj, id: 'indian-penal-code' });
      actsList.push({ ...actObj, id: 'indian-penal-code-1860' });
    }
    if (slug.includes('civil-procedure')) {
      actsList.push({ ...actObj, id: 'code-of-civil-procedure-1908' });
    }
    if (slug.includes('criminal-procedure')) {
      actsList.push({ ...actObj, id: 'code-of-criminal-procedure-1973' });
    }
    if (slug.includes('arbitration')) {
      actsList.push({ ...actObj, id: 'arbitration-and-conciliation-act-1996' });
    }
    if (slug.includes('nagarik-suraksha')) {
      actsList.push({ ...actObj, id: 'bharatiya-nagarik-suraksha-sanhita-2023' });
    }
    if (slug.includes('nyaya-sanhita')) {
      actsList.push({ ...actObj, id: 'bharatiya-nyaya-sanhita-2023' });
    }
    if (slug.includes('sakshya')) {
      actsList.push({ ...actObj, id: 'bharatiya-sakshya-adhiniyam-2023' });
    }
    if (slug.includes('constitution')) {
      actsList.push({ ...actObj, id: 'constitution-of-india' });
    }
  }

  // Deduplicate by id
  const finalMap = new Map();
  actsList.forEach(a => {
    if (!finalMap.has(a.id)) {
      finalMap.set(a.id, a);
    }
  });

  const finalActs = Array.from(finalMap.values());
  const flagshipOrder = [
    'constitution-of-india',
    'code-of-civil-procedure-1908',
    'bharatiya-nagarik-suraksha-sanhita-2023',
    'code-of-criminal-procedure-1973',
    'indian-penal-code',
    'the-motor-vehicles-act-1988',
    'the-income-tax-act-1961',
    'arbitration-and-conciliation-act-1996',
    'the-indian-contract-act-1872',
    'the-consumer-protection-act-2019',
    'the-right-to-information-act-2005',
    'the-transfer-of-property-act-1882',
    'the-hindu-marriage-act-1955',
    'advocates-act-1961',
    'bharatiya-sakshya-adhiniyam-2023'
  ];

  finalActs.sort((a, b) => {
    const idxA = flagshipOrder.indexOf(a.id);
    const idxB = flagshipOrder.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.title.localeCompare(b.title);
  });

  console.log(`Total synchronized acts: ${finalActs.length}`);

  // 1. Write to data/legalDatabase.json
  let db = { bareActs: [], judgments: [], articles: [] };
  if (fs.existsSync(DB_FILE)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch {}
  }
  db.bareActs = finalActs;
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  console.log('Saved legalDatabase.json successfully.');

  // 2. Generate TypeScript export for src/data/bareActsData.ts
  const tsContent = `// Canonical Statutory Bare Acts Database
// Punia Associates Legal Platform — Complete Bare Act Books (All Verbatim Sections Included)

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
  chapters?: BareActChapter[];
}

export const BARE_ACTS_DATABASE: BareAct[] = ${JSON.stringify(finalActs, null, 2)};
`;

  fs.writeFileSync(TS_DATA_FILE, tsContent, 'utf8');
  console.log('Updated src/data/bareActsData.ts successfully with all complete books!');
}

syncAll().catch(console.error);
