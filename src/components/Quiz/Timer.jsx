import React, { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Timer({ seconds, isRunning }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      <FaClock className={`text-primary-500 ${isRunning ? 'animate-pulse' : ''}`} />
      <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">
        {formatTime(time)}
      </span>
      {!isRunning && time === 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400">(paused)</span>
      )}
    </motion.div>
  );
}

export default Timer;