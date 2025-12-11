const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>

      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Department:</strong> {ticket.department?.name || "N/A"}</p>

      <p>
        <strong>Assigned To:</strong> 
        {ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}
      </p>

      <small>Created: {new Date(ticket.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default TicketCard;
