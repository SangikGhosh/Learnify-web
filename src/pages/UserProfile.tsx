import React, { useState, useEffect, useCallback } from 'react';
import { imageMap } from '../components/AvatarData';
import { BASE_URL } from '../utils/config';

interface UserData {
  username: string;
  email?: string;
  role: string;
}


const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string>('');

  const fetchUserData = useCallback(async () => {
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
      setUserData(data);
      
      // Set initial for avatar
      if (data.username) {
        const initial = data.username.charAt(0).toUpperCase();
        setUserInitial(initial);
        localStorage.setItem('username', data.username);
      }
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

  // Get avatar based on username's first letter
  const getAvatar = () => {
    if (!userInitial) return 'https://via.placeholder.com/150';
    
    // Check if we have a mapped image for this initial
    const avatarKey = Object.keys(imageMap).find(key => key === userInitial);
    
    return avatarKey 
      ? imageMap[avatarKey as keyof typeof imageMap]
      : `https://ui-avatars.com/api/?name=${userInitial}&background=random&size=150`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <p>Error loading profile: {error}</p>
          <button 
            onClick={fetchUserData}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No user data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <img
                src={getAvatar()}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-indigo-700 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{userData.username}</h1>
              {userData.email && <p className="text-indigo-100">{userData.email}</p>}
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm capitalize">
                  {userData.role.toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium">{userData.username}</p>
                </div>
                {userData.email && (
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium capitalize">{userData.role.toLowerCase()}</p>
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-200">
                Edit Profile
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Account Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition duration-200">
                  <span>Change Password</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition duration-200">
                  <span>Notification Settings</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition duration-200">
                  <span className="text-red-500">Delete Account</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;