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
    setCollapsed(true); // Auto-collapse on selection
    if (typeof window !== 'undefined' && window.innerWidth < 768 && setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const hoverEffect = "active:scale-95 group-hover:scale-110 transition-all duration-300";

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
    <motion.aside 
      initial={false}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      animate={{ 
        width: typeof window !== 'undefined' && window.innerWidth < 768 
          ? 300 
          : (isExpanded ? 300 : 80),
      }}
      className={`
        fixed top-0 left-0 h-screen z-50 bg-[#070b14]/90 backdrop-blur-3xl
        border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-500 overflow-hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Logo Section */}
      <div className="h-24 flex items-center justify-between px-7 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="text-electric-blue flex-shrink-0 drop-shadow-[0_0_15px_rgba(0,210,255,0.6)]"
          >
            <RiPulseLine size={38} className="animate-spin-slow" />
          </motion.div>
          {isExpanded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-2xl font-black text-white tracking-tighter uppercase block leading-none">
                Fizika <span className="text-electric-blue drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">6</span>
              </span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1 block">Universe</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-10 px-4 space-y-3 overflow-y-auto no-scrollbar relative">
        <motion.div 
          key="main-nav"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-3"
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => handleMainItemClick(item.path)}
              className={({ isActive }) => `
                flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group relative
                ${isActive 
                  ? 'bg-gradient-to-r from-electric-blue/20 to-transparent text-electric-blue border-l-4 border-electric-blue' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex-shrink-0">{item.icon}</div>
                  {isExpanded && <span className="font-bold text-sm uppercase tracking-widest">{item.name}</span>}
                  {isActive && (
                    <motion.div 
                      layoutId="glow" 
                      className="absolute inset-0 bg-electric-blue/5 blur-xl pointer-events-none" 
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </motion.div>
      </nav>

      {/* Footer Nav */}
      <div className="p-6 border-t border-white/5 bg-[#0a0f1d]/50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-secondary hover:bg-secondary/10 hover:text-red-400 transition-all group"
        >
          <RiLogoutBoxRLine size={24} className="group-hover:translate-x-1 transition-transform" />
          {isExpanded && <span className="font-black text-xs uppercase tracking-widest">{t('nav_logout')}</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
