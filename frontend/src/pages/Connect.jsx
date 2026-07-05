import React from 'react';
import { portfolioConfig } from '../portfolioConfig';

const Connect = () => {
  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 100px)', padding: 'max(4rem, env(safe-area-inset-top)) clamp(1.5rem, 5vw, 2rem) max(4rem, env(safe-area-inset-bottom))', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1200px', width: '100%' }}>
        
        {/* Headline */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 400, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif', letterSpacing: '0.02em' }}>Connect</h1>
        </div>

        <div style={{ display: 'flex', gap: '2rem', width: '100%', flexWrap: 'wrap' }}>
        
        {/* Left Panel: Direct Message Console */}
        <div className="glass-card" style={{ flex: '1 1 600px', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif', letterSpacing: '0.02em' }}>Direct Message</h3>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>SYSTEM: STABLE</span>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>NAME</label>
              <input type="text" placeholder="e.g. John Doe" style={{ width: '100%', background: '#111', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '16px 18px', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', outline: 'none' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>EMAIL</label>
              <input type="email" placeholder="e.g. john@example.com" style={{ width: '100%', background: '#111', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '16px 18px', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', outline: 'none' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>SUBJECT</label>
            <input type="text" placeholder="e.g. Partnership Opportunity" style={{ width: '100%', background: '#111', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '16px 18px', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>MESSAGE</label>
            <textarea placeholder="Describe your project, timeline, and structural scope..." style={{ width: '100%', background: '#111', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '16px 18px', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', minHeight: '130px', resize: 'vertical', outline: 'none' }}></textarea>
          </div>

          <button style={{ width: '100%', padding: '18px', background: '#fff', color: '#000', border: 'none', borderRadius: '50px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'transform 0.2s', textTransform: 'uppercase' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            SEND MESSAGE
          </button>
          
        </div>

        {/* Right Panels */}
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Direct Lines */}
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase' }}>GET IN TOUCH</h3>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '6px', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>EMAIL</div>
                <div style={{ fontSize: '0.95rem', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
                  <a href={`mailto:${portfolioConfig.email.trim()}`} style={{ color: '#fff', textDecoration: 'none' }}>{portfolioConfig.email}</a>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '6px', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>LOCATION</div>
                <div style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>{portfolioConfig.location}</div>
              </div>
            </div>
          </div>

          {/* Presence Matrix */}
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase' }}>QUICK ACCESS</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              <a href={portfolioConfig.github} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>GITHUB</span>
              </a>

              <a href={portfolioConfig.linkedin} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>LINKEDIN</span>
              </a>

              <a href={portfolioConfig.x} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>TWITTER</span>
              </a>

              <a href={`mailto:${portfolioConfig.email.trim()}`} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', cursor: 'pointer' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>EMAIL</span>
              </a>

            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
