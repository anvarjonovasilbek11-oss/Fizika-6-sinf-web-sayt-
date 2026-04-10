import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RiVideoLine, RiBookReadLine, RiQuestionAnswerLine, RiDoubleQuotesL, RiUser3Line, RiFileTextLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { VIDEOS } from './VideoLessons';
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
      const tests = JSON.parse(localStorage.getItem('custom_tests') || '[]');
      const testCount = tests.length;

      // 5. Real Users (excluding passwords from calculation for safety)
      const usersData = JSON.parse(localStorage.getItem('users') || '[]');
      const userCount = usersData.length;

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

      <div className="text-center py-4">
        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-800 dark:text-white leading-tight">
          Fizika Olamiga Xush Kelibsiz!
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Saytning bugungi holati va umumiy statistikasi
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <ActionCard 
           icon={<RiVideoLine />} 
           count={counts.videos} 
           label="Video darslar" 
           description="Mavzuga oid videolar"
           color="bg-red-500"
           onClick={() => navigate('/videos')}
         />
         <ActionCard 
           icon={<RiBookReadLine />} 
           count={counts.lessons} 
           label="Nazariy darslar" 
           description="Kitobdagi barcha boblar"
           color="bg-primary"
           onClick={() => navigate('/textbook/bob-1/1')}
         />
         <ActionCard 
           icon={<RiFileTextLine />} 
           count={counts.materials} 
           label="O'quv qo'llanmalar" 
           description="PDF, Word va Zip fayllar"
           color="bg-amber-500"
           onClick={() => navigate('/materials')}
         />
         <ActionCard 
           icon={<RiUser3Line />} 
           count={counts.users} 
           label="Obunachilar" 
           description="Ro'yxatdan o'tganlar"
           color="bg-indigo-500"
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
  );
};

const ActionCard = ({ icon, count, label, description, color, onClick }) => (
  <motion.button
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick}
    className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white/50 dark:hover:bg-white/10 transition-colors border-primary/5 hover:border-primary/20"
  >
    <div className={`w-16 h-16 ${color} text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-${color.split('-')[1]}/30 mb-4 group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <div className="text-3xl font-black text-slate-800 dark:text-white mb-1">{count}</div>
    <div className="text-sm font-bold text-slate-900 dark:text-white mb-2">{label}</div>
    <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">{description}</div>
  </motion.button>
);

export default Home;
