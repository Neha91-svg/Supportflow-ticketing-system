const Ticket = require("../models/Ticket");
const User = require("../models/User");

// GET /api/user-tickets/:id
const getTicketDetails = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email"); // department is string, no populate

        if (!ticket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        // Make sure the user owns this ticket
        if (ticket.createdBy._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        res.status(200).json({ success: true, ticket });
    } catch (error) {
        console.error("User Ticket Details Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    getTicketDetails,
};
