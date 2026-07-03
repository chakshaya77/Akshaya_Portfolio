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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Auth Route
app.post('/api/auth', (req, res) => {
  const adminId = req.body.adminId?.trim();
  const password = req.body.password?.trim();
  
  const envAdminId = process.env.ADMIN_ID?.trim();
  const envPassword = process.env.ADMIN_PASSWORD?.trim();

  if (adminId === envAdminId && password === envPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Middleware to verify token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    next();
  });
};

// Projects Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/projects', verifyAdmin, async (req, res) => {
  try {
    const { name, description, liveLink, coverImage } = req.body;
    const newProject = new Project({ name, description, liveLink, coverImage });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
