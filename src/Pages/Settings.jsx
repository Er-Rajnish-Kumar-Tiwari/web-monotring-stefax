import React from "react";
import {
  FiGlobe,
  FiMail,
  FiBell,
  FiShield,
  FiDatabase,
  FiMessageSquare,
  FiShoppingBag,
} from "react-icons/fi";

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#0b203a] text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* --- Title --- */}
        <div>
          <h1 className="text-2xl font-bold mb- flex gap-2 items-center"> <FiBell className="text-pink-400"/> Dark Web Monitoring Settings</h1>
          <p className="text-gray-400">
            Configure your monitoring preferences and alerts
          </p>
        </div>

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
                Monitor your organization’s domains for credentials, data breaches,
                and mentions on dark web forums, paste sites, and marketplaces.
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
            <h3 className="font-medium text-gray-200 mb-2">Notification Channels</h3>
            <div className="bg-[#1e3a63] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <FiMail className="text-blue-400" /> Email Alerts
                </p>
                <p className="text-sm text-gray-400">
                  Receive immediate email notifications for high-severity incidents.
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
              <span className="bg-red-600 px-3 py-1 text-sm rounded-full">High</span>
              <span className="bg-yellow-500 px-3 py-1 text-sm rounded-full text-black">
                Medium
              </span>
              <span className="bg-blue-500 px-3 py-1 text-sm rounded-full">Low</span>
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
