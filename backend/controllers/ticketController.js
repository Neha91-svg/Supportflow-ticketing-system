const Ticket = require('../models/Ticket');
const User = require("../models/User");

const createTicket = async (req, res) => {
  try {
    const { title, description, priority, department } = req.body;

    // Validate required fields
    if (!title || !description || !priority || !department) {
      return res.status(400).json({
        success: false,
        message: "Title, description, priority and department are required",
      });
    }

    // Find an agent in this department
    const agent = await User.findOne({ role: "agent", department });
    if (!agent) {
      return res.status(400).json({
        success: false,
        message: `No agent found in ${department} department`,
      });
    }

    const ticket = new Ticket({
      title,
      description,
      priority,
      department,
      createdBy: req.user._id, 
      assignedTo: agent._id,   
      status: "open",
    });

    await ticket.save();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ success: false, message: "Failed to create ticket" });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('department', 'name');

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('department', 'name');

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a ticket
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('department', 'name');

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMyTickets = async (req, res) => {
  try {
    // Make sure req.user exists
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const tickets = await Ticket.find({ createdBy: req.user._id })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("department", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error("Error in getMyTickets:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const getDashboardSummary = async (req, res) => {
  try {
    console.log("User from authMiddleware:", req.user); // <- check user
    const userId = req.user._id;

    const total = await Ticket.countDocuments({ createdBy: userId });
    const open = await Ticket.countDocuments({ createdBy: userId, status: "open" });
    const closed = await Ticket.countDocuments({ createdBy: userId, status: "closed" });
    const highPriority = await Ticket.countDocuments({ createdBy: userId, priority: "high" });

    console.log({ total, open, closed, highPriority }); // <- check counts
    res.status(200).json({ total, open, closed, highPriority });
  } catch (error) {
    console.error("Dashboard summary error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};



const closeTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = "closed";
    ticket.closedAt = new Date();
    await ticket.save();

    res.json({
      success: true,
      message: "Ticket closed successfully",
      ticket,
    });
  } catch (error) {
    console.error("Close Ticket Error:", error);
    res.status(500).json({ message: "Failed to close ticket" });
  }
};



module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getMyTickets,
  closeTicket,
  getDashboardSummary,
};
