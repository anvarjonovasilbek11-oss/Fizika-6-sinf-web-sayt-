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
    if (path !== '#darslik') {
      setOpenDarslik(false);
      setActiveChapter(null);
      if (typeof window !== 'undefined' && window.innerWidth < 768 && setMobileOpen) {
        setMobileOpen(false);
      }
    }
  };

  const hoverEffect = "active:scale-95 group-hover:scale-110 transition-all duration-300";

  const menuItems = [
    { name: t('nav_home'),      icon: <RiDashboardLine size={24} className={hoverEffect} />, path: "/home" },
    { name: t('nav_textbook'),  icon: <RiBook3Line size={24} className={hoverEffect} />,     path: "#darslik" },
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
            <RiAtomLine size={38} className="animate-spin-slow" />
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
        <AnimatePresence mode="wait">
          {!openDarslik || !isExpanded ? (
            <motion.div 
              key="main-nav"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {menuItems.map((item) => (
                <React.Fragment key={item.path}>
                  {item.path === '#darslik' ? (
                    <button
                      onClick={() => setOpenDarslik(true)}
                      className="w-full group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      {isExpanded && <span className="font-bold text-sm uppercase tracking-widest">{item.name}</span>}
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => handleMainItemClick(item.path)}
                      className={({ isActive }) => `
                        flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group relative
                        ${isActive 
                          ? 'bg-gradient-to-r from-electric-blue/20 to-transparent text-electric-blue border-l-4 border-electric-blue' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                      `}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      {isExpanded && <span className="font-bold text-sm uppercase tracking-widest">{item.name}</span>}
                      {isActive && <motion.div layoutId="glow" className="absolute inset-0 bg-electric-blue/5 blur-xl pointer-events-none" />}
                    </NavLink>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="textbook-nav"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <button
                onClick={() => setOpenDarslik(false)}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-all px-4 py-2 group mb-4"
              >
                <RiArrowLeftSLine size={24} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">{t('nav_back')}</span>
              </button>

              <div className="space-y-3 px-2">
                {textbooks.map((chapter, idx) => (
                  <div key={chapter.id} className="space-y-2">
                    <button
                      onClick={() => handleChapterClick(chapter.id)}
                      className={`
                        w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300
                        ${activeChapter === chapter.id
                          ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30 shadow-[0_0_20px_rgba(188,19,254,0.2)]' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                      `}
                    >
                      <span className="text-left text-xs font-black uppercase tracking-tight break-all leading-tight">
                        {chapter?.id?.startsWith('bob-') ? t(`chap_${idx + 1}`) : chapter?.title}
                      </span>
                      <RiArrowDownSLine 
                        size={20} 
                        className={`transition-transform duration-300 flex-shrink-0 ${activeChapter === chapter.id ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    <AnimatePresence>
                      {activeChapter === chapter.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white/5 rounded-2xl p-1 shadow-inner"
                        >
                          <div className="space-y-1 p-2">
                            {chapter.lessons.map((lesson) => (
                              <NavLink
                                key={lesson.id}
                                to={`/textbook/${chapter.id}/${lesson.id}`}
                                onClick={() => mobileOpen && setMobileOpen(false)}
                                className={({ isActive }) => `
                                  block w-full text-left py-3 px-4 rounded-xl text-[11px] font-bold transition-all
                                  ${isActive 
                                    ? 'bg-white/10 text-white border-l-2 border-neon-purple' 
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}
                                `}
                              >
                                {t(`lesson_${lesson.id}`) !== `lesson_${lesson.id}` ? t(`lesson_${lesson.id}`) : lesson.title}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
