const Ticket = require("../models/Ticket");
const User = require("../models/User");


const getAgentProfile = async (req, res) => {
    try {
        const agentId = req.user._id;

        const agent = await User.findById(agentId).select("-password");

        if (!agent)
            return res.status(404).json({ message: "Agent not found" });

        const assignedTicketsCount = await Ticket.countDocuments({
            assignedTo: agentId,
        });

        res.json({
            success: true,
            profile: {
                name: agent.name,
                email: agent.email,
                role: agent.role,
                department: agent.department,  // string
                assignedTicketsCount,
            },
        });
    } catch (error) {
        console.error("Agent Profile Error:", error);
        res.status(500).json({ message: "Failed to load agent profile" });
    }
};


const getAssignedTickets = async (req, res) => {
    try {
        const agentId = req.user._id;

        const tickets = await Ticket.find({ assignedTo: agentId })
            .populate("createdBy", "name email"); //  removed department populate

        res.json({
            success: true,
            tickets,
        });
    } catch (error) {
        console.error("Assigned Tickets Error:", error);
        res.status(500).json({ message: "Failed to fetch assigned tickets" });
    }
};


const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const ticket = await Ticket.findById(id);

        if (!ticket)
            return res.status(404).json({ message: "Ticket not found" });

        ticket.status = status;
        await ticket.save();

        res.json({
            success: true,
            message: "Ticket status updated",
            ticket,
        });
    } catch (error) {
        console.error("Update Ticket Status Error:", error);
        res.status(500).json({ message: "Failed to update ticket" });
    }
};


const closeTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);

        if (!ticket)
            return res.status(404).json({ message: "Ticket not found" });

        ticket.status = "closed";
        await ticket.save();

        res.json({
            success: true,
            message: "Ticket closed successfully",
        });
    } catch (error) {
        console.error("Close Ticket Error:", error);
        res.status(500).json({ message: "Failed to close ticket" });
    }
};



const getAgentStats = async (req, res) => {
    try {
        const agentId = req.user._id;

        // Total tickets assigned to this agent
        const totalAssigned = await Ticket.countDocuments({ assignedTo: agentId });

        // Tickets by status
        const openTickets = await Ticket.countDocuments({ assignedTo: agentId, status: "open" });
        const inProgressTickets = await Ticket.countDocuments({ assignedTo: agentId, status: "in-progress" });
        const closedTickets = await Ticket.countDocuments({ assignedTo: agentId, status: "closed" });

        res.json({
            success: true,
            stats: {
                totalAssigned,
                openTickets,
                inProgressTickets,
                closedTickets,
            },
        });
    } catch (error) {
        console.error("Get Agent Stats Error:", error);
        res.status(500).json({ message: "Failed to fetch agent stats" });
    }
};

const getAgentDashboardData = async (req, res) => {
    try {
        const agentId = req.user._id;

        const assigned = await Ticket.countDocuments({ assignedTo: agentId });
        const open = await Ticket.countDocuments({ assignedTo: agentId, status: "open" });
        const inProgress = await Ticket.countDocuments({ assignedTo: agentId, status: "in-progress" });
        const closed = await Ticket.countDocuments({ assignedTo: agentId, status: "closed" });

        //  Recent 5 tickets (CREATED DATE)
        const recent = await Ticket.find({ assignedTo: agentId })
            .sort({ createdAt: -1 })
            .limit(5);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayTickets = await Ticket.find({
            assignedTo: agentId,
            createdAt: { $gte: today },
        }).sort({ createdAt: -1 });

        const highPriorityTickets = await Ticket.find({
            assignedTo: agentId,
            priority: "High",
        }).sort({ updatedAt: -1 });

        res.json({
            success: true,
            data: { assigned, open, inProgress, closed },
            todayTickets,
            highPriorityTickets,
            recent, //  frontend compatible
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Failed to load dashboard" });
    }

};


const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate("assignedTo");

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAgentStats,
    getAgentProfile,
    getAssignedTickets,
    updateTicketStatus,
    closeTicket,
    getAgentDashboardData,
    getTicketById,
};