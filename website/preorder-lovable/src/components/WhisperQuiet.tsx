import { Volume2 } from "lucide-react";

const WhisperQuiet = () => {
  const soundLevels = [
    { label: "Apex at idle", db: 30, width: "15%", highlight: true },
    { label: "Library", db: 40, width: "25%", highlight: false },
    { label: "Competitor enclosures", db: 48, width: "40%", highlight: false },
    { label: "Normal conversation", db: 60, width: "60%", highlight: false },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
                <Volume2 className="w-4 h-4" />
                <span className="text-sm font-semibold">Whisper-Quiet</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Quietest Outdoor Enclosure.{" "}
                <span className="text-gradient-gold">Guaranteed.</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most enclosures blast fans at full speed the moment it gets warm. Apex uses intelligent PWM control — fans spin only as fast as needed. At idle, you'll measure just 30 decibels. That's quieter than a library. Your poolside conversation won't compete with a wind tunnel.
              </p>
            </div>

            {/* Sound Level Visualization */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                Sound Level Comparison
              </h3>
              
              <div className="space-y-5">
                {soundLevels.map((level, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${level.highlight ? "text-accent" : "text-foreground"}`}>
                        {level.label}
                      </span>
                      <span className={`text-sm font-bold ${level.highlight ? "text-accent" : "text-muted-foreground"}`}>
                        {level.db} dB
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          level.highlight 
                            ? "bg-gradient-to-r from-accent to-accent/70" 
                            : "bg-muted-foreground/30"
                        }`}
                        style={{ width: level.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
                Lower is better. Apex operates quieter than a typical library.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhisperQuiet;
