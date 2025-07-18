import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { motion } from 'framer-motion';

interface PublicUserData {
  username: string;
  email?: string;
  role: string;
  socialLinks?: {
    [key: string]: string;
  };
  createdAt?: string;
  imageUrl?: string,
}

const PublicUserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<PublicUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Social media icons
  const socialIcons = {
    instagram: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    twitter: 'https://pngimg.com/uploads/x_logo/x_logo_PNG2.png',
    github: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    linkedin: 'https://img.freepik.com/premium-vector/square-linkedin-logo-isolated-white-background_469489-892.jpg',
    reddit: 'https://w7.pngwing.com/pngs/647/198/png-transparent-reddit-hd-logo.png'
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/common/user/${encodeURIComponent(username!)}`, {
          method: 'GET',
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('User not found');
        }

        const data: PublicUserData = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <div className="w-24 h-24 rounded-full bg-gray-300"></div>
            <div className="space-y-3 text-center">
              <div className="h-8 w-48 bg-gray-300 rounded mx-auto"></div>
              <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span className="text-red-800 font-medium">{error}</span>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-8 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold mb-4">
            {userData.imageUrl}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {userData.username}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 capitalize">
            {userData.role}
          </p>
          {userData.createdAt && (
            <p className="text-xs text-gray-500 mt-2">
              Member since {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Profile Details */}
        <div className="p-6 sm:p-8">
          {userData.email && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
              <p className="text-gray-900">{userData.email}</p>
            </div>
          )}

          {/* Social Links */}
          {userData.socialLinks && Object.keys(userData.socialLinks).length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-3">Social Links</h2>
              <div className="flex flex-wrap gap-4">
                {Object.entries(userData.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <img
                      src={socialIcons[platform as keyof typeof socialIcons]}
                      alt={platform}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="capitalize">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>
    </motion.div>
  );
};

export default PublicUserProfile;