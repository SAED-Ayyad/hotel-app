import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bed, 
  Calendar,
  Users,
  Settings,
  BarChart
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Rooms',
      path: '/rooms',
      icon: <Bed className="h-5 w-5" />,
    },
    {
      name: 'Bookings',
      path: '/bookings',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: 'Staff',
      path: '/staff',
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white shadow-md">
      <div className="h-full px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-md 
                ${location.pathname === item.path
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-800'
                }
              `}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;