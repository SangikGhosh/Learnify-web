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
          <Route path="my-profile" element={<UserProfile />} />
          <Route path="edit-profile" element={<h1>this is edit profile</h1>} />
          <Route path="notifications" element={<h1>this is Notificsation</h1>} />
          <Route path="community-groups" element={<h1>this is community group</h1>} />
          <Route path="account-security" element={<h1>this is account sec</h1>} />
          <Route path="subscriptions" element={<h1>this is subscription</h1>} />
          <Route path="payment-methods" element={<h1>this is payment method</h1>} />
          <Route path="learnify-credits" element={<h1>this is learnify credits</h1>} />
          <Route path="purchase-history" element={<h1>this is purchese history</h1>} />
          <Route path="privacy" element={<h1>this is privecy</h1>} />
          <Route path="help-support" element={<h1>this is help & Support</h1>} />
          <Route path="my-learnings" element={<h1>this is My learninigs</h1>} />
          <Route path="my-cart" element={<h1>this is my cart</h1>} />
          <Route path="wishlist" element={<h1>this is wishlist</h1>} />
          <Route path="delete-account" element={<h1>this is deleyte account</h1>} />
          <Route path="logout" />
          {/* Default dashboard route */}
          <Route index element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;