import React from 'react';
import SciFiCard from '../components/SciFiCard';

import { Terminal, Code, Cpu, FileCode, Layers, Server, GitBranch, MonitorPlay, Monitor, PenTool, Mic } from 'lucide-react';

const Toolkit = () => {
  const categories = [
    { 
      name: 'Programming Languages', 
      tools: [
        { name: 'PYTHON', icon: <Terminal size={36} strokeWidth={1.5} /> },
        { name: 'JAVASCRIPT', icon: <Code size={36} strokeWidth={1.5} /> },
        { name: 'C++', icon: <Cpu size={36} strokeWidth={1.5} /> },
        { name: 'TYPESCRIPT', icon: <FileCode size={36} strokeWidth={1.5} /> }
      ] 
    },
    { 
      name: 'Development & Frameworks', 
      tools: [
        { name: 'REACT', icon: <Layers size={36} strokeWidth={1.5} /> },
        { name: 'DATABASES', icon: <Server size={36} strokeWidth={1.5} /> },
        { name: 'GIT', icon: <GitBranch size={36} strokeWidth={1.5} /> },
        { name: 'VITE', icon: <Code size={36} strokeWidth={1.5} /> }
      ] 
    },
    {
      name: 'AI & Emerging Tech',
      tools: [
        { name: 'MACHINE LEARNING', icon: <MonitorPlay size={36} strokeWidth={1.5} /> },
        { name: 'TENSORFLOW', icon: <Cpu size={36} strokeWidth={1.5} /> },
        { name: 'LLMs', icon: <Terminal size={36} strokeWidth={1.5} /> },
        { name: 'OPENCV', icon: <MonitorPlay size={36} strokeWidth={1.5} /> }
      ]
    },
    {
      name: 'Creative & Design',
      tools: [
        { name: 'FIGMA', icon: <Monitor size={36} strokeWidth={1.5} /> },
        { name: 'UI/UX', icon: <PenTool size={36} strokeWidth={1.5} /> },
        { name: 'SYSTEM DESIGN', icon: <Layers size={36} strokeWidth={1.5} /> },
        { name: 'PUBLIC SPEAKING', icon: <Mic size={36} strokeWidth={1.5} /> }
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      {categories.map((cat, idx) => (
        <div key={idx} style={{ marginBottom: '4rem' }}>
          {/* Section Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 400, marginBottom: '0.8rem', letterSpacing: '0.02em' }}>{cat.name}</h2>
            <div style={{ height: '1px', width: '300px', maxWidth: '100%', background: 'linear-gradient(to right, rgba(255,255,255,0.15), transparent)' }}></div>
          </div>
          
          {/* Grid of Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {cat.tools.map((tool, i) => (
              <SciFiCard key={i} style={{ padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', aspectRatio: '1/1', cursor: 'pointer' }}>
                <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                  {tool.icon}
                </div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#fff', textAlign: 'center', textTransform: 'uppercase', fontWeight: 500 }}>
                  {tool.name}
                </div>
              </SciFiCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toolkit;
