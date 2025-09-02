import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
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
              <Users />
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
              <Settings />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App