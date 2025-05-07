import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import RoomsPage from './pages/admin/RoomsPage';
import BookingsPage from './pages/admin/BookingsPage';
import StaffPage from './pages/admin/StaffPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes (Protected) */}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/reports" element={<DashboardPage />} /> {/* Placeholder */}
            <Route path="/settings" element={<DashboardPage />} /> {/* Placeholder */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;