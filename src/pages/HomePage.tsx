import React from 'react';
import { Hero } from '../components/Hero';
import { HomeArticlesAndJudgments } from '../components/HomeArticlesAndJudgments';
import { FreeConsultationSection } from '../components/FreeConsultationSection';
import { HomeLegalResourcesShowcase } from '../components/HomeLegalResourcesShowcase';
import { PracticeAreas } from '../components/PracticeAreas';
import { ContactSection } from '../components/ContactSection';
import { SEOHead } from '../components/SEOHead';

interface HomePageProps {
  onOpenConsultation: (category?: string, state?: string) => void;
  onExploreState: (state: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenConsultation,
  onExploreState,
}) => {
  return (
    <>
      <SEOHead
        title="Punia Associates — Legal Knowledge, Case Analysis & Advisory"
        description="Punia Associates is a law firm providing legal consultation, litigation, and legal research across India. Explore Supreme Court judgments, High Court orders, legal articles, and Bare Acts."
        canonicalPath="/"
      />

      {/* Main Homepage Layout - Strictly Arranged in exact order requested in Prompt Phase 1 */}
      <main id="main-content">
        
        {/* Step 2: Hero section with exact title "Punia Associates — Legal Knowledge, Case Analysis & Advisory" */}
        <Hero
          onOpenFreeConsultation={onOpenConsultation}
          onExploreState={onExploreState}
        />

        {/* Step 3, 4, 5, 6, 7: Prominent Articles & Judgments Section (Latest Articles, SC Judgments, HC Judgments, Case Analysis) */}
        <HomeArticlesAndJudgments />

        {/* Step 8: Free Legal Consultation section with visual input form & validation */}
        <FreeConsultationSection />

        {/* Step 9: Legal Resources section (Bare Acts, State Acts, Central Acts, Rules, Books, Forms) */}
        <HomeLegalResourcesShowcase />

        {/* Step 10: Practice Areas */}
        <PracticeAreas onOpenFreeConsultation={onOpenConsultation} />

        {/* Step 11: Contact Information */}
        <ContactSection />

      </main>
    </>
  );
};
