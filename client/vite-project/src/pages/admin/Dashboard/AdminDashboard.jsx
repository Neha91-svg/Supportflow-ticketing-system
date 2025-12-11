import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";

// Chart.js
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { useTheme } from "../../../context/ThemeContext"; // 🌙 THEME HOOK

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AdminDashboard() {
  const { theme, toggleTheme } = useTheme(); // 🌙 DARK MODE
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStats(res.data.data || {});
      setRecentUsers(res.data.recentUsers || []);
      setRecentTickets(res.data.recentTickets || []);
    } catch (err) {
      console.error("Admin dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <Loader />;

  // Pie chart: Ticket distribution
  const pieData = {
    labels: ["Open", "Closed", "High Priority"],
    datasets: [
      {
        data: [
          stats.openTickets || 0,
          stats.closedTickets || 0,
          stats.highPriority || 0,
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
      },
    ],
  };

  // Bar chart: Overall ticket stats
  const barData = {
    labels: ["Total Users", "Total Agents", "Total Tickets"],
    datasets: [
      {
        label: "Counts",
        data: [
          stats.totalUsers || 0,
          stats.totalAgents || 0,
          stats.totalTickets || 0,
        ],
        backgroundColor: ["#9966ff", "#4bc0c0", "#f87171"],
      },
    ],
  };

  return (
    <div
      className={`space-y-10 p-6 min-h-screen transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
    >
      {/* 🌙 DARK MODE + LOGOUT BUTTON */}
      <div className="flex justify-end gap-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-xl font-semibold shadow-md 
          bg-gradient-to-r from-purple-500 to-pink-500 text-white
          hover:scale-105 transition"
        >
          {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl font-semibold shadow-md
          bg-red-500 text-white hover:scale-105 transition"
        >
          Logout 🔒
        </button>
      </div>

      {/* TITLE */}
      <h1
        className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r
        from-purple-500 via-pink-500 to-orange-400
        text-transparent bg-clip-text"
      >
        Welcome, Admin 👋
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div
          className="p-6 rounded-2xl bg-gradient-to-br 
          from-blue-300 via-blue-400 to-blue-500
          text-white shadow-md hover:shadow-xl cursor-pointer 
          hover:scale-[1.03] transition"
        >
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-sm mt-1 opacity-90">{stats.totalUsers || 0}</p>
        </div>

        <div
          className="p-6 rounded-2xl bg-gradient-to-br 
          from-green-300 via-green-400 to-green-500
          text-white shadow-md hover:shadow-xl cursor-pointer 
          hover:scale-[1.03] transition"
        >
          <h2 className="text-xl font-semibold">Total Agents</h2>
          <p className="text-sm mt-1 opacity-90">{stats.totalAgents || 0}</p>
        </div>

        <div
          className="p-6 rounded-2xl bg-gradient-to-br 
          from-purple-300 via-purple-400 to-purple-500
          text-white shadow-md hover:shadow-xl cursor-pointer 
          hover:scale-[1.03] transition"
        >
          <h2 className="text-xl font-semibold">Total Tickets</h2>
          <p className="text-sm mt-1 opacity-90">{stats.totalTickets || 0}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div
          className={`p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            }`}
        >
          <h2 className="text-lg font-bold mb-4">Ticket Status Overview</h2>
          <Pie data={pieData} />
        </div>

        <div
          className={`p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            }`}
        >
          <h2 className="text-lg font-bold mb-4">Overall Stats</h2>
          <Bar data={barData} />
        </div>
      </div>

      {/* RECENT USERS */}
      <div
        className={`mt-10 p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
      >
        <h2 className="text-xl font-bold mb-4">Recent Users</h2>
        {recentUsers.length === 0 ? (
          <p>No recent users found.</p>
        ) : (
          <ul className="space-y-2">
            {recentUsers.map((user) => (
              <li
                key={user._id}
                className="p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {user.role}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RECENT TICKETS */}
      <div
        className={`mt-10 p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
      >
        <h2 className="text-xl font-bold mb-4">Recent Tickets</h2>
        {recentTickets.length === 0 ? (
          <p>No recent tickets found.</p>
        ) : (
          <ul className="space-y-2">
            {recentTickets.map((ticket) => (
              <li
                key={ticket._id}
                className="p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{ticket.title}</span>
                  <span
                    className={`text-sm px-2 py-1 rounded-lg ${ticket.status === "open"
                      ? "bg-red-200"
                      : ticket.status === "in-progress"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                      }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.priority}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
