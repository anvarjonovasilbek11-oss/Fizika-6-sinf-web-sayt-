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
  RiLogoutBoxRLine
} from 'react-icons/ri';
import { Atom } from 'lucide-react';
import { TEXTBOOK_DATA } from '../../data/textbookData';
import { RiArrowDownSLine, RiArrowUpSLine, RiBook3Line, RiCloseLine, RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const [openDarslik, setOpenDarslik] = React.useState(false);
  const [activeChapter, setActiveChapter] = React.useState(null);

  const isAdmin = user?.role === 'admin';
  const isExpanded = !collapsed || isHovered;

  const handleChapterClick = (chapterId) => {
    setActiveChapter(activeChapter === chapterId ? null : chapterId);
  };

  const handleMainItemClick = (path) => {
    if (path !== '#darslik') {
      setOpenDarslik(false);
      setActiveChapter(null);
      if (window.innerWidth < 768 && setMobileOpen) setMobileOpen(false);
    }
  };

  const menuItems = [
    { name: t('nav_home'),      icon: <RiDashboardLine size={24} />, path: "/home" },
    { name: t('nav_textbook'),  icon: <RiBook3Line size={24} />,     path: "#darslik" },
    { name: t('nav_videos'),    icon: <RiVideoLine size={24} />,     path: "/videos" },
    { name: t('nav_materials'), icon: <RiBookOpenLine size={24} />,  path: "/materials" },
    { name: t('nav_tests'),     icon: <RiRobotLine size={24} />,     path: isAdmin ? "/quiz" : "/tests" },
    { name: t('nav_settings'),  icon: <RiSettings4Line size={24} />, path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  React.useEffect(() => {
    if (!isExpanded) {
      setOpenDarslik(false);
    }
  }, [isExpanded]);

  return (
    <motion.aside 
      initial={false}
      onMouseEnter={() => collapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ 
        width: typeof window !== 'undefined' && window.innerWidth < 768 
          ? 280 
          : (isExpanded ? 280 : 80),
      }}
      className={`
        fixed md:sticky top-0 h-screen z-40 bg-white dark:bg-dark-surface 
        border-r border-slate-200 dark:border-white/10 shadow-xl flex flex-col transition-all duration-300 overflow-hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/10 overflow-hidden flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-primary flex-shrink-0"
          >
            <Atom size={32} />
          </motion.div>
          {isExpanded && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-heading font-extrabold text-slate-800 dark:text-white whitespace-nowrap"
            >
              Fizika <span className="text-primary">Olam</span>
            </motion.span>
          )}
        </div>
        
        {mobileOpen && (
          <button 
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            <RiCloseLine size={24} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto no-scrollbar overflow-x-hidden">
        <AnimatePresence mode="wait">
          {!openDarslik ? (
            <motion.div
              key="main-menu"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {menuItems.map((item) => (
                <React.Fragment key={item.path}>
                  {item.path === '#darslik' ? (
                    <button
                      onClick={() => {
                        if (isExpanded) {
                          setOpenDarslik(true);
                        }
                      }}
                      className={`
                        w-full flex items-center gap-4 p-3 rounded-xl transition-all group relative
                        text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary
                      `}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      {isExpanded && (
                        <>
                          <span className="flex-1 text-left whitespace-nowrap">{item.name}</span>
                          <RiArrowRightSLine size={20} />
                        </>
                      )}
                      {collapsed && (
                        <div className="absolute left-16 bg-dark-bg text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => handleMainItemClick(item.path)}
                      className={({ isActive }) => `
                        flex items-center gap-4 p-3 rounded-xl transition-all group relative
                        ${isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary'}
                      `}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      {isExpanded && (
                        <span className="font-medium whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                      {collapsed && (
                        <div className="absolute left-16 bg-dark-bg text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </NavLink>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="darslik-menu"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <button
                onClick={() => setOpenDarslik(false)}
                className="w-full flex items-center gap-3 p-2 text-slate-500 dark:text-slate-300 hover:text-primary transition-all font-bold mb-2 border-b border-slate-200 dark:border-white/10 pb-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <RiArrowLeftSLine size={20} />
                </div>
                <span>Orqaga qaytish</span>
              </button>

              <div className="space-y-1">
                {TEXTBOOK_DATA.map((chapter, idx) => (
                  <div key={chapter.id} className="space-y-1">
                    <button
                      onClick={() => handleChapterClick(chapter.id)}
                      className={`
                        w-full flex items-center justify-between p-2 rounded-lg text-sm transition-all
                        ${activeChapter === chapter.id 
                          ? 'text-primary bg-primary/5 font-bold' 
                          : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5'}
                      `}
                    >
                      <span className="text-left line-clamp-1">{t(`chap_${idx + 1}`)}</span>
                      {activeChapter === chapter.id ? <RiArrowUpSLine size={16} /> : <RiArrowDownSLine size={16} />}
                    </button>

                    <AnimatePresence>
                      {activeChapter === chapter.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 border-l border-slate-200 dark:border-white/10 space-y-1 ml-2"
                        >
                          {chapter.lessons.map((lesson) => (
                            <NavLink
                              key={lesson.id}
                              to={`/textbook/${chapter.id}/${lesson.id}`}
                              onClick={() => {
                                handleMainItemClick(`/textbook/${chapter.id}/${lesson.id}`);
                              }}
                              className={({ isActive }) => `
                                block p-2 rounded-lg text-xs transition-all
                                ${isActive 
                                  ? 'text-primary bg-primary/10 font-bold' 
                                  : 'text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5'}
                              `}
                            >
                              {lesson.title}
                            </NavLink>
                          ))}
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

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-200 dark:border-white/10">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-secondary hover:bg-secondary/10 transition-all group relative"
        >
          <div className="flex-shrink-0"><RiLogoutBoxRLine size={24} /></div>
          {isExpanded && <span className="font-medium whitespace-nowrap">{t('nav_logout')}</span>}
          {collapsed && (
            <div className="absolute left-16 bg-secondary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {t('nav_logout')}
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
