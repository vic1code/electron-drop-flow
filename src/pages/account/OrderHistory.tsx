import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';
import { Package, ChevronRight, Clock, Truck, CheckCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface OrderHistoryProps {
  orders: Order[];
  onViewOrder: (id: string) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onViewOrder }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'shipped': return <Truck className="h-4 w-4 text-blue-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="text-muted-foreground">Manage and track your recent component orders</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9" />
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No orders found</h3>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
            <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => onViewOrder(order.id)}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{order.id}</span>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} \u2022 {order.items.length} items
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total Amount</p>
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="w-12 h-12 bg-muted rounded-md flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover rounded-md" />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-xs font-medium">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};