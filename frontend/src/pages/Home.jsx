import React from 'react';
import MagneticButton from '../components/MagneticButton';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 100px)', padding: '2rem' }}>
      <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', fontSize: '0.8rem' }}>
        Building with curiosity.
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', textAlign: 'center', marginBottom: '1.5rem', lineHeight: 1.1 }}>
        Engineering ideas into <br /> digital experiences.
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Akshaya Chittimilla
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', letterSpacing: '1px' }}>
        Builder &bull; Problem Solver &bull; Developer
      </p>
      <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '450px', justifyContent: 'center' }}>
        <button className="glass-card" style={{ flex: '1', padding: '16px 0', color: '#000', background: '#fff', borderRadius: '40px', border: 'none', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', cursor: 'pointer', minWidth: '0' }}>
          Explore
        </button>
        <button className="glass-card" style={{ flex: '1', padding: '16px 0', color: '#fff', background: 'rgba(10, 10, 10, 0.6)', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.2)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', cursor: 'pointer', minWidth: '0' }}>
          View Resume
        </button>
      </div>
    </div>
  );
};

export default Home;
