import React from 'react';
import { Star, ShoppingCart, Info } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <Card className="h-full flex flex-col group overflow-hidden border-muted-foreground/10 hover:border-primary/50 transition-colors">
      <CardHeader className="p-0 relative aspect-square overflow-hidden bg-muted/20">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-2 left-2 bg-primary/90">
          In Stock: {product.stock}
        </Badge>
        {product.price < 1 && (
          <Badge className="absolute top-2 right-2 bg-green-500/90">
            Bulk Pricing
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-bold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors cursor-pointer" onClick={() => onViewDetails(product.id)}>
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">{product.sku}</p>
        <p className="text-xl font-bold text-foreground">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1 gap-2" size="sm" onClick={() => onAddToCart(product)}>
          <ShoppingCart className="h-4 w-4" /> Add
        </Button>
        <Button variant="outline" size="sm" onClick={() => onViewDetails(product.id)}>
          <Info className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};