import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import SciFiCard from '../components/SciFiCard';
import { Icon } from '@iconify/react';
import { Terminal } from 'lucide-react';

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
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/projects`, {
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
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/projects`);
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
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/projects/${id}`, {
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

const UploadToolStack = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [toolName, setToolName] = useState('');
  const [message, setMessage] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/categories`);
      const data = await res.json();
      setCategories(data);
      if (data.length > 0 && !selectedCategory) {
        setSelectedCategory(data[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/categories`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCategoryName })
      });
      if (res.ok) {
        const cat = await res.json();
        setCategories([...categories, cat]);
        setSelectedCategory(cat._id);
        setShowModal(false);
        setNewCategoryName('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toolName.trim() || !selectedCategory) return;
    setMessage('Uploading...');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/tools`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: toolName, categoryId: selectedCategory })
      });

      if (res.ok) {
        setMessage('Tool added successfully!');
        setToolName('');
      } else {
        setMessage('Failed to add tool.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    }
  };

  const resolveIconName = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Upload Tool Stack</h2>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minWidth: '300px' }}>
          <select 
            value={selectedCategory} 
            onChange={(e) => {
              if (e.target.value === 'new') setShowModal(true);
              else setSelectedCategory(e.target.value);
            }}
            style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
          >
            <option value="" disabled>Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
            <option value="new">+ New Category</option>
          </select>

          <input 
            type="text" placeholder="Tool Name (e.g. Python, React)" value={toolName} onChange={e => setToolName(e.target.value)} required 
            style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
          />

          <button type="submit" style={{ padding: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add Tool
          </button>
          {message && <p style={{ color: 'rgba(255,255,255,0.8)' }}>{message}</p>}
        </form>

        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>Live Preview</h3>
          <SciFiCard style={{ padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '220px', aspectRatio: '1/1' }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36px' }}>
              {toolName ? (
                <Icon 
                  icon={`logos:${resolveIconName(toolName)}`} 
                  width="36" height="36" 
                  onLoad={(e) => { e.currentTarget.style.display = 'block'; e.currentTarget.nextSibling.style.display = 'none'; }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }}
                />
              ) : null}
              <div style={{ display: toolName ? 'none' : 'block' }}>
                <Terminal size={36} strokeWidth={1.5} />
              </div>
            </div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#fff', textAlign: 'center', textTransform: 'uppercase', fontWeight: 500 }}>
              {toolName || 'Tool Name'}
            </div>
          </SciFiCard>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Add New Category</h3>
            <input 
              type="text" placeholder="Category Name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)}
              style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', marginBottom: '1rem', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAddCategory} style={{ padding: '0.5rem 1rem', background: '#fff', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExistingToolStack = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewingCategory, setViewingCategory] = useState(null);

  const [deleteModal, setDeleteModal] = useState({ show: false, categoryId: null, toolsCount: 0 });
  const [targetCategory, setTargetCategory] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleToggleSelect = (id) => {
    if (selectedCategories.includes(id)) setSelectedCategories(selectedCategories.filter(c => c !== id));
    else setSelectedCategories([...selectedCategories, id]);
  };

  const handleDeleteCategory = (id) => {
    const catTools = tools.filter(t => t.categoryId === id);
    if (catTools.length > 0) {
      setDeleteModal({ show: true, categoryId: id, toolsCount: catTools.length });
      setTargetCategory('');
    } else {
      if (window.confirm('Are you sure you want to delete this category?')) {
        executeDeleteCategory(id, 'delete');
      }
    }
  };

  const executeDeleteCategory = async (id, action, targetId = null) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const url = new URL(`${apiUrl}/api/categories/${id}`);
      url.searchParams.append('action', action);
      if (targetId) url.searchParams.append('targetCategoryId', targetId);
      
      const res = await fetch(url.toString(), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setCategories(categories.filter(c => c._id !== id));
        if (action === 'delete') {
          setTools(tools.filter(t => t.categoryId !== id));
        } else if (action === 'move') {
          setTools(tools.map(t => t.categoryId === id ? { ...t, categoryId: targetId } : t));
        }
        setDeleteModal({ show: false, categoryId: null, toolsCount: 0 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCategory = async (id, oldName) => {
    const newName = window.prompt('Enter new category name:', oldName);
    if (!newName || newName === oldName) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/categories/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newName })
      });
      if (res.ok) {
        const updatedCat = await res.json();
        setCategories(categories.map(c => c._id === id ? updatedCat : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTool = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tool?')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/tools/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setTools(tools.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTool = async (id, oldName) => {
    const newName = window.prompt('Enter new tool name:', oldName);
    if (!newName || newName === oldName) return;
    const tool = tools.find(t => t._id === id);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/tools/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newName, categoryId: tool.categoryId })
      });
      if (res.ok) {
        const updatedTool = await res.json();
        setTools(tools.map(t => t._id === id ? updatedTool : t));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading toolkit...</p>;

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  
  if (viewingCategory) {
    const cat = categories.find(c => c._id === viewingCategory);
    const catTools = tools.filter(t => t.categoryId === viewingCategory && t.name.toLowerCase().includes(search.toLowerCase()));
    
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setViewingCategory(null)} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Back</button>
          <h2 style={{ margin: 0 }}>{cat?.name} Tools</h2>
        </div>
        
        <input 
          type="text" placeholder="Search tools..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', marginBottom: '2rem', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}
        />

        <div style={{ display: 'grid', gap: '1rem' }}>
          {catTools.length === 0 ? <p>No Tools Available</p> : null}
          {catTools.map(tool => (
            <div key={tool._id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Icon icon={`logos:${tool.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`} width="24" height="24" />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{tool.name}</h3>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEditTool(tool._id, tool.name)} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDeleteTool(tool._id)} style={{ padding: '0.5rem 1rem', background: 'rgba(255,0,0,0.2)', color: '#ff4444', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Existing Tool Stack</h2>
      
      <input 
        type="text" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)}
        style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', marginBottom: '2rem', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}
      />

      {selectedCategories.length > 0 && (
        <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Selected: {selectedCategories.length} Categories</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setSelectedCategories([])} style={{ padding: '0.5rem 1rem', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredCategories.length === 0 ? <p>No Toolkit Categories Found</p> : null}
        {filteredCategories.map(cat => {
          const catTools = tools.filter(t => t.categoryId === cat._id);
          return (
            <div key={cat._id} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: selectedCategories.includes(cat._id) ? '1px solid #fff' : '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <input type="checkbox" checked={selectedCategories.includes(cat._id)} onChange={() => handleToggleSelect(cat._id)} style={{ transform: 'scale(1.2)' }} />
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{cat.name}</h3>
              </div>
              <p style={{ margin: '0 0 1.5rem 0', color: 'rgba(255,255,255,0.5)' }}>{catTools.length} Tools</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setSearch(''); setViewingCategory(cat._id); }} style={{ padding: '0.5rem 1rem', flex: 1, background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>View</button>
                <button onClick={() => handleEditCategory(cat._id, cat.name)} style={{ padding: '0.5rem 1rem', flex: 1, background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDeleteCategory(cat._id)} style={{ padding: '0.5rem 1rem', flex: 1, background: 'rgba(255,0,0,0.2)', color: '#ff4444', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {deleteModal.show && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '1rem', color: '#ff4444' }}>Warning!</h3>
            <p style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
              This category contains {deleteModal.toolsCount} tools. What would you like to do with them?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="deleteAction" value="delete" onChange={() => setTargetCategory('delete')} />
                Delete Everything
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="deleteAction" value="move" onChange={() => setTargetCategory('move')} />
                Move Tools
              </label>
            </div>
            
            {targetCategory === 'move' && (
              <select 
                value={targetCategory === 'move' ? '' : targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', marginBottom: '1.5rem' }}
              >
                <option value="" disabled>Select Target Category</option>
                {categories.filter(c => c._id !== deleteModal.categoryId).map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteModal({ show: false, categoryId: null, toolsCount: 0 })} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              <button 
                disabled={!targetCategory || (targetCategory === 'move')} 
                onClick={() => {
                  if (targetCategory === 'delete') executeDeleteCategory(deleteModal.categoryId, 'delete');
                  else if (targetCategory && targetCategory !== 'move') executeDeleteCategory(deleteModal.categoryId, 'move', targetCategory);
                }} 
                style={{ padding: '0.5rem 1rem', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: targetCategory && targetCategory !== 'move' || targetCategory === 'delete' ? 'pointer' : 'not-allowed', opacity: targetCategory && targetCategory !== 'move' || targetCategory === 'delete' ? 1 : 0.5 }}
              >Confirm</button>
            </div>
          </div>
        </div>
      )}
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
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <Link to="/admin" style={{ color: location.pathname === '/admin' ? '#fff' : 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: location.pathname === '/admin' ? 'bold' : 'normal' }}>
          Upload Project
        </Link>
        <Link to="/admin/existing" style={{ color: location.pathname === '/admin/existing' ? '#fff' : 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: location.pathname === '/admin/existing' ? 'bold' : 'normal' }}>
          Existing Projects
        </Link>
        <Link to="/admin/toolkit" style={{ color: location.pathname === '/admin/toolkit' ? '#fff' : 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: location.pathname === '/admin/toolkit' ? 'bold' : 'normal' }}>
          Upload Tool Stack
        </Link>
        <Link to="/admin/toolkit-existing" style={{ color: location.pathname === '/admin/toolkit-existing' ? '#fff' : 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: location.pathname === '/admin/toolkit-existing' ? 'bold' : 'normal' }}>
          Existing Tool Stack
        </Link>
      </div>

      <SciFiCard style={{ padding: '2rem', minHeight: '400px' }}>
        <Routes>
          <Route path="/" element={<UploadProject token={token} />} />
          <Route path="/existing" element={<ExistingProjects token={token} />} />
          <Route path="/toolkit" element={<UploadToolStack token={token} />} />
          <Route path="/toolkit-existing" element={<ExistingToolStack token={token} />} />
        </Routes>
      </SciFiCard>
    </div>
  );
}
