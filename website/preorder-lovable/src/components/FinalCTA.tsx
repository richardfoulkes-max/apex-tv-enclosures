import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, Truck } from "lucide-react";
import { openWhatsApp } from "@/lib/constants";

const FinalCTA = () => {
  const guarantees = [
    { icon: RefreshCw, text: "Fully Refundable Deposit" },
    { icon: Shield, text: "Founding Customer Pricing" },
    { icon: Truck, text: "Priority Delivery" },
  ];

  return (
    <section className="py-20 gradient-navy">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Protect Your Entertainment Investment
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            AED 375 fully refundable deposit secures your spot. First 50 units ship Q2 2026.
          </p>

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {guarantees.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-accent">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-semibold">{item.text}</span>
              </div>
            ))}
          </div>

          <Button
            variant="cta"
            size="xl"
            className="animate-pulse-glow"
            onClick={openWhatsApp}
          >
            Reserve Yours — AED 375 Deposit
          </Button>

          <p className="text-sm text-primary-foreground/60 mt-6">
            Questions? WhatsApp us anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
