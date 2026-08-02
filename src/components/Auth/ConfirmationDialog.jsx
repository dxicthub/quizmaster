import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaExclamationCircle, FaTimes, FaCheckCircle, 
  FaQuestionCircle, FaInfoCircle, FaShieldAlt,
  FaTrash, FaEdit, FaSave, FaArrowRight
} from 'react-icons/fa';

function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'Do you want to continue?',
  confirmText = 'Yes',
  cancelText = 'No',
  confirmVariant = 'primary', // 'primary' | 'danger' | 'success' | 'warning' | 'info'
  icon,
  size = 'md', // 'sm' | 'md' | 'lg'
  showCloseButton = true,
}) {
  const modalRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const lastFocusedElement = useRef(null);

  // Save last focused element when modal opens
  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement;
      
      setTimeout(() => {
        if (confirmButtonRef.current) {
          confirmButtonRef.current.focus();
        }
      }, 100);

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get icon and colors based on variant
  const getVariantConfig = () => {
    switch (confirmVariant) {
      case 'danger':
        return {
          icon: icon || FaTrash,
          iconBg: 'from-rose-100 to-red-100 dark:from-rose-900/40 dark:to-red-900/40',
          iconColor: 'text-rose-500 dark:text-rose-400',
          buttonGradient: 'from-rose-500 to-red-500 hover:shadow-rose-500/50',
          buttonHover: 'hover:shadow-rose-500/50',
          borderColor: 'border-rose-200/50 dark:border-rose-700/30',
          glow: 'shadow-rose-500/30',
          ring: 'focus:ring-rose-500',
        };
      case 'success':
        return {
          icon: icon || FaCheckCircle,
          iconBg: 'from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40',
          iconColor: 'text-emerald-500 dark:text-emerald-400',
          buttonGradient: 'from-emerald-500 to-teal-500 hover:shadow-emerald-500/50',
          buttonHover: 'hover:shadow-emerald-500/50',
          borderColor: 'border-emerald-200/50 dark:border-emerald-700/30',
          glow: 'shadow-emerald-500/30',
          ring: 'focus:ring-emerald-500',
        };
      case 'warning':
        return {
          icon: icon || FaExclamationCircle,
          iconBg: 'from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40',
          iconColor: 'text-amber-500 dark:text-amber-400',
          buttonGradient: 'from-amber-500 to-yellow-500 hover:shadow-amber-500/50',
          buttonHover: 'hover:shadow-amber-500/50',
          borderColor: 'border-amber-200/50 dark:border-amber-700/30',
          glow: 'shadow-amber-500/30',
          ring: 'focus:ring-amber-500',
        };
      case 'info':
        return {
          icon: icon || FaInfoCircle,
          iconBg: 'from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40',
          iconColor: 'text-blue-500 dark:text-blue-400',
          buttonGradient: 'from-blue-500 to-indigo-500 hover:shadow-blue-500/50',
          buttonHover: 'hover:shadow-blue-500/50',
          borderColor: 'border-blue-200/50 dark:border-blue-700/30',
          glow: 'shadow-blue-500/30',
          ring: 'focus:ring-blue-500',
        };
      case 'primary':
      default:
        return {
          icon: icon || FaQuestionCircle,
          iconBg: 'from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40',
          iconColor: 'text-purple-500 dark:text-purple-400',
          buttonGradient: 'from-purple-500 to-indigo-500 hover:shadow-purple-500/50',
          buttonHover: 'hover:shadow-purple-500/50',
          borderColor: 'border-purple-200/50 dark:border-purple-700/30',
          glow: 'shadow-purple-500/30',
          ring: 'focus:ring-purple-500',
        };
    }
  };

  // Get size configuration
  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          padding: 'p-6',
          iconSize: 'w-14 h-14',
          iconText: 'text-2xl',
          titleSize: 'text-xl',
          messageSize: 'text-sm',
          buttonSize: 'px-5 py-2.5',
        };
      case 'lg':
        return {
          padding: 'p-10',
          iconSize: 'w-20 h-20',
          iconText: 'text-4xl',
          titleSize: 'text-3xl',
          messageSize: 'text-base',
          buttonSize: 'px-8 py-4',
        };
      case 'md':
      default:
        return {
          padding: 'p-8',
          iconSize: 'w-16 h-16',
          iconText: 'text-3xl',
          titleSize: 'text-2xl',
          messageSize: 'text-sm',
          buttonSize: 'px-6 py-3',
        };
    }
  };

  const variant = getVariantConfig();
  const sizeConfig = getSizeConfig();
  const IconComponent = variant.icon;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative overflow-hidden glassmorphism card-shadow rounded-3xl ${sizeConfig.padding} max-w-md w-full border ${variant.borderColor} shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Gradient Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${variant.buttonGradient.split(' ')[0]} ${variant.buttonGradient.split(' ')[1]}`} />

          {/* Animated Background Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${variant.iconBg} opacity-10 rounded-3xl`} />

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 group"
              aria-label="Close dialog"
            >
              <FaTimes className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </button>
          )}

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className={`${sizeConfig.iconSize} rounded-full bg-gradient-to-br ${variant.iconBg} flex items-center justify-center shadow-lg ${variant.glow} group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`${variant.iconColor} ${sizeConfig.iconText}`} />
              </div>
            </div>

            {/* Title */}
            <h2
              id="dialog-title"
              className={`${sizeConfig.titleSize} font-bold text-gray-800 dark:text-gray-200 text-center mb-2`}
            >
              {title}
            </h2>

            {/* Message */}
            <p
              id="dialog-description"
              className={`${sizeConfig.messageSize} text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed`}
            >
              {message}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                ref={confirmButtonRef}
                onClick={onConfirm}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 ${sizeConfig.buttonSize} bg-gradient-to-r ${variant.buttonGradient} text-white rounded-xl font-semibold shadow-lg transition-all duration-300 ${variant.buttonHover} focus:outline-none focus:ring-2 ${variant.ring} focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2 group`}
              >
                {confirmText}
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 ${sizeConfig.buttonSize} bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
              >
                {cancelText}
              </motion.button>
            </div>

            {/* Keyboard shortcuts hint */}
            <div className="mt-4 text-center">
              <p className="text-[10px] text-gray-400 dark:text-gray-500">
                Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">Enter</kbd> to confirm · <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">Esc</kbd> to cancel
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ConfirmationDialog;