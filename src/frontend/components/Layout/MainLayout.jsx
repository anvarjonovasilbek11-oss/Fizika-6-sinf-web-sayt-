import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AIChatBot from '../AI/AIChatBot';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isOverlayOpen = mobileOpen;

  return (
    <div className="flex bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white min-h-screen transition-colors duration-500 relative font-ui selection:bg-primary/20">
      {/* Professional Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-100">
        <div className="absolute inset-0 science-grid" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent dark:from-primary/[0.02]" />
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      {/* Universal Drawer Overlay (Only for Mobile) */}
      {isOverlayOpen && (
        <div 
          className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 backdrop-blur-sm dark:backdrop-blur-md transition-all duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div className={`
        flex-1 flex flex-col min-w-0 w-full relative z-10 transition-all duration-300
        pt-16 ${collapsed ? 'md:pl-[80px]' : 'md:pl-[300px]'}
      `}>
        <Navbar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
        />
        
        <main className="flex-1 relative p-6 md:p-10">
          {children}
        </main>
      </div>
      <AIChatBot />
    </div>
  );
};

export default MainLayout;
