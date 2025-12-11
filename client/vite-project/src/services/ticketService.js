import axios from "axios";

const API_URL = "/api/tickets";

// Common headers
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const getTickets = async () => {
  try {
    const res = await axios.get(API_URL, { headers: authHeaders() });
    return res.data || [];
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    throw error;
  }
};


const getMyTickets = async () => {
  try {
    const res = await axios.get(`${API_URL}/mytickets`, {
      headers: authHeaders(),
    });
    return res.data?.tickets || [];
  } catch (error) {
    console.error("Error fetching my tickets:", error);
    return [];
  }
};
const createTicket = async (ticketData) => {
  try {
    const res = await axios.post(API_URL, ticketData, { headers: authHeaders() });
    return res.data; //  res.data is ticket object directly
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};




const updateTicket = async (ticketId, updatedData) => {
  try {
    const res = await axios.put(`${API_URL}/${ticketId}`, updatedData, {
      headers: authHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating ticket ${ticketId}:`, error);
    throw error;
  }
};


const closeTicket = async (ticketId) => {
  try {
    const res = await axios.put(
      `${API_URL}/${ticketId}`,
      { status: "closed" },
      { headers: authHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error(`Error closing ticket ${ticketId}:`, error);
    throw error;
  }
};

// AGENT CLOSE TICKET
const agentCloseTicket = async (ticketId) => {
  try {
    const res = await axios.put(
      `/api/agents/tickets/${ticketId}/close`,
      {},
      { headers: authHeaders() }
    );
    return res.data;
  } catch (err) {
    console.error("Error closing ticket by agent:", err);
    throw err;
  }
};



const deleteTicket = async (ticketId) => {
  try {
    const res = await axios.delete(`${API_URL}/${ticketId}`, {
      headers: authHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error(`Error deleting ticket ${ticketId}:`, error);
    throw error;
  }
};

export default {
  getTickets,
  getMyTickets,
  createTicket,
  updateTicket,
  closeTicket,
  agentCloseTicket,
  deleteTicket,
};
