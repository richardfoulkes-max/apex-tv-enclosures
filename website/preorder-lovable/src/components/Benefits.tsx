import { Wind, Droplets, Tv, Wrench } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Wind,
      title: "Active Cooling",
      description: "3 industrial fans deliver 3× more cooling than competitors. Rated for 55°C Gulf summers.",
    },
    {
      icon: Droplets,
      title: "IP55 Sealed",
      description: "Rain, pool splash, desert dust — sealed against the elements. No problem.",
    },
    {
      icon: Tv,
      title: "Any TV Works",
      description: "Samsung, LG, Sony, TCL. Your choice. Upgrade your TV anytime without changing the enclosure.",
    },
    {
      icon: Wrench,
      title: "Easy Service",
      description: "Hinged door design. Swap TVs in 10 minutes. No professional installation required.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Built Different
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Every detail engineered for outdoor performance.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
