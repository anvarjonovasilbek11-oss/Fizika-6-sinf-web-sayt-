import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RiVideoLine, RiBookReadLine, RiQuestionAnswerLine, RiDoubleQuotesL } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { VIDEOS } from './VideoLessons';

// StatsCards removed due to in-place architecture requested by user

const Home = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const [quoteIdx, setQuoteIdx] = useState(0);

  const quotes = [
    { text: "Fizika – bu tabiatning tili.", author: "Richard Feynman" },
    { text: "Tasavvur bilimdan muhimroqdir.", author: "Albert Einstein" },
    { text: "Menga tayanch nuqtasini bering, men Yer yuzini qimirlataman.", author: "Arximed" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setQuoteIdx(p => (p + 1) % quotes.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 md:p-12 text-white shadow-2xl shadow-primary/20">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-heading font-extrabold leading-tight">
            {t('hero_title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-white/80">
            {t('hero_sub')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/textbook/bob-1/1')}
              className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg w-full sm:w-auto">
              {t('btn_start')}
            </button>
            <button onClick={() => navigate('/tests')}
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors w-full sm:w-auto">
              {t('btn_test')}
            </button>
          </motion.div>
        </div>
        <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl p-20 border-[40px] border-white/5" />
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-heading font-black text-slate-800 dark:text-white leading-tight">
            {isAdmin ? `Salom, ${user?.name || 'Asilbek'}!` : `Salom, ${user?.name || 'Talaba'}!`}
          </h2>
          <p className="text-slate-500 dark:text-slate-300 mt-2 font-medium max-w-xl">
            {isAdmin 
              ? 'Siz admin darajasidasiz. Barcha bo\'limlarda ma\'lumotlarni tahrirlash va o\'chirish huquqiga egasiz.' 
              : 'Bugun fizika olamidan qanday yangi bilimlarni egallashni istaysiz?'}
          </p>
        </div>
        <div className="flex-shrink-0">
           <div className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/20">
             {isAdmin ? "ADMIN MODE" : "STUDENT MODE"}
           </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 flex flex-col justify-center min-h-[200px]">
          <RiDoubleQuotesL className="text-4xl text-primary/30 mb-4" />
          <motion.div key={quoteIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="text-xl italic font-medium text-slate-800 dark:text-white">"{quotes[quoteIdx].text}"</p>
            <p className="mt-4 text-primary font-bold">— {quotes[quoteIdx].author}</p>
          </motion.div>
        </div>

        <div className="glass-card p-8 space-y-4">
          <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-white">{t('site_features')}</h3>
          <ul className="space-y-3">
            {[t('feature_1'), t('feature_2'), t('feature_3'), t('feature_4')].map((feature, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-slate-600 dark:text-slate-200">
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
