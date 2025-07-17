import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { motion } from 'framer-motion';

interface PublicUserData {
  username: string;
  email?: string;
  role: string;
  socialLinks?: {
    [key: string]: string;
  };
}

const PublicUserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<PublicUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required');
        }

        const response = await fetch(`${BASE_URL}/api/common/user/${username}`, {
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
        setUserData({
          username: data.username,
          email: data.email,
          role: data.role,
          socialLinks: data.socialLinks || {}
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicUserData();
  }, [username]);

  const renderSocialLinks = () => {
    if (!userData?.socialLinks) return null;

    const socialLinks = userData.socialLinks;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const availableLinks = Object.entries(socialLinks).filter(([_, value]) => value);

    if (availableLinks.length === 0) return null;

    return (
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Social Links</h3>
        <div className="flex flex-wrap gap-3">
          {availableLinks.map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full text-xs font-medium border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="text-center p-8 bg-white rounded-xl border border-gray-200 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-red-500 mb-4">Error loading profile</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">User not found</div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-md mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600 mb-4">
            {userData.username.charAt(0).toUpperCase()}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900">{userData.username}</h1>
          
          {userData.email && (
            <p className="text-gray-600 mt-1">{userData.email}</p>
          )}
          
          <div className="mt-3">
            <span className="inline-block px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 capitalize">
              {userData.role.toLowerCase()}
            </span>
          </div>
          
          {renderSocialLinks()}
        </div>
      </div>
    </motion.div>
  );
};

export default PublicUserProfile;