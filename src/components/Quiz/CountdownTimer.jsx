import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock } from 'react-icons/fa';

function CountdownTimer({ seconds, isRunning, onTimerEnd }) {
  const [time, setTime] = useState(seconds);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    setTime(seconds);
    // Show warning when 5 minutes (300 seconds) or less remaining
    setIsWarning(seconds <= 300 && seconds > 0);
  }, [seconds]);

  // Format time as MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get timer color based on remaining time
  const getTimerColor = () => {
    if (seconds <= 0) return 'text-red-500';
    if (seconds <= 300) return 'text-red-500'; // 5 minutes or less - red
    if (seconds <= 600) return 'text-yellow-500'; // 10 minutes or less - yellow
    return 'text-green-500'; // More than 10 minutes - green
  };

  // Get progress percentage for the progress bar
  const getProgressPercentage = () => {
    if (state.countdownTimerInitial === 0) return 100;
    return (seconds / state.countdownTimerInitial) * 100;
  };

  // This will be used for the progress bar
  const [state, setState] = useState({ countdownTimerInitial: 0 });
  
  // We need to get the initial value from context, but since we don't have access here,
  // we'll use a different approach - we'll calculate based on the initial seconds prop
  // This will be set when the component mounts

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="flex items-center gap-3">
        <FaClock className={`text-2xl ${getTimerColor()}`} />
        <div className="flex flex-col items-center">
          <span 
            className={`font-mono font-bold text-4xl md:text-5xl tracking-wider transition-colors duration-300 ${
              getTimerColor()
            } ${isWarning ? 'animate-pulse' : ''}`}
            style={{
              animation: isWarning ? 'timerPulse 0.8s ease-in-out infinite' : 'none',
              textShadow: isWarning ? '0 0 20px rgba(239, 68, 68, 0.3)' : 'none'
            }}
          >
            {formatTime(seconds)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {isRunning ? '⏱️ Time Remaining' : '⏸️ Paused'}
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full max-w-xs mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full transition-all duration-500 ${
            seconds <= 300 ? 'bg-red-500' : 
            seconds <= 600 ? 'bg-yellow-500' : 
            'bg-green-500'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: `${(seconds / (state.countdownTimerInitial || 1200)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

export default CountdownTimer;