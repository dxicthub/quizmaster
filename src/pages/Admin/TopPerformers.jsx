import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaTrophy, FaMedal, FaSearch } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';

function AdminTopPerformers() {
  const { students } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  const performers = students.map(student => {
    const history = student.quizHistory || [];
    const total = history.length;
    const passed = history.filter(h => h.score >= 90).length;
    const avg = total > 0 
      ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / total)
      : 0;
    return { ...student, total, passed, avg };
  });

  const topPerformers = performers
    .filter(p => p.total > 0)
    .filter(p => p.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.passed - a.passed || b.avg - a.avg);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          Top Performers
        </h1>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-64"
          />
        </div>
      </div>

      <div className="glassmorphism card-shadow rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Passed</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Avg Score</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topPerformers.map((p, index) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {index === 0 && <FaTrophy className="text-yellow-400 text-xl" />}
                      {index === 1 && <FaMedal className="text-gray-400 text-xl" />}
                      {index === 2 && <FaMedal className="text-amber-600 text-xl" />}
                      {index > 2 && <span className="text-sm text-gray-500">#{index + 1}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                        index === 0 ? 'from-yellow-400 to-yellow-500' :
                        index === 1 ? 'from-gray-400 to-gray-500' :
                        index === 2 ? 'from-amber-600 to-amber-700' :
                        'from-blue-500 to-blue-600'
                      } flex items-center justify-center text-white text-sm font-semibold`}>
                        {p.fullName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{p.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">{p.total}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">{p.passed}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-bold ${p.avg >= 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                      {p.avg}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {p.passed >= 10 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg shadow-yellow-500/30">
                        ⭐ Elite
                      </span>
                    ) : p.passed >= 5 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-500/30">
                        🏅 Pro
                      </span>
                    ) : p.passed >= 2 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg shadow-green-500/30">
                        🌱 Learner
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        🆕 New
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminTopPerformers;