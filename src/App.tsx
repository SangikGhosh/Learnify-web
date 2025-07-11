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

function AppContent() {
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
      {!hideLayout && <Navbar /> }
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/teach-on-learnify" element={<TeachOnLearnify />} />
        <Route path="/instructor-register" element={<InstructorRegister />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/forgot-password/verify-email" element={<ForgotPasswordVerifyEmail />} />
        <Route path="/forgot-password/verify-otp" element={<ForgotPasswordVerifyOTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/instructor-verify-otp" element={ <InstructorVerifyOTPPage /> } />
      </Routes>
      {!hideLayout && <Footer />}

      {<SidebarLayout />}
      <Routes>
        <Route path="/my-profile" element={ <UserProfile /> } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
