import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminGateway from './AdminGateway';
import './Navbar.css';

const NAV_ITEMS = [
  { id: '', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'projects', label: 'Projects' },
  { id: 'connect', label: 'Connect' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminGatewayOpen, setAdminGatewayOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.substring(1) || '';

  const handleTabClick = (tabId) => {
    navigate(`/${tabId}`);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmblemClick = (e) => {
    e.stopPropagation();
    setAdminGatewayOpen(true);
  };

  return (
    <>
      <nav className="navbar-container">
        <button
          onClick={() => handleTabClick('')}
          className="navbar-brand"
        >
          <img 
            src="/emblem-transparent.png" 
            alt="Admin Gateway Emblem" 
            className="navbar-emblem" 
            onClick={handleEmblemClick}
            aria-label="Open Admin Gateway"
          />
          Akshaya Chittimilla
        </button>

        <div className="navbar-glass-capsule">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`navbar-link ${activeTab === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="navbar-mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`navbar-mobile-link ${activeTab === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <AdminGateway 
        isOpen={adminGatewayOpen} 
        onClose={() => setAdminGatewayOpen(false)} 
      />
    </>
  );
}
