// components/Admin/QuizTable.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEdit, FaTrash, FaEye, FaCopy, FaToggleOn, FaToggleOff,
  FaEllipsisV, FaQuestionCircle, FaUsers, FaChartLine,
  FaClock, FaStar, FaCheckCircle, FaTimesCircle,
  FaArrowLeft, FaArrowRight, FaBook, FaEyeSlash,
  FaWrench, FaSpinner, FaRocket, FaFire,
  FaMedal, FaAward, FaGraduationCap
} from 'react-icons/fa';

const QuizTable = ({
  quizzes,
  loading,
  selectedQuizzes,
  onSelectQuiz,
  onSelectAll,
  onEdit,
  onView,
  onDelete,
  onToggleVisibility,
  onDuplicate,
  onManageQuestions,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  getStatusBadge,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);

  const totalPages = Math.ceil(quizzes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuizzes = quizzes.slice(startIndex, startIndex + itemsPerPage);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'text-emerald-500 bg-emerald-100/50 dark:bg-emerald-900/30 border-emerald-200/50 dark:border-emerald-700/30',
      intermediate: 'text-amber-500 bg-amber-100/50 dark:bg-amber-900/30 border-amber-200/50 dark:border-amber-700/30',
      advanced: 'text-orange-500 bg-orange-100/50 dark:bg-orange-900/30 border-orange-200/50 dark:border-orange-700/30',
      expert: 'text-rose-500 bg-rose-100/50 dark:bg-rose-900/30 border-rose-200/50 dark:border-rose-700/30',
    };
    return colors[difficulty] || 'text-gray-500 bg-gray-100/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/30';
  };

  const getDifficultyIcon = (difficulty) => {
    const icons = {
      beginner: <FaGraduationCap className="text-emerald-500 text-xs" />,
      intermediate: <FaBook className="text-amber-500 text-xs" />,
      advanced: <FaRocket className="text-orange-500 text-xs" />,
      expert: <FaAward className="text-rose-500 text-xs" />,
    };
    return icons[difficulty] || <FaQuestionCircle className="text-gray-500 text-xs" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      published: 'from-emerald-500 to-teal-500',
      draft: 'from-amber-500 to-orange-500',
      archived: 'from-rose-500 to-red-500',
      hidden: 'from-gray-500 to-gray-600',
    };
    return colors[status] || 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading quizzes...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Preparing your quiz data</p>
        </div>
      </div>
    );
  }

  return (
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
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedQuizzes.length === quizzes.length && quizzes.length > 0}
                  onChange={() => onSelectAll(quizzes.map(q => q.id))}
                  className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Quiz
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Details
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Questions
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Attempts
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Pass Rate
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {paginatedQuizzes.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100/50 dark:bg-gray-700/50 flex items-center justify-center">
                      <FaBook className="text-5xl text-gray-300 dark:text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">No quizzes found</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedQuizzes.map((quiz, index) => {
                const isSelected = selectedQuizzes.includes(quiz.id);
                const isVisible = quiz.isVisible !== false;
                const difficultyColor = getDifficultyColor(quiz.difficulty);
                const difficultyIcon = getDifficultyIcon(quiz.difficulty);
                const statusColor = getStatusColor(quiz.status);
                const passRate = quiz.passRate || 0;

                return (
                  <motion.tr
                    key={quiz.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.002, backgroundColor: 'rgba(139, 92, 246, 0.05)' }}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`transition-all duration-300 ${
                      !isVisible ? 'bg-gray-50/30 dark:bg-gray-800/30' : ''
                    } ${isSelected ? 'bg-purple-50/50 dark:bg-purple-900/20' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectQuiz(quiz.id)}
                        className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600`}>
                          {quiz.title.charAt(0).toUpperCase()}
                          {!isVisible && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            {quiz.title}
                            {quiz.status === 'published' && (
                              <FaFire className="text-emerald-500 text-xs animate-pulse" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${difficultyColor}`}>
                              {difficultyIcon}
                              {quiz.difficulty || 'Not set'}
                            </span>
                            {!isVisible && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full text-gray-500 dark:text-gray-400">
                                <FaEyeSlash className="text-[10px]" />
                                Hidden
                              </span>
                            )}
                            {quiz.isNew && (
                              <span className="px-2 py-0.5 bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-[10px] font-semibold border border-amber-200/50 dark:border-amber-700/30 animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1 max-w-[180px]">
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {quiz.description || 'No description'}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                          <FaClock className="text-[10px]" />
                          <span>Updated {new Date(quiz.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <div className="p-1.5 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                          <FaQuestionCircle className="text-purple-500 text-xs" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {quiz.totalQuestions || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <div className="p-1.5 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                          <FaUsers className="text-blue-500 text-xs" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {quiz.totalAttempts || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-sm font-bold ${
                          passRate >= 70 ? 'text-emerald-500' :
                          passRate >= 50 ? 'text-amber-500' :
                          'text-rose-500'
                        }`}>
                          {passRate}%
                        </span>
                        <div className="w-16 h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(passRate, 100)}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${
                              passRate >= 70 ? 'from-emerald-500 to-teal-500' :
                              passRate >= 50 ? 'from-amber-500 to-orange-500' :
                              'from-rose-500 to-red-500'
                            }`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(quiz.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            quiz.status === 'published' ? 'bg-emerald-500' :
                            quiz.status === 'draft' ? 'bg-amber-500' :
                            quiz.status === 'archived' ? 'bg-rose-500' :
                            'bg-gray-500'
                          } animate-pulse`} />
                          {quiz.status || 'draft'}
                        </span>
                        {quiz.status === 'published' && (
                          <span className="text-[10px] text-emerald-500/70">Live</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {[
                          { icon: FaEye, onClick: () => onView(quiz), color: 'blue', label: 'View' },
                          { icon: FaEdit, onClick: () => onEdit(quiz), color: 'amber', label: 'Edit' },
                          { icon: FaWrench, onClick: () => onManageQuestions(quiz), color: 'purple', label: 'Questions' },
                          { icon: isVisible ? FaEyeSlash : FaEye, onClick: () => onToggleVisibility(quiz), color: isVisible ? 'orange' : 'emerald', label: isVisible ? 'Hide' : 'Show' },
                          { icon: FaCopy, onClick: () => onDuplicate(quiz), color: 'indigo', label: 'Duplicate' },
                          { icon: FaTrash, onClick: () => onDelete(quiz), color: 'rose', label: 'Delete' },
                        ].map((action, idx) => {
                          const Icon = action.icon;
                          const colorClasses = {
                            blue: 'hover:bg-blue-100/50 dark:hover:bg-blue-900/20 text-blue-500',
                            amber: 'hover:bg-amber-100/50 dark:hover:bg-amber-900/20 text-amber-500',
                            purple: 'hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-purple-500',
                            orange: 'hover:bg-orange-100/50 dark:hover:bg-orange-900/20 text-orange-500',
                            emerald: 'hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 text-emerald-500',
                            indigo: 'hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20 text-indigo-500',
                            rose: 'hover:bg-rose-100/50 dark:hover:bg-rose-900/20 text-rose-500',
                          };
                          return (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={action.onClick}
                              onMouseEnter={() => setHoveredAction(`${index}-${idx}`)}
                              onMouseLeave={() => setHoveredAction(null)}
                              className={`p-2 rounded-xl transition-all duration-300 group relative ${colorClasses[action.color]}`}
                              title={action.label}
                            >
                              <Icon className="group-hover:scale-110 transition-transform duration-300" />
                              <AnimatePresence>
                                {hoveredAction === `${index}-${idx}` && (
                                  <motion.span
                                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 dark:bg-gray-700 text-white text-[10px] rounded-lg whitespace-nowrap shadow-lg z-20"
                                  >
                                    {action.label}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          );
                        })}
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
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, quizzes.length)}</span> of{' '}
              <span className="font-medium">{quizzes.length}</span> quizzes
            </div>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 rounded-xl text-sm border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
            >
              <FaArrowLeft className="text-xs" />
              Previous
            </motion.button>
            <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/30">
              {currentPage} / {totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
            >
              Next
              <FaArrowRight className="text-xs" />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default QuizTable;