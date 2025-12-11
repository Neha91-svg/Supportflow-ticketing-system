import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api"; // axios instance with baseURL & auth
import Loader from "../../../components/Loader";
import { useTheme } from "../../../context/ThemeContext";

export default function AgentDetail() {
  const { theme } = useTheme();
  const { id } = useParams();

  const [agent, setAgent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAgentDetails();
  }, [id]);

  const loadAgentDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/admin/agents/${id}`); // ✅ same as AgentList navigate

      if (!res.data.agent) {
        setError("Agent not found");
        return;
      }

      setAgent(res.data.agent);
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("Error fetching agent details:", err.response?.data || err.message);
      setError("Failed to load agent details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!agent) return <p className="p-6">Agent not found</p>;

  return (
    <div className={`p-6 min-h-screen space-y-10 transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text">
        Agent Details 👤
      </h1>

      <div className={`p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-bold">{agent.name}</h2>
        <p className="text-sm opacity-80">{agent.email}</p>
        <div className="mt-4">
          <span className="px-3 py-1 text-sm rounded-xl bg-blue-200 text-blue-800">{agent.role}</span>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 text-white shadow-md">
            <h3 className="text-sm font-semibold">Total Tickets</h3>
            <p className="text-lg font-bold">{tickets.length}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold">Assigned Tickets 🎫</h2>
      {tickets.length === 0 ? (
        <p>No tickets assigned.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} className={`p-4 rounded-xl shadow-md transition ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{ticket.title}</h3>
                <span className={`px-3 py-1 rounded-lg text-sm ${ticket.status === "open" ? "bg-red-200 text-red-800" : ticket.status === "in-progress" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm opacity-80 mt-1">{ticket.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
