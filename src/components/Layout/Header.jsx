import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaUser, FaSignOutAlt, FaSun, FaMoon,
  FaBars, FaTimes, FaUserCircle, FaHistory,
  FaChartBar, FaGraduationCap
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, logout } = useAuth();
  const { state, toggleDarkMode } = useQuiz();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(state.darkMode || false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Update dark mode state when context changes
  useEffect(() => {
    setIsDarkMode(state.darkMode || false);
  }, [state.darkMode]);

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        toast.success('Logged out successfully!');
        navigate('/');
      }
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Navigation items - Removed Profile from here since we have the icon on the right
  const navItems = [
    { path: '/app', label: 'Dashboard', icon: FaHome },
    { path: '/app/history', label: 'History', icon: FaHistory },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <Link to="/app" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent hidden sm:block">
                QuizMaster
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    active
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`text-lg ${active ? 'text-blue-500' : ''}`} />
                  <span>{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Student Name */}
            {student && (
              <span className="hidden md:block text-sm text-gray-700 dark:text-gray-300 mr-2">
                {student.fullName}
              </span>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={handleToggleDarkMode}
              className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>

            {/* Profile Icon - Desktop (Right side) */}
            <Link
              to="/app/profile"
              className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive('/app/profile')
                  ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
              }`}
              aria-label="Profile"
            >
              <FaUser className="text-lg" />
              <span className="text-sm font-medium">Profile</span>
              {isActive('/app/profile') && (
                <motion.div
                  layoutId="navbar-indicator-profile"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            {/* Logout Button with Text */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              aria-label="Logout"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="text-sm font-medium hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 text-gray-600 dark:text-gray-400"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {/* Dashboard */}
              <Link
                to="/app"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/app')
                    ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <FaHome className={`text-lg ${isActive('/app') ? 'text-blue-500' : ''}`} />
                <span>Dashboard</span>
                {isActive('/app') && (
                  <motion.div
                    layoutId="mobile-indicator-dashboard"
                    className="ml-auto w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>

              {/* History */}
              <Link
                to="/app/history"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/app/history')
                    ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <FaHistory className={`text-lg ${isActive('/app/history') ? 'text-blue-500' : ''}`} />
                <span>History</span>
                {isActive('/app/history') && (
                  <motion.div
                    layoutId="mobile-indicator-history"
                    className="ml-auto w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>

              {/* Profile - Mobile */}
              <Link
                to="/app/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/app/profile')
                    ? 'bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <FaUser className={`text-lg ${isActive('/app/profile') ? 'text-blue-500' : ''}`} />
                <span>Profile</span>
                {isActive('/app/profile') && (
                  <motion.div
                    layoutId="mobile-indicator-profile"
                    className="ml-auto w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>

              {/* Dark Mode Toggle - Mobile */}
              <button
                onClick={handleToggleDarkMode}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                {isDarkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {/* Logout - Mobile */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
              
              {/* Student Name in Mobile Menu */}
              {student && (
                <div className="px-4 py-2 mt-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-700/50">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {student.fullName}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;