const express = require("express");
const router = express.Router();
const {
  createPriority,
  getPriorities,
  deletePriority,
  updatePriority,
} = require("../controllers/priorityController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", auth, admin, createPriority);
router.get("/", auth, getPriorities);
router.delete("/:id", auth, admin, deletePriority);
router.put("/:id", auth, admin, updatePriority);

module.exports = router;
