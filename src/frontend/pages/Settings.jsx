import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { RiUserLine, RiSettingsLine, RiMoonLine, RiSunLine, RiShieldLine, RiInformationLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    class: user?.class || '',
    password: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, update LocalStorage and state
    toast.success("Sozlamalar saqlandi!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 transition-colors">
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">Sozlamalar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Profile */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 md:p-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="flex items-center gap-5 mb-10">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl shadow-inner">
                <RiUserLine size={28} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Profil sozlamalari</h2>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 tracking-widest uppercase">Ism va familiya</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary dark:text-white font-bold transition-all shadow-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 tracking-widest uppercase">Username (O'zgartirib bo'lmaydi)</label>
                <input 
                  type="text" 
                  value={user?.username} 
                  disabled
                  className="w-full p-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 cursor-not-allowed font-bold"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 tracking-widest uppercase">Yosh</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full p-4 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary dark:text-white font-bold transition-all shadow-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 tracking-widest uppercase">Sinf</label>
                <input 
                  type="text" 
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full p-4 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary dark:text-white font-bold transition-all shadow-sm"
                />
              </div>
              <div className="md:col-span-2 pt-6">
                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  O'zgarishlarni saqlash
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: App Settings */}
        <div className="space-y-8">
          <div className="glass-card p-8 md:p-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="flex items-center gap-5 mb-10">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl shadow-inner">
                <RiSettingsLine size={28} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Ilova sozlamalari</h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Qorong'u rejim</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter">Ko'zni himoya qilish uchun</p>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`
                    w-16 h-9 rounded-full p-1.5 transition-all relative shadow-inner
                    ${theme === 'dark' ? 'bg-primary' : 'bg-slate-300'}
                  `}
                >
                  <motion.div 
                    animate={{ x: theme === 'dark' ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    {theme === 'dark' ? <RiMoonLine size={14} className="text-primary" /> : <RiSunLine size={14} className="text-amber-500" />}
                  </motion.div>
                </button>
              </div>

              <div className="pt-8 border-t border-slate-200 dark:border-white/10">
                <p className="text-xs font-black text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-widest">LOYIHA TILI</p>
                <select className="w-full p-4 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary dark:text-white font-bold transition-all shadow-sm">
                  <option>O'zbekcha</option>
                </select>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
              <RiInformationLine size={120} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
              <RiInformationLine className="text-primary" size={24} /> ILOVA HAQIDA
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-black uppercase tracking-[0.2em] relative z-10">
              <p>Talqin: <span className="text-primary">1.0.0</span></p>
              <p>© 2026 FizikaWorld Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
