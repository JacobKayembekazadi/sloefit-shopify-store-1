import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ArrowRight, Zap, Target, LineChart } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(10);
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Your Entire Routine.{" "}
                <span className="text-primary">Engineered</span> in One System.
              </h1>
              <p className="text-xl text-muted-foreground">
                Sloe Fit combines clean performance supplements with an intelligent training app so your workouts, recovery, and habits stay locked in without guesswork.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg" asChild>
                  <Link to="/quiz">
                    Build My Routine <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <Link to="/shop">Shop Founding Drop</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Stacks */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Performance Stacks
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/bundles" className="group p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Strength System</h3>
                <p className="text-muted-foreground mb-4">
                  Built for heavy lifters chasing load, power, and recovery.
                </p>
                <span className="text-primary font-semibold group-hover:underline">
                  View Stack <ArrowRight className="inline h-4 w-4" />
                </span>
              </Link>

              <Link to="/bundles" className="group p-6 rounded-lg border border-border bg-card hover:border-secondary transition-colors">
                <Target className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Shred System</h3>
                <p className="text-muted-foreground mb-4">
                  Cut clean, keep strength, stay focused.
                </p>
                <span className="text-secondary font-semibold group-hover:underline">
                  View Stack <ArrowRight className="inline h-4 w-4" />
                </span>
              </Link>

              <Link to="/bundles" className="group p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors">
                <LineChart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Daily Base System</h3>
                <p className="text-muted-foreground mb-4">
                  Foundation stack for energy, focus, and recovery.
                </p>
                <span className="text-primary font-semibold group-hover:underline">
                  View Stack <ArrowRight className="inline h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Sloe Fit App Feature */}
        <section className="py-16 px-4 bg-card">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  The Sloe Fit App
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Keeps your training, supplements, and habits synced. Personalized plans, habit tracking, and stack reminders in one place.
                </p>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/app">See How It Works</Link>
                </Button>
              </div>
              <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">App Preview</span>
              </div>
            </div>
          </div>
        </section>

        {/* Starter Essentials */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold mb-2">NEW TO SLOE FIT?</p>
              <h2 className="text-3xl md:text-4xl font-bold">Start Here</h2>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found.</p>
              </div>
            )}
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 px-4 bg-card">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built to Remove the Guesswork
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sloe Fit was built to remove the stress and guesswork from training. Beginners get simple, guided plans they can trust, while serious lifters use the Sloe Fit app and supplement system to plan sessions, track progress, and stay locked in without overthinking.
            </p>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Read Our Story</Link>
            </Button>
          </div>
        </section>

        {/* Email Signup Block */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lock in with Sloe Fit
            </h2>
            <p className="text-muted-foreground mb-8">
              Get members-only offers, training systems, and early access to new formulas before they go public.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground"
              />
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Join the List
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
