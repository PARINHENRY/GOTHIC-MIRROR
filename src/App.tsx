import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GothicLanding } from './components/GothicLanding';
import { GothicChat } from './components/GothicChat';
import { GothicShop } from './components/GothicShop';

type View = 'landing' | 'chat' | 'shop';

export default function App() {
  const [view, setView] = useState<View>('landing');

  return (
    <div className="min-h-screen bg-goth-black text-stone-200 selection:bg-goth-crimson selection:text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <GothicLanding onStart={() => setView('chat')} />
          </motion.div>
        )}

        {view === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <GothicChat onRevelationComplete={() => setView('shop')} />
          </motion.div>
        )}

        {view === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <GothicShop />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-50" />
    </div>
  );
}
