import React from 'react';
import { Package, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">ELECTRO<span className="text-primary">FLOW</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium electronic components dropshipping platform for B2C and small B2B. Fast delivery, verified suppliers.
            </p>
            <div className="flex gap-4">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">Semiconductors</li>
              <li className="hover:text-primary cursor-pointer">Sensors</li>
              <li className="hover:text-primary cursor-pointer">Microcontrollers</li>
              <li className="hover:text-primary cursor-pointer">Power Supplies</li>
              <li className="hover:text-primary cursor-pointer">Cables</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">Help Center</li>
              <li className="hover:text-primary cursor-pointer">Shipping & Delivery</li>
              <li className="hover:text-primary cursor-pointer">Returns & Refunds</li>
              <li className="hover:text-primary cursor-pointer">API Documentation</li>
              <li className="hover:text-primary cursor-pointer">Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> support@electroflow.com
              </li>
              <li>123 Tech Avenue, Silicon Valley</li>
              <li>California, USA</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ElectroFlow Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};