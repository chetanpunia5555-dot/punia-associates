import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { ScrollToTop } from './components/ScrollToTop';
import { LiveChatWidget } from './components/LiveChatWidget';

// Core Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PracticeAreasPage } from './pages/PracticeAreasPage';
import { LawyersPage } from './pages/LawyersPage';
import { CriminalLawPage } from './pages/CriminalLawPage';
import { CivilLawPage } from './pages/CivilLawPage';
import { FamilyLawPage } from './pages/FamilyLawPage';
import { PropertyLawPage } from './pages/PropertyLawPage';
import { CorporateLawPage } from './pages/CorporateLawPage';
import { InternationalArbitrationPage } from './pages/InternationalArbitrationPage';
import { MergersAcquisitionsPage } from './pages/MergersAcquisitionsPage';
import { ConstitutionalLawPage } from './pages/ConstitutionalLawPage';
import { ConsumerLawPage } from './pages/ConsumerLawPage';
import { CyberLawPage } from './pages/CyberLawPage';
import { LegalNoticesPage } from './pages/LegalNoticesPage';
import { CourtsPage } from './pages/CourtsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AILegalResearchPage } from './pages/AILegalResearchPage';

// Legal Research & Case Law Library Pages
import { JudgmentsPage } from './pages/JudgmentsPage';
import { JudgmentDetailPage } from './pages/JudgmentDetailPage';
import { CourtOrdersPage } from './pages/CourtOrdersPage';
import { LegalNewsPage } from './pages/LegalNewsPage';
import { LegalArticlesPage } from './pages/LegalArticlesPage';
import { LegislativeUpdatesPage } from './pages/LegislativeUpdatesPage';
import { LegalResourcesPage } from './pages/LegalResourcesPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

