import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SymptomChecker from './pages/SymptomChecker';
import Medications from './pages/Medications';
import HealthTips from './pages/HealthTips';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';
import { HealthProvider } from './context/HealthContext';

function App() {
  return (
    <HealthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </HealthProvider>
  );
}

export default App;