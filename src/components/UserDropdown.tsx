import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { imageMap } from './AvatarData';
import { BASE_URL } from '../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  name: string;
  href: string;
  section: string;
  action?: () => void;
}

interface UserDropdownProps {
  username: string;
  userInitial: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ username, userInitial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

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

      toast.success('Logged out successfully');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error: unknown) {
      toast.error(`Failed to logout. Please try again. ${error}`);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const menuItems: MenuItem[] = [
    { name: 'My learning', href: '/learning', section: 'learning' },
    { name: 'My cart', href: '/cart', section: 'learning' },
    { name: 'Wishlist', href: '/wishlist', section: 'learning' },
    { name: 'My profile', href: '/public-profile', section: 'profile' },
    { name: 'Edit profile', href: '/edit-profile', section: 'profile' },
    { name: 'Teach on Learnify', href: '/teach-on-learnify', section: 'teaching' },
    { name: 'Notifications', href: '/notifications', section: 'account' },
    { name: 'Messages', href: '/messages', section: 'account' },
    { name: 'Account settings', href: '/account-settings', section: 'settings' },
    { name: 'Payment methods', href: '/payment-methods', section: 'settings' },
    { name: 'Subscriptions', href: '/subscriptions', section: 'settings' },
    { name: 'Udemy credits', href: '/credits', section: 'settings' },
    { name: 'Purchase history', href: '/purchase-history', section: 'settings' },
    { name: 'Help', href: '/help', section: 'support' },
    {
      name: 'Log out',
      href: '#',
      section: 'logout',
      action: () => setShowLogoutModal(true)
    },
  ];

  const sectionTitles: Record<string, string> = {
    learning: 'LEARNING',
    teaching: 'TEACHING',
    account: 'ACCOUNT',
    settings: 'SETTINGS',
    profile: 'PROFILE',
    support: 'SUPPORT'
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="relative">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="rounded-lg shadow-lg"
        progressClassName="bg-yellow-400"
      />

      <div
        className="hidden lg:flex items-center cursor-pointer group hover:bg-blue-50 p-2 rounded-xl"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span className="mr-3 text-lg font-medium text-black">
          {username.length > 20 ? `${username.substring(0, 17)}...` : username}
        </span>
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-400">
          <img
            src={imageMap[userInitial as keyof typeof imageMap] || `https://i.pinimg.com/736x/65/86/33/65863323059a9c78a095f5bae47faa35.jpg`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 shadow-2xl rounded-lg z-50 overflow-y-auto scrollbar-hide"
            style={{ maxHeight: '80vh' }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="py-2">
              {Object.entries(groupedItems).map(([section, items]) => (
                <div key={section} className="mb-1 last:mb-0">
                  {sectionTitles[section] && (
                    <div className="px-4 py-2 text-sm text-black font-semibold uppercase tracking-wider">
                      {sectionTitles[section]}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    {items.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          if (item.action) {
                            e.preventDefault();
                            item.action();
                          }
                        }}
                        className={`block px-4 py-2 text-sm ${item.section === 'logout'
                          ? 'text-red-600 font-medium hover:bg-red-100'
                          : 'text-gray-700 font-medium hover:bg-gray-100 hover:text-blue-600'} transition-colors`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  {section !== 'logout' && <div className="border-t border-gray-200 my-1"></div>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            {/* Blur overlay */}
            <motion.div
              className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full border border-gray-200">
                {/* Modal Header */}
                <div className="p-5 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 text-center">
                    Logout from LearniFy
                  </h3>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="flex justify-center mb-5">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
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

                  <p className="text-gray-600 text-center mb-6">
                    Are you sure you want to sign out of your LearniFy account?
                  </p>

                  <div className="flex flex-row gap-3">
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer flex-1 py-2.5 px-4 bg-black hover:bg-red-600 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing out...
                        </>
                      ) : 'Yes, Sign Out'}
                    </button>

                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="cursor-pointer flex-1 py-2.5 px-4 border border-gray-500 text-black rounded-md font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                  <p className="text-xs text-gray-500 text-center">
                    You can always log back in to continue learning on LearniFy.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;