/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { BASE_URL } from '../utils/config';

interface UserData {
  username: string;
  email: string;
  role: string;
  url: string;
  SocialLinks: Record<string, string>;
}

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [textareaHeight] = useState('auto');

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
      const userDataToStore: UserData = {
        username: data.username,
        email: data.email || '',
        role: data.role,
        url: data.url,
        SocialLinks: data.SocialLinks || {}
      };

      setUserData(userDataToStore);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.max(e.target.scrollHeight, 120)}px`;
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadMessage('Uploading image...');
      setUploadProgress(0);

      if (!file.type.match('image/jpeg|image/jpg|image/png')) {
        throw new Error('Only JPG, JPEG, and PNG images are allowed');
      }

      if (file.size > 3 * 1024 * 1024) {
        throw new Error('Image size must be less than 3MB');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${BASE_URL}/api/instructor/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const targetPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            const increment = () => {
              setUploadProgress(prev => {
                if (prev >= targetPercent) return targetPercent;
                const newPercent = prev + 1;
                if (newPercent < targetPercent) {
                  requestAnimationFrame(increment);
                }
                return newPercent;
              });
            };
            increment();
          }
        },
      });

      setUploadMessage('');
      setUploadProgress(0);
      return response.data.imageUrl;
    } catch (error) {
      setUploadMessage('');
      setUploadProgress(0);
      throw error instanceof Error ? error : new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!title || !description) {
        throw new Error('Title and description are required');
      }

      if (price === '' || price < 0) {
        throw new Error('Please enter a valid price');
      }

      let finalThumbnailUrl = thumbnailUrl;

      if (thumbnailFile) {
        finalThumbnailUrl = await handleImageUpload(thumbnailFile);
      }

      const response = await axios.post(
        `${BASE_URL}/api/instructor/create-course`,
        {
          title,
          description,
          thumbnailUrl: finalThumbnailUrl,
          price: price || 0,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      navigate(`/instructor/courses/${response.data.course.id}`);
    } catch (error) {
      setError(
        (error as any)?.response?.data?.message ||
        (error as any)?.response?.data?.error ||
        (error instanceof Error ? error.message : 'Failed to create course')
      );
      setIsSubmitting(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setPrice('');
    } else if (/^\d*\.?\d*$/.test(value)) {
      setPrice(parseFloat(value));
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          
          {/* Form Skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-6">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen pt-12 md:pt-0">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Course
          </h1>
          {userData && (
            <p className="mt-2 text-gray-600">
              Welcome back, <span className="font-semibold text-black">{userData.username}</span>!
            </p>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                placeholder="e.g. Advanced React Patterns"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Keep it concise but descriptive</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                style={{ height: textareaHeight, minHeight: '120px' }}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm resize-y overflow-hidden"
                placeholder="What will students learn in this course?"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Minimum 100 characters recommended</p>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (INR)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={price === '' ? '' : price}
                  onChange={handlePriceChange}
                  className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">INR</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">Enter 0 for a free course</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Thumbnail *
              </label>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg mb-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <span className="font-bold">For best results:</span> Use a <span className="font-bold">7:5 aspect ratio</span> image (e.g., 1400×1000 pixels).
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-1">
                {thumbnailUrl ? (
                  <div className="relative group">
                    <div className="aspect-w-7 aspect-h-5">
                      <img
                        src={thumbnailUrl}
                        alt="Course thumbnail preview"
                        className="object-cover rounded-lg border-2 border-gray-200 w-full h-auto"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailUrl('');
                        setThumbnailFile(null);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"
                    >
                      <span className="text-white text-sm font-medium px-3 py-1 bg-black bg-opacity-70 rounded-md">
                        Change Image
                      </span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="thumbnail-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG (MAX. 3MB)</p>
                      </div>
                      <input
                        id="thumbnail-upload"
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setThumbnailFile(file);
                            setThumbnailUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {uploadMessage && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{uploadMessage}</span>
                  <span className="text-sm font-medium text-gray-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-white bg-black border border-transparent rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Publish Course'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;