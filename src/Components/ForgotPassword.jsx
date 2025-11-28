import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MdEmail, MdLock } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import bgImage from "../Pages/bg-new1.jpg";
import logo from "../Pages/logo.png";

const ResetFlow = () => {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Step 1: Send OTP
  const handleSendOtp = () => {
    if (!email) {
      toast.error("Please enter an email!");
      return;
    }
    toast.success("OTP sent successfully!");
    setStep(2);
  };

  const navigate = useNavigate();
  // Step 2: Verify OTP
  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast.error("Enter valid 6 digit OTP!");
      return;
    }
    toast.success("OTP verified!");
    setStep(3);
  };

  // Step 3: Reset Password
  const handleResetPassword = () => {
    if (!newPass || !confirmPass) {
      toast.error("Please fill all fields!");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success("Password reset successfully!");
    setTimeout(() => {
      navigate("/signup");
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ToastContainer />

      <div className="bg-[#033b55] p-8 rounded-2xl w-[450px] shadow-xl">
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>

        {/* TITLE */}
        <h1 className="text-white text-2xl font-bold text-center">
          Dark Net Tracker
        </h1>

        {/* SUBTITLE BASED ON STEP */}
        <p className="text-gray-300 text-center text-sm mb-6">
          {step === 1 && "Reset your password"}
          {step === 2 && "Enter verification code"}
          {step === 3 && "Create new password"}
        </p>

        {/* Back to Login */}
        <p
          className="flex items-center gap-2 text-gray-300 text-sm mb-4 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          <FaArrowLeft /> Back to login
        </p>

        {/* ---------------- STEP 1: SEND OTP ---------------- */}
        {step === 1 && (
          <>
            <p className="text-gray-300 text-sm mb-3">
              Enter your email address and we'll send you a verification code.
            </p>

            <div className="bg-[#0e506f] flex items-center gap-3 text-gray-300 px-3 py-3 rounded-lg mb-4">
              <MdEmail className="text-xl" />
              <input
                className="bg-transparent outline-none flex-1"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleSendOtp}
              className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-lg font-semibold"
            >
              Send OTP
            </button>
          </>
        )}

        {/* ---------------- STEP 2: VERIFY OTP ---------------- */}
        {step === 2 && (
          <>
            <p className="text-gray-300 text-sm mb-3">
              We've sent a verification code to <b>{email}</b>
            </p>

            <input
              className="bg-[#0e506f] text-gray-100 w-full px-3 py-3 rounded-lg mb-4 outline-none text-center text-xl font-semibold "
              type="text"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-lg font-semibold"
            >
              Verify OTP
            </button>

            <p className="text-gray-300 text-center mt-3 cursor-pointer">
              Resend OTP
            </p>
          </>
        )}

        {/* ---------------- STEP 3: RESET PASSWORD ---------------- */}
        {step === 3 && (
          <>
            <p className="text-gray-300 text-sm mb-3">
              Create a strong new password for your account.
            </p>

            <div className="bg-[#0e506f] flex items-center gap-3 text-gray-300 px-3 py-3 rounded-lg mb-4">
              <MdLock className="text-xl" />
              <input
                className="bg-transparent outline-none flex-1"
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>

            <div className="bg-[#0e506f] flex items-center gap-3 text-gray-300 px-3 py-3 rounded-lg mb-4">
              <MdLock className="text-xl" />
              <input
                className="bg-transparent outline-none flex-1"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-lg font-semibold"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetFlow;
