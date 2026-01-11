import { Thermometer, Wind, Shield } from "lucide-react";

const GulfEngineering = () => {
  const specs = [
    {
      icon: Thermometer,
      value: "55°C",
      label: "Ambient Rating",
      description: "Tested to Gulf extremes",
    },
    {
      icon: Wind,
      value: "3×",
      label: "Cooling Power",
      description: "vs typical enclosures",
    },
    {
      icon: Shield,
      value: "2000+",
      label: "Salt Spray Hours",
      description: "2x industry standard",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Specs Grid */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-6 shadow-soft text-center hover:shadow-elevated transition-shadow"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                      <spec.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-3xl font-extrabold text-foreground mb-1">
                      {spec.value}
                    </div>
                    <div className="text-sm font-semibold text-accent mb-1">
                      {spec.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {spec.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Temperature Visual */}
              <div className="mt-6 bg-primary rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-primary-foreground/70 text-sm">Built for</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-accent">55</span>
                    <span className="text-2xl font-bold text-accent">°C</span>
                  </div>
                  <div className="text-primary-foreground/70 text-sm">Gulf summers</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for 55°C.{" "}
                <span className="text-gradient-gold">Not Adapted for It.</span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Other enclosures are designed for mild climates and "work" in the Gulf. Apex was engineered specifically for extreme heat from day one.
                </p>
                <p>
                  Triple-fan cooling handles the heat from your TV plus direct summer sun — combined. Salt-spray tested for 2,000+ hours, so coastal salt air won't corrode it.
                </p>
                <p className="font-medium text-foreground">
                  This isn't a temperate-climate product with a bigger fan. It's Gulf-native engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GulfEngineering;
