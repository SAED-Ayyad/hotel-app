import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';

const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Hotel Manager</h3>
              <p className="text-gray-300">
                Providing exceptional hospitality and accommodation services since 2023.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="/booking" className="text-gray-300 hover:text-white">Book a Room</a></li>
                <li><a href="/login" className="text-gray-300 hover:text-white">Admin Login</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-gray-300 not-italic">
                <p>123 Hotel Street</p>
                <p>Beautiful City, BC 12345</p>
                <p className="mt-2">Phone: (123) 456-7890</p>
                <p>Email: info@hotelmanager.com</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Hotel Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;