import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { imageMap } from './AvatarData';
import LogoutModal from './LogoutModel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BookOpenIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  PencilIcon,
  AcademicCapIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ClockIcon,
  GiftIcon,
  ReceiptPercentIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface MenuItem {
  name: string;
  href: string;
  section: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface UserDropdownProps {
  username: string;
  userInitial: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ username, userInitial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems: MenuItem[] = [
    { name: 'My learning', href: '/dashboard/learning', section: 'learning', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: 'My cart', href: '/dashboard/cart', section: 'learning', icon: <ShoppingCartIcon className="w-5 h-5" /> },
    { name: 'Wishlist', href: '/dashboard/wishlist', section: 'learning', icon: <HeartIcon className="w-5 h-5" /> },
    { name: 'My profile', href: '/dashboard/my-profile', section: 'profile', icon: <UserIcon className="w-5 h-5" /> },
    { name: 'Edit profile', href: '/dashboard/edit-profile', section: 'profile', icon: <PencilIcon className="w-5 h-5" /> },
    { name: 'Teach on Learnify', href: '/teach-on-learnify', section: 'teaching', icon: <AcademicCapIcon className="w-5 h-5" /> },
    { name: 'Notifications', href: '/notifications', section: 'account', icon: <BellIcon className="w-5 h-5" /> },
    { name: 'Messages', href: '/messages', section: 'account', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
    { name: 'Account settings', href: '/account-settings', section: 'settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
    { name: 'Payment methods', href: '/payment-methods', section: 'settings', icon: <CreditCardIcon className="w-5 h-5" /> },
    { name: 'Subscriptions', href: '/subscriptions', section: 'settings', icon: <ClockIcon className="w-5 h-5" /> },
    { name: 'LearniFy credits', href: '/credits', section: 'settings', icon: <GiftIcon className="w-5 h-5" /> },
    { name: 'Purchase history', href: '/purchase-history', section: 'settings', icon: <ReceiptPercentIcon className="w-5 h-5" /> },
    { name: 'Help', href: '/help', section: 'support', icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },
    {
      name: 'Log out',
      href: '#',
      section: 'logout',
      icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
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

  const handleSuccessfulLogout = () => {
    setShowLogoutModal(false);
    toast.success('Logged out successfully', {
      onClose: () => {
        window.location.reload();
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
                        onClick={(e) => {
                          if (item.action) {
                            e.preventDefault();
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