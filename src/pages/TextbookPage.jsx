import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiArrowLeftLine, RiBookOpenLine, RiInformationLine } from 'react-icons/ri';
import { TEXTBOOK_DATA } from '../data/textbookData';

const TextbookPage = () => {
  const { chapterId, lessonId } = useParams();
  const navigate = useNavigate();

  const chapter = TEXTBOOK_DATA.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  if (!chapter || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <RiInformationLine size={64} className="text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold dark:text-white">Dars topilmadi</h1>
        <button 
          onClick={() => navigate('/home')}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-xl"
        >
          Asosiy sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-12"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-primary transition-all"
        >
          <RiArrowLeftLine size={24} />
        </button>
        <div>
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest">{chapter.title}</h2>
          <h1 className="text-3xl font-heading font-extrabold text-slate-800 dark:text-white">{lesson.title}</h1>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="glass-card p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <RiBookOpenLine size={40} />
        </div>
        <div>
          <h3 className="text-xl font-bold dark:text-white mb-2">Mavzu mazmuni tayyorlanmoqda</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Hozirda darslikdagi matnlar tizimga yuklanmoqda. Tez orada ushbu mavzu bo'yicha to'liq ma'lumot shu yerda paydo bo'ladi.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-8">
          <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
            <h4 className="font-bold dark:text-white mb-1">Nazariy qism</h4>
            <p className="text-sm text-slate-400 italic">Tez kunda...</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
            <h4 className="font-bold dark:text-white mb-1">Tajribalar</h4>
            <p className="text-sm text-slate-400 italic">Tez kunda...</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TextbookPage;
