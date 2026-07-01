import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Scene from './components/Scene';
import AdvancedCursor from './components/AdvancedCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-white/20 font-sans cursor-none overflow-x-hidden">
      <AdvancedCursor />
      
      {/* 3D Cosmic Background - Persistent across routes */}
      <div id="canvas-container" className="fixed inset-0 z-0">
        <Scene />
      </div>

      <Navbar />

      {/* Page Content with Cinematic Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px) brightness(2)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px) brightness(0)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex-grow pt-32 pb-16 w-full max-w-7xl mx-auto px-4 md:px-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;
