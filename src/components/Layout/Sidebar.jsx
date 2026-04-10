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

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [openDarslik, setOpenDarslik] = React.useState(false);
  const [activeChapter, setActiveChapter] = React.useState(null);

  const isAdmin = user?.role === 'admin';
  const isExpanded = !collapsed;

  const handleChapterClick = (chapterId) => {
    setActiveChapter(activeChapter === chapterId ? null : chapterId);
  };

  const handleMainItemClick = (path) => {
    if (path !== '#darslik') {
      setOpenDarslik(false);
      setActiveChapter(null);
      if (typeof window !== 'undefined' && window.innerWidth < 768 && setMobileOpen) {
        setMobileOpen(false);
      } else {
        if (setCollapsed) setCollapsed(true);
      }
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

  // Also ensure Darslik menu closes if the sidebar collapses
  React.useEffect(() => {
    if (collapsed || !isExpanded) {
      setOpenDarslik(false);
    }
  }, [collapsed, isExpanded]);

  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: typeof window !== 'undefined' && window.innerWidth < 768 
          ? 280 
          : (isExpanded ? 280 : 80),
      }}
      className={`
        fixed top-0 left-0 h-screen z-50 bg-white dark:bg-dark-surface 
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
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto no-scrollbar overflow-x-hidden relative">
        {(!openDarslik || !isExpanded) ? (
          <div className="space-y-2 animate-fade-in-fast">
            {menuItems.map((item) => (
              <React.Fragment key={item.path}>
                {item.path === '#darslik' ? (
                  <button
                    onClick={() => {
                      if (isExpanded) {
                        setOpenDarslik(true);
                      } else {
                        // Expand the sidebar then open darslik
                        if (setCollapsed) setCollapsed(false);
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
                      <span className="text-left font-medium whitespace-nowrap">
                        {item.name}
                      </span>
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
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in-fast">
            <button
              onClick={() => setOpenDarslik(false)}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors px-2 relative"
            >
              <RiArrowLeftSLine size={20} />
              <span className="text-sm font-medium">{t('nav_back')}</span>
            </button>

            <div className="space-y-2 relative">
              {TEXTBOOK_DATA.map((chapter, idx) => (
                <div key={chapter.id} className="space-y-1">
                  <button
                    onClick={() => handleChapterClick(chapter.id)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl transition-all
                      ${activeChapter === chapter.id
                        ? 'bg-primary text-white shadow-md shadow-primary/25' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary'}
                    `}
                  >
                    <span className="text-left line-clamp-1 break-all">{t(`chap_${idx + 1}`)}</span>
                    <motion.div
                      animate={{ rotate: activeChapter === chapter.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-2"
                    >
                      <RiArrowDownSLine size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeChapter === chapter.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-1 pb-2 pl-4 pr-2 space-y-1 relative">
                          <div className="absolute left-3.5 top-0 bottom-4 w-px bg-slate-200 dark:bg-white/10" />
                          {chapter.lessons.map((lesson) => (
                            <NavLink
                              key={lesson.id}
                              to={`/textbook/${chapter.id}/${lesson.id}`}
                              onClick={() => {
                                if (setCollapsed) setCollapsed(true);
                                if (setMobileOpen) setMobileOpen(false);
                              }}
                              className={({ isActive }) => `
                                block w-full text-left py-2 px-4 rounded-lg text-sm transition-all relative
                                ${isActive 
                                  ? 'bg-primary/10 text-primary font-medium' 
                                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}
                              `}
                            >
                              <span className="line-clamp-2 break-all">{t(`lesson_${lesson.id}`)}</span>
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
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
