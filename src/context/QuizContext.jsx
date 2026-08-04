import React, { createContext, useContext, useReducer, useEffect } from 'react';
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
  // New countdown timer state
  countdownTimer: 0, // Total seconds remaining
  countdownTimerRunning: false,
  countdownTimerInitial: 0, // Initial total seconds for reference
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
      // Calculate initial countdown timer based on question count
      const totalQuestions = state.questions.length || 0;
      // 50 questions or fewer = 20 minutes, more than 50 = 40 minutes
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
        // Restore countdown timer if quiz was started
        if (parsed.countdownTimer > 0 && parsed.quizStarted && !parsed.quizCompleted) {
          dispatch({ type: ACTIONS.SET_COUNTDOWN_TIMER, payload: parsed.countdownTimer });
          dispatch({ type: ACTIONS.TOGGLE_COUNTDOWN_TIMER });
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify(state));
  }, [state]);

  // Overall timer effect (kept for backward compatibility)
  useEffect(() => {
    let interval;
    if (state.isTimerRunning && !state.quizCompleted && state.quizStarted && state.questions.length > 0) {
      interval = setInterval(() => {
        dispatch({ type: ACTIONS.SET_TIMER, payload: state.timer + 1 });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isTimerRunning, state.timer, state.quizCompleted, state.quizStarted, state.questions.length]);

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (state.countdownTimerRunning && !state.quizCompleted && state.quizStarted && state.countdownTimer > 0) {
      interval = setInterval(() => {
        // Decrement the countdown timer
        dispatch({ type: ACTIONS.DECREMENT_COUNTDOWN_TIMER });
        
        // Check if timer reached 0
        const newTime = state.countdownTimer - 1;
        if (newTime <= 0) {
          // Auto-submit the quiz when timer hits 0
          dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });
          setTimeout(() => {
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
            
            // Save to localStorage with unique key
            const attemptKey = `attempt_${historyEntry.id}`;
            localStorage.setItem(attemptKey, JSON.stringify({
              questions: historyEntry.questions,
              answers: historyEntry.answers,
              quizTitle: historyEntry.quizTitle,
              score: historyEntry.score,
              date: historyEntry.date,
            }));
            
            // Save to quiz attempts list
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
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.countdownTimerRunning, state.countdownTimer, state.quizCompleted, state.quizStarted]);

  // Per-question timer effect with auto-submit on last question
  useEffect(() => {
    let interval;
    if (state.questionTimerRunning && !state.quizCompleted && state.quizStarted && state.questionTimer > 0 && state.questions.length > 0) {
      interval = setInterval(() => {
        const newTime = state.questionTimer - 1;
        dispatch({ type: ACTIONS.SET_QUESTION_TIMER, payload: newTime });
        
        if (newTime === 0) {
          const currentQuestion = state.questions[state.currentQuestionIndex];
          const isAnswered = state.answers[currentQuestion?.id];
          
          const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
          
          if (isLastQuestion) {
            dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });
            setTimeout(() => {
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
              
              // Save to localStorage with unique key
              const attemptKey = `attempt_${historyEntry.id}`;
              localStorage.setItem(attemptKey, JSON.stringify({
                questions: historyEntry.questions,
                answers: historyEntry.answers,
                quizTitle: historyEntry.quizTitle,
                score: historyEntry.score,
                date: historyEntry.date,
              }));
              
              // Save to quiz attempts list
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
            return;
          }
          
          if (!isAnswered && currentQuestion) {
            if (state.currentQuestionIndex < state.questions.length - 1) {
              dispatch({ type: ACTIONS.NEXT_QUESTION });
            }
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.questionTimerRunning, state.questionTimer, state.quizCompleted, state.currentQuestionIndex, state.questions, state.quizStarted, state.selectedQuiz]);

  // Reset question timer when question changes
  useEffect(() => {
    if (!state.quizCompleted && state.quizStarted && state.questions.length > 0) {
      dispatch({ type: ACTIONS.RESET_QUESTION_TIMER });
    }
  }, [state.currentQuestionIndex, state.quizStarted, state.questions.length]);

  // Get results helper
  const getResults = () => {
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
  };

  // Context value
  const value = {
    state,
    dispatch,
    actions: ACTIONS,
    selectAnswer: (questionId, answer) => {
      dispatch({ type: ACTIONS.SELECT_ANSWER, payload: { questionId, answer } });
    },
    nextQuestion: () => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        dispatch({ type: ACTIONS.NEXT_QUESTION });
      }
    },
    previousQuestion: () => {
      if (state.canNavigateBack && state.currentQuestionIndex > 0) {
        dispatch({ type: ACTIONS.PREVIOUS_QUESTION });
      }
    },
    completeQuiz: () => {
      const results = getResults();
      const currentQuestions = state.questions || [];
      const currentAnswers = state.answers || {};
      
      // Create a detailed history entry with questions and answers
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
        // Store the questions and answers for this specific attempt
        questions: currentQuestions.map(q => ({ ...q })),
        answers: { ...currentAnswers },
        attemptNumber: (student?.quizHistory?.filter(h => h.quizTitle === state.selectedQuiz?.title).length || 0) + 1,
      };
      
      console.log('📝 Saving quiz attempt:', {
        id: historyEntry.id,
        quizTitle: historyEntry.quizTitle,
        questionCount: historyEntry.questions.length,
        answerCount: Object.keys(historyEntry.answers).length,
        score: historyEntry.score,
      });
      
      // Save to localStorage with a unique key for this attempt
      const attemptKey = `attempt_${historyEntry.id}`;
      localStorage.setItem(attemptKey, JSON.stringify({
        questions: historyEntry.questions,
        answers: historyEntry.answers,
        quizTitle: historyEntry.quizTitle,
        score: historyEntry.score,
        date: historyEntry.date,
      }));
      
      // Save to a list of attempt IDs for this quiz
      if (state.selectedQuiz?.id) {
        const quizAttemptsKey = `quiz_attempts_${state.selectedQuiz.id}`;
        const existingAttempts = JSON.parse(localStorage.getItem(quizAttemptsKey) || '[]');
        existingAttempts.push(historyEntry.id);
        localStorage.setItem(quizAttemptsKey, JSON.stringify(existingAttempts));
        console.log(`📚 Saved attempt to quiz_attempts_${state.selectedQuiz.id}:`, existingAttempts);
      }
      
      // Also save a review-specific data
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
      
      console.log('✅ Quiz attempt saved successfully!');
    },
    restartQuiz: () => {
      dispatch({ type: ACTIONS.RESTART_QUIZ });
    },
    toggleDarkMode: () => {
      dispatch({ type: ACTIONS.TOGGLE_DARK_MODE });
      document.documentElement.classList.toggle('dark');
    },
    startQuiz: () => dispatch({ type: ACTIONS.START_QUIZ }),
    toggleInstructions: () => dispatch({ type: ACTIONS.TOGGLE_INSTRUCTIONS }),
    setResultsDisplayed: (value) => dispatch({ type: ACTIONS.SET_RESULTS_DISPLAYED, payload: value }),
    setSubmitting: (value) => dispatch({ type: ACTIONS.SET_SUBMITTING, payload: value }),
    selectQuiz: (quiz) => {
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
    },
    toggleFavorite: (quizId) => {
      dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: quizId });
    },
    isFavorite: (quizId) => {
      return (state.favorites || []).includes(quizId);
    },
    clearQuizState: () => {
      dispatch({ type: ACTIONS.CLEAR_QUIZ_STATE });
    },
    setReviewing: (value) => dispatch({ type: ACTIONS.SET_REVIEWING, payload: value }),
    getCurrentQuestion: () => {
      return state.questions[state.currentQuestionIndex] || null;
    },
    getQuestionAnswer: (questionId) => {
      return state.answers[questionId] || null;
    },
    isQuestionAnswered: (questionId) => {
      return state.answers.hasOwnProperty(questionId);
    },
    isQuestionCorrect: (questionId) => {
      const answer = state.answers[questionId];
      const question = state.questions.find(q => q.id === questionId);
      if (!answer || !question) return false;
      return answer === question.correctAnswer;
    },
    getProgress: () => {
      const answered = Object.keys(state.answers).length;
      const total = state.questions.length;
      return total > 0 ? (answered / total) * 100 : 0;
    },
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