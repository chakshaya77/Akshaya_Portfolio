import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Scene from './components/Scene';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.fixed-nav');
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="layout-container">
      <CustomCursor />
      
      <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Scene />
      </div>

      <nav className="fixed-nav">
        <div className="nav-brand">
          <Link to="/">AKSHAYA</Link>
        </div>
        <div className="nav-links">
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/toolkit" className={location.pathname === '/toolkit' ? 'active' : ''}>Toolkit</Link>
          <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</Link>
          <Link to="/connect" className={location.pathname === '/connect' ? 'active' : ''}>Connect</Link>
        </div>
      </nav>

      <main className="main-content" style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
