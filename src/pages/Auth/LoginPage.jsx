import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { RiApps2Line, RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { Atom, Sparkles } from 'lucide-react';
import { FaUserGraduate, FaUserShield } from 'react-icons/fa';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for bio if register if needed in AuthContext
    const result = login(username, password, isAdmin ? 'admin' : 'student', bio);
    if (result.success) {
      if (result.isNew) {
        toast.success(`${t('login_welcome')}, ${username}! ${t('login_welcome_new')}`);
      } else {
        toast.success(`${t('login_welcome')}, ${username}!`);
      }
      navigate('/home');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-[#070b14] flex items-center justify-center font-ui px-4 py-8 md:py-12 transition-colors duration-500 selection:bg-primary/20">
      {/* Professional Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-100">
        <div className="absolute inset-0 science-grid" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent dark:from-primary/[0.02]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-[480px] relative"
      >
        <div className="relative glass-card p-8 md:p-12 border-slate-200/60 dark:border-white/10 shadow-2xl bg-white/90 dark:bg-[#0d1526]/80 rounded-[2.5rem] flex flex-col">
          
          {/* Subtle Inner Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 dark:via-white/20 to-transparent" />

          <div className="text-center mb-10 shrink-0">
            <div className="inline-flex items-center justify-center p-5 bg-primary/10 rounded-[2rem] mb-6 text-primary border border-primary/10">
              <Atom size={44} className="animate-float-subtle" />
            </div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 uppercase drop-shadow-sm">
                {isRegister ? t('login_btn_register') : t('login_title')}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-bold tracking-wide uppercase opacity-80">{t('login_sub')}</p>
            </motion.div>
          </div>

          {/* Role Tab Switcher */}
          <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl mb-8 relative border border-slate-200 dark:border-white/5 shrink-0">
            <motion.div
              className="absolute h-[calc(100%-12px)] w-[calc(50%-6px)] bg-primary shadow-lg shadow-primary/20 rounded-xl z-0"
              animate={{ x: isAdmin ? '100%' : '0%' }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <button 
              onClick={() => { setIsAdmin(false); setUsername(''); setPassword(''); }}
              className={`relative z-10 flex-1 py-3 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 ${!isAdmin ? 'text-white font-black' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
            >
              <FaUserGraduate className={!isAdmin ? "scale-110" : ""} size={18} /> 
              <span className="uppercase text-[10px] font-black tracking-widest">{t('login_student')}</span>
            </button>
            <button 
              onClick={() => { setIsAdmin(true); setUsername(''); setPassword(''); }}
              className={`relative z-10 flex-1 py-3 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 ${isAdmin ? 'text-white font-black' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
            >
              <FaUserShield className={isAdmin ? "scale-110" : ""} size={18} /> 
              <span className="uppercase text-[10px] font-black tracking-widest">{t('login_admin')}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 flex-1">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-2 transition-colors">{t('login_name_label')}</label>
              <div className="relative group/input">
                <RiUserLine className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/60 dark:text-electric-blue/60 z-10 group-focus-within/input:text-primary dark:group-focus-within/input:text-electric-blue transition-colors" size={20} />
                <input 
                  type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-6 py-4 pl-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 dark:text-white font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm" 
                  placeholder={t('login_name_placeholder')} autoComplete="off" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-2 transition-colors">{t('login_pass_label')}</label>
              <div className="relative group/input">
                <RiLockPasswordLine className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/60 dark:text-electric-blue/60 z-10 group-focus-within/input:text-primary dark:group-focus-within/input:text-electric-blue transition-colors" size={20} />
                <input 
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 pl-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 dark:text-white font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm" 
                  placeholder={t('login_pass_placeholder')} autoComplete="off" 
                />
              </div>
            </div>

            <AnimatePresence>
              {isRegister && !isAdmin && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3 overflow-hidden pt-1"
                >
                  <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-2">{t('login_bio_label')}</label>
                  <div className="relative group/input">
                    <RiApps2Line className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/60 dark:text-electric-blue/60 z-10 group-focus-within/input:text-primary dark:group-focus-within/input:text-electric-blue transition-colors" size={20} />
                    <input 
                      type="text" value={bio} onChange={(e) => setBio(e.target.value)}
                      className="w-full px-6 py-4 pl-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 dark:text-white font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm" 
                      placeholder={t('login_bio_placeholder')} autoComplete="off" 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 rounded-2xl flex items-center justify-center gap-4 mt-6 bg-primary text-white shadow-xl shadow-primary/30 font-bold uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all"
            >
              <span>
                {isRegister ? t('login_btn_register') : t('login_btn')}
              </span>
            </motion.button>
          </form>

          <div className="mt-8 text-center shrink-0">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-[11px] font-black text-primary dark:text-electric-blue uppercase tracking-widest hover:underline transition-all py-2"
            >
              {isRegister ? t('login_toggle_existing') : t('login_toggle_new')}
            </button>
          </div>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-center mt-6 text-[9px] text-slate-500 dark:text-slate-500 uppercase tracking-[0.4em] font-black opacity-60 shrink-0">
            {t('login_footer')}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
