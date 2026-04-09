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

const Sidebar = ({ collapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  // Determine if sidebar should be expanded (either toggled open or hovered)
  const isExpanded = !collapsed || isHovered;

  const menuItems = [
    { name: "Asosiy sahifa", icon: <RiDashboardLine size={24} />, path: "/home" },
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
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 p-3 rounded-xl transition-all group relative
              ${isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary'}
            `}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            {isExpanded && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-medium whitespace-nowrap"
              >
                {item.name}
              </motion.span>
            )}
            {collapsed && (
              <div className="absolute left-16 bg-dark-bg text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.name}
              </div>
            )}
          </NavLink>
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
