import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api"; // axios instance with baseURL & auth
import Loader from "../../../components/Loader";
import { useTheme } from "../../../context/ThemeContext";

export default function AgentList() {
  const { theme } = useTheme();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const res = await api.get("/admin/agents");
      setAgents(res.data || []);
    } catch (err) {
      console.error("Agent list load error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const filteredAgents = agents.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 min-h-screen transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Agent List 👨‍💼
      </h1>

      {/* Search */}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Search agent..."
          className="border p-2 rounded w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredAgents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent._id}
              className={`p-6 rounded-2xl shadow-md cursor-pointer hover:scale-[1.02] transition 
                ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}
            >
              <h2 className="text-xl font-bold">{agent.name}</h2>
              <p className="text-sm opacity-80">{agent.email}</p>
              <div className="mt-3">
                <span className="px-2 py-1 text-sm rounded-xl bg-purple-200 text-purple-800">
                  {agent.role}
                </span>
              </div>
              <p className="text-sm mt-3 opacity-75">
                Tickets Assigned: <span className="font-semibold">{agent.assignedCount || 0}</span>
              </p>

              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => navigate(`/admin/agents/${agent._id}`)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
