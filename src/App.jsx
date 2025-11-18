import React from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import Overview from "./Pages/OverView";
import Icients from "./Pages/Incient";
import Settings from "./Pages/Settings";
import Dashboards from "./Pages/Dashboad";
import AuthPage from "./Pages/Signup";
import "react-phone-input-2/lib/style.css";


import { Route, Routes, Navigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Profile from "./Components/Profile";

const App = () => {
  const userId = localStorage.getItem("webMonitoringuserId");

  return (
    <div>
      {/* If user logged in → show Navbar + Hero */}
      {userId && <Navbar />}
      {userId && <HeroSection />}

      <Routes>
        {/* If no user → redirect all routes to /signup */}
        {!userId ? (
          <>
            <Route path="*" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
          </>
        ) : (
          <>
            {/* Logged in user routes */}
            <Route path="/" element={<Overview />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/incidents" element={<Icients />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/web-dashboard" element={<Dashboards />} />
            <Route path="/profile" element={<Profile/>} />

            {/* Signup tab ko hide karna after login */}
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>

      {/* If logged in → show footer */}
      {userId && <Footer />}

      <ToastContainer />
    </div>
  );
};

export default App;
