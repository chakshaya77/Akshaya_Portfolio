require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Project = require('./models/Project');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ── MongoDB connection ────────────────────────────────────────────────────────
// NOTE: If you see "querySrv ECONNREFUSED" locally, it means your local network
// or OS DNS resolver is blocking SRV record lookups (common in sandboxed/VPN
// environments). This does NOT affect Render — cloud deployments work normally.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅  MongoDB connected'))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.code || err.message);
    console.error(
      '   → If you see ECONNREFUSED locally, check your DNS / network settings.'
    );
    console.error('   → On Render (production) this will work automatically.');
  });

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// ── Auth Route ────────────────────────────────────────────────────────────────
app.post('/api/auth', (req, res) => {
  const adminId = (req.body.adminId || '').trim();
  const password = (req.body.password || '').trim();

  const envAdminId = (process.env.ADMIN_ID || '').trim();
  const envPassword = (process.env.ADMIN_PASSWORD || '').trim();

  // Uncomment temporarily to debug credential mismatches:
  // console.log('Received adminId:', JSON.stringify(adminId));
  // console.log('Expected adminId:', JSON.stringify(envAdminId));
  // console.log('Received password:', JSON.stringify(password));
  // console.log('Expected password:', JSON.stringify(envPassword));

  if (adminId === envAdminId && password === envPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.json({ token, success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
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

app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
