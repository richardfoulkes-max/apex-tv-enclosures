import { XCircle, CheckCircle } from "lucide-react";

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          The Outdoor TV Problem
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Regular TVs weren't built for the outdoors. Premium outdoor TVs cost a fortune. There's a smarter way.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Problem Side */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-8 h-8 text-destructive" />
              <h3 className="text-xl font-bold text-foreground">Without Protection</h3>
            </div>
            <ul className="space-y-4">
              {[
                "TV dies within 6-12 months",
                "Heat damage destroys internals",
                "Warranty void the moment it goes outside",
                "Cheap covers trap heat — cook your TV",
                "Premium outdoor TVs cost AED 30,000+"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground/80">
                  <span className="text-destructive font-bold mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Side */}
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-accent" />
              <h3 className="text-xl font-bold text-foreground">With Apex Enclosure</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Protection for 5+ years guaranteed",
                "Active cooling handles 55°C summers",
                "Use any TV brand you want",
                "Upgrade your TV anytime",
                "Save 70% vs premium outdoor TVs"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground/80">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
