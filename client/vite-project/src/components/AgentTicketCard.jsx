export default function AgentTicketCard({ ticket, onClose, onClick }) {
    return (
        <div
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">{ticket.title}</h2>

                {/* STATUS BADGE */}
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${ticket.status === "open"
                            ? "bg-green-100 text-green-700"
                            : ticket.status === "in-progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {ticket.status}
                </span>
            </div>

            <p className="text-gray-600 mt-2">{ticket.description}</p>

            <div className="flex justify-between items-center mt-4">
                {/* PRIORITY */}
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${ticket.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : ticket.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-blue-100 text-blue-600"
                        }`}
                >
                    {ticket.priority} Priority
                </span>

                {/* CLOSE BUTTON (only if not closed) */}
                {ticket.status !== "closed" && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose(ticket._id);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
}
