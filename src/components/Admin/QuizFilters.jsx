// components/Admin/QuizFilters.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaTimes, FaSort, FaSortUp, FaSortDown,
  FaEye, FaEyeSlash, FaCheckCircle, FaClock, FaArchive,
  FaTrash, FaCopy, FaFileExport, FaArrowRight, FaArrowLeft,
  FaSlidersH, FaChevronDown, FaChevronUp, FaFilter as FaFilterIcon
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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Count active filters
  React.useEffect(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.difficulty !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.visibility !== 'all') count++;
    if (searchTerm) count++;
    setActiveFilterCount(count);
  }, [filters, searchTerm]);

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: '🕐' },
    { value: 'oldest', label: 'Oldest First', icon: '🕐' },
    { value: 'alphabetical', label: 'A-Z', icon: '📚' },
    { value: 'most-attempted', label: 'Most Attempted', icon: '👥' },
    { value: 'highest-rated', label: 'Highest Rated', icon: '⭐' },
    { value: 'most-questions', label: 'Most Questions', icon: '📝' },
    { value: 'recently-updated', label: 'Recently Updated', icon: '🔄' },
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties', icon: '📊' },
    { value: 'beginner', label: '🌱 Beginner' },
    { value: 'intermediate', label: '📚 Intermediate' },
    { value: 'advanced', label: '🚀 Advanced' },
    { value: 'expert', label: '🏆 Expert' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', icon: '📋' },
    { value: 'published', label: '✅ Published' },
    { value: 'draft', label: '📝 Draft' },
    { value: 'archived', label: '📦 Archived' },
  ];

  const visibilityOptions = [
    { value: 'all', label: 'All Visibility', icon: '👁️' },
    { value: 'visible', label: '👁️ Visible' },
    { value: 'hidden', label: '🔒 Hidden' },
  ];

  const clearAllFilters = () => {
    onFilterChange({ category: 'all', difficulty: 'all', status: 'all', visibility: 'all' });
    onSearchChange('');
  };

  const getActiveFilterLabel = () => {
    if (activeFilterCount === 0) return 'No filters applied';
    return `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="relative overflow-hidden mb-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Decorative Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

      <div className="p-4">
        {/* Main Search and Filter Row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
              searchTerm ? 'text-purple-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search quizzes by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <FaTimes />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              showAdvancedFilters || activeFilterCount > 0
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 border border-gray-200/50 dark:border-gray-700/50'
            }`}
          >
            <FaFilterIcon className="text-sm" />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white/20 rounded-full">
                {activeFilterCount}
              </span>
            )}
            {showAdvancedFilters ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
          </motion.button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 appearance-none pr-10 min-w-[140px]"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
            <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter Count Badge */}
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {getActiveFilterLabel()}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFilters}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors flex items-center gap-1"
              >
                <FaTimes className="text-[10px]" />
                Clear all
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                    >
                      <option value="all">📚 All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Difficulty
                    </label>
                    <select
                      value={filters.difficulty}
                      onChange={(e) => onFilterChange({ ...filters, difficulty: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                    >
                      {difficultyOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Visibility Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Visibility
                    </label>
                    <select
                      value={filters.visibility}
                      onChange={(e) => onFilterChange({ ...filters, visibility: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                    >
                      {visibilityOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Filter Chips */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Quick filters:</span>
                  <button
                    onClick={() => {
                      onFilterChange({ ...filters, status: 'published' });
                      setShowAdvancedFilters(true);
                    }}
                    className="px-3 py-1 text-xs rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50 transition-colors border border-emerald-200/50 dark:border-emerald-700/30"
                  >
                    ✅ Published
                  </button>
                  <button
                    onClick={() => {
                      onFilterChange({ ...filters, status: 'draft' });
                      setShowAdvancedFilters(true);
                    }}
                    className="px-3 py-1 text-xs rounded-full bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200/50 dark:hover:bg-amber-900/50 transition-colors border border-amber-200/50 dark:border-amber-700/30"
                  >
                    📝 Draft
                  </button>
                  <button
                    onClick={() => {
                      onFilterChange({ ...filters, visibility: 'visible' });
                      setShowAdvancedFilters(true);
                    }}
                    className="px-3 py-1 text-xs rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200/50 dark:hover:bg-blue-900/50 transition-colors border border-blue-200/50 dark:border-blue-700/30"
                  >
                    👁️ Visible
                  </button>
                  <button
                    onClick={() => {
                      onFilterChange({ ...filters, difficulty: 'beginner' });
                      setShowAdvancedFilters(true);
                    }}
                    className="px-3 py-1 text-xs rounded-full bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200/50 dark:hover:bg-green-900/50 transition-colors border border-green-200/50 dark:border-green-700/30"
                  >
                    🌱 Beginner
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Actions */}
        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 mr-2">
                  <span className="px-2 py-1 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg text-xs font-semibold text-purple-700 dark:text-purple-300">
                    {selectedCount}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    selected
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    { action: 'delete', icon: FaTrash, label: 'Delete', color: 'rose' },
                    { action: 'hide', icon: FaEyeSlash, label: 'Hide', color: 'orange' },
                    { action: 'show', icon: FaEye, label: 'Show', color: 'emerald' },
                    { action: 'archive', icon: FaArchive, label: 'Archive', color: 'amber' },
                    { action: 'duplicate', icon: FaCopy, label: 'Duplicate', color: 'purple' },
                    { action: 'export', icon: FaFileExport, label: 'Export', color: 'blue' },
                  ].map(({ action, icon: Icon, label, color }) => {
                    const colorClasses = {
                      rose: 'bg-rose-100/50 dark:bg-rose-900/30 hover:bg-rose-200/50 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border-rose-200/50 dark:border-rose-700/30',
                      orange: 'bg-orange-100/50 dark:bg-orange-900/30 hover:bg-orange-200/50 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-300 border-orange-200/50 dark:border-orange-700/30',
                      emerald: 'bg-emerald-100/50 dark:bg-emerald-900/30 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-700/30',
                      amber: 'bg-amber-100/50 dark:bg-amber-900/30 hover:bg-amber-200/50 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-700/30',
                      purple: 'bg-purple-100/50 dark:bg-purple-900/30 hover:bg-purple-200/50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200/50 dark:border-purple-700/30',
                      blue: 'bg-blue-100/50 dark:bg-blue-900/30 hover:bg-blue-200/50 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/30',
                    };
                    return (
                      <motion.button
                        key={action}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onBulkAction(action)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 flex items-center gap-1.5 ${colorClasses[color]}`}
                      >
                        <Icon className="text-xs" />
                        {label}
                      </motion.button>
                    );
                  })}
                </div>

                <button
                  onClick={() => onBulkAction('deselect')}
                  className="ml-auto text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors flex items-center gap-1"
                >
                  <FaTimes className="text-[10px]" />
                  Deselect all
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuizFilters;