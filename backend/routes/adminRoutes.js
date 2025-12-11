const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const  adminOnly = require("../middleware/adminMiddleware");

const {
    getAdminDashboard,
    getAllTickets,
    getTicketById,
    updateTicketStatus,
    assignTicket,
    updateTicketPriority,
    deleteTicket,
    getAllAgents,
    getAgentById,
    getAllUsers,
    getUserById,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    resetUserPassword,
    updateAdminProfile,
    changeAdminPassword,
    updateSystemSettings
} = require("../controllers/adminController");

// ------------------------
// Dashboard
// ------------------------
router.get("/dashboard", auth, getAdminDashboard);

// ------------------------
// Tickets
// ------------------------
router.get("/tickets", auth, getAllTickets);
router.get("/tickets/:id", auth, getTicketById);
router.put("/tickets/:id/status", auth, updateTicketStatus);
router.put("/tickets/:id/assign", auth, assignTicket);
router.put("/tickets/:id/priority", auth, updateTicketPriority);
router.delete("/tickets/:id", auth, deleteTicket);

// ------------------------
// Agents
// ------------------------
router.get("/agents", auth, getAllAgents);
router.get("/agents/:id", auth, getAgentById);
// single agent + tickets

// ------------------------
// Users
// ------------------------
router.get("/users", auth, getAllUsers);
router.get("/users/:id", auth, getUserById);
router.put("/users/:id/role", auth, updateUserRole);
router.put("/users/:id/status", auth, toggleUserStatus);
router.delete("/users/:id", auth, deleteUser);
router.put("/users/:id/reset-password", auth, resetUserPassword);
// Update Profile
router.put("/profile", auth, adminOnly, updateAdminProfile);

// Change Password
router.put("/change-password", auth, adminOnly, changeAdminPassword);

// System Settings Update
router.put("/system-settings", auth, adminOnly, updateSystemSettings);


module.exports = router;
