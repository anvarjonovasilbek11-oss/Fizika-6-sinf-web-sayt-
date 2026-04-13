import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  RiDashboardLine, 
  RiVideoLine, 
  RiBookOpenLine, 
  RiRobotLine, 
  RiSettings4Line, 
  RiLogoutBoxRLine,
  RiArrowDownSLine, 
  RiBook3Line, 
  RiCloseLine, 
  RiArrowLeftSLine, 
  RiSave3Line, 
  RiAddLine,
  RiPulseLine
} from 'react-icons/ri';
import { getCombinedTextbooks, saveCustomLesson } from '../../services/textbookService';
import toast from 'react-hot-toast';

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [openDarslik, setOpenDarslik] = React.useState(false);
  const [activeChapter, setActiveChapter] = React.useState(null);
  const [textbooks, setTextbooks] = React.useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  
  const [newLesson, setNewLesson] = React.useState({ chapterId: 'bob-1', title: '', theory: '' });

  const isAdmin = user?.role === 'admin';
  const isExpanded = !collapsed;

  const refreshTextbooks = React.useCallback(() => {
    setTextbooks(getCombinedTextbooks());
  }, []);

  React.useEffect(() => {
    refreshTextbooks();
    window.addEventListener('storage', refreshTextbooks);
    return () => window.removeEventListener('storage', refreshTextbooks);
  }, [refreshTextbooks]);

  const handleChapterClick = (chapterId) => {
    setActiveChapter(activeChapter === chapterId ? null : chapterId);
  };

  const handleMainItemClick = (path) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setCollapsed(true);
      if (setMobileOpen) setMobileOpen(false);
    }
  };

  const hoverEffect = "active:scale-95 group-hover:text-white transition-colors";

  const menuItems = [
    { name: t('nav_home'),      icon: <RiDashboardLine size={24} className={hoverEffect} />, path: "/home" },
    { name: t('nav_textbook'),  icon: <RiBook3Line size={24} className={hoverEffect} />,     path: "/darslik" },
    { name: t('nav_videos'),    icon: <RiVideoLine size={24} className={hoverEffect} />,     path: "/videos" },
    { name: t('nav_materials'), icon: <RiBookOpenLine size={24} className={hoverEffect} />,  path: "/materials" },
    { name: t('nav_tests'),     icon: <RiRobotLine size={24} className={hoverEffect} />,     path: "/tests" },
    { name: t('nav_settings'),  icon: <RiSettings4Line size={24} className={hoverEffect} />, path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 bg-white dark:bg-[#0a0f1d]/95 backdrop-blur-3xl
        border-r border-slate-200 dark:border-white/5 shadow-2xl flex flex-col overflow-hidden
        transition-all duration-500 ease-in-out
        ${mobileOpen 
          ? 'translate-x-0 w-[280px] sm:w-[300px]' 
          : '-translate-x-full md:translate-x-0'}
        ${isExpanded ? 'md:w-[300px]' : 'md:w-[80px]'}
      `}
      style={{ height: '100dvh' }}
    >
      {/* Logo Section */}
      <div className="h-24 flex items-center justify-between px-7 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-electric-blue flex-shrink-0 drop-shadow-[0_0_15px_rgba(0,210,255,0.6)]">
            <RiPulseLine size={38} />
          </div>
          {(isExpanded || mobileOpen) && (
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase block leading-none transition-colors">
                Fizika <span className="text-electric-blue drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">6</span>
              </span>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.3em] mt-1 block">Universe</span>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        {mobileOpen && (
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white md:hidden"
          >
            <RiCloseLine size={24} />
          </button>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-10 px-4 space-y-3 overflow-y-auto no-scrollbar relative">
        <div className="space-y-3">
          {menuItems.map((item) => (
            <motion.div key={item.path} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to={item.path}
                onClick={() => handleMainItemClick(item.path)}
                className={({ isActive }) => `
                  flex items-center gap-4 p-4 rounded-2xl group relative transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-electric-blue/20 dark:from-electric-blue/20 to-transparent text-electric-blue border-l-4 border-electric-blue shadow-[lg_rgba(0,210,255,0.1)]' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex-shrink-0">{item.icon}</div>
                    {(isExpanded || mobileOpen) && <span className="font-black text-xs sm:text-sm uppercase tracking-widest">{item.name}</span>}
                    {isActive && (
                      <div className="absolute inset-0 bg-electric-blue/5 blur-xl pointer-events-none" />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Footer Nav */}
      <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-secondary hover:bg-secondary/10 hover:text-red-400 group"
        >
          <RiLogoutBoxRLine size={24} className="group-hover:translate-x-1" />
          {(isExpanded || mobileOpen) && <span className="font-black text-xs uppercase tracking-widest">{t('nav_logout')}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
