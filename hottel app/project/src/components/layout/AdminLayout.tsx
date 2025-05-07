import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;