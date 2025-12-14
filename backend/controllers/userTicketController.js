const Ticket = require("../models/Ticket");

exports.getTicketDetails = async (req, res, next) => {
    const ticket = await Ticket.findOne({
        _id: req.params.ticketId,
        user: req.user.id   
    });

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
};
