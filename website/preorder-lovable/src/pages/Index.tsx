import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";

const ProblemSolution = lazy(() => import("@/components/ProblemSolution"));
const WhyApexComparison = lazy(() => import("@/components/WhyApexComparison"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const VideoPlaceholder = lazy(() => import("@/components/VideoPlaceholder"));
const WhisperQuiet = lazy(() => import("@/components/WhisperQuiet"));
const GulfEngineering = lazy(() => import("@/components/GulfEngineering"));
const PremiumFinishes = lazy(() => import("@/components/PremiumFinishes"));
const Benefits = lazy(() => import("@/components/Benefits"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const EuropeanManufacturing = lazy(() => import("@/components/EuropeanManufacturing"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyMobileCTA = lazy(() => import("@/components/StickyMobileCTA"));

const Index = () => {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <HeroSection />
      <TrustBar />
      <Suspense fallback={null}>
        <ProblemSolution />
        <WhyApexComparison />
        <ProductShowcase />
        <VideoPlaceholder />
        <WhisperQuiet />
        <GulfEngineering />
        <PremiumFinishes />
        <Benefits />
        <PricingSection />
        <EuropeanManufacturing />
        <FAQSection />
        <FinalCTA />
        <Footer />
        <StickyMobileCTA />
      </Suspense>
    </main>
  );
};

export default Index;
