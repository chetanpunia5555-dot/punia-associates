/**
 * Phase 0 Security Test Suite for Punia Associates Firestore Rules
 * Verifies that all "Dirty Dozen" adversarial payloads return PERMISSION_DENIED.
 */
export interface DirtyDozenTestCase {
  id: number;
  name: string;
  collection: string;
  docId: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  auth: { uid: string; email?: string; email_verified?: boolean } | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED' | 'ALLOWED';
}

export const DIRTY_DOZEN_TEST_CASES: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Unauthenticated Article Write',
    collection: 'articles',
    docId: 'art-1',
    operation: 'create',
    auth: null,
    payload: { id: 'art-1', title: 'Unauthorized Article' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 2,
    name: 'Unverified Admin Email Spoof',
    collection: 'articles',
    docId: 'art-1',
    operation: 'create',
    auth: { uid: 'spoof-uid', email: 'chetanpunia5555@gmail.com', email_verified: false },
    payload: { id: 'art-1', title: 'Spoofed Admin Write' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 3,
    name: 'Shadow Field Injection on Article',
    collection: 'articles',
    docId: 'art-1',
    operation: 'create',
    auth: { uid: 'admin-1', email: 'chetanpunia5555@gmail.com', email_verified: true },
    payload: { id: 'art-1', isSuperFeatured: true },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 4,
    name: 'Author UID Spoofing',
    collection: 'articles',
    docId: 'art-1',
    operation: 'create',
    auth: { uid: 'admin-1', email: 'chetanpunia5555@gmail.com', email_verified: true },
    payload: { id: 'art-1', authorUid: 'other-uid' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 5,
    name: 'Client Timestamp Forgery',
    collection: 'judgments',
    docId: 'jud-1',
    operation: 'create',
    auth: { uid: 'admin-1', email: 'chetanpunia5555@gmail.com', email_verified: true },
    payload: { id: 'jud-1', createdAt: '1999-01-01T00:00:00Z' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'ID Poisoning Attack',
    collection: 'judgments',
    docId: 'invalid$id!spaces',
    operation: 'create',
    auth: { uid: 'admin-1', email: 'chetanpunia5555@gmail.com', email_verified: true },
    payload: { id: 'invalid$id!spaces' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 7,
    name: 'Draft Leakage on Unpublished Article',
    collection: 'articles',
    docId: 'draft-art-1',
    operation: 'get',
    auth: null,
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 8,
    name: 'Immutable Field Mutation (createdAt / authorUid)',
    collection: 'judgments',
    docId: 'jud-1',
    operation: 'update',
    auth: { uid: 'admin-1', email: 'chetanpunia5555@gmail.com', email_verified: true },
    payload: { authorUid: 'mutated-uid' },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 9,
    name: 'Denial-of-Wallet Oversized String',
    collection: 'articles',
    docId: 'art-1',
    operation: 'create',
    auth: { uid: 'admin-1', email: 'chetanpunia5555@gmail.com', email_verified: true },
    payload: { title: 'A'.repeat(500) },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 10,
    name: 'Unbounded Array Injection',
    collection: 'articles',
    docId: 'art-1',
    operation: 'create',
    auth: { uid: 'admin-1', email: 'chetanpunia5555@gmail.com', email_verified: true },
    payload: { statutesDiscussed: new Array(25).fill('Act') },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 11,
    name: 'PII Blanket Read on /admins',
    collection: 'admins',
    docId: 'admin-1',
    operation: 'get',
    auth: { uid: 'normal-user', email: 'user@example.com', email_verified: true },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Value Poisoning on Update (Invalid Status Enum)',
    collection: 'judgments',
    docId: 'jud-1',
    operation: 'update',
    auth: { uid: 'admin-1', email: 'chetanpunia5555@gmail.com', email_verified: true },
    payload: { status: 'HackedStatus' },
    expectedResult: 'PERMISSION_DENIED'
  }
];
