import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// Correct import from your Firebase setup file
import { auth, db, googleProvider, firebaseApp } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'farmer' | 'company' | null;

interface AuthContextType {
  user: firebaseApp.User | null;
  userRole: UserRole;
  loading: boolean;
  isRoleLoading: boolean;
  signInWithGoogle: (role: 'farmer' | 'company') => Promise<void>;
  signOutUser: () => Promise<void>;
  setUserRoleInContext: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<firebaseApp.User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: firebaseApp.User | null) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        setIsRoleLoading(true);
        const userDocRef = db.collection('users').doc(firebaseUser.uid);
        try {
          const docSnap = await userDocRef.get();
          if (docSnap.exists) {
            const userData = docSnap.data();
            setUserRole(userData?.role as UserRole || null);
          } else {
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
        } finally {
          setIsRoleLoading(false);
        }
      } else {
        setUserRole(null);
        setIsRoleLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (role: 'farmer' | 'company') => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const firebaseUser = result.user;
      if (firebaseUser) {
        const userDocRef = db.collection('users').doc(firebaseUser.uid);
        const docSnap = await userDocRef.get();
        let currentRole = role;

        if (!docSnap.exists) {
          await userDocRef.set({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: role,
            createdAt: firebaseApp.firestore.FieldValue.serverTimestamp(),
          });
          setUserRole(role);
        } else {
          const existingRole = docSnap.data()?.role as UserRole;
          if (existingRole) {
            currentRole = existingRole; 
          } else { 
             await userDocRef.update({ role: role });
          }
          setUserRole(currentRole);
        }
        
        if (currentRole === 'farmer') navigate('/farmer');
        else if (currentRole === 'company') navigate('/company');
        else navigate('/');
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      if ((error as any).code === 'auth/popup-closed-by-user') {
        // alert('Sign-in cancelled.');
      } else {
        alert('Sign-in failed. Please try again.');
      }
      throw error; 
    }
  };

  const signOutUser = async () => {
    await auth.signOut();
    navigate('/');
  };
  
  const setUserRoleInContext = (role: UserRole) => {
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, isRoleLoading, signInWithGoogle, signOutUser, setUserRoleInContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
