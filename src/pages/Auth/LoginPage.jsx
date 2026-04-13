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
    const result = login(username, password, isAdmin ? 'admin' : 'student');
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
    <div className="relative min-h-screen w-full bg-light-bg dark:bg-space-dark flex items-center justify-center font-ui px-4 py-8 md:py-12 transition-colors duration-500 overflow-hidden">
      {/* Immersive Background Features */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-purple/20 dark:bg-neon-purple/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-electric-blue/20 dark:bg-electric-blue/10 blur-[150px] animate-pulse-glow animation-delay-2000" />
        <div className="absolute inset-0 bg-space-mesh opacity-30 dark:opacity-100" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-[480px] relative group"
      >
        {/* Animated Outer Border Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple rounded-[2.5rem] opacity-20 group-hover:opacity-40 blur-xl transition duration-1000 animate-gradient-slow"></div>
        
        <div className="relative glass-card p-6 md:p-10 backdrop-blur-3xl border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-2xl bg-white/70 dark:bg-space-dark/60 rounded-[2.5rem] max-h-[90vh] overflow-y-auto purple-scrollbar flex flex-col">
          
          {/* Subtle Inner Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 dark:via-white/20 to-transparent" />

          <div className="text-center mb-6 shrink-0">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 15 }}
              className="inline-flex items-center justify-center p-4 bg-primary/10 dark:bg-white/5 rounded-[2rem] mb-4 text-primary dark:text-electric-blue relative border border-primary/20 dark:border-white/10"
            >
              <div className="absolute inset-0 bg-primary/20 dark:bg-electric-blue/20 blur-2xl rounded-full animate-pulse" />
              <Atom size={44} className="relative z-10 drop-shadow-[0_0_10px_rgba(108,99,255,0.6)]" />
            </motion.div>
            
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
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(108,99,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 rounded-[1.5rem] flex items-center justify-center gap-4 mt-4 bg-primary text-white shadow-2xl shadow-primary/30 relative overflow-hidden group/btn font-black uppercase tracking-[0.3em] text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">
                {isRegister ? t('login_btn_register') : t('login_btn')}
              </span>
              <RiApps2Line size={24} className="relative z-10 group-hover/btn:rotate-90 transition-transform duration-500" />
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
