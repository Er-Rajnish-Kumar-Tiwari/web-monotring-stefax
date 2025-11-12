import React from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const Dashboards = () => {
  return (
    <div className="min-h-screen bg-[#052847] text-white p-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Incidents */}
        <div className="bg-[#06365e] p-5 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">Total Incidents</h2>
            <FaChartLine className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-green-400 text-sm mt-1">+12% from last month</p>
        </div>

        {/* Open Incidents */}
        <div className="bg-[#06365e] p-5 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">Open Incidents</h2>
            <FaExclamationTriangle className="text-pink-500" />
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-green-400 text-sm mt-1">+5% from last month</p>
        </div>

        {/* Resolved */}
        <div className="bg-[#06365e] p-5 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">Resolved</h2>
            <FaCheckCircle className="text-green-400" />
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-green-400 text-sm mt-1">+18% from last month</p>
        </div>

        {/* Avg Resolution Time */}
        <div className="bg-[#06365e] p-5 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">Avg Resolution Time</h2>
            <FaClock className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold">N/A</p>
          <p className="text-red-400 text-sm mt-1">-2d from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Incidents by Severity */}
        <div className="bg-[#06365e] p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-pink-400 mb-4">
            <FaShieldAlt /> Incidents by Severity
          </h2>
          <div className="flex justify-center items-center h-48 text-gray-400">
            No incidents data available
          </div>
        </div>

        {/* Breach Types */}
        <div className="bg-[#06365e] p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-purple-400 mb-4">
            <FaChartLine /> Breach Types
          </h2>
          <div className="flex justify-center items-center h-48 text-gray-400">
            No breach type data available
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="bg-[#06365e] p-8 rounded-xl text-center shadow-md">
        <FaShieldAlt className="text-3xl text-gray-400 mx-auto mb-2" />
        <h3 className="font-semibold text-lg text-gray-200 mb-1">
          No incidents yet
        </h3>
        <p className="text-gray-400 text-sm">
          Start monitoring domains and emails to see breach data here.
        </p>
      </div>
    </div>
  );
};

export default Dashboards;
