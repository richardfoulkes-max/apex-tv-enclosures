import { CloudRain, Thermometer, Shield } from "lucide-react";

const TrustBar = () => {
  const trustItems = [
    {
      icon: CloudRain,
      label: "IP55 Weatherproof",
    },
    {
      icon: Thermometer,
      label: "55°C Active Cooling",
    },
    {
      icon: Shield,
      label: "5-Year Warranty",
    },
  ];

  return (
    <section className="bg-primary py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-primary-foreground"
            >
              <item.icon className="w-6 h-6 text-accent" />
              <span className="font-semibold tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
