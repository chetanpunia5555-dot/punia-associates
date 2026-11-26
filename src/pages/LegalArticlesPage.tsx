import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Search, 
  ChevronRight, 
  Printer, 
  CheckCircle2,
  AlertCircle,
  Database,
  Plus,
  CloudUpload,
  ShieldCheck,
  X
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { LegalArticle } from '../data/legalCmsData';
import {
  auth,
  onAuthStateChanged,
  signInAdminWithGoogle,
  saveArticleToFirestore,
  subscribePublishedArticles,
  User
} from '../firebase';

export const LegalArticlesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [backendArticles, setBackendArticles] = useState<LegalArticle[]>([]);
  const [firestoreArticles, setFirestoreArticles] = useState<LegalArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState(searchParams.get('format') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeArticle, setActiveArticle] = useState<LegalArticle | null>(null);

  // Firebase Auth & Database Creation States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newFormat, setNewFormat] = useState<LegalArticle['format']>('Legal Explainer');
  const [newSubject, setNewSubject] = useState('Criminal & BNSS 2023');
  const [newAuthor, setNewAuthor] = useState('Adv. Chetan Punia');
  const [newAuthorTitle, setNewAuthorTitle] = useState('Managing Counsel, Punia Associates');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newStatutes, setNewStatutes] = useState('Bharatiya Nagarik Suraksha Sanhita, 2023, Constitution of India');
  const [newPrecedents, setNewPrecedents] = useState('Sushila Aggarwal v. State (NCT of Delhi) 2020 INSC 106');

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedFormat !== 'all') params.set('format', selectedFormat);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());

      const res = await fetch(`/api/articles?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setBackendArticles(data.articles || []);
      }
    } catch (e) {
      console.error('Failed to load legal articles', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedFormat]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setCurrentUser(u);
    });

    const unsubFirestore = subscribePublishedArticles((docs) => {
      const mapped: LegalArticle[] = docs.map((d) => ({
        id: String(d.id || ''),
        title: String(d.title || ''),
        format: (d.format as LegalArticle['format']) || 'Legal Explainer',
        subject: String(d.subject || 'Indian Jurisprudence'),
        summary: String(d.summary || ''),
        content: String(d.content || ''),
        author: String(d.author || 'Punia Associates Editorial Team'),
        authorTitle: String(d.authorTitle || 'Legal Research Desk'),
        publicationDate: String(d.publicationDate || new Date().toISOString().split('T')[0]),
        updateHistory: ['Synced from Firebase Firestore Legal Database'],
        statutesDiscussed: Array.isArray(d.statutesDiscussed) ? (d.statutesDiscussed as string[]) : [],
        precedentsCited: Array.isArray(d.precedentsCited) ? (d.precedentsCited as string[]) : [],
        readTimeMinutes: Number(d.readTimeMinutes || 6),
        status: 'Published',
        verifiedAt: 'Firestore Verified'
      }));
      setFirestoreArticles(mapped);
    });

    return () => {
      unsubAuth();
      unsubFirestore();
    };
  }, []);

  // Merge Firestore + Backend articles without duplicates
  const articles = React.useMemo(() => {
    const map = new Map<string, LegalArticle>();
    for (const fa of firestoreArticles) {
      map.set(fa.id, fa);
    }
    for (const ba of backendArticles) {
      if (!map.has(ba.id)) {
        map.set(ba.id, ba);
      }
    }
    let combined = Array.from(map.values());
    if (selectedFormat !== 'all') {
      combined = combined.filter((a) => a.format.toLowerCase() === selectedFormat.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      combined = combined.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.subject.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      );
    }
    return combined.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
  }, [backendArticles, firestoreArticles, selectedFormat, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  const handleSyncAllToFirestore = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      let user = currentUser;
      if (!user) {
        user = await signInAdminWithGoogle();
      }
      if (!user) {
        setSyncMessage('Please sign in with the authorized Admin Google account to sync to Cloud Firestore.');
        setIsSyncing(false);
        return;
      }

      let synced = 0;
      for (const art of backendArticles) {
        await saveArticleToFirestore({
          id: art.id,
          title: art.title,
          format: art.format,
          subject: art.subject,
          summary: art.summary,
          content: art.content,
          author: art.author,
          authorTitle: art.authorTitle,
          publicationDate: art.publicationDate,
          statutesDiscussed: art.statutesDiscussed,
          precedentsCited: art.precedentsCited,
          readTimeMinutes: art.readTimeMinutes,
          status: art.status
        });
        synced++;
      }
      setSyncMessage(`Synced ${synced} legal articles to Firebase Firestore Database.`);
    } catch (err) {
      setSyncMessage(`Database sync notice: ${err instanceof Error ? err.message : 'Check admin permissions'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const payload = {
        title: newTitle.trim(),
        format: newFormat,
        subject: newSubject.trim(),
        summary: newSummary.trim() || newTitle.trim(),
        content: newContent.trim(),
        author: newAuthor.trim(),
        authorTitle: newAuthorTitle.trim(),
        publicationDate: new Date().toISOString().split('T')[0],
        statutesDiscussed: newStatutes.split(',').map((s) => s.trim()).filter(Boolean),
        precedentsCited: newPrecedents.split(',').map((s) => s.trim()).filter(Boolean),
        readTimeMinutes: Math.max(3, Math.ceil(newContent.trim().split(/\s+/).length / 180)),
        status: 'Published' as const
      };

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        const created: LegalArticle = data.article;
        setBackendArticles((prev) => [created, ...prev]);

        if (currentUser) {
          await saveArticleToFirestore({
            id: created.id,
            title: created.title,
            format: created.format,
            subject: created.subject,
            summary: created.summary,
            content: created.content,
            author: created.author,
            authorTitle: created.authorTitle,
            publicationDate: created.publicationDate,
            statutesDiscussed: created.statutesDiscussed,
            precedentsCited: created.precedentsCited,
            readTimeMinutes: created.readTimeMinutes,
            status: 'Published'
          });
        }

        setShowAddModal(false);
        setNewTitle('');
        setNewSummary('');
        setNewContent('');
        setSyncMessage(`Saved "${created.title}" to the Legal Articles Database.`);
      }
    } catch (err) {
      setSyncMessage(`Error saving article: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Legal Articles & Research Publications Database | Punia Associates"
        description="Scholarly legal research database, case law commentaries, and legislative analyses covering Bharatiya Nagarik Suraksha Sanhita (BNSS), Bharatiya Nyaya Sanhita (BNS), CPC, Land Revenue, and trial defense."
        canonicalPath="/articles"
      />

      <div className="bg-[#FAF9F7] min-h-screen text-[#1E293B] pb-20">
        
        {/* Header */}
        <div className="bg-[#0B1325] text-white border-b border-slate-800 py-12 lg:py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-3">
              <Link to="/" className="hover:underline">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">Case Law Library</span>
              <span aria-hidden="true">/</span>
              <span className="text-white">Legal Articles Database</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-3">
                  Legal Articles & Research Database
                </h1>
                <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Persistent legal treatises, practical courtroom notes, and doctrinal commentaries by Punia Associates. Backed by dual persistence (Server JSON Repository + Firebase Cloud Firestore) with full statute and precedent indexing.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0B1325] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Article to Database</span>
                </button>
                <button
                  onClick={handleSyncAllToFirestore}
                  disabled={isSyncing}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <CloudUpload className="w-4 h-4" />
                  <span>{isSyncing ? 'Syncing Firestore...' : 'Sync Cloud Firestore'}</span>
                </button>
              </div>
            </div>

            {/* Database Status Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Database className="w-3.5 h-3.5" />
                  <span>Articles Database Active ({articles.length} Indexed Treatises)</span>
                </span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cloud Firestore Collection: <code className="text-amber-300 font-mono">/articles</code> ({firestoreArticles.length} cloud docs)</span>
                </span>
              </div>
              {syncMessage && (
                <div className="text-amber-300 bg-slate-900/90 border border-amber-500/40 px-3 py-1 rounded-lg">
                  {syncMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Publications' },
                { id: 'Legal Explainer', label: 'Legal Explainers' },
                { id: 'Practical Legal Note', label: 'Practical Notes' },
                { id: 'Case Commentary', label: 'Case Commentaries' },
                { id: 'Legislative Analysis', label: 'Statute Analysis' },
                { id: 'Research Article', label: 'Research Papers' }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedFormat === fmt.id
                      ? 'bg-[#0B1325] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, statutes & authors..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </form>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Loading Legal Treatises & Articles Database...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="font-cormorant text-xl font-bold text-slate-800">No Articles Found</h3>
              <p className="text-xs text-slate-500 font-light">No publications match your selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((art) => (
                <article
                  key={art.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Format & Read Time */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                      <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider border border-amber-200">
                        {art.format}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{art.readTimeMinutes} min read</span>
                      </span>
                    </div>

                    <h2 className="font-cormorant text-2xl font-bold text-[#0B1325] leading-snug hover:text-amber-800 transition-colors mb-2.5">
                      <button
                        onClick={() => setActiveArticle(art)}
                        className="text-left cursor-pointer"
                      >
                        {art.title}
                      </button>
                    </h2>

                    <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                      <span className="font-medium text-slate-700">{art.subject}</span>
                      <span>·</span>
                      <span>Published: {art.publicationDate}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-4">
                      {art.summary}
                    </p>

                    {/* Precedents Cited Chips */}
                    {art.precedentsCited.length > 0 && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 text-xs">
                        <span className="font-bold text-slate-700 block mb-1 text-[10px] uppercase tracking-wider">Precedents Analyzed:</span>
                        <div className="space-y-0.5 text-slate-600 font-light">
                          {art.precedentsCited.map((pr, i) => (
                            <div key={i} className="truncate">• {pr}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <strong className="block text-slate-800">{art.author}</strong>
                      <span className="text-[11px] text-slate-400">{art.authorTitle}</span>
                    </div>

                    <button
                      onClick={() => setActiveArticle(art)}
                      className="px-4 py-2 bg-[#0B1325] hover:bg-amber-600 text-white rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Read Treatise</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Add Article to Database Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-amber-600" />
                  <h2 className="font-cormorant text-2xl font-bold text-[#0B1325]">
                    Publish New Article to Legal Database
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Scope of Anticipatory Bail under Section 482 BNSS, 2023"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Publication Format</label>
                    <select
                      value={newFormat}
                      onChange={(e) => setNewFormat(e.target.value as LegalArticle['format'])}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    >
                      <option value="Legal Explainer">Legal Explainer</option>
                      <option value="Practical Legal Note">Practical Legal Note</option>
                      <option value="Case Commentary">Case Commentary</option>
                      <option value="Legislative Analysis">Legislative Analysis</option>
                      <option value="Research Article">Research Article</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Legal Subject Area</label>
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Author Designation</label>
                    <input
                      type="text"
                      value={newAuthorTitle}
                      onChange={(e) => setNewAuthorTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Executive Summary</label>
                  <textarea
                    rows={2}
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Concise 2-sentence abstract of the legal proposition..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Article / Treatise Content (Markdown supported) *</label>
                  <textarea
                    rows={6}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="### 1. Statutory Framework&#10;Write full doctrinal analysis..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Statutes Discussed (comma-separated)</label>
                    <input
                      type="text"
                      value={newStatutes}
                      onChange={(e) => setNewStatutes(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Precedents Cited (comma-separated)</label>
                    <input
                      type="text"
                      value={newPrecedents}
                      onChange={(e) => setNewPrecedents(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Persists to Server Database & Firebase Firestore</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSyncing}
                      className="px-5 py-2 bg-[#0B1325] hover:bg-amber-600 text-white rounded-xl font-bold cursor-pointer"
                    >
                      {isSyncing ? 'Saving...' : 'Save to Database'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Full Article Reader */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-slate-200">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-6">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded border border-amber-200">
                  {activeArticle.format} • {activeArticle.subject}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

              <h1 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1325] leading-tight mb-4">
                {activeArticle.title}
              </h1>

              {/* Author Attribution Strip */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs mb-6">
                <div>
                  <strong className="text-slate-900 block text-sm">{activeArticle.author}</strong>
                  <span className="text-slate-500">{activeArticle.authorTitle}</span>
                </div>
                <div className="text-right text-slate-500">
                  <div>Published: <span className="text-slate-800 font-mono">{activeArticle.publicationDate}</span></div>
                  <div>Read Time: <span className="text-slate-800">{activeArticle.readTimeMinutes} minutes</span></div>
                </div>
              </div>

              {/* Article Content with Markdown formatting */}
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed font-light space-y-4">
                {activeArticle.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('### ')) {
                    return (
                      <h3 key={i} className="font-cormorant text-xl font-bold text-[#0B1325] mt-6 mb-2 border-b border-slate-100 pb-1">
                        {para.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (para.startsWith('#### ')) {
                    return (
                      <h4 key={i} className="font-cormorant text-lg font-bold text-[#0B1325] mt-4 mb-1">
                        {para.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (para.startsWith('> ')) {
                    return (
                      <blockquote key={i} className="border-l-3 border-amber-500 bg-amber-50/50 p-3 italic text-slate-700 rounded-r-lg">
                        {para.replace('> ', '')}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={i} className="whitespace-pre-line">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Statutes & Precedents Cited Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-4 text-xs">
                {activeArticle.statutesDiscussed.length > 0 && (
                  <div>
                    <strong className="text-slate-900 block mb-1.5 font-semibold">Statutory Provisions Discussed:</strong>
                    <div className="flex flex-wrap gap-1.5">
                      {activeArticle.statutesDiscussed.map((st, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 rounded text-slate-700 font-medium">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeArticle.precedentsCited.length > 0 && (
                  <div>
                    <strong className="text-slate-900 block mb-1.5 font-semibold">Judicial Precedents Cited:</strong>
                    <ul className="space-y-1 text-slate-600 font-light">
                      {activeArticle.precedentsCited.map((pr, i) => (
                        <li key={i}>• {pr}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};
