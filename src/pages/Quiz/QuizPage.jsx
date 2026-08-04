import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, FaLock, FaHome, FaBook, 
  FaUser, FaClock, FaCheckCircle, FaTimesCircle,
  FaQuestionCircle, FaRocket, FaSpinner,
  FaInfoCircle, FaArrowRight, FaArrowLeft as FaArrowLeftIcon,
  FaRedo
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import QuestionCard from '../../components/Quiz/QuestionCard.jsx';
import ProgressBar from '../../components/Quiz/ProgressBar.jsx';
import Timer from '../../components/Quiz/Timer.jsx';
import NavigationButtons from '../../components/Quiz/NavigationButtons.jsx';
import QuestionNavigator from '../../components/Quiz/QuestionNavigator.jsx';
import QuestionTimer from '../../components/Quiz/QuestionTimer.jsx';
import SubmitButton from '../../components/Quiz/SubmitButton.jsx';
import WelcomeScreen from '../../components/Welcome/WelcomeScreen.jsx';
import InstructionsModal from '../../components/Welcome/InstructionsModal.jsx';
import ReviewMode from '../../components/Quiz/ReviewMode.jsx';
import CountdownTimer from '../../components/Quiz/CountdownTimer.jsx';
import { getQuestionsForQuiz } from '../../data/questionRegistry.js';

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = useParams();
  const { student } = useAuth();
  const {
    state,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    restartQuiz,
    startQuiz,
    toggleInstructions,
    setResultsDisplayed,
    setSubmitting,
    clearQuizState,
    setReviewing,
    getCurrentQuestion,
    isQuestionAnswered,
    isQuestionCorrect,
    getProgress,
    getResults,
    selectQuiz,
  } = useQuiz();

  const [isReviewing, setIsReviewing] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [isRetake, setIsRetake] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const currentQuestion = getCurrentQuestion();
  const answeredCount = Object.keys(state.answers).length;
  const progress = getProgress();
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  const isFirstQuestion = state.currentQuestionIndex === 0;
  const isQuizComplete = state.quizCompleted;
  const quizStarted = state.quizStarted;
  const countdownTimer = state.countdownTimer || 0;

  // Check for retake flag in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const retakeParam = searchParams.get('retake');
    if (retakeParam === 'true') {
      setIsRetake(true);
      console.log('🔄 Retake quiz mode activated');
    }
  }, [location.search]);

  // Check for review mode from results page
  useEffect(() => {
    // Check if we should be in review mode
    const shouldReview = localStorage.getItem('shouldReview') === 'true';
    const savedReviewData = localStorage.getItem('reviewData');
    
    if (shouldReview && savedReviewData) {
      try {
        const data = JSON.parse(savedReviewData);
        setReviewData(data);
        setIsReviewing(true);
        setReviewing(true);
        // Clear the flag after reading
        localStorage.removeItem('shouldReview');
        console.log('📋 Review mode activated from results page');
      } catch (error) {
        console.error('Error loading review data:', error);
      }
    }
  }, [setReviewing]);

  // Load the most up-to-date questions when the component mounts or quiz is selected
  useEffect(() => {
    if (state.selectedQuiz) {
      loadUpdatedQuestions();
    }
  }, [state.selectedQuiz?.id]);

  const loadUpdatedQuestions = () => {
    setLoadingQuestions(true);
    try {
      const storedQuizzes = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      const storedQuiz = storedQuizzes.find(q => q.id === state.selectedQuiz.id);
      
      const savedQuestions = localStorage.getItem(`questions_${state.selectedQuiz.id}`);
      let questions = [];
      
      if (savedQuestions) {
        questions = JSON.parse(savedQuestions);
      } else if (storedQuiz && storedQuiz.questions) {
        questions = storedQuiz.questions;
      } else if (state.selectedQuiz.questions) {
        questions = state.selectedQuiz.questions;
      }
      
      // If still no questions, try loading from the registry
      if (!questions || questions.length === 0) {
        const registryQuestions = getQuestionsForQuiz(state.selectedQuiz.questionFile);
        if (registryQuestions && registryQuestions.length > 0) {
          questions = registryQuestions;
        }
      }
      
      if (questions && questions.length > 0) {
        const updatedQuiz = {
          ...state.selectedQuiz,
          questions: questions,
          totalQuestions: questions.length,
        };
        selectQuiz(updatedQuiz);
      }
    } catch (error) {
      console.error('Error loading updated questions:', error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleAnswerSelect = (questionId, answer, isCorrect) => {
    if (state.isSubmitting) return;
    selectAnswer(questionId, answer);
    
    if (isCorrect) {
      toast.success('✅ Correct! Well done!', {
        duration: 1500,
        position: 'top-center',
        style: {
          background: '#22c55e',
          color: 'white',
          fontWeight: 'bold',
        },
      });
    } else {
      toast.error(`❌ Incorrect! The answer is ${currentQuestion.correctAnswer}`, {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          fontWeight: 'bold',
        },
      });
    }
  };

  const handleQuestionTimeout = () => {
    if (!isQuestionAnswered(currentQuestion?.id)) {
      toast.error('⏰ Time\'s up! Moving to next question.', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#f59e0b',
          color: 'white',
          fontWeight: 'bold',
        },
      });
    }
  };

  const handleStartQuiz = () => {
    if (!state.questions || state.questions.length === 0) {
      toast.error('No questions available for this quiz. Please contact the administrator.');
      return;
    }
    
    startQuiz();
    
    const totalMinutes = state.questions.length <= 50 ? 20 : 40;
    toast.success(`🚀 Quiz started! You have ${totalMinutes} minutes. Good luck, ${student?.fullName || 'Student'}!`, {
      duration: 3000,
      position: 'top-center',
    });
  };

  const handleShowInstructions = () => {
    toggleInstructions();
  };

  const handleCloseInstructions = () => {
    toggleInstructions();
  };

  const handleQuestionClick = (index) => {
    if (state.isSubmitting) return;
    
    if (!state.canNavigateBack && !isQuizComplete) {
      toast.warning('🔒 You cannot go back to previous questions during the quiz!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#f59e0b',
          color: 'white',
          fontWeight: 'bold',
        },
      });
      return;
    }

    if (index < state.currentQuestionIndex) {
      for (let i = state.currentQuestionIndex; i > index; i--) {
        previousQuestion();
      }
    } else if (index > state.currentQuestionIndex) {
      for (let i = state.currentQuestionIndex; i < index; i++) {
        nextQuestion();
      }
    }
  };

  const handleSubmitQuiz = () => {
    if (state.isSubmitting) return;
    
    setSubmitting(true);
    
    toast.loading('Submitting your quiz...', {
      duration: 1500,
    });
    
    setTimeout(() => {
      completeQuiz();
      setSubmitting(false);
      toast.success('✅ Quiz submitted successfully!', {
        duration: 2000,
        position: 'top-center',
      });
      
      Swal.fire({
        title: '📊 Quiz Submitted Successfully',
        text: 'Click the "View Results" button to see your performance.',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'View Results',
        backdrop: 'rgba(0,0,0,0.5)',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2.5 rounded-xl font-semibold'
        }
      }).then(() => {
        navigate('/app/results');
      });
    }, 1500);
  };

  const handleRestart = () => {
    if (state.isSubmitting) return;
    
    Swal.fire({
      title: '🔄 Restart Quiz?',
      text: 'All progress will be lost. Are you sure you want to restart?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, restart',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setResultsDisplayed(false);
        restartQuiz();
        navigate('/app');
        toast.success('Quiz restarted successfully!');
      }
    });
  };

  const handleReview = () => {
    if (state.isSubmitting) return;
    
    // Store the review data in localStorage
    const reviewData = {
      questions: state.questions || [],
      answers: state.answers || {},
    };
    localStorage.setItem('reviewData', JSON.stringify(reviewData));
    localStorage.setItem('shouldReview', 'true');
    
    setReviewing(true);
    setIsReviewing(true);
    toast.info('📋 Reviewing all questions');
  };

  const handleCloseReview = () => {
    setReviewing(false);
    setIsReviewing(false);
    // Clear review data from localStorage
    localStorage.removeItem('reviewData');
    localStorage.removeItem('shouldReview');
    navigate('/app/results');
  };

  const handleBackToDashboard = () => {
    if (state.isSubmitting) return;
    
    if (!isQuizComplete && quizStarted) {
      Swal.fire({
        title: '⚠️ Exit Quiz?',
        text: 'Your progress will be lost if you leave. Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#3b82f6',
        confirmButtonText: 'Yes, exit',
        cancelButtonText: 'Continue quiz',
        backdrop: 'rgba(0,0,0,0.5)',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
          cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          clearQuizState();
          navigate('/app');
        }
      });
    } else {
      clearQuizState();
      navigate('/app');
    }
  };

  useEffect(() => {
    if (!isQuizComplete && !state.isSubmitting && !isLastQuestion && isQuestionAnswered(currentQuestion?.id)) {
      const timer = setTimeout(() => {
        nextQuestion();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.answers, currentQuestion?.id, state.isSubmitting]);

  if (loadingQuestions && state.questions.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading quiz questions...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Preparing your assessment</p>
        </div>
      </div>
    );
  }

  if (!quizStarted && state.questions && state.questions.length > 0) {
    const quiz = state.selectedQuiz || {};
    const totalQuestions = state.questions.length || quiz.totalQuestions || 100;
    const quizTitle = quiz.title || 'Quiz';
    const description = quiz.description || 'assessment';
    const difficulty = quiz.difficulty || 'Intermediate';
    const estimatedTime = quiz.estimatedTime || '60 min';

    return (
      <>
        <WelcomeScreen 
          onStart={handleStartQuiz}
          onShowInstructions={handleShowInstructions}
          studentName={student?.fullName}
          quizTitle={quizTitle}
          totalQuestions={totalQuestions}
          description={description}
          difficulty={difficulty}
          estimatedTime={estimatedTime}
        />
        <InstructionsModal 
          isOpen={state.showInstructions}
          onClose={handleCloseInstructions}
        />
      </>
    );
  }

  if (state.isSubmitting) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-3xl animate-pulse" />
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mt-4">Submitting your quiz...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (isQuizComplete) {
    navigate('/app/results');
    return null;
  }

  // Show ReviewMode if in review state or if reviewData exists
  if (isReviewing || reviewData) {
    const questions = reviewData?.questions || state.questions || [];
    const answers = reviewData?.answers || state.answers || {};
    
    return (
      <ReviewMode
        questions={questions}
        answers={answers}
        onClose={handleCloseReview}
      />
    );
  }

  if (!currentQuestion && quizStarted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 md:p-6">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 group"
          >
            <div className="p-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
              <FaArrowLeft className="text-sm" />
            </div>
            <span className="text-sm font-medium hidden sm:inline">Back to Dashboard</span>
          </button>
          
          {student && (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <FaUser className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {student.fullName}
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
            >
              {/* Decorative Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

              <div className="p-6 md:p-8">
                {/* Quiz Title and Info */}
                <div className="mb-4 flex flex-wrap items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <FaBook className="text-purple-500" />
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {state.selectedQuiz?.title || 'Quiz'}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {state.selectedQuiz?.description || 'Testing your knowledge'}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 dark:text-gray-500">
                      <span>📝 {state.questions.length} Questions</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span>⏱️ {state.selectedQuiz?.duration || 60} min</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span>🎯 {state.selectedQuiz?.passingScore || 70}% to pass</span>
                    </div>
                  </div>
                </div>

                {/* Retake Indicator */}
                {isRetake && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 border border-purple-300/50 dark:border-purple-700/30 flex items-center gap-3"
                  >
                    <FaRedo className="text-purple-500 text-lg animate-pulse" />
                    <div>
                      <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                        🔄 Retaking Quiz - Fresh Attempt
                      </span>
                      <span className="text-xs text-purple-500 dark:text-purple-400 ml-2">
                        (Previous results are saved separately)
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Header with progress and timers */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <ProgressBar progress={progress} current={state.currentQuestionIndex} total={state.questions.length} />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <QuestionTimer 
                      seconds={state.questionTimer} 
                      isRunning={state.questionTimerRunning}
                      onTimeout={handleQuestionTimeout}
                    />
                    <Timer seconds={state.timer} isRunning={state.isTimerRunning} />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {state.currentQuestionIndex + 1}/{state.questions.length}
                    </span>
                  </div>
                </div>

                {/* Countdown Timer */}
                {quizStarted && !isQuizComplete && (
                  <div className="mb-4">
                    <CountdownTimer 
                      seconds={state.countdownTimer} 
                      isRunning={state.countdownTimerRunning}
                    />
                  </div>
                )}

                {/* Navigation restriction warning */}
                {!isQuizComplete && !state.canNavigateBack && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200/50 dark:border-amber-700/30 flex items-center gap-2"
                  >
                    <FaLock className="text-amber-600 dark:text-amber-400" />
                    <span className="text-sm text-amber-700 dark:text-amber-300">
                      🔒 You cannot go back to previous questions. Answer each question within the time limit!
                    </span>
                  </motion.div>
                )}

                {/* Question display */}
                <AnimatePresence mode="wait">
                  <QuestionCard
                    key={currentQuestion?.id || 'no-question'}
                    question={currentQuestion}
                    onAnswerSelect={handleAnswerSelect}
                    isAnswered={isQuestionAnswered(currentQuestion?.id)}
                    isSubmitting={state.isSubmitting}
                  />
                </AnimatePresence>

                {/* Navigation */}
                <NavigationButtons
                  currentIndex={state.currentQuestionIndex}
                  totalQuestions={state.questions.length}
                  onPrevious={previousQuestion}
                  onNext={nextQuestion}
                  onSubmit={handleSubmitQuiz}
                  onRestart={handleRestart}
                  onReview={handleReview}
                  isLastQuestion={isLastQuestion}
                  isFirstQuestion={isFirstQuestion}
                  isQuizComplete={isQuizComplete}
                  answeredCount={answeredCount}
                  canNavigateBack={state.canNavigateBack}
                  isSubmitting={state.isSubmitting}
                />

                {/* Quiz statistics */}
                <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-6">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                        <FaCheckCircle className="text-emerald-500" />
                        <span className="font-semibold text-emerald-500">{answeredCount}</span> answered
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                        <FaQuestionCircle className="text-gray-400" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {state.questions.length - answeredCount}
                        </span> remaining
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                        <FaClock className="text-blue-500" />
                        <span className="font-semibold">{state.questionTimer}s</span> per question
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Correct</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Incorrect</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="sticky top-4"
            >
              <QuestionNavigator
                totalQuestions={state.questions.length}
                currentIndex={state.currentQuestionIndex}
                answers={state.answers}
                onQuestionClick={handleQuestionClick}
                questions={state.questions}
                isLocked={!state.canNavigateBack && !isQuizComplete}
                isQuizComplete={isQuizComplete}
                isQuestionCorrect={isQuestionCorrect}
              />
            </motion.div>
          </div>
        </div>

        {/* Submit Button - Floating */}
        <SubmitButton 
          onSubmit={handleSubmitQuiz}
          isVisible={!isQuizComplete && quizStarted}
          isSubmitting={state.isSubmitting}
        />

        <InstructionsModal 
          isOpen={state.showInstructions}
          onClose={handleCloseInstructions}
        />
      </div>
    </div>
  );
}

export default QuizPage;