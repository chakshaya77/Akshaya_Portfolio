import React from 'react';

const About = () => {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: 'max(4rem, env(safe-area-inset-top)) clamp(1.5rem, 5vw, 2rem) max(4rem, env(safe-area-inset-bottom))' }}>
      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', marginBottom: '2rem' }}>Beyond the Code.</h1>
      <div className="glass-card" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm a B-Tech Computer Science Student based in Hyderabad.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            I got into this because building something and watching it actually work never stopped feeling interesting to me. Not the theory of it on its own — the moment an idea stops being an idea and starts running.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            That's what pulled me toward Artificial Intelligence, Generative AI, AI Agents, Automation Workflows, and Vibe Coding. I like systems that can reason through a problem instead of just executing fixed steps — that space between "known solution" and "figure it out" is where I want to keep spending my time.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm not working toward a single finish line. Just the next thing worth understanding, and whatever that leads me to build next.
          </p>
          <p>
            ~Akshaya Chittimilla
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
