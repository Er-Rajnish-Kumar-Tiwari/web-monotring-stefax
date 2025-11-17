import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("webMonitoringToken");

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const PROFILE_URL =
    "http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring-users/profile";

  // Fetch profile
  const getProfile = async () => {
    try {
      const response = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data.user);
      setLoading(false);
    } catch (error) {
      console.log("Profile Error:", error);
      alert("Session expired. Please login again.");
      localStorage.removeItem("authToken");
      navigate("/signup");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/signup");
    } else {
      getProfile();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0a0030] via-[#3a007a] to-[#5b00b3] p-4">
      <div className="bg-[#002f4b] w-full max-w-md p-8 rounded-2xl shadow-lg text-white">
        <div className="flex flex-col items-center mb-4">
          <FaUserCircle size={80} className="text-purple-400" />
          <h2 className="text-2xl font-bold mt-2">User Profile</h2>
        </div>

        <div className="space-y-3 mt-4">
          <div>
            <p className="text-gray-300 text-sm">Full Name</p>
            <p className="text-lg font-semibold">{profile.fullName}</p>
          </div>

          <div>
            <p className="text-gray-300 text-sm">Email</p>
            <p className="text-lg font-semibold">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-300 text-sm">Company</p>
            <p className="text-lg font-semibold">{profile.companyName}</p>
          </div>

          <div>
            <p className="text-gray-300 text-sm">Country</p>
            <p className="text-lg font-semibold">{profile.country}</p>
          </div>

          <div>
            <p className="text-gray-300 text-sm">Contact Number</p>
            <p className="text-lg font-semibold">{profile.contactno}</p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            navigate("/signup");
          }}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
