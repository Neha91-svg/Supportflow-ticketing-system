import { useState } from "react";
import ticketService from "../../../services/ticketService";

export default function CreateTicket() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    department: "IT",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ticketService.createTicket(form);
      alert("Ticket Created Successfully");
      console.log("Ticket created:", res.ticket);
      setForm({ title: "", description: "", priority: "low", department: "IT" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create ticket");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all">
        <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          Create New Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter Ticket Title"
            className="w-full border border-gray-300 dark:border-gray-600 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your issue"
            rows="5"
            className="w-full border border-gray-300 dark:border-gray-600 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          {/* Priority & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Support">Support</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold rounded-2xl shadow-lg hover:scale-[1.02] hover:shadow-2xl transition transform"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
