import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'h-screen' : 'py-20'} bg-transparent`}>
      <div className="relative">
        {/* Outer Glow Circle - Pulsing Purple */}
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1], 
            rotate: 360,
            boxShadow: [
              "0 0 20px rgba(188,19,254,0.4)",
              "0 0 50px rgba(188,19,254,0.8)",
              "0 0 20px rgba(188,19,254,0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-t-2 border-b-2 border-neon-purple"
        />
        
        {/* Inner Counter-Rotating Circle - Electric Blue */}
        <motion.div
          animate={{ scale: [1.1, 0.9, 1.1], rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-24 h-24 rounded-full border-l-2 border-r-2 border-electric-blue opacity-40"
        />
        
        {/* Center Pulse Point - Pure White Core */}
        <motion.div
          animate={{ 
            scale: [1, 1.8, 1], 
            opacity: [0.3, 0.8, 0.3],
            boxShadow: [
              "0 0 10px white",
              "0 0 30px white",
              "0 0 10px white"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-12 text-neon-purple font-black uppercase tracking-[0.4em] text-[10px] drop-shadow-[0_0_8px_rgba(188,19,254,0.5)]"
      >
        Ma'lumot yuklanmoqda...
      </motion.p>

    </div>
  );
};

export default LoadingSpinner;
