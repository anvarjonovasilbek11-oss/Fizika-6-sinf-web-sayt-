import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { RiBookReadFill, RiArrowRightSLine, RiArrowLeftSLine, RiPulseLine, RiEyeOffLine, RiCheckLine, RiShieldLine } from 'react-icons/ri';
import { getCombinedTextbooks, unhideLesson } from '../../backend/services/textbookService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const TextbookSelection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [textbooks, setTextbooks] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    setTextbooks(getCombinedTextbooks(isAdmin));
  }, [isAdmin]);

  const handleUnhide = (e, lessonId) => {
    e.stopPropagation();
    unhideLesson(lessonId);
    toast.success("Mavzu qayta tasdiqlandi!");
    setTextbooks(getCombinedTextbooks(isAdmin));
  };

  const hiddenLessons = textbooks.flatMap(c => 
    c.lessons.filter(l => l.isHidden).map(l => ({ ...l, chapterId: c.id, chapterTitle: c.title }))
  );

  return (
    <div className="min-h-[calc(100vh-120px)] space-y-12 pb-20 transition-colors">
      {/* ... (Header Section same) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            {t('nav_textbook')} <span className="text-slate-600 dark:text-slate-400 text-2xl font-bold ml-2 tracking-widest">ARXIV</span>
          </h1>
          <p className="text-slate-700 dark:text-slate-300 mt-2 font-black tracking-wide uppercase text-xs">
            Fizika darsliklari va nazariy materiallar kutubxonasi
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 px-6 py-3 rounded-2xl shadow-sm dark:shadow-none">
          <RiPulseLine className="text-neon-purple animate-pulse" size={24} />
          <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-widest">{textbooks.length} ta Bob jami mahsulot</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Side: Chapter List same... */}
        <div className="xl:col-span-4 space-y-4">
          <h2 className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 tracking-[0.3em] mb-6 px-2 opacity-80">BOBLARNI TANLANING</h2>
          <div className="grid grid-cols-1 gap-3">
            {textbooks.map((chapter, idx) => (
              <motion.button
                key={chapter.id}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChapter(chapter)}
                className={`
                  text-left p-6 rounded-[24px] border transition-all duration-500 group relative overflow-hidden
                  ${selectedChapter?.id === chapter.id 
                    ? 'bg-gradient-to-r from-neon-purple/20 dark:from-neon-purple/20 to-transparent border-neon-purple shadow-[0_0_30px_rgba(188,19,254,0.1)]' 
                    : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-200 dark:hover:border-white/20 shadow-sm dark:shadow-none'}
                `}
              >
                {/* ... (Selected Chapter Glow) */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedChapter?.id === chapter.id ? 'text-neon-purple' : 'text-slate-600 dark:text-slate-400'}`}>
                      BOB {idx + 1}
                    </span>
                    <span className={`text-sm font-black uppercase tracking-tight ${selectedChapter?.id === chapter.id ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                      {chapter.title}
                    </span>
                  </div>
                  <RiArrowRightSLine 
                    className={`transition-transform duration-500 ${selectedChapter?.id === chapter.id ? 'translate-x-2 text-neon-purple' : 'text-slate-500 group-hover:translate-x-1'}`} 
                    size={24} 
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side: Lesson Grid */}
        <div className="xl:col-span-8">
          <AnimatePresence mode="wait">
            {selectedChapter ? (
              <motion.div
                key={selectedChapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    {selectedChapter.title} <span className="text-neon-purple">MAVZULARI</span>
                  </h2>
                  <span className="px-4 py-1 bg-neon-purple/10 text-neon-purple text-[10px] font-black uppercase rounded-lg border border-neon-purple/20 tracking-widest">
                    {selectedChapter.lessons.length} TA MAVZU
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedChapter.lessons.map((lesson, lIdx) => (
                    <motion.div
                      key={lesson.id}
                      whileHover={{ y: -10 }}
                      className={`glass-card bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 group cursor-pointer relative overflow-hidden shadow-lg hover:shadow-2xl transition-all ${lesson.isHidden ? 'border-red-500/30 bg-red-500/5' : ''}`}
                      onClick={() => navigate(`/textbook/${selectedChapter.id}/${lesson.id}`)}
                    >
                      {lesson.isHidden && (
                        <div className="absolute top-2 left-2 px-3 py-1 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full z-20">
                           YASHIRILGAN
                        </div>
                      )}
                      
                      <div className="p-8 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple font-black text-xs">
                            {lIdx + 1}
                          </span>
                          <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-500 tracking-widest">Darslik №{lesson.id}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-neon-purple transition-colors line-clamp-2">
                          {t(`lesson_${lesson.id}`) !== `lesson_${lesson.id}` ? t(`lesson_${lesson.id}`) : lesson.title}
                        </h3>
                        
                        <div className="pt-4 flex items-center gap-2 text-xs font-black uppercase text-slate-600 dark:text-slate-400 tracking-[0.2em] group-hover:text-primary dark:group-hover:text-white transition-colors">
                          O'qishni boshlash <RiArrowRightSLine />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-20 glass-card bg-white dark:bg-white/5 border-dashed border-slate-300 dark:border-white/5 opacity-50 shadow-inner"
              >
                <RiBookReadFill className="text-slate-400 dark:text-slate-700 mb-6" size={80} />
                <h3 className="text-2xl font-black text-slate-700 dark:text-slate-500 uppercase tracking-tighter">
                  Mavzularni ko'rish uchun <br/> boblardan birini tanlang
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isAdmin && hiddenLessons.length > 0 && (
        <section className="space-y-10 pt-10 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-5">
            <div className="p-5 bg-red-500 text-white rounded-3xl shadow-xl shadow-red-500/30">
              <RiShieldLine size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-none uppercase tracking-tighter">Yashirilgan Mavzular</h2>
              <p className="text-red-600 dark:text-red-500 font-black text-lg mt-2 uppercase tracking-widest">Ushbu darslar o'quvchilarga ko'rinmaydi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hiddenLessons.map((l) => (
              <div key={l.id} className="glass-card p-10 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all flex flex-col justify-between shadow-lg">
                <div>
                  <span className="text-[10px] font-black uppercase text-red-500 tracking-widest mb-2 block">{l.chapterTitle}</span>
                  <h4 className="text-2xl font-black mb-4 leading-tight text-slate-900 dark:text-white uppercase tracking-tight">{l.title}</h4>
                </div>
                <div className="mt-10">
                  <button 
                    onClick={(e) => handleUnhide(e, l.id)}
                    className="w-full py-4 bg-green-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-600/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <RiCheckLine size={20} /> Tasdiqlash (Ko'rsatish)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TextbookSelection;
