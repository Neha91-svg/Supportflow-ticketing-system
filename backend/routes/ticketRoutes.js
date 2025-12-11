const express = require("express");
const router = express.Router();

const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getMyTickets,
  getDashboardSummary,
  closeTicket,
} = require("../controllers/ticketController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Create
router.post("/", auth, createTicket);

// MUST be before :id
router.get("/mytickets", auth, getMyTickets);
router.get("/dashboard/summary", auth, getDashboardSummary);

// List all
router.get("/", auth, getTickets);

// Special routes MUST be before :id
router.put("/:id/close", auth, closeTicket);

// ❗ KEEP THESE LAST
router.get("/:id", auth, getTicketById);
router.put("/:id", auth, updateTicket);
router.delete("/:id", auth, deleteTicket);

module.exports = router;
