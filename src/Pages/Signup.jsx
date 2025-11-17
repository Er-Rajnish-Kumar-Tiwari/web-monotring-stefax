import React, { useState } from "react";
import axios from "axios";
import { FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  // Shared states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup states
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [contactno, setContactno] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const SIGNUP_URL =
    "http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring-users/signup";

  const LOGIN_URL =
    "http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring-users/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignIn) {
        // LOGIN API CALL
        const response = await axios.post(LOGIN_URL, {
          email,
          password,
        });

        toast.success(response.data.message);
        localStorage.setItem("webMonitoringuserId", response.data.user);
        localStorage.setItem("webMonitoringToken", response.data.passcode);
        navigate("/web-dashboard");
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2 seconds

        console.log("LOGIN RESPONSE:", response.data);
      } else {
        // SIGNUP API CALL
        const response = await axios.post(SIGNUP_URL, {
          fullName,
          email,
          password,
          companyName,
          country,
          contactno,
          isTermsAccepted: true,
          notificationEmails: ["dummy@example.com"],
        });

        toast.success("User created successfully!");
        localStorage.setItem("webMonitoringuserId", response.data.user);
        localStorage.setItem("webMonitoringToken", response.data.passcode);
        navigate("/web-dashboard");
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2 seconds

        console.log("SIGNUP RESPONSE:", response.data);
      }
    } catch (error) {
      console.error("API ERROR:", error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0030] via-[#3a007a] to-[#5b00b3]">
      <div className="bg-[#002f4b] p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#7c3aed] p-3 rounded-full">
            <FaShieldAlt size={30} />
          </div>
          <h1 className="text-2xl font-bold mt-3">Dark Web Monitoring</h1>
          <p className="text-sm text-gray-300">
            Sign in to your account or create a new one
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#003a5c] rounded-lg overflow-hidden mb-6">
          <button
            className={`w-1/2 py-2 font-semibold transition-all ${
              isSignIn ? "bg-[#004b74]" : "bg-transparent"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2 font-semibold transition-all ${
              !isSignIn ? "bg-[#004b74]" : "bg-transparent"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Only for Signup */}
          {!isSignIn && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-md bg-[#003a5c] text-white"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  className="w-full px-4 py-2 rounded-md bg-[#003a5c] text-white"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm mb-1">Country</label>
                <input
                  type="text"
                  placeholder="India"
                  className="w-full px-4 py-2 rounded-md bg-[#003a5c] text-white"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm mb-1">Contact Number</label>
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-2 rounded-md bg-[#003a5c] text-white"
                  value={contactno}
                  onChange={(e) => setContactno(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Shared: Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-2 rounded-md bg-[#003a5c] text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Shared: Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-[#003a5c] text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-[#d10078] hover:bg-[#b00064] font-semibold transition-all"
          >
            {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
