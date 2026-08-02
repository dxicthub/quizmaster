import React from 'react';
import { FaFilter } from 'react-icons/fa';

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

function QuizFilter({ filterDifficulty, onFilterChange }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
      <FaFilter className="text-gray-500 dark:text-gray-400" />
      <select
        value={filterDifficulty}
        onChange={(e) => onFilterChange(e.target.value)}
        className="bg-transparent text-gray-700 dark:text-gray-300 text-sm focus:outline-none cursor-pointer"
      >
        {difficulties.map((diff) => (
          <option key={diff} value={diff}>
            {diff}
          </option>
        ))}
      </select>
    </div>
  );
}

export default QuizFilter;