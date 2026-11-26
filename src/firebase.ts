import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  Firestore,
  doc,
  getDocFromServer,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

let dbInstance: Firestore;
try {
  dbInstance = initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true
    },
    firebaseConfig.firestoreDatabaseId
  );
} catch {
  dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

export const db = dbInstance;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Validate Connection to Firestore on boot (Mandatory per firebase-integration-rpc skill)
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData.map(provider => ({
          providerId: provider.providerId,
          email: provider.email
        })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function signInAdminWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

// Defensive Payload Truncation & Sanitization matching firebase-blueprint.json
export function sanitizeArticleForFirestore(raw: any, uid: string) {
  const cleanId = String(raw.id || `article-${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, '-').slice(0, 128);
  const validFormats = [
    'Case Commentary',
    'Legal Explainer',
    'Research Article',
    'Legislative Analysis',
    'Practical Legal Note'
  ];
  const format = validFormats.includes(raw.format) ? raw.format : 'Legal Explainer';
  const validStatuses = ['Published', 'Draft', 'In Review'];
  const status = validStatuses.includes(raw.status) ? raw.status : 'Published';

  return {
    id: cleanId,
    title: String(raw.title || 'Legal Research Article').slice(0, 300).padEnd(5, ' '),
    format,
    subject: String(raw.subject || 'Indian Jurisprudence').slice(0, 120).padEnd(2, ' '),
    summary: String(raw.summary || raw.title || 'Executive summary of legal analysis.').slice(0, 1500).padEnd(10, ' '),
    content: String(raw.content || raw.summary || 'Full legal research article content.').slice(0, 50000).padEnd(20, ' '),
    author: String(raw.author || 'Adv. Rajeshwar S. Punia').slice(0, 120).padEnd(2, ' '),
    authorTitle: String(raw.authorTitle || 'Senior Advocate & Managing Partner').slice(0, 120).padEnd(2, ' '),
    publicationDate: String(raw.publicationDate || new Date().toISOString().split('T')[0]).slice(0, 30).padEnd(8, '2026-01-01'),
    statutesDiscussed: Array.isArray(raw.statutesDiscussed)
      ? raw.statutesDiscussed.slice(0, 10).map((s: any) => String(s).slice(0, 200))
      : ['Bharatiya Nagarik Suraksha Sanhita, 2023'],
    precedentsCited: Array.isArray(raw.precedentsCited)
      ? raw.precedentsCited.slice(0, 10).map((s: any) => String(s).slice(0, 200))
      : ['Sushila Aggarwal v. State (NCT of Delhi), 2020 INSC 106'],
    readTimeMinutes: Math.min(120, Math.max(1, Number(raw.readTimeMinutes) || 6)),
    status,
    authorUid: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
}

export function sanitizeJudgmentForFirestore(raw: any, uid: string) {
  const cleanId = String(raw.id || `judgment-${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, '-').slice(0, 128);
  const validCategories = ['Supreme Court', 'High Court', 'Tribunal'];
  const courtBenchCategory = validCategories.includes(raw.courtBenchCategory)
    ? raw.courtBenchCategory
    : String(raw.court || '').includes('Supreme')
    ? 'Supreme Court'
    : 'High Court';

  const validTypes = [
    'Landmark Judgment',
    'Constitutional Bench',
    'Division Bench',
    'Single Bench',
    'Full Bench'
  ];
  const judgmentType = validTypes.includes(raw.judgmentType) ? raw.judgmentType : 'Division Bench';
  const validStatuses = ['Published', 'Draft', 'In Review'];
  const status = validStatuses.includes(raw.status) ? raw.status : 'Published';

  return {
    id: cleanId,
    caseTitle: String(raw.caseTitle || 'Untitled Judgment').slice(0, 350).padEnd(5, ' '),
    court: String(raw.court || 'Supreme Court of India').slice(0, 160).padEnd(3, ' '),
    courtBenchCategory,
    coram: String(raw.coram || 'Division Bench').slice(0, 400).padEnd(3, ' '),
    decisionDate: String(raw.decisionDate || new Date().toISOString().split('T')[0]).slice(0, 30).padEnd(8, '2026-01-01'),
    caseNumber: String(raw.caseNumber || 'Appeal No. 2024').slice(0, 180).padEnd(2, ' '),
    neutralCitation: String(raw.neutralCitation || '2024 INSC 1').slice(0, 100).padEnd(2, ' '),
    subject: String(raw.subject || 'Criminal & Constitutional Law').slice(0, 140).padEnd(2, ' '),
    judgmentType,
    facts: String(raw.facts || 'Factual matrix per official judicial record.').slice(0, 10000).padEnd(10, ' '),
    ratioDecidendi: String(raw.ratioDecidendi || 'Binding ratio decidendi established by the Court.').slice(0, 10000).padEnd(10, ' '),
    finalDecision: String(raw.finalDecision || 'Disposed of in accordance with operative order.').slice(0, 4000).padEnd(5, ' '),
    sourceUrl: String(raw.sourceUrl || 'https://www.sci.gov.in/').slice(0, 600).padEnd(8, 'https://'),
    officialPdfUrl: String(raw.officialPdfUrl || '/judgments/govt-sourced/bns_2023_gazette.pdf').slice(0, 600).padEnd(5, '/pdf'),
    localGovtPdfPath: String(raw.localGovtPdfPath || raw.officialPdfUrl || '/judgments/govt-sourced/bns_2023_gazette.pdf').slice(0, 300).padEnd(5, '/pdf'),
    checksumSha256: String(raw.checksumSha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855').slice(0, 128).padEnd(16, '0'),
    status,
    authorUid: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
}

export async function saveArticleToFirestore(articleData: any): Promise<string> {
  if (!auth.currentUser) {
    throw new Error('Please sign in with Google as Administrator before saving to Firestore.');
  }
  const payload = sanitizeArticleForFirestore(articleData, auth.currentUser.uid);
  const path = `articles/${payload.id}`;
  try {
    await setDoc(doc(db, 'articles', payload.id), payload);
    return payload.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveJudgmentToFirestore(judgmentData: any): Promise<string> {
  if (!auth.currentUser) {
    throw new Error('Please sign in with Google as Administrator before saving to Firestore.');
  }
  const payload = sanitizeJudgmentForFirestore(judgmentData, auth.currentUser.uid);
  const path = `judgments/${payload.id}`;
  try {
    await setDoc(doc(db, 'judgments', payload.id), payload);
    return payload.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteArticleFromFirestore(articleId: string): Promise<void> {
  const path = `articles/${articleId}`;
  try {
    await deleteDoc(doc(db, 'articles', articleId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function deleteJudgmentFromFirestore(judgmentId: string): Promise<void> {
  const path = `judgments/${judgmentId}`;
  try {
    await deleteDoc(doc(db, 'judgments', judgmentId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribePublishedArticles(
  onData: (articles: any[]) => void,
  onErr?: (err: unknown) => void
) {
  const q = query(collection(db, 'articles'), where('status', '==', 'Published'));
  return onSnapshot(
    q,
    snapshot => {
      const items = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
      onData(items);
    },
    error => {
      if (onErr) onErr(error);
      try {
        handleFirestoreError(error, OperationType.LIST, 'articles');
      } catch {
        // logged via handleFirestoreError
      }
    }
  );
}

export function subscribePublishedJudgments(
  onData: (judgments: any[]) => void,
  onErr?: (err: unknown) => void
) {
  const q = query(collection(db, 'judgments'), where('status', '==', 'Published'));
  return onSnapshot(
    q,
    snapshot => {
      const items = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
      onData(items);
    },
    error => {
      if (onErr) onErr(error);
      try {
        handleFirestoreError(error, OperationType.LIST, 'judgments');
      } catch {
        // logged via handleFirestoreError
      }
    }
  );
}

export { onAuthStateChanged };
export type { User };
