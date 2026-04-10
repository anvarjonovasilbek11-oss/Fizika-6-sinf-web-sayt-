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

  const isOverlayOpen = mobileOpen || (!collapsed && typeof window !== 'undefined' && window.innerWidth >= 768);

  return (
    <div className="flex bg-slate-50 dark:bg-dark-bg min-h-screen transition-colors relative">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      {/* Universal Drawer Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => {
              setMobileOpen(false);
              setCollapsed(true);
            }}
          />
        )}
      </AnimatePresence>
      
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden md:pl-[80px]">
        <Navbar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden w-full relative z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <AIChatBot />
    </div>
  );
};

export default MainLayout;
