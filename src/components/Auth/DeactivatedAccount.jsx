import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserSlash, FaEnvelope, FaPhone, FaArrowLeft, 
  FaHeadset, FaClock, FaShieldAlt, FaExclamationTriangle,
  FaArrowRight, FaWhatsapp
} from 'react-icons/fa';

function DeactivatedAccount() {
  const navigate = useNavigate();

  const supportInfo = [
    {
      icon: FaEnvelope,
      label: 'Email Support',
      value: 'support@quizmaster.com',
      action: 'mailto:support@quizmaster.com',
      color: 'from-blue-500 to-indigo-500',
      bg: 'from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20',
      iconColor: 'text-blue-500'
    },
    {
      icon: FaPhone,
      label: 'Phone Support',
      value: '+234 813 164 9230',
      action: 'tel:+2348131649230',
      color: 'from-emerald-500 to-teal-500',
      bg: 'from-emerald-100/50 to-teal-100/50 dark:from-emerald-900/20 dark:to-teal-900/20',
      iconColor: 'text-emerald-500'
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp Support',
      value: '+234 706 106 6372',
      action: 'https://wa.me/2347061066372',
      color: 'from-green-500 to-emerald-500',
      bg: 'from-green-100/50 to-emerald-100/50 dark:from-green-900/20 dark:to-emerald-900/20',
      iconColor: 'text-green-500'
    },
  ];

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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-300/20 dark:bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300/20 dark:bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-300/10 dark:bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500" />

          <div className="p-8">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-red-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-28 h-28 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-rose-500/30">
                  <FaUserSlash className="text-white text-6xl" />
                </div>
              </div>
            </motion.div>

            {/* Title and Message */}
            <motion.div 
              variants={itemVariants}
              className="text-center mb-6"
            >
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Account Deactivated
              </h1>
              <div className="flex items-center justify-center gap-2 mb-3">
                <FaExclamationTriangle className="text-amber-500" />
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your account has been deactivated
                </p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Please contact our support team if you believe this was done in error.
              </p>
            </motion.div>

            {/* Support Info Cards */}
            <motion.div 
              variants={itemVariants}
              className="space-y-3 mb-6"
            >
              {supportInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.action}
                    target={item.label === 'WhatsApp Support' ? '_blank' : '_self'}
                    rel={item.label === 'WhatsApp Support' ? 'noopener noreferrer' : ''}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${item.bg} border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {item.label}
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {item.value}
                      </div>
                    </div>
                    <FaArrowRight className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 group-hover:translate-x-1 transition-all duration-300" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.location.href = 'mailto:support@quizmaster.com'}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <FaHeadset className="group-hover:scale-110 transition-transform" />
                Contact Support
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/login')}
                className="flex-1 px-6 py-3 bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center gap-2 group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </motion.button>
            </motion.div>

            {/* Helpful Tips */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200/50 dark:border-amber-700/30"
            >
              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-amber-500 text-lg mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Need immediate assistance?
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Our support team typically responds within 24 hours. You can also reach us via WhatsApp for faster response.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div 
              variants={itemVariants}
              className="mt-4 text-center"
            >
              <p className="text-xs text-gray-400 dark:text-gray-500">
                <FaClock className="inline mr-1" />
                Support hours: Monday - Friday, 9:00 AM - 6:00 PM (WAT)
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DeactivatedAccount;