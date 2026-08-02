import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle, FaBook, FaClock, FaCheckCircle } from 'react-icons/fa';

function WelcomeScreen({ 
  onStart, 
  onShowInstructions, 
  studentName, 
  quizTitle = 'Quiz',
  totalQuestions = 100,
  description = 'assessment',
  difficulty = 'Intermediate',
  estimatedTime = '60 min'
}) {
  const features = [
    {
      icon: <FaBook className="text-blue-500 text-2xl" />,
      title: `${totalQuestions} Questions`,
      description: `Comprehensive ${description} covering all learning objectives`
    },
    {
      icon: <FaClock className="text-yellow-500 text-2xl" />,
      title: '10 Seconds Each',
      description: 'Time-limited per question with auto-advance'
    },
    {
      icon: <FaCheckCircle className="text-green-500 text-2xl" />,
      title: 'Instant Results',
      description: 'Get detailed results with pass/fail status'
    }
  ];

  // Generate a dynamic welcome message based on the quiz
  const getWelcomeMessage = () => {
    // If it's a specific quiz with a title
    if (quizTitle && quizTitle !== 'Quiz') {
      return `You're about to take the ${totalQuestions} question ${quizTitle} ${description}. Each question has a 10-second timer. Good luck!`;
    }
    
    // Default fallback message
    return `You're about to take the ${totalQuestions} question ${description}. Each question has a 10-second timer. Good luck!`;
  };

  // Get difficulty badge color
  const getDifficultyColor = () => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      'Intermediate': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Advanced': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glassmorphism card-shadow rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-8"
      >
        <div className="w-28 h-28 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
          <FaBook className="text-white text-6xl" />
        </div>
      </motion.div>

      {/* Quiz Title and Difficulty Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
            {quizTitle}
          </h2>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getDifficultyColor()}`}>
            {difficulty}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ⏱️ Estimated time: {estimatedTime} • 📝 {totalQuestions} questions
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
      >
        Welcome{studentName ? `, ${studentName}` : ''}!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
      >
        {getWelcomeMessage()}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.5 }}
            className="glassmorphism rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex justify-center mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowInstructions}
          className="px-6 py-3 rounded-xl font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-all duration-300 flex items-center gap-2"
        >
          <FaInfoCircle />
          Instructions
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-3"
        >
          <FaPlay />
          Start Quiz
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-sm text-gray-500 dark:text-gray-400"
      >
        <p>📝 {totalQuestions} Questions • ⏱️ 10s Each • ✅ Instant Feedback</p>
      </motion.div>
    </motion.div>
  );
}

export default WelcomeScreen;