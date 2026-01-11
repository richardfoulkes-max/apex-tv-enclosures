import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProblemSolution from "@/components/ProblemSolution";
import WhyApexComparison from "@/components/WhyApexComparison";
import ProductShowcase from "@/components/ProductShowcase";
import WhisperQuiet from "@/components/WhisperQuiet";
import GulfEngineering from "@/components/GulfEngineering";
import PremiumFinishes from "@/components/PremiumFinishes";
import Benefits from "@/components/Benefits";
import PricingSection from "@/components/PricingSection";
import EuropeanManufacturing from "@/components/EuropeanManufacturing";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <HeroSection />
      <TrustBar />
      <ProblemSolution />
      <WhyApexComparison />
      <ProductShowcase />
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
    </main>
  );
};

export default Index;
