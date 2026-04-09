import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobotLine, RiSendPlane2Line, RiCloseLine, RiMessage3Line } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';

const AIChatBot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Salom ${user?.name || 'foydalanuvchi'}! Men Fizika Olam yordamchisiman. Sizga qanday yordam bera olaman?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Placeholder for Groq API
      // When the user provides the link/key, we will update this part
      setTimeout(() => {
        const assistantMessage = { 
          role: 'assistant', 
          content: `Hozirda men o'rganish jarayonidaman. "${input}" mavzusi bo'yicha savolingizni qabul qildim. Yaqin orada Groq AI integratsiyasi tugallangach, sizga to'liq javob bera olaman!` 
        };
        setMessages(prev => [...prev, assistantMessage]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] glass-card flex flex-col shadow-2xl border border-primary/20 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <RiRobotLine size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Fizika Yordamchisi</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] opacity-80 uppercase font-bold tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-all"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-dark-bg/50 no-scrollbar"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`
                    max-w-[80%] p-3 rounded-2xl text-sm
                    ${msg.role === 'assistant' 
                      ? 'bg-white dark:bg-dark-surface text-slate-700 dark:text-slate-200 shadow-sm rounded-tl-none border border-slate-100 dark:border-white/5' 
                      : 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/20'}
                  `}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-dark-surface p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-dark-surface">
              <form onSubmit={handleSend} className="relative">
                <input 
                  type="text" 
                  placeholder="Savolingizni yozing..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-white/5 rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm dark:text-white"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all disabled:opacity-50"
                >
                  <RiSendPlane2Line size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors
          ${isOpen ? 'bg-secondary text-white' : 'bg-primary text-white'}
        `}
      >
        {isOpen ? <RiCloseLine size={32} /> : <RiMessage3Line size={32} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-dark-bg ring-2 ring-primary/20">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatBot;
