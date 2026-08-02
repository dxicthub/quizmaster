import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaSave, FaPlus, FaTrash, FaEdit, 
  FaBook, FaTag, FaGraduationCap, FaClock,
  FaChartBar, FaCheckCircle, FaEye, FaEyeSlash,
  FaRocket, FaSpinner, FaInfoCircle, FaArrowRight
} from 'react-icons/fa';
import { quizCategories } from '../../data/quizCategories.js';
import toast from 'react-hot-toast';

function QuizModal({ isOpen, onClose, onSave, quiz }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Intermediate',
    duration: 60,
    totalQuestions: 100,
    passingScore: 70,
    estimatedTime: '60 min',
    status: 'draft',
    isVisible: true,
    tags: [],
    learningObjectives: [],
    icon: 'FaBook',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [objectiveInput, setObjectiveInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [focusedField, setFocusedField] = useState(null);

  // Load categories safely
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      const combined = [...quizCategories, ...stored];
      setCategories(combined);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories(quizCategories || []);
    }
  }, []);

  useEffect(() => {
    if (quiz) {
      setFormData({
        ...quiz,
        tags: quiz.tags || [],
        learningObjectives: quiz.learningObjectives || [],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        difficulty: 'Intermediate',
        duration: 60,
        totalQuestions: 100,
        passingScore: 70,
        estimatedTime: '60 min',
        status: 'draft',
        isVisible: true,
        tags: [],
        learningObjectives: [],
        icon: 'FaBook',
      });
    }
    setErrors({});
    setActiveTab('basic');
  }, [quiz, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Quiz title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.totalQuestions < 1 || formData.totalQuestions > 500) {
      newErrors.totalQuestions = 'Total questions must be between 1 and 500';
    }
    
    if (formData.passingScore < 1 || formData.passingScore > 100) {
      newErrors.passingScore = 'Passing score must be between 1 and 100';
    }
    
    if (formData.duration < 1 || formData.duration > 360) {
      newErrors.duration = 'Duration must be between 1 and 360 minutes';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const addObjective = () => {
    if (objectiveInput.trim()) {
      setFormData(prev => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, objectiveInput.trim()],
      }));
      setObjectiveInput('');
    }
  };

  const removeObjective = (objective) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter(o => o !== objective),
    }));
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FaBook },
    { id: 'settings', label: 'Settings', icon: FaRocket },
    { id: 'advanced', label: 'Advanced', icon: FaGraduationCap },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative overflow-hidden glassmorphism card-shadow rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-indigo-50/20 dark:from-purple-900/10 dark:to-indigo-900/10 opacity-30 rounded-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl">
                {quiz ? <FaEdit className="text-purple-500 text-xl" /> : <FaPlus className="text-purple-500 text-xl" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {quiz ? 'Edit Quiz' : 'Create New Quiz'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {quiz ? 'Update quiz details and settings' : 'Fill in the details to create a new quiz'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 group relative"
              aria-label="Close modal"
            >
              <FaTimes className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </button>
          </div>

          {/* Tabs */}
          <div className="relative z-10 flex gap-1 mb-6 p-1 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-md'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
                  }`}
                >
                  <Icon className="text-sm" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="relative z-10 space-y-4">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Quiz Title <span className="text-red-500">*</span>
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'title' ? 'scale-[1.02]' : ''}`}>
                      <FaBook className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${focusedField === 'title' ? 'text-purple-500' : ''}`} />
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('title')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter quiz title"
                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                          errors.title ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.title && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.title}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'category' ? 'scale-[1.02]' : ''}`}>
                      <FaGraduationCap className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${focusedField === 'category' ? 'text-purple-500' : ''}`} />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('category')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                          errors.category ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 appearance-none`}
                      >
                        <option value="">Select Category</option>
                        {categories && categories.length > 0 ? (
                          categories.map((cat) => (
                            <option key={cat.id || cat.title} value={cat.title}>{cat.title}</option>
                          ))
                        ) : (
                          <option value="">No categories available</option>
                        )}
                      </select>
                    </div>
                    <AnimatePresence>
                      {errors.category && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.category}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'description' ? 'scale-[1.02]' : ''}`}>
                    <FaInfoCircle className={`absolute left-3 top-3 text-gray-400 transition-colors duration-300 ${focusedField === 'description' ? 'text-purple-500' : ''}`} />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('description')}
                      onBlur={() => setFocusedField(null)}
                      rows="3"
                      placeholder="Enter quiz description"
                      className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                        errors.description ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.description && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Difficulty
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                    >
                      <option value="Beginner">🌱 Beginner</option>
                      <option value="Intermediate">📚 Intermediate</option>
                      <option value="Advanced">🚀 Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Duration <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        min="1"
                        max="360"
                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                          errors.duration ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">min</span>
                    </div>
                    <AnimatePresence>
                      {errors.duration && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.duration}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Questions <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaChartBar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="totalQuestions"
                        value={formData.totalQuestions}
                        onChange={handleChange}
                        min="1"
                        max="500"
                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                          errors.totalQuestions ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.totalQuestions && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.totalQuestions}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Passing Score <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaCheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="passingScore"
                        value={formData.passingScore}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                          errors.passingScore ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">%</span>
                    </div>
                    <AnimatePresence>
                      {errors.passingScore && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.passingScore}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                    >
                      <option value="draft">📝 Draft</option>
                      <option value="published">🚀 Published</option>
                      <option value="archived">📦 Archived</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="isVisible"
                          checked={formData.isVisible}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full transition-all duration-300 ${
                          formData.isVisible 
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/30' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}>
                          <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                            formData.isVisible ? 'translate-x-5' : 'translate-x-0.5'
                          }`} />
                        </div>
                      </div>
                      <span className={`transition-colors duration-300 ${formData.isVisible ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {formData.isVisible ? 'Visible' : 'Hidden'}
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-2">
                    <FaTag className="text-purple-500" />
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add tag and press Enter"
                      className="flex-1 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addTag}
                      className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-1"
                    >
                      <FaPlus className="text-sm" />
                      Add
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm border border-purple-200/50 dark:border-purple-700/30"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500 transition-colors ml-1"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-2">
                    <FaGraduationCap className="text-emerald-500" />
                    Learning Objectives
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={objectiveInput}
                      onChange={(e) => setObjectiveInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                      placeholder="Add objective and press Enter"
                      className="flex-1 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addObjective}
                      className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-1"
                    >
                      <FaPlus className="text-sm" />
                      Add
                    </motion.button>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    {formData.learningObjectives.map((objective, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center justify-between p-2.5 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          {objective}
                        </span>
                        <button
                          onClick={() => removeObjective(objective)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Actions */}
          <div className="relative z-10 flex items-center justify-end gap-3 pt-6 mt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="group-hover:scale-110 transition-transform" />
                  {quiz ? 'Update Quiz' : 'Save Quiz'}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuizModal;