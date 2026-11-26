import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const allItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': allItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url ? `https://puniaassociates.site${item.url}` : undefined
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-[#0f172a]/60 border-b border-slate-800/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto flex items-center space-x-2 flex-wrap">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />}
              {isLast || !item.url ? (
                <span className="text-amber-400 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-3 h-3 inline" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
