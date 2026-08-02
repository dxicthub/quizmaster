// components/Admin/QuizFilters.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaTimes, FaSort, FaSortUp, FaSortDown,
  FaEye, FaEyeSlash, FaCheckCircle, FaClock, FaArchive,
  FaTrash, FaCopy, FaFileExport, FaArrowRight, FaArrowLeft
} from 'react-icons/fa';

const QuizFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  categories,
  onBulkAction,
  selectedCount,
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'most-attempted', label: 'Most Attempted' },
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'most-questions', label: 'Most Questions' },
    { value: 'recently-updated', label: 'Recently Updated' },
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: '✅ Published' },
    { value: 'draft', label: '📝 Draft' },
    { value: 'archived', label: '📦 Archived' },
  ];

  const visibilityOptions = [
    { value: 'all', label: 'All Visibility' },
    { value: 'visible', label: '👁️ Visible' },
    { value: 'hidden', label: '🔒 Hidden' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search quizzes by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => onFilterChange({ ...filters, difficulty: e.target.value })}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            {difficultyOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={filters.visibility}
            onChange={(e) => onFilterChange({ ...filters, visibility: e.target.value })}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            {visibilityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex flex-wrap items-center gap-2"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              Bulk Actions ({selectedCount} selected):
            </span>
            <button
              onClick={() => onBulkAction('delete')}
              className="px-3 py-1.5 bg-rose-100/50 dark:bg-rose-900/30 hover:bg-rose-200/50 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300"
            >
              <FaTrash className="text-xs" />
              Delete
            </button>
            <button
              onClick={() => onBulkAction('hide')}
              className="px-3 py-1.5 bg-orange-100/50 dark:bg-orange-900/30 hover:bg-orange-200/50 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300"
            >
              <FaEyeSlash className="text-xs" />
              Hide
            </button>
            <button
              onClick={() => onBulkAction('show')}
              className="px-3 py-1.5 bg-emerald-100/50 dark:bg-emerald-900/30 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300"
            >
              <FaEye className="text-xs" />
              Show
            </button>
            <button
              onClick={() => onBulkAction('archive')}
              className="px-3 py-1.5 bg-amber-100/50 dark:bg-amber-900/30 hover:bg-amber-200/50 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300"
            >
              <FaArchive className="text-xs" />
              Archive
            </button>
            <button
              onClick={() => onBulkAction('duplicate')}
              className="px-3 py-1.5 bg-purple-100/50 dark:bg-purple-900/30 hover:bg-purple-200/50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300"
            >
              <FaCopy className="text-xs" />
              Duplicate
            </button>
            <button
              onClick={() => onBulkAction('export')}
              className="px-3 py-1.5 bg-blue-100/50 dark:bg-blue-900/30 hover:bg-blue-200/50 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all duration-300"
            >
              <FaFileExport className="text-xs" />
              Export
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizFilters;