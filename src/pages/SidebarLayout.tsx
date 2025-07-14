/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LogoutModal from '../components/LogoutModel';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../utils/config';
import { instructorMenuItems, instructorSectionTitles } from '../components/InstructorMenuItem';
import { studentMenuItems } from '../components/StudentMenuItem';

interface MenuItem {
  name: string;
  href: string;
  section: string;
  icon: React.ReactNode;
  action?: () => void;
}

const SidebarLayout: React.FC = () => {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [sectionTitles, setSectionTitles] = useState<Record<string, string>>({});
  const [groupedItems, setGroupedItems] = useState<Record<string, MenuItem[]>>({});
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, you would fetch this from your API
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setMenuBasedOnRole(parsedData.role);
          setUserName(parsedData.name || 'User');
          return;
        }

        // Mock API call - replace with your actual API call
        const token = localStorage.getItem('token');
        if (!token) return;

        // This is just a mock - replace with your actual API endpoint
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
          setUserName(data.name || 'User');
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
    } else {
      // Default to student menu
      setMenuItems(studentMenuItems);
      setSectionTitles(sectionTitles);
    }
  };

  useEffect(() => {
    // Group menu items by section
    const grouped: Record<string, MenuItem[]> = {};
    menuItems.forEach(item => {
      if (!grouped[item.section]) {
        grouped[item.section] = [];
      }
      grouped[item.section].push(item);
    });
    setGroupedItems(grouped);
  }, [menuItems]);

  const handleLogoutSuccess = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('token');
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
            </div>

            {/* Scrollable navigation items */}
            <div className="flex-1 px-3 overflow-y-auto">
              {Object.keys(groupedItems).map((section) => (
                <div key={section} className="mt-6">
                  <h3 className="px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    {sectionTitles[section]}
                  </h3>
                  <nav className="mt-2 space-y-1">
                    {groupedItems[section].map((item) => (
                      <div key={`${section}-${item.name}`}>
                        {item.name === 'Logout' ? (
                          <div
                            onClick={() => setShowLogoutModal(true)}
                            className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group cursor-pointer ${location.pathname === item.href
                              ? 'text-white bg-black'
                              : 'text-red-600 hover:bg-red-100'
                              }`}
                          >
                            {item.icon}
                            <span className="ml-4">{item.name}</span>
                          </div>
                        ) : (
                          <Link
                            to={item.href}
                            className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${location.pathname === item.href
                              ? 'text-white bg-black'
                              : 'text-gray-900 hover:bg-gray-100'
                              }`}
                          >
                            {item.icon}
                            <span className="ml-4">{item.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              ))}
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
                  {userName || 'User'}
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