import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import FarmerPanel from './pages/FarmerPanel';
import CompanyDashboard from './pages/CompanyDashboard';
import AIDemoLab from './pages/AIDemoLab';
import ImpactDashboard from './pages/ImpactDashboard';
import About from './pages/About';
import Auth from './pages/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-neutral-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/farmer" element={<FarmerPanel />} />
              <Route path="/company" element={<CompanyDashboard />} />
              <Route path="/ai-demo" element={<AIDemoLab />} />
              <Route path="/impact" element={<ImpactDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;