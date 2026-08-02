import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload, FaFile, FaTimes, FaFilePdf, FaFileWord, 
  FaFileCode, FaFileCsv, FaMarkdown, FaCheckCircle,
  FaSpinner, FaCloudUploadAlt, FaFileAlt
} from 'react-icons/fa';

function FileUpload({ onFileSelect, onRemove, file, isUploading, progress }) {
  const [isDragging, setIsDragging] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return <FaFilePdf className="text-red-500 text-3xl" />;
      case 'docx': return <FaFileWord className="text-blue-500 text-3xl" />;
      case 'json': return <FaFileCode className="text-yellow-500 text-3xl" />;
      case 'csv': return <FaFileCsv className="text-green-500 text-3xl" />;
      case 'md': return <FaMarkdown className="text-purple-400 text-3xl" />;
      case 'txt': return <FaFileAlt className="text-gray-500 text-3xl" />;
      default: return <FaFile className="text-purple-500 text-3xl" />;
    }
  };

  const getFileColor = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'from-red-500/20 to-red-400/10 border-red-500/30';
      case 'docx': return 'from-blue-500/20 to-blue-400/10 border-blue-500/30';
      case 'json': return 'from-yellow-500/20 to-yellow-400/10 border-yellow-500/30';
      case 'csv': return 'from-green-500/20 to-green-400/10 border-green-500/30';
      case 'md': return 'from-purple-500/20 to-purple-400/10 border-purple-500/30';
      case 'txt': return 'from-gray-500/20 to-gray-400/10 border-gray-500/30';
      default: return 'from-purple-500/20 to-indigo-400/10 border-purple-500/30';
    }
  };

  const getFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return 'from-rose-500 to-red-500';
    if (progress < 70) return 'from-amber-500 to-yellow-500';
    return 'from-emerald-500 to-teal-500';
  };

  const formatFileSize = (size) => {
    if (!size) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let fileSize = size;
    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }
    return `${fileSize.toFixed(2)} ${units[unitIndex]}`;
  };

  const acceptedFormats = [
    { ext: 'PDF', icon: FaFilePdf, color: 'text-red-500' },
    { ext: 'DOCX', icon: FaFileWord, color: 'text-blue-500' },
    { ext: 'JSON', icon: FaFileCode, color: 'text-yellow-500' },
    { ext: 'CSV', icon: FaFileCsv, color: 'text-green-500' },
    { ext: 'MD', icon: FaMarkdown, color: 'text-purple-400' },
    { ext: 'TXT', icon: FaFileAlt, color: 'text-gray-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {!file ? (
        <motion.div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`relative overflow-hidden border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-300 ${
            isDragging || focused
              ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/20 shadow-lg shadow-purple-500/20 scale-[1.02]'
              : 'border-gray-300/50 dark:border-gray-600/50 hover:border-purple-400/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30'
          }`}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
          </div>

          {/* Icon with glow effect */}
          <div className="relative">
            <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4 transition-all duration-300 ${
              isDragging || focused ? 'scale-110 shadow-lg shadow-purple-500/20' : ''
            }`}>
              <FaCloudUploadAlt className={`text-5xl transition-all duration-300 ${
                isDragging || focused ? 'text-purple-500' : 'text-gray-400'
              }`} />
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {isDragging ? 'Drop your file here' : 'Upload your file'}
          </h4>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {isDragging ? 'Release to upload' : 'Drag and drop your file here, or'}
          </p>

          <label className="inline-block px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl cursor-pointer shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            <FaUpload className="inline mr-2 text-sm" />
            Browse Files
            <input
              type="file"
              accept=".pdf,.docx,.txt,.json,.csv,.md"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) onFileSelect(file);
              }}
              className="hidden"
            />
          </label>

          {/* Supported formats */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {acceptedFormats.map((format) => {
              const Icon = format.icon;
              return (
                <span key={format.ext} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-700/50 px-2.5 py-1 rounded-full border border-gray-200/50 dark:border-gray-700/50">
                  <Icon className={format.color} />
                  {format.ext}
                </span>
              );
            })}
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            Maximum file size: 10MB
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${getFileColor(file.name)} border shadow-lg`}
        >
          {/* File Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-white/50 dark:bg-gray-700/50 flex items-center justify-center shadow-inner">
                {getFileIcon(file.name)}
              </div>
              {!isUploading && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <FaCheckCircle className="text-white text-xs" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                {file.name}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FaFile className="text-xs" />
                  {formatFileSize(file.size)}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className="px-2 py-0.5 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-xs">
                  {file.name?.split('.').pop()?.toUpperCase() || 'FILE'}
                </span>
              </div>
            </div>

            <button
              onClick={onRemove}
              disabled={isUploading}
              className="p-2.5 rounded-xl hover:bg-red-100/50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FaSpinner className="text-purple-500 animate-spin" />
                  Uploading...
                </span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(progress)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">
                {progress < 100 ? 'Processing...' : 'Complete!'}
              </p>
            </motion.div>
          )}

          {/* Upload Complete Animation */}
          <AnimatePresence>
            {!isUploading && file && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"
              >
                <FaCheckCircle className="text-emerald-500" />
                <span>File uploaded successfully</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

export default FileUpload;