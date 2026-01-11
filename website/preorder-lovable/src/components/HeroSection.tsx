import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import heroImage from "@/assets/hero-lifestyle.jpg";

const WHATSAPP_LINK = "https://wa.me/971XXXXXXXXX?text=I'd%20like%20to%20reserve%20an%20ATE-75";

const HeroSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    pricingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Dubai villa with outdoor TV entertainment setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">5-Year Warranty</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Outdoor Entertainment.{" "}
            <span className="text-gradient-gold">Without the AED 30,000 Price Tag.</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            IP55 weatherproof enclosure. Works with any TV. Built for Gulf summers.
          </p>
          
          {/* Differentiator tagline */}
          <p className="text-sm md:text-base text-accent font-semibold mb-8 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            The only outdoor enclosure engineered specifically for Gulf climate. Whisper-quiet. 5-year warranty.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              variant="cta"
              size="xl"
              className="animate-pulse-glow"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
            >
              Reserve Yours — AED 375 Deposit
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={scrollToPricing}
            >
              See Pricing
            </Button>
          </div>

          {/* Micro trust */}
          <p className="text-sm text-primary-foreground/60 mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Fully refundable • First batch: 50 units • Ships Q2 2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
