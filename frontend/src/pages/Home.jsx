import React from 'react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 100px);
          padding: 2rem;
          text-align: center;
        }
        .hero-name {
          font-weight: 600;
          font-size: 38px;
          letter-spacing: -1px;
          color: #ffffff;
          margin-bottom: 20px;
        }
        .hero-role {
          text-transform: uppercase;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 7px;
          color: rgba(255, 255, 255, 0.62);
          margin-bottom: 34px;
        }
        .hero-heading {
          font-size: clamp(56px, 6.2vw, 82px);
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: -3px;
          max-width: 900px;
          color: #ffffff;
          margin-bottom: 0px;
        }
        .hero-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 380px;
          max-width: 100%;
          opacity: 0.3;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .hero-statement {
          font-size: 22px;
          font-weight: 400;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.72);
          max-width: 640px;
          margin-bottom: 44px;
        }
        .hero-buttons {
          display: flex;
          gap: 24px;
          width: 100%;
          max-width: 450px;
          justify-content: center;
          flex-direction: row;
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 2rem 24px;
          }
          .hero-name {
            font-size: 32px;
            margin-bottom: 18px;
          }
          .hero-role {
            font-size: 13px;
            margin-bottom: 30px;
            letter-spacing: 6px;
          }
          .hero-heading {
            font-size: 46px;
            margin-bottom: 28px;
            letter-spacing: -2px;
          }
          .hero-divider {
            margin-bottom: 18px;
            width: 280px;
          }
          .hero-statement {
            font-size: 18px;
            margin-bottom: 36px;
          }
          .hero-buttons {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
      <div className="hero-container">
        <h2 className="hero-name">Akshaya Chittimilla</h2>
        
        <h3 className="hero-role">BUILDER &bull; PROBLEM SOLVER &bull; DEVELOPER</h3>
        
        <h1 className="hero-heading">From Curiosity To Creation.</h1>
        
        <div className="hero-divider">
          <div style={{ flex: 1, height: '1px', background: '#fff' }}></div>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', margin: '0 12px' }}></div>
          <div style={{ flex: 1, height: '1px', background: '#fff' }}></div>
        </div>
        
        <p className="hero-statement">
          Building intentionally.<br />Solving with purpose.
        </p>
        
        <div className="hero-buttons">
          <button onClick={() => { navigate('/projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="glass-card" style={{ flex: '1', padding: '16px 0', color: '#000', background: '#fff', borderRadius: '40px', border: 'none', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', cursor: 'pointer', minWidth: '0' }}>
            Explore
          </button>
          <button className="glass-card" style={{ flex: '1', padding: '16px 0', color: '#fff', background: 'rgba(10, 10, 10, 0.6)', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.2)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', cursor: 'pointer', minWidth: '0' }}>
            View Resume
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
