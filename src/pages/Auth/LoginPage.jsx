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
    <div className="relative min-h-[100dvh] w-full bg-space-dark flex flex-col items-center overflow-y-auto font-ui bg-space-mesh px-4 py-8 sm:py-20 no-scrollbar">
      {/* Immersive Space Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-electric-blue/10 blur-[150px] animate-pulse-glow animation-delay-2000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-lg relative group my-auto"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple rounded-[32px] opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative glass-card p-8 md:p-12 backdrop-blur-3xl border-white/10 shadow-2xl overflow-visible bg-space-dark/40 rounded-[2.5rem]">
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="text-center mb-12">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 15 }}
              className="inline-flex items-center justify-center p-6 bg-white/5 rounded-3xl mb-8 text-electric-blue relative border border-white/10"
            >
              <div className="absolute inset-0 bg-electric-blue/20 blur-2xl rounded-full animate-pulse" />
              <Atom size={64} className="relative z-10 drop-shadow-[0_0_15px_rgba(0,210,255,0.6)]" />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4 uppercase">
                {isRegister ? t('login_btn_register') : t('login_title')}
              </h1>
              <p className="text-slate-400 font-medium tracking-wide">{t('login_sub')}</p>
            </motion.div>
          </div>

          {/* Role Tab Switcher (Visible only in Login mode or for both) */}
          <div className="flex bg-white/5 p-2 rounded-2xl mb-12 relative border border-white/5">
            <motion.div
              className="absolute h-[calc(100%-16px)] w-[calc(50%-8px)] bg-gradient-to-r from-neon-purple to-neon-purple/80 shadow-[0_0_20px_rgba(188,19,254,0.4)] rounded-xl z-0"
              animate={{ x: isAdmin ? '100%' : '0%' }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <button 
              onClick={() => { setIsAdmin(false); setUsername(''); setPassword(''); }}
              className={`relative z-10 flex-1 py-3 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 ${!isAdmin ? 'text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FaUserGraduate className={!isAdmin ? "scale-110" : ""} size={20} /> 
              <span className="uppercase text-[10px] font-black tracking-widest">{t('login_student')}</span>
            </button>
            <button 
              onClick={() => { setIsAdmin(true); setUsername(''); setPassword(''); }}
              className={`relative z-10 flex-1 py-3 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 ${isAdmin ? 'text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FaUserShield className={isAdmin ? "scale-110" : ""} size={20} /> 
              <span className="uppercase text-[10px] font-black tracking-widest">{t('login_admin')}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t('login_name_label')}</label>
              <div className="relative group/input">
                <RiUserLine className="absolute left-6 top-1/2 -translate-y-1/2 text-electric-blue/60 z-10 group-focus-within/input:text-electric-blue transition-colors" size={20} />
                <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                  className="premium-input bg-white/5 border-white/10 hover:border-white/20 pl-16 py-5 focus:ring-primary/20" placeholder={t('login_name_placeholder')} autoComplete="off" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t('login_pass_label')}</label>
              <div className="relative group/input">
                <RiLockPasswordLine className="absolute left-6 top-1/2 -translate-y-1/2 text-electric-blue/60 z-10 group-focus-within/input:text-electric-blue transition-colors" size={20} />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="premium-input bg-white/5 border-white/10 hover:border-white/20 pl-16 py-5 focus:ring-primary/20" placeholder={t('login_pass_placeholder')} autoComplete="off" />
              </div>
            </div>

            <AnimatePresence>
              {isRegister && !isAdmin && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden pt-2"
                >
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t('login_bio_label')}</label>
                  <div className="relative group/input">
                    <RiApps2Line className="absolute left-6 top-1/2 -translate-y-1/2 text-electric-blue/60 z-10 group-focus-within/input:text-electric-blue transition-colors" size={20} />
                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)}
                      className="premium-input bg-white/5 border-white/10 hover:border-white/20 pl-16 py-5 focus:ring-primary/20" placeholder={t('login_bio_placeholder')} autoComplete="off" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,210,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-hero-primary py-6 rounded-[1.5rem] flex items-center justify-center gap-4 mt-4 bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient-slow shadow-2xl relative overflow-hidden group/btn"
            >
              <span className="uppercase tracking-[0.3em] font-black text-sm relative z-10">
                {isRegister ? t('login_btn_register') : t('login_btn')}
              </span>
              <RiApps2Line size={24} className="relative z-10 group-hover/btn:rotate-90 transition-transform duration-500" />
            </motion.button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-[11px] font-black text-electric-blue uppercase tracking-widest hover:text-white transition-colors py-2"
            >
              {isRegister ? t('login_toggle_existing') : t('login_toggle_new')}
            </button>
          </div>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-center mt-12 text-[9px] text-slate-500 uppercase tracking-[0.5em] font-black opacity-50">
            {t('login_footer')}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
