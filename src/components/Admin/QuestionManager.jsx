// components/Admin/QuestionManager.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaPlus, FaTrash, FaEdit, FaSave, FaArrowUp, FaArrowDown,
  FaCopy, FaSearch, FaFilter, FaFileImport, FaFileExport,
  FaCheck, FaTimes as FaTimesIcon, FaEye, FaEyeSlash,
  FaBook, FaGraduationCap, FaTag, FaCalendar, FaRocket,
  FaSpinner, FaQuestionCircle, FaInfoCircle, FaCheckCircle,
  FaStar, FaFire, FaClock, FaChartBar
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { getQuestionsForQuiz } from '../../data/questionRegistry.js';

function QuestionManager({ quiz, onClose, onSave }) {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    multipleChoice: 0,
    trueFalse: 0,
    fillIn: 0,
  });

  // Load questions
  useEffect(() => {
    if (quiz && quiz.questions) {
      setQuestions(quiz.questions);
      setFilteredQuestions(quiz.questions);
      calculateStats(quiz.questions);
    } else {
      loadQuestionsFromFile();
    }
  }, [quiz]);

  // Load questions from the question file using registry
  const loadQuestionsFromFile = async () => {
    try {
      if (quiz) {
        // Try to get questions from the registry first (works on Vercel)
        const fileQuestions = getQuestionsForQuiz(quiz.questionFile, quiz.title, quiz.id);
        
        if (fileQuestions && fileQuestions.length > 0) {
          console.log('✅ Loaded questions from registry:', fileQuestions.length);
          setQuestions(fileQuestions);
          setFilteredQuestions(fileQuestions);
          calculateStats(fileQuestions);
          return;
        }

        // If not in registry, try localStorage
        const savedQuestions = localStorage.getItem(`questions_${quiz.id}`);
        if (savedQuestions) {
          const parsed = JSON.parse(savedQuestions);
          if (parsed && parsed.length > 0) {
            console.log('✅ Loaded questions from localStorage:', parsed.length);
            setQuestions(parsed);
            setFilteredQuestions(parsed);
            calculateStats(parsed);
            return;
          }
        }

        // If still no questions, try dynamic import as fallback (only works on localhost)
        if (quiz.questionFile) {
          try {
            const module = await import(`../../data/${quiz.questionFile}`);
            const loadedQuestions = module.questions || module.default || [];
            if (loadedQuestions && loadedQuestions.length > 0) {
              console.log('✅ Loaded questions from file (fallback):', loadedQuestions.length);
              setQuestions(loadedQuestions);
              setFilteredQuestions(loadedQuestions);
              calculateStats(loadedQuestions);
              return;
            }
          } catch (e) {
            console.warn('⚠️ Could not load from file:', e);
          }
        }

        // If no questions found, set empty array
        console.warn('⚠️ No questions found for quiz:', quiz.title);
        setQuestions([]);
        setFilteredQuestions([]);
        calculateStats([]);
        toast.info('No questions found for this quiz. You can add questions manually.');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      toast.error('Failed to load questions');
      setQuestions([]);
      setFilteredQuestions([]);
      calculateStats([]);
    }
  };

  // Calculate statistics
  const calculateStats = (questionsList) => {
    const stats = {
      total: questionsList.length,
      easy: questionsList.filter(q => q.difficulty === 'easy' || q.difficulty === 'Easy').length,
      medium: questionsList.filter(q => q.difficulty === 'medium' || q.difficulty === 'Medium').length,
      hard: questionsList.filter(q => q.difficulty === 'hard' || q.difficulty === 'Hard').length,
      multipleChoice: questionsList.filter(q => q.type === 'multiple-choice').length,
      trueFalse: questionsList.filter(q => q.type === 'true-false').length,
      fillIn: questionsList.filter(q => q.type === 'fill-in').length,
    };
    setStats(stats);
  };

  // Apply filters and search
  useEffect(() => {
    let filtered = [...questions];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(q =>
        q.question.toLowerCase().includes(term) ||
        q.objective?.toLowerCase().includes(term) ||
        q.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(q => q.type === filterType);
    }

    // Filter by difficulty
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === filterDifficulty);
    }

    setFilteredQuestions(filtered);
  }, [questions, searchTerm, filterType, filterDifficulty]);

  // Add new question
  const handleAddQuestion = (newQuestion) => {
    if (!newQuestion.question || newQuestion.question.trim() === '') {
      toast.error('Question text is required');
      return false;
    }
    if (!newQuestion.options || newQuestion.options.length < 2) {
      toast.error('At least 2 options are required');
      return false;
    }
    if (!newQuestion.correctAnswer) {
      toast.error('Please select a correct answer');
      return false;
    }

    const questionWithId = {
      ...newQuestion,
      id: Date.now() + Math.random() * 1000,
      question: newQuestion.question.trim(),
      createdAt: new Date().toISOString(),
    };
    const updatedQuestions = [...questions, questionWithId];
    setQuestions(updatedQuestions);
    calculateStats(updatedQuestions);
    setShowAddForm(false);
    toast.success('Question added successfully! 🎉');
    return true;
  };

  // Edit question
  const handleEditQuestion = (index, updatedQuestion) => {
    if (!updatedQuestion.question || updatedQuestion.question.trim() === '') {
      toast.error('Question text is required');
      return;
    }
    if (!updatedQuestion.options || updatedQuestion.options.length < 2) {
      toast.error('At least 2 options are required');
      return;
    }
    if (!updatedQuestion.correctAnswer) {
      toast.error('Please select a correct answer');
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[index] = { 
      ...updatedQuestions[index], 
      ...updatedQuestion,
      question: updatedQuestion.question.trim(),
      updatedAt: new Date().toISOString(),
    };
    setQuestions(updatedQuestions);
    calculateStats(updatedQuestions);
    setEditingIndex(null);
    toast.success('Question updated successfully! ✅');
  };

  // Delete question
  const handleDeleteQuestion = (index) => {
    Swal.fire({
      title: 'Delete Question?',
      html: `
        <div class="text-left">
          <p class="text-gray-600 dark:text-gray-300">This action cannot be undone.</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Question: <strong>"${questions[index]?.question?.substring(0, 50)}${questions[index]?.question?.length > 50 ? '...' : ''}"</strong></p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#8b5cf6',
      confirmButtonText: '🗑️ Yes, delete',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        calculateStats(updatedQuestions);
        toast.success('Question deleted successfully!');
      }
    });
  };

  // Duplicate question
  const handleDuplicateQuestion = (index) => {
    const questionToDuplicate = { ...questions[index] };
    questionToDuplicate.id = Date.now() + Math.random() * 1000;
    questionToDuplicate.question = `${questionToDuplicate.question} (Copy)`;
    questionToDuplicate.createdAt = new Date().toISOString();
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index + 1, 0, questionToDuplicate);
    setQuestions(updatedQuestions);
    calculateStats(updatedQuestions);
    toast.success('Question duplicated successfully! 📋');
  };

  // Move question up
  const handleMoveUp = (index) => {
    if (index > 0) {
      const updatedQuestions = [...questions];
      [updatedQuestions[index], updatedQuestions[index - 1]] = [updatedQuestions[index - 1], updatedQuestions[index]];
      setQuestions(updatedQuestions);
    }
  };

  // Move question down
  const handleMoveDown = (index) => {
    if (index < questions.length - 1) {
      const updatedQuestions = [...questions];
      [updatedQuestions[index], updatedQuestions[index + 1]] = [updatedQuestions[index + 1], updatedQuestions[index]];
      setQuestions(updatedQuestions);
    }
  };

  // Save all questions
  const handleSaveAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      const quizIndex = stored.findIndex(q => q.id === quiz.id);
      if (quizIndex !== -1) {
        stored[quizIndex].questions = questions;
        localStorage.setItem('quizCategories', JSON.stringify(stored));
      }
      
      localStorage.setItem(`questions_${quiz.id}`, JSON.stringify(questions));
      
      setIsLoading(false);
      toast.success('All questions saved successfully! ✅');
      onSave(questions);
    }, 1000);
  };

  // Export questions
  const handleExport = () => {
    const data = JSON.stringify(questions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${quiz.title}-questions-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Questions exported successfully! 📤');
  };

  // Import questions
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedQuestions = JSON.parse(event.target.result);
          if (Array.isArray(importedQuestions)) {
            const questionsWithIds = importedQuestions.map(q => ({
              ...q,
              id: Date.now() + Math.random() * 1000,
              createdAt: new Date().toISOString(),
            }));
            const updatedQuestions = [...questions, ...questionsWithIds];
            setQuestions(updatedQuestions);
            calculateStats(updatedQuestions);
            toast.success(`Imported ${questionsWithIds.length} questions successfully! 📥`);
          } else {
            toast.error('Invalid file format. Expected array of questions.');
          }
        } catch (error) {
          toast.error('Failed to import questions. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const getTypeLabel = (type) => {
    const types = {
      'multiple-choice': 'Multiple Choice',
      'true-false': 'True/False',
      'fill-in': 'Fill in the Gap',
    };
    return types[type] || type;
  };

  const getTypeIcon = (type) => {
    const icons = {
      'multiple-choice': <FaBook className="text-blue-500" />,
      'true-false': <FaCheckCircle className="text-emerald-500" />,
      'fill-in': <FaInfoCircle className="text-purple-500" />,
    };
    return icons[type] || <FaQuestionCircle className="text-gray-500" />;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-700/30',
      medium: 'bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/50 dark:border-amber-700/30',
      hard: 'bg-rose-100/50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200/50 dark:border-rose-700/30',
    };
    return colors[difficulty] || 'bg-gray-100/50 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400 border-gray-200/50 dark:border-gray-700/30';
  };

  const getDifficultyIcon = (difficulty) => {
    const icons = {
      easy: <FaStar className="text-emerald-500" />,
      medium: <FaFire className="text-amber-500" />,
      hard: <FaRocket className="text-rose-500" />,
    };
    return icons[difficulty] || <FaQuestionCircle className="text-gray-500" />;
  };

  // Question Edit Form Component
  const QuestionEditForm = ({ question, index, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      question: question?.question || '',
      type: question?.type || 'multiple-choice',
      options: question?.options || ['', '', '', ''],
      correctAnswer: question?.correctAnswer || '',
      difficulty: question?.difficulty || 'medium',
      objective: question?.objective || '',
      explanation: question?.explanation || '',
      tags: question?.tags || [],
      points: question?.points || 1,
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (validationErrors[field]) {
        setValidationErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    const handleOptionChange = (idx, value) => {
      const newOptions = [...formData.options];
      newOptions[idx] = value;
      setFormData(prev => ({ ...prev, options: newOptions }));
      if (validationErrors.options) {
        setValidationErrors(prev => ({ ...prev, options: '' }));
      }
    };

    const addOption = () => {
      if (formData.options.length < 6) {
        setFormData(prev => ({ ...prev, options: [...prev.options, ''] }));
      }
    };

    const removeOption = (idx) => {
      if (formData.options.length > 2) {
        const newOptions = formData.options.filter((_, i) => i !== idx);
        setFormData(prev => ({ ...prev, options: newOptions }));
        if (formData.correctAnswer === String.fromCharCode(65 + idx)) {
          setFormData(prev => ({ ...prev, correctAnswer: '' }));
        }
      }
    };

    const validateForm = () => {
      const errors = {};
      
      if (!formData.question || formData.question.trim() === '') {
        errors.question = 'Question text is required';
      }
      
      if (!formData.options || formData.options.length < 2) {
        errors.options = 'At least 2 options are required';
      } else {
        const hasEmptyOption = formData.options.some(opt => !opt || opt.trim() === '');
        if (hasEmptyOption) {
          errors.options = 'All options must have text';
        }
      }
      
      if (!formData.correctAnswer) {
        errors.correctAnswer = 'Please select a correct answer';
      }
      
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
      if (!validateForm()) {
        const firstError = Object.values(validationErrors)[0];
        if (firstError) {
          toast.error(firstError);
        }
        return;
      }
      
      const cleanedData = {
        ...formData,
        question: formData.question.trim(),
        options: formData.options.map(opt => opt.trim()),
      };
      
      onSave(cleanedData);
    };

    return (
      <div className="p-4 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-inner">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Question Text <span className="text-red-500">*</span>
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'question' ? 'scale-[1.02]' : ''}`}>
              <FaQuestionCircle className={`absolute left-3 top-3 text-gray-400 transition-colors duration-300 ${focusedField === 'question' ? 'text-purple-500' : ''}`} />
              <textarea
                value={formData.question}
                onChange={(e) => handleChange('question', e.target.value)}
                onFocus={() => setFocusedField('question')}
                onBlur={() => setFocusedField(null)}
                rows="2"
                className={`w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                  validationErrors.question ? 'border-2 border-red-500' : 'border border-gray-200/50 dark:border-gray-700/50'
                }`}
                placeholder="Enter your question"
              />
            </div>
            <AnimatePresence>
              {validationErrors.question && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {validationErrors.question}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Question Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
              >
                <option value="multiple-choice">📚 Multiple Choice</option>
                <option value="true-false">✅ True/False</option>
                <option value="fill-in">📝 Fill in the Gap</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleChange('difficulty', e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
              >
                <option value="easy">🌱 Easy</option>
                <option value="medium">📚 Medium</option>
                <option value="hard">🚀 Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Points
              </label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => handleChange('points', parseInt(e.target.value) || 1)}
                min="1"
                max="10"
                className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Options <span className="text-red-500">*</span>
              <span className="text-xs text-gray-400 ml-2">(Minimum 2 options)</span>
            </label>
            <div className="space-y-2">
              {formData.options.map((option, idx) => (
                <div key={idx} className="flex items-center gap-2 group">
                  <span className="w-8 text-sm font-bold text-gray-500 dark:text-gray-400">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className={`flex-1 px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ${
                      validationErrors.options ? 'border-2 border-red-500' : ''
                    }`}
                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                  />
                  <button
                    onClick={() => {
                      handleChange('correctAnswer', String.fromCharCode(65 + idx));
                      if (validationErrors.correctAnswer) {
                        setValidationErrors(prev => ({ ...prev, correctAnswer: '' }));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                      formData.correctAnswer === String.fromCharCode(65 + idx)
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-gray-200/50 dark:bg-gray-600/50 text-gray-600 dark:text-gray-400 hover:bg-gray-300/50 dark:hover:bg-gray-500/50'
                    }`}
                  >
                    {formData.correctAnswer === String.fromCharCode(65 + idx) ? '✅ Correct' : 'Set Correct'}
                  </button>
                  {formData.options.length > 2 && (
                    <button
                      onClick={() => removeOption(idx)}
                      className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  )}
                </div>
              ))}
              {formData.options.length < 6 && (
                <button
                  onClick={addOption}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  <FaPlus className="text-xs" /> Add Option
                </button>
              )}
            </div>
            <AnimatePresence>
              {validationErrors.options && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-500"
                >
                  {validationErrors.options}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Learning Objective (Optional)
            </label>
            <input
              type="text"
              value={formData.objective}
              onChange={(e) => handleChange('objective', e.target.value)}
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
              placeholder="e.g., Understanding React Hooks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Explanation (Optional)
            </label>
            <textarea
              value={formData.explanation}
              onChange={(e) => handleChange('explanation', e.target.value)}
              rows="2"
              className="w-full px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
              placeholder="Explain why this answer is correct"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 group"
            >
              <FaSave className="group-hover:scale-110 transition-transform" />
              {index !== undefined ? 'Update Question' : 'Add Question'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add Question Form
  const AddQuestionForm = () => {
    const [newQuestion, setNewQuestion] = useState({
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      difficulty: 'medium',
      objective: '',
      explanation: '',
      tags: [],
      points: 1,
    });

    const handleAdd = (questionData) => {
      handleAddQuestion(questionData);
    };

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="p-4 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200/50 dark:border-purple-800/30 shadow-inner"
      >
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <div className="p-1.5 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
            <FaPlus className="text-purple-500" />
          </div>
          Add New Question
        </h4>
        <QuestionEditForm
          question={newQuestion}
          onSave={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      </motion.div>
    );
  };

  // Stats cards
  const statCards = [
    { label: 'Total', value: stats.total, icon: FaBook, color: 'purple', gradient: 'from-purple-500 to-indigo-500' },
    { label: 'Easy', value: stats.easy, icon: FaStar, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Medium', value: stats.medium, icon: FaFire, color: 'amber', gradient: 'from-amber-500 to-orange-500' },
    { label: 'Hard', value: stats.hard, icon: FaRocket, color: 'rose', gradient: 'from-rose-500 to-red-500' },
  ];

  const filterTabs = [
    { id: 'all', label: 'All', count: stats.total },
    { id: 'multiple-choice', label: 'Multiple Choice', count: stats.multipleChoice },
    { id: 'true-false', label: 'True/False', count: stats.trueFalse },
    { id: 'fill-in', label: 'Fill in Gap', count: stats.fillIn },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative overflow-hidden glassmorphism card-shadow rounded-3xl p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
      >
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-indigo-50/20 dark:from-purple-900/10 dark:to-indigo-900/10 opacity-30 rounded-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-4 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl">
              <FaBook className="text-purple-500 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {quiz.title} - Questions
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {questions.length} questions • {filteredQuestions.length} filtered
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 group relative"
              title="Export Questions"
            >
              <FaFileExport className="text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleImport}
              className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 group relative"
              title="Import Questions"
            >
              <FaFileImport className="text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 group relative"
            >
              <FaTimes className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative p-3 flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-100 font-mono">
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

        {/* Toolbar */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
              searchTerm ? 'text-purple-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <FaTimes />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  filterType === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 border border-gray-200/50 dark:border-gray-700/50'
                }`}
              >
                {tab.label}
                <span className="ml-1 text-[10px] opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <option value="all">📊 All Difficulty</option>
            <option value="easy">🌱 Easy</option>
            <option value="medium">📚 Medium</option>
            <option value="hard">🚀 Hard</option>
          </select>

          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <FaPlus />
            Add Question
          </button>

          <button
            onClick={handleSaveAll}
            disabled={isLoading}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save All
              </>
            )}
          </button>
        </div>

        {/* Add Question Form */}
        <AnimatePresence>
          {showAddForm && <AddQuestionForm />}
        </AnimatePresence>

        {/* Questions List */}
        <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                No questions found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {searchTerm || filterType !== 'all' || filterDifficulty !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Click "Add Question" to create your first question'}
              </p>
              {(searchTerm || filterType !== 'all' || filterDifficulty !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterDifficulty('all');
                  }}
                  className="mt-4 px-4 py-2 bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-medium hover:bg-purple-200/50 dark:hover:bg-purple-900/50 transition-colors border border-purple-200/50 dark:border-purple-700/30"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQuestions.map((question, index) => {
                const isEditing = editingIndex === index;
                const actualIndex = questions.indexOf(question);

                return (
                  <motion.div
                    key={question.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onMouseEnter={() => setHoveredQuestion(index)}
                    onMouseLeave={() => setHoveredQuestion(null)}
                    className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                      isEditing
                        ? 'border-purple-500/50 bg-purple-50/50 dark:bg-purple-900/20 shadow-lg shadow-purple-500/10'
                        : 'border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-700/50 hover:shadow-lg'
                    }`}
                  >
                    {isEditing ? (
                      <div className="p-4">
                        <QuestionEditForm
                          question={question}
                          index={actualIndex}
                          onSave={(updated) => handleEditQuestion(actualIndex, updated)}
                          onCancel={() => setEditingIndex(null)}
                        />
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-100/50 dark:bg-purple-900/30 px-2 py-0.5 rounded-lg">
                                Q{actualIndex + 1}
                              </span>
                              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30">
                                {getTypeIcon(question.type)}
                                {getTypeLabel(question.type)}
                              </span>
                              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${getDifficultyColor(question.difficulty)}`}>
                                {getDifficultyIcon(question.difficulty)}
                                {question.difficulty}
                              </span>
                              {question.points && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-700/30">
                                  {question.points} pts
                                </span>
                              )}
                              {question.objective && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <FaGraduationCap className="text-[10px]" />
                                  {question.objective}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                              {question.question}
                            </p>
                            {question.explanation && (
                              <div className="mt-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200/50 dark:border-blue-700/30 flex items-start gap-2">
                                <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{question.explanation}</span>
                              </div>
                            )}
                            {question.tags && question.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {question.tags.map((tag, i) => (
                                  <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/30">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <FaCheck className="text-emerald-500 text-[10px]" />
                                Correct: {question.correctAnswer}
                              </span>
                              <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
                              <span className="flex items-center gap-1">
                                <FaClock className="text-[10px]" />
                                {question.createdAt ? new Date(question.createdAt).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleMoveUp(actualIndex)}
                              disabled={actualIndex === 0}
                              className="p-1.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                              title="Move Up"
                            >
                              <FaArrowUp className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleMoveDown(actualIndex)}
                              disabled={actualIndex === questions.length - 1}
                              className="p-1.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                              title="Move Down"
                            >
                              <FaArrowDown className="text-sm" />
                            </button>
                            <button
                              onClick={() => setEditingIndex(actualIndex)}
                              className="p-1.5 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-900/20 text-blue-500 transition-all duration-300 group relative"
                              title="Edit"
                            >
                              <FaEdit className="group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleDuplicateQuestion(actualIndex)}
                              className="p-1.5 rounded-lg hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-purple-500 transition-all duration-300 group relative"
                              title="Duplicate"
                            >
                              <FaCopy className="group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(actualIndex)}
                              className="p-1.5 rounded-lg hover:bg-rose-100/50 dark:hover:bg-rose-900/20 text-rose-500 transition-all duration-300 group relative"
                              title="Delete"
                            >
                              <FaTrash className="group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{questions.length} questions total</span>
            <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
            <span className="flex items-center gap-1">
              <FaStar className="text-emerald-500 text-xs" />
              {stats.easy} easy
            </span>
            <span className="flex items-center gap-1">
              <FaFire className="text-amber-500 text-xs" />
              {stats.medium} medium
            </span>
            <span className="flex items-center gap-1">
              <FaRocket className="text-rose-500 text-xs" />
              {stats.hard} hard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
            >
              Close
            </button>
            <button
              onClick={handleSaveAll}
              disabled={isLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="group-hover:scale-110 transition-transform" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

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
        `}</style>
      </motion.div>
    </div>
  );
}

export default QuestionManager;