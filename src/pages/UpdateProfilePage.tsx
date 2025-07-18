import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BASE_URL } from '../utils/config';

interface SocialLinks {
    instagram?: string;
    twitter?: string;
    reddit?: string;
    github?: string;
    linkedin?: string;
}

interface UserUpdate {
    username?: string;
    socialLinks?: SocialLinks;
}

interface UserData {
    username: string;
    email?: string;
    role: string;
    url: string;
    SocialLinks?: SocialLinks;
}

const UpdateProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UserUpdate>({
        username: '',
        socialLinks: {
            instagram: '',
            twitter: '',
            reddit: '',
            github: '',
            linkedin: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Social media icons
    const socialIcons = {
        instagram: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
        twitter: 'https://pngimg.com/uploads/x_logo/x_logo_PNG2.png',
        github: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        linkedin: 'https://img.freepik.com/premium-vector/square-linkedin-logo-isolated-white-background_469489-892.jpg',
        reddit: 'https://w7.pngwing.com/pngs/647/198/png-transparent-reddit-hd-logo.png'
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

    useEffect(() => {
        const fetchUserData = async () => {
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

                const data: UserData = await response.json();

                // Save the complete user data to localStorage
                localStorage.setItem('userData', JSON.stringify({
                    role: data.role,
                    email: data.email,
                    url: data.url,
                    SocialLinks: data.SocialLinks,
                    username: data.username
                }));

                setFormData({
                    username: data.username,
                    socialLinks: data.SocialLinks || {
                        instagram: '',
                        twitter: '',
                        reddit: '',
                        github: '',
                        linkedin: ''
                    }
                });

            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Prepare payload with only non-empty values
            const payload: UserUpdate = {};

            if (formData.username && formData.username.trim() !== '') {
                payload.username = formData.username.trim();
            }

            // Filter out empty social links
            const socialLinks = formData.socialLinks
                ? Object.entries(formData.socialLinks).reduce((acc, [key, value]) => {
                    if (value && value.trim() !== '') {
                        acc[key as keyof SocialLinks] = value.trim();
                    }
                    return acc;
                }, {} as SocialLinks)
                : {};

            if (Object.keys(socialLinks).length > 0) {
                payload.socialLinks = socialLinks;
            }

            // Don't send request if there's nothing to update
            if (!payload.username && !payload.socialLinks) {
                setError('No changes detected');
                return;
            }

            const response = await fetch(`${BASE_URL}/api/common/update-details`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }

            // Update local storage immediately after successful update
            const savedUserData = localStorage.getItem('userData');
            if (savedUserData) {
                const parsedData = JSON.parse(savedUserData);

                // Update username if it was changed
                if (payload.username) {
                    parsedData.username = payload.username;
                    localStorage.setItem('username', payload.username);
                }

                // Update social links if they were changed
                if (payload.socialLinks) {
                    // Merge existing links with new ones (preserve any existing links not being updated)
                    parsedData.SocialLinks = {
                        ...parsedData.SocialLinks,
                        ...payload.socialLinks
                    };

                    // Remove any links that were set to empty string (if your API handles this)
                    Object.keys(parsedData.SocialLinks).forEach(key => {
                        if (parsedData.SocialLinks[key] === '') {
                            delete parsedData.SocialLinks[key];
                        }
                    });
                }

                localStorage.setItem('userData', JSON.stringify(parsedData));
            }

            setSuccess(true);

            // Redirect back to profile after 2 seconds
            setTimeout(() => {
                navigate('/dashboard/my-profile');
            }, 2000);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

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

                    <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-100 rounded-lg border border-gray-200"></div>
                            </div>
                        ))}
                        <div className="h-12 w-full bg-gray-300 rounded-lg mt-6"></div>
                    </div>
                </div>
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
            <motion.div
                className="flex flex-col items-center gap-4 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-6 sm:mb-8"
                variants={fadeIn}
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Update Profile</h1>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                    Edit your username and social media links below
                </p>
            </motion.div>

            {success && (
                <motion.div
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-green-800 font-medium">Profile updated successfully! Redirecting...</span>
                    </div>
                </motion.div>
            )}

            {error && (
                <motion.div
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span className="text-red-800 font-medium">{error}</span>
                    </div>
                </motion.div>
            )}

            <motion.form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                variants={fadeIn}
            >
                <div className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    key: 'instagram',
                                    label: 'Instagram',
                                    placeholder: 'https://instagram.com/yourusername'
                                },
                                {
                                    key: 'twitter',
                                    label: 'X (Twitter)',
                                    placeholder: 'https://twitter.com/yourusername'
                                },
                                {
                                    key: 'github',
                                    label: 'GitHub',
                                    placeholder: 'https://github.com/yourusername'
                                },
                                {
                                    key: 'linkedin',
                                    label: 'LinkedIn',
                                    placeholder: 'https://linkedin.com/in/yourusername'
                                },
                                {
                                    key: 'reddit',
                                    label: 'Reddit',
                                    placeholder: 'https://reddit.com/user/yourusername'
                                }
                            ].map(({ key, label, placeholder }) => (
                                <div key={key}>
                                    <label htmlFor={key} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <img
                                            src={socialIcons[key as keyof SocialLinks]}
                                            alt={label}
                                            className="w-5 h-5 mr-2 object-contain"
                                        />
                                        {label}
                                    </label>
                                    <input
                                        type="url"
                                        id={key}
                                        value={formData.socialLinks?.[key as keyof SocialLinks] || ''}
                                        onChange={(e) => handleSocialLinkChange(key as keyof SocialLinks, e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder={placeholder}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex-1"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/my-profile')}
                            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors flex-1"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default UpdateProfilePage;