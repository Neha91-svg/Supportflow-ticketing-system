const express = require("express");
const router = express.Router();

const {
    getAgentStats,
    getAssignedTickets,
    updateTicketStatus,
    getTicketById,
    getAgentProfile,
    closeTicket,
    getAgentDashboardData
} = require("../controllers/agentController");

const auth = require("../middleware/authMiddleware");


router.get("/stats", auth, getAgentStats);
router.get("/tickets", auth, getAssignedTickets);
router.put("/tickets/:id/status", auth, updateTicketStatus);
router.put("/tickets/:id/close", auth, closeTicket);
router.get("/dashboard", auth, getAgentDashboardData);
router.get("/profile", auth, getAgentProfile);
router.get("/:id", auth, getTicketById);

module.exports = router;
