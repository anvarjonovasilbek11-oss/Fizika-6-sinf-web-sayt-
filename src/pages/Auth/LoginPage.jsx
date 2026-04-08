import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RiAtomLine } from 'react-icons/ri';
import { FaUserGraduate, FaUserShield } from 'react-icons/fa';

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      toast.success("Xush kelibsiz!");
      navigate('/home');
    } else {
      toast.error(result.message);
    }
  };

  // Background particles animation
  const particles = Array.from({ length: 15 });

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-dark-bg flex items-center justify-center overflow-hidden font-ui">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0.1
            }}
            animate={{ 
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{ 
              duration: 20 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute text-primary/20 dark:text-accent/10 pointer-events-none"
            style={{ fontSize: 20 + Math.random() * 40 }}
          >
            {i % 3 === 0 ? <RiAtomLine /> : i % 3 === 1 ? "E=mc²" : "F=ma"}
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md p-8 mx-4 glass-card"
      >
        <div className="text-center mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="inline-block p-4 bg-primary/10 rounded-full mb-4 text-primary"
          >
            <RiAtomLine size={48} />
          </motion.div>
          <h1 className="text-3xl font-heading font-extrabold text-gradient">FizikaWorld 6</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Dunyoni fizika bilan kashf eting</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-200/50 dark:bg-dark-surface/50 p-1 rounded-xl mb-8 relative">
          <motion.div
            className="absolute h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white dark:bg-dark-card rounded-lg shadow-sm"
            animate={{ x: isAdmin ? '100%' : '0%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button 
            onClick={() => setIsAdmin(false)}
            className={`relative z-10 flex-1 py-2 flex items-center justify-center gap-2 rounded-lg transition-colors ${!isAdmin ? 'text-primary' : 'text-slate-500'}`}
          >
            <FaUserGraduate /> O'quvchi
          </button>
          <button 
            onClick={() => setIsAdmin(true)}
            className={`relative z-10 flex-1 py-2 flex items-center justify-center gap-2 rounded-lg transition-colors ${isAdmin ? 'text-primary' : 'text-slate-500'}`}
          >
            <FaUserShield /> Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 dark:bg-dark-surface/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
              placeholder={isAdmin ? "admin" : "ali"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Parol</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 dark:bg-dark-surface/50 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="••••••••"
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full btn-primary py-4 shadow-lg shadow-primary/30"
          >
            Kirish
          </motion.button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Login ma'lumotlari: {isAdmin ? "admin / admin123" : "ali / 1234"}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
