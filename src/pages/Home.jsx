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

  const dailyFacts = [
    "Yorug'lik tezligi sekundiga 300 000 km ni tashkil etadi.",
    "Fizika so'zi yunoncha 'physikos' – 'tabiat haqida' degan ma'noni anglatadi.",
    "Ovoz bo'shliqda (vakuumni) tarqalmaydi.",
    "Yerning tortishish kuchi bo'lmaganda, biz uchib ketgan bo'lardik.",
    "Eng kichik zarracha – bu kvarklardir.",
    "Suv 100 darajada qaynaydi, lekin tog' tepasida pastroq temperaturada ham qaynashi mumkin.",
    "Inson tanasi ham ozgina elektr energiyasi ishlab chiqaradi."
  ];

  const getDailyFact = () => {
    const day = new Date().getDate();
    return dailyFacts[day % dailyFacts.length];
  };

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
    <div className="space-y-12 pb-20 relative">
      {/* High-Tech Announcement Ticker */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-primary/10 overflow-hidden border-y border-primary/10 flex items-center z-20">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex items-center gap-12 text-xs font-black text-primary uppercase tracking-[0.2em]">
          <span>• Tizim yangilandi: Mobil versiya optimallashdi</span>
          <span>• Yangi AI testlar qo'shildi</span>
          <span>• Fizika 6-sinf darsliklari to'liq kiritildi</span>
          <span>• Sayt endi yanada tezroq ishlaydi</span>
        </div>
      </div>

      {/* High-Tech Anti-Gravity Hero Section */}
      <section className="relative min-h-[550px] flex flex-col items-center justify-center text-center p-8 overflow-hidden rounded-[40px] glass-card border-white/5 bg-[#0a1224]/40 mt-14 mb-12 science-grid">
        {/* Floating Interactive Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
           <div className="absolute top-0 left-0 w-full h-full bg-scan animate-scan opacity-10 pointer-events-none" 
                style={{ background: 'linear-gradient(to bottom, transparent, #00d2ff, transparent)', height: '10%' }} />
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
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
             <div className="absolute inset-0 border-4 border-dashed border-electric-blue/20 rounded-full animate-spin-slow" />
             <div className="absolute inset-4 border-2 border-dashed border-neon-purple/20 rounded-full animate-reverse-spin" />
             <RiBookReadLine size={80} className="text-white drop-shadow-[0_0_20px_rgba(0,210,255,0.8)]" />
          </div>
        </motion.div>

        <div className="relative z-20 max-w-4xl space-y-8 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-7xl font-heading font-black leading-tight tracking-tight">
              6-sinf Fizika <br />
              <span className="text-glow-blue text-white">Dunyosiga</span> <span className="text-glow-purple text-neon-purple italic">Xush Kelibsiz!</span>
            </h1>
          </motion.div>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto">
            Interaktiv tajribalar, AI testlar va video darslar orqali fizika olamini biz bilan kashf eting.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => navigate('/textbook/bob-1/1')} className="btn-hero-primary group">
              <RiBookReadLine size={24} className="group-hover:rotate-12 transition-transform" /> {t('btn_start')}
            </button>
            <button onClick={() => navigate('/tests')} className="btn-hero-secondary group">
              <RiQuestionAnswerLine size={24} className="group-hover:scale-110 transition-transform" /> {t('btn_test')}
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

        <div className="glass-card p-8 space-y-4 premium-glow">
          <h3 className="text-xl font-heading font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-3">
             <div className="w-2 h-8 bg-primary rounded-full" /> Kun Fakt
          </h3>
          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 italic text-lg text-slate-700 dark:text-slate-200 font-medium">
             "{getDailyFact()}"
          </div>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest text-right">— Bilasizmi?</p>
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
