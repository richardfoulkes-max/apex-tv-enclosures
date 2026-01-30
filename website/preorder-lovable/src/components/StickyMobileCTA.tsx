import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { openWhatsApp } from "@/lib/constants";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-card/95 backdrop-blur-md border-t border-border p-4 shadow-elevated">
        <Button
          variant="cta"
          size="lg"
          className="w-full"
          onClick={openWhatsApp}
        >
          Reserve Now — AED 375 Deposit
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
