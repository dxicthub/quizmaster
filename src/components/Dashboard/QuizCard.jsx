import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaStar, FaClock, FaArrowRight, FaBook, FaEyeSlash, FaExclamationTriangle 
} from 'react-icons/fa';
import toast from 'react-hot-toast';

// Map of icon names to actual components
const iconMap = {
  'FaGitAlt': FaGitAlt,
  'FaGithub': FaGithub,
  'FaDatabase': FaDatabase,
  'FaReact': FaReact,
  'FaNodeJs': FaNodeJs,
  'FaServer': FaServer,
  'FaCloud': FaCloud,
  'FaKey': FaKey,
  'FaRocket': FaRocket,
  'FaGlobe': FaGlobe,
  'FaJs': FaJs,
  'FaHtml5': FaHtml5,
  'FaCss3Alt': FaCss3Alt,
  'FaLock': FaLock,
  'FaUserShield': FaUserShield,
  'FaAws': FaAws,
  'FaDocker': FaDocker,
  'FaPython': FaPython,
  'FaJava': FaJava,
  'FaPhp': FaPhp,
  'FaVuejs': FaVuejs,
  'FaAngular': FaAngular,
  'FaBootstrap': FaBootstrap,
  'FaFigma': FaFigma,
  'SiTailwindcss': SiTailwindcss,
  'SiTypescript': SiTypescript,
  'SiMongodb': SiMongodb,
  'SiSupabase': SiSupabase,
  'SiRender': SiRender,
  'SiVercel': SiVercel,
  'SiExpress': SiExpress,
  'OAuthIcon': FaKey // Fallback for OAuth
};

// Also import the icons we need
import { 
  FaGitAlt, FaGithub, FaDatabase, FaReact, FaNodeJs, 
  FaServer, FaCloud, FaKey, FaRocket, FaGlobe,
  FaJs, FaHtml5, FaCss3Alt, FaLock, FaUserShield,
  FaAws, FaDocker, FaPython, FaJava, FaPhp,
  FaVuejs, FaAngular, FaBootstrap, FaFigma
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiTypescript, SiMongodb, SiSupabase, 
  SiRender, SiVercel, SiExpress 
} from 'react-icons/si';

// Define difficultyColors here - this was missing
const difficultyColors = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

function QuizCard({ quiz, onSelect, isFavorite, onToggleFavorite, compact = false, index = 0 }) {
  // Get the icon component safely
  const getIconComponent = () => {
    if (!quiz.icon) return FaBook;
    
    // If icon is a string, try to get from map
    if (typeof quiz.icon === 'string') {
      return iconMap[quiz.icon] || FaBook;
    }
    
    // If icon is already a component, return it
    return quiz.icon;
  };

  const IconComponent = getIconComponent();
  const isVisible = quiz.isVisible !== false;
  const hasQuestions = quiz.totalQuestions > 0 || quiz.questions?.length > 0;

  const handleSelect = () => {
    if (!isVisible) {
      toast.warning('This quiz is currently unavailable.');
      return;
    }
    if (!hasQuestions) {
      toast.error('This quiz has no questions. Please contact the administrator.');
      return;
    }
    onSelect(quiz);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite(quiz.id);
  };

  const getCardStatus = () => {
    if (!isVisible) return { label: 'Hidden', color: 'bg-red-500', icon: FaEyeSlash };
    if (!hasQuestions) return { label: 'No Questions', color: 'bg-yellow-500', icon: FaExclamationTriangle };
    return null;
  };

  const status = getCardStatus();
  const StatusIcon = status?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={isVisible && hasQuestions ? { y: -8, scale: 1.02 } : {}}
      className={`glassmorphism card-shadow rounded-2xl overflow-hidden cursor-pointer group ${
        !isVisible || !hasQuestions ? 'opacity-70 pointer-events-none' : ''
      }`}
      onClick={handleSelect}
    >
      <div className="relative p-6">
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaStar 
            className={`text-xl transition-all duration-300 ${
              isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>

        {/* Status Badge */}
        {status && (
          <div className={`absolute top-4 left-4 z-10 px-2 py-1 ${status.color} text-white rounded-lg text-xs font-semibold flex items-center gap-1`}>
            {StatusIcon && <StatusIcon className="text-xs" />}
            {status.label}
          </div>
        )}

        {/* Icon */}
        <div className="mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-500/30 ${
            !isVisible || !hasQuestions ? 'opacity-50' : ''
          }`}>
            <IconComponent />
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 ${
          !isVisible || !hasQuestions ? 'text-gray-400 dark:text-gray-500' : ''
        }`}>
          {quiz.title}
        </h3>

        {/* Description */}
        <p className={`text-gray-500 dark:text-gray-400 mb-3 ${
          compact ? 'text-sm line-clamp-1' : 'text-sm line-clamp-2'
        } ${!isVisible || !hasQuestions ? 'text-gray-400 dark:text-gray-500' : ''}`}>
          {compact ? quiz.description?.split(' ').slice(0, 5).join(' ') + '...' : quiz.description}
        </p>

        {/* Tags and Info */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            difficultyColors[quiz.difficulty] || 'bg-gray-100 text-gray-700'
          } ${!isVisible || !hasQuestions ? 'opacity-50' : ''}`}>
            {quiz.difficulty}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center gap-1 ${
            !isVisible || !hasQuestions ? 'opacity-50' : ''
          }`}>
            <FaBook className="text-xs" />
            {quiz.totalQuestions || 0}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center gap-1 ${
            !isVisible || !hasQuestions ? 'opacity-50' : ''
          }`}>
            <FaClock className="text-xs" />
            {quiz.estimatedTime}
          </span>
        </div>

        {/* Tags */}
        {!compact && quiz.tags && (
          <div className="flex flex-wrap gap-1 mb-4">
            {quiz.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ${
                !isVisible || !hasQuestions ? 'opacity-50' : ''
              }`}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Start Button */}
        <motion.button
          whileHover={isVisible && hasQuestions ? { scale: 1.02 } : {}}
          whileTap={isVisible && hasQuestions ? { scale: 0.98 } : {}}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
            isVisible && hasQuestions 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/30 hover:shadow-blue-500/50 group-hover:shadow-blue-500/50'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
          disabled={!isVisible || !hasQuestions}
        >
          {isVisible && hasQuestions ? (
            <>
              <span>Start Quiz</span>
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </>
          ) : !isVisible ? (
            <>
              <FaEyeSlash className="text-sm" />
              <span>Unavailable</span>
            </>
          ) : (
            <>
              <FaExclamationTriangle className="text-sm" />
              <span>No Questions</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default QuizCard;