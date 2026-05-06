import { CartItem, Order } from '../../types';

export interface SupplierOrderResponse {
  supplierOrderId: string;
  estimatedDelivery: string;
  status: string;
}

export interface SupplierAdapter {
  name: string;
  checkStock: (sku: string) => Promise<number>;
  placeOrder: (items: CartItem[]) => Promise<SupplierOrderResponse>;
}

// Mock Digi-Key Adapter
export class DigiKeyAdapter implements SupplierAdapter {
  name = 'Digi-Key';

  async checkStock(sku: string): Promise<number> {
    // Simulate API call
    return Math.floor(Math.random() * 1000);
  }

  async placeOrder(items: CartItem[]): Promise<SupplierOrderResponse> {
    return {
      supplierOrderId: `DK-${Math.floor(Math.random() * 100000)}`,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'confirmed'
    };
  }
}

// Automated Order Routing Service
export class OrderRouter {
  private suppliers: SupplierAdapter[];

  constructor() {
    this.suppliers = [new DigiKeyAdapter()];
  }

  async routeOrder(order: Order): Promise<void> {
    console.log(`Routing order ${order.id} to suppliers...`);
    // In a real app, this would iterate through items, find best supplier, and place sub-orders
    for (const supplier of this.suppliers) {
      const response = await supplier.placeOrder(order.items);
      console.log(`Supplier ${supplier.name} confirmed: ${response.supplierOrderId}`);
    }
  }
}