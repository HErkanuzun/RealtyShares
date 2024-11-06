import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { IconHome2, IconBuilding, IconChartBar, IconUser } from '@tabler/icons-react';

const navItems = [
  { path: '/', label: 'Home', icon: IconHome2 },
  { path: '/properties', label: 'Properties', icon: IconBuilding },
  { path: '/market', label: 'Market', icon: IconChartBar },
  { path: '/profile', label: 'Profile', icon: IconUser },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white">
            RealtyShares
          </Link>
          
          <div className="flex space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === path 
                    ? 'text-white bg-white/20' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Icon className="w-5 h-5 mr-1" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};