// components/Admin/AdminLayout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTachometerAlt, FaUsers, FaBook, FaChartBar, 
  FaCrown, FaHistory, FaFileAlt, FaCog, 
  FaSignOutAlt, FaBars, FaTimes, FaUserShield,
  FaArchive, FaClipboardList, FaRocket,
  FaBell, FaSearch, FaUserCircle, FaChevronDown,
  FaSun, FaMoon, FaDatabase, FaChartPie, FaAward,
  FaGraduationCap, FaSlidersH, FaFileExport,
  FaThLarge, FaList, FaQuestionCircle,
  FaChartLine, FaFire, FaStar, FaShieldAlt,
  FaUserFriends, FaGift
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New student registered', time: '5 min ago', read: false, icon: FaUserFriends },
    { id: 2, title: 'Quiz "JavaScript Basics" completed', time: '1 hour ago', read: false, icon: FaBook },
    { id: 3, title: 'New quiz attempt', time: '3 hours ago', read: true, icon: FaChartBar },
    { id: 4, title: 'System update available', time: '1 day ago', read: true, icon: FaRocket },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const profileTimerRef = useRef(null);
  const notificationTimerRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, admin } = useAdmin();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt, badge: null },
    { path: '/admin/students', label: 'Students', icon: FaUsers, badge: null },
    { path: '/admin/archive', label: 'Archive', icon: FaArchive, badge: null },
    { path: '/admin/quizzes', label: 'Quizzes', icon: FaBook, badge: null },
    { path: '/admin/results', label: 'Results', icon: FaClipboardList, badge: null },
    { path: '/admin/analytics', label: 'Analytics', icon: FaChartBar, badge: '🔥' },
    { path: '/admin/leaderboard', label: 'Leaderboard', icon: FaCrown, badge: '🏆' },
    { path: '/admin/activity', label: 'Activity', icon: FaHistory, badge: null },
    { path: '/admin/reports', label: 'Reports', icon: FaFileExport, badge: null },
    { path: '/admin/settings', label: 'Settings', icon: FaCog, badge: null },
  ];

  // Profile menu hover handlers
  const handleProfileMouseEnter = () => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }
    if (profileTimerRef.current) {
      clearTimeout(profileTimerRef.current);
      profileTimerRef.current = null;
    }
    setShowProfileMenu(true);
  };

  const handleProfileMouseLeave = () => {
    if (profileTimerRef.current) {
      clearTimeout(profileTimerRef.current);
    }
    profileTimerRef.current = setTimeout(() => {
      setShowProfileMenu(false);
    }, 200);
  };

  const handleNotificationMouseEnter = () => {
    if (profileTimerRef.current) {
      clearTimeout(profileTimerRef.current);
      profileTimerRef.current = null;
    }
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }
    setShowNotifications(true);
  };

  const handleNotificationMouseLeave = () => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }
    notificationTimerRef.current = setTimeout(() => {
      setShowNotifications(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (profileTimerRef.current) {
        clearTimeout(profileTimerRef.current);
      }
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
        setMobileOpen(false);
      } else {
        setSidebarOpen(true);
        setMobileOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigateToProfile = () => {
    setShowProfileMenu(false);
    navigate('/admin/profile');
  };

  const handleNavigateToSettings = () => {
    setShowProfileMenu(false);
    navigate('/admin/settings');
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    
    try {
      const result = await Swal.fire({
        title: 'Logout?',
        text: 'Are you sure you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#8b5cf6',
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel',
        backdrop: 'rgba(0,0,0,0.5)',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
          cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
        }
      });

      if (result.isConfirmed) {
        try {
          if (logout && typeof logout === 'function') {
            await logout();
          }
        } catch (logoutError) {
          console.warn('Logout function error:', logoutError);
        }
        
        const adminKeys = [
          'adminToken', 
          'adminSession', 
          'authState',
          'adminUser', 
          'adminData', 
          'adminAuth',
          'admin',
          'isAdminLoggedIn'
        ];
        
        adminKeys.forEach(key => {
          if (localStorage.getItem(key) !== null) {
            localStorage.removeItem(key);
          }
        });
        
        try {
          sessionStorage.clear();
        } catch (e) {
          console.warn('Could not clear sessionStorage:', e);
        }
        
        navigate('/admin/login', { replace: true });
        toast.success('Logged out successfully');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getCurrentPageTitle = () => {
    const current = navItems.find(item => location.pathname === item.path);
    return current ? current.label : 'Dashboard';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning 🌅';
    if (hour < 18) return 'Good Afternoon ☀️';
    return 'Good Evening 🌙';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    // Close other dropdowns
    setShowProfileMenu(false);
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ 
          x: sidebarOpen || mobileOpen ? 0 : -280,
          width: sidebarOpen || mobileOpen ? 280 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl z-50 overflow-hidden ${
          mobileOpen ? 'block' : 'hidden lg:block'
        }`}
        style={{ width: sidebarOpen || mobileOpen ? 280 : 0 }}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur-lg opacity-30 animate-pulse" />
                  <div className="relative p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/30">
                    <FaGraduationCap className="text-white text-2xl" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                    JEOQuiz
                  </h1>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                    Admin Panel
                  </p>
                </div>
              </div>
              {/* Close button for mobile */}
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <FaTimes className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="px-4 py-3 mx-4 mt-3 rounded-xl bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200/50 dark:border-purple-800/30 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">
                  {admin?.name?.charAt(0) || 'A'}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">
                  {admin?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {admin?.email || 'admin@jeoquiz.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    setMobileOpen(false);
                  }}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 dark:from-purple-500/30 dark:to-indigo-500/30 text-purple-700 dark:text-purple-300 shadow-lg shadow-purple-500/10' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
                    }
                  `}
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30' 
                      : 'bg-gray-100/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 group-hover:bg-purple-100/50 dark:group-hover:bg-purple-900/30'
                  }`}>
                    <Icon className={`text-sm ${isActive ? 'text-white' : ''}`} />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-xs">{item.badge}</span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-3 w-1.5 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full shadow-lg shadow-purple-500/30"
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer - Logout Button */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="p-2 rounded-lg bg-rose-100/50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400 group-hover:scale-110 transition-transform">
                {isLoggingOut ? (
                  <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaSignOutAlt className="text-sm" />
                )}
              </div>
              <span className="font-medium text-sm">
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </span>
            </button>
            <div className="mt-3 text-center">
              <p className="text-[10px] text-gray-400 dark:text-gray-500">
                © 2024 JEOQuiz v2.0
              </p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-0'}`}
      >
        {/* Header */}
        <header className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50'
        }`}>
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle - Hamburger Icon */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <FaTimes className="text-gray-600 dark:text-gray-300 text-xl" />
                ) : (
                  <FaBars className="text-gray-600 dark:text-gray-300 text-xl" />
                )}
              </button>

              {/* Desktop Sidebar Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <FaBars className="text-gray-600 dark:text-gray-300" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {getCurrentPageTitle()}
                  </h2>
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-600 dark:text-purple-400 rounded-full border border-purple-200/50 dark:border-purple-700/30">
                    Admin
                  </span>
                  {isScrolled && (
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200/50 dark:border-emerald-700/30">
                      Live
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:flex items-center gap-2">
                  <span className="text-purple-500">{getGreeting()}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <span>{new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Header Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-2.5 rounded-xl hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-all duration-300 group relative"
                aria-label="Logout"
                title="Logout"
              >
                {isLoggingOut ? (
                  <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaSignOutAlt className="text-gray-600 dark:text-gray-300 text-lg group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors group-hover:scale-110" />
                )}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors relative group"
                aria-label="Toggle dark mode"
              >
                <div className="relative">
                  {isDarkMode ? (
                    <FaSun className="text-amber-500 text-lg group-hover:rotate-90 transition-transform duration-300" />
                  ) : (
                    <FaMoon className="text-gray-600 dark:text-gray-300 text-lg group-hover:rotate-12 transition-transform duration-300" />
                  )}
                </div>
              </button>

              {/* Notification Bell */}
              <div 
                className="relative"
                onMouseEnter={handleNotificationMouseEnter}
                onMouseLeave={handleNotificationMouseLeave}
                ref={notificationRef}
              >
                <button
                  className="p-2.5 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors relative group"
                  aria-label="Notifications"
                >
                  <FaBell className="text-gray-600 dark:text-gray-300 text-lg group-hover:scale-110 transition-transform" />
                  {unreadCount > 0 && (
                    <>
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full" />
                    </>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-xl z-50"
                    >
                      <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                            <FaBell className="text-purple-500 text-sm" />
                          </div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-purple-600 dark:text-purple-400 hover:underline transition-colors"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            <FaBell className="text-4xl mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No notifications</p>
                          </div>
                        ) : (
                          notifications.map((notif) => {
                            const Icon = notif.icon;
                            return (
                              <div
                                key={notif.id}
                                className={`px-4 py-3 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border-l-2 ${
                                  !notif.read 
                                    ? 'border-purple-500 bg-purple-50/30 dark:bg-purple-900/10' 
                                    : 'border-transparent'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`p-1.5 rounded-lg ${!notif.read ? 'bg-purple-100/50 dark:bg-purple-900/30' : 'bg-gray-100/50 dark:bg-gray-700/50'}`}>
                                    <Icon className={`text-sm ${!notif.read ? 'text-purple-500' : 'text-gray-400'}`} />
                                  </div>
                                  <div className="flex-1">
                                    <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
                                      {notif.title}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                      {notif.time}
                                    </p>
                                  </div>
                                  {!notif.read && (
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5" />
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Menu */}
              <div 
                className="relative"
                onMouseEnter={handleProfileMouseEnter}
                onMouseLeave={handleProfileMouseLeave}
                ref={profileMenuRef}
              >
                <button
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors group"
                  aria-label="Profile menu"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                      {admin?.name?.charAt(0) || 'A'}
                    </div>
                  </div>
                  <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-xl z-50"
                    >
                      <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/30 to-indigo-50/30 dark:from-purple-900/10 dark:to-indigo-900/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">
                            {admin?.name?.charAt(0) || 'A'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {admin?.name || 'Admin User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {admin?.email || 'admin@jeoquiz.com'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleNavigateToProfile}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300 group"
                        >
                          <FaUserCircle className="text-gray-400 group-hover:scale-110 transition-transform" />
                          <span className="text-sm">Profile</span>
                        </button>
                        
                        <button
                          onClick={handleNavigateToSettings}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300 group"
                        >
                          <FaCog className="text-gray-400 group-hover:scale-110 transition-transform" />
                          <span className="text-sm">Settings</span>
                        </button>
                        
                        <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-1" />
                        
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-colors text-rose-600 dark:text-rose-400 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoggingOut ? (
                            <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <FaSignOutAlt className="text-rose-400 group-hover:scale-110 transition-transform" />
                          )}
                          <span className="text-sm">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #6366f1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #4f46e5);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;