import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const SuperAdmin = () => {
  const userId = localStorage.getItem("webMonitoringuserId");
  
  const BASEURL = import.meta.env.VITE_BASE_URL;

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    verifiedUsers: 0,
  });

  const [users, setUsers] = useState([]);

  // ------------------------------
  // 1️⃣ FETCH DASHBOARD STATS
  // ------------------------------
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${BASEURL}/auth/api/v1/dark-web-monitoring-users/super-admin/dashboard`
      );
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard API Error:", err);
    }
  };

  // -------------------------------------
  // 2️⃣ FETCH USERS LIST FOR SUPER ADMIN
  // -------------------------------------
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${BASEURL}/auth/api/v1/dark-web-monitoring-users/super-admin/users?userId=${userId}`
      );
      setUsers(res.data.data);
    } catch (err) {
      console.error("Users API Error:", err);
    }
  };

  // -------------------------------------
  // 3️⃣ DOWNLOAD EXCEL FILE
  // -------------------------------------
  const downloadExcel = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/auth/api/v1/dark-web-monitoring-users/super-admin/export/users?userId=${userId}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users-data.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Excel Download Error:", err);
    }
  };

  // LOAD ALL DATA
  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-[#0b203a] min-h-screen">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-[#06365e] rounded-xl shadow p-5 items-center justify-center text-center">
          <p className="text-white text-xl">Total Users</p>
          <h2 className="text-3xl font-bold mt-2 text-pink-400">
            {stats.totalUsers}
          </h2>
        </div>

        <div className="bg-[#06365e] rounded-xl shadow p-5 text-center">
          <p className="text-white text-xl">Active Users</p>
          <h2 className="text-3xl font-bold mt-2 text-pink-400">
            {stats.activeUsers}
          </h2>
        </div>

        <div className="bg-[#06365e] rounded-xl shadow p-5 text-center">
          <p className="text-white text-xl">Verified Users</p>
          <h2 className="text-3xl font-bold mt-2 text-pink-400">
            {stats.verifiedUsers}
          </h2>
        </div>

      </div>

      {/* User Table */}
      <div className="bg-[#052847] rounded-xl shadow p-6 mt-6">
        
        <div className="flex items-center gap-2 mb-4">
          <FaBuilding className="text-xl text-pink-600" />
          <h2 className="text-3xl font-semibold text-white">User Information</h2>
        </div>

        <div className="overflow-x-auto text-gray-300 flex justify-center">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-[#052847]">
                <th className="text-left p-3">Full Name</th>
                <th className="text-left p-3">Email ID</th>
                <th className="text-left p-3">Phone Number</th>
                <th className="text-left p-3">Company</th>
                <th className="text-left p-3">Last Login</th>
                <th className="text-center p-3">Download Info</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3">{u.fullName}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.contactno || "-"}</td>
                  <td className="p-3">{u.companyName || "-"}</td>
                  <td className="p-3">
                    {u.lastLoggedIn
                      ? new Date(u.lastLoggedIn).toLocaleString()
                      : "No Login"}
                  </td>
                  <td className="text-center p-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={downloadExcel}
                    >
                      <FiDownload size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default SuperAdmin;
