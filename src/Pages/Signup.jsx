import React, { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      alert(`Signing in with: ${email} / ${password}`);
    } else {
      alert(`Signing up with: ${email} / ${password}`);
    }
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
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-2 rounded-md bg-[#003a5c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-[#003a5c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#d10078] hover:bg-[#b00064] font-semibold transition-all"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
