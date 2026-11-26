# Security Specification (Phase 0 — Payload-First Security TDD)

## 1. Data Invariants
1. **Default-Deny Catch-All**: All paths not explicitly matched (`/admins/{adminUid}`, `/articles/{articleId}`, `/judgments/{judgmentId}`) are strictly denied (`allow read, write: if false;`).
2. **Public Read Constraint (Query Enforcer)**: Public readers (`get` and `list`) on `/articles/{articleId}` and `/judgments/{judgmentId}` may ONLY read documents where `resource.data.status == 'Published'`, unless the caller is a verified administrator (`isAdmin()`).
3. **Verified Administrator Write Gate**: Only a verified administrator (`isAdmin()` — verified via `request.auth.token.email == 'chetanpunia5555@gmail.com' && request.auth.token.email_verified == true` or existence in `/databases/$(database)/documents/admins/$(request.auth.uid)`) can create, update, or delete documents in `/articles/{articleId}` or `/judgments/{judgmentId}`.
4. **Strict Schema & Key Validation (Anti-Update-Gap)**: Every `create` and `update` must pass `isValidArticle(incoming())` or `isValidJudgment(incoming())`, enforcing `hasAll`, `hasOnly`, string length boundaries, regex ID validation (`isValidId()`), `authorUid == request.auth.uid`, and server timestamps (`request.time`).
5. **Immutability Invariant**: `id`, `authorUid`, and `createdAt` cannot be mutated during `update`.
6. **PII Isolation**: `/admins/{adminUid}` contains administrator email addresses and is strictly readable only by the owner (`request.auth.uid == adminUid`) or a verified admin (`isAdmin()`). No `list` operation is permitted on `/admins`.

## 2. The "Dirty Dozen" Payloads (Designed to Break Identity, Integrity, and State)
1. **Payload 1 (Unauthenticated Article Write)**: Unauthenticated user attempts `create` on `/articles/art-1`. -> `PERMISSION_DENIED`
2. **Payload 2 (Unverified Admin Email Spoof)**: Authenticated user with `email: 'chetanpunia5555@gmail.com'` but `email_verified: false` attempts `create` on `/articles/art-1`. -> `PERMISSION_DENIED`
3. **Payload 3 (Shadow Field Injection on Article)**: Verified admin attempts `create` on `/articles/art-1` including undeclared field `isSuperFeatured: true`. -> `PERMISSION_DENIED`
4. **Payload 4 (Author UID Spoofing)**: Verified admin attempts `create` on `/articles/art-1` with `authorUid: 'someone-else-uid'`. -> `PERMISSION_DENIED`
5. **Payload 5 (Client Timestamp Forgery)**: Verified admin attempts `create` on `/judgments/jud-1` with a past/future `createdAt` instead of `request.time`. -> `PERMISSION_DENIED`
6. **Payload 6 (ID Poisoning Attack)**: Verified admin attempts `create` on `/judgments/invalid$id!with*spaces` that violates `^[a-zA-Z0-9_\-]+$`. -> `PERMISSION_DENIED`
7. **Payload 7 (Draft Leakage via List Query)**: Unauthenticated user attempts `list` on `/articles` without filtering `status == 'Published'` (or attempts `get` on a `Draft` article). -> `PERMISSION_DENIED`
8. **Payload 8 (Immutable Field Mutation)**: Verified admin attempts `update` on `/judgments/jud-1` modifying `createdAt` or `authorUid`. -> `PERMISSION_DENIED`
9. **Payload 9 (Denial-of-Wallet Oversized String)**: Verified admin attempts `create` on `/articles/art-1` with a `title` exceeding 300 characters. -> `PERMISSION_DENIED`
10. **Payload 10 (Unbounded Array Injection)**: Verified admin attempts `create` on `/articles/art-1` with `statutesDiscussed` containing 25 items (exceeding max 10) or non-string first element. -> `PERMISSION_DENIED`
11. **Payload 11 (PII Blanket Read on `/admins`)**: Non-admin user attempts `get` or `list` on `/admins/other-admin-uid`. -> `PERMISSION_DENIED`
12. **Payload 12 (Value Poisoning on Update)**: Verified admin attempts `update` on `/judgments/jud-1` setting `status` to `'HackedStatus'` outside the allowed enum `['Published', 'Draft', 'In Review']`. -> `PERMISSION_DENIED`
