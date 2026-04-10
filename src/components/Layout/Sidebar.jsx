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
import { getCombinedTextbooks, saveCustomLesson } from '../../services/textbookService';
import { RiArrowDownSLine, RiArrowUpSLine, RiBook3Line, RiCloseLine, RiArrowRightSLine, RiArrowLeftSLine, RiSave3Line, RiAddLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [openDarslik, setOpenDarslik] = React.useState(false);
  const [activeChapter, setActiveChapter] = React.useState(null);
  const [textbooks, setTextbooks] = React.useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  
  // Form state
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

  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!newLesson.title || !newLesson.theory) {
      toast.error("Iltimos barcha maydonlarni to'ldiring");
      return;
    }

    const lessonObj = {
      id: Date.now().toString(),
      title: newLesson.title,
      content: {
        theory: newLesson.theory,
        formulas: "Formulalar kiritilmagan",
        experiments: "Tajribalar kiritilmagan"
      }
    };

    saveCustomLesson(newLesson.chapterId, lessonObj);
    setNewLesson({ chapterId: 'bob-1', title: '', theory: '' });
    setShowAddModal(false);
    toast.success("Yangi darslik muvaffaqiyatli qo'shildi!");
  };

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

  // Advanced Pro-Tip hover effect requested: scale-105
  const hoverEffect = "active:scale-95 group-hover:scale-105 transition-all duration-300";

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
              {textbooks.map((chapter, idx) => (
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
                    <span className="text-left line-clamp-1 break-all">{chapter.id.startsWith('bob-') ? t(`chap_${idx + 1}`) : chapter.title}</span>
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
                              <span className="line-clamp-2 break-all">
                                {t(`lesson_${lesson.id}`) !== `lesson_${lesson.id}` 
                                  ? t(`lesson_${lesson.id}`) 
                                  : lesson.title}
                              </span>
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {isAdmin && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full flex items-center justify-center p-3 rounded-xl border border-dashed border-primary/50 text-primary hover:bg-primary/10 transition-all font-bold text-sm mt-4 animate-pulse"
                >
                  <RiAddLine size={20} className="mr-2" />
                  Yangi darslik qo'shish
                </button>
              )}
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

      {/* Add Textbook Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
            >
              <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                  <RiAddLine size={24} className="text-primary" /> Yangi dars qo'shish
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <RiCloseLine size={24} />
                </button>
              </div>
              <form onSubmit={handleAddLesson} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Bobni tanlang</label>
                  <select 
                    value={newLesson.chapterId}
                    onChange={(e) => setNewLesson({ ...newLesson, chapterId: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                  >
                    {textbooks.map((c, idx) => (
                      <option key={c.id} value={c.id}>
                        {c.title.startsWith('bob-') ? t(`chap_${idx + 1}`) : c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Dars nomi</label>
                  <input 
                    type="text" required
                    placeholder="Masalan: 33. Elektr zaryadi"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nazariy qism (Matn)</label>
                  <textarea 
                    required rows={4}
                    placeholder="Darslik matnini shu yerga yozing..."
                    value={newLesson.theory}
                    onChange={(e) => setNewLesson({ ...newLesson, theory: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white resize-none"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                  <RiSave3Line /> Saqlash
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Sidebar;
