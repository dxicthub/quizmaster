import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaFolder, FaSearch } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import { quizCategories } from '../../data/quizCategories.js';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
    const combined = [...quizCategories, ...stored];
    setCategories(combined);
  }, []);

  const handleDelete = (category) => {
    Swal.fire({
      title: 'Delete Category?',
      text: `Are you sure you want to delete "${category.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#8b5cf6',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        const stored = JSON.parse(localStorage.getItem('quizCategories') || '[]');
        const filtered = stored.filter(c => c.id !== category.id);
        localStorage.setItem('quizCategories', JSON.stringify(filtered));
        setCategories(categories.filter(c => c.id !== category.id));
        toast.success('Category deleted successfully');
      }
    });
  };

  const filteredCategories = categories.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Quiz Categories
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-64"
            />
          </div>
          <button
            onClick={() => toast.info('Add category wizard coming soon!')}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
          >
            <FaPlus />
            Add Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glassmorphism card-shadow rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30">
                  <FaFolder />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {category.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {category.totalQuestions} questions
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toast.info(`Editing ${category.title}`)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(category)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {category.description}
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                {category.difficulty}
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                ⏱️ {category.estimatedTime}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;