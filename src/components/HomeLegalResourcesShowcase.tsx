import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Layers, 
  Gavel, 
  BookMarked, 
  FileText, 
  Newspaper,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const HomeLegalResourcesShowcase: React.FC = () => {
  const resources = [
    {
      id: 'bare-acts',
      title: 'Bare Acts',
      subtitle: 'All Central & State Acts',
      icon: BookOpen,
      bgColor: 'bg-[#EBF3FC]',
      iconColor: 'text-[#2563EB]',
      path: '/bare-acts'
    },
    {
      id: 'rules-regulations',
      title: 'Rules & Regulations',
      subtitle: 'High Court & Statutory Rules',
      icon: Layers,
      bgColor: 'bg-[#E6F7F3]',
      iconColor: 'text-[#0D9488]',
      path: '/rules-regulations'
    },
    {
      id: 'codes',
      title: 'Codes',
      subtitle: 'IPC, CrPC, CPC, etc.',
      icon: Gavel,
      bgColor: 'bg-[#FEF8E7]',
      iconColor: 'text-[#D97706]',
      path: '/codes'
    },
    {
      id: 'legal-books',
      title: 'Legal Books & PDFs',
      subtitle: 'eBooks, Commentaries',
      icon: BookMarked,
      bgColor: 'bg-[#F3EBF9]',
      iconColor: 'text-[#9333EA]',
      path: '/legal-books'
    },
    {
      id: 'notifications',
      title: 'Notifications & Circulars',
      subtitle: 'Registry Notifications',
      icon: FileText,
      bgColor: 'bg-[#FDF1EC]',
      iconColor: 'text-[#EA580C]',
      path: '/notifications-circulars'
    },
    {
      id: 'forms-formats',
      title: 'Forms & Formats',
      subtitle: 'Legal Drafts & Templates',
      icon: Newspaper,
      bgColor: 'bg-[#EDF7ED]',
      iconColor: 'text-[#16A34A]',
      path: '/legal-forms'
    }
  ];

  return (
    <section id="legal-resources" className="py-12 lg:py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-700" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Explore Legal Resources
            </h2>
          </div>
          <Link 
            to="/legal-resources" 
            className="text-xs font-bold text-[#A37B31] hover:text-[#8a6624] flex items-center gap-1 transition-colors"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Soft Colored Resource Cards Grid Matching Image 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {resources.map((res) => {
            const IconComponent = res.icon;
            return (
              <Link
                key={res.id}
                to={res.path}
                className={`${res.bgColor} rounded-3xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex flex-col items-center text-center justify-center space-y-3 group cursor-pointer min-h-[160px]`}
              >
                <div className="p-3 rounded-2xl bg-white/90 shadow-sm group-hover:scale-110 transition-transform">
                  <IconComponent className={`w-6 h-6 ${res.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-800 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {res.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
