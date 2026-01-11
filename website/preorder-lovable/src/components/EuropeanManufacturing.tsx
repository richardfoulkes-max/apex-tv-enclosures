import { Award, Factory, FlaskConical } from "lucide-react";

const EuropeanManufacturing = () => {
  const certifications = [
    { icon: Award, label: "ISO 9001", description: "Quality Management" },
    { icon: Award, label: "ISO 14001", description: "Environmental" },
    { icon: Award, label: "ISO 45001", description: "Safety Standards" },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
            <Factory className="w-4 h-4" />
            <span className="text-sm font-semibold">Manufacturing Excellence</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Manufactured to{" "}
            <span className="text-accent">European Standards</span>
          </h2>

          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Apex enclosures are built in an ISO 9001/14001/45001 certified facility that supplies precision components to Schneider Electric. Every unit passes the same quality standards used for industrial electrical enclosures.
          </p>

          {/* Certifications */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
                <cert.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="font-bold text-primary-foreground text-sm">{cert.label}</div>
                <div className="text-xs text-primary-foreground/60">{cert.description}</div>
              </div>
            ))}
          </div>

          {/* Trust Points */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <FlaskConical className="w-4 h-4 text-accent" />
              <span>AAMA 2604 Powder Coating</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Award className="w-4 h-4 text-accent" />
              <span>2000+ Hour Salt Spray Test</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Factory className="w-4 h-4 text-accent" />
              <span>Schneider Electric Supplier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EuropeanManufacturing;
