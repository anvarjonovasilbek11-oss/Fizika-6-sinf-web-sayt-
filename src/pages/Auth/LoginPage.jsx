import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import { RiApps2Line, RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { Atom, Sparkles } from 'lucide-react';
import { FaUserGraduate, FaUserShield } from 'react-icons/fa';

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-[#080B14] flex items-center justify-center overflow-hidden font-ui">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent/20 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md p-0 mx-4 relative group"
      >
        <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-accent to-secondary rounded-[26px] opacity-30 group-hover:opacity-100 blur-sm transition duration-1000 group-hover:duration-200 animate-gradient-shift"></div>
        
        <div className="relative bg-white/80 dark:bg-dark-card/80 backdrop-blur-2xl p-8 rounded-[24px] shadow-2xl border border-white/20 dark:border-white/5">
          <div className="text-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 180 }}
              className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-4 text-primary relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <Atom size={48} className="relative z-10" />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="text-3xl font-heading font-extrabold flex items-center justify-center gap-2 text-center">
                <span className="text-gradient">{t('login_title')}</span>
                <Sparkles size={20} className="text-accent animate-pulse" />
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">{t('login_sub')}</p>
            </motion.div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-100 dark:bg-[#151D2F] p-1.5 rounded-2xl mb-8 relative shadow-inner">
            <motion.div
              className="absolute h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white dark:bg-primary shadow-lg rounded-xl z-0"
              animate={{ x: isAdmin ? '100.5%' : '0%' }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />
            <button 
              onClick={() => { setIsAdmin(false); setUsername(''); setPassword(''); }}
              className={`relative z-10 flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${!isAdmin ? 'text-primary dark:text-white font-bold' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <FaUserGraduate className={!isAdmin ? "scale-110" : ""} /> 
              <span>{t('login_student')}</span>
            </button>
            <button 
              onClick={() => { setIsAdmin(true); setUsername(''); setPassword(''); }}
              className={`relative z-10 flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${isAdmin ? 'text-primary dark:text-white font-bold' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <FaUserShield className={isAdmin ? "scale-110" : ""} /> 
              <span>{t('login_admin')}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 ml-1">{t('login_name_label')}</label>
              <div className="relative">
                <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                  className="premium-input" placeholder={t('login_name_placeholder')} autoComplete="off" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 ml-1">{t('login_pass_label')}</label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="premium-input" placeholder={t('login_pass_placeholder')} autoComplete="off" />
              </div>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(108 99 255 / 0.3)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {t('login_btn')}
              <RiApps2Line />
            </motion.button>
          </form>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-center mt-8 text-xs text-slate-400 uppercase tracking-widest font-bold">
            {t('login_footer')}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
