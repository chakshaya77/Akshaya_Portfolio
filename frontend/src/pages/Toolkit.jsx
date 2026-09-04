import React, { useState, useEffect } from 'react';
import SciFiCard from '../components/SciFiCard';
import ToolIcon from '../components/ToolIcon';

const Toolkit = () => {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const [catRes, toolRes] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/tools`)
        ]);
        setCategories(await catRes.json());
        setTools(await toolRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 'max(4rem, env(safe-area-inset-top)) clamp(1.5rem, 5vw, 2rem) max(4rem, env(safe-area-inset-bottom))', color: '#fff', textAlign: 'center' }}>Loading toolkit...</div>;
  }


  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 'max(4rem, env(safe-area-inset-top)) clamp(1.5rem, 5vw, 2rem) max(4rem, env(safe-area-inset-bottom))' }}>
      {categories.map((cat, idx) => {
        const catTools = tools.filter(t => t.categoryId === cat._id);
        if (catTools.length === 0) return null; // Only show categories with tools
        
        return (
          <div key={cat._id || idx} style={{ marginBottom: '4rem' }}>
            {/* Section Header */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 400, marginBottom: '0.8rem', letterSpacing: '0.02em' }}>{cat.name}</h2>
              <div style={{ height: '1px', width: '300px', maxWidth: '100%', background: 'linear-gradient(to right, rgba(255,255,255,0.15), transparent)' }}></div>
            </div>
            
            {/* Grid of Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {catTools.map((tool, i) => (
                <SciFiCard key={tool._id || i} style={{ padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', aspectRatio: '1/1', cursor: 'pointer' }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36px' }}>
                    <ToolIcon name={tool.name} size={36} />
                  </div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#fff', textAlign: 'center', textTransform: 'uppercase', fontWeight: 500 }}>
                    {tool.name}
                  </div>
                </SciFiCard>
              ))}
            </div>
          </div>
        );
      })}
      
      {categories.length === 0 && (
        <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>No tools available yet.</div>
      )}
    </div>
  );
};

export default Toolkit;
