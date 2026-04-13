import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'h-screen' : 'py-20'} bg-transparent`}>
      <div className="relative">
        {/* Outer Glow Circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-t-4 border-b-4 border-neon-purple shadow-[0_0_20px_rgba(188,19,254,0.6)]"
        />
        
        {/* Inner Counter-Rotating Circle */}
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-24 h-24 rounded-full border-l-4 border-r-4 border-electric-blue opacity-60"
        />
        
        {/* Center Pulse Point */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-neon-purple font-black uppercase tracking-[0.3em] text-xs animate-pulse"
      >
        Ma'lumot yuklanmoqda...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
