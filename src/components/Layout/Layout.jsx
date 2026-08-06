// src/components/Layout/Layout.jsx
import React, { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function Layout() {
  const { state, isQuizActive } = useQuiz();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = state.darkMode;

  // If not authenticated, redirect to landing page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <div className="gradient-bg min-h-screen flex flex-col">
        {/* ✅ Hide Navbar when quiz is active */}
        {!isQuizActive && <Header />}
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;