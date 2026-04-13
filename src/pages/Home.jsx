import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RiVideoLine, RiBookReadLine, RiQuestionAnswerLine, RiDoubleQuotesL, RiUser3Line, RiFileTextLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { VIDEOS } from '../data/videoData';
import { getCombinedTextbooks } from '../services/textbookService';
import localforage from 'localforage';

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

  const [counts, setCounts] = useState({
    videos: 0,
    lessons: 0,
    materials: 0,
    tests: 0,
    users: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      // 1. Lessons
      const books = getCombinedTextbooks();
      const lessonCount = books.reduce((acc, curr) => acc + curr.lessons.length, 0);

      // 2. Videos
      const savedVideos = JSON.parse(localStorage.getItem('customVideos') || '[]');
      const videoCount = VIDEOS.length + savedVideos.length;

      // 3. Materials
      const materials = await localforage.getItem('physics_files') || [];
      const materialCount = materials.length;

      // 4. Tests
      let testCount = 0;
      try {
        const tests = JSON.parse(localStorage.getItem('custom_tests') || '[]');
        testCount = Array.isArray(tests) ? tests.length : 0;
      } catch (e) {
        testCount = 0;
      }

      // 5. Real Users
      let userCount = 0;
      try {
        const usersData = JSON.parse(localStorage.getItem('users') || '[]');
        userCount = Array.isArray(usersData) ? usersData.length : 0;
      } catch (e) {
        userCount = 0;
      }

      setCounts({
        lessons: lessonCount,
        videos: videoCount,
        materials: materialCount,
        tests: testCount,
        users: userCount
      });
    };

    fetchData();
    const timer = setInterval(() => setQuoteIdx(p => (p + 1) % quotes.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
    <div className="space-y-12 pb-20">
      {/* High-Tech Anti-Gravity Hero Section */}
      <section className="relative min-h-[500px] flex flex-col items-center justify-center text-center p-8 overflow-hidden rounded-[40px] glass-card border-white/5 bg-white/5 mb-12">
        {/* Floating Interactive Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <motion.div 
             animate={{ 
               y: [0, -30, 0],
               rotate: [0, 5, 0]
             }} 
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/20 blur-[100px] rounded-full"
           />
           <motion.div 
             animate={{ 
               y: [0, 40, 0],
               rotate: [0, -10, 0]
             }} 
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-electric-blue/20 blur-[120px] rounded-full"
           />
        </div>

        {/* The Central Floating Atom/Scene */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 mb-12 group cursor-pointer"
        >
          <div className="absolute inset-0 bg-electric-blue/30 blur-3xl rounded-full scale-75 group-hover:scale-110 transition-transform duration-700" />
          <svg width="240" height="240" viewBox="0 0 200 200" className="relative drop-shadow-[0_0_20px_rgba(0,210,255,0.8)]">
             <motion.circle cx="100" cy="100" r="15" fill="#fff" className="animate-pulse" />
             <motion.ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#bc13fe" strokeWidth="2" strokeDasharray="10 5" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
             <motion.ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="#00d2ff" strokeWidth="2" strokeDasharray="10 5" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
             <motion.ellipse cx="100" cy="100" rx="60" ry="60" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.2" animate={{ rotate: 180 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
          </svg>
        </motion.div>

        <div className="relative z-20 max-w-4xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight tracking-tight">
              6-sinf Fizika <br />
              <span className="text-glow-blue text-white">Dunyosiga</span> <span className="text-glow-purple text-neon-purple italic">Xush Kelibsiz!</span>
            </h1>
          </motion.div>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto">
            {t('hero_sub')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => navigate('/textbook/bob-1/1')} className="btn-hero-primary">
              <RiBookReadLine size={24} /> {t('btn_start')}
            </button>
            <button onClick={() => navigate('/tests')} className="btn-hero-secondary">
              <RiQuestionAnswerLine size={24} /> {t('btn_test')}
            </button>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         <ActionCard 
           icon={<RiVideoLine />} 
           count={counts.videos} 
           label="Video darslar" 
           description="Mavzuga oid videolar"
           accentColor="text-red-500"
           glowColor="group-hover:shadow-red-500/20"
           onClick={() => navigate('/videos')}
         />
         <ActionCard 
           icon={<RiBookReadLine />} 
           count={counts.lessons} 
           label="Nazariy darslar" 
           description="Kitobdagi barcha boblar"
           accentColor="text-electric-blue"
           glowColor="group-hover:shadow-electric-blue/20"
           onClick={() => navigate('/textbook/bob-1/1')}
         />
         <ActionCard 
           icon={<RiFileTextLine />} 
           count={counts.materials} 
           label="O'quv qo'llanmalar" 
           description="PDF, Word va Zip fayllar"
           accentColor="text-amber-500"
           glowColor="group-hover:shadow-amber-500/20"
           onClick={() => navigate('/materials')}
         />
         <ActionCard 
           icon={<RiUser3Line />} 
           count={counts.users} 
           label="Obunachilar" 
           description="Ro'yxatdan o'tganlar"
           accentColor="text-neon-purple"
           glowColor="group-hover:shadow-neon-purple/20"
           onClick={() => {}}
         />
      </div>

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
    </div>
  );
};

const ActionCard = ({ icon, count, label, description, accentColor, glowColor, onClick }) => (
  <motion.button
    whileHover={{ y: -12, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick}
    className={`glass-card p-8 flex flex-col items-center text-center group transition-all duration-500 border-white/5 hover:border-white/20 hover:bg-white/10 ${glowColor} shadow-2xl`}
  >
    <div className={`w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${accentColor}`}>
      {React.cloneElement(icon, { size: 40 })}
    </div>
    <div className="text-4xl font-black text-white mb-2 tracking-tighter">{count}</div>
    <div className="text-sm font-black text-white/90 mb-2 uppercase tracking-widest">{label}</div>
    <div className="text-xs font-medium text-slate-500 uppercase tracking-tighter leading-relaxed">{description}</div>
    
    <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-current to-transparent ${accentColor}`} />
  </motion.button>
);

export default Home;
