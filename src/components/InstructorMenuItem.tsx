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
  { name: 'Create New Course', href: '/instructor/courses/create', section: 'course-management', icon: <PlusCircleIcon className="w-5 h-5" /> },
  { name: 'My Courses', href: '/instructor/courses', section: 'course-management', icon: <BookOpenIcon className="w-5 h-5" /> },
  { name: 'Edit Course', href: '/instructor/courses/edit', section: 'course-management', icon: <PencilIcon className="w-5 h-5" /> },
  { name: 'Upload Resources', href: '/instructor/resources', section: 'course-management', icon: <FolderIcon className="w-5 h-5" /> },
  { name: 'Reviews & Ratings', href: '/instructor/reviews', section: 'course-management', icon: <StarIcon className="w-5 h-5" /> },

  // Insights
  { name: 'Course Analytics', href: '/instructor/analytics', section: 'insights', icon: <ChartBarIcon className="w-5 h-5" /> },
  { name: 'Student Enrollments', href: '/instructor/enrollments', section: 'insights', icon: <UserGroupIcon className="w-5 h-5" /> },
  { name: 'Earnings', href: '/instructor/earnings', section: 'insights', icon: <CurrencyDollarIcon className="w-5 h-5" /> },

  // Payments
  { name: 'Withdrawals', href: '/instructor/withdrawals', section: 'payments', icon: <BanknotesIcon className="w-5 h-5" /> },
  { name: 'Payout Settings', href: '/instructor/payout-settings', section: 'payments', icon: <CreditCardIcon className="w-5 h-5" /> },
  { name: 'Promotions & Coupons', href: '/instructor/promotions', section: 'payments', icon: <TicketIcon className="w-5 h-5" /> },

  // Profile & Support
  { name: 'Instructor Profile', href: '/instructor/profile', section: 'profile-support', icon: <UserIcon className="w-5 h-5" /> },
  { name: 'Messages', href: '/instructor/messages', section: 'profile-support', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
  { name: 'Notifications', href: '/instructor/notifications', section: 'profile-support', icon: <BellIcon className="w-5 h-5" /> },
  { name: 'Performance Dashboard', href: '/instructor/performance', section: 'profile-support', icon: <PresentationChartLineIcon className="w-5 h-5" /> },
  { name: 'Help & Support', href: '/instructor/support', section: 'profile-support', icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },

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