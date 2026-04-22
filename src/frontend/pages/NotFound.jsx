import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiAlertLine, RiHome4Line } from 'react-icons/ri';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center"
    >
      <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-red-500/20">
        <RiAlertLine size={48} />
      </div>
      <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-800 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-600 dark:text-slate-300 mb-2">
        {t('not_found_title')}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
        {t('not_found_desc')}
      </p>
      <button 
        onClick={() => navigate('/')}
        className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/30"
      >
        <RiHome4Line size={24} /> {t('not_found_back')}
      </button>
    </motion.div>
  );
};

export default NotFound;
