import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Building2, 
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CourtOrder } from '../data/legalCmsData';

export const CourtOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<CourtOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCourt, setSelectedCourt] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<CourtOrder | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      if (selectedType !== 'all') params.set('type', selectedType);
      if (selectedCourt !== 'all') params.set('court', selectedCourt);

      const res = await fetch(`/api/court-orders?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching orders', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedType, selectedCourt]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <>
      <SEOHead
        title="Latest Court Orders & Judicial Directions | Punia Associates"
        description="Comprehensive repository of interim orders, stay orders, bail grants, notices of motion, and procedural directions from the Supreme Court of India and High Courts."
        canonicalPath="/court-orders"
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
              <span className="text-white">Court Orders & Rulings</span>
            </div>

            <div className="max-w-3xl">
              <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-3">
                Latest Court Orders & Judicial Rulings
              </h1>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Procedural rulings, interim injunctions, stay orders, pre-arrest bail protections, and directions. Every record explicitly distinguishes interlocutory orders from final judgments to prevent legal mischaracterization.
              </p>
            </div>

            {/* Crucial Procedural Clarification Notice */}
            <div className="mt-6 p-3 bg-amber-950/60 border border-amber-500/50 rounded-xl text-xs text-amber-200 flex items-start gap-2.5 max-w-3xl">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-light">
                <strong>Interim vs Final Demarcation:</strong> An Interim Order provides provisional status quo or protection during an ongoing matter. It does not establish binding precedent or conclusively adjudicate rights until final disposal.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg">
            <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders by case title, case number, or subject..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 focus:outline-none"
                >
                  <option value="all">All Order Types</option>
                  <option value="Interim Injunction">Interim Injunctions</option>
                  <option value="Stay Order">Stay Orders</option>
                  <option value="Anticipatory Bail Order">Anticipatory Bail Orders</option>
                  <option value="Directions">Judicial Directions</option>
                  <option value="Notice of Motion">Notice of Motion</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 focus:outline-none"
                >
                  <option value="all">All Courts</option>
                  <option value="Supreme Court">Supreme Court of India</option>
                  <option value="Punjab and Haryana High Court">P&H High Court</option>
                  <option value="Allahabad High Court">Allahabad High Court</option>
                  <option value="Rajasthan High Court">Rajasthan High Court</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#0B1325] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Filter Orders
              </button>
            </form>
          </div>
        </div>

        {/* Orders Listing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <FileText className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Loading Judicial Orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="font-cormorant text-xl font-bold text-slate-800">No Orders Found</h3>
              <p className="text-xs text-slate-500 font-light">No records match the selected parameters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Order Type Header */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-amber-200">
                        {item.orderType}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.isFinal ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                        {item.isFinal ? 'Final Order' : 'Interim (Pending)'}
                      </span>
                    </div>

                    <h3 className="font-cormorant text-xl font-bold text-[#0B1325] leading-snug mb-1">
                      {item.caseTitle}
                    </h3>

                    <div className="text-xs text-slate-500 space-y-0.5 mb-3">
                      <div><strong className="text-slate-700 font-medium">{item.court}</strong></div>
                      <div>Case No: <span className="font-mono text-slate-700">{item.caseNumber}</span></div>
                      <div>Date: <span className="font-mono text-slate-700">{item.orderDate}</span></div>
                      {item.nextDateOfHearing && (
                        <div className="text-amber-800 font-medium">
                          Next Hearing (NDH): {item.nextDateOfHearing}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 mb-3 space-y-1">
                      <strong className="text-slate-900 block text-[11px] uppercase tracking-wider">Operative Directions:</strong>
                      <p className="line-clamp-3 leading-relaxed font-light">{item.directions}</p>
                    </div>

                    <div className="text-xs text-slate-600 font-light mb-3">
                      <p className="line-clamp-2"><strong>Context: </strong>{item.factualSummary}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">Verified: {item.verifiedAt}</span>
                    <button
                      onClick={() => setSelectedOrder(item)}
                      className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Detail View */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {selectedOrder.orderType} • {selectedOrder.isFinal ? 'Final Disposal' : 'Interim Order'}
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-[#0B1325] mt-1">
                    {selectedOrder.caseTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-light">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div><strong>Court:</strong> {selectedOrder.court}</div>
                  <div><strong>Bench (Coram):</strong> {selectedOrder.coram}</div>
                  <div><strong>Case Number:</strong> <span className="font-mono">{selectedOrder.caseNumber}</span></div>
                  <div><strong>Order Date:</strong> {selectedOrder.orderDate}</div>
                  {selectedOrder.nextDateOfHearing && (
                    <div><strong>Next Date of Hearing (NDH):</strong> <span className="text-amber-800 font-semibold">{selectedOrder.nextDateOfHearing}</span></div>
                  )}
                </div>

                <div>
                  <strong className="text-slate-900 block mb-1">Factual Context:</strong>
                  <p>{selectedOrder.factualSummary}</p>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl">
                  <strong className="text-amber-900 block mb-1 text-xs">Operative Directions Issued:</strong>
                  <p className="font-medium text-slate-900 whitespace-pre-line">{selectedOrder.directions}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-400">Verified Timestamp: {selectedOrder.verifiedAt}</span>
                  <a
                    href={selectedOrder.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0B1325] text-white rounded-lg font-bold flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Official Court Record</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
