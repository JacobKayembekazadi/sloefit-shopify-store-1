import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProductPage = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    if (!handle) return;

    const loadProduct = async () => {
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        setSelectedVariant(data?.variants?.edges[0]?.node);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: product.title,
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product not found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = product.images?.edges[0]?.node?.url;
  const price = parseFloat(selectedVariant?.price?.amount || "0");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                <div className="text-3xl font-bold text-primary mb-6">
                  ${price.toFixed(2)}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Variant Selection */}
              {product.options?.length > 0 && (
                <div className="space-y-4">
                  {product.options.map((option: any) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium mb-2">
                        {option.name}
                      </label>
                      <div className="flex gap-2">
                        {option.values.map((value: string) => {
                          const variant = product.variants.edges.find((v: any) =>
                            v.node.selectedOptions.some((o: any) => o.value === value)
                          )?.node;
                          const isSelected = selectedVariant?.id === variant?.id;
                          
                          return (
                            <Button
                              key={value}
                              variant={isSelected ? "default" : "outline"}
                              onClick={() => setSelectedVariant(variant)}
                              className={isSelected ? "bg-primary" : ""}
                            >
                              {value}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              {/* Product Details */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="font-bold text-lg">Product Details</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Clean, disciplined formula</p>
                  <p>• Stack-friendly with other Sloe Fit products</p>
                  <p>• Made for serious lifters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
