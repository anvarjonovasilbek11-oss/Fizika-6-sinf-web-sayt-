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
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <h1 className="text-3xl font-heading text-gradient">Sozlamalar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <RiUserLine size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Profil sozlamalari</h2>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">Ism va familiya</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">Username (O'zgartirib bo'lmaydi)</label>
                <input 
                  type="text" 
                  value={user?.username} 
                  disabled
                  className="w-full p-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-400 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">Yosh</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full p-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">Sinf</label>
                <input 
                  type="text" 
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full p-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                />
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="btn-primary w-full md:w-auto">
                  O'zgarishlarni saqlash
                </button>
              </div>
            </form>
          </div>

          <div className="glass-card p-8 bg-red-50/50 dark:bg-red-500/5 border-red-100 dark:border-red-500/10">
            <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
              <RiShieldLine /> Xavfsizlik
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Parolni o'zgartirish yoki hisobni o'chirish.</p>
            <button className="px-6 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors bg-white dark:bg-transparent">
              Parolni yangilash
            </button>
          </div>
        </div>

        {/* Right Column: App Settings */}
        <div className="space-y-6">
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <RiSettingsLine size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Ilova sozlamalari</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">Qorong'u rejim</p>
                  <p className="text-xs text-slate-500">Ko'zni himoya qilish uchun</p>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`
                    w-14 h-8 rounded-full p-1 transition-colors relative
                    ${theme === 'dark' ? 'bg-primary' : 'bg-slate-300'}
                  `}
                >
                  <motion.div 
                    animate={{ x: theme === 'dark' ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                  >
                    {theme === 'dark' ? <RiMoonLine size={14} className="text-primary" /> : <RiSunLine size={14} className="text-amber-500" />}
                  </motion.div>
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                <p className="text-sm font-bold text-slate-800 dark:text-white mb-2">Til</p>
                <select className="w-full p-3 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl outline-none dark:text-white">
                  <option>Uzbek (Lotin)</option>
                  <option disabled>Uzbek (Kirill) - Tez kunda</option>
                  <option disabled>English - Tez kunda</option>
                </select>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <RiInformationLine className="text-primary" /> Ilova haqida
            </h3>
            <div className="space-y-2 text-sm text-slate-500">
              <p>Talqin: 1.0.0</p>
              <p>Dasturchi: Antigravity AI</p>
              <p>© 2026 FizikaWorld Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
