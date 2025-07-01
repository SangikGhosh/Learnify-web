import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const hideLayout = [
    "/login", 
    "/register", 
    "/otp",
    "/reset-password",
    "/forgot-password"
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
