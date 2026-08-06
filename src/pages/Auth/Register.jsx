import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaPhone, FaArrowRight, 
  FaGraduationCap, FaCalendar, FaUsers, FaSpinner,
  FaCheckCircle, FaEye, FaEyeSlash, FaRocket,
  FaArrowLeft, FaLightbulb
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';

function Register() {
  const navigate = useNavigate();
  const { registerStudent } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    batch: '',
    month: '',
    year: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [generatedPasscode, setGeneratedPasscode] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const batches = ['Batch A', 'Batch B', 'Batch C', 'Batch D'];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const isEmailRegistered = (email) => {
    try {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      return students.some(s => s.email?.toLowerCase() === email?.toLowerCase());
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const isPhoneRegistered = (phone) => {
    try {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      return students.some(s => s.phone === phone);
    } catch (error) {
      console.error('Error checking phone:', error);
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com)';
    } else if (isEmailRegistered(formData.email)) {
      newErrors.email = 'This email is already registered. Please use a different email or login.';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/\s/g, '');
      
      if (!cleanPhone.startsWith('+234')) {
        newErrors.phone = 'Phone number must start with +234 (Nigeria country code)';
      } else {
        const numberPart = cleanPhone.substring(4);
        if (!/^\d{10}$/.test(numberPart)) {
          newErrors.phone = 'Please enter exactly 10 digits after +234 (e.g., +2348012345678)';
        }
      }
      
      if (!newErrors.phone && isPhoneRegistered(formData.phone)) {
        newErrors.phone = 'This phone number is already registered. Please use a different number.';
      }
    }

    if (!formData.batch) {
      newErrors.batch = 'Please select a batch';
    }

    if (!formData.month) {
      newErrors.month = 'Please select a month';
    }

    if (!formData.year) {
      newErrors.year = 'Please select a year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateVerificationToken = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    
    try {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const emailExists = students.some(s => s.email?.toLowerCase() === formData.email.toLowerCase());
      
      if (emailExists) {
        toast.error('This email is already registered. Please use a different email or login.');
        setErrors(prev => ({ ...prev, email: 'This email is already registered.' }));
        setIsLoading(false);
        return;
      }
      
      const passcode = 'QZ-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setGeneratedPasscode(passcode);
      
      const newStudent = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        batch: formData.batch,
        month: formData.month,
        year: formData.year,
        passcode: passcode,
        batchLabel: `${formData.month} ${formData.batch}, ${formData.year}`,
        registeredAt: new Date().toISOString(),
        quizHistory: [],
        favorites: [],
        isActive: true,
        emailVerified: false,
        verificationToken: generateVerificationToken(),
        verificationTokenCreatedAt: Date.now(),
      };
      
      students.push(newStudent);
      localStorage.setItem('students', JSON.stringify(students));
      
      registerStudent(formData, newStudent);
      
      setShowPasscode(true);
      toast.success('Registration successful! 🎉');
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      let formattedValue = value.replace(/\s/g, '');
      if (!formattedValue.startsWith('+234') && formattedValue.length > 0) {
        if (formattedValue.match(/^\d/)) {
          formattedValue = '+234' + formattedValue;
        }
      }
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone) {
      let cleanPhone = formData.phone.replace(/\s/g, '');
      if (cleanPhone.startsWith('+234')) {
        const numberPart = cleanPhone.substring(4);
        if (numberPart.length === 10 && /^\d{10}$/.test(numberPart)) {
          const formatted = `+234 ${numberPart.substring(0, 3)} ${numberPart.substring(3, 6)} ${numberPart.substring(6, 10)}`;
          setFormData(prev => ({ ...prev, phone: formatted }));
        }
      }
    }
  };

  const handleContinue = () => {
    navigate('/login');
  };

  const handleBackToLanding = () => {
    navigate('/');
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

  if (showPasscode) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 relative overflow-hidden">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300/20 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300/10 dark:bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            
            <div className="p-8 text-center">
              <div className="text-7xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-2">
                Registration Successful!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Your quiz passcode has been generated. Please keep it safe.
              </p>
              
              <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 mb-6 border border-emerald-200/50 dark:border-emerald-700/30">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your Passcode</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">
                  {generatedPasscode}
                </p>
              </div>

              <div className="mb-6 p-4 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/30">
                <p className="text-sm text-purple-700 dark:text-purple-300 flex items-center justify-center gap-2">
                  <FaUsers className="text-purple-500" />
                  Batch: <strong>{formData.batch}</strong>
                </p>
                <p className="text-sm text-purple-700 dark:text-purple-300 flex items-center justify-center gap-2 mt-1">
                  <FaCalendar className="text-purple-500" />
                  {formData.month} {formData.year}
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(generatedPasscode);
                    toast.success('Passcode copied to clipboard!');
                  }}
                  className="w-full py-2.5 bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                >
                  📋 Copy Passcode
                </button>
                
                <button
                  onClick={handleContinue}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Continue to Login
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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
                Create Account
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Join QuizMaster and start learning today
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'fullName' ? 'scale-[1.02]' : ''
                }`}>
                  <FaUser className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 transition-colors duration-300 ${
                    focusedField === 'fullName' ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500`}
                  />
                </div>
                <AnimatePresence>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'email' ? 'scale-[1.02]' : ''
                }`}>
                  <FaEnvelope className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 transition-colors duration-300 ${
                    focusedField === 'email' ? 'text-blue-600' : 'text-blue-400'
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

              {/* Phone */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone Number <span className="text-xs text-gray-400">(+234 801 234 5678)</span>
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'phone' ? 'scale-[1.02]' : ''
                }`}>
                  <FaPhone className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 transition-colors duration-300 ${
                    focusedField === 'phone' ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handlePhoneBlur}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => { setFocusedField(null); handlePhoneBlur(); }}
                    placeholder="+234 801 234 5678"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                      errors.phone ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 font-mono`}
                  />
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Batch */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Batch
                </label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'batch' ? 'scale-[1.02]' : ''
                }`}>
                  <FaUsers className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 transition-colors duration-300 ${
                    focusedField === 'batch' ? 'text-blue-600' : 'text-blue-400'
                  }`} />
                  <select
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('batch')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                      errors.batch ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none`}
                  >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch} value={batch}>{batch}</option>
                    ))}
                  </select>
                </div>
                <AnimatePresence>
                  {errors.batch && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.batch}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Month and Year */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Month
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'month' ? 'scale-[1.02]' : ''
                  }`}>
                    <FaCalendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 transition-colors duration-300 ${
                      focusedField === 'month' ? 'text-blue-600' : 'text-blue-400'
                    }`} />
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('month')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                        errors.month ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none`}
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <AnimatePresence>
                    {errors.month && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.month}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Year
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'year' ? 'scale-[1.02]' : ''
                  }`}>
                    <FaCalendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 transition-colors duration-300 ${
                      focusedField === 'year' ? 'text-blue-600' : 'text-blue-400'
                    }`} />
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('year')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border ${
                        errors.year ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none`}
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <AnimatePresence>
                    {errors.year && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.year}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    
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
                  Already a member?
                </span>
              </div>
            </motion.div>

            {/* Login Link */}
            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <button
                onClick={() => navigate('/login')}
                className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all duration-300"
              >
                <strong>Login here</strong>
                
              </button>
            </motion.div>

            {/* Help Tip */}
            <motion.div 
              variants={itemVariants}
              className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200/50 dark:border-blue-800/30"
            >
              <div className="flex items-center justify-center gap-3">
                
                <div className=" justify-center text-xs">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                   <strong> Phone: +234 (Nigeria format)</strong>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <strong>Email and phone number must be unique</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

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

export default Register;