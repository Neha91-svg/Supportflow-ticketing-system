const express = require("express");
const router = express.Router();

// controllers
const {
  createDepartment,
  getDepartments,
  deleteDepartment,
  updateDepartment,
} = require("../controllers/departmentController");

// middleware
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// admin only routes
router.post("/", auth, admin, createDepartment);
router.get("/", auth, getDepartments);
router.delete("/:id", auth, admin, deleteDepartment);
router.put("/:id", auth, admin, updateDepartment);

module.exports = router;
