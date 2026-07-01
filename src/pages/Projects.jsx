import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SciFiCard from '../components/SciFiCard';

const ProjectList = () => {
  const projects = [
    { id: 1, name: 'Project Alpha', desc: 'A cinematic web experience.', tech: 'React, Three.js' },
    { id: 2, name: 'Project Beta', desc: 'AI-driven analytics dashboard.', tech: 'Python, TensorFlow, React' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Projects.</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {projects.map((proj) => (
          <SciFiCard key={proj.id} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '350px' }}>
            <div style={{ height: '200px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{proj.name}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', flex: 1 }}>{proj.desc}</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>{proj.tech}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', position: 'relative', zIndex: 10 }}>
              <Link to={`/projects/${proj.id}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px', fontSize: '0.9rem' }}>Documentation</Link>
            </div>
          </SciFiCard>
        ))}
      </div>
    </div>
  );
};

const ProjectDetail = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
      <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>&larr; Back to Projects</Link>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Project Documentation</h1>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <h3 style={{ color: '#fff', marginTop: '2rem' }}>Overview</h3>
          <p>[Placeholder]</p>
          <h3 style={{ color: '#fff', marginTop: '2rem' }}>Problem & Architecture</h3>
          <p>[Placeholder]</p>
          <h3 style={{ color: '#fff', marginTop: '2rem' }}>Challenges & Lessons Learned</h3>
          <p>[Placeholder]</p>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectList />} />
      <Route path="/:id" element={<ProjectDetail />} />
    </Routes>
  );
};

export default Projects;
