import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaEye, FaHistory, FaKey, 
  FaUserTimes, FaTrash, FaUserCheck, FaUserGraduate,
  FaSort, FaSortUp, FaSortDown, FaArchive,
  FaUsers, FaUserPlus, FaFilter, FaTimes,
  FaSpinner, FaCrown, FaMedal, FaStar,
  FaArrowLeft, FaArrowRight, FaLightbulb,
  FaUser, FaMailBulk, FaPhone, FaCalendarAlt,
  FaChartLine, FaCheckCircle, FaTimesCircle,
  FaShieldAlt, FaRocket, FaGraduationCap
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function AdminStudents() {
  const { 
    students, 
    loadStudents, 
    resetPasscode, 
    archiveStudent, 
    toggleStudentStatus,
    loadArchivedStudents
  } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await loadStudents();
        await loadArchivedStudents();
      } catch (error) {
        console.error('Error loading students:', error);
        toast.error('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="text-purple-500" /> : <FaSortDown className="text-purple-500" />;
  };

  const filteredStudents = students
    .filter(student => {
      const matchesSearch = 
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm);
      
      const matchesStatus = 
        filterStatus === 'all' ||
        (filterStatus === 'active' && student.isActive !== false) ||
        (filterStatus === 'inactive' && student.isActive === false);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.isActive !== false).length;
  const inactiveStudents = totalStudents - activeStudents;
  const avgQuizzesPerStudent = totalStudents > 0 
    ? Math.round(students.reduce((acc, s) => acc + (s.quizHistory || []).length, 0) / totalStudents)
    : 0;

  const handleResetPasscode = (student) => {
    Swal.fire({
      title: 'Reset Passcode?',
      text: `Are you sure you want to reset ${student.fullName}'s passcode?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, reset',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newPasscode = resetPasscode(student.id);
        if (newPasscode) {
          Swal.fire({
            title: '✅ Passcode Reset',
            html: `
              <div class="text-left">
                <p class="text-gray-600 dark:text-gray-300 mb-2">New passcode for <strong>${student.fullName}</strong>:</p>
                <div class="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-4 rounded-xl text-center">
                  <code class="text-2xl font-bold text-purple-600 dark:text-purple-400 font-mono">${newPasscode}</code>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Please share this with the student securely.</p>
              </div>
            `,
            icon: 'success',
            confirmButtonColor: '#8b5cf6',
            confirmButtonText: 'Done',
            backdrop: 'rgba(0,0,0,0.5)',
            customClass: {
              popup: 'rounded-2xl shadow-2xl',
              confirmButton: 'px-6 py-2.5 rounded-xl font-semibold'
            }
          });
        }
      }
    });
  };

  const handleArchive = (student) => {
    Swal.fire({
      title: 'Archive Student?',
      html: `
        <div class="text-left">
          <p class="text-gray-600 dark:text-gray-300">This will archive <strong>${student.fullName}</strong>'s account.</p>
          <ul class="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
            <li>• The student will be moved to the Archive section</li>
            <li>• They will not be able to log in</li>
            <li>• They will not be able to access quizzes</li>
            <li>• Their data will be preserved</li>
          </ul>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#8b5cf6',
      confirmButtonText: 'Yes, archive',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        archiveStudent(student.id);
        loadStudents();
        toast.success(`${student.fullName} has been archived`);
      }
    });
  };

  const handleToggleStatus = (student) => {
    const action = student.isActive !== false ? 'deactivate' : 'activate';
    const isDeactivating = action === 'deactivate';
    
    Swal.fire({
      title: `${isDeactivating ? 'Deactivate' : 'Activate'} Account?`,
      html: `
        <div class="text-left">
          <p class="text-gray-600 dark:text-gray-300">
            ${isDeactivating 
              ? `This will deactivate <strong>${student.fullName}</strong>'s account.`
              : `This will reactivate <strong>${student.fullName}</strong>'s account.`
            }
          </p>
          <ul class="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
            ${isDeactivating ? `
              <li>• They will not be able to log in</li>
              <li>• They will not be able to access quizzes</li>
              <li>• Their data will be preserved</li>
            ` : `
              <li>• They will be able to log in again</li>
              <li>• They will have access to quizzes</li>
              <li>• All their data will be restored</li>
            `}
          </ul>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isDeactivating ? '#ef4444' : '#22c55e',
      cancelButtonColor: '#8b5cf6',
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStudentStatus(student.id);
        toast.success(`${student.fullName} has been ${isDeactivating ? 'deactivated' : 'activated'}`);
      }
    });
  };

  const handleViewHistory = (student) => {
    const history = student.quizHistory || [];
    if (history.length === 0) {
      toast.info(`${student.fullName} has no quiz history yet.`);
      return;
    }

    const totalQuizzes = history.length;
    const passed = history.filter(h => h.score >= 90).length;
    const avgScore = Math.round(history.reduce((acc, h) => acc + h.score, 0) / totalQuizzes);

    Swal.fire({
      title: `${student.fullName}'s Quiz History`,
      html: `
        <div class="text-left">
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">${totalQuizzes}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Total Quizzes</div>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl text-center">
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">${passed}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Passed</div>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">${avgScore}%</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Avg Score</div>
            </div>
          </div>
          <div class="max-h-60 overflow-y-auto space-y-2">
            ${history.slice(0, 10).map((h, i) => `
              <div class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-300">${i + 1}.</span>
                  <span class="text-sm text-gray-700 dark:text-gray-200">${h.quizTitle || `Quiz ${i + 1}`}</span>
                </div>
                <span class="text-sm font-bold ${h.score >= 90 ? 'text-green-500' : 'text-red-500'}">${h.score}%</span>
              </div>
            `).join('')}
            ${history.length > 10 ? `<p class="text-center text-xs text-gray-400 mt-2">+ ${history.length - 10} more quizzes</p>` : ''}
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#8b5cf6',
      confirmButtonText: 'Close',
      backdrop: 'rgba(0,0,0,0.5)',
      width: 500,
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 md:p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/5 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            <div className="relative p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl shadow-purple-500/30">
              <FaUserGraduate className="text-white text-2xl" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Student Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Manage all students and their accounts
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 flex-wrap"
        >
          {/* Stats Badges */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaUsers className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {totalStudents} Total
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaUserCheck className="text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {activeStudents} Active
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaUserTimes className="text-red-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {inactiveStudents} Inactive
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Students', value: totalStudents, icon: FaUsers, color: 'purple', gradient: 'from-purple-500 to-indigo-500' },
          { label: 'Active Students', value: activeStudents, icon: FaUserCheck, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
          { label: 'Inactive Students', value: inactiveStudents, icon: FaUserTimes, color: 'rose', gradient: 'from-rose-500 to-pink-500' },
          { label: 'Avg Quizzes/Student', value: avgQuizzesPerStudent, icon: FaGraduationCap, color: 'amber', gradient: 'from-amber-500 to-orange-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <option value="all">All Status</option>
            <option value="active">✅ Active</option>
            <option value="inactive">❌ Inactive</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredStudents.length} students found
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </motion.div>

      {/* Student Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10">
              <tr>
                {['fullName', 'email', 'passcode', 'registeredAt', 'avgScore', 'status', 'actions'].map((field, index) => {
                  const isSortable = ['fullName', 'email', 'registeredAt'].includes(field);
                  const displayNames = {
                    fullName: 'Student',
                    email: 'Email',
                    passcode: 'Passcode',
                    registeredAt: 'Quizzes',
                    avgScore: 'Avg Score',
                    status: 'Status',
                    actions: 'Actions'
                  };
                  
                  return (
                    <th
                      key={index}
                      className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider ${
                        isSortable ? 'cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors' : ''
                      } ${field === 'status' || field === 'actions' ? 'text-center' : ''}`}
                      onClick={() => isSortable && handleSort(field)}
                    >
                      <div className={`flex items-center gap-2 ${field === 'status' || field === 'actions' ? 'justify-center' : ''}`}>
                        {displayNames[field]}
                        {isSortable && getSortIcon(field)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FaUsers className="text-5xl text-gray-300 dark:text-gray-600" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">No students found</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student, index) => {
                  const quizHistory = student.quizHistory || [];
                  const totalQuizzes = quizHistory.length;
                  const avgScore = totalQuizzes > 0 
                    ? Math.round(quizHistory.reduce((acc, q) => acc + q.score, 0) / totalQuizzes)
                    : 0;
                  const isActive = student.isActive !== false;
                  const performanceLevel = avgScore >= 90 ? 'Excellent' : avgScore >= 70 ? 'Good' : avgScore >= 50 ? 'Average' : 'Needs Improvement';

                  return (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.005 }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all duration-300 ${
                        !isActive ? 'bg-red-50/20 dark:bg-red-900/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                            isActive 
                              ? 'bg-gradient-to-br from-purple-500 to-indigo-600' 
                              : 'bg-gradient-to-br from-gray-500 to-gray-600'
                          }`}>
                            {student.fullName.charAt(0).toUpperCase()}
                            {isActive && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
                            )}
                          </div>
                          <div>
                            <div className={`font-medium ${!isActive ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                              {student.fullName}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <FaPhone className="text-[10px]" />
                              {student.phone || 'No phone'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FaMailBulk className="text-gray-400" />
                          {student.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="px-3 py-1 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg text-sm font-mono text-purple-600 dark:text-purple-400 border border-gray-200/50 dark:border-gray-700/50">
                          {student.passcode}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaChartLine className="text-purple-500 text-xs" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {totalQuizzes}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-lg font-bold ${
                            avgScore >= 90 ? 'text-emerald-500' : 
                            avgScore >= 70 ? 'text-amber-500' : 
                            avgScore >= 50 ? 'text-orange-500' : 
                            'text-red-500'
                          }`}>
                            {avgScore}%
                          </span>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500">
                            {performanceLevel}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          isActive 
                            ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30' 
                            : 'bg-rose-100/50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-700/30'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleViewHistory(student)}
                            className="p-2 rounded-xl hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-purple-500 transition-all duration-300 group relative"
                            title="View Quiz History"
                          >
                            <FaHistory className="group-hover:scale-110 transition-transform" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              History
                            </span>
                          </button>
                          <button
                            onClick={() => handleResetPasscode(student)}
                            className="p-2 rounded-xl hover:bg-amber-100/50 dark:hover:bg-amber-900/20 text-amber-500 transition-all duration-300 group relative"
                            title="Reset Passcode"
                          >
                            <FaKey className="group-hover:scale-110 transition-transform" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Reset Passcode
                            </span>
                          </button>
                          <button
                            onClick={() => handleToggleStatus(student)}
                            className={`p-2 rounded-xl transition-all duration-300 group relative ${
                              isActive 
                                ? 'hover:bg-orange-100/50 dark:hover:bg-orange-900/20 text-orange-500' 
                                : 'hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 text-emerald-500'
                            }`}
                            title={isActive ? 'Deactivate' : 'Activate'}
                          >
                            {isActive ? <FaUserTimes className="group-hover:scale-110 transition-transform" /> : <FaUserCheck className="group-hover:scale-110 transition-transform" />}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              {isActive ? 'Deactivate' : 'Activate'}
                            </span>
                          </button>
                          <button
                            onClick={() => handleArchive(student)}
                            className="p-2 rounded-xl hover:bg-orange-100/50 dark:hover:bg-orange-900/20 text-orange-500 transition-all duration-300 group relative"
                            title="Archive Student"
                          >
                            <FaArchive className="group-hover:scale-110 transition-transform" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Archive
                            </span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50/30 to-indigo-50/30 dark:from-purple-900/5 dark:to-indigo-900/5">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredStudents.length)}</span> of{' '}
              <span className="font-medium">{filteredStudents.length}</span> students
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
              >
                <FaArrowLeft className="text-xs" />
                Previous
              </button>
              <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/30">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
              >
                Next
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #6366f1);
          border-radius: 3px;
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
}

export default AdminStudents;