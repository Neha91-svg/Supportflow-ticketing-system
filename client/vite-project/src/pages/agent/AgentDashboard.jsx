import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

// chart.js
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

import { useTheme } from "../../context/ThemeContext"; // 🌙 THEME HOOK

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AgentDashboard() {
  const { theme, toggleTheme } = useTheme(); // 🌙 DARK MODE
  const [stats, setStats] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/agents/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStats(res.data.data || {});
      setRecentTickets(res.data.recent || []);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login page
  };

  if (loading) return <Loader />;

  const pieData = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        data: [stats.open || 0, stats.inProgress || 0, stats.closed || 0],
        backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
      },
    ],
  };

  const barData = {
    labels: ["Assigned", "Closed"],
    datasets: [
      {
        label: "Tickets",
        data: [stats.assigned || 0, stats.closed || 0],
        backgroundColor: ["#9966ff", "#4bc0c0"],
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
        How u doin, Agent 👋
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div
          className="p-6 rounded-2xl bg-gradient-to-br 
          from-purple-300 via-purple-400 to-purple-500
          text-white shadow-md hover:shadow-xl cursor-pointer 
          hover:scale-[1.03] transition"
          onClick={() => navigate("/agent/assigned-tickets")}
        >
          <h2 className="text-xl font-semibold">Assigned Tickets</h2>
          <p className="text-sm mt-1 opacity-90">
            You have {stats.assigned || 0} tickets assigned.
          </p>
        </div>

        <div
          className="p-6 rounded-2xl bg-gradient-to-br 
          from-pink-300 via-pink-400 to-purple-500
          text-white shadow-md hover:shadow-xl cursor-pointer 
          hover:scale-[1.03] transition"
          onClick={() => navigate("/agent/assigned-tickets")}
        >
          <h2 className="text-xl font-semibold">In Progress</h2>
          <p className="text-sm mt-1 opacity-90">
            You have {stats.inProgress || 0} tickets in progress.
          </p>
        </div>

        <div
          className="p-6 rounded-2xl bg-gradient-to-br 
          from-orange-300 via-pink-400 to-purple-500
          text-white shadow-md hover:shadow-xl cursor-pointer 
          hover:scale-[1.03] transition"
          onClick={() => navigate("/agent/assigned-tickets")}
        >
          <h2 className="text-xl font-semibold">Resolved Tickets</h2>
          <p className="text-sm mt-1 opacity-90">
            You have {stats.closed || 0} resolved tickets.
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate("/agent/assigned-tickets")}
          className="bg-gradient-to-r 
            from-purple-400 via-purple-500 to-pink-500
            text-white px-5 py-3 rounded-xl font-semibold
            shadow-md hover:shadow-xl hover:scale-105 transition"
        >
          View Assigned Tickets
        </button>

        <button
          onClick={() => navigate("/agent/profile")}
          className="bg-gradient-to-r 
            from-pink-400 via-pink-500 to-purple-500
            text-white px-5 py-3 rounded-xl font-semibold
            shadow-md hover:shadow-xl hover:scale-105 transition"
        >
          View Profile
        </button>
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
          <h2 className="text-lg font-bold mb-4">Overall Ticket Performance</h2>
          <Bar data={barData} />
        </div>
      </div>

      {/* RECENT TICKETS */}
      <div
        className={`mt-10 p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
      >
        <h2 className="text-xl font-bold mb-4">Recent Ticket Activity</h2>

        {recentTickets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No recent activity.</p>
        ) : (
          <ul className="space-y-3">
            {recentTickets.map((ticket) => (
              <li
                key={ticket._id}
                className={`p-4 border rounded-xl transition hover:bg-gray-50 
                dark:hover:bg-gray-700 dark:border-gray-600`}
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

                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
