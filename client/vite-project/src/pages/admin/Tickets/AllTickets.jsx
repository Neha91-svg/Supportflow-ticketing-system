import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

export default function AllTickets() {
  const { theme } = useTheme(); // 🌙 DARK MODE
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    loadTickets();
    loadAgents();
  }, []);

  const loadTickets = async () => {
    const res = await api.get("/admin/tickets");
    setTickets(res.data);
  };

  const loadAgents = async () => {
    const res = await api.get("/admin/agents");
    setAgents(res.data);
  };

  const updateStatus = async (ticketId, status) => {
    await api.put(`/admin/tickets/${ticketId}/status`, { status });
    loadTickets();
  };

  const assignAgent = async (ticketId, agentId) => {
    await api.put(`/admin/tickets/${ticketId}/assign`, { agentId });
    loadTickets();
  };

  const updatePriority = async (ticketId, priority) => {
    await api.put(`/admin/tickets/${ticketId}/priority`, { priority });
    loadTickets();
  };

  const deleteTicket = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    await api.delete(`/admin/tickets/${ticketId}`);
    loadTickets();
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
    >
      {/* PAGE TITLE */}
      <h2
        className="text-3xl font-extrabold mb-6 bg-gradient-to-r
        from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text"
      >
        All Tickets 🎫
      </h2>

      {/* TICKETS TABLE */}
      <div
        className={`p-6 rounded-2xl shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
      >
        <table className="w-full">
          <thead>
            <tr
              className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"
                } border-b`}
            >
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Assigned Agent</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr
                key={t._id}
                className={`border-b transition hover:scale-[1.01] ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
              >
                {/* Title */}
                <td className="p-3 font-semibold">{t.title}</td>

                {/* Status */}
                <td className="p-3">
                  <select
                    value={t.status}
                    onChange={(e) => updateStatus(t._id, e.target.value)}
                    className={`p-2 rounded-lg border shadow-sm ${theme === "dark"
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white"
                      }`}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>

                {/* Assign Agent */}
                <td className="p-3">
                  <select
                    value={t.assignedTo?._id || ""}
                    onChange={(e) => assignAgent(t._id, e.target.value)}
                    className={`p-2 rounded-lg border shadow-sm ${theme === "dark"
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white"
                      }`}
                  >
                    <option value="">Unassigned</option>
                    {agents.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Priority */}
                <td className="p-3">
                  <select
                    value={t.priority}
                    onChange={(e) => updatePriority(t._id, e.target.value)}
                    className={`p-2 rounded-lg border shadow-sm ${theme === "dark"
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white"
                      }`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="p-3 flex gap-3">
                  {/* View */}
                  <Link
                    to={`/admin/tickets/${t._id}`}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    View
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => deleteTicket(t._id)}
                    className="text-red-500 font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
