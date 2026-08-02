import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Try to import DataSync, use fallback if not available
let DataSync = null;
try {
  DataSync = require('../utils/dataSync.js').DataSync;
} catch (e) {
  console.warn('DataSync module not found, using fallback');
  DataSync = {
    broadcastChange: () => {},
    listenBroadcast: () => () => {},
    initStorageSync: () => () => {},
    syncData: () => {}
  };
}

// Initial state
const initialState = {
  student: null,
  isAuthenticated: false,
  passcode: null,
  registrationComplete: false,
};

// Create context
const AuthContext = createContext();

// Generate verification token
const generateVerificationToken = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
};

// Provider component
export function AuthProvider({ children }) {
  const [state, setState] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('authState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed;
      } catch (e) {
        return initialState;
      }
    }
    return initialState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  // Sync data across tabs
  useEffect(() => {
    if (DataSync && DataSync.listenBroadcast) {
      const unsubscribe = DataSync.listenBroadcast((key, data) => {
        if (key === 'students') {
          // Refresh student data if it's a student update
          if (state.isAuthenticated && state.student) {
            const students = JSON.parse(data || '[]');
            const currentStudent = students.find(s => s.id === state.student?.id);
            if (currentStudent && currentStudent.isActive === false) {
              // Account was deactivated in another tab
              validateSession();
            }
          }
          // Trigger a refresh
          window.dispatchEvent(new Event('storage'));
        }
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [state.isAuthenticated]);

  // Check if student account is active
  const isAccountActive = (student) => {
    if (!student) return false;
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const currentStudent = students.find(s => s.id === student.id);
    return currentStudent && currentStudent.isActive !== false;
  };

  // Check if email is verified
  const isEmailVerified = (email) => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find(s => s.email?.toLowerCase() === email?.toLowerCase());
    return student?.emailVerified === true;
  };

  // Log student activity
  const logStudentActivity = (action, description, details = {}) => {
    try {
      const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
      const newLog = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        action,
        description,
        user: state.student?.fullName || 'Student',
        role: 'Student',
        details,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      logs.unshift(newLog);
      localStorage.setItem('activityLogs', JSON.stringify(logs));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('activityLogs', JSON.stringify(logs));
      }
    } catch (error) {
      console.error('Error logging student activity:', error);
    }
  };

  // Check and validate session
  const validateSession = () => {
    if (state.isAuthenticated && state.student) {
      const isActive = isAccountActive(state.student);
      if (!isActive) {
        logStudentActivity(
          'Account Deactivated',
          `Account for ${state.student.fullName} was deactivated`,
          { email: state.student.email }
        );
        setState({
          student: null,
          isAuthenticated: false,
          passcode: null,
          registrationComplete: false,
        });
        localStorage.removeItem('authState');
        toast.error('Your account has been deactivated. Please contact support.');
        return false;
      }
      
      // Check if email is verified for active sessions
      if (state.student && !state.student.emailVerified) {
        // Force logout if email not verified
        logStudentActivity(
          'Session Terminated',
          `Session terminated for ${state.student.fullName} - email not verified`,
          { email: state.student.email }
        );
        setState({
          student: null,
          isAuthenticated: false,
          passcode: null,
          registrationComplete: false,
        });
        localStorage.removeItem('authState');
        toast.error('Please verify your email before logging in.');
        return false;
      }
      
      return true;
    }
    return false;
  };

  // Run session validation on mount and periodically
  useEffect(() => {
    validateSession();
    
    const interval = setInterval(() => {
      validateSession();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [state.isAuthenticated]);

  // Register a new student with email verification
  const registerStudent = (studentData, newStudentData) => {
    // If newStudentData is provided (from Register component), use it directly
    if (newStudentData) {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      
      // Check if the student already exists
      const existingStudent = students.find(s => s.id === newStudentData.id);
      
      if (existingStudent) {
        // Student already exists, update auth state
        setState({
          student: existingStudent,
          isAuthenticated: false,
          passcode: existingStudent.passcode,
          registrationComplete: false,
        });
        return true;
      }
      
      // Add the new student (shouldn't happen since Register already saved)
      students.push(newStudentData);
      localStorage.setItem('students', JSON.stringify(students));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(students));
      }
      
      logStudentActivity(
        'Student Registered',
        `New student account created: ${newStudentData.fullName}`,
        { email: newStudentData.email, phone: newStudentData.phone }
      );
      
      setState({
        student: newStudentData,
        isAuthenticated: false,
        passcode: newStudentData.passcode,
        registrationComplete: false,
      });
      
      return true;
    }
    
    // Fallback for backward compatibility
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    
    // Check for duplicate email
    if (students.some(s => s.email?.toLowerCase() === studentData.email?.toLowerCase())) {
      toast.error('This email is already registered. Please login.');
      return false;
    }

    // Generate unique passcode
    let passcode = 'QZ-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    while (students.some(s => s.passcode === passcode)) {
      passcode = 'QZ-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    const newStudent = {
      id: Date.now().toString(),
      ...studentData,
      passcode,
      isActive: true,
      registeredAt: new Date().toISOString(),
      lastLogin: null,
      quizHistory: [],
      favorites: [],
      emailVerified: false,
      verificationToken: generateVerificationToken(),
      verificationTokenCreatedAt: Date.now(),
    };

    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    if (DataSync && DataSync.broadcastChange) {
      DataSync.broadcastChange('students', JSON.stringify(students));
    }

    logStudentActivity(
      'Student Registered',
      `New student account created: ${newStudent.fullName}`,
      { email: newStudent.email, phone: newStudent.phone }
    );

    // Don't set as authenticated until email is verified
    setState({
      student: newStudent,
      isAuthenticated: false,
      passcode,
      registrationComplete: false,
    });

    return true;
  };

  // Verify email
  const verifyEmail = (token) => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const studentIndex = students.findIndex(s => s.verificationToken === token);
    
    if (studentIndex === -1) {
      return { success: false, message: 'Invalid verification token.' };
    }

    const student = students[studentIndex];

    if (student.emailVerified) {
      return { success: false, message: 'Email already verified.' };
    }

    // Check token expiration (24 hours)
    const tokenAge = Date.now() - student.verificationTokenCreatedAt;
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (tokenAge > twentyFourHours) {
      return { success: false, message: 'Verification link has expired.' };
    }

    // Mark email as verified
    students[studentIndex].emailVerified = true;
    students[studentIndex].verificationToken = null;
    students[studentIndex].verificationTokenCreatedAt = null;
    localStorage.setItem('students', JSON.stringify(students));

    if (DataSync && DataSync.broadcastChange) {
      DataSync.broadcastChange('students', JSON.stringify(students));
    }

    logStudentActivity(
      'Email Verified',
      `${student.fullName} verified their email`,
      { email: student.email }
    );

    return { success: true, student: students[studentIndex] };
  };

  // Resend verification email
  const resendVerificationEmail = (email) => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const studentIndex = students.findIndex(s => s.email?.toLowerCase() === email?.toLowerCase());
    
    if (studentIndex === -1) {
      return { success: false, message: 'User not found.' };
    }

    const student = students[studentIndex];

    if (student.emailVerified) {
      return { success: false, message: 'Email already verified.' };
    }

    // Generate new token
    const newToken = generateVerificationToken();
    students[studentIndex].verificationToken = newToken;
    students[studentIndex].verificationTokenCreatedAt = Date.now();
    localStorage.setItem('students', JSON.stringify(students));

    if (DataSync && DataSync.broadcastChange) {
      DataSync.broadcastChange('students', JSON.stringify(students));
    }

    return { 
      success: true, 
      token: newToken,
      email: student.email,
      name: student.fullName
    };
  };

  // Login with passcode - require email verification
  const loginWithPasscode = (email, passcode) => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find(
      s => s.email?.toLowerCase() === email?.toLowerCase() && s.passcode === passcode
    );

    if (student) {
      // Check if account is active
      if (student.isActive === false) {
        toast.error('Your account has been deactivated. Please contact support.');
        return { success: false, reason: 'deactivated' };
      }

      // Check if email is verified
      if (!student.emailVerified) {
        toast.error('Please verify your email address before logging in.');
        return { success: false, reason: 'unverified' };
      }

      // Update last login
      const updatedStudents = students.map(s => {
        if (s.id === student.id) {
          return { ...s, lastLogin: new Date().toISOString() };
        }
        return s;
      });
      localStorage.setItem('students', JSON.stringify(updatedStudents));

      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(updatedStudents));
      }

      logStudentActivity(
        'Student Login',
        `${student.fullName} logged in`,
        { email: student.email }
      );

      setState({
        student: { ...student, lastLogin: new Date().toISOString() },
        isAuthenticated: true,
        passcode,
        registrationComplete: true,
      });
      
      toast.success(`Welcome back, ${student.fullName}! 👋`);
      return { success: true };
    }

    toast.error('Invalid email or passcode. Please try again.');
    return { success: false, reason: 'invalid' };
  };

  // Logout
  const logout = () => {
    if (state.student) {
      logStudentActivity(
        'Student Logout',
        `${state.student.fullName} logged out`,
        { email: state.student.email }
      );
    }

    setState({
      student: null,
      isAuthenticated: false,
      passcode: null,
      registrationComplete: false,
    });
    localStorage.removeItem('authState');
    toast.info('Logged out successfully.');
  };

  // Check if user is authenticated and active
  const checkAuth = () => {
    if (state.isAuthenticated && state.student) {
      const isActive = isAccountActive(state.student);
      if (!isActive) {
        logout();
        return false;
      }
      return true;
    }
    return false;
  };

  // Update student profile
  const updateStudent = (updates) => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const index = students.findIndex(s => s.id === state.student.id);
    if (index !== -1) {
      students[index] = { ...students[index], ...updates };
      localStorage.setItem('students', JSON.stringify(students));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(students));
      }

      logStudentActivity(
        'Profile Updated',
        `${state.student.fullName} updated their profile`,
        { updated: Object.keys(updates).join(', ') }
      );

      setState({
        ...state,
        student: students[index],
      });
      toast.success('Profile updated successfully!');
    }
  };

  // Add quiz to history
  const addQuizHistory = (quizResult) => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const index = students.findIndex(s => s.id === state.student.id);
    if (index !== -1) {
      students[index].quizHistory = [quizResult, ...(students[index].quizHistory || [])];
      localStorage.setItem('students', JSON.stringify(students));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(students));
      }

      const isPassed = quizResult.score >= 90;
      logStudentActivity(
        isPassed ? 'Quiz Passed' : 'Quiz Failed',
        `${state.student.fullName} ${isPassed ? 'passed' : 'failed'} "${quizResult.quizTitle}" with ${quizResult.score}%`,
        { 
          quiz: quizResult.quizTitle, 
          score: quizResult.score,
          passed: isPassed,
          total: quizResult.total,
          correct: quizResult.passed
        }
      );

      setState({
        ...state,
        student: students[index],
      });
    }
  };

  // Toggle favorite quiz
  const toggleFavorite = (quizId) => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const index = students.findIndex(s => s.id === state.student.id);
    if (index !== -1) {
      const favorites = students[index].favorites || [];
      const favIndex = favorites.indexOf(quizId);
      if (favIndex !== -1) {
        favorites.splice(favIndex, 1);
      } else {
        favorites.push(quizId);
      }
      students[index].favorites = favorites;
      localStorage.setItem('students', JSON.stringify(students));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(students));
      }

      setState({
        ...state,
        student: students[index],
      });
    }
  };

  // Manual refresh data
  const refreshData = () => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    if (state.isAuthenticated && state.student) {
      const currentStudent = students.find(s => s.id === state.student.id);
      if (currentStudent) {
        setState({
          ...state,
          student: currentStudent,
        });
      }
    }
    return students;
  };

  const value = {
    state,
    registerStudent,
    loginWithPasscode,
    logout,
    updateStudent,
    addQuizHistory,
    toggleFavorite,
    checkAuth,
    validateSession,
    isAccountActive,
    isEmailVerified,
    verifyEmail,
    resendVerificationEmail,
    refreshData,
    logStudentActivity,
    isAuthenticated: state.isAuthenticated && state.student && isAccountActive(state.student) && state.student.emailVerified !== false,
    student: state.student,
    passcode: state.passcode,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}