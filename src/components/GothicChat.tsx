import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Ghost, Skull, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGothicResponse } from '../services/gemini';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface GothicChatProps {
  onRevelationComplete: () => void;
}

export const GothicChat: React.FC<GothicChatProps> = ({ onRevelationComplete }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome, weary traveler. The mirror has been waiting for you. Tell me, what shadows weigh upon your soul tonight?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      history.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await getGothicResponse(history);
      
      if (response) {
        const cleanResponse = response.replace('[REVELATION_COMPLETE]', '').trim();
        setMessages(prev => [...prev, { role: 'model', text: cleanResponse }]);
        
        if (response.includes('[REVELATION_COMPLETE]')) {
          setTimeout(() => {
            onRevelationComplete();
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "The mirror clouds... my apologies, the connection to the void is weak. Speak again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 border-b border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <Ghost className="w-6 h-6 text-stone-500" />
          <h2 className="text-2xl font-serif italic text-stone-300">The Mirror's Whisper</h2>
        </div>
        <div className="text-stone-600 font-mono text-[10px] uppercase tracking-widest">
          Status: Communing with Shadows
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex flex-col max-w-[85%]",
                msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "p-4 rounded-lg font-serif leading-relaxed",
                msg.role === 'user' 
                  ? "bg-stone-900 border border-stone-800 text-stone-300" 
                  : "bg-transparent border-l-2 border-stone-700 text-stone-100 italic"
              )}>
                <div className="prose prose-invert prose-stone max-w-none">
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
              <span className="text-[10px] font-mono text-stone-600 mt-1 uppercase tracking-tighter">
                {msg.role === 'user' ? 'The Seeker' : 'The Mirror'}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-stone-500 italic font-serif"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>The mirror is reflecting...</span>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Speak your truth to the darkness..."
          className="w-full bg-stone-900/50 border border-stone-800 rounded-none p-4 pr-16 text-stone-200 font-serif focus:outline-none focus:border-stone-600 transition-colors resize-none h-24"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-4 bottom-4 p-2 text-stone-500 hover:text-stone-200 disabled:opacity-30 transition-colors"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-4 flex justify-center">
        <Skull className="w-4 h-4 text-stone-800" />
      </div>
    </div>
  );
};
