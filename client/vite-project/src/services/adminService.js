import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/admin";

// Get all users
const getUsers = async () => {
  const { data } = await axios.get(`${API_URL}/users`);
  return data;
};

// Get single user
const getUserById = async (id) => {
  const { data } = await axios.get(`${API_URL}/users/${id}`);
  return data;
};

// Get all agents
const getAgents = async () => {
  const { data } = await axios.get(`${API_URL}/agents`);
  return data;
};

// Get single agent
const getAgentById = async (id) => {
  const { data } = await axios.get(`${API_URL}/agents/${id}`);
  return data;
};

// Get all tickets
const getAllTickets = async () => {
  const { data } = await axios.get(`${API_URL}/tickets`);
  return data;
};

// Get ticket details
const getTicketById = async (id) => {
  const { data } = await axios.get(`${API_URL}/tickets/${id}`);
  return data;
};

const adminService = {
  getUsers,
  getUserById,
  getAgents,
  getAgentById,
  getAllTickets,
  getTicketById,
};

export default adminService;
