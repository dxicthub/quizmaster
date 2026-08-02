import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import { QuizProvider } from './context/QuizContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import Layout from './components/Layout/Layout.jsx';
import LandingPage from './pages/Landing/LandingPage.jsx';
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import QuizPage from './pages/Quiz/QuizPage.jsx';
import ResultsPage from './pages/Results/ResultsPage.jsx';
import Profile from './pages/Profile/Profile.jsx';
import History from './pages/History/History.jsx';
import { ProtectedRoute } from './components/Auth/ProtectedRoute.jsx';
import AdminLogin from './pages/Admin/Login.jsx';
import AdminLayout from './components/Admin/AdminLayout.jsx';
import AdminDashboard from './pages/Admin/Dashboard.jsx';
import AdminStudents from './pages/Admin/Students.jsx';
import AdminQuizzes from './pages/Admin/Quizzes.jsx';
import AdminResults from './pages/Admin/Results.jsx';
import AdminAnalytics from './pages/Admin/Analytics.jsx';
import AdminLeaderboard from './pages/Admin/Leaderboard.jsx';
import AdminCategories from './pages/Admin/Categories.jsx';
import AdminHistory from './pages/Admin/History.jsx';
import AdminTopPerformers from './pages/Admin/TopPerformers.jsx';
import AdminReports from './pages/Admin/Reports.jsx';
import AdminSettings from './pages/Admin/Settings.jsx';
import AdminArchive from './pages/Admin/Archive.jsx';
import AdminActivity from './pages/Admin/Activity.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Component to handle page title updates
function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    // Define titles for each route
    const routeTitles = {
      '/': 'Home',
      '/register': 'Register',
      '/login': 'Student Login',
      '/admin/login': 'Admin Login',
      '/admin/dashboard': 'Admin Dashboard',
      '/admin/students': 'Student Management',
      '/admin/archive': 'Archived Students',
      '/admin/quizzes': 'Quiz Management',
      '/admin/results': 'Quiz Results',
      '/admin/analytics': 'Analytics Dashboard',
      '/admin/leaderboard': 'Leaderboard',
      '/admin/activity': 'Activity Log',
      '/admin/categories': 'Quiz Categories',
      '/admin/history': 'Activity History',
      '/admin/top-performers': 'Top Performers',
      '/admin/reports': 'Reports',
      '/admin/settings': 'Settings',
      '/app': 'Student Dashboard',
      '/app/quiz': 'Quiz',
      '/app/results': 'Quiz Results',
      '/app/profile': 'My Profile',
      '/app/history': 'Quiz History',
    };

    // Check if the current path matches any route
    let pageTitle = 'QuizMaster';
    
    // Exact match
    if (routeTitles[location.pathname]) {
      pageTitle = `QuizMaster - ${routeTitles[location.pathname]}`;
    } else {
      // Check for dynamic routes (like /app/quiz/:topic)
      for (const [route, title] of Object.entries(routeTitles)) {
        if (route.includes(':')) {
          const routePattern = route.replace(/:\w+/g, '[^/]+');
          const regex = new RegExp(`^${routePattern}$`);
          if (regex.test(location.pathname)) {
            pageTitle = `QuizMaster - ${title}`;
            break;
          }
        }
      }
    }

    // Update the document title
    document.title = pageTitle;
  }, [location]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <QuizProvider>
            <Router>
              <PageTitleUpdater />
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    fontWeight: '500',
                  },
                }}
              />
              <Routes>
                {/* Landing Page - Default Route */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Public Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="archive" element={<AdminArchive />} />
                  <Route path="quizzes" element={<AdminQuizzes />} />
                  <Route path="results" element={<AdminResults />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="leaderboard" element={<AdminLeaderboard />} />
                  <Route path="activity" element={<AdminActivity />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="history" element={<AdminHistory />} />
                  <Route path="top-performers" element={<AdminTopPerformers />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                {/* Protected Student Routes */}
                <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route index element={<Dashboard />} />
                  <Route path="quiz/:topic" element={<QuizPage />} />
                  <Route path="results" element={<ResultsPage />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="history" element={<History />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </QuizProvider>
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;