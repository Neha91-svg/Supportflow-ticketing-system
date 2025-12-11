const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getTicketDetails } = require("../controllers/userTicketController");

// GET Ticket details for user
router.get("/:id", auth, getTicketDetails);


module.exports = router;
