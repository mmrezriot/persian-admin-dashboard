import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { userApi, initializeDemoUsers } from '../services/userApi';
import { sessionService } from '../services/sessionService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);

  // Sign up function
  const signup = async (email, password, userData) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set current user immediately
      setCurrentUser(result.user);
      
      // Update user profile
      await updateProfile(result.user, {
        displayName: userData.name
      });

      // Create user profile using API
      const userProfileData = {
        name: userData.name,
        email: email,
        role: userData.role || 'user',
        status: 'active'
      };

      await userApi.createUser(userProfileData);
      
      // Set user profile and session
      setUserProfile(userProfileData);
      sessionService.setSession(userProfileData);
      setSessionTime(sessionService.getRemainingTime());
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Sign in function
  const signin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Set current user immediately
      setCurrentUser(result.user);
      
      // Get user profile
      const profile = await getUserProfile(result.user.uid);
      
      // Set user profile and session
      if (profile) {
        setUserProfile(profile);
        sessionService.setSession(profile);
        setSessionTime(sessionService.getRemainingTime());
      } else {
        // Create a basic profile if none exists
        const basicProfile = {
          id: result.user.uid,
          name: result.user.displayName || result.user.email.split('@')[0],
          email: result.user.email,
          role: 'user',
          status: 'active'
        };
        setUserProfile(basicProfile);
        sessionService.setSession(basicProfile);
        setSessionTime(sessionService.getRemainingTime());
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Sign out function
  const logout = async () => {
    try {
      // Clear session
      sessionService.clearSession();
      setSessionTime(0);
      
      // Clear states immediately
      setCurrentUser(null);
      setUserProfile(null);
      
      // Sign out from Firebase
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
      // Force clear states even if there's an error
      setCurrentUser(null);
      setUserProfile(null);
      sessionService.clearSession();
      setSessionTime(0);
      throw error;
    }
  };

  // Get user profile from API
  const getUserProfile = async (uid) => {
    try {
      // First try to get from Firestore by UID
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      
      // If not found, try to get by email from API
      if (currentUser?.email) {
        const user = await userApi.getUserByEmail(currentUser.email);
        if (user) {
          return user;
        }
      }
      
      return null;
    } catch (error) {
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (uid, data) => {
    try {
      // Update in Firestore
      await setDoc(doc(db, 'users', uid), {
        ...data,
        updatedAt: new Date()
      }, { merge: true });
      
      // Also update in API
      if (userProfile?.id) {
        await userApi.updateUser(userProfile.id, data);
      }
      
      // Refresh user profile
      const updatedProfile = await getUserProfile(uid);
      setUserProfile(updatedProfile);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // Check for existing session first
    const checkExistingSession = () => {
      const sessionUser = sessionService.getSession();
      if (sessionUser) {
        setUserProfile(sessionUser);
        setSessionTime(sessionService.getRemainingTime());
        setLoading(false);
        return true;
      }
      return false;
    };

    // If no session, listen to Firebase auth changes
    if (!checkExistingSession()) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          
          // Get profile first
          const profile = await getUserProfile(user.uid);
          
          // If no profile found, create a basic one
          if (!profile) {
            const basicProfile = {
              id: user.uid,
              name: user.displayName || user.email.split('@')[0],
              email: user.email,
              role: 'admin', // Default to admin for now
              status: 'active'
            };
            
            // Save to Firestore
            try {
              await userApi.createUser(basicProfile);
            } catch (error) {
              // If user already exists, just continue
            }
            
            console.log('Created basic profile with role:', basicProfile.role);
            setUserProfile(basicProfile);
            sessionService.setSession(basicProfile);
            setSessionTime(sessionService.getRemainingTime());
          } else {
            setUserProfile(profile);
            sessionService.setSession(profile);
            setSessionTime(sessionService.getRemainingTime());
          }
          
          setLoading(false);
        } else {
          setCurrentUser(null);
          setUserProfile(null);
          sessionService.clearSession();
          setSessionTime(0);
          setLoading(false);
        }
      });

      // Initialize demo users in background
      setTimeout(() => {
        initializeDemoUsers();
      }, 100);

      return unsubscribe;
    }

    // Start session timer
    sessionService.startSessionTimer(() => {
      setCurrentUser(null);
      setUserProfile(null);
      setSessionTime(0);
    });

    // Update session time every minute
    const sessionTimer = setInterval(() => {
      const remaining = sessionService.getRemainingTime();
      setSessionTime(remaining);
      
      if (remaining <= 0) {
        setCurrentUser(null);
        setUserProfile(null);
      }
    }, 60000);

    return () => {
      clearInterval(sessionTimer);
    };
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    signin,
    logout,
    updateUserProfile,
    loading,
    sessionTime,
    extendSession: () => {
      const extended = sessionService.extendSession();
      if (extended) {
        setSessionTime(sessionService.getRemainingTime());
      }
      return extended;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
