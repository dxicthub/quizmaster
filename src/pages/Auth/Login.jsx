import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaEnvelope, FaKey, FaArrowRight, FaGraduationCap, 
  FaArrowLeft, FaUserShield, FaEye, FaEyeSlash,
  FaSpinner, FaLightbulb
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../../components/Auth/ConfirmationDialog.jsx';

function Login() {
  const navigate = useNavigate();
  const { loginWithPasscode } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    passcode: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.passcode.trim()) {
      newErrors.passcode = 'Passcode is required';
    } else if (formData.passcode.trim().length < 6) {
      newErrors.passcode = 'Passcode must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before continuing');
      return;
    }

    setIsLoading(true);
    
    const success = loginWithPasscode(formData.email, formData.passcode.toUpperCase());
    
    setIsLoading(false);
    
    if (success) {
      setTimeout(() => {
        navigate('/app');
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAdminNavigation = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmAdminNavigation = () => {
    setShowConfirmDialog(false);
    navigate('/admin/login');
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  // ✅ NEW: Function to navigate to landing page contact section
  const handleContactUsClick = (e) => {
    e.preventDefault();
    // Navigate to landing page with contact section hash
    navigate('/#contact');
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/10 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Back Button - Top Left */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleBackToLanding}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 z-10 group"
        aria-label="Go back to landing page"
      >
        <div className="p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
          <FaArrowLeft className="text-sm" />
        </div>
        <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
      </motion.button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="p-8">
            {/* Logo and Title */}
            <motion.div 
              variants={itemVariants}
              className="text-center mb-8"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <FaGraduationCap className="text-white text-5xl" />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Student Login
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Welcome back! Continue your learning journey
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'email' ? 'scale-[1.02]' : ''
                }`}>
                  <FaEnvelope className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${
                    focusedField === 'email' ? 'text-blue-500' : ''
                  }`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email address"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                      errors.email ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500`}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Passcode
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'passcode' ? 'scale-[1.02]' : ''
                }`}>
                  <FaKey className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 ${
                    focusedField === 'passcode' ? 'text-blue-500' : ''
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="passcode"
                    value={formData.passcode}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('passcode')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your passcode (e.g., QZ-8F4A92)"
                    className={`w-full pl-10 pr-12 py-3 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                      errors.passcode ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 uppercase`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-300"
                    aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                  >
                    {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.passcode && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.passcode}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                  <FaUserShield className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                    <span>Login</span>
                    
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div 
              variants={itemVariants}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200/50 dark:border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white/60 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 backdrop-blur-sm">
                  Or continue as
                </span>
              </div>
            </motion.div>

            {/* Admin Login Link */}
            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <button
                onClick={handleAdminNavigation}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-purple-50/50 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-700/30 hover:bg-purple-100/50 dark:hover:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FaUserShield className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                <span>Admin Login</span>
                
              </button>
            </motion.div>

            {/* ✅ UPDATED: Register Link with "here" linking to Contact Us */}
            <motion.div 
              variants={itemVariants}
              className="mt-4 text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors duration-300 inline-flex items-center gap-1 group"
                >
                  Register here
                  
                </Link>
              </p>
            </motion.div>

            {/* ✅ NEW: Contact Us Link */}
            <motion.div
              variants={itemVariants}
              className="mt-3 text-center"
            >
            </motion.div>

            {/* Help Tip */}
            <motion.div 
              variants={itemVariants}
              className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200/50 dark:border-blue-800/30"
            >
              <div className="flex items-start text-center gap-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your passcode was provided during registration.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    If you forgot it, please <button onClick={handleContactUsClick} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">contact us</button> for assistance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmAdminNavigation}
        title="Leave Student Login?"
        message="Are you sure you want to leave this page?"
        confirmText="Yes, Go to Admin"
        cancelText="Stay Here"
        confirmVariant="primary"
      />

      {/* Custom Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;