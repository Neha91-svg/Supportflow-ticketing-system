const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const auth = require("../middleware/authMiddleware");

// Public routes (authenticated users)
router.get("/", auth, getComments);
router.get("/:id", auth, getComment);

// Admin or user can create
router.post("/", auth, createComment);

// Update & delete
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

module.exports = router;
