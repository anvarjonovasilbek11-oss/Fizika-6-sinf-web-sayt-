import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { RiSunLine, RiMoonLine, RiMenuFoldLine, RiMenuUnfoldLine, RiArrowDownSLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const FLAG = { uz: '🇺🇿', ru: '🇷🇺', en: '🇬🇧' };

const Navbar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, changeLang, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const langs = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский',   flag: '🇷🇺' },
    { code: 'en', label: 'English',   flag: '🇬🇧' },
  ];

  const handleMenuToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const isMenuClosed = typeof window !== 'undefined' && window.innerWidth < 768 ? !mobileOpen : collapsed;

  return (
    <nav className={`
      h-16 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-space-dark/90 backdrop-blur-md 
      flex items-center justify-between px-4 md:px-6 fixed top-0 left-0 right-0 z-40 transition-all duration-300
      ${collapsed ? 'md:left-[80px]' : 'md:left-[300px]'}
    `}>
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={handleMenuToggle}
          className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
        >
          {isMenuClosed ? <RiMenuUnfoldLine size={24} /> : <RiMenuFoldLine size={24} />}
        </button>
        <h2 className="text-xl font-heading text-slate-800 dark:text-white hidden md:block">
          {t('greeting')}, <span className="text-primary">{user?.name}</span>!
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
        >
          {theme === 'light' ? <RiMoonLine size={22} /> : <RiSunLine size={22} />}
        </button>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-200 font-bold text-sm"
          >
            <span className="text-lg">{FLAG[lang]}</span>
            <span className="hidden sm:block">{lang.toUpperCase()}</span>
            <span>
              <RiArrowDownSLine size={16} className={langOpen ? 'rotate-180' : ''} />
            </span>
          </button>

          {langOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
            >
              {langs.map(l => (
                <button
                  key={l.code}
                  onClick={() => { changeLang(l.code); setLangOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all hover:bg-primary/10 hover:text-primary
                    ${lang === l.code ? 'bg-primary/10 text-primary' : 'text-slate-700 dark:text-slate-200'}`}
                >
                  <span className="text-xl">{l.flag}</span>
                  {l.label}
                  {lang === l.code && <span className="ml-auto w-2 h-2 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              {user?.role === 'admin' ? t('role_admin') : t('role_user')}
            </p>
          </div>
          <div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20"
          >
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
