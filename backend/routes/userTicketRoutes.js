// routes/userTicketRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getTicketDetails } = require("../controllers/userTicketController");

// User-specific ticket details
router.get("/:ticketId", auth, getTicketDetails);

module.exports = router;
