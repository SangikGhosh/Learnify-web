import {
  BookOpenIcon,
  UserIcon,
  PencilIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
  FolderIcon,
  StarIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  TicketIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

export interface MenuItem {
  name: string;
  href: string;
  section: string;
  icon: React.ReactNode;
  action?: () => void;
}

export const instructorMenuItems: MenuItem[] = [
  // Course Management
  { name: 'Create New Course', href: '/dashboard/create-courses', section: 'course-management', icon: <PlusCircleIcon className="w-5 h-5" /> },
  { name: 'My Courses', href: '/dashboard/courses', section: 'course-management', icon: <BookOpenIcon className="w-5 h-5" /> },
  { name: 'Edit Course', href: '/dashboard/edit-courses', section: 'course-management', icon: <PencilIcon className="w-5 h-5" /> },
  { name: 'Upload Resources', href: '/dashboard/resources', section: 'course-management', icon: <FolderIcon className="w-5 h-5" /> },
  { name: 'Reviews & Ratings', href: '/dashboard/reviews', section: 'course-management', icon: <StarIcon className="w-5 h-5" /> },

  // Insights
  { name: 'Course Analytics', href: '/dashboard/analytics', section: 'insights', icon: <ChartBarIcon className="w-5 h-5" /> },
  { name: 'Student Enrollments', href: '/dashboard/enrollments', section: 'insights', icon: <UserGroupIcon className="w-5 h-5" /> },
  { name: 'Earnings', href: '/dashboard/earnings', section: 'insights', icon: <CurrencyDollarIcon className="w-5 h-5" /> },

  // Payments
  { name: 'Withdrawals', href: '/dashboard/withdrawals', section: 'payments', icon: <BanknotesIcon className="w-5 h-5" /> },
  { name: 'Payout Settings', href: '/dashboard/payout-settings', section: 'payments', icon: <CreditCardIcon className="w-5 h-5" /> },
  { name: 'Promotions & Coupons', href: '/dashboard/promotions', section: 'payments', icon: <TicketIcon className="w-5 h-5" /> },

  // Profile & Support
  { name: 'My Profile', href: '/dashboard/my-profile', section: 'profile-support', icon: <UserIcon className="w-5 h-5" /> },
  { name: 'Edit profile', href: '/dashboard/edit-profile', section: 'profile', icon: <PencilIcon className="w-5 h-5" /> },
  { name: 'Messages', href: '/dashboard/messages', section: 'profile-support', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
  { name: 'Notifications', href: '/dashboard/notifications', section: 'profile-support', icon: <BellIcon className="w-5 h-5" /> },
  { name: 'Performance Dashboard', href: '/dashboard/performance', section: 'profile-support', icon: <PresentationChartLineIcon className="w-5 h-5" /> },
  { name: 'Help & Support', href: '/dashboard/support', section: 'profile-support', icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },

  // Logout
  {
    name: 'Logout',
    href: '#',
    section: 'logout',
    icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
    action: () => {} // This will be overridden in the component
  },
];

export const instructorSectionTitles: Record<string, string> = {
  'course-management': 'COURSE MANAGEMENT',
  'insights': 'INSIGHTS',
  'payments': 'PAYMENTS',
  'profile-support': 'PROFILE & SUPPORT',
};