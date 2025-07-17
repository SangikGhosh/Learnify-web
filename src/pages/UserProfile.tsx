import React, { useState, useEffect, useCallback } from 'react';
import { imageMap } from '../components/AvatarData';
import { BASE_URL } from '../utils/config';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface UserData {
  username: string;
  email?: string;
  role: string;
  joinDate?: string;
  coursesCompleted?: number;
  enrolledCourses?: number;
  progress?: number;
  SocialLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    [key: string]: string | undefined;
  };
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string>('');

  const fetchUserData = useCallback(async () => {
    // Check if user data exists in localStorage
    const savedUserData = localStorage.getItem('userData');

    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
      if (parsedData.username) {
        setUserInitial(parsedData.username.charAt(0).toUpperCase());
      }
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${BASE_URL}/api/common/user-details`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const userDataToStore = {
        username: data.username,
        email: data.email || '',
        role: data.role,
        SocialLinks: data.SocialLinks || {}
      };
      // Save to state
      setUserData(userDataToStore);

      if (data.username) {
        const initial = data.username.charAt(0).toUpperCase();
        setUserInitial(initial);
        localStorage.setItem('username', data.username);
      }

      // Save the essential data to localStorage
      const essentialData = {
        username: data.username,
        email: data.email || '',
        role: data.role,
        SocialLinks: data.SocialLinks || {}
      };
      localStorage.setItem('userData', JSON.stringify(essentialData));
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getAvatar = () => {
    if (!userInitial) return 'https://via.placeholder.com/150';

    const avatarKey = Object.keys(imageMap).find(key => key === userInitial);

    return avatarKey
      ? imageMap[avatarKey as keyof typeof imageMap]
      : `https://ui-avatars.com/api/?name=${userInitial}&background=random&size=150`;
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const renderSocialLinks = () => {
    if (!userData?.SocialLinks) return null;

    const socialLinks = userData.SocialLinks;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const availableLinks = Object.entries(socialLinks).filter(([_, value]) => value);

    if (availableLinks.length === 0) return null;

    return (
      <div className="mt-4 sm:mt-6">
        <h3 className="text-sm font-medium text-gray-500 text-center md:text-left mb-3">
          Social Links
        </h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {availableLinks.map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-1.5 rounded-full text-xs font-medium border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200 hover:scale-102 hover:shadow-sm`}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          {/* Profile Header Skeleton */}
          <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-300"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            <div className="space-y-3 text-center">
              <div className="h-8 w-48 bg-gray-300 rounded mx-auto"></div>
              <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
            </div>
          </div>

          {/* Profile Details Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-4">
              <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-100 rounded-lg border border-gray-200"></div>
                </div>
              ))}
              <div className="h-10 w-full bg-gray-300 rounded-lg mt-6"></div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-4">
              <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg border border-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div
          className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-md"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mt-4">Error loading profile</h3>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={fetchUserData}
            className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div
          className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-md"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mt-4">No User Data</h3>
          <p className="text-gray-600 mt-2">We couldn't find any user data to display.</p>
          <button
            onClick={fetchUserData}
            className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Refresh
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pt-12 md:pt-0"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Profile Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-6 sm:mb-8"
        variants={fadeIn}
      >
        <div className="relative">
          <img
            src={getAvatar()}
            alt="Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-gray-200 object-cover shadow-md"
          />
          <div className="absolute bottom-1 sm:bottom-2 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 border-2 border-white"></div>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{userData.username}</h1>
          {userData.email && (
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">{userData.email}</p>
          )}
          <div className="mt-2 sm:mt-3">
            <span className="inline-block bg-black px-3 sm:px-4 py-1 rounded-md text-xs sm:text-sm font-medium text-white border border-gray-200 shadow-sm">
              {userData.role.toLowerCase()}
            </span>
          </div>
          {renderSocialLinks()}
        </div>
      </motion.div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Personal Info Card */}
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm"
            variants={fadeIn}
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Profile Information</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Username</label>
                <div className="w-full p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm sm:text-base text-gray-900">
                  {userData.username}
                </div>
              </div>
              {userData.email && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Email Address</label>
                  <div className="w-full p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm sm:text-base text-gray-900">
                    {userData.email}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Account Type</label>
                <div className="w-full p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm sm:text-base text-gray-900 capitalize">
                  {userData.role.toLowerCase()}
                </div>
              </div>
            </div>
            <button
              className="mt-4 sm:mt-6 w-full py-2 sm:py-3 bg-black text-white rounded-lg cursor-pointer transition duration-300 text-sm sm:text-base font-medium"
              onClick={() => navigate('/dashboard/edit-profile')}
            >
              Update Profile
            </button>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm"
            variants={fadeIn}
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Learning Progress</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Course Completion</span>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                  <div
                    className="bg-blue-600 h-2 sm:h-2.5 rounded-full"
                    style={{ width: `${userData.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs sm:text-sm text-blue-600 mb-1">Courses Completed</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-800">13</p>
                </div>
                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="text-xs sm:text-sm text-purple-600 mb-1">Enrolled Courses</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-800">13</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Account Actions Card */}
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm"
            variants={fadeIn}
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Account Settings</h2>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-1 sm:p-2 bg-blue-100 rounded-lg mr-2 sm:mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-700">Change Password</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-1 sm:p-2 bg-purple-100 rounded-lg mr-2 sm:mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-700">Notification Preferences</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-1 sm:p-2 bg-green-100 rounded-lg mr-2 sm:mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-700">Privacy Settings</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-lg hover:bg-red-100 transition duration-200 border border-red-100">
                <div className="flex items-center">
                  <div className="p-1 sm:p-2 bg-red-100 rounded-lg mr-2 sm:mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-red-600">Delete Account</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Badges Card */}
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm"
            variants={fadeIn}
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Achievements</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center bg-blue-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-xs sm:text-sm font-medium text-blue-800">New Learner</span>
              </div>
              <div className="flex items-center bg-purple-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-xs sm:text-sm font-medium text-purple-800">Course Completed</span>
              </div>
              <div className="flex items-center bg-green-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-xs sm:text-sm font-medium text-green-800">Dedicated Learner</span>
              </div>
              <div className="flex items-center bg-yellow-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-yellow-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-xs sm:text-sm font-medium text-yellow-800">Advanced Learner</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;