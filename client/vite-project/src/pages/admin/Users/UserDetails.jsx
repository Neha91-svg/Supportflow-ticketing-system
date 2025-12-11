import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";

export default function UserDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    const res = await api.get(`/admin/users/${id}`);
    setData(res.data);
  };

  const changeRole = async (role) => {
    await api.put(`/admin/users/${id}/role`, { role });
    load();
  };

  const resetPassword = async () => {
    const res = await api.put(`/admin/users/${id}/reset-password`);
    alert("New Temp Password: " + res.data.tempPassword);
  };

  if (!data) return <p>Loading...</p>;

  const user = data.user;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">User Details</h2>

      <div className="bg-white p-5 shadow rounded space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <p><strong>Tickets Created:</strong> {data.createdTickets}</p>
        <p><strong>Assigned Tickets:</strong> {data.assignedTickets}</p>

        <hr />

        <h3 className="font-bold text-lg">Actions</h3>

        <div className="flex gap-3">
          <button
            onClick={() => changeRole("agent")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Make Agent
          </button>

          <button
            onClick={() => changeRole("admin")}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Make Admin
          </button>

          <button
            onClick={resetPassword}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
