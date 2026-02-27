import React from 'react';
import { motion } from 'motion/react';
import { Moon, Sparkles } from 'lucide-react';

interface GothicLandingProps {
  onStart: () => void;
}

export const GothicLanding: React.FC<GothicLandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,4,4,0.15),transparent_70%)]" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-goth-crimson/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10 max-w-2xl"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Moon className="w-16 h-16 text-stone-400/50" strokeWidth={1} />
          </motion.div>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif mb-6 tracking-tighter text-stone-100 italic">
          Gothic Mirror
        </h1>
        
        <p className="text-stone-400 text-lg md:text-xl font-serif italic mb-12 leading-relaxed">
          "The shadows we flee are but the reflections of truths we dare not speak. 
          Step into the mirror, and let us find the light hidden within your darkness."
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative px-12 py-4 bg-transparent border border-stone-700 text-stone-300 font-serif text-xl tracking-widest uppercase overflow-hidden transition-all hover:text-white hover:border-stone-400"
        >
          <span className="relative z-10">Confront the Shadow</span>
          <div className="absolute inset-0 bg-stone-900/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.button>
        
        <div className="mt-16 flex items-center justify-center gap-2 text-stone-600 font-mono text-xs uppercase tracking-[0.3em]">
          <Sparkles className="w-3 h-3" />
          <span>A Sanctuary for Lost Souls</span>
          <Sparkles className="w-3 h-3" />
        </div>
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-stone-800" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-stone-800" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-stone-800" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-stone-800" />
    </div>
  );
};
