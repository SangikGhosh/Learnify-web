import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TeachOnLearnify from "./pages/TeachOnLearnify";
import InstructorRegister from "./pages/InstructorRegister";
import InstructorLogin from "./pages/InstructorLogin";
import VerifyOTPPage from "./pages/VerifyOTPPage";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const hideLayout = [
    "/login", 
    "/register", 
    "/otp",
    "/reset-password",
    "/forgot-password",
    "/instructor-register",
    "/instructor-login",
    "/verify-otp",
  ].includes(location.pathname);

  useEffect(() => {
    if (location.pathname === "/reset-password" && !location.search.includes("token=")) {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={ <RegisterPage /> }/>
        <Route path="/teach-on-learnify" element={ <TeachOnLearnify /> } />
        <Route path="/instructor-register" element={ <InstructorRegister /> } />
        <Route path="/instructor-login" element={<InstructorLogin />} />
        <Route path="/verify-otp" element={ <VerifyOTPPage /> } />
      </Routes>
      {!hideLayout && <Footer />}
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