// Legislation, Judiciary Prep & Intelligence Pages
import { LegalLibraryPage } from './pages/LegalLibraryPage';
import { BareActsPage } from './pages/BareActsPage';
import { BareActDetailPage } from './pages/BareActDetailPage';
import { ShortNotesPage } from './pages/ShortNotesPage';
import { CaseBriefsPage } from './pages/CaseBriefsPage';
import { JudiciaryPrepPage } from './pages/JudiciaryPrepPage';
import { CurrentAffairsPage } from './pages/CurrentAffairsPage';
import { LegalMagazinePage } from './pages/LegalMagazinePage';
import { LegalDraftingHubPage } from './pages/LegalDraftingHubPage';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationCategory, setConsultationCategory] = useState<string | undefined>(undefined);
  const [consultationState, setConsultationState] = useState<string | undefined>(undefined);
  const [consultationAdvocateName, setConsultationAdvocateName] = useState<string | undefined>(undefined);

  const handleOpenConsultation = (category?: string, state?: string, advocateName?: string) => {
    setConsultationCategory(category);
    setConsultationState(state);
    setConsultationAdvocateName(advocateName);
    setIsConsultationOpen(true);
  };

  const handleStateExplore = (stateName: string) => {
    const el = document.getElementById('state-legal-hubs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B] selection:bg-amber-500/20 selection:text-[#0B1325]">
        {/* Persistent Top Navigation */}
        <Navbar
          onOpenFreeConsultation={handleOpenConsultation}
          onExploreState={handleStateExplore}
        />

        {/* Dynamic Route View */}
        <div className="flex-1">
          <Routes>
            {/* 1. Home */}
            <Route
              path="/"
              element={
                <HomePage
                  onOpenConsultation={handleOpenConsultation}
                  onExploreState={handleStateExplore}
                />
              }
            />

            {/* 2. About Punia Associates */}
            <Route
              path="/about"
              element={<AboutPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 3. Practice Areas Directory */}
            <Route
              path="/practice-areas"
              element={<PracticeAreasPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 4. Advocates & Lawyers Directory */}
            <Route
              path="/lawyers"
              element={<LawyersPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 5. Criminal Law */}
            <Route
              path="/criminal-law"
              element={<CriminalLawPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 6. Civil Law */}
            <Route
              path="/civil-law"
              element={<CivilLawPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 7. Family Law */}
            <Route
              path="/family-law"
              element={<FamilyLawPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 8. Property Law */}
            <Route
              path="/property-law"
              element={<PropertyLawPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 9. Corporate Law */}
            <Route
              path="/corporate-law"
              element={<CorporateLawPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 9A. International Commercial Arbitration */}
            <Route
              path="/international-arbitration"
              element={<InternationalArbitrationPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 9B. Mergers & Acquisitions (M&A) & Private Equity */}
            <Route
              path="/mergers-acquisitions"
              element={<MergersAcquisitionsPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 10. Constitutional Law */}
            <Route
              path="/constitutional-law"
              element={<ConstitutionalLawPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 11. Consumer Law */}
            <Route
              path="/consumer-law"
              element={<ConsumerLawPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 12. Cyber Law */}
            <Route
              path="/cyber-law"
              element={<CyberLawPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 13. Legal Notices */}
            <Route
              path="/legal-notices"
              element={<LegalNoticesPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 14. Courts & Jurisdictions */}
            <Route
              path="/courts"
              element={<CourtsPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 15. Contact & Chambers */}
            <Route
              path="/contact"
              element={<ContactPage onOpenConsultation={handleOpenConsultation} />}
            />

            {/* 16. Legal Research: Judgments & Precedents */}
            <Route path="/judgments" element={<JudgmentsPage />} />
            <Route path="/judgments/supreme-court" element={<JudgmentsPage defaultCourt="supreme" />} />
            <Route path="/judgments/high-courts" element={<JudgmentsPage defaultCourt="high" />} />
            <Route path="/judgments/case-analysis" element={<CaseBriefsPage />} />
            <Route path="/judgments/:id" element={<JudgmentDetailPage />} />

            {/* 17. Legal Research: Court Orders & Rulings */}
            <Route path="/court-orders" element={<CourtOrdersPage />} />

            {/* 18. Legal News & Daily Updates */}
            <Route path="/legal-news" element={<LegalNewsPage />} />

            {/* 19. Legal Articles & Research Publications */}
            <Route path="/articles" element={<LegalArticlesPage />} />
            <Route path="/articles/category" element={<LegalArticlesPage />} />
            <Route path="/articles/category/:category" element={<LegalArticlesPage />} />

            {/* 20. Legislative & Regulatory Updates */}
            <Route path="/legislative-updates" element={<LegislativeUpdatesPage />} />

            {/* 21. India Bare Acts & Legislative Library */}
            <Route path="/legal-library" element={<LegalLibraryPage />} />
            <Route path="/bare-acts" element={<BareActsPage />} />
            <Route path="/bare-acts/:actId" element={<BareActDetailPage />} />
            <Route path="/central-acts" element={<BareActsPage />} />
            <Route path="/state-acts" element={<BareActsPage />} />
            <Route path="/codes" element={<BareActsPage />} />

            {/* 21B. Supreme Court & High Courts Law Reporter & Monthly Magazine */}
            <Route path="/magazine" element={<LegalMagazinePage />} />
            <Route path="/law-reporter" element={<LegalMagazinePage />} />

            {/* 22. Judicial Study Centre & Examination Prep */}
            <Route path="/judiciary-prep" element={<JudiciaryPrepPage />} />
            <Route path="/short-notes" element={<ShortNotesPage />} />
            <Route path="/case-briefs" element={<CaseBriefsPage />} />
            <Route path="/landmark-cases" element={<CaseBriefsPage />} />
            <Route path="/case-law-library" element={<JudgmentsPage />} />

            {/* 23. Current Affairs Hub */}
            <Route path="/current-affairs" element={<CurrentAffairsPage />} />

            {/* 24. Legal Resources & Practice Guides */}
            <Route path="/legal-resources" element={<LegalResourcesPage />} />
            <Route path="/resources" element={<LegalResourcesPage />} />
            <Route path="/rules-regulations" element={<LegalResourcesPage />} />
            <Route path="/legal-books" element={<LegalResourcesPage />} />
            <Route path="/legal-pdfs" element={<LegalResourcesPage />} />
            <Route path="/notifications-circulars" element={<LegislativeUpdatesPage />} />
            <Route path="/legal-forms" element={<LegalDraftingHubPage />} />
            <Route path="/legal-drafts" element={<LegalDraftingHubPage />} />
            <Route path="/contract-templates" element={<LegalDraftingHubPage />} />

            {/* 25. Frequently Asked Questions */}
            <Route path="/faq" element={<FaqPage />} />

            {/* 26. Privacy Policy & Confidentiality */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

            {/* 27. Terms of Use & BCI Legal Disclaimer */}
            <Route path="/terms" element={<TermsPage />} />

            {/* 28. Admin CMS & Chambers Portal + AI Legal Research Desk */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/ai-legal-research" element={<AILegalResearchPage />} />

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Persistent Footer with Statutory BCI Notice & 15-Page Directory */}
        <Footer onOpenFreeConsultation={handleOpenConsultation} />

        {/* Floating Live Legal Desk Chat */}
        <LiveChatWidget onOpenConsultation={handleOpenConsultation} />

        {/* Global Free Consultation Booking Dialog */}
        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
          initialCategory={consultationCategory}
          initialState={consultationState}
          initialAdvocateName={consultationAdvocateName}
        />
      </div>
    </BrowserRouter>
  );
}
