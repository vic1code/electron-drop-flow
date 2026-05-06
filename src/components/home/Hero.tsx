import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Globe, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              <Zap className="h-3 w-3 fill-primary" />
              <span>OVER 500,000+ COMPONENTS IN STOCK</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Next-Gen Electronic <br />
              <span className="text-primary">Sourcing Solution</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Connect directly with global suppliers. High-quality semiconductors, sensors, and microcontrollers delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="px-8 font-semibold">
                Explore Catalog <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 font-semibold">
                B2B Bulk Orders
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4 text-green-500" /> Verified 
                </div>
                <p className="text-xs text-muted-foreground">Supplier Network</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Globe className="h-4 w-4 text-blue-500" /> Global 
                </div>
                <p className="text-xs text-muted-foreground">Shipping Support</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Zap className="h-4 w-4 text-orange-500" /> Real-time 
                </div>
                <p className="text-xs text-muted-foreground">Stock Updates</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border bg-muted">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/800c158c-c203-4f95-950e-80ab7da13069/hero-banner---electronic-components-26ae323c-1778082604446.webp" 
                alt="Electronic Components" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-xl border max-w-[240px] hidden md:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Latest Order</p>
                  <p className="text-sm font-bold">#EF-92834 Shipped</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};