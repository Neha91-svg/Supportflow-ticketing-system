const express = require("express");
const router = express.Router();

// Controllers
const {
  createStatus,
  getStatuses,
  deleteStatus,
  updateStatus,
} = require("../controllers/statusController");

// Middleware
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Routes
router.post("/", auth, admin, createStatus);
router.get("/", auth, getStatuses);
router.delete("/:id", auth, admin, deleteStatus);
router.put("/:id", auth, admin, updateStatus);

module.exports = router;
