import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { CategoryGrid } from './components/home/CategoryGrid';
import { ProductCard } from './components/products/ProductCard';
import { useCart } from './hooks/useCart';
import { products, categories, mockOrders } from './lib/mock-data';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ChevronRight, Package, ArrowRight } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Checkout } from './pages/checkout/Checkout';
import { OrderHistory } from './pages/account/OrderHistory';
import { OrderDetail } from './pages/account/OrderDetail';
import { getCurrentUser } from './lib/auth';
import { Order, User } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  const { items, addItem, removeItem, updateQuantity, total, cartCount, clearCart } = useCart();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    if (page.startsWith('category-')) {
      const slug = page.replace('category-', '');
      setActiveCategory(slug);
      setCurrentPage('category');
    } else if (page.startsWith('order-')) {
      const id = page.replace('order-', '');
      setSelectedOrderId(id);
      setCurrentPage('order-detail');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  };

  const handleCheckoutComplete = (orderData: Order) => {
    setOrders([orderData, ...orders]);
    clearCart();
    handleNavigate('orders');
  };

  const filteredProducts = activeCategory 
    ? products.filter(p => p.category === activeCategory)
    : products;

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <CategoryGrid onCategoryClick={(slug) => handleNavigate(`category-${slug}`)} />
            <section className="py-16 container mx-auto px-4 border-t">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Featured Components</h2>
                <Button variant="link">View all</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addItem} 
                    onViewDetails={() => {}}
                  />
                ))}
              </div>
            </section>
          </>
        );

      case 'category':
        const cat = categories.find(c => c.slug === activeCategory);
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
              <span className="hover:text-primary cursor-pointer" onClick={() => handleNavigate('home')}>Home</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-semibold text-foreground">{cat?.name}</span>
            </div>
            <h1 className="text-3xl font-bold mb-8">{cat?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <aside className="space-y-6">
                <div>
                  <h3 className="font-bold mb-4">Filters</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Price Range</p>
                      <div className="space-y-2">
                        {['$0 - $10', '$10 - $50', '$50 - $100', '$100+'].map(range => (
                          <label key={range} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded border-muted" /> {range}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addItem} 
                      onViewDetails={() => {}}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'cart':
        return (
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-primary" /> Your Shopping Cart
            </h1>
            
            {items.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/20">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-8">Looks like you haven't added any components yet.</p>
                <Button onClick={() => handleNavigate('home')}>Continue Sourcing</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                  {items.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-4 flex gap-4">
                        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-base truncate">{item.name}</h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">SKU: {item.sku}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
                              <button className="text-muted-foreground hover:text-foreground" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                              <button className="text-muted-foreground hover:text-foreground" onClick={() => updateQuantity(item.id, 1)}>
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-6">
                  <Card className="bg-muted/30">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated Shipping</span>
                          <span>$12.50</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>${(total * 0.08).toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-primary">${(total + 12.50 + total * 0.08).toFixed(2)}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-6 h-12 text-base gap-2" 
                        size="lg" 
                        onClick={() => user ? handleNavigate('checkout') : handleNavigate('login')}
                      >
                        <CreditCard className="h-5 w-5" /> {user ? 'Secure Checkout' : 'Sign in to Checkout'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        );

      case 'login':
        return <SignIn onSuccess={() => handleNavigate('home')} onNavigate={handleNavigate} />;
      
      case 'register':
        return <SignUp onSuccess={() => handleNavigate('home')} onNavigate={handleNavigate} />;

      case 'checkout':
        if (!user) return <SignIn onSuccess={() => handleNavigate('checkout')} onNavigate={handleNavigate} />;
        return <Checkout items={items} total={total} onComplete={handleCheckoutComplete} onNavigate={handleNavigate} />;

      case 'orders':
        if (!user) return <SignIn onSuccess={() => handleNavigate('orders')} onNavigate={handleNavigate} />;
        return <OrderHistory orders={orders} onViewOrder={(id) => handleNavigate(`order-${id}`)} />;

      case 'order-detail':
        const order = orders.find(o => o.id === selectedOrderId);
        if (!order) return <div>Order not found</div>;
        return <OrderDetail order={order} onBack={() => handleNavigate('orders')} />;

      default:
        return <div className="container mx-auto px-4 py-20 text-center">Page Under Construction</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar cartCount={cartCount} onNavigate={handleNavigate} onSearch={(q) => console.log('Search:', q)} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;