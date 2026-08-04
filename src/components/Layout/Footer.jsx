import React from 'react';
import { FaHeart, FaCode, FaBuilding, FaRocket } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glassmorphism border-t border-gray-200/20 dark:border-gray-700/30 mt-auto">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Company Branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FaBuilding className="text-blue-500 text-lg" />
              <span className="font-bold text-gray-800 dark:text-gray-200">
                JEO Digital Solutions
              </span>
            </div>
            <span className="hidden md:inline text-gray-300 dark:text-gray-600">|</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:inline">
              QuizMaster v1.0
            </span>
          </div>

          {/* Middle Section - Made with Love */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Powered</span>
           
            <span>by</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              DXICTHUB
            </span>
          </div>

          {/* Right Section - Tech Stack & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <FaCode className="text-blue-400" />
              <span>React 19 • Vite • Tailwind CSS</span>
              <FaRocket className="text-blue-400 ml-1" />
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              © {currentYear} JEO Digital Solutions. All rights reserved. 
              <p> Powered by DXICTHUB</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;