// src/context/QuizContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';
import { questions } from '../data/questions.js';
import { quizCategories } from '../data/quizCategories.js';
import { useAuth } from './AuthContext.jsx';

// Initial state
const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  quizCompleted: false,
  darkMode: false,
  timer: 0,
  isTimerRunning: false,
  showResults: false,
  questionTimer: 10,
  questionTimerRunning: false,
  canNavigateBack: false,
  quizStarted: false,
  showInstructions: false,
  resultsDisplayed: false,
  isSubmitting: false,
  selectedQuiz: null,
  selectedTopic: null,
  favorites: [],
  recentlyTaken: [],
  isReviewing: false,
  quizHistory: [],
  countdownTimer: 0,
  countdownTimerRunning: false,
  countdownTimerInitial: 0,
  // ✅ NEW: Active quiz state
  isQuizActive: false,
};

// Action types
const ACTIONS = {
  SET_QUESTIONS: 'SET_QUESTIONS',
  SELECT_ANSWER: 'SELECT_ANSWER',
  NEXT_QUESTION: 'NEXT_QUESTION',
  PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
  COMPLETE_QUIZ: 'COMPLETE_QUIZ',
  RESTART_QUIZ: 'RESTART_QUIZ',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_TIMER: 'SET_TIMER',
  TOGGLE_TIMER: 'TOGGLE_TIMER',
  SET_SHOW_RESULTS: 'SET_SHOW_RESULTS',
  SET_QUESTION_TIMER: 'SET_QUESTION_TIMER',
  TOGGLE_QUESTION_TIMER: 'TOGGLE_QUESTION_TIMER',
  RESET_QUESTION_TIMER: 'RESET_QUESTION_TIMER',
  SET_CAN_NAVIGATE_BACK: 'SET_CAN_NAVIGATE_BACK',
  START_QUIZ: 'START_QUIZ',
  TOGGLE_INSTRUCTIONS: 'TOGGLE_INSTRUCTIONS',
  SET_RESULTS_DISPLAYED: 'SET_RESULTS_DISPLAYED',
  SET_SUBMITTING: 'SET_SUBMITTING',
  SELECT_QUIZ: 'SELECT_QUIZ',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  ADD_RECENTLY_TAKEN: 'ADD_RECENTLY_TAKEN',
  CLEAR_QUIZ_STATE: 'CLEAR_QUIZ_STATE',
  SET_REVIEWING: 'SET_REVIEWING',
  ADD_QUIZ_HISTORY: 'ADD_QUIZ_HISTORY',
  SET_COUNTDOWN_TIMER: 'SET_COUNTDOWN_TIMER',
  TOGGLE_COUNTDOWN_TIMER: 'TOGGLE_COUNTDOWN_TIMER',
  RESET_COUNTDOWN_TIMER: 'RESET_COUNTDOWN_TIMER',
  DECREMENT_COUNTDOWN_TIMER: 'DECREMENT_COUNTDOWN_TIMER',
  // ✅ NEW: Set quiz active state
  SET_QUIZ_ACTIVE: 'SET_QUIZ_ACTIVE',
};

// Reducer function
function quizReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_QUESTIONS:
      return { ...state, questions: action.payload };
    case ACTIONS.SELECT_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
        questionTimer: 10,
        questionTimerRunning: true,
      };
    case ACTIONS.PREVIOUS_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case ACTIONS.COMPLETE_QUIZ:
      return {
        ...state,
        quizCompleted: true,
        isTimerRunning: false,
        showResults: true,
        questionTimerRunning: false,
        canNavigateBack: true,
        isSubmitting: false,
        countdownTimerRunning: false,
        // ✅ End quiz session on completion
        isQuizActive: false,
      };
    case ACTIONS.RESTART_QUIZ:
      return {
        ...initialState,
        questions: state.questions,
        darkMode: state.darkMode,
        canNavigateBack: false,
        quizStarted: false,
        selectedQuiz: state.selectedQuiz,
        favorites: state.favorites,
        recentlyTaken: state.recentlyTaken,
        // ✅ Reset quiz active state
        isQuizActive: false,
      };
    case ACTIONS.TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case ACTIONS.SET_TIMER:
      return { ...state, timer: action.payload };
    case ACTIONS.TOGGLE_TIMER:
      return { ...state, isTimerRunning: !state.isTimerRunning };
    case ACTIONS.SET_SHOW_RESULTS:
      return { ...state, showResults: action.payload };
    case ACTIONS.SET_QUESTION_TIMER:
      return { ...state, questionTimer: action.payload };
    case ACTIONS.TOGGLE_QUESTION_TIMER:
      return { ...state, questionTimerRunning: !state.questionTimerRunning };
    case ACTIONS.RESET_QUESTION_TIMER:
      return { ...state, questionTimer: 10, questionTimerRunning: true };
    case ACTIONS.SET_CAN_NAVIGATE_BACK:
      return { ...state, canNavigateBack: action.payload };
    case ACTIONS.START_QUIZ: {
      const totalQuestions = state.questions.length || 0;
      const totalMinutes = totalQuestions <= 50 ? 20 : 40;
      const totalSeconds = totalMinutes * 60;
      
      return { 
        ...state, 
        quizStarted: true, 
        isTimerRunning: true, 
        questionTimerRunning: true,
        countdownTimer: totalSeconds,
        countdownTimerInitial: totalSeconds,
        countdownTimerRunning: true,
        // ✅ Set quiz as active when started
        isQuizActive: true,
      };
    }
    case ACTIONS.TOGGLE_INSTRUCTIONS:
      return { ...state, showInstructions: !state.showInstructions };
    case ACTIONS.SET_RESULTS_DISPLAYED:
      return { ...state, resultsDisplayed: action.payload };
    case ACTIONS.SET_SUBMITTING:
      return { ...state, isSubmitting: action.payload };
    case ACTIONS.SELECT_QUIZ: {
      let questions = action.payload.questions || [];
      
      if (!questions || questions.length === 0) {
        const savedQuestions = localStorage.getItem(`questions_${action.payload.id}`);
        if (savedQuestions) {
          try {
            questions = JSON.parse(savedQuestions);
          } catch (e) {
            console.error('Error parsing saved questions:', e);
          }
        }
      }
      
      return {
        ...state,
        selectedQuiz: { 
          ...action.payload, 
          questions: questions,
          totalQuestions: questions.length || action.payload.totalQuestions || 0
        },
        selectedTopic: action.payload?.title || null,
        questions: questions,
        currentQuestionIndex: 0,
        answers: {},
        quizCompleted: false,
        quizStarted: false,
        timer: 0,
        isTimerRunning: false,
        showResults: false,
        questionTimer: 10,
        questionTimerRunning: false,
        canNavigateBack: false,
        resultsDisplayed: false,
        isSubmitting: false,
        isReviewing: false,
        countdownTimer: 0,
        countdownTimerRunning: false,
        countdownTimerInitial: 0,
        // ✅ Reset quiz active state when selecting new quiz
        isQuizActive: false,
      };
    }
    case ACTIONS.TOGGLE_FAVORITE: {
      const favs = state.favorites || [];
      const index = favs.indexOf(action.payload);
      if (index !== -1) {
        favs.splice(index, 1);
      } else {
        favs.push(action.payload);
      }
      return { ...state, favorites: favs };
    }
    case ACTIONS.ADD_RECENTLY_TAKEN: {
      const recent = [action.payload, ...(state.recentlyTaken || []).filter(id => id !== action.payload)].slice(0, 5);
      return { ...state, recentlyTaken: recent };
    }
    case ACTIONS.CLEAR_QUIZ_STATE:
      return {
        ...state,
        questions: [],
        currentQuestionIndex: 0,
        answers: {},
        quizCompleted: false,
        quizStarted: false,
        timer: 0,
        isTimerRunning: false,
        showResults: false,
        questionTimer: 10,
        questionTimerRunning: false,
        canNavigateBack: false,
        resultsDisplayed: false,
        isSubmitting: false,
        isReviewing: false,
        countdownTimer: 0,
        countdownTimerRunning: false,
        countdownTimerInitial: 0,
        // ✅ Reset quiz active state
        isQuizActive: false,
      };
    case ACTIONS.SET_REVIEWING:
      return { ...state, isReviewing: action.payload };
    case ACTIONS.ADD_QUIZ_HISTORY:
      return { ...state, quizHistory: [action.payload, ...(state.quizHistory || [])] };
    case ACTIONS.SET_COUNTDOWN_TIMER:
      return { ...state, countdownTimer: action.payload };
    case ACTIONS.TOGGLE_COUNTDOWN_TIMER:
      return { ...state, countdownTimerRunning: !state.countdownTimerRunning };
    case ACTIONS.RESET_COUNTDOWN_TIMER: {
      const totalQuestions = state.questions.length || 0;
      const totalMinutes = totalQuestions <= 50 ? 20 : 40;
      const totalSeconds = totalMinutes * 60;
      return { 
        ...state, 
        countdownTimer: totalSeconds,
        countdownTimerInitial: totalSeconds,
        countdownTimerRunning: true,
      };
    }
    case ACTIONS.DECREMENT_COUNTDOWN_TIMER:
      return { ...state, countdownTimer: Math.max(0, state.countdownTimer - 1) };
    // ✅ NEW: Set quiz active state
    case ACTIONS.SET_QUIZ_ACTIVE:
      return { ...state, isQuizActive: action.payload };
    default:
      return state;
  }
}

// Create context
const QuizContext = createContext();

// Provider component
export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { addQuizHistory: addStudentQuizHistory, student } = useAuth();
  
  // Use refs to track timer intervals
  const timerIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const questionTimerIntervalRef = useRef(null);
  const isMountedRef = useRef(true);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.questions && parsed.questions.length > 0) {
          dispatch({ type: ACTIONS.SET_QUESTIONS, payload: parsed.questions });
        }
        if (parsed.selectedQuiz) {
          const quizWithQuestions = { ...parsed.selectedQuiz };
          const savedQuestions = localStorage.getItem(`questions_${parsed.selectedQuiz.id}`);
          if (savedQuestions) {
            try {
              quizWithQuestions.questions = JSON.parse(savedQuestions);
            } catch (e) {
              console.error('Error parsing saved questions:', e);
            }
          }
          dispatch({ type: ACTIONS.SELECT_QUIZ, payload: quizWithQuestions });
        }
        if (parsed.favorites) {
          dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: parsed.favorites });
        }
        if (parsed.countdownTimer > 0 && parsed.quizStarted && !parsed.quizCompleted) {
          dispatch({ type: ACTIONS.SET_COUNTDOWN_TIMER, payload: parsed.countdownTimer });
          dispatch({ type: ACTIONS.TOGGLE_COUNTDOWN_TIMER });
        }
        // ✅ Restore quiz active state if quiz is in progress
        if (parsed.isQuizActive && parsed.quizStarted && !parsed.quizCompleted) {
          dispatch({ type: ACTIONS.SET_QUIZ_ACTIVE, payload: true });
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
    
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (questionTimerIntervalRef.current) clearInterval(questionTimerIntervalRef.current);
    };
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('quizState', JSON.stringify(state));
    }, 300);
    return () => clearTimeout(saveTimeout);
  }, [state]);

  // ✅ Save active state to sessionStorage for persistence across refreshes
  useEffect(() => {
    if (state.isQuizActive) {
      sessionStorage.setItem('quizActive', 'true');
    } else {
      sessionStorage.removeItem('quizActive');
    }
  }, [state.isQuizActive]);

  // ✅ Restore active state from sessionStorage on mount
  useEffect(() => {
    const savedActive = sessionStorage.getItem('quizActive');
    if (savedActive === 'true' && state.quizStarted && !state.quizCompleted) {
      dispatch({ type: ACTIONS.SET_QUIZ_ACTIVE, payload: true });
    }
  }, []);

  // Overall timer effect
  useEffect(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (state.isTimerRunning && !state.quizCompleted && state.quizStarted && state.questions.length > 0) {
      timerIntervalRef.current = setInterval(() => {
        if (isMountedRef.current) {
          dispatch({ type: ACTIONS.SET_TIMER, payload: state.timer + 1 });
        }
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [state.isTimerRunning, state.quizCompleted, state.quizStarted, state.questions.length]);

  // Countdown timer effect
  useEffect(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    if (state.countdownTimerRunning && !state.quizCompleted && state.quizStarted && state.countdownTimer > 0) {
      countdownIntervalRef.current = setInterval(() => {
        if (isMountedRef.current) {
          dispatch({ type: ACTIONS.DECREMENT_COUNTDOWN_TIMER });
          
          const newTime = state.countdownTimer - 1;
          if (newTime <= 0) {
            handleAutoSubmit();
          }
        }
      }, 1000);
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [state.countdownTimerRunning, state.countdownTimer, state.quizCompleted, state.quizStarted]);

  // Per-question timer effect
  useEffect(() => {
    if (questionTimerIntervalRef.current) {
      clearInterval(questionTimerIntervalRef.current);
      questionTimerIntervalRef.current = null;
    }

    if (state.questionTimerRunning && !state.quizCompleted && state.quizStarted && state.questionTimer > 0 && state.questions.length > 0) {
      questionTimerIntervalRef.current = setInterval(() => {
        if (isMountedRef.current) {
          const newTime = state.questionTimer - 1;
          dispatch({ type: ACTIONS.SET_QUESTION_TIMER, payload: newTime });
          
          if (newTime === 0) {
            handleQuestionTimeout();
          }
        }
      }, 1000);
    }

    return () => {
      if (questionTimerIntervalRef.current) {
        clearInterval(questionTimerIntervalRef.current);
        questionTimerIntervalRef.current = null;
      }
    };
  }, [state.questionTimerRunning, state.questionTimer, state.quizCompleted, state.quizStarted, state.questions.length]);

  // Extract handlers to prevent recreating in effects
  const handleAutoSubmit = useCallback(() => {
    if (!isMountedRef.current) return;
    
    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });
    setTimeout(() => {
      if (!isMountedRef.current) return;
      
      const results = getResults();
      const currentQuestions = state.questions || [];
      const currentAnswers = state.answers || {};
      
      const historyEntry = {
        id: Date.now().toString(),
        quizId: state.selectedQuiz?.id,
        quizTitle: state.selectedQuiz?.title,
        date: new Date().toISOString(),
        score: results.percentage,
        passed: results.passed,
        failed: results.failed,
        unanswered: results.unanswered,
        total: results.total,
        timeTaken: state.timer,
        questions: currentQuestions.map(q => ({ ...q })),
        answers: { ...currentAnswers },
      };
      
      const attemptKey = `attempt_${historyEntry.id}`;
      localStorage.setItem(attemptKey, JSON.stringify({
        questions: historyEntry.questions,
        answers: historyEntry.answers,
        quizTitle: historyEntry.quizTitle,
        score: historyEntry.score,
        date: historyEntry.date,
      }));
      
      if (state.selectedQuiz?.id) {
        const quizAttemptsKey = `quiz_attempts_${state.selectedQuiz.id}`;
        const existingAttempts = JSON.parse(localStorage.getItem(quizAttemptsKey) || '[]');
        existingAttempts.push(historyEntry.id);
        localStorage.setItem(quizAttemptsKey, JSON.stringify(existingAttempts));
      }
      
      dispatch({ type: ACTIONS.ADD_QUIZ_HISTORY, payload: historyEntry });
      addStudentQuizHistory(historyEntry);
      dispatch({ type: ACTIONS.COMPLETE_QUIZ });
      if (state.selectedQuiz) {
        dispatch({ type: ACTIONS.ADD_RECENTLY_TAKEN, payload: state.selectedQuiz.id });
      }
    }, 500);
  }, [state, addStudentQuizHistory]);

  const handleQuestionTimeout = useCallback(() => {
    if (!isMountedRef.current) return;
    
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isAnswered = state.answers[currentQuestion?.id];
    const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
    
    if (isLastQuestion) {
      handleAutoSubmit();
      return;
    }
    
    if (!isAnswered && currentQuestion) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        dispatch({ type: ACTIONS.NEXT_QUESTION });
      }
    }
  }, [state, handleAutoSubmit]);

  // Reset question timer when question changes
  useEffect(() => {
    if (!state.quizCompleted && state.quizStarted && state.questions.length > 0) {
      dispatch({ type: ACTIONS.RESET_QUESTION_TIMER });
    }
  }, [state.currentQuestionIndex]);

  // Get results helper
  const getResults = useCallback(() => {
    let passed = 0;
    let failed = 0;
    let total = state.questions.length;
    let unanswered = 0;

    state.questions.forEach(q => {
      const userAnswer = state.answers[q.id];
      if (userAnswer) {
        if (userAnswer === q.correctAnswer) {
          passed++;
        } else {
          failed++;
        }
      } else {
        unanswered++;
      }
    });

    const answered = passed + failed;
    const percentage = total > 0 ? (passed / total) * 100 : 0;
    return { 
      passed, 
      failed, 
      total, 
      percentage, 
      answered,
      unanswered,
      timeTaken: state.timer,
      quizTitle: state.selectedQuiz?.title || 'Quiz',
      topic: state.selectedQuiz?.title || 'General',
      difficulty: state.selectedQuiz?.difficulty || 'N/A'
    };
  }, [state.questions, state.answers, state.timer, state.selectedQuiz]);

  // ✅ NEW: Set quiz active state
  const setQuizActive = useCallback((active) => {
    dispatch({ type: ACTIONS.SET_QUIZ_ACTIVE, payload: active });
    if (active) {
      sessionStorage.setItem('quizActive', 'true');
    } else {
      sessionStorage.removeItem('quizActive');
    }
  }, []);

  // Context value - memoized to prevent unnecessary re-renders
  const value = {
    state,
    dispatch,
    actions: ACTIONS,
    // ✅ NEW: Expose isQuizActive directly
    isQuizActive: state.isQuizActive,
    // ✅ NEW: Set quiz active function
    setQuizActive,
    selectAnswer: useCallback((questionId, answer) => {
      dispatch({ type: ACTIONS.SELECT_ANSWER, payload: { questionId, answer } });
    }, []),
    nextQuestion: useCallback(() => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        dispatch({ type: ACTIONS.NEXT_QUESTION });
      }
    }, [state.currentQuestionIndex, state.questions.length]),
    previousQuestion: useCallback(() => {
      if (state.canNavigateBack && state.currentQuestionIndex > 0) {
        dispatch({ type: ACTIONS.PREVIOUS_QUESTION });
      }
    }, [state.canNavigateBack, state.currentQuestionIndex]),
    completeQuiz: useCallback(() => {
      const results = getResults();
      const currentQuestions = state.questions || [];
      const currentAnswers = state.answers || {};
      
      const historyEntry = {
        id: Date.now().toString(),
        quizId: state.selectedQuiz?.id,
        quizTitle: state.selectedQuiz?.title,
        date: new Date().toISOString(),
        score: results.percentage,
        passed: results.passed,
        failed: results.failed,
        unanswered: results.unanswered,
        total: results.total,
        timeTaken: state.timer,
        questions: currentQuestions.map(q => ({ ...q })),
        answers: { ...currentAnswers },
        attemptNumber: (student?.quizHistory?.filter(h => h.quizTitle === state.selectedQuiz?.title).length || 0) + 1,
      };
      
      const attemptKey = `attempt_${historyEntry.id}`;
      localStorage.setItem(attemptKey, JSON.stringify({
        questions: historyEntry.questions,
        answers: historyEntry.answers,
        quizTitle: historyEntry.quizTitle,
        score: historyEntry.score,
        date: historyEntry.date,
      }));
      
      if (state.selectedQuiz?.id) {
        const quizAttemptsKey = `quiz_attempts_${state.selectedQuiz.id}`;
        const existingAttempts = JSON.parse(localStorage.getItem(quizAttemptsKey) || '[]');
        existingAttempts.push(historyEntry.id);
        localStorage.setItem(quizAttemptsKey, JSON.stringify(existingAttempts));
      }
      
      const reviewKey = `review_${historyEntry.id}`;
      localStorage.setItem(reviewKey, JSON.stringify({
        questions: historyEntry.questions,
        answers: historyEntry.answers,
        quizTitle: historyEntry.quizTitle,
        score: historyEntry.score,
        date: historyEntry.date,
        attemptNumber: historyEntry.attemptNumber,
      }));
      
      dispatch({ type: ACTIONS.ADD_QUIZ_HISTORY, payload: historyEntry });
      addStudentQuizHistory(historyEntry);
      dispatch({ type: ACTIONS.COMPLETE_QUIZ });
      if (state.selectedQuiz) {
        dispatch({ type: ACTIONS.ADD_RECENTLY_TAKEN, payload: state.selectedQuiz.id });
      }
      
      // ✅ Ensure quiz active state is cleared on completion
      setQuizActive(false);
    }, [state, getResults, addStudentQuizHistory, student, setQuizActive]),
    restartQuiz: useCallback(() => {
      dispatch({ type: ACTIONS.RESTART_QUIZ });
      // ✅ Clear quiz active state on restart
      setQuizActive(false);
    }, [setQuizActive]),
    toggleDarkMode: useCallback(() => {
      dispatch({ type: ACTIONS.TOGGLE_DARK_MODE });
      document.documentElement.classList.toggle('dark');
    }, []),
    startQuiz: useCallback(() => {
      dispatch({ type: ACTIONS.START_QUIZ });
      // ✅ Set quiz active when starting
      setQuizActive(true);
    }, [setQuizActive]),
    toggleInstructions: useCallback(() => dispatch({ type: ACTIONS.TOGGLE_INSTRUCTIONS }), []),
    setResultsDisplayed: useCallback((value) => dispatch({ type: ACTIONS.SET_RESULTS_DISPLAYED, payload: value }), []),
    setSubmitting: useCallback((value) => dispatch({ type: ACTIONS.SET_SUBMITTING, payload: value }), []),
    selectQuiz: useCallback((quiz) => {
      let questions = quiz.questions || [];
      
      if (!questions || questions.length === 0) {
        const savedQuestions = localStorage.getItem(`questions_${quiz.id}`);
        if (savedQuestions) {
          try {
            questions = JSON.parse(savedQuestions);
          } catch (e) {
            console.error('Error parsing saved questions:', e);
          }
        }
      }
      
      dispatch({ 
        type: ACTIONS.SELECT_QUIZ, 
        payload: { 
          ...quiz, 
          questions: questions,
          totalQuestions: questions.length || quiz.totalQuestions || 0
        } 
      });
      // ✅ Reset quiz active when selecting new quiz
      setQuizActive(false);
    }, [setQuizActive]),
    toggleFavorite: useCallback((quizId) => {
      dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: quizId });
    }, []),
    isFavorite: useCallback((quizId) => {
      return (state.favorites || []).includes(quizId);
    }, [state.favorites]),
    clearQuizState: useCallback(() => {
      dispatch({ type: ACTIONS.CLEAR_QUIZ_STATE });
      // ✅ Clear quiz active state
      setQuizActive(false);
    }, [setQuizActive]),
    setReviewing: useCallback((value) => dispatch({ type: ACTIONS.SET_REVIEWING, payload: value }), []),
    getCurrentQuestion: useCallback(() => {
      return state.questions[state.currentQuestionIndex] || null;
    }, [state.questions, state.currentQuestionIndex]),
    getQuestionAnswer: useCallback((questionId) => {
      return state.answers[questionId] || null;
    }, [state.answers]),
    isQuestionAnswered: useCallback((questionId) => {
      return state.answers.hasOwnProperty(questionId);
    }, [state.answers]),
    isQuestionCorrect: useCallback((questionId) => {
      const answer = state.answers[questionId];
      const question = state.questions.find(q => q.id === questionId);
      if (!answer || !question) return false;
      return answer === question.correctAnswer;
    }, [state.answers, state.questions]),
    getProgress: useCallback(() => {
      const answered = Object.keys(state.answers).length;
      const total = state.questions.length;
      return total > 0 ? (answered / total) * 100 : 0;
    }, [state.answers, state.questions.length]),
    getResults,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}