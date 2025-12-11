import { useEffect, useState } from "react";
import ticketService from "../../../services/ticketService";
import { useNavigate } from "react-router-dom";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ticketService.getMyTickets();
      setTickets(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets. Please try again.");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await ticketService.deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete ticket");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Tickets</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && tickets.length === 0 && <p>No tickets found.</p>}

      {!loading && tickets.length > 0 && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Priority</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t._id}>
                <td className="p-2 border">{t.title}</td>
                <td className="p-2 border capitalize">{t.status}</td>
                <td className="p-2 border capitalize">{t.priority}</td>

                <td className="p-2 border flex gap-2">
                  {/* VIEW BUTTON */}
                  <button
                    onClick={() => navigate(`/user/my-tickets/${t._id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
