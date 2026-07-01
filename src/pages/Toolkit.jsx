import React from 'react';
import SciFiCard from '../components/SciFiCard';

const Toolkit = () => {
  const categories = [
    { name: 'Programming', tools: ['JavaScript', 'TypeScript', 'Python', 'C++'] },
    { name: 'AI & Emerging Tech', tools: ['Machine Learning', 'TensorFlow', 'LLMs', 'OpenCV'] },
    { name: 'Creative Communication', tools: ['Technical Writing', 'Public Speaking', 'System Design'] },
    { name: 'Design', tools: ['Figma', 'UI/UX', 'Motion Design', 'Wireframing'] },
    { name: 'Development Tools', tools: ['Git', 'Docker', 'Vite', 'React'] }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Toolkit.</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {categories.map((cat, idx) => (
          <SciFiCard key={idx} style={{ padding: '2rem', minHeight: '200px' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>{cat.name}</h3>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)' }}>
              {cat.tools.map((tool, i) => (
                <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
                  {tool}
                </li>
              ))}
            </ul>
          </SciFiCard>
        ))}
      </div>
    </div>
  );
};

export default Toolkit;
