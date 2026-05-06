import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types';
import { ArrowLeft, Package, Truck, CreditCard, MapPin, Download } from 'lucide-react';

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6 gap-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Back to Orders
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{order.id}</h1>
            <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Invoice
            </Button>
            <Badge className="text-sm px-4 py-1 h-auto capitalize">{order.status}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">${item.price.toFixed(2)} x {item.quantity}</span>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${(order.total / 1.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$12.50</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {order.trackingNumber && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tracking Number</p>
                    <p className="text-lg font-bold">{order.trackingNumber}</p>
                    <Button variant="link" className="p-0 h-auto text-xs">Track shipment on FedEx \u2192</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p className="font-bold">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="capitalize font-medium">{order.paymentMethod}</p>
                <p className="text-xs text-muted-foreground">Transaction ID: TXN_882739420</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-4 w-4" /> Order Info
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span>1.45 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carrier:</span>
                  <span>FedEx Express</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};