import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaFilePdf, FaFileWord, FaFileAlt, FaFileCode, 
  FaFileCsv, FaMarkdown, FaClipboard, FaFileImport,
  FaCheckCircle, FaExclamationTriangle, FaLightbulb,
  FaDownload, FaUpload, FaBook, FaGraduationCap
} from 'react-icons/fa';

function QuizImportGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  const importMethods = [
    {
      icon: FaFilePdf,
      title: 'PDF Format',
      description: 'Extract questions from PDF documents',
      steps: [
        'Create a PDF with numbered questions',
        'Each question should have options A, B, C, D',
        'Mark the correct answer with an asterisk (*) or bold text',
        'Upload the PDF file through the Quiz Management panel'
      ],
      example: `1. What is React?
A. A JavaScript library
B. A database
*C. A UI framework
D. A programming language

2. What is JSX?
*A. JavaScript XML
B. Java XML
C. JavaScript Extension
D. Java Extension`
    },
    {
      icon: FaFileWord,
      title: 'Word (DOCX) Format',
      description: 'Import from Microsoft Word documents',
      steps: [
        'Create a DOCX file with numbered questions',
        'Use bullet points or numbered lists for options',
        'Highlight or bold the correct answer',
        'Upload the DOCX file through the Quiz Management panel'
      ],
      example: `1. What is React?
• A. A JavaScript library
• B. A database
• ✓ C. A UI framework
• D. A programming language`
    },
    {
      icon: FaFileAlt,
      title: 'TXT Format',
      description: 'Import from plain text files',
      steps: [
        'Create a TXT file with numbered questions',
        'Use this format: Q1. Question text',
        'Options: A. Option 1, B. Option 2, C. Option 3, D. Option 4',
        'Mark correct answer with: Correct: A',
        'Upload the TXT file through the Quiz Management panel'
      ],
      example: `Q1. What is React?
A. A JavaScript library
B. A database
C. A UI framework
D. A programming language
Correct: C

Q2. What is JSX?
A. JavaScript XML
B. Java XML
C. JavaScript Extension
D. Java Extension
Correct: A`
    },
    {
      icon: FaFileCode,
      title: 'JSON Format',
      description: 'Import from structured JSON files',
      steps: [
        'Create a JSON file with the following structure',
        'Each question must have: id, type, question, options, correctAnswer',
        'Options must be an array of strings',
        'Upload the JSON file through the Quiz Management panel'
      ],
      example: `[
  {
    "id": 1,
    "type": "multiple-choice",
    "question": "What is React?",
    "options": [
      "A. A JavaScript library",
      "B. A database",
      "C. A UI framework",
      "D. A programming language"
    ],
    "correctAnswer": "C"
  }
]`
    },
    {
      icon: FaFileCsv,
      title: 'CSV Format',
      description: 'Import from CSV spreadsheets',
      steps: [
        'Create a CSV file with these columns: Question, Option A, Option B, Option C, Option D, Correct Answer',
        'Each row is one question',
        'The Correct Answer column should contain A, B, C, or D',
        'Upload the CSV file through the Quiz Management panel'
      ],
      example: `Question,Option A,Option B,Option C,Option D,Correct Answer
"What is React?","A. JavaScript library","B. Database","C. UI framework","D. Programming language",C
"What is JSX?","A. JavaScript XML","B. Java XML","C. JavaScript Extension","D. Java Extension",A`
    },
    {
      icon: FaMarkdown,
      title: 'Markdown Format',
      description: 'Import from .md files',
      steps: [
        'Create a Markdown file with questions',
        'Use ## for question numbers',
        'Use - for options',
        'Mark correct answer with [x] or **bold**',
        'Upload the Markdown file through the Quiz Management panel'
      ],
      example: `## Question 1: What is React?
- A. A JavaScript library
- B. A database
- [x] C. A UI framework
- D. A programming language

## Question 2: What is JSX?
- [x] A. JavaScript XML
- B. Java XML
- C. JavaScript Extension
- D. Java Extension`
    },
    {
      icon: FaClipboard,
      title: 'Paste Text',
      description: 'Copy and paste questions directly',
      steps: [
        'Copy your questions from any source',
        'Use the format: Q: Question text',
        'Options: A. Option 1, B. Option 2, C. Option 3, D. Option 4',
        'Mark correct answer with: Answer: A',
        'Click "Paste Text" in the Quiz Wizard'
      ],
      example: `Q: What is React?
A. A JavaScript library
B. A database
C. A UI framework
D. A programming language
Answer: C`
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glassmorphism card-shadow rounded-3xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-purple-500/30">
                <FaFileImport className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Quiz Import Guide
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn how to import quizzes in different formats
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FaTimes className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-blue-500 text-xl mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300">Quick Start Guide</h4>
                <ol className="text-sm text-blue-600 dark:text-blue-400 list-decimal list-inside space-y-1 mt-1">
                  <li>Go to <strong>Admin Panel → Quiz Management</strong></li>
                  <li>Click the <strong>"Add Quiz"</strong> button to open the Quiz Wizard</li>
                  <li>Fill in the quiz details in Step 1</li>
                  <li>In Step 2, choose your import method</li>
                  <li>Upload your file or paste your questions</li>
                  <li>Review and validate the imported questions</li>
                  <li>Publish your quiz when ready</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Import Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {importMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glassmorphism card-shadow rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                      <Icon className="text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {method.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Steps:</span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        {method.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {method.example}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-500" />
                <h4 className="font-semibold text-green-700 dark:text-green-300">Best Practices</h4>
              </div>
              <ul className="text-sm text-green-600 dark:text-green-400 list-disc list-inside space-y-1">
                <li>Always preview imported questions before publishing</li>
                <li>Check for duplicate questions</li>
                <li>Ensure all questions have correct answers</li>
                <li>Use consistent formatting for easy import</li>
                <li>Test imported quizzes before making them visible to students</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <FaExclamationTriangle className="text-yellow-500" />
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">Common Issues</h4>
              </div>
              <ul className="text-sm text-yellow-600 dark:text-yellow-400 list-disc list-inside space-y-1">
                <li>Missing correct answer markers</li>
                <li>Incorrect file format or encoding</li>
                <li>Malformed JSON or CSV structure</li>
                <li>Duplicate question IDs</li>
                <li>Empty or incomplete questions</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
            >
              Close Guide
            </button>
            <button
              onClick={() => {
                onClose();
                // Navigate to admin quiz management
                window.location.href = '/admin/quizzes';
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <FaFileImport />
              Go to Quiz Management
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuizImportGuide;