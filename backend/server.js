require('dotenv').config();
const dns = require('dns');

// Force Node.js to use Google DNS for SRV lookups (fixes ECONNREFUSED on some networks)
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
// Prefer IPv4 to avoid IPv6 DNS issues
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Project = require('./models/Project');
const Category = require('./models/Category');
const Tool = require('./models/Tool');

const app = express();

// Explicit CORS config - allows all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ── MongoDB connection ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅  MongoDB connected'))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.code || err.message);
    console.error('   → Your local network DNS may block SRV record lookups.');
    console.error('   → Render (production) will connect normally.');
  });

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', mongoState: mongoose.connection.readyState });
});

// ── Auth Route ────────────────────────────────────────────────────────────────
app.post('/api/auth', (req, res) => {
  const adminId = (req.body.adminId || '').trim();
  const password = (req.body.password || '').trim();

  const envAdminId = (process.env.ADMIN_ID || '').trim();
  const envPassword = (process.env.ADMIN_PASSWORD || '').trim();

  // Helper to make ID matching lenient (case-insensitive, ignores all spaces)
  const normalizeId = (id) => id.replace(/\s+/g, '').toLowerCase();

  // Log to file for debugging
  require('fs').appendFileSync('auth.log', `[AUTH ATTEMPT] Received ID: "${adminId}", Expected ID: "${envAdminId}", Received PWD: "${password}", Expected PWD: "${envPassword}"\n`);

  if (normalizeId(adminId) === normalizeId(envAdminId) && password === envPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.json({ token, success: true });
  }
  
  // Return debug information to help diagnose the exact mismatch in the browser console
  return res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials',
    debug: { receivedId: adminId, expectedId: envAdminId, receivedPassword: password, expectedPassword: envPassword }
  });
});

// ── Auth middleware ───────────────────────────────────────────────────────────
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    next();
  });
};

// ── Projects routes ───────────────────────────────────────────────────────────
app.get('/api/projects', async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/projects', verifyAdmin, async (req, res) => {
  try {
    const { name, description, liveLink, coverImage } = req.body;
    const newProject = new Project({ name, description, liveLink, coverImage });
    await newProject.save();
    res.status(201).json(newProject);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── Categories routes ─────────────────────────────────────────────────────────
app.get('/api/categories', async (_req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/categories', verifyAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/categories/:id', verifyAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(category);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/categories/:id', verifyAdmin, async (req, res) => {
  try {
    const { action, targetCategoryId } = req.query;
    if (action === 'move' && targetCategoryId) {
      await Tool.updateMany({ categoryId: req.params.id }, { categoryId: targetCategoryId });
    } else {
      await Tool.deleteMany({ categoryId: req.params.id });
    }
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── Tools routes ──────────────────────────────────────────────────────────────
app.get('/api/tools', async (_req, res) => {
  try {
    const tools = await Tool.find().sort({ createdAt: 1 });
    res.json(tools);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/tools', verifyAdmin, async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const newTool = new Tool({ name, categoryId });
    await newTool.save();
    res.status(201).json(newTool);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/tools/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const tool = await Tool.findByIdAndUpdate(req.params.id, { name, categoryId }, { new: true });
    res.json(tool);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/tools/:id', verifyAdmin, async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tool deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
