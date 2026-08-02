// pages/Admin/Quizzes.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaCopy, 
  FaFileExport, FaFileImport, FaToggleOn, FaToggleOff,
  FaEllipsisV, FaBook, FaWrench, FaCog, FaEyeSlash,
  FaQuestionCircle, FaRocket, FaChartLine, FaUsers,
  FaSpinner, FaFilter, FaTimes, FaArrowLeft, FaArrowRight,
  FaSort, FaSortUp, FaSortDown, FaCheckCircle, FaClock,
  FaStar, FaFire, FaGraduationCap, FaLightbulb,
  FaDatabase, FaPlusCircle, FaList, FaThLarge
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import { quizCategories } from '../../data/quizCategories.js';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import QuizTable from '../../components/Admin/QuizTable.jsx';
import QuizFilters from '../../components/Admin/QuizFilters.jsx';
import QuizModal from '../../components/Admin/QuizModal.jsx';
import QuizViewModal from '../../components/Admin/QuizViewModal.jsx';
import QuizWizard from '../../components/Admin/QuizWizard/QuizWizard.jsx';
import QuizImportGuide from '../../components/Dashboard/QuizImportGuide.jsx';
import QuestionManager from '../../components/Admin/QuestionManager.jsx';

function AdminQuizzes() {
  const { loadQuizCategories, loadQuizAttempts } = useAdmin();
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [viewingQuiz, setViewingQuiz] = useState(null);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [showGuide, setShowGuide] = useState(false);
  const [managingQuiz, setManagingQuiz] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    status: 'all',
    visibility: 'all',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    loadQuizzes();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [quizzes, searchTerm, filters, sortBy]);

  const loadQuizzes = () => {
    try {
      setLoading(true);
      const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      
      const combined = [...quizCategories];
      
      stored.forEach(storedQuiz => {
        const index = combined.findIndex(q => q.id === storedQuiz.id);
        if (index !== -1) {
          combined[index] = { ...combined[index], ...storedQuiz };
        } else {
          combined.push(storedQuiz);
        }
      });
      
      const quizzesWithQuestions = combined.map(quiz => {
        const savedQuestions = localStorage.getItem(`questions_${quiz.id}`);
        if (savedQuestions) {
          try {
            const questions = JSON.parse(savedQuestions);
            return { ...quiz, questions };
          } catch (e) {
            return quiz;
          }
        }
        return quiz;
      });
      
      const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
      const quizzesWithStats = quizzesWithQuestions.map(quiz => {
        const quizAttempts = attempts.filter(a => a.quizTitle === quiz.title);
        const totalAttempts = quizAttempts.length;
        const passed = quizAttempts.filter(a => a.score >= 90).length;
        const avgScore = totalAttempts > 0 
          ? Math.round(quizAttempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts)
          : 0;
        return {
          ...quiz,
          totalAttempts,
          passed,
          avgScore,
          failRate: totalAttempts > 0 ? Math.round(((totalAttempts - passed) / totalAttempts) * 100) : 0,
          passRate: totalAttempts > 0 ? Math.round((passed / totalAttempts) * 100) : 0,
          isVisible: quiz.isVisible !== false,
          status: quiz.status || 'draft',
          createdAt: quiz.createdAt || new Date().toISOString(),
          updatedAt: quiz.updatedAt || new Date().toISOString(),
          totalQuestions: quiz.questions?.length || quiz.totalQuestions || 0,
        };
      });
      setQuizzes(quizzesWithStats);
      setFilteredQuizzes(quizzesWithStats);
      setLoading(false);
    } catch (error) {
      console.error('Error loading quizzes:', error);
      setQuizzes([]);
      setFilteredQuizzes([]);
      setLoading(false);
      toast.error('Failed to load quizzes');
    }
  };

  const applyFiltersAndSort = () => {
    try {
      let filtered = [...quizzes];

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(q =>
          q.title?.toLowerCase().includes(term) ||
          q.description?.toLowerCase().includes(term) ||
          q.difficulty?.toLowerCase().includes(term) ||
          q.tags?.some(tag => tag.toLowerCase().includes(term))
        );
      }

      if (filters.category !== 'all') {
        filtered = filtered.filter(q => q.title === filters.category);
      }

      if (filters.difficulty !== 'all') {
        filtered = filtered.filter(q => q.difficulty === filters.difficulty);
      }

      if (filters.status !== 'all') {
        filtered = filtered.filter(q => q.status === filters.status);
      }

      if (filters.visibility !== 'all') {
        filtered = filtered.filter(q => 
          filters.visibility === 'visible' ? q.isVisible !== false : q.isVisible === false
        );
      }

      switch (sortBy) {
        case 'alphabetical':
          filtered.sort((a, b) => a.title?.localeCompare(b.title) || 0);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'most-attempted':
          filtered.sort((a, b) => (b.totalAttempts || 0) - (a.totalAttempts || 0));
          break;
        case 'highest-rated':
          filtered.sort((a, b) => (b.avgScore || 0) - (a.avgScore || 0));
          break;
        case 'most-questions':
          filtered.sort((a, b) => (b.totalQuestions || 0) - (a.totalQuestions || 0));
          break;
        case 'recently-updated':
          filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          break;
        default:
          break;
      }

      setFilteredQuizzes(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const handleAddQuizWizard = () => {
    setIsWizardOpen(true);
  };

  const handleSaveQuizWizard = (quizData) => {
    try {
      const newQuiz = {
        ...quizData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalAttempts: 0,
        passed: 0,
        avgScore: 0,
        passRate: 0,
        isVisible: true,
        status: quizData.status || 'draft',
        questions: quizData.questions || [],
      };
      
      const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      stored.push(newQuiz);
      localStorage.setItem('quizCategories', JSON.stringify(stored));
      
      if (newQuiz.questions && newQuiz.questions.length > 0) {
        localStorage.setItem(`questions_${newQuiz.id}`, JSON.stringify(newQuiz.questions));
      }
      
      const updatedQuizzes = [...quizzes, newQuiz];
      setQuizzes(updatedQuizzes);
      setIsWizardOpen(false);
      toast.success('Quiz created successfully! 🎉');
      loadQuizzes();
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast.error('Failed to save quiz');
    }
  };

  const handleAddQuiz = () => {
    setEditingQuiz(null);
    setIsModalOpen(true);
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleSaveQuiz = (quizData) => {
    try {
      let updatedQuizzes;
      let stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      
      if (editingQuiz) {
        updatedQuizzes = quizzes.map(q => 
          q.id === editingQuiz.id 
            ? { ...q, ...quizData, updatedAt: new Date().toISOString() }
            : q
        );
        
        const updatedStored = stored.map(q =>
          q.id === editingQuiz.id ? { ...q, ...quizData, updatedAt: new Date().toISOString() } : q
        );
        localStorage.setItem('quizCategories', JSON.stringify(updatedStored));
        
        toast.success('Quiz updated successfully! ✅');
      } else {
        const newQuiz = {
          ...quizData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          totalAttempts: 0,
          passed: 0,
          avgScore: 0,
          passRate: 0,
          isVisible: true,
          status: 'draft',
          questions: quizData.questions || [],
        };
        updatedQuizzes = [...quizzes, newQuiz];
        
        stored.push(newQuiz);
        localStorage.setItem('quizCategories', JSON.stringify(stored));
        
        if (newQuiz.questions && newQuiz.questions.length > 0) {
          localStorage.setItem(`questions_${newQuiz.id}`, JSON.stringify(newQuiz.questions));
        }
        
        toast.success('Quiz created successfully! 🎉');
      }
      
      setQuizzes(updatedQuizzes);
      setIsModalOpen(false);
      setEditingQuiz(null);
      loadQuizzes();
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast.error('Failed to save quiz');
    }
  };

  const handleDeleteQuiz = (quiz) => {
    Swal.fire({
      title: 'Delete Quiz?',
      html: `
        <div class="text-left">
          <p class="text-gray-600 dark:text-gray-300">Are you sure you want to delete <strong>"${quiz.title}"</strong>?</p>
          <ul class="mt-3 space-y-1 text-sm text-red-500 dark:text-red-400">
            <li>⚠️ This action cannot be undone</li>
            <li>⚠️ All questions will be permanently removed</li>
            <li>⚠️ All attempt data will be lost</li>
          </ul>
        </div>
      `,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#8b5cf6',
      confirmButtonText: '🗑️ Delete Permanently',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const updatedQuizzes = quizzes.filter(q => q.id !== quiz.id);
          const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
          const filtered = stored.filter(q => q.id !== quiz.id);
          localStorage.setItem('quizCategories', JSON.stringify(filtered));
          localStorage.removeItem(`questions_${quiz.id}`);
          
          setQuizzes(updatedQuizzes);
          toast.success(`"${quiz.title}" has been deleted.`);
          loadQuizzes();
        } catch (error) {
          console.error('Error deleting quiz:', error);
          toast.error('Failed to delete quiz');
        }
      }
    });
  };

  const handleToggleVisibility = (quiz) => {
    try {
      const newVisibility = !quiz.isVisible;
      
      const updatedQuizzes = quizzes.map(q =>
        q.id === quiz.id ? { ...q, isVisible: newVisibility, updatedAt: new Date().toISOString() } : q
      );
      
      let stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      const existingIndex = stored.findIndex(q => q.id === quiz.id);
      
      if (existingIndex !== -1) {
        stored[existingIndex] = { 
          ...stored[existingIndex], 
          isVisible: newVisibility,
          updatedAt: new Date().toISOString()
        };
      } else {
        stored.push({
          id: quiz.id,
          title: quiz.title,
          isVisible: newVisibility,
          updatedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem('quizCategories', JSON.stringify(stored));
      setQuizzes(updatedQuizzes);
      
      toast.success(
        newVisibility 
          ? `✅ "${quiz.title}" is now visible to students.` 
          : `🔒 "${quiz.title}" has been hidden from students.`
      );
      loadQuizzes();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast.error('Failed to update visibility');
    }
  };

  const handleDuplicateQuiz = (quiz) => {
    try {
      const newQuiz = {
        ...quiz,
        id: Date.now().toString(),
        title: `Copy of ${quiz.title}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalAttempts: 0,
        passed: 0,
        avgScore: 0,
        passRate: 0,
        status: 'draft',
        isVisible: true,
        questions: quiz.questions || [],
      };
      
      const updatedQuizzes = [...quizzes, newQuiz];
      const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      stored.push(newQuiz);
      localStorage.setItem('quizCategories', JSON.stringify(stored));
      
      if (newQuiz.questions && newQuiz.questions.length > 0) {
        localStorage.setItem(`questions_${newQuiz.id}`, JSON.stringify(newQuiz.questions));
      }
      
      setQuizzes(updatedQuizzes);
      toast.success(`"${newQuiz.title}" created successfully!`);
      loadQuizzes();
    } catch (error) {
      console.error('Error duplicating quiz:', error);
      toast.error('Failed to duplicate quiz');
    }
  };

  const handleBulkAction = (action) => {
    if (selectedQuizzes.length === 0) {
      toast.warning('Please select at least one quiz.');
      return;
    }

    const actionNames = {
      delete: 'Delete',
      hide: 'Hide',
      show: 'Show',
      archive: 'Archive',
      duplicate: 'Duplicate',
      export: 'Export',
    };

    Swal.fire({
      title: `${actionNames[action]} Selected Quizzes?`,
      text: `You are about to ${action} ${selectedQuizzes.length} quiz(es).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'delete' ? '#ef4444' : '#8b5cf6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          let updatedQuizzes = [...quizzes];
          let stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');

          switch (action) {
            case 'delete':
              updatedQuizzes = quizzes.filter(q => !selectedQuizzes.includes(q.id));
              const filteredStored = stored.filter(q => !selectedQuizzes.includes(q.id));
              selectedQuizzes.forEach(id => {
                localStorage.removeItem(`questions_${id}`);
              });
              localStorage.setItem('quizCategories', JSON.stringify(filteredStored));
              break;
            case 'hide':
              updatedQuizzes = quizzes.map(q =>
                selectedQuizzes.includes(q.id) ? { ...q, isVisible: false } : q
              );
              const hiddenStored = stored.map(q =>
                selectedQuizzes.includes(q.id) ? { ...q, isVisible: false } : q
              );
              selectedQuizzes.forEach(id => {
                if (!stored.some(q => q.id === id)) {
                  const quiz = quizzes.find(q => q.id === id);
                  if (quiz) {
                    hiddenStored.push({
                      id: quiz.id,
                      title: quiz.title,
                      isVisible: false,
                      updatedAt: new Date().toISOString()
                    });
                  }
                }
              });
              localStorage.setItem('quizCategories', JSON.stringify(hiddenStored));
              break;
            case 'show':
              updatedQuizzes = quizzes.map(q =>
                selectedQuizzes.includes(q.id) ? { ...q, isVisible: true } : q
              );
              const shownStored = stored.map(q =>
                selectedQuizzes.includes(q.id) ? { ...q, isVisible: true } : q
              );
              selectedQuizzes.forEach(id => {
                if (!stored.some(q => q.id === id)) {
                  const quiz = quizzes.find(q => q.id === id);
                  if (quiz) {
                    shownStored.push({
                      id: quiz.id,
                      title: quiz.title,
                      isVisible: true,
                      updatedAt: new Date().toISOString()
                    });
                  }
                }
              });
              localStorage.setItem('quizCategories', JSON.stringify(shownStored));
              break;
            case 'archive':
              updatedQuizzes = quizzes.map(q =>
                selectedQuizzes.includes(q.id) ? { ...q, status: 'archived', isVisible: false } : q
              );
              const archivedStored = stored.map(q =>
                selectedQuizzes.includes(q.id) ? { ...q, status: 'archived', isVisible: false } : q
              );
              selectedQuizzes.forEach(id => {
                if (!stored.some(q => q.id === id)) {
                  const quiz = quizzes.find(q => q.id === id);
                  if (quiz) {
                    archivedStored.push({
                      id: quiz.id,
                      title: quiz.title,
                      status: 'archived',
                      isVisible: false,
                      updatedAt: new Date().toISOString()
                    });
                  }
                }
              });
              localStorage.setItem('quizCategories', JSON.stringify(archivedStored));
              break;
            case 'duplicate':
              const duplicates = quizzes
                .filter(q => selectedQuizzes.includes(q.id))
                .map(q => ({
                  ...q,
                  id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                  title: `Copy of ${q.title}`,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  totalAttempts: 0,
                  passed: 0,
                  avgScore: 0,
                  passRate: 0,
                  status: 'draft',
                  isVisible: true,
                  questions: q.questions || [],
                }));
              updatedQuizzes = [...quizzes, ...duplicates];
              const dupStored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
              dupStored.push(...duplicates);
              localStorage.setItem('quizCategories', JSON.stringify(dupStored));
              duplicates.forEach(dup => {
                if (dup.questions && dup.questions.length > 0) {
                  localStorage.setItem(`questions_${dup.id}`, JSON.stringify(dup.questions));
                }
              });
              break;
            case 'export':
              const exportData = quizzes.filter(q => selectedQuizzes.includes(q.id));
              const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `quizzes-export-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
              toast.success('Quizzes exported successfully!');
              break;
            default:
              break;
          }

          setQuizzes(updatedQuizzes);
          setSelectedQuizzes([]);
          toast.success(`${selectedQuizzes.length} quiz(es) ${action}ed successfully!`);
          loadQuizzes();
        } catch (error) {
          console.error('Error performing bulk action:', error);
          toast.error('Failed to perform bulk action');
        }
      }
    });
  };

  const handleImportQuiz = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          const quizzesToImport = Array.isArray(importedData) ? importedData : [importedData];
          const newQuizzes = quizzesToImport.map(q => ({
            ...q,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            totalAttempts: 0,
            passed: 0,
            avgScore: 0,
            passRate: 0,
            isVisible: true,
            questions: q.questions || [],
          }));
          
          const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
          stored.push(...newQuizzes);
          localStorage.setItem('quizCategories', JSON.stringify(stored));
          
          newQuizzes.forEach(quiz => {
            if (quiz.questions && quiz.questions.length > 0) {
              localStorage.setItem(`questions_${quiz.id}`, JSON.stringify(quiz.questions));
            }
          });
          
          setQuizzes([...quizzes, ...newQuizzes]);
          toast.success(`${newQuizzes.length} quiz(es) imported successfully!`);
          loadQuizzes();
        } catch (error) {
          toast.error('Failed to import quizzes. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const getStatusBadge = (status) => {
    const badges = {
      published: 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-700/30',
      draft: 'bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/50 dark:border-amber-700/30',
      hidden: 'bg-gray-100/50 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400 border-gray-200/50 dark:border-gray-700/30',
      archived: 'bg-rose-100/50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200/50 dark:border-rose-700/30',
    };
    return badges[status] || badges.draft;
  };

  const handleManageQuestions = (quiz) => {
    const savedQuestions = localStorage.getItem(`questions_${quiz.id}`);
    if (savedQuestions) {
      try {
        const questions = JSON.parse(savedQuestions);
        setManagingQuiz({ ...quiz, questions });
        return;
      } catch (e) {}
    }
    setManagingQuiz(quiz);
  };

  const handleSaveQuestions = (updatedQuestions) => {
    if (!managingQuiz) return;
    
    try {
      const updatedQuizzes = quizzes.map(q => {
        if (q.id === managingQuiz.id) {
          return { 
            ...q, 
            questions: updatedQuestions,
            totalQuestions: updatedQuestions.length,
            updatedAt: new Date().toISOString()
          };
        }
        return q;
      });
      
      const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      const updatedStored = stored.map(q => {
        if (q.id === managingQuiz.id) {
          return { 
            ...q, 
            questions: updatedQuestions,
            totalQuestions: updatedQuestions.length,
            updatedAt: new Date().toISOString()
          };
        }
        return q;
      });
      localStorage.setItem('quizCategories', JSON.stringify(updatedStored));
      localStorage.setItem(`questions_${managingQuiz.id}`, JSON.stringify(updatedQuestions));
      
      setQuizzes(updatedQuizzes);
      toast.success(`Questions for "${managingQuiz.title}" updated successfully! ✅`);
      setManagingQuiz(null);
      loadQuizzes();
    } catch (error) {
      console.error('Error saving questions:', error);
      toast.error('Failed to save questions');
    }
  };

  // Statistics
  const totalQuizzes = quizzes.length;
  const visibleQuizzes = quizzes.filter(q => q.isVisible !== false).length;
  const publishedQuizzes = quizzes.filter(q => q.status === 'published').length;
  const totalAttempts = quizzes.reduce((acc, q) => acc + (q.totalAttempts || 0), 0);
  const avgPassRate = quizzes.length > 0 
    ? Math.round(quizzes.reduce((acc, q) => acc + (q.passRate || 0), 0) / quizzes.length)
    : 0;

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
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading quizzes...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Preparing your quiz library</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/5 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
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
              <FaBook className="text-white text-2xl" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Quiz Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Manage all quizzes and questions
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
            <FaBook className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {totalQuizzes} Total
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaEye className="text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {visibleQuizzes} Visible
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaRocket className="text-amber-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {publishedQuizzes} Published
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaUsers className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {totalAttempts} Attempts
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Quizzes', value: totalQuizzes, icon: FaBook, color: 'purple', gradient: 'from-purple-500 to-indigo-500' },
          { label: 'Visible Quizzes', value: visibleQuizzes, icon: FaEye, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
          { label: 'Published', value: publishedQuizzes, icon: FaRocket, color: 'amber', gradient: 'from-amber-500 to-orange-500' },
          { label: 'Total Attempts', value: totalAttempts, icon: FaUsers, color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
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

      {/* Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAddQuizWizard}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <FaPlus />
            Add Quiz
          </button>
          <button
            onClick={() => setShowGuide(true)}
            className="px-4 py-2.5 bg-purple-100/50 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-800/50 hover:bg-purple-200/50 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl font-medium flex items-center gap-2 transition-all duration-300"
          >
            <FaQuestionCircle />
            Import Guide
          </button>
          <button
            onClick={handleImportQuiz}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl font-medium flex items-center gap-2 transition-all duration-300"
          >
            <FaFileImport />
            Import
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <FaList />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <FaThLarge />
            </button>
          </div>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredQuizzes.length} quizzes found
          </span>
          {selectedQuizzes.length > 0 && (
            <span className="px-3 py-1 bg-purple-100/50 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium">
              {selectedQuizzes.length} selected
            </span>
          )}
        </div>
      </motion.div>

      {/* Quiz Filters */}
      <QuizFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={quizCategories.map(c => c.title)}
        onBulkAction={handleBulkAction}
        selectedCount={selectedQuizzes.length}
      />

      {/* Quiz Table */}
      <QuizTable
        quizzes={filteredQuizzes}
        loading={loading}
        selectedQuizzes={selectedQuizzes}
        onSelectQuiz={(id) => {
          setSelectedQuizzes(prev =>
            prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
          );
        }}
        onSelectAll={(ids) => {
          setSelectedQuizzes(selectedQuizzes.length === filteredQuizzes.length ? [] : ids);
        }}
        onEdit={handleEditQuiz}
        onView={setViewingQuiz}
        onDelete={handleDeleteQuiz}
        onToggleVisibility={handleToggleVisibility}
        onDuplicate={handleDuplicateQuiz}
        onManageQuestions={handleManageQuestions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        getStatusBadge={getStatusBadge}
      />

      {/* Modals */}
      <QuizModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuiz(null);
        }}
        onSave={handleSaveQuiz}
        quiz={editingQuiz}
      />

      <QuizWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSave={handleSaveQuizWizard}
      />

      {viewingQuiz && (
        <QuizViewModal
          quiz={viewingQuiz}
          onClose={() => setViewingQuiz(null)}
        />
      )}

      <QuizImportGuide
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      {managingQuiz && (
        <QuestionManager
          quiz={managingQuiz}
          onClose={() => setManagingQuiz(null)}
          onSave={handleSaveQuestions}
        />
      )}
    </div>
  );
}

export default AdminQuizzes;