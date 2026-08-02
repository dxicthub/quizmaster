import React from 'react';
import { FaSearch } from 'react-icons/fa';

function QuizSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="relative">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search quizzes by name, difficulty, or keywords..."
        className="w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
    </div>
  );
}

export default QuizSearch;