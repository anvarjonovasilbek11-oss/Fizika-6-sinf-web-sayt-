import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { RiSunLine, RiMoonLine, RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const Navbar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-16 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
        >
          {collapsed ? <RiMenuUnfoldLine size={24} /> : <RiMenuFoldLine size={24} />}
        </button>
        <h2 className="text-xl font-heading text-slate-800 dark:text-white hidden md:block">
          Salom, <span className="text-primary">{user?.name}</span>!
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
        >
          {theme === 'light' ? <RiMoonLine size={22} /> : <RiSunLine size={22} />}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-300 capitalize">{user?.role === 'admin' ? 'Admin' : `${user?.class} o'quvchisi`}</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20"
          >
            {user?.name?.charAt(0)}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
