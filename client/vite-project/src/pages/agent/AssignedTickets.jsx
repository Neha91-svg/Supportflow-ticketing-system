import { useEffect, useState } from "react";
import axios from "axios";
import AgentTicketCard from "../../components/AgentTicketCard";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

export default function AssignedTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch assigned tickets
  useEffect(() => {
    axios
      .get("/api/agents/tickets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTickets(res.data.tickets || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching tickets:", err);
        setLoading(false);
      });
  }, []);

  // Close Ticket Handler
  const handleClose = async (ticketId) => {
    try {
      await axios.put(
        `/api/tickets/${ticketId}/close`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTickets((prev) =>
        prev.map((t) =>
          t._id === ticketId ? { ...t, status: "closed" } : t
        )
      );
    } catch (err) {
      console.log("❌ Error closing ticket:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-10 p-6">

      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r 
        from-purple-500 via-pink-500 to-orange-400 
        text-transparent bg-clip-text">
        Your Assigned Tickets 🎫
      </h1>

      {/* Ticket Count */}
      <div className="text-lg text-gray-700">
        Showing <span className="font-bold">{tickets.length}</span> tickets
      </div>

      {/* If no tickets */}
      {tickets.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg">
          No assigned tickets yet ✨
        </div>
      ) : (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-6 rounded-2xl bg-gradient-to-br 
                from-purple-200 via-pink-200 to-orange-200 
                shadow-md hover:shadow-xl cursor-pointer 
                hover:scale-[1.03] transition duration-300"
              onClick={() => navigate(`/agent/tickets/${ticket._id}`)}
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900">
                {ticket.title}
              </h2>

              {/* Status Badge */}
              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${ticket.status === "open"
                    ? "bg-red-200 text-red-700"
                    : ticket.status === "in-progress"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-green-200 text-green-700"
                    }`}
                >
                  {ticket.status.toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                {ticket.description}
              </p>

              {/* Priority */}
              <p className="mt-2 text-sm font-medium text-gray-800">
                Priority:{" "}
                <span
                  className={`${ticket.priority === "High"
                    ? "text-red-600"
                    : ticket.priority === "Medium"
                      ? "text-yellow-600"
                      : "text-blue-600"
                    }`}
                >
                  {ticket.priority}
                </span>
              </p>

              {/* Close Button */}
              {ticket.status !== "closed" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose(ticket._id);
                  }}
                  className="mt-4 w-full bg-gradient-to-r 
                    from-purple-500 via-pink-500 to-orange-400 
                    text-white py-2 rounded-xl font-semibold 
                    hover:shadow-lg hover:scale-[1.02] transition"
                >
                  Close Ticket
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
