import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { imageMap } from './AvatarData';
import LogoutModal from './LogoutModel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { studentMenuItems, sectionTitles as studentSectionTitles } from './StudentMenuItem';
import {
  instructorMenuItems,
  instructorSectionTitles,
  type MenuItem
} from './InstructorMenuItem';
import { BASE_URL } from '../utils/config';

interface UserDropdownProps {
  username: string;
  userInitial: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ username, userInitial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(studentMenuItems);
  const [sectionTitles, setSectionTitles] = useState<Record<string, string>>(studentSectionTitles);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setMenuBasedOnRole(parsedData.role);
          return;
        }

        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${BASE_URL}/api/common/user-details`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('userData', JSON.stringify(data));
          setMenuBasedOnRole(data.role);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const setMenuBasedOnRole = (role: string) => {
    if (role === 'INSTRUCTOR') {
      setMenuItems(instructorMenuItems);
      setSectionTitles(instructorSectionTitles);
    } else if (role === 'STUDENT') {
      setMenuItems(studentMenuItems);
      setSectionTitles(studentSectionTitles);
    }
  };

  // Create menu items with proper logout action
  const getMenuItemsWithActions = () => {
    return menuItems.map(item => {
      if (item.name === 'Logout') {
        return {
          ...item,
          action: () => setShowLogoutModal(true)
        };
      }
      return item;
    });
  };

  const groupedItems = getMenuItemsWithActions().reduce((acc: Record<string, MenuItem[]>, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleSuccessfulLogout = () => {
    setShowLogoutModal(false);
    toast.success('Logged out successfully', {
      onClose: () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        window.location.href = '/home';
      },
      autoClose: 1500
    });
  };

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
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-400">
            <img
              src={imageMap[userInitial as keyof typeof imageMap] || `https://i.pinimg.com/736x/65/86/33/65863323059a9c78a095f5bae47faa35.jpg`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full mt-1 w-72 bg-white border border-gray-200 shadow-2xl rounded-lg z-50 overflow-y-auto scrollbar-hide"
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
                    <div className="px-4 py-2 text-xs text-black font-bold uppercase tracking-wider">
                      {sectionTitles[section]}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    {items.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => {
                          if (item.action) {
                            item.action();
                          }
                        }}
                        className={`group flex items-center px-4 py-2.5 text-sm ${item.section === 'logout'
                          ? 'text-red-600 font-medium hover:bg-red-50'
                          : 'text-gray-700 font-medium hover:bg-gray-100'
                          } transition-colors rounded-md mx-1`}
                      >
                        <span className={`mr-3 transition-colors ${item.section === 'logout'
                          ? 'text-red-500 group-hover:text-red-600'
                          : 'text-gray-500 group-hover:text-blue-600'
                          }`}>
                          {item.icon}
                        </span>
                        <span className={`${item.section === 'logout'
                          ? 'group-hover:text-red-600'
                          : 'group-hover:text-blue-600'
                          }`}>
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </div>
                  {section !== 'logout' && <div className="border-t border-gray-100 my-1"></div>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogoutSuccess={handleSuccessfulLogout}
      />
    </div>
  );
};

export default UserDropdown;