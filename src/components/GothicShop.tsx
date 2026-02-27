import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ShieldCheck, ArrowRight, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  resonance: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'The Obsidian Heart',
    description: 'A deep, light-absorbing obsidian pendant encased in silver thorns.',
    price: '$66.00',
    image: 'https://picsum.photos/seed/obsidian/400/500',
    resonance: 'For those who have confronted their deepest grief and found strength in the void.'
  },
  {
    id: 'p2',
    name: 'Silver Wing of Silence',
    description: 'A delicate, weathered silver wing representing the freedom found in truth.',
    price: '$44.00',
    image: 'https://picsum.photos/seed/silverwing/400/500',
    resonance: 'For those who have overcome the fear of being heard.'
  },
  {
    id: 'p3',
    name: 'The Raven\'s Eye',
    description: 'A dark amethyst stone that seems to watch back, set in a raven-claw mount.',
    price: '$55.00',
    image: 'https://picsum.photos/seed/raveneye/400/500',
    resonance: 'For those who have gained the wisdom to see through their own illusions.'
  },
  {
    id: 'p4',
    name: 'Thorned Rose Pendent',
    description: 'A blood-red garnet rose protected by intricate iron-styled thorns.',
    price: '$77.00',
    image: 'https://picsum.photos/seed/thornrose/400/500',
    resonance: 'For those who have learned that their vulnerability is their greatest armor.'
  }
];

export const GothicShop: React.FC = () => {
  return (
    <div className="min-h-screen bg-goth-black py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 border border-stone-800 rounded-full mb-6">
          <ShieldCheck className="w-4 h-4 text-stone-500" />
          <span className="text-stone-500 font-mono text-[10px] uppercase tracking-widest">Revelation Acknowledged</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-serif italic text-stone-100 mb-6">Claim Your Badge</h2>
        <p className="text-stone-400 font-serif italic text-xl max-w-2xl mx-auto">
          "You have walked through the fire and emerged with your truth. 
          Carry this token as a reminder of the shadow you have mastered."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-stone-900/30 border border-stone-800 p-6 flex flex-col hover:border-stone-600 transition-all duration-500"
          >
            <div className="aspect-[4/5] overflow-hidden mb-6 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-goth-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            
            <h3 className="text-2xl font-serif text-stone-200 mb-2 group-hover:text-white transition-colors">{product.name}</h3>
            <p className="text-stone-500 font-serif italic text-sm mb-4 flex-1">{product.description}</p>
            
            <div className="mb-6 p-3 bg-stone-950/50 border-l border-stone-700 italic text-xs text-stone-400 font-serif">
              "{product.resonance}"
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-xl font-mono text-stone-300">{product.price}</span>
              <button className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-goth-black font-serif text-sm uppercase tracking-widest hover:bg-white transition-colors">
                <ShoppingBag className="w-4 h-4" />
                Claim
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <div className="inline-block p-8 border border-stone-800 relative">
          <Star className="absolute -top-3 -left-3 w-6 h-6 text-stone-800 bg-goth-black" />
          <Star className="absolute -bottom-3 -right-3 w-6 h-6 text-stone-800 bg-goth-black" />
          <p className="text-stone-600 font-serif italic text-sm">
            "Every scar is a story. Every pendant is a victory."
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 flex items-center gap-2 mx-auto text-stone-400 hover:text-stone-200 transition-colors font-mono text-[10px] uppercase tracking-widest"
          >
            Return to the Mirror <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
