import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/971XXXXXXXXX?text=I'd%20like%20to%20reserve%20an%20ATE-75";

const PricingSection = () => {
  const features = [
    "Fits 70-77\" TVs (any brand)",
    "IP55 weatherproof rating",
    "Active cooling (3 industrial fans)",
    "Powder-coated aluminum construction",
    "Hinged door for easy access",
    "5-year warranty included",
    "Professional mounting hardware",
    "Remote IR passthrough",
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Reserve Your Enclosure
            </h2>
            <p className="text-lg text-muted-foreground">
              First batch: 50 units. Founding customers save 25%.
            </p>
          </div>

          <div className="bg-card rounded-3xl shadow-elevated overflow-hidden">
            {/* Header */}
            <div className="gradient-navy p-8 text-center">
              <span className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Pre-Order Special
              </span>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">ATE-75</h3>
              <p className="text-primary-foreground/70">For 70-77" TVs</p>
            </div>

            <div className="p-8">
              {/* Price Comparison */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-3 mb-2">
                  <span className="text-5xl font-extrabold text-foreground">AED 8,100</span>
                </div>
                <p className="text-muted-foreground">
                  Compare: SunBrite 75"{" "}
                  <span className="line-through text-destructive">AED 31,200</span>
                </p>
                <p className="text-sm text-accent font-semibold mt-2">
                  Save over AED 23,000
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Warranty Callout */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground">5-Year Warranty</span>
                    <span className="text-sm text-muted-foreground"> — While others offer 12 months, we stand behind our engineering for 5 full years. That's confidence you can measure.</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Button
                  variant="cta"
                  size="xl"
                  className="w-full animate-pulse-glow"
                  onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                >
                  Reserve Now — AED 375 Deposit
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Fully refundable • Priority delivery • Founding customer pricing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
