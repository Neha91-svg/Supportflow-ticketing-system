import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import { useEffect, useState } from "react";

export default function TicketDetail() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await api.get(`/tickets/${id}`);
                setTicket(res.data.ticket);
            } catch (err) {
                console.error("❌ Ticket fetch error:", err);
            }
        };

        fetchTicket();
    }, [id]);

    if (!ticket) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 bg-white shadow rounded-xl space-y-4">
            <h1 className="text-2xl font-bold">{ticket.title}</h1>
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
            <p>
                <strong>Department:</strong> {ticket.department?.name || ticket.department}
            </p>
        </div>
    );
}
