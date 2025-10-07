import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-2 shadow-inner">
      <div className="px-6 text-center">
        <p className="text-xs">&copy; {new Date().getFullYear()} Guptally. All rights reserved.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
          <a href="#privacy" className="text-xs text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
          <span className="text-gray-600 hidden sm:inline-block text-xs">|</span>
          <a href="#terms" className="text-xs text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};