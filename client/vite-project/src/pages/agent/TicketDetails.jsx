import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`/api/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTicket(res.data.ticket || res.data);
      } catch (err) {
        console.error("❌ Ticket fetch error:", err);
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticket) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-4 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold">{ticket.title}</h2>

      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>

      <p>
        <strong>Assigned To:</strong>{" "}
        {ticket.assignedTo?.name || "Not Assigned"}
      </p>

      <p>
        <strong>Created At:</strong>{" "}
        {new Date(ticket.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default TicketDetails;
