import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Toolkit from './pages/Toolkit';
import Projects from './pages/Projects';
import Connect from './pages/Connect';
import AdminDashboard from './pages/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); // 6 seconds loading screen for cinematic effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/projects/*" element={<Projects />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App;
