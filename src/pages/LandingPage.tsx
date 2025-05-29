import React, { useState } from 'react';
import { Leaf, Briefcase, UserCheck, Loader2 } from 'lucide-react'; // UserCheck for Farmer, Briefcase for Company
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const { signInWithGoogle, user, loading: authLoading, userRole, isRoleLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'company' | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  // Redirect if user is already logged in and role is determined
  React.useEffect(() => {
    if (!authLoading && !isRoleLoading && user && userRole) {
      if (userRole === 'farmer') navigate('/farmer', { replace: true });
      else if (userRole === 'company') navigate('/company', { replace: true });
    }
  }, [user, userRole, authLoading, isRoleLoading, navigate]);


  const handleRoleSelectAndSignIn = async (role: 'farmer' | 'company') => {
    setSelectedRole(role);
    setIsSigningIn(true);
    try {
      await signInWithGoogle(role);
      // Navigation is handled within signInWithGoogle after role is set/confirmed
    } catch (error) {
      console.error("Sign-in process error:", error);
      alert("Sign-in failed. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  if (authLoading || isRoleLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 text-white p-6">
        <Loader2 className="h-16 w-16 animate-spin text-white mb-4" />
        <p className="text-xl">Loading AgriWaste Exchange...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 via-green-500 to-secondary-500 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Leaf className="h-24 w-24 mx-auto mb-6 text-white" /> {/* Placeholder Logo */}
        <h1 className="text-5xl font-bold mb-3">AgriWaste Exchange</h1>
        <p className="text-xl mb-12">Turn Waste into Wealth. Connect & Grow.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-8 md:space-y-0 md:flex md:space-x-8"
      >
        {/* Farmer Button */}
        <button
          onClick={() => handleRoleSelectAndSignIn('farmer')}
          disabled={isSigningIn}
          className="w-full md:w-auto bg-white text-green-600 hover:bg-green-50 transition-all duration-300 ease-in-out
                     font-semibold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1
                     flex flex-col items-center text-lg"
        >
          <UserCheck size={48} className="mb-3" />
          I am a Farmer
          {isSigningIn && selectedRole === 'farmer' && <Loader2 className="animate-spin h-5 w-5 ml-2 inline" />}
        </button>

        {/* Company Button */}
        <button
          onClick={() => handleRoleSelectAndSignIn('company')}
          disabled={isSigningIn}
          className="w-full md:w-auto bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 ease-in-out
                     font-semibold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1
                     flex flex-col items-center text-lg"
        >
          <Briefcase size={48} className="mb-3" />
          I am a Company
          {isSigningIn && selectedRole === 'company' && <Loader2 className="animate-spin h-5 w-5 ml-2 inline" />}
        </button>
      </motion.div>
      {isSigningIn && (
        <p className="mt-8 text-white text-sm">Connecting with Google...</p>
      )}
    </div>
  );
};

export default LandingPage;