import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmblemLogo from './EmblemLogo';
import './AdminGateway.css';

export default function AdminGateway({ isOpen, onClose }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.className === 'admin-modal-overlay') {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    try {
      const res = await fetch('https://akshaya-portfolio-j22y.onrender.com/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        onClose();
        navigate('/admin');
      } else {
        triggerError();
      }
    } catch (err) {
      triggerError();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerError = () => {
    setError(true);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className="admin-modal-overlay" onClick={handleClose}>
      <div className={`admin-modal-content ${isShaking ? 'shake' : ''}`}>
        <div className="admin-modal-header">
          <EmblemLogo className="admin-modal-logo" />
          <h2 className="admin-modal-title">Admin Gateway</h2>
          <p className="admin-modal-subtitle">AUTHENTICATION REQUIRED</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-input-group">
            <label>USERNAME / ADMIN ID</label>
            <div className="admin-input-wrapper">
              <User size={18} className="admin-input-icon" />
              <input 
                type="text" 
                placeholder="Enter Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label>PASSWORD</label>
            <div className="admin-input-wrapper">
              <Lock size={18} className="admin-input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="admin-error-text">Invalid Admin Credentials</p>}

          <button type="submit" className="admin-submit-btn" disabled={isLoading}>
            {isLoading ? 'AUTHENTICATING...' : 'SIGN IN'} <ArrowUpRight size={18} />
          </button>
        </form>

        <div className="admin-divider"></div>

        <button onClick={onClose} className="admin-return-btn">
          &larr; RETURN TO WEBSITE
        </button>
      </div>
    </div>
  );
}
