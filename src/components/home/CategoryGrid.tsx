import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';

export const CategoryGrid: React.FC<{ onCategoryClick: (slug: string) => void }> = ({ onCategoryClick }) => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Browse Categories</h2>
          <p className="text-muted-foreground mt-2">Find the right components for your project.</p>
        </div>
        <button className="text-primary font-semibold flex items-center gap-1 hover:underline text-sm">
          View All Categories <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md border"
            onClick={() => onCategoryClick(category.slug)}
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Shop Now <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};