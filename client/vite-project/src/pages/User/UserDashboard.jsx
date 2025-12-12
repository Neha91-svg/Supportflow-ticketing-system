import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext"; // 🌙 DARK MODE


export default function UserDashboard() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme(); // 🌙 DARK MODE
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const summaryRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/tickets/dashboard/summary`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        const ticketsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/tickets/mytickets`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setRecentTickets(ticketsRes.data.tickets.slice(0, 5));
      } catch (err) {
        setError("Unable to load dashboard data. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="p-6 text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <div
      className={`space-y-10 p-6 min-h-screen transition-all ${theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
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
        Welcome, {user?.name || "User"} 👋
      </h1>

      {/* QUICK ACTION BUTTONS */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate("/user/create-ticket")}
          className="bg-gradient-to-r 
            from-purple-400 via-purple-500 to-pink-500
            text-white px-5 py-3 rounded-xl font-semibold
            shadow-md hover:shadow-xl hover:scale-105 transition"
        >
          Create Ticket ➕
        </button>

        <button
          onClick={() => navigate("/user/my-tickets")}
          className="bg-gradient-to-r 
            from-pink-400 via-pink-500 to-purple-500
            text-white px-5 py-3 rounded-xl font-semibold
            shadow-md hover:shadow-xl hover:scale-105 transition"
        >
          My Tickets 📄
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        <SummaryCard title="Total Tickets" value={summary?.total || 0} />
        <SummaryCard title="Open Tickets" value={summary?.open || 0} />
        <SummaryCard title="Closed Tickets" value={summary?.closed || 0} />
        <SummaryCard title="High Priority" value={summary?.highPriority || 0} />
      </div>

      {/* RECENT TICKETS */}
      <div
        className={`mt-10 p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
      >
        <h2 className="text-xl font-bold mb-4">Recent Tickets</h2>

        {recentTickets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No tickets found.</p>
        ) : (
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 
                dark:from-gray-700 dark:to-gray-600 shadow rounded-xl 
                flex justify-between items-center cursor-pointer
                hover:scale-[1.02] hover:shadow-md transition"
                onClick={() => navigate(`/user/my-tickets/${ticket._id}`)}
              >
                <div>
                  <p className="font-bold text-lg">{ticket.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Status:{" "}
                    <span className="font-semibold">{ticket.status}</span> | Priority:{" "}
                    <span className="font-semibold">{ticket.priority}</span>
                  </p>
                </div>
                <div className="text-gray-400">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* SUMMARY CARD */
const SummaryCard = ({ title, value }) => {
  return (
    <div
      className="p-6 rounded-2xl bg-gradient-to-br 
    from-purple-300 via-pink-300 to-orange-300
    text-black dark:text-white shadow-md hover:shadow-xl
    cursor-pointer hover:scale-[1.03] transition"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-4xl font-extrabold mt-2">{value}</p>
    </div>
  );
};
