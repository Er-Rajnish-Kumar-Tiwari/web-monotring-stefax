import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiGlobe,
  FiMail,
  FiBell,
  FiShield,
  FiDatabase,
  FiMessageSquare,
  FiShoppingBag,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
const wemonitoringUserId = localStorage.getItem("webMonitoringuserId");

export default function Settings() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [contactNo, setContactNo] = useState("");

  const fetchUserProfile = async () => {
    const API = `http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring-users/me/profile/${wemonitoringUserId}`;

    const authToken = localStorage.getItem("webMonitoringToken");

    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(res);

      setFullName(res.data.fullName);
      setCompanyName(res.data.companyName);
      setCountry(res.data.country);
      setContactNo(res.data.contactno);

      return res.data;
    } catch (err) {
      const apiError =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong";

      toast.error(apiError);
      return null;
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // STATES
  const [orgEmail, setOrgEmail] = useState("");
  const [orgEmails, setOrgEmails] = useState([]);

  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyEmails, setNotifyEmails] = useState([]);

  const API = `http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring-users/${wemonitoringUserId}`;

  //  Yeh token apne login API se receive hota hai
  const authToken = localStorage.getItem("webMonitoringToken");

  // =================== 1️⃣ ORG EMAIL API CALL ===================
  const handleAddOrgEmail = async () => {
    if (!orgEmail.trim()) return;

    // Update local array
    const updated = [...orgEmails, orgEmail];
    setOrgEmails(updated);
    setOrgEmail("");

    const body = {
      fullName,
      companyName,
      country,
      contactno: contactNo,
      notificationEmails: updated,
      isActive: true,
    };

    try {
      const res = await axios.put(API, body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(res.data?.message || "Organization Email Updated!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong"
      );
    }
  };

  // =================== 2️⃣ NOTIFICATION EMAIL API CALL ===================
  const handleAddNotifyEmail = async () => {
    if (!notifyEmail.trim()) return;

    const updatedList = [...notifyEmails, notifyEmail];
    setNotifyEmails(updatedList);
    setNotifyEmail("");

    const body = {
      fullName,
      companyName,
      country,
      contactno: contactNo,
      notificationEmails: updatedList, // 👈 also send org email array
      isActive: true,
    };

    try {
      const res = await axios.put(API, body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(res.data?.message || "Notify Email Updated!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong"
      );
    }
  };

  const handleDeleteOrgEmail = (index) => {
    const updated = orgEmails.filter((_, i) => i !== index);
    setOrgEmails(updated);
  };

  const handleDeleteNotifyEmail = (index) => {
    const updated = notifyEmails.filter((_, i) => i !== index);
    setNotifyEmails(updated);
  };

  return (
    <div className="min-h-screen bg-[#0b203a] text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* --- Title --- */}
        <div>
          <h1 className="text-2xl font-bold mb- flex gap-2 items-center">
            <FiBell className="text-pink-400" /> Dark Web Monitoring Settings
          </h1>
          <p className="text-gray-400">
            Configure your monitoring preferences and alerts
          </p>
        </div>

        {/* ======================================================= */}
        {/* 1️⃣ ORGANIZATION ACCESS SECTION — UPDATED UI LIKE SCREENSHOT */}
        {/* ======================================================= */}

        
        <section className="bg-[#122b4d] rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiMail className="text-pink-400" /> Breach Notification Emails
          </h2>

          <p className="text-gray-400 text-sm mb-4">
            Add email addresses where you want to receive breach notifications
          </p>

          <div className="flex gap-3 items-center">
            <input
              type="email"
              placeholder="notification@example.com"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              className="w-full bg-[#0b203a] border border-[#1e3a63] text-white px-4 py-2 rounded-xl outline-none"
            />

            <button
              onClick={handleAddNotifyEmail}
              className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <FiPlus /> Add
            </button>
          </div>

          <div className="mt-3 text-gray-400 text-sm">
            {notifyEmails.length === 0 ? (
              <p>No notification emails added yet.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {notifyEmails.map((item, index) => (
                  <li
                    key={index}
                    className="bg-[#1e3a63] px-3 py-2 rounded-lg text-white text-sm flex justify-between items-center"
                  >
                    {item}
                    <button
                      onClick={() => handleDeleteNotifyEmail(index)}
                      className="text-red-400 hover:text-red-500 ml-3"
                    >
                      <FiX size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ======================================================= */}
        {/*   OTHER STATIC SECTIONS — 100% ORIGINAL CODE  */}
        {/* ======================================================= */}

        {/* --- Monitored Assets --- */}
        <section className="bg-[#122b4d] rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiShield className="text-pink-400" /> Monitored Assets
          </h2>

          <div className="space-y-6">
            {/* Domains */}
            <div>
              <h3 className="font-medium flex items-center gap-2 text-gray-200">
                <FiGlobe className="text-blue-400" /> Domains
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Monitor your organization’s domains for credentials, data
                breaches, and mentions on dark web forums, paste sites, and
                marketplaces.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-[#1e3a63] text-sm px-3 py-1 rounded-full">
                  Example: company.com
                </span>
                <span className="bg-[#1e3a63] text-sm px-3 py-1 rounded-full">
                  Example: subdomain.company.com
                </span>
              </div>
            </div>

            {/* Email Addresses */}
            <div>
              <h3 className="font-medium flex items-center gap-2 text-gray-200">
                <FiMail className="text-blue-400" /> Email Addresses
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Track specific email addresses for compromised credentials, data
                leaks, and appearances in known breaches.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-[#1e3a63] text-sm px-3 py-1 rounded-full">
                  Example: admin@company.com
                </span>
                <span className="bg-[#1e3a63] text-sm px-3 py-1 rounded-full">
                  Example: user@company.com
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Monitoring Frequency --- */}
        <section className="bg-[#122b4d] rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiDatabase className="text-pink-400" /> Monitoring Frequency
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Set how often we scan for new threats
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#1e3a63] p-4 rounded-xl">
              <h3 className="font-semibold">Daily Scans</h3>
              <p className="text-sm text-gray-400 mt-1">
                Continuous monitoring with daily sweeps across dark web sources.
              </p>
              <span className="text-xs bg-pink-600 px-2 py-0.5 rounded-full mt-2 inline-block">
                Default
              </span>
            </div>

            <div className="bg-[#1e3a63] p-4 rounded-xl">
              <h3 className="font-semibold">Weekly Scans</h3>
              <p className="text-sm text-gray-400 mt-1">
                Regular weekly checks for lower-priority assets.
              </p>
            </div>

            <div className="bg-[#1e3a63] p-4 rounded-xl">
              <h3 className="font-semibold">Real-time</h3>
              <p className="text-sm text-gray-400 mt-1">
                Immediate alerts for critical assets (requires premium).
              </p>
            </div>
          </div>
        </section>

        {/* --- Alert Settings --- */}
        <section className="bg-[#122b4d] rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiBell className="text-pink-400" /> Alert Settings
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Configure how you receive incident notifications
          </p>

          {/* Notification Channels */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-200 mb-2">
              Notification Channels
            </h3>
            <div className="bg-[#1e3a63] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <FiMail className="text-blue-400" /> Email Alerts
                </p>
                <p className="text-sm text-gray-400">
                  Receive immediate email notifications for high-severity
                  incidents.
                </p>
              </div>
              <span className="bg-green-600 text-sm px-3 py-1 rounded-full">
                Enabled
              </span>
            </div>
          </div>

          {/* Severity Filters */}
          <div>
            <h3 className="font-medium text-gray-200 mb-2">Severity Filters</h3>
            <p className="text-gray-400 text-sm mb-3">
              Choose which severity levels trigger alerts
            </p>
            <div className="flex gap-2">
              <span className="bg-red-600 px-3 py-1 text-sm rounded-full">
                High
              </span>
              <span className="bg-yellow-500 px-3 py-1 text-sm rounded-full text-black">
                Medium
              </span>
              <span className="bg-blue-500 px-3 py-1 text-sm rounded-full">
                Low
              </span>
            </div>
          </div>
        </section>

        {/* --- Monitored Sources --- */}
        <section className="bg-[#122b4d] rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiDatabase className="text-pink-400" /> Monitored Sources
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Dark web locations we continuously scan for threats
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1e3a63] p-4 rounded-xl flex items-start gap-3">
              <FiMessageSquare className="text-blue-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Dark Web Forums</h3>
                <p className="text-sm text-gray-400">
                  Hacker forums and underground communities.
                </p>
              </div>
            </div>

            <div className="bg-[#1e3a63] p-4 rounded-xl flex items-start gap-3">
              <FiDatabase className="text-blue-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Paste Sites</h3>
                <p className="text-sm text-gray-400">
                  Public data dumps and leaked credentials.
                </p>
              </div>
            </div>

            <div className="bg-[#1e3a63] p-4 rounded-xl flex items-start gap-3">
              <FiShoppingBag className="text-blue-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Marketplaces</h3>
                <p className="text-sm text-gray-400">
                  Criminal marketplaces selling stolen data.
                </p>
              </div>
            </div>

            <div className="bg-[#1e3a63] p-4 rounded-xl flex items-start gap-3">
              <FiMessageSquare className="text-blue-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Chat Platforms</h3>
                <p className="text-sm text-gray-400">
                  Encrypted messaging channels and groups.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
