// src/data/menuItems.ts
import {
  BookOpenIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  PencilIcon,
  AcademicCapIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ClockIcon,
  GiftIcon,
  ReceiptPercentIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export interface MenuItem {
  name: string;
  href: string;
  section: string;
  icon: React.ReactNode;
  action?: () => void;
}

export const studentMenuItems: MenuItem[] = [
  { name: 'My learning', href: '/dashboard/learning', section: 'learning', icon: <BookOpenIcon className="w-5 h-5" /> },
  { name: 'My cart', href: '/dashboard/cart', section: 'learning', icon: <ShoppingCartIcon className="w-5 h-5" /> },
  { name: 'Wishlist', href: '/dashboard/wishlist', section: 'learning', icon: <HeartIcon className="w-5 h-5" /> },
  { name: 'My profile', href: '/dashboard/my-profile', section: 'profile', icon: <UserIcon className="w-5 h-5" /> },
  { name: 'Edit profile', href: '/dashboard/edit-profile', section: 'profile', icon: <PencilIcon className="w-5 h-5" /> },
  { name: 'Teach on Learnify', href: '/teach-on-learnify', section: 'teaching', icon: <AcademicCapIcon className="w-5 h-5" /> },
  { name: 'Notifications', href: '/notifications', section: 'account', icon: <BellIcon className="w-5 h-5" /> },
  { name: 'Messages', href: '/messages', section: 'account', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
  { name: 'Account settings', href: '/account-settings', section: 'settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
  { name: 'Payment methods', href: '/payment-methods', section: 'settings', icon: <CreditCardIcon className="w-5 h-5" /> },
  { name: 'Subscriptions', href: '/subscriptions', section: 'settings', icon: <ClockIcon className="w-5 h-5" /> },
  { name: 'LearniFy credits', href: '/credits', section: 'settings', icon: <GiftIcon className="w-5 h-5" /> },
  { name: 'Purchase history', href: '/purchase-history', section: 'settings', icon: <ReceiptPercentIcon className="w-5 h-5" /> },
  { name: 'Help', href: '/help', section: 'support', icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },
  {
    name: 'Logout',
    href: '#',
    section: 'logout',
    icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
    action: () => {} // This will be overridden in the component
  },
];

export const sectionTitles: Record<string, string> = {
  learning: 'LEARNING',
  teaching: 'TEACHING',
  account: 'ACCOUNT',
  settings: 'SETTINGS',
  profile: 'PROFILE',
  support: 'SUPPORT'
};