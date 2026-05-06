import { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { toast } from 'sonner';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const saveToStorage = (newItems: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      let newItems;
      if (existing) {
        newItems = prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...prev, { ...product, quantity: 1 }];
      }
      saveToStorage(newItems);
      toast.success(`${product.name} added to cart`);
      return newItems;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const newItems = prev.filter((i) => i.id !== id);
      saveToStorage(newItems);
      return newItems;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) => {
      const newItems = prev.map((i) => {
        if (i.id === id) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      });
      saveToStorage(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clearCart, total, cartCount };
};