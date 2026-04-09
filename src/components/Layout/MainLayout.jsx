import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AIChatBot from '../AI/AIChatBot';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex bg-slate-50 dark:bg-dark-bg min-h-screen transition-colors">
      <Sidebar collapsed={collapsed} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <main className="flex-1 p-6 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
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
