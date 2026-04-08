import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiVideoLine, RiBookReadLine, RiQuestionAnswerLine, RiDoubleQuotesL } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';

const StatsCard = ({ icon, label, count, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 flex items-center gap-6"
  >
    <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-2xl`}>
      {icon}
    </div>
    <div>
      <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white">{count}</h3>
      <p className="text-slate-500 dark:text-slate-300 font-medium">{label}</p>
    </div>
  </motion.div>
);

const Home = () => {
  const { user } = useAuth();
  const [quoteIdx, setQuoteIdx] = useState(0);

  const quotes = [
    { text: "Fizika – bu tabiatning tili.", author: "Richard Feynman" },
    { text: "Tasavvur bilimdan muhimroqdir.", author: "Albert Einstein" },
    { text: "Menga tayanch nuqtasini bering, men Yer yuzini qimirlataman.", author: "Arximed" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 md:p-12 text-white shadow-2xl shadow-primary/20">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-heading font-extrabold leading-tight"
          >
            6-sinf Fizika Dunyosiga <br /> Xush Kelibsiz!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-white/80"
          >
            Bugun nimani o'rganamiz? Mexanika, issiqlik yoki elektr toki? Tanlov sizda!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex gap-4"
          >
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg">
              Darsni boshlash
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors">
              Test yechish
            </button>
          </motion.div>
        </div>
        
        {/* Animated Background Decor */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl p-20 border-[40px] border-white/5"
        />
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          icon={<RiVideoLine />} 
          label="Video darslar" 
          count="120+" 
          color="text-primary bg-primary" 
        />
        <StatsCard 
          icon={<RiBookReadLine />} 
          label="Qo'llanmalar" 
          count="45+" 
          color="text-secondary bg-secondary" 
        />
        <StatsCard 
          icon={<RiQuestionAnswerLine />} 
          label="Test savollari" 
          count="300+" 
          color="text-accent bg-accent" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quote Carousel */}
        <div className="glass-card p-8 flex flex-col justify-center min-h-[200px]">
          <RiDoubleQuotesL className="text-4xl text-primary/30 mb-4" />
          <motion.div
            key={quoteIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <p className="text-xl italic font-medium text-slate-800 dark:text-white">
              "{quotes[quoteIdx].text}"
            </p>
            <p className="mt-4 text-primary font-bold">— {quotes[quoteIdx].author}</p>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <div className="glass-card p-8 space-y-4">
          <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-white">Sayt imkoniyatlari</h3>
          <ul className="space-y-3">
            {[
              "📚 Eng so'nggi darsliklar va materiallar",
              "🤖 Sun'iy intellekt orqali test generatori",
              "🎥 Interaktiv video darslar to'plami",
              "🌓 Qulay qorong'u rejim (Dark Mode)"
            ].map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-slate-600 dark:text-slate-200"
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
