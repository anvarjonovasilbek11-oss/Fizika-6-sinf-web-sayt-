import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
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
import { RiArrowDownSLine, RiArrowUpSLine, RiBook3Line } from 'react-icons/ri';

const Sidebar = ({ collapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const [openDarslik, setOpenDarslik] = React.useState(false);
  const [activeChapter, setActiveChapter] = React.useState(null);

  // Determine if sidebar should be expanded (either toggled open or hovered)
  const isExpanded = !collapsed || isHovered;

  const handleChapterClick = (chapterId) => {
    setActiveChapter(activeChapter === chapterId ? null : chapterId);
  };

  const handleMainItemClick = (path) => {
    if (path !== '#darslik') {
      setOpenDarslik(false);
      setActiveChapter(null);
    }
  };

  const menuItems = [
    { name: "Asosiy sahifa", icon: <RiDashboardLine size={24} />, path: "/home" },
    { name: "Darslik", icon: <RiBook3Line size={24} />, path: "#darslik" },
    { name: "Video darslar", icon: <RiVideoLine size={24} />, path: "/videos" },
    { name: "Qo'llanmalar", icon: <RiBookOpenLine size={24} />, path: "/materials" },
    { name: "Testlar (AI)", icon: <RiRobotLine size={24} />, path: "/quiz" },
    { name: "Sozlamalar", icon: <RiSettings4Line size={24} />, path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.aside 
      initial={false}
      onMouseEnter={() => collapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ width: isExpanded ? 280 : 80 }}
      className="bg-white dark:bg-dark-surface border-r border-slate-200 dark:border-white/10 h-screen sticky top-0 flex flex-col z-40 transition-colors shadow-xl"
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-200 dark:border-white/10 overflow-hidden">
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

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <React.Fragment key={item.path}>
            {item.path === '#darslik' ? (
              <div className="space-y-2">
                <button
                  onClick={() => isExpanded && setOpenDarslik(!openDarslik)}
                  className={`
                    w-full flex items-center gap-4 p-3 rounded-xl transition-all group relative
                    ${openDarslik 
                      ? 'bg-primary/10 text-primary font-bold' 
                      : 'text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary'}
                  `}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  {isExpanded && (
                    <>
                      <span className="flex-1 text-left whitespace-nowrap">{item.name}</span>
                      {openDarslik ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
                    </>
                  )}
                </button>

                {/* Chapters Accordion */}
                <AnimatePresence>
                  {isExpanded && openDarslik && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 space-y-1"
                    >
                      {TEXTBOOK_DATA.map((chapter) => (
                        <div key={chapter.id} className="space-y-1">
                          <button
                            onClick={() => handleChapterClick(chapter.id)}
                            className={`
                              w-full flex items-center justify-between p-2 rounded-lg text-sm transition-all
                              ${activeChapter === chapter.id 
                                ? 'text-primary bg-primary/5 font-bold' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5'}
                            `}
                          >
                            <span className="text-left line-clamp-1">{chapter.title}</span>
                            {activeChapter === chapter.id ? <RiArrowUpSLine size={16} /> : <RiArrowDownSLine size={16} />}
                          </button>

                          {/* Lessons List */}
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
                                    onClick={() => handleMainItemClick(`/textbook/${chapter.id}/${lesson.id}`)}
                                    className={({ isActive }) => `
                                      block p-2 rounded-lg text-xs transition-all
                                      ${isActive 
                                        ? 'text-primary bg-primary/10 font-bold' 
                                        : 'text-slate-400 dark:text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5'}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-200 dark:border-white/10">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-secondary hover:bg-secondary/10 transition-all group relative"
        >
          <div className="flex-shrink-0"><RiLogoutBoxRLine size={24} /></div>
          {isExpanded && <span className="font-medium whitespace-nowrap">Chiqish</span>}
          {collapsed && (
            <div className="absolute left-16 bg-secondary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Chiqish
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
