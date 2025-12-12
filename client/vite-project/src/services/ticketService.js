import api from "../utils/api";

const API_URL = "/api/tickets";

// Common headers
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const getTickets = async () => {
  const res = await api.get("/tickets");
  return res.data || [];
};

const getMyTickets = async () => {
  const res = await api.get("/tickets/mytickets");
  return res.data?.tickets || [];
};

const createTicket = async (ticketData) => {
  const res = await api.post("/tickets", ticketData);
  return res.data;
};

const updateTicket = async (ticketId, updatedData) => {
  const res = await api.put(`/tickets/${ticketId}`, updatedData);
  return res.data;
};

const closeTicket = async (ticketId) => {
  const res = await api.put(`/tickets/${ticketId}`, { status: "closed" });
  return res.data;
};

const agentCloseTicket = async (ticketId) => {
  const res = await api.put(`/agents/tickets/${ticketId}/close`);
  return res.data;
};

const deleteTicket = async (ticketId) => {
  const res = await api.delete(`/tickets/${ticketId}`);
  return res.data;
};

export default {
  getTickets,
  getMyTickets,
  createTicket,
  updateTicket,
  closeTicket,
  agentCloseTicket,
  deleteTicket,
  authHeaders,
};
