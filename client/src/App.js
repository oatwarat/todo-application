import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodosPage from './pages/TodosPage';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/todos" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/todos" />} />
          <Route path="/todos" element={
            <PrivateRoute>
              <TodosPage />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/todos" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;