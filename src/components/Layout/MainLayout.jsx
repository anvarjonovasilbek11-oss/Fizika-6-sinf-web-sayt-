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
    <div className="flex bg-space-dark min-h-screen transition-colors relative overflow-hidden bg-space-mesh font-ui">
      {/* High-Tech Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="absolute top-0 right-0 w-[800px] h-[800px] text-neon-purple/20 blur-2xl animate-pulse-glow" viewBox="0 0 200 200">
           <circle cx="150" cy="50" r="80" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[600px] h-[600px] text-electric-blue/10 blur-3xl animate-pulse-glow animation-delay-4000" viewBox="0 0 200 200">
           <circle cx="50" cy="150" r="100" fill="currentColor" />
        </svg>
        
        {/* Physics Diagram Watermarks */}
        <div className="absolute top-20 left-10 w-64 h-64 text-white/5 border border-dashed border-white/10 rounded-full animate-spin-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 text-white/5 border border-dashed border-white/10 rounded-full animate-spin-slow animation-delay-2000" />
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      {/* Universal Drawer Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-md"
            onClick={() => {
              setMobileOpen(false);
              setCollapsed(true);
            }}
          />
        )}
      </AnimatePresence>
      
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden md:pl-[80px] relative z-10">
        <Navbar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
        />
        
          <div className="relative p-6 md:p-10">
            {children}
          </div>
      </div>
      <AIChatBot />
    </div>
  );
};

export default MainLayout;
