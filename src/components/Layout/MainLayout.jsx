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
    <div className="flex bg-[#070b14] h-[100dvh] transition-colors relative overflow-hidden font-ui">
      {/* High-Tech Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="absolute top-0 right-0 w-[800px] h-[800px] text-neon-purple/20 blur-2xl animate-pulse-glow" viewBox="0 0 200 200">
           <circle cx="150" cy="50" r="80" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[600px] h-[600px] text-electric-blue/10 blur-3xl animate-pulse-glow animation-delay-4000" viewBox="0 0 200 200">
           <circle cx="50" cy="150" r="100" fill="currentColor" />
        </svg>
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      {/* Universal Drawer Overlay (Only for Mobile) */}
      {isOverlayOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div className={`
        flex-1 flex flex-col min-w-0 w-full relative z-10 transition-all duration-300
        pt-16 ${collapsed ? 'md:pl-[80px]' : 'md:pl-[300px]'}
      `} style={{ height: '100dvh' }}>
        <Navbar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
        />
        
        <main className="flex-1 overflow-y-auto relative p-6 md:p-10 no-scrollbar">
          {children}
        </main>
      </div>
      <AIChatBot />
    </div>
  );
};

export default MainLayout;
