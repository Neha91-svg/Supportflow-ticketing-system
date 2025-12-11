import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    loadUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Users</h2>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Search user..."
          className="border p-2 rounded w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {users
            .filter((u) =>
              (u?.name || "").toLowerCase().includes(search.toLowerCase())
            )
            .filter((u) => (filterRole ? u.role === filterRole : true))
            .map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>

                <td className="p-3 flex gap-4">
                  <Link to={`/admin/users/${u._id}`} className="text-blue-500">
                    View
                  </Link>

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
