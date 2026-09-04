import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

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

const getInitials = (str) => {
  if (!str) return '?';
  const cleanStr = str.trim().replace(/[^a-zA-Z0-9\s+]/g, ' ');
  const parts = cleanStr.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanStr.substring(0, 2).toUpperCase();
};

const getColorHash = (str) => {
  if (!str) return 'rgba(255,255,255,0.7)';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 75%)`; 
};

const ToolIcon = ({ name, size = 36 }) => {
  const [loaded, setLoaded] = useState(false);
  const iconName = resolveIconName(name);

  useEffect(() => {
    // Reset loaded state when name changes
    setLoaded(false);
  }, [name]);

  const fallbackColor = getColorHash(name);

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!loaded && (
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '25%', // Rounded square for tools
          color: fallbackColor,
          fontSize: size * 0.45,
          fontWeight: 600,
          fontFamily: "'Outfit', sans-serif",
          boxShadow: '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          {getInitials(name)}
        </div>
      )}
      {iconName && (
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
      )}
    </div>
  );
};

export default ToolIcon;

