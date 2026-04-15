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
  RiBarChart2Line
} from 'react-icons/ri';
import { getCombinedTextbooks } from '../../services/textbookService';
import toast from 'react-hot-toast';
const Logo = ({ collapsed }) => (
  <div className="flex items-center gap-4 group">
    <div className="relative flex-shrink-0">
      <svg 
        width="44" height="44" viewBox="0 0 44 44" fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary transition-transform duration-500 group-hover:rotate-12"
      >
        <rect width="44" height="44" rx="14" fill="currentColor" fillOpacity="0.1"/>
        <path d="M14 22C14 17.5817 17.5817 14 22 14C26.4183 14 30 17.5817 30 22C30 26.4183 26.4183 30 22 30C17.5817 30 14 26.4183 14 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 4"/>
        <path d="M22 18V26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M18 22H26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="22" cy="22" r="3" fill="currentColor" className="animate-pulse" />
      </svg>
    </div>
    {!collapsed && (
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
          Fizika <span className="text-primary italic">6</span>
        </h1>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1 pl-0.5">Universe</p>
      </motion.div>
    )}
  </div>
);

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

  const menuItems = [
    { name: t('nav_home'),      icon: <RiDashboardLine size={24} />, path: "/home" },
    { name: t('nav_textbook'),  icon: <RiBook3Line size={24} />,     path: "/darslik" },
    { name: t('nav_videos'),    icon: <RiVideoLine size={24} />,     path: "/videos" },
    { name: t('nav_materials'), icon: <RiBookOpenLine size={24} />,  path: "/materials" },
    { name: t('nav_constants'), icon: <RiBarChart2Line size={24} />, path: "/constants" },
    { name: t('nav_tests'),     icon: <RiRobotLine size={24} />,     path: "/tests" },
    { name: t('nav_settings'),  icon: <RiSettings4Line size={24} />, path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 bg-white/80 dark:bg-[#0a0f1d]/95 backdrop-blur-3xl
        border-r border-slate-200 dark:border-white/5 flex flex-col overflow-hidden
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${mobileOpen 
          ? 'translate-x-0 w-[280px] sm:w-[300px]' 
          : '-translate-x-full md:translate-x-0'}
        ${isExpanded ? 'md:w-[300px]' : 'md:w-[88px]'}
      `}
      style={{ height: '100dvh' }}
    >
      {/* Logo Section */}
      <div className="h-28 flex items-center px-6 border-b border-slate-100 dark:border-white/5 flex-shrink-0">
        <Logo collapsed={!isExpanded && !mobileOpen} />
        
        {mobileOpen && (
          <button 
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-red-500 md:hidden transition-all"
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
                  flex items-center gap-4 p-4 rounded-2xl group transition-all duration-300
                  ${isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}
                `}
              >
                <div className="flex-shrink-0 transition-transform group-hover:scale-110">{item.icon}</div>
                {(isExpanded || mobileOpen) && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
              </NavLink>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Footer Nav */}
      <div className={`p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 ${isExpanded ? 'px-6' : 'px-2'}`}>
        <button 
          onClick={handleLogout}
          className={`
            w-full flex items-center rounded-2xl text-secondary hover:bg-secondary/10 hover:text-red-400 group transition-all duration-300
            ${isExpanded ? 'p-4 gap-4' : 'p-4 justify-center gap-0'}
          `}
        >
          <RiLogoutBoxRLine size={24} className="group-hover:translate-x-1 flex-shrink-0" />
          {(isExpanded || mobileOpen) && <span className="font-black text-xs uppercase tracking-widest">{t('nav_logout')}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
