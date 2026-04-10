import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowLeftLine, RiBookOpenLine, RiInformationLine } from 'react-icons/ri';
import { TEXTBOOK_DATA } from '../data/textbookData';
import { useLanguage } from '../context/LanguageContext';

const TextbookPage = () => {
  const { chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const chapter = TEXTBOOK_DATA.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  const [activeTab, setActiveTab] = React.useState('theory');

  if (!chapter || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <RiInformationLine size={64} className="text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold dark:text-white">{t('textbook_not_found')}</h1>
        <button onClick={() => navigate('/home')} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl">
          {t('textbook_back')}
        </button>
      </div>
    );
  }

  const content = lesson.content || {
    theory: "Bu mavzu bo'yicha nazariy ma'lumotlar tayyorlanmoqda. Tez orada ushbu bo'lim to'ldiriladi.",
    formulas: "Tez kunda...",
    experiments: "Bu mavzu bo'yicha tajribalar metodikasi tayyorlanmoqda."
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-12 px-4"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <button 
          onClick={() => navigate(-1)}
          className="w-fit p-3 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-primary transition-all shadow-sm"
        >
          <RiArrowLeftLine size={24} />
        </button>
        <div>
          <h2 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-1">{chapter.title}</h2>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-800 dark:text-white leading-tight">{lesson.title}</h1>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl w-fit border border-slate-200 dark:border-white/10">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'theory' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-md' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          <RiBookOpenLine size={20} />
          {t('textbook_theory')}
        </button>
        <button
          onClick={() => setActiveTab('experiments')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'experiments' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-md' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          <RiInformationLine size={20} />
          {t('textbook_experiments')}
        </button>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {activeTab === 'theory' ? (
            <div className="p-8 md:p-12 space-y-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                  {content.theory}
                </p>
              </div>
              
              <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg font-black text-xs uppercase tracking-widest">{t('textbook_formulas')}</div>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5 font-mono text-primary dark:text-accent-light">
                  {content.formulas}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12 space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                  <RiInformationLine size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{t('textbook_experiment_guide')}</h3>
                  <p className="text-sm text-slate-500">{t('textbook_experiment_sub')}</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200 italic">
                  "{content.experiments}"
                </p>
              </div>
              <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 text-secondary-dark dark:text-secondary text-sm font-medium">
                {t('textbook_warning')}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TextbookPage;
