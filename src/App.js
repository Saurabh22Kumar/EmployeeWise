import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/auth/Login';
import UserList from './components/users/UserList';
import EditUser from './components/users/EditUser';
import Navbar from './components/layout/Navbar';
import { isAuthenticated } from './utils/auth';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const authenticated = auth.token || isAuthenticated();
  
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;