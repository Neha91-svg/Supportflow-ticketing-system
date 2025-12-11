const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Ticket title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Ticket description is required"],
    trim: true,
  },
  department: {
    type: String,
    enum: ["IT", "HR", "Finance", "Support"],
    required: [true, "Department is required"],
    default: "IT", // Optional: default department if not provided
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  attachments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: ensure virtuals and JSON formatting
ticketSchema.set("toJSON", { virtuals: true });
ticketSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Ticket", ticketSchema);
