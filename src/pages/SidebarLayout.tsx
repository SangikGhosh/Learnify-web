/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UserIcon,
  PencilIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  ReceiptPercentIcon,
  CreditCardIcon,
  GiftIcon,
  ClockIcon,
  BookOpenIcon,
  ShoppingCartIcon,
  HeartIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LogoutModal from '../components/LogoutModel';
import Navbar from '../components/Navbar';

const navigationItems = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'My learnings', href: '/dashboard/my-learnings', icon: BookOpenIcon },
  { name: 'My Profile', href: '/dashboard/my-profile', icon: UserIcon },
  { name: 'Edit Profile', href: '/dashboard/edit-profile', icon: PencilIcon },
  { name: 'My cart', href: '/dashboard/my-cart', icon: ShoppingCartIcon },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: HeartIcon },
  { name: 'Notification', href: '/dashboard/notifications', icon: BellIcon },
  { name: 'Messages', href: '/dashboard/community-groups', icon: ChatBubbleLeftRightIcon },
  { name: 'Account security', href: '/dashboard/account-security', icon: Cog6ToothIcon },
  { name: 'Subscriptions', href: '/dashboard/subscriptions', icon: ReceiptPercentIcon },
  { name: 'Payment Methods', href: '/dashboard/payment-methods', icon: CreditCardIcon },
  { name: 'LearniFy Credits', href: '/dashboard/learnify-credits', icon: GiftIcon },
  { name: 'Purchase History', href: '/dashboard/purchase-history', icon: ClockIcon },
  { name: 'Privacy', href: '/dashboard/privacy', icon: ShieldCheckIcon },
  { name: 'Help & support', href: '/dashboard/help-support', icon: QuestionMarkCircleIcon },
  { name: 'Delete Account', href: '/dashboard/delete-account', icon: TrashIcon },
  { name: 'Logout', href: '#', icon: ArrowRightOnRectangleIcon, isAction: true }
];

const SidebarLayout: React.FC = () => {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = (item: any) => {
    if (item.isAction) {
      setShowLogoutModal(true);
      return;
    }
  };

  const handleLogoutSuccess = () => {
    // Clear any user data from storage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect to login page
    window.location.href = "/home";
  };

  return (
    <>
    <div className='flex md:hidden'>
      <Navbar />
    </div>
      <div className="flex flex-1 bg-gray-50 h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-72 md:flex-col">
          <div className="flex flex-col h-full bg-white">
            {/* Fixed header with logo and search */}
            <div className="flex-shrink-0 pt-5">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link to="/home">
                  <img
                    className="w-auto h-12"
                    src="../../src/assets/Images/Learnify.png"
                    alt="LearniFy Logo"
                  />
                </Link>
              </div>

              {/* Search */}
              <div className="px-4 mt-8">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-lg sm:text-sm"
                    placeholder="Search here"
                  />
                </div>
              </div>

              <div className="px-4 mt-6">
                <hr className="border-gray-200" />
              </div>
            </div>

            {/* Scrollable navigation items */}
            <div className="flex-1 px-3 overflow-y-auto">
              <div className="space-y-1">
                <nav className="flex-1 space-y-1">
                  {navigationItems.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => handleLogoutClick(item)}
                    >
                      {item.isAction ? (
                        <div
                          className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group cursor-pointer ${location.pathname === item.href
                            ? 'text-white bg-black'
                            : 'text-red-600 hover:bg-red-100'
                            }`}
                        >
                          <item.icon className="flex-shrink-0 w-5 h-5 mr-4" />
                          {item.name}
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${location.pathname === item.href
                            ? 'text-white bg-black'
                            : 'text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                          <item.icon className="flex-shrink-0 w-5 h-5 mr-4" />
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Fixed user profile at bottom */}
            <div className="flex-shrink-0 px-3 pb-4 mt-auto">
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <img
                    className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                    src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
                    alt="User avatar"
                  />
                  Jacob Jones
                </div>
                <svg
                  className="w-5 h-5 ml-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="py-6">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>

        {/* Logout Modal */}
        <LogoutModal
          show={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onLogoutSuccess={handleLogoutSuccess}
        />
      </div>
    </>
  );
};

export default SidebarLayout;