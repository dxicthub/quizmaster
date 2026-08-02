import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaArrowLeft, FaArrowRight, FaSave, FaFileImport,
  FaPlus, FaTrash, FaCopy, FaEdit, FaCheck, FaUpload,
  FaFilePdf, FaFileWord, FaFileAlt, FaFileCode, FaFileCsv,
  FaMarkdown, FaClipboard, FaSpinner, FaRocket,
  FaBook, FaGraduationCap, FaClock, FaChartBar,
  FaStar, FaFire, FaCheckCircle, FaTimesCircle,
  FaExclamationTriangle, FaInfoCircle, FaLightbulb
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const STEPS = [
  { id: 'details', label: 'Quiz Details', icon: '📝' },
  { id: 'questions', label: 'Question Source', icon: '📚' },
  { id: 'import', label: 'Import Questions', icon: '📤' },
  { id: 'review', label: 'Review & Publish', icon: '✅' },
];

const IMPORT_METHODS = [
  { id: 'manual', label: 'Manual Entry', icon: FaPlus, description: 'Create questions one by one', color: 'from-purple-500 to-indigo-500' },
  { id: 'pdf', label: 'Import from PDF', icon: FaFilePdf, description: 'Extract questions from PDF files', color: 'from-red-500 to-rose-500' },
  { id: 'docx', label: 'Import from Word', icon: FaFileWord, description: 'Extract questions from .docx files', color: 'from-blue-500 to-indigo-500' },
  { id: 'txt', label: 'Import from TXT', icon: FaFileAlt, description: 'Extract questions from text files', color: 'from-gray-500 to-gray-600' },
  { id: 'json', label: 'Import from JSON', icon: FaFileCode, description: 'Import from structured JSON', color: 'from-yellow-500 to-amber-500' },
  { id: 'csv', label: 'Import from CSV', icon: FaFileCsv, description: 'Import from CSV spreadsheets', color: 'from-green-500 to-emerald-500' },
  { id: 'markdown', label: 'Import from Markdown', icon: FaMarkdown, description: 'Import from .md files', color: 'from-blue-400 to-cyan-500' },
  { id: 'paste', label: 'Paste Text', icon: FaClipboard, description: 'Paste questions from clipboard', color: 'from-purple-400 to-pink-500' },
];

function QuizWizard({ isOpen, onClose, onSave }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    category: '',
    difficulty: 'Intermediate',
    duration: 60,
    passingScore: 70,
    estimatedTime: '60 min',
    status: 'draft',
    isVisible: true,
    thumbnail: null,
    icon: 'FaBook',
    tags: [],
  });
  const [questions, setQuestions] = useState([]);
  const [importMethod, setImportMethod] = useState(null);
  const [importFile, setImportFile] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [validationResults, setValidationResults] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileImport = useCallback((file) => {
    setIsImporting(true);
    setImportProgress(0);

    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          const mockQuestions = Array.from({ length: 100 }, (_, i) => ({
            id: Date.now() + i,
            type: i < 80 ? 'multiple-choice' : i < 95 ? 'true-false' : 'fill-in',
            question: `Sample question ${i + 1}`,
            options: ['A. Option 1', 'B. Option 2', 'C. Option 3', 'D. Option 4'],
            correctAnswer: 'A',
            difficulty: i < 33 ? 'easy' : i < 66 ? 'medium' : 'hard',
            explanation: `Explanation for question ${i + 1}`,
            tags: ['sample', 'imported'],
            points: 1,
          }));
          setQuestions(mockQuestions);
          validateQuestions(mockQuestions);
          toast.success(`✅ Successfully imported ${mockQuestions.length} questions!`);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  }, []);

  const validateQuestions = (qList) => {
    const results = {
      total: qList.length,
      valid: 0,
      invalid: 0,
      duplicates: 0,
      missingAnswers: 0,
      invalidOptions: 0,
      emptyQuestions: 0,
      issues: [],
    };

    const seen = new Set();
    qList.forEach((q, index) => {
      const issues = [];
      if (!q.question || q.question.trim() === '') {
        issues.push('Empty question');
        results.emptyQuestions++;
      }
      if (!q.correctAnswer) {
        issues.push('Missing correct answer');
        results.missingAnswers++;
      }
      if (!q.options || q.options.length < 2) {
        issues.push('Invalid options');
        results.invalidOptions++;
      }
      const key = q.question?.trim();
      if (key && seen.has(key)) {
        issues.push('Duplicate question');
        results.duplicates++;
      }
      if (key) seen.add(key);
      
      if (issues.length === 0) {
        results.valid++;
      } else {
        results.invalid++;
        results.issues.push({ index, issues });
      }
    });

    setValidationResults(results);
    return results;
  };

  const handleSave = () => {
    if (questions.length < 100) {
      Swal.fire({
        title: 'Incomplete Quiz',
        html: `
          <div class="text-left">
            <p class="text-gray-600 dark:text-gray-300">You currently have <strong>${questions.length}</strong> questions.</p>
            <p class="text-gray-600 dark:text-gray-300 mt-2">This quiz requires exactly <strong>100 questions</strong> before it can be published.</p>
            <div class="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div class="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500" style="width: ${Math.min((questions.length / 100) * 100, 100)}%"></div>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">${Math.round((questions.length / 100) * 100)}% complete</p>
          </div>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8b5cf6',
        cancelButtonColor: '#ef4444',
        confirmButtonText: '💾 Save as Draft',
        cancelButtonText: '📝 Continue Editing',
        backdrop: 'rgba(0,0,0,0.5)',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
          cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          onSave({ ...formData, questions, status: 'draft' });
          toast.success('💾 Quiz saved as draft!');
          onClose();
        }
      });
      return;
    }

    onSave({ ...formData, questions, status: 'published' });
    toast.success('🎉 Quiz published successfully!');
    onClose();
  };

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
          className="relative overflow-hidden glassmorphism card-shadow rounded-3xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-indigo-50/20 dark:from-purple-900/10 dark:to-indigo-900/10 opacity-30 rounded-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl">
                <FaRocket className="text-purple-500 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Create New Quiz
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 group"
            >
              <FaTimes className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="relative z-10 flex items-center justify-between mb-8">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30'
                      : index < currentStep
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50'
                  }`}
                >
                  <span className="text-lg">{step.icon}</span>
                  <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
                  {index < currentStep && (
                    <FaCheck className="text-white text-xs ml-1" />
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`w-12 h-0.5 ${
                    index < currentStep ? 'bg-emerald-500' : 'bg-gray-300/50 dark:bg-gray-600/50'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <StepDetails 
                    formData={formData} 
                    onChange={handleChange}
                    tagInput={tagInput}
                    setTagInput={setTagInput}
                    addTag={addTag}
                    removeTag={removeTag}
                  />
                )}
                {currentStep === 1 && (
                  <StepImportMethod 
                    importMethod={importMethod}
                    setImportMethod={setImportMethod}
                    methods={IMPORT_METHODS}
                  />
                )}
                {currentStep === 2 && (
                  <StepImport 
                    importMethod={importMethod}
                    isImporting={isImporting}
                    importProgress={importProgress}
                    questions={questions}
                    validationResults={validationResults}
                    onFileImport={handleFileImport}
                    fileInputRef={fileInputRef}
                  />
                )}
                {currentStep === 3 && (
                  <StepReview 
                    questions={questions}
                    validationResults={validationResults}
                    formData={formData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="relative z-10 flex items-center justify-between mt-8 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                currentStep === 0
                  ? 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200/50 dark:border-gray-700/50'
                  : 'bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50'
              }`}
            >
              <FaArrowLeft className="text-sm" />
              Previous
            </motion.button>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                Cancel
              </motion.button>
              {currentStep === STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 group"
                >
                  <FaSave className="group-hover:scale-110 transition-transform" />
                  {questions.length >= 100 ? 'Publish Quiz' : 'Save as Draft'}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 group"
                >
                  Next
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Step Components with Enhanced UI
function StepDetails({ formData, onChange, tagInput, setTagInput, addTag, removeTag }) {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
          <FaBook className="text-blue-500 text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Quiz Details
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the basic information for your quiz
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Quiz Title <span className="text-red-500">*</span>
          </label>
          <div className={`relative transition-all duration-300 ${focusedField === 'title' ? 'scale-[1.02]' : ''}`}>
            <FaBook className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${focusedField === 'title' ? 'text-purple-500' : ''}`} />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter quiz title"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Subject
          </label>
          <div className={`relative transition-all duration-300 ${focusedField === 'subject' ? 'scale-[1.02]' : ''}`}>
            <FaGraduationCap className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${focusedField === 'subject' ? 'text-purple-500' : ''}`} />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={onChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g., React, Python, Database"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <option value="">Select Category</option>
            <option value="Programming">💻 Programming</option>
            <option value="Web Development">🌐 Web Development</option>
            <option value="Database">🗄️ Database</option>
            <option value="Cloud Computing">☁️ Cloud Computing</option>
            <option value="Cybersecurity">🔒 Cybersecurity</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <div className={`relative transition-all duration-300 ${focusedField === 'description' ? 'scale-[1.02]' : ''}`}>
            <FaInfoCircle className={`absolute left-3 top-3 text-gray-400 transition-colors duration-300 ${focusedField === 'description' ? 'text-purple-500' : ''}`} />
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              rows="3"
              placeholder="Enter quiz description"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Difficulty
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={onChange}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <option value="Beginner">🌱 Beginner</option>
            <option value="Intermediate">📚 Intermediate</option>
            <option value="Advanced">🚀 Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Duration (minutes)
          </label>
          <div className="relative">
            <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={onChange}
              min="1"
              max="360"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">min</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Passing Score (%)
          </label>
          <div className="relative">
            <FaStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              name="passingScore"
              value={formData.passingScore}
              onChange={onChange}
              min="1"
              max="100"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <option value="draft">📝 Draft</option>
            <option value="published">🚀 Published</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="isVisible"
                checked={formData.isVisible}
                onChange={onChange}
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

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="Add tag and press Enter"
              className="flex-1 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
            <button
              onClick={addTag}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm border border-purple-200/50 dark:border-purple-700/30"
              >
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-500 transition-colors"
                >
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepImportMethod({ importMethod, setImportMethod, methods }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl">
          <FaFileImport className="text-purple-500 text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Choose Question Source
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select how you want to add questions to your quiz
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = importMethod === method.id;
          return (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setImportMethod(method.id)}
              className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                isSelected
                  ? `bg-gradient-to-br ${method.color} border-transparent text-white shadow-xl`
                  : 'border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-700/50 bg-white/50 dark:bg-gray-800/50 hover:shadow-lg'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <FaCheck className="text-white text-sm" />
                </div>
              )}
              <Icon className={`text-4xl mx-auto mb-2 ${
                isSelected ? 'text-white' : 'text-gray-500 dark:text-gray-400'
              }`} />
              <div className={`font-medium ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {method.label}
              </div>
              <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                {method.description}
              </div>
            </motion.button>
          );
        })}
      </div>

      {importMethod && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/30"
        >
          <p className="text-sm text-purple-700 dark:text-purple-300 flex items-center gap-2">
            <FaInfoCircle />
            Selected: <strong>{IMPORT_METHODS.find(m => m.id === importMethod)?.label}</strong>
          </p>
        </motion.div>
      )}
    </div>
  );
}

function StepImport({ importMethod, isImporting, importProgress, questions, validationResults, onFileImport, fileInputRef }) {
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileImport(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileImport(file);
    }
  };

  if (importMethod === 'manual') {
    return (
      <div className="text-center py-12">
        <div className="text-7xl mb-4">✏️</div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Manual Question Entry
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
          Create questions one by one using the question editor. This gives you full control over each question.
        </p>
        <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
          <FaPlus className="inline mr-2" />
          Add Question
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-green-100/50 to-emerald-100/50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
          <FaUpload className="text-green-500 text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Import Questions
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload a file to automatically extract questions
          </p>
        </div>
      </div>
      
      {/* Drop Zone */}
      {!isImporting && questions.length === 0 && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-gray-300/50 dark:border-gray-600/50 rounded-2xl p-12 text-center hover:border-purple-500/50 transition-all duration-300 bg-gray-50/50 dark:bg-gray-800/30"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4">
            <FaUpload className="text-4xl text-purple-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Drag and drop your file here, or
          </p>
          <label className="inline-block mt-3 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl cursor-pointer shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            Browse Files
            <input
              type="file"
              accept=".pdf,.docx,.txt,.json,.csv,.md"
              onChange={handleFileSelect}
              className="hidden"
              ref={fileInputRef}
            />
          </label>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            Supported formats: PDF, DOCX, TXT, JSON, CSV, Markdown
          </p>
        </div>
      )}

      {/* Import Progress */}
      {isImporting && (
        <div className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <FaSpinner className="text-purple-500 text-3xl animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                Importing Questions...
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please wait while we extract questions from your file
              </p>
            </div>
          </div>
          <div className="w-full h-2.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${importProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-right font-medium">
            {importProgress}%
          </p>
        </div>
      )}

      {/* Validation Results */}
      {validationResults && !isImporting && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 bg-green-100/50 dark:bg-green-900/30 rounded-lg">
              <FaCheckCircle className="text-green-500" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Import Summary
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl text-center border border-green-200/50 dark:border-green-700/30">
              <div className="text-2xl font-bold text-green-500">{validationResults.valid}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Valid Questions</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-50/50 to-rose-50/50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl text-center border border-red-200/50 dark:border-red-700/30">
              <div className="text-2xl font-bold text-red-500">{validationResults.invalid}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Invalid Questions</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl text-center border border-yellow-200/50 dark:border-yellow-700/30">
              <div className="text-2xl font-bold text-yellow-500">{validationResults.duplicates}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Duplicates</div>
            </div>
          </div>
          {validationResults.issues.length > 0 && (
            <div className="mt-3">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaExclamationTriangle className="text-yellow-500" />
                Issues Found:
              </h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 max-h-32 overflow-y-auto">
                {validationResults.issues.slice(0, 5).map((issue, i) => (
                  <li key={i} className="flex items-center gap-2 p-1.5 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
                    <span className="text-red-500">•</span>
                    <span className="font-medium">Q{issue.index + 1}:</span>
                    {issue.issues.join(', ')}
                  </li>
                ))}
                {validationResults.issues.length > 5 && (
                  <li className="text-gray-400 text-center">And {validationResults.issues.length - 5} more...</li>
                )}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Imported Questions Preview */}
      {questions.length > 0 && !isImporting && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                <FaClipboard className="text-blue-500" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                Imported Questions
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">({questions.length})</span>
            </div>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
              questions.length >= 100 
                ? 'bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-700/30' 
                : 'bg-yellow-100/50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200/50 dark:border-yellow-700/30'
            }`}>
              {questions.length >= 100 ? '✅ Ready to publish' : `${questions.length}/100 questions`}
            </span>
          </div>
          <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
            {questions.slice(0, 5).map((q, i) => (
              <div key={i} className="p-3 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 dark:text-gray-200 truncate flex-1">
                    Q{i + 1}: {q.question}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30 ml-2 flex-shrink-0">
                    {q.type}
                  </span>
                </div>
              </div>
            ))}
            {questions.length > 5 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                And {questions.length - 5} more questions...
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function StepReview({ questions, validationResults, formData }) {
  const totalQuestions = questions.length;
  const required = 100;
  const isComplete = totalQuestions >= required;
  const progress = Math.min((totalQuestions / required) * 100, 100);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-emerald-100/50 to-teal-100/50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl">
          <FaCheckCircle className="text-emerald-500 text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Review & Publish
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review your quiz details and questions before publishing
          </p>
        </div>
      </div>

      {/* Quiz Details Summary */}
      <div className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-6 mb-6 border border-gray-200/50 dark:border-gray-700/50">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <FaBook className="text-purple-500" />
          Quiz Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
            <div className="p-1.5 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
              <FaBook className="text-purple-500 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Title</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{formData.title || 'Untitled'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
            <div className="p-1.5 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
              <FaGraduationCap className="text-blue-500 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Subject</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{formData.subject || 'Not specified'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
            <div className="p-1.5 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
              <FaStar className="text-amber-500 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Difficulty</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{formData.difficulty}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-gray-700/50">
            <div className="p-1.5 bg-green-100/50 dark:bg-green-900/30 rounded-lg">
              <FaClock className="text-green-500 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{formData.duration} minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Question Summary */}
      <div className="bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-6 mb-6 border border-gray-200/50 dark:border-gray-700/50">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <FaClipboard className="text-blue-500" />
          Question Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-blue-500">{totalQuestions}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Questions</div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-green-500">{validationResults?.valid || 0}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Valid</div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-2xl font-bold text-red-500">{validationResults?.invalid || 0}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Invalid</div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl">
            <div className={`text-2xl font-bold ${isComplete ? 'text-green-500' : 'text-yellow-500'}`}>
              {isComplete ? '✅' : '⚠️'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {isComplete ? 'Ready to Publish' : `${required - totalQuestions} more needed`}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${
                isComplete ? 'from-emerald-500 to-teal-500' : 'from-purple-500 to-indigo-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Warning if incomplete */}
      {!isComplete && (
        <div className="bg-gradient-to-r from-yellow-50/50 to-amber-50/50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200/50 dark:border-yellow-700/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-yellow-500 text-lg mt-0.5" />
            <div>
              <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                Incomplete Quiz
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                You currently have <strong>{totalQuestions}</strong> questions. This quiz requires exactly <strong>{required}</strong> questions before it can be published.
              </p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs px-2 py-0.5 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-full text-yellow-700 dark:text-yellow-300">
                  {required - totalQuestions} more needed
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success message if complete */}
      {isComplete && (
        <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-emerald-500 text-lg mt-0.5" />
            <div>
              <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                Ready to Publish! 🎉
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                Your quiz has <strong>{totalQuestions}</strong> questions and is ready to be published.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizWizard;