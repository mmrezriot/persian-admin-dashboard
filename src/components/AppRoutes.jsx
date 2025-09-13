import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from './LoadingSpinner';
import Layout from '../layouts/Layout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Products from '../pages/Products';
import Settings from '../pages/Settings';

const AppRoutes = () => {
  const { userProfile, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return <LoadingSpinner text="در حال بررسی وضعیت ورود..." />;
  }

  return (
    <Routes>
      {/* If user is logged in, redirect to dashboard */}
      {userProfile && userProfile.role ? (
        <>
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" replace />}
          />
          <Route 
            path="/login" 
            element={<Navigate to="/dashboard" replace />}
          />
          <Route 
            path="/dashboard" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/users" 
            element={
              <Layout>
                <ProtectedRoute requiredRole="admin">
                  <Users />
                </ProtectedRoute>
              </Layout>
            } 
          />
          <Route 
            path="/products" 
            element={
              <Layout>
                <Products />
              </Layout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <Layout>
                <ProtectedRoute requiredRole="admin">
                  <Settings />
                </ProtectedRoute>
              </Layout>
            } 
          />
        </>
      ) : (
        /* If user is not logged in, show login page */
        <>
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />}
          />
          <Route 
            path="/login" 
            element={<Login />}
          />
          <Route 
            path="*" 
            element={<Navigate to="/login" replace />}
          />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
