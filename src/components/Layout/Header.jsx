import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaGraduationCap, FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';

function Header() {
  const navigate = useNavigate();
  const { state, toggleDarkMode } = useQuiz();
  const { student, logout } = useAuth();
  const isDark = state.darkMode;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glassmorphism sticky top-0 z-50 border-b border-gray-200/20 dark:border-gray-700/30">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                QuizMaster
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                by JEO Digital Solutions
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Student Name */}
            {student && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/30">
                <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {student.fullName}
                </span>
              </div>
            )}

            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-700 dark:text-gray-300"
              aria-label="Home"
            >
              <FaHome />
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-700 dark:text-gray-300"
              aria-label="Profile"
            >
              <FaUser />
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-gray-700 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 text-red-500"
              aria-label="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;