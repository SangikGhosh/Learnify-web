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
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

 const navigationItems = [
  { name: 'My Profile', href: '/my-profile', icon: UserIcon },
  { name: 'Edit Profile', href: '/edit-profile', icon: PencilIcon },
  { name: 'Notification', href: '/notifications', icon: BellIcon },
  { name: 'Community Groups', href: '/community-groups', icon: ChatBubbleLeftRightIcon },
  { name: 'Account security', href: '/account-security', icon: ShieldCheckIcon },
  { name: 'Subscriptions', href: '/subscriptions', icon: ReceiptPercentIcon },
  { name: 'Payment Methods', href: '/payment-methods', icon: CreditCardIcon },
  { name: 'LearniFy Credits', href: '/learnify-credits', icon: GiftIcon },
  { name: 'Purchase History', href: '/purchase-history', icon: ClockIcon },
  { name: 'Privacy', href: '/privacy', icon: ShieldCheckIcon },
  { name: 'Help and support', href: '/help-support', icon: ShieldCheckIcon },
  { name: 'My learnings', href: '/my-learnings', icon: BookOpenIcon },
  { name: 'My cart', href: '/my-cart', icon: ShoppingCartIcon },
  { name: 'Wishlist', href: '/wishlist', icon: HeartIcon },
  { name: 'Delete Account', href: '/delete-account', icon: TrashIcon },
  { name: 'Logout', href: '/logout', icon: ArrowRightOnRectangleIcon }
];

const SidebarLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-1 bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
          <div className="flex items-center flex-shrink-0 px-4">
            <a
            href='./home'
            >
            <img
              className="w-auto h-12"
              src="../../src/assets/Images/Learnify.png"
              alt="LearniFy Logo"
            />
            </a>
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
                className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                placeholder="Search here"
              />
            </div>
          </div>

          <div className="px-4 mt-6">
            <hr className="border-gray-200" />
          </div>

          {/* Navigation */}
          <div className="flex flex-col flex-1 px-3 mt-6">
            <div className="space-y-1">
              <nav className="flex-1 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                      location.pathname === item.href
                        ? 'text-white bg-indigo-600'
                        : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                    }`}
                  >
                    <item.icon className="flex-shrink-0 w-5 h-5 mr-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* User Profile */}
            <div className="pb-4 mt-auto">
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
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <Outlet /> {/* This will render the matched route component */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;