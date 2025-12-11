const User = require("../models/User");
const Ticket = require("../models/Ticket");
const bcrypt = require("bcryptjs");


exports.getAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalAgents = await User.countDocuments({ role: "agent" });
        const totalTickets = await Ticket.countDocuments();
        const openTickets = await Ticket.countDocuments({ status: "open" });
        const closedTickets = await Ticket.countDocuments({ status: "closed" });
        const highPriority = await Ticket.countDocuments({ priority: "high" });

        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
        const recentTickets = await Ticket.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            data: { totalUsers, totalAgents, totalTickets, openTickets, closedTickets, highPriority },
            recentUsers,
            recentTickets,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");
        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateTicketStatus = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.assignTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { assignedTo: req.body.agentId },
            { new: true }
        ).populate("assignedTo", "name email");

        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateTicketPriority = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { priority: req.body.priority }, { new: true });
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ message: "Ticket deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllAgents = async (req, res) => {
    try {
        const agents = await User.find({ role: "agent" }).select("-password");
        res.json(agents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Single agent + assigned tickets
exports.getAgentById = async (req, res) => {
    try {
        const agentId = req.params.id;

        // Find agent
        const agent = await User.findById(agentId).select("-password");

        if (!agent || agent.role !== "agent") {
            return res.status(404).json({ message: "Agent not found" });
        }

        // Find tickets assigned to this agent
        const tickets = await Ticket.find({ assignedTo: agent._id })
            .select("title description status priority createdAt updatedAt")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            agent,
            tickets,
        });
    } catch (err) {
        console.error("Get Agent Error:", err);
        res.status(500).json({ message: "Server error while fetching agent" });
    }
};


exports.getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const createdTickets = await Ticket.countDocuments({ createdBy: user._id });
    const assignedTickets = await Ticket.countDocuments({ assignedTo: user._id });

    res.json({ user, createdTickets, assignedTickets });
};

exports.updateUserRole = async (req, res) => {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json({ message: "Role updated", user });
};

exports.toggleUserStatus = async (req, res) => {
    const user = await User.findById(req.params.id);
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: "User status updated", isActive: user.isActive });
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
};

exports.resetUserPassword = async (req, res) => {
    const tempPass = "Temp@" + Math.floor(Math.random() * 10000);
    const hashed = await bcrypt.hash(tempPass, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashed });
    res.json({ message: "Password reset", tempPassword: tempPass });
};
// PROFILE UPDATE
exports.updateAdminProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true }
        );

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// CHANGE PASSWORD
exports.changeAdminPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch)
            return res
                .status(400)
                .json({ success: false, message: "Current password is wrong" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ success: true, message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE SYSTEM SETTINGS
exports.updateSystemSettings = async (req, res) => {
    try {
        const {
            ticketPriorityDefault,
            defaultRole,
            autoAssignTickets,
            maintenanceMode,
            emailNotifications,
            pushNotifications,
        } = req.body;

        // Dummy DB save (You should store these in a settings collection)
        // For now just send response
        res.json({
            success: true,
            message: "System settings updated successfully",
            settings: {
                ticketPriorityDefault,
                defaultRole,
                autoAssignTickets,
                maintenanceMode,
                emailNotifications,
                pushNotifications,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

