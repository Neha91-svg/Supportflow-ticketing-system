import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../utils/api";

export default function AdminTicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTicket();
    fetchAgents();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const res = await api.get(`/admin/tickets/${id}`);
      setTicket(res.data);
    } catch (err) {
      console.error("❌ Ticket fetch error:", err);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await api.get("/admin/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("❌ Agents fetch error:", err);
    }
  };

  const updateStatus = async (status) => {
    await api.put(`/admin/tickets/${id}/status`, { status });
    fetchTicket();
  };

  const assignAgent = async (agentId) => {
    await api.put(`/admin/tickets/${id}/assign`, { agentId });
    fetchTicket();
  };

  const updatePriority = async (priority) => {
    await api.put(`/admin/tickets/${id}/priority`, { priority });
    fetchTicket();
  };

  const deleteTicket = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    await api.delete(`/admin/tickets/${id}`);
    navigate("/admin/tickets");
  };

  if (!ticket) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold">{ticket.title}</h2>

      <p><strong>Description:</strong> {ticket.description}</p>

      {/* Status */}
      <div>
        <strong>Status:</strong>{" "}
        <select
          value={ticket.status}
          onChange={(e) => updateStatus(e.target.value)}
          className="border rounded p-1"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Priority */}
      <div>
        <strong>Priority:</strong>{" "}
        <select
          value={ticket.priority}
          onChange={(e) => updatePriority(e.target.value)}
          className="border rounded p-1"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Assigned Agent */}
      <div>
        <strong>Assigned To:</strong>{" "}
        <select
          value={ticket.assignedTo?._id || ""}
          onChange={(e) => assignAgent(e.target.value)}
          className="border rounded p-1"
        >
          <option value="">Unassigned</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      <p>
        <strong>Created At:</strong>{" "}
        {new Date(ticket.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(ticket.updatedAt).toLocaleString()}
      </p>

      {/* Delete Button */}
      <button
        onClick={deleteTicket}
        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:scale-105 transition"
      >
        Delete Ticket
      </button>
    </div>
  );
}
