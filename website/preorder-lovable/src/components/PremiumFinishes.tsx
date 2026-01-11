import { Palette } from "lucide-react";

const PremiumFinishes = () => {
  const colorOptions = [
    { name: "Jet Black", ral: "RAL 9005", color: "#0a0a0a", type: "Standard", price: null },
    { name: "Pebble Grey", ral: "RAL 7032", color: "#b8b4a8", type: "Standard", price: null },
    { name: "Anthracite", ral: "RAL 7016", color: "#383e42", type: "Premium", price: "+AED 275" },
    { name: "Sand Beige", ral: "RAL 1015", color: "#e6d4b3", type: "Premium", price: "+AED 275" },
    { name: "Custom RAL", ral: "200+ colors", color: "linear-gradient(135deg, #d4a574 0%, #e85d04 50%, #1a1a2e 100%)", type: "Custom", price: "+AED 550" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
              <Palette className="w-4 h-4" />
              <span className="text-sm font-semibold">Premium Finishes</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Match Your Space.{" "}
              <span className="text-gradient-gold">Not Just Black.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Standard enclosures come in black. Period. Apex offers over 200 RAL colors to match your villa's architecture, poolside furniture, or landscape design.
            </p>
          </div>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
            {colorOptions.map((option, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow"
              >
                <div
                  className="h-24 w-full"
                  style={{
                    background: option.color.includes("gradient") ? option.color : option.color,
                  }}
                />
                <div className="p-4">
                  <div className="font-semibold text-foreground text-sm mb-1">
                    {option.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {option.ral}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      option.type === "Standard" 
                        ? "bg-accent/20 text-accent" 
                        : option.type === "Premium"
                        ? "bg-primary/10 text-primary"
                        : "bg-cta/10 text-cta"
                    }`}>
                      {option.type}
                    </span>
                    {option.price && (
                      <span className="text-xs font-semibold text-muted-foreground">
                        {option.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumFinishes;
