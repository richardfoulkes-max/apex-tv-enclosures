import productEnclosure from "@/assets/product-enclosure.jpg";
import productInternal from "@/assets/product-internal.jpg";

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Engineered for the Gulf
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Powder-coated aluminum construction with industrial-grade active cooling. Built to last.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Product Front View */}
          <div className="group relative overflow-hidden rounded-2xl shadow-elevated">
            <img
              src={productEnclosure}
              alt="Apex TV Enclosure - Front 3/4 view"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
              <h3 className="text-lg font-bold text-primary-foreground">Sleek Exterior</h3>
              <p className="text-sm text-primary-foreground/80">Premium powder-coated aluminum in black, grey, or custom RAL</p>
            </div>
          </div>

          {/* Internal View */}
          <div className="group relative overflow-hidden rounded-2xl shadow-elevated">
            <img
              src={productInternal}
              alt="Apex TV Enclosure - Internal cooling system"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
              <h3 className="text-lg font-bold text-primary-foreground">Active Cooling System</h3>
              <p className="text-sm text-primary-foreground/80">3 industrial fans deliver powerful cooling</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
