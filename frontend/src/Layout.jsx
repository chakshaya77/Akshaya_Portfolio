import React from 'react';
import AdvancedCursor from './components/AdvancedCursor';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <AdvancedCursor />
      
      <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Scene />
      </div>

      <Navbar />

      <main className="main-content" style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
