import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;

  const handleAddToCart = () => {
    const firstVariant = node.variants.edges[0]?.node;
    if (!firstVariant) return;

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
  };

  const imageUrl = node.images.edges[0]?.node.url;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);

  return (
    <div className="group relative">
      <Link to={`/product/${node.handle}`} className="block">
        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-card mb-4 border border-border">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={node.title}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {node.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {node.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
      
      <Button
        onClick={handleAddToCart}
        className="w-full mt-4 bg-primary hover:bg-primary/90"
        size="lg"
      >
        Add to Cart
      </Button>
    </div>
  );
};
