import React from 'react';

const About = () => {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: 'max(4rem, env(safe-area-inset-top)) clamp(1.5rem, 5vw, 2rem) max(4rem, env(safe-area-inset-bottom))' }}>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', marginBottom: '2rem' }}>About.</h1>
      <div className="glass-card" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            [Placeholder for About content]
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            This section is designed to be minimal, elegant, and story-focused. No academic timelines or unnecessary illustrations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
