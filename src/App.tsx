import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import TeachOnLearnify from "./pages/TeachOnLearnify";
import InstructorRegister from "./pages/Auth/InstructorRegister";
import VerifyOTPPage from "./pages/Auth/VerifyOTPPage";
import ForgotPasswordVerifyEmail from "./pages/Auth/ForgotPasswordVerifyEmail";
import ForgotPasswordVerifyOTPPage from "./pages/Auth/ForgotPasswordVerifyOTPPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import InstructorVerifyOTPPage from "./pages/Auth/InstructorVerifyOTPPage";
import SidebarLayout from "./pages/SidebarLayout";
import UserProfile from "./pages/UserProfile";

function MainLayout() {
  const location = useLocation();

  const hideLayout = [
    "/login",
    "/register",
    "/verify-otp",
    "/reset-password",
    "/forgot-password/verify-email",
    "/forgot-password/verify-otp",
    "/instructor-register",
    "/reset-password",
    "/instructor-verify-otp"
  ].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/teach-on-learnify" element={<TeachOnLearnify />} />
        <Route path="/instructor-register" element={<InstructorRegister />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/forgot-password/verify-email" element={<ForgotPasswordVerifyEmail />} />
        <Route path="/forgot-password/verify-otp" element={<ForgotPasswordVerifyOTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/instructor-verify-otp" element={<InstructorVerifyOTPPage />} />
        {/* Redirect any unmatched paths in MainLayout to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Public routes with navbar/footer (or without for auth pages) */}
        <Route path="/*" element={<MainLayout />} />

        {/* Dashboard routes with sidebar layout (no navbar/footer) */}
        <Route path="/dashboard/*" element={<SidebarLayout />}>
          {/* Common routes */}
          <Route path="my-profile" element={<UserProfile />} />
          <Route path="edit-profile" element={<h1>Edit Profile</h1>} />
          <Route path="notifications" element={<h1>Notifications</h1>} />
          
          {/* Student-specific routes */}
          <Route path="my-learnings" element={<h1>My Learnings</h1>} />
          <Route path="my-cart" element={<h1>My Cart</h1>} />
          <Route path="wishlist" element={<h1>Wishlist</h1>} />
          <Route path="account-security" element={<h1>Account Security</h1>} />
          <Route path="subscriptions" element={<h1>Subscriptions</h1>} />
          <Route path="payment-methods" element={<h1>Payment Methods</h1>} />
          <Route path="learnify-credits" element={<h1>Learnify Credits</h1>} />
          <Route path="purchase-history" element={<h1>Purchase History</h1>} />
          <Route path="help-support" element={<h1>Help & Support</h1>} />
          <Route path="delete-account" element={<h1>Delete Account</h1>} />
          
          {/* Instructor-specific routes */}
          <Route path="create-courses" element={<h1>Create Courses</h1>} />
          <Route path="courses" element={<h1>My Courses</h1>} />
          <Route path="edit-courses" element={<h1>Edit Courses</h1>} />
          <Route path="resources" element={<h1>Resources</h1>} />
          <Route path="reviews" element={<h1>Reviews</h1>} />
          <Route path="analytics" element={<h1>Analytics</h1>} />
          <Route path="enrollments" element={<h1>Enrollments</h1>} />
          <Route path="earnings" element={<h1>Earnings</h1>} />
          <Route path="withdrawals" element={<h1>Withdrawals</h1>} />
          <Route path="payout-settings" element={<h1>Payout Settings</h1>} />
          <Route path="promotions" element={<h1>Promotions</h1>} />
          <Route path="messages" element={<h1>Messages</h1>} />
          <Route path="performance" element={<h1>Performance</h1>} />
          <Route path="support" element={<h1>Support</h1>} />
          
          {/* Default dashboard route */}
          <Route index element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;