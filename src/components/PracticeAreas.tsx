import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Gavel, 
  Building2, 
  Home, 
  Coins, 
  Users, 
  Briefcase, 
  ShieldCheck,
  Globe2,
  GitMerge,
  ArrowRight
} from 'lucide-react';

interface PracticeAreasProps {
  onOpenFreeConsultation?: (category?: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = () => {
  const areas = [
    { id: 'civil-law', title: 'Civil Law', icon: Scale, path: '/civil-law' },
    { id: 'criminal-law', title: 'Criminal Law', icon: Gavel, path: '/criminal-law' },
    { id: 'corporate-law', title: 'Corporate Law', icon: Building2, path: '/corporate-law' },
    { id: 'international-arbitration', title: 'International Arbitration', icon: Globe2, path: '/international-arbitration' },
    { id: 'mergers-acquisitions', title: 'Mergers & Acquisitions', icon: GitMerge, path: '/mergers-acquisitions' },
    { id: 'property-law', title: 'Property Law', icon: Home, path: '/property-law' },
    { id: 'banking-finance', title: 'Banking & Finance', icon: Coins, path: '/practice-areas' },
    { id: 'family-law', title: 'Family Law', icon: Users, path: '/family-law' },
    { id: 'employment-law', title: 'Employment Law', icon: Briefcase, path: '/practice-areas' },
    { id: 'consumer-law', title: 'Consumer Law', icon: ShieldCheck, path: '/consumer-law' }
  ];

  return (
    <section id="practice-areas" className="py-12 lg:py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-700" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Practice Areas
            </h2>
          </div>
          <Link 
            to="/practice-areas" 
            className="text-xs font-bold text-[#A37B31] hover:text-[#8a6624] flex items-center gap-1 transition-colors"
          >
            <span>View All Practice Areas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 10 Balanced White Grid Cards (2x5 desktop, 2x5 mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-3.5">
          {areas.map((area) => {
            const IconComp = area.icon;
            return (
              <Link
                key={area.id}
                to={area.path}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all flex flex-col items-center justify-center text-center space-y-2.5 group cursor-pointer min-h-[112px]"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-800 group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-slate-900 group-hover:text-amber-800 transition-colors">
                  {area.title}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
