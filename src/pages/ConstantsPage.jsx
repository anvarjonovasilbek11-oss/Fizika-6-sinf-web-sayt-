import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiSearchLine, 
  RiAddLine, 
  RiEditLine, 
  RiDeleteBin6Line, 
  RiCloseLine, 
  RiSave3Line 
} from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getConstants, saveConstant, deleteConstant } from '../services/constantService';
import toast from 'react-hot-toast';

const ConstantsPage = () => {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const isAdmin = user?.role === 'admin';
  
  const [constants, setConstants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentConstant, setCurrentConstant] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setConstants(getConstants());
  };

  const filteredConstants = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return constants.filter(c => {
      const name = (c[`name_${lang}`] || c.name_uz || '').toLowerCase();
      const symbol = (c.symbol || '').toLowerCase();
      return name.includes(term) || symbol.includes(term);
    });
  }, [constants, searchTerm, lang]);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: currentConstant?.id,
      name_uz: formData.get('name_uz'),
      name_ru: formData.get('name_ru'),
      name_en: formData.get('name_en'),
      symbol: formData.get('symbol'),
      value: formData.get('value'),
      unit: formData.get('unit'),
    };

    if (saveConstant(data)) {
      toast.success(t('ai_ready'));
      setShowModal(false);
      refreshData();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(t('constants_confirm_delete') || 'Are you sure?')) {
      if (deleteConstant(id)) {
        toast.success(t('quiz_toast_delete'));
        refreshData();
      }
    }
  };

  const openEdit = (c) => {
    setCurrentConstant(c);
    setShowModal(true);
  };

  const openAdd = () => {
    setCurrentConstant(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            {t('constants_title')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">
            Fizika olamidagi eng muhim doimiylar va o'lchov birliklari
          </p>
        </div>

        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAdd}
            className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/30"
          >
            <RiAddLine size={20} />
            {t('constants_add')}
          </motion.button>
        )}
      </header>

      {/* Search Bar */}
      <div className="relative group">
        <RiSearchLine className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
        <input 
          type="text"
          placeholder={t('constants_search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-16 pr-6 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-700 dark:text-white"
        />
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredConstants.map((c) => (
            <motion.div
              layout
              key={c.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-8 flex flex-col relative group overflow-hidden"
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(c)} className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                    <RiEditLine size={18} />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              )}

              <div className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4">
                {c.symbol}
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase leading-tight mb-2">
                {c[`name_${lang}`] || c.name_uz}
              </h3>
              
              <div className="mt-auto pt-6 flex flex-col gap-1 border-t border-slate-100 dark:border-white/5">
                <div className="text-2xl font-black text-slate-900 dark:text-primary tracking-tighter">
                  {c.value}
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  {c.unit}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CRUD Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-white dark:bg-[#0d1526] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10"
            >
              <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-primary/5">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                  {currentConstant ? t('constants_edit') : t('constants_add')}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-red-500 rounded-full transition-all">
                  <RiCloseLine size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('constants_name')} (UZ)</label>
                    <input name="name_uz" defaultValue={currentConstant?.name_uz} required className="premium-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('constants_name')} (RU)</label>
                    <input name="name_ru" defaultValue={currentConstant?.name_ru} required className="premium-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('constants_name')} (EN)</label>
                    <input name="name_en" defaultValue={currentConstant?.name_en} required className="premium-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('constants_symbol')}</label>
                    <input name="symbol" defaultValue={currentConstant?.symbol} required className="premium-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('constants_value')}</label>
                    <input name="value" defaultValue={currentConstant?.value} required className="premium-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('constants_unit')}</label>
                    <input name="unit" defaultValue={currentConstant?.unit} required className="premium-input" />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">
                    {t('constants_cancel')}
                  </button>
                  <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                    <RiSave3Line size={18} />
                    {t('constants_save')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConstantsPage;
