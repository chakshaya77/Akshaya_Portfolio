# Project Structure

This repository is organized as a monorepo containing a full-stack web application.

## Directory Layout

```
/ (Root)
│
├── /frontend/               # Vite + React Frontend Application
│   ├── /public/             # Static assets (images, models)
│   ├── /src/                # React source code
│   │   ├── /components/     # Reusable UI components (Navbar, Footer, SciFiCard, AdminGateway)
│   │   ├── /pages/          # Page components (Home, Projects, AdminDashboard, etc.)
│   │   ├── App.jsx          # Main application routing
│   │   ├── main.jsx         # React entry point
│   │   └── ...
│   ├── package.json         # Frontend dependencies and scripts
│   └── vite.config.js       # Vite bundler configuration
│
└── /backend/                # Node.js + Express + MongoDB Backend Application
    ├── /models/             # Mongoose schemas (Project.js)
    ├── server.js            # Express server and API routes
    ├── package.json         # Backend dependencies
    └── .env                 # Environment variables (MongoDB URI, JWT secret)
```

## Hosting Configuration
- **Frontend:** Intended for deployment on **Vercel**.
- **Backend:** Intended for deployment on **Render**.

## Development Setup
To run locally, you will need two terminal windows:

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
