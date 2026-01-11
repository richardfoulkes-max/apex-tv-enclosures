const Footer = () => {
  return (
    <footer className="py-8 bg-primary">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-primary-foreground">
              APEX<span className="text-accent">TV</span>
            </p>
            <p className="text-sm text-primary-foreground/60">
              Outdoor TV Enclosures
            </p>
          </div>
          <p className="text-sm text-primary-foreground/60">
            © 2026 Apex TV Enclosures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
