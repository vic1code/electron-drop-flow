import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem, Address } from '@/types';
import { ChevronRight, CreditCard, Truck, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onComplete: (orderData: any) => void;
  onNavigate: (page: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, total, onComplete, onNavigate }) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<Address>({
    fullName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA'
  });
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');

  const shippingCost = 12.50;
  const tax = total * 0.08;
  const grandTotal = total + shippingCost + tax;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handlePlaceOrder = () => {
    const orderData = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      items,
      total: grandTotal,
      shippingAddress: address,
      paymentMethod,
      createdAt: new Date().toISOString(),
      status: 'processing'
    };
    onComplete(orderData);
    toast.success('Order placed successfully!');
    onNavigate('orders');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    value={address.fullName} 
                    onChange={e => setAddress({...address, fullName: e.target.value})} 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={address.email} 
                    onChange={e => setAddress({...address, email: e.target.value})} 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Street Address</Label>
                  <Input 
                    value={address.street} 
                    onChange={e => setAddress({...address, street: e.target.value})} 
                    placeholder="123 Tech Avenue" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input 
                    value={address.city} 
                    onChange={e => setAddress({...address, city: e.target.value})} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input 
                      value={address.state} 
                      onChange={e => setAddress({...address, state: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Zip Code</Label>
                    <Input 
                      value={address.zip} 
                      onChange={e => setAddress({...address, zip: e.target.value})} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={handleNext}>Continue to Payment</Button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Method
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setPaymentMethod('stripe')}
                  className={`flex items-center justify-between p-4 border rounded-xl transition-all ${paymentMethod === 'stripe' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-800">S</div>
                    <div className="text-left">
                      <p className="font-bold">Stripe</p>
                      <p className="text-xs text-muted-foreground">Credit Card, Apple Pay, Google Pay</p>
                    </div>
                  </div>
                  {paymentMethod === 'stripe' && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </button>
                <button 
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex items-center justify-between p-4 border rounded-xl transition-all ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">P</div>
                    <div className="text-left">
                      <p className="font-bold">PayPal</p>
                      <p className="text-xs text-muted-foreground">PayPal Credit, Venmo</p>
                    </div>
                  </div>
                  {paymentMethod === 'paypal' && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={handleBack}>Back</Button>
              <Button className="flex-2 px-8" onClick={handleNext}>Review Order</Button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Info className="h-5 w-5" /> Final Review
              </h3>
              <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ship to:</span>
                    <span className="font-medium">{address.fullName}, {address.city}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pay with:</span>
                    <span className="font-medium capitalize">{paymentMethod}</span>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="truncate max-w-[200px]">{item.name} x{item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={handleBack}>Back</Button>
              <Button className="flex-2 px-8" onClick={handlePlaceOrder}>
                Place Order (${grandTotal.toFixed(2)})
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
              <ShieldCheck className="h-3 w-3" /> SSL Encrypted Secure Checkout
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span className={step >= 1 ? "text-primary font-bold" : ""}>Shipping</span>
          <ChevronRight className="h-4 w-4" />
          <span className={step >= 2 ? "text-primary font-bold" : ""}>Payment</span>
          <ChevronRight className="h-4 w-4" />
          <span className={step >= 3 ? "text-primary font-bold" : ""}>Review</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
                <CardDescription>{items.length} items in cart</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};