import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BASE_URL } from '../utils/config';
import { toast } from 'react-toastify';

interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
  onLogoutSuccess: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ show, onClose, onLogoutSuccess }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear storage
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('username');

      onLogoutSuccess();
    } catch (error: unknown) {
      toast.error(`Failed to logout. Please try again. ${error}`);
      setIsLoggingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-center gap-2 p-4 sm:p-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                  Logout from
                  <span className="ml-2">
                    <img
                      src='../../src/assets/Images/Learnify.png'
                      alt="LearniFy Logo"
                      className='h-6 sm:h-8 w-auto'
                    />
                  </span>
                </h3>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex justify-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                </div>

                <p className="text-gray-600 text-center mb-5 text-sm sm:text-base leading-relaxed">
                  Are you sure you want to sign out of your <span className="font-semibold">LearniFy</span> account?
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleLogout}
                    className={`py-2.5 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg font-medium sm:font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center ${
                      isLoggingOut && 'opacity-70 cursor-not-allowed'
                    }`}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <>
                        <svg 
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing out...
                      </>
                    ) : 'Yes, Sign Out'}
                  </button>

                  <button
                    onClick={onClose}
                    className="py-2.5 px-4 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-black bg-white hover:bg-gray-50 rounded-lg font-medium sm:font-semibold transition-all duration-200 shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 bg-gray-50 text-center text-xs text-gray-500">
                You can always log back in to continue learning on <span className="font-medium">LearniFy</span>.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;