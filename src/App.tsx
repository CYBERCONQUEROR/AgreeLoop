import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Uses Firebase via AuthContext
import { Header } from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import FarmerPanel from './pages/FarmerPanel';
import CompanyDashboard from './pages/CompanyDashboard';
import AIDemoLab from './pages/AIDemoLab';
import ImpactDashboard from './pages/ImpactDashboard';
import About from './pages/About';
import { Loader2 } from 'lucide-react';

const ProtectedRoute: React.FC<{ allowedRole: 'farmer' | 'company' }> = ({ allowedRole }) => {
  const { user, userRole, loading, isRoleLoading } = useAuth();
  if (loading || isRoleLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary-500" /></div>;
  if (!user) return <Navigate to="/" replace />;
  if (userRole !== allowedRole) return <Navigate to="/" replace />;
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-neutral-50">
          <Header />
          <main className="flex-grow"><Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoute allowedRole="farmer" />}><Route path="/farmer" element={<FarmerPanel />} /></Route>
            <Route element={<ProtectedRoute allowedRole="company" />}><Route path="/company" element={<CompanyDashboard />} /></Route>
            <Route path="/ai-demo" element={<AIDemoLab />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes></main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;