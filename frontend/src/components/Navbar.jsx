import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Calculator, Building2, Info, Mail, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/listings', label: 'Listings', icon: <Building2 size={20} /> },
    { path: '/predict', label: 'Predict Price', icon: <Calculator size={20} /> },
    { path: '/about', label: 'About', icon: <Info size={20} /> },
    { path: '/contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  return (
    <nav className="fixed z-50 w-full border-b glass-effect border-white/10 dark:border-dark-700/30">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 transition-transform rounded-xl group-hover:scale-110">
              <img 
        src="/logo.png" 
        alt="Home Sage Logo" 
        className="w-auto h-16" ></img>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text">
                Home Sage
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Smart Real Estate</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-700'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 transition-colors bg-gray-100 rounded-full dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 bg-gray-100 rounded-full dark:bg-dark-700"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-gray-100 rounded-lg dark:bg-dark-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 md:hidden animate-slide-up">
            <div className="p-4 space-y-2 bg-white shadow-2xl dark:bg-dark-800 rounded-2xl">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path
                      ? 'bg-primary-500/10 text-primary-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;