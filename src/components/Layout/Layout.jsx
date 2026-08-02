import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function Layout() {
  const { state } = useQuiz();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
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
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;