import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Try to import DataSync, use fallback if not available
let DataSync = null;
try {
  DataSync = require('../utils/dataSync.js').DataSync;
} catch (e) {
  console.warn('DataSync module not found, using fallback');
  // Fallback implementation
  DataSync = {
    broadcastChange: () => {},
    listenBroadcast: () => () => {},
    initStorageSync: () => () => {},
    syncData: () => {}
  };
}

const initialState = {
  isAdminAuthenticated: false,
  admin: null,
  students: [],
  quizCategories: [],
  quizAttempts: [],
  activityLogs: [],
  archivedStudents: [],
  settings: {},
};

const AdminContext = createContext();

export function AdminProvider({ children }) {
  console.log('🔄 AdminProvider initializing...');

  const [state, setState] = useState(() => {
    console.log('📂 Loading admin state from localStorage...');
    const saved = localStorage.getItem('adminState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('✅ Admin state loaded:', parsed);
        return parsed;
      } catch (e) {
        console.error('❌ Error parsing admin state:', e);
        return initialState;
      }
    }
    console.log('📂 No saved admin state, using initial state');
    return initialState;
  });

  useEffect(() => {
    console.log('💾 Saving admin state to localStorage:', state);
    localStorage.setItem('adminState', JSON.stringify(state));
  }, [state]);

  // Sync data across tabs
  useEffect(() => {
    console.log('🔄 Setting up data sync...');
    if (DataSync && DataSync.listenBroadcast) {
      const unsubscribe = DataSync.listenBroadcast((key, data) => {
        console.log('📡 Received broadcast:', { key, data });
        if (key === 'students' || key === 'quizCategories' || key === 'quizAttempts' || key === 'activityLogs') {
          if (key === 'students') loadStudents();
          else if (key === 'quizCategories') loadQuizCategories();
          else if (key === 'quizAttempts') loadQuizAttempts();
          else if (key === 'activityLogs') loadActivityLogs();
        }
      });

      return () => {
        console.log('🔄 Cleaning up data sync...');
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  // Admin login
  const adminLogin = (email, password) => {
    console.log('🔐 Admin Login Attempt STARTED');
    console.log('📧 Email provided:', email);
    console.log('🔑 Password provided:', password);
    
    const adminEmail = 'admin@quizmaster.com';
    const adminPassword = 'Admin@2024';
    
    console.log('📌 Expected Email:', adminEmail);
    console.log('📌 Expected Password:', adminPassword);
    console.log('📌 Email matches?', email === adminEmail);
    console.log('📌 Password matches?', password === adminPassword);
    
    if (email === adminEmail && password === adminPassword) {
      console.log('✅ Credentials MATCH! Logging in admin...');
      const adminUser = { email, name: 'Administrator' };
      
      console.log('📌 Setting admin state:', { isAdminAuthenticated: true, admin: adminUser });
      setState({
        ...state,
        isAdminAuthenticated: true,
        admin: adminUser,
      });
      
      // Log admin login activity
      console.log('📝 Logging admin activity...');
      logActivity({
        action: 'Admin Login',
        description: 'Admin logged in successfully',
        user: adminUser.name,
        role: 'Admin',
        details: { email: adminUser.email }
      });
      
      console.log('✅ Toast success message');
      toast.success('Welcome back, Administrator! 👋');
      console.log('✅ Admin login SUCCESSFUL, returning true');
      return true;
    }
    
    console.log('❌ Credentials DO NOT match!');
    console.log('❌ Login FAILED');
    toast.error('Invalid admin credentials');
    return false;
  };

  // Admin logout
  const adminLogout = () => {
    console.log('🔴 Admin logout initiated');
    // Log admin logout before clearing state
    if (state.admin) {
      logActivity({
        action: 'Admin Logout',
        description: 'Admin logged out',
        user: state.admin.name,
        role: 'Admin',
        details: { email: state.admin.email }
      });
    }
    
    setState({
      ...state,
      isAdminAuthenticated: false,
      admin: null,
    });
    
    // Clear any admin-related data from localStorage
    localStorage.removeItem('adminState');
    localStorage.removeItem('adminAuth');
    
    toast.info('Logged out successfully');
    console.log('🔴 Admin logout complete');
  };

  // Log activity function
  const logActivity = (activity) => {
    try {
      console.log('📝 Logging activity:', activity);
      const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
      const newLog = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        ...activity,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      logs.unshift(newLog);
      localStorage.setItem('activityLogs', JSON.stringify(logs));
      
      // Update state
      setState(prev => ({
        ...prev,
        activityLogs: logs
      }));
      
      // Broadcast to other tabs
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('activityLogs', JSON.stringify(logs));
      }
      console.log('✅ Activity logged successfully');
    } catch (error) {
      console.error('❌ Error logging activity:', error);
    }
  };

  // Load activity logs
  const loadActivityLogs = () => {
    console.log('📂 Loading activity logs...');
    const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    setState(prev => ({ ...prev, activityLogs: logs }));
    console.log('✅ Activity logs loaded:', logs.length);
    return logs;
  };

  // Load students from localStorage
  const loadStudents = () => {
    console.log('📂 Loading students...');
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    setState({ ...state, students });
    console.log('✅ Students loaded:', students.length);
    return students;
  };

  // Load quiz attempts
  const loadQuizAttempts = () => {
    console.log('📂 Loading quiz attempts...');
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
    setState({ ...state, quizAttempts: attempts });
    console.log('✅ Quiz attempts loaded:', attempts.length);
    return attempts;
  };

  // Load quiz categories
  const loadQuizCategories = () => {
    console.log('📂 Loading quiz categories...');
    const categories = JSON.parse(localStorage.getItem('quizCategories') || '[]');
    setState({ ...state, quizCategories: categories });
    console.log('✅ Quiz categories loaded:', categories.length);
    return categories;
  };

  // Load archived students
  const loadArchivedStudents = () => {
    console.log('📂 Loading archived students...');
    const archived = JSON.parse(localStorage.getItem('archivedStudents') || '[]');
    setState({ ...state, archivedStudents: archived });
    console.log('✅ Archived students loaded:', archived.length);
    return archived;
  };

  // Reset student passcode
  const resetPasscode = (studentId) => {
    console.log('🔄 Resetting passcode for student:', studentId);
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const index = students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      const newPasscode = 'QZ-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      students[index].passcode = newPasscode;
      localStorage.setItem('students', JSON.stringify(students));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(students));
      }
      
      logActivity({
        action: 'Student Passcode Reset',
        description: `Passcode reset for ${students[index].fullName}`,
        user: state.admin?.name || 'Admin',
        role: 'Admin',
        details: { student: students[index].fullName, newPasscode }
      });
      
      toast.success(`Passcode reset successfully for ${students[index].fullName}`);
      loadStudents();
      console.log('✅ Passcode reset successful:', newPasscode);
      return newPasscode;
    }
    console.log('❌ Student not found:', studentId);
    return null;
  };

  // Archive student
  const archiveStudent = (studentId) => {
    console.log('📦 Archiving student:', studentId);
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const index = students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      const student = students[index];
      console.log('📦 Archiving student:', student.fullName);
      
      // Move to archived
      const archived = JSON.parse(localStorage.getItem('archivedStudents') || '[]');
      archived.push({
        ...student,
        archivedAt: new Date().toISOString(),
        archivedBy: state.admin?.name || 'Admin'
      });
      localStorage.setItem('archivedStudents', JSON.stringify(archived));
      
      // Remove from active students
      const filtered = students.filter(s => s.id !== studentId);
      localStorage.setItem('students', JSON.stringify(filtered));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(filtered));
        DataSync.broadcastChange('archivedStudents', JSON.stringify(archived));
      }
      
      logActivity({
        action: 'Student Archived',
        description: `Student ${student.fullName} was archived`,
        user: state.admin?.name || 'Admin',
        role: 'Admin',
        details: { student: student.fullName, email: student.email }
      });
      
      toast.success(`Student "${student.fullName}" has been archived.`);
      loadStudents();
      loadArchivedStudents();
      console.log('✅ Student archived successfully');
    } else {
      console.log('❌ Student not found:', studentId);
    }
  };

  // Restore student from archive
  const restoreStudent = (studentId) => {
    console.log('🔄 Restoring student from archive:', studentId);
    const archived = JSON.parse(localStorage.getItem('archivedStudents') || '[]');
    const index = archived.findIndex(s => s.id === studentId);
    if (index !== -1) {
      const student = archived[index];
      console.log('🔄 Restoring student:', student.fullName);
      
      // Remove from archived
      const filtered = archived.filter(s => s.id !== studentId);
      localStorage.setItem('archivedStudents', JSON.stringify(filtered));
      
      // Add back to active students
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const restoredStudent = {
        ...student,
        isActive: true,
        restoredAt: new Date().toISOString(),
        restoredBy: state.admin?.name || 'Admin'
      };
      delete restoredStudent.archivedAt;
      delete restoredStudent.archivedBy;
      students.push(restoredStudent);
      localStorage.setItem('students', JSON.stringify(students));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(students));
        DataSync.broadcastChange('archivedStudents', JSON.stringify(filtered));
      }
      
      logActivity({
        action: 'Student Restored',
        description: `Student ${student.fullName} was restored from archive`,
        user: state.admin?.name || 'Admin',
        role: 'Admin',
        details: { student: student.fullName, email: student.email }
      });
      
      toast.success(`Student "${student.fullName}" has been restored.`);
      loadStudents();
      loadArchivedStudents();
      console.log('✅ Student restored successfully');
    } else {
      console.log('❌ Student not found in archive:', studentId);
    }
  };

  // Permanently delete student from archive
  const permanentDeleteStudent = (studentId) => {
    console.log('🗑️ Permanently deleting student from archive:', studentId);
    const archived = JSON.parse(localStorage.getItem('archivedStudents') || '[]');
    const index = archived.findIndex(s => s.id === studentId);
    if (index !== -1) {
      const student = archived[index];
      console.log('🗑️ Deleting student:', student.fullName);
      const filtered = archived.filter(s => s.id !== studentId);
      localStorage.setItem('archivedStudents', JSON.stringify(filtered));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('archivedStudents', JSON.stringify(filtered));
      }
      
      logActivity({
        action: 'Student Permanently Deleted',
        description: `Student ${student.fullName} was permanently deleted from archive`,
        user: state.admin?.name || 'Admin',
        role: 'Admin',
        details: { student: student.fullName, email: student.email }
      });
      
      toast.success(`Student "${student.fullName}" has been permanently deleted.`);
      loadArchivedStudents();
      console.log('✅ Student permanently deleted');
    } else {
      console.log('❌ Student not found in archive:', studentId);
    }
  };

  // Delete student (legacy - now uses archive)
  const deleteStudent = (studentId) => {
    console.log('🗑️ Delete student called (archiving instead):', studentId);
    archiveStudent(studentId);
  };

  // Toggle student status
  const toggleStudentStatus = (studentId) => {
    console.log('🔄 Toggling student status:', studentId);
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const index = students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      students[index].isActive = !students[index].isActive;
      localStorage.setItem('students', JSON.stringify(students));
      
      if (DataSync && DataSync.broadcastChange) {
        DataSync.broadcastChange('students', JSON.stringify(students));
      }
      
      const status = students[index].isActive ? 'activated' : 'deactivated';
      logActivity({
        action: `Student ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        description: `Student ${students[index].fullName} was ${status}`,
        user: state.admin?.name || 'Admin',
        role: 'Admin',
        details: { student: students[index].fullName, status }
      });
      
      toast.success(`Student ${students[index].isActive ? 'activated' : 'deactivated'}`);
      loadStudents();
      console.log('✅ Student status toggled:', status);
    } else {
      console.log('❌ Student not found:', studentId);
    }
  };

  // Add quiz attempt with logging
  const addQuizAttempt = (attempt) => {
    console.log('📝 Adding quiz attempt:', attempt);
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
    attempts.push({
      ...attempt,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));
    
    if (DataSync && DataSync.broadcastChange) {
      DataSync.broadcastChange('quizAttempts', JSON.stringify(attempts));
    }
    
    // Log activity based on score
    const isPassed = attempt.score >= 90;
    logActivity({
      action: isPassed ? 'Quiz Passed' : 'Quiz Failed',
      description: `${attempt.studentName || 'Student'} ${isPassed ? 'passed' : 'failed'} "${attempt.quizTitle}" with ${attempt.score}%`,
      user: attempt.studentName || 'Student',
      role: 'Student',
      details: { 
        quiz: attempt.quizTitle, 
        score: attempt.score,
        passed: isPassed
      }
    });
    
    loadQuizAttempts();
    console.log('✅ Quiz attempt added');
  };

  const getQuizStatistics = () => {
    console.log('📊 Getting quiz statistics...');
    const attempts = state.quizAttempts;
    const totalAttempts = attempts.length;
    const passed = attempts.filter(a => a.score >= 90).length;
    const failed = attempts.filter(a => a.score < 90).length;
    const averageScore = totalAttempts > 0 
      ? Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts)
      : 0;

    const stats = {
      totalAttempts,
      passed,
      failed,
      averageScore,
      passRate: totalAttempts > 0 ? Math.round((passed / totalAttempts) * 100) : 0,
    };
    console.log('📊 Quiz statistics:', stats);
    return stats;
  };

  const getStudentStatistics = () => {
    console.log('📊 Getting student statistics...');
    const students = state.students;
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.isActive !== false).length;
    const inactiveStudents = totalStudents - activeStudents;
    
    let totalQuizzesTaken = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    
    students.forEach(student => {
      const history = student.quizHistory || [];
      totalQuizzesTaken += history.length;
      totalPassed += history.filter(h => h.score >= 90).length;
      totalFailed += history.filter(h => h.score < 90).length;
    });

    const stats = {
      totalStudents,
      activeStudents,
      inactiveStudents,
      totalQuizzesTaken,
      totalPassed,
      totalFailed,
    };
    console.log('📊 Student statistics:', stats);
    return stats;
  };

  const value = {
    state,
    adminLogin,
    adminLogout,
    loadStudents,
    loadQuizAttempts,
    loadQuizCategories,
    loadArchivedStudents,
    loadActivityLogs,
    resetPasscode,
    deleteStudent,
    archiveStudent,
    restoreStudent,
    permanentDeleteStudent,
    toggleStudentStatus,
    addQuizAttempt,
    logActivity,
    getQuizStatistics,
    getStudentStatistics,
    isAdminAuthenticated: state.isAdminAuthenticated,
    admin: state.admin,
    students: state.students,
    quizAttempts: state.quizAttempts,
    quizCategories: state.quizCategories,
    archivedStudents: state.archivedStudents,
    activityLogs: state.activityLogs,
  };

  console.log('✅ AdminProvider initialized with state:', state);

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}