import { Play } from "lucide-react";

const VideoPlaceholder = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Product video coming soon with our first production units.
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="relative aspect-video bg-primary rounded-2xl overflow-hidden shadow-elevated">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              {/* Play button */}
              <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center mb-6 cursor-default">
                <Play className="w-8 h-8 text-accent ml-1" fill="currentColor" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                Product Demo Video
              </h3>
              <p className="text-primary-foreground/70 max-w-md">
                Watch how Apex protects your TV from extreme heat, rain, and dust while keeping it whisper-quiet.
              </p>

              {/* Coming soon badge */}
              <div className="mt-6 inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full">
                <span className="text-sm font-semibold">Coming Q2 2026</span>
              </div>
            </div>
          </div>

          {/* Supporting text */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Subscribe to be notified when our demo video launches.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoPlaceholder;
