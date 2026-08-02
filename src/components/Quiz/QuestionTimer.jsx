import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';

function QuestionTimer({ seconds, isRunning, onTimeout }) {
  const [time, setTime] = useState(seconds);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    setTime(seconds);
    setIsWarning(seconds <= 3 && seconds > 0);
  }, [seconds]);

  const getTimerColor = () => {
    if (time <= 3 && time > 0) return 'text-red-500 border-red-500 bg-red-50 dark:bg-red-900/20';
    if (time <= 5) return 'text-yellow-500 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-900/20';
  };

  const getProgressColor = () => {
    if (time <= 3) return 'bg-red-500';
    if (time <= 5) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const progressPercentage = (time / 10) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3"
    >
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all duration-300 ${getTimerColor()}`}>
        <FaClock className={`${isWarning ? 'animate-pulse' : ''}`} />
        <span className={`font-mono font-bold text-lg ${isWarning ? 'animate-pulse' : ''}`}>
          {time}s
        </span>
      </div>
      
      {/* Progress bar for timer */}
      <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getProgressColor()} rounded-full`}
          initial={{ width: '100%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default QuestionTimer;