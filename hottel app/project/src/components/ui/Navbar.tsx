import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hotel, Menu, X, LogOut } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Hotel className="h-8 w-8 text-blue-800" />
              <span className="ml-2 font-bold text-xl text-blue-800">HotelManager</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-blue-800">
                  Dashboard
                </Link>
                <Link to="/rooms" className="px-3 py-2 text-gray-700 hover:text-blue-800">
                  Rooms
                </Link>
                <Link to="/bookings" className="px-3 py-2 text-gray-700 hover:text-blue-800">
                  Bookings
                </Link>
                <Link to="/staff" className="px-3 py-2 text-gray-700 hover:text-blue-800">
                  Staff
                </Link>
                <div className="ml-4 flex items-center">
                  <span className="mr-2 text-gray-700">Hello, {user?.name}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-800">
                  Home
                </Link>
                <Link to="/booking" className="px-3 py-2 text-gray-700 hover:text-blue-800">
                  Book a Room
                </Link>
                <div className="ml-4">
                  <Link to="/login">
                    <Button variant="primary" size="sm">
                      Admin Login
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/rooms" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100"
                >
                  Rooms
                </Link>
                <Link 
                  to="/bookings" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100"
                >
                  Bookings
                </Link>
                <Link 
                  to="/staff" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100"
                >
                  Staff
                </Link>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="px-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                  <div className="mt-3 px-3">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-100 hover:text-red-700"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100"
                >
                  Home
                </Link>
                <Link 
                  to="/booking" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100"
                >
                  Book a Room
                </Link>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-800 hover:bg-gray-100"
                >
                  Admin Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;