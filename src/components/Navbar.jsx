import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { id: '', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'projects', label: 'Projects' },
  { id: 'connect', label: 'Connect' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on current path
  const activeTab = location.pathname.substring(1) || '';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId) => {
    navigate(`/${tabId}`);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 py-6 px-4 md:px-16 ${
        scrolled ? 'translate-y-0' : 'translate-y-2'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand logo */}
        <button
          onClick={() => handleTabClick('')}
          className="font-display text-xl md:text-2xl font-light tracking-tight text-white interactive select-none cursor-pointer focus:outline-none bg-transparent border-none"
        >
          A* Akshaya
        </button>

        {/* Desktop floating glass pill menu */}
        <div
          className={`hidden md:flex items-center gap-1.5 px-6 py-2.5 rounded-full border transition-all duration-500 ${
            scrolled
              ? 'bg-black/60 backdrop-blur-xl border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white/3 backdrop-blur-md border-white/10'
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative px-4 py-1.5 font-display text-xs tracking-[0.18em] uppercase transition-all duration-300 focus:outline-none cursor-pointer select-none bg-transparent border-none ${
                  isActive ? 'text-white font-medium' : 'text-white/50 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white cursor-pointer focus:outline-none"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[88px] w-full bg-black/95 backdrop-blur-2xl border-t border-white/5 z-30 transition-all duration-500 md:hidden flex flex-col justify-start py-12 px-6 gap-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`text-left font-display text-lg tracking-[0.2em] uppercase py-3 border-b border-white/5 focus:outline-none cursor-pointer select-none flex items-center justify-between bg-transparent ${
                isActive ? 'text-white font-medium' : 'text-white/40'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
