/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import LogoutModal from '../components/LogoutModel';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../utils/config';
import { instructorMenuItems, instructorSectionTitles } from '../components/InstructorMenuItem';
import { studentMenuItems } from '../components/StudentMenuItem';
import { debounce } from 'lodash';

interface MenuItem {
  name: string;
  href: string;
  section: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface PublicUserData {
  username: string;
  email?: string;
  role: string;
  url?: string;
  socialLinks?: {
    [key: string]: string;
  };
}

const SidebarLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [sectionTitles, setSectionTitles] = useState<Record<string, string>>({});
  const [groupedItems, setGroupedItems] = useState<Record<string, MenuItem[]>>({});
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PublicUserData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userInitial, setUserInitial] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setMenuBasedOnRole(parsedData.role);
          setUserName(parsedData.username || 'User');
          setUserInitial(parsedData.url || '');
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
          setUserName(data.username || 'User');
          setUserInitial(data.url || '');
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
    } else if (role === "STUDENT") {
      setMenuItems(studentMenuItems);
      setSectionTitles({});
    }
  };

  useEffect(() => {
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

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${BASE_URL}/api/common/search-user/${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const results = Array.isArray(data) ? data : [data];
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 300);

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery]);

  const handleResultClick = (username: string) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/user/${username}`);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <div className='flex md:hidden'>
        <Navbar />
      </div>
      <div className="flex flex-1 bg-gray-50 h-screen overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`hidden md:flex flex-col bg-white transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-72'} relative z-20 shadow-lg`}
        >
          <div className="flex flex-col h-full">
            {/* Fixed header with logo and toggle button */}
            <div className="flex-shrink-0 pt-5">
              <div className="flex items-center justify-between px-4">
                <Link to="/home" className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                  <img
                    className="w-auto h-12"
                    src="../../src/assets/Images/Learnify.png"
                    alt="LearniFy Logo"
                  />
                </Link>
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                  {isSidebarCollapsed ? (
                    <ChevronDoubleRightIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDoubleLeftIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Search - only visible when expanded */}
              {!isSidebarCollapsed && (
                <div className="px-4 mt-8">
                  <label htmlFor="search" className="sr-only">
                    Search users
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full py-2 pl-10 border border-gray-300 rounded-lg sm:text-sm"
                      placeholder="Search users by username"
                      autoComplete="off"
                    />
                  </div>

                  {/* Search results dropdown */}
                  {searchQuery && (
                    <div className="absolute z-50 w-[calc(100%-2rem)] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                      {isSearching ? (
                        <div className="p-3 text-center text-gray-500">Searching...</div>
                      ) : searchResults.length > 0 ? (
                        <ul>
                          {searchResults.map((user) => (
                            <li
                              key={user.username}
                              className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleResultClick(user.username)}
                            >
                              <div className="flex items-center p-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-medium">
                                  <img 
                                    src={user.url}
                                    alt='profile'
                                    className='rounded-full w-full h-full object-cover'
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{user.username}</p>
                                  {user.email && (
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                  )}
                                  <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="p-3 text-center text-gray-500">
                          {searchQuery && !isSearching ? 'No users found' : ''}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Scrollable navigation items */}
            <div className="flex-1 px-3 overflow-y-auto overflow-x-hidden">
              {Object.keys(groupedItems).map((section) => (
                <div key={section} className="mt-6">
                  {!isSidebarCollapsed && sectionTitles[section] && (
                    <h3 className="px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      {sectionTitles[section]}
                    </h3>
                  )}
                  <nav className="mt-2 space-y-1">
                    {groupedItems[section].map((item) => (
                      <div key={`${section}-${item.name}`} className="relative group">
                        {item.name === 'Logout' ? (
                          <div
                            onClick={() => setShowLogoutModal(true)}
                            className={`flex items-center px-2.5 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer ${
                              location.pathname === item.href
                                ? 'text-white bg-black'
                                : 'text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <span className="flex-shrink-0">{item.icon}</span>
                            {!isSidebarCollapsed && <span className="ml-4 z-50">{item.name}</span>}
                            {isSidebarCollapsed && (
                              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {item.name}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            to={item.href}
                            className={`flex items-center px-2.5 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                              location.pathname === item.href
                                ? 'text-white bg-black'
                                : 'text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            <span className="flex-shrink-0">{item.icon}</span>
                            {!isSidebarCollapsed && <span className="ml-4">{item.name}</span>}
                            {isSidebarCollapsed && (
                              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md shadow-lg z-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {item.name}
                              </div>
                            )}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              ))}
            </div>

            {/* Fixed user profile at bottom */}
            <div className="flex-shrink-0 px-2.5 pb-2.5 mt-auto">
              <button
                type="button"
                className="flex items-center justify-between w-full px-2.5 py-2.5 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/dashboard/my-profile")}
              >
                <div className="flex items-center">
                  {userInitial ? (
                    <img
                      src={userInitial}
                      alt="Profile"
                      className="flex-shrink-0 w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex-shrink-0 w-8 h-8 mr-3 pl-2 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {!isSidebarCollapsed && (
                    <span className="truncate max-w-[160px] ml-2">{userName}</span>
                  )}
                </div>
                {!isSidebarCollapsed && (
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
                )}
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