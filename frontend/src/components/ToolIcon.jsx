import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Terminal } from 'lucide-react';

export const resolveIconName = (name) => {
  if (!name) return '';
  const normalized = name.toLowerCase().trim();
  const map = {
    'c++': 'c-plusplus',
    'c#': 'c-sharp',
    'node.js': 'nodejs-icon',
    'react': 'react',
    'react.js': 'react',
    'next.js': 'nextjs-icon',
    'express.js': 'express',
    'vue.js': 'vue',
    'html': 'html-5',
    'css': 'css-3',
    'javascript': 'javascript',
    'typescript': 'typescript-icon',
    'java': 'java',
    'python': 'python',
    'c': 'c',
    'mongodb': 'mongodb-icon',
    'postgresql': 'postgresql',
    'mysql': 'mysql-icon',
    'docker': 'docker-icon',
    'kubernetes': 'kubernetes',
    'aws': 'aws',
    'git': 'git-icon',
    'github': 'github-icon',
    'figma': 'figma',
    'tailwind': 'tailwindcss-icon',
    'bootstrap': 'bootstrap'
  };
  if (map[normalized]) return map[normalized];
  return normalized.replace(/[^a-z0-9-]/g, '');
};

const ToolIcon = ({ name, size = 36 }) => {
  const [loaded, setLoaded] = useState(false);
  const iconName = resolveIconName(name);

  useEffect(() => {
    // Reset loaded state when name changes
    setLoaded(false);
  }, [name]);

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Terminal size={size} strokeWidth={1.5} color="rgba(255,255,255,0.7)" />
        </div>
      )}
      <Icon 
        icon={`logos:${iconName}`} 
        width={size} 
        height={size}
        onLoad={() => setLoaded(true)}
        style={{ 
          position: 'relative',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out'
        }}
      />
    </div>
  );
};

export default ToolIcon;
