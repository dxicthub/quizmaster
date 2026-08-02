import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaUserGraduate, FaTrash, FaUndo, 
  FaEye, FaHistory, FaCalendar, FaSort,
  FaSortUp, FaSortDown, FaUserSlash,
  FaArchive, FaUsers, FaClock, FaTimes,
  FaSpinner, FaArrowLeft, FaArrowRight,
  FaUser, FaMailBulk, FaPhone, FaChartLine,
  FaExclamationTriangle, FaShieldAlt, FaRocket,
  FaDatabase, FaFileArchive, FaUserCheck
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function AdminArchive() {
  const { 
    archivedStudents, 
    loadArchivedStudents, 
    restoreStudent, 
    permanentDeleteStudent,
    loadStudents
  } = useAdmin();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('archivedAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await loadArchivedStudents();
      } catch (error) {
        console.error('Error loading archived students:', error);
        toast.error('Failed to load archived students');
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

  const filteredStudents = archivedStudents
    .filter(student => {
      const searchLower = searchTerm.toLowerCase();
      return student.fullName.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.phone.includes(searchTerm);
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
  const totalArchived = archivedStudents.length;
  const recentlyArchived = archivedStudents.filter(s => {
    const diff = new Date() - new Date(s.archivedAt);
    return diff < 7 * 24 * 60 * 60 * 1000; // 7 days
  }).length;
  const avgQuizzes = totalArchived > 0 
    ? Math.round(archivedStudents.reduce((acc, s) => acc + (s.quizHistory || []).length, 0) / totalArchived)
    : 0;

  const handleRestore = (student) => {
    Swal.fire({
      title: 'Restore Student?',
      html: `
        <div class="text-left">
          <p class="text-gray-600 dark:text-gray-300">This will restore <strong>${student.fullName}</strong>'s account.</p>
          <ul class="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
            <li>✅ They will be able to log in again</li>
            <li>✅ They will have access to all quizzes</li>
            <li>✅ All their data will be restored</li>
            <li>✅ Their progress will be preserved</li>
          </ul>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#8b5cf6',
      confirmButtonText: '✅ Yes, restore',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        restoreStudent(student.id);
        loadArchivedStudents();
        loadStudents();
        toast.success(`${student.fullName} has been restored successfully`);
      }
    });
  };

  const handlePermanentDelete = (student) => {
    Swal.fire({
      title: '⚠️ Permanently Delete?',
      html: `
        <div class="text-left">
          <p class="text-red-600 dark:text-red-400 font-medium">This action cannot be undone!</p>
          <p class="text-gray-600 dark:text-gray-300 mt-2">This will permanently delete <strong>${student.fullName}</strong>'s account.</p>
          <ul class="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
            <li>• All quiz history will be deleted</li>
            <li>• All progress data will be lost</li>
            <li>• Account cannot be recovered</li>
            <li>• This action is irreversible</li>
          </ul>
        </div>
      `,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#8b5cf6',
      confirmButtonText: '⚠️ Delete Permanently',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        permanentDeleteStudent(student.id);
        loadArchivedStudents();
        toast.error(`${student.fullName} has been permanently deleted`);
      }
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
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
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading archived students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 md:p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300/10 dark:bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300/10 dark:bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300/5 dark:bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            <div className="relative p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl shadow-orange-500/30">
              <FaArchive className="text-white text-2xl" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-rose-500 bg-clip-text text-transparent">
              Archived Students
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Manage archived student accounts
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
            <FaFileArchive className="text-orange-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {totalArchived} Archived
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaClock className="text-amber-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {recentlyArchived} Recent (7d)
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaChartLine className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {avgQuizzes} Avg Quizzes
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Archived', value: totalArchived, icon: FaFileArchive, color: 'orange', gradient: 'from-orange-500 to-amber-500' },
          { label: 'Recently Archived', value: recentlyArchived, icon: FaClock, color: 'amber', gradient: 'from-amber-500 to-yellow-500' },
          { label: 'Avg Quizzes/Student', value: avgQuizzes, icon: FaChartLine, color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
          { label: 'Restorable', value: totalArchived, icon: FaUserCheck, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
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
              placeholder="Search archived students by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
          </div>
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

      {/* Archived Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-rose-500" />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10">
              <tr>
                {['fullName', 'contact', 'archivedAt', 'quizzes', 'avgScore', 'actions'].map((field, index) => {
                  const isSortable = ['fullName', 'archivedAt'].includes(field);
                  const displayNames = {
                    fullName: 'Student',
                    contact: 'Contact',
                    archivedAt: 'Archived Date',
                    quizzes: 'Quizzes',
                    avgScore: 'Avg Score',
                    actions: 'Actions'
                  };
                  
                  return (
                    <th
                      key={index}
                      className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider ${
                        isSortable ? 'cursor-pointer hover:text-orange-600 dark:hover:text-orange-400 transition-colors' : ''
                      } ${field === 'quizzes' || field === 'avgScore' || field === 'actions' ? 'text-center' : ''}`}
                      onClick={() => isSortable && handleSort(field)}
                    >
                      <div className={`flex items-center gap-2 ${field === 'quizzes' || field === 'avgScore' || field === 'actions' ? 'justify-center' : ''}`}>
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
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FaFileArchive className="text-5xl text-gray-300 dark:text-gray-600" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">No archived students found</p>
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
                  const daysArchived = Math.floor((new Date() - new Date(student.archivedAt)) / (1000 * 60 * 60 * 24));

                  return (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.005 }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className="hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-all duration-300"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg bg-gradient-to-br from-gray-500 to-gray-600">
                            {student.fullName.charAt(0).toUpperCase()}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-gray-200">
                              {student.fullName}
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="px-2 py-0.5 bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full border border-red-200/50 dark:border-red-700/30">
                                Archived
                              </span>
                              {daysArchived > 30 && (
                                <span className="px-2 py-0.5 bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200/50 dark:border-amber-700/30 text-[10px]">
                                  {daysArchived} days
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <FaMailBulk className="text-gray-400 text-xs" />
                            {student.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <FaPhone className="text-gray-400 text-xs" />
                            {student.phone || 'No phone'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <FaCalendar className="text-gray-400 text-xs" />
                            <span>{new Date(student.archivedAt).toLocaleDateString()}</span>
                          </div>
                          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {getTimeAgo(student.archivedAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaChartLine className="text-orange-500 text-xs" />
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
                            {avgScore >= 90 ? 'Excellent' : 
                             avgScore >= 70 ? 'Good' : 
                             avgScore >= 50 ? 'Average' : 'Needs Work'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleRestore(student)}
                            className="p-2 rounded-xl hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 text-emerald-500 transition-all duration-300 group relative"
                            title="Restore Student"
                          >
                            <FaUndo className="group-hover:scale-110 transition-transform" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Restore
                            </span>
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(student)}
                            className="p-2 rounded-xl hover:bg-red-100/50 dark:hover:bg-red-900/20 text-red-500 transition-all duration-300 group relative"
                            title="Permanently Delete"
                          >
                            <FaTrash className="group-hover:scale-110 transition-transform" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Delete
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
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-orange-50/30 to-red-50/30 dark:from-orange-900/5 dark:to-red-900/5">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredStudents.length)}</span> of{' '}
              <span className="font-medium">{filteredStudents.length}</span> archived students
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
              >
                <FaArrowLeft className="text-xs" />
                Previous
              </button>
              <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
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
          background: linear-gradient(to bottom, #f97316, #ef4444);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #dc2626);
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

export default AdminArchive;