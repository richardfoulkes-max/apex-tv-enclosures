import { Check, X } from "lucide-react";

const WhyApexComparison = () => {
  const comparisons = [
    { feature: "Cooling", typical: "Single fan", apex: "3 fans, 3× the airflow" },
    { feature: "Noise Level", typical: "Loud (fans always on)", apex: "Whisper quiet (≤30 dBA)" },
    { feature: "Fan Control", typical: "On/Off thermostat", apex: "PWM intelligent speed" },
    { feature: "Salt Spray Rating", typical: "500-1000 hours", apex: "2000+ hours" },
    { feature: "Warranty", typical: "1 year", apex: "5 years" },
    { feature: "Color Options", typical: "Black only", apex: "200+ RAL colors" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Apex?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not all enclosures are created equal. See how Apex compares to typical outdoor TV enclosures.
          </p>
        </div>

        <table className="max-w-4xl mx-auto w-full overflow-hidden rounded-2xl shadow-elevated border-collapse">
          <thead>
            <tr className="gradient-navy text-primary-foreground">
              <th className="p-4 md:p-6 font-semibold text-left">Feature</th>
              <th className="p-4 md:p-6 font-semibold text-center border-l border-primary-foreground/20">Typical Enclosures</th>
              <th className="p-4 md:p-6 font-semibold text-center border-l border-primary-foreground/20 bg-accent/20">
                <span className="text-accent">Apex ATE-75</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-card" : "bg-secondary"}
              >
                <td className="p-4 md:p-6 font-medium text-foreground border-t border-border">
                  {row.feature}
                </td>
                <td className="p-4 md:p-6 text-center text-muted-foreground border-t border-l border-border">
                  <span className="inline-flex items-center justify-center gap-2">
                    <X className="w-4 h-4 text-destructive flex-shrink-0 hidden sm:inline-block" aria-hidden="true" />
                    <span className="text-sm">{row.typical}</span>
                  </span>
                </td>
                <td className="p-4 md:p-6 text-center font-semibold text-foreground border-t border-l border-border bg-accent/5">
                  <span className="inline-flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 hidden sm:inline-block" aria-hidden="true" />
                    <span className="text-sm text-accent">{row.apex}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default WhyApexComparison;
