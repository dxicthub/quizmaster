// components/Layout/Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          {/* Technology Stack */}
         
          
          {/* Copyright */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear}   Licensed to JEO Digital Solutions. All rights reserved.
          </div>
          
          {/* Powered by */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Powered by <span className="font-medium text-blue-600 dark:text-blue-400">DXICTHUB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;