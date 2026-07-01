import React from 'react';
import SciFiCard from '../components/SciFiCard';

const Connect = () => {
  return (
    <div style={{ minHeight: 'calc(100vh - 100px)', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', gap: '2rem', maxWidth: '1200px', width: '100%', flexWrap: 'wrap' }}>
        
        {/* Left Panel: Direct Message Console */}
        <SciFiCard title="Direct Message console" subtitle="SYSTEM: STABLE" style={{ flex: '1 1 600px' }}>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="scifi-input-group" style={{ flex: 1 }}>
              <label className="scifi-label">SENDER NAME</label>
              <input type="text" className="scifi-input" placeholder="e.g. John Doe" />
            </div>
            <div className="scifi-input-group" style={{ flex: 1 }}>
              <label className="scifi-label">SENDER COORDINATE (EMAIL)</label>
              <input type="email" className="scifi-input" placeholder="e.g. john@example.com" />
            </div>
          </div>

          <div className="scifi-input-group">
            <label className="scifi-label">MESSAGE SUBJECT</label>
            <input type="text" className="scifi-input" placeholder="e.g. Partnership Opportunity" />
          </div>

          <div className="scifi-input-group">
            <label className="scifi-label">SIGNAL MESSAGE</label>
            <textarea className="scifi-textarea" placeholder="Describe your project, timeline, and structural scope..."></textarea>
          </div>

          <button className="scifi-button-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            SEND TRANSMISSION
          </button>
          
        </SciFiCard>

        {/* Right Panels */}
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Direct Lines */}
          <SciFiCard title="DIRECT LINES">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>EMAIL</div>
                <div style={{ fontSize: '0.9rem', color: '#fff' }}>akshaya.chittimilla@gmail.com</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>COORDINATES</div>
                <div style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '4px' }}>37.7749° N, 122.4194° W</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>San Francisco, California</div>
              </div>
            </div>
          </SciFiCard>

          {/* Presence Matrix */}
          <SciFiCard title="PRESENCE MATRIX">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              <a href="https://github.com/chakshaya77" target="_blank" rel="noreferrer" className="scifi-matrix-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>GITHUB</span>
              </a>

              <a href="https://www.linkedin.com/in/chittimilla-akshaya-3b54a6341" target="_blank" rel="noreferrer" className="scifi-matrix-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span>LINKEDIN</span>
              </a>

              <a href="https://x.com/AkshayaCh_7" target="_blank" rel="noreferrer" className="scifi-matrix-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                <span>TWITTER</span>
              </a>

              <div className="scifi-matrix-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span>CV DOC</span>
              </div>

            </div>
          </SciFiCard>

        </div>

      </div>
    </div>
  );
};

export default Connect;
