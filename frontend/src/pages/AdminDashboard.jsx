import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import SciFiCard from '../components/SciFiCard';

const UploadProject = ({ token }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Uploading...');

    try {
      const res = await fetch('https://akshaya-portfolio-j22y.onrender.com/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, liveLink, coverImage })
      });

      if (res.ok) {
        setMessage('Project uploaded successfully!');
        setName('');
        setDescription('');
        setLiveLink('');
        setCoverImage('');
      } else {
        setMessage('Failed to upload project.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Upload New Project</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input 
          type="text" placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} required 
          style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
        />
        <textarea 
          placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required rows="4"
          style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', fontFamily: 'inherit' }}
        />
        <input 
          type="url" placeholder="Live Link URL (Optional)" value={liveLink} onChange={e => setLiveLink(e.target.value)} 
          style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
        />
        <input 
          type="url" placeholder="Cover Image URL (Optional)" value={coverImage} onChange={e => setCoverImage(e.target.value)} 
          style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
        />
        <button type="submit" style={{ padding: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Upload Project
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.8)' }}>{message}</p>}
    </div>
  );
};

const ExistingProjects = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('https://akshaya-portfolio-j22y.onrender.com/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`https://akshaya-portfolio-j22y.onrender.com/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Existing Projects</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {projects.length === 0 ? <p>No projects found.</p> : null}
        {projects.map(proj => (
          <div key={proj._id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{proj.name}</h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{proj.description.substring(0, 50)}...</p>
            </div>
            <button onClick={() => handleDelete(proj._id)} style={{ padding: '0.5rem 1rem', background: 'rgba(255,0,0,0.2)', color: '#ff4444', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <Link to="/admin" style={{ color: location.pathname === '/admin' ? '#fff' : 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: location.pathname === '/admin' ? 'bold' : 'normal' }}>
          Upload Project
        </Link>
        <Link to="/admin/existing" style={{ color: location.pathname === '/admin/existing' ? '#fff' : 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: location.pathname === '/admin/existing' ? 'bold' : 'normal' }}>
          Existing Projects
        </Link>
      </div>

      <SciFiCard style={{ padding: '2rem', minHeight: '400px' }}>
        <Routes>
          <Route path="/" element={<UploadProject token={token} />} />
          <Route path="/existing" element={<ExistingProjects token={token} />} />
        </Routes>
      </SciFiCard>
    </div>
  );
}
