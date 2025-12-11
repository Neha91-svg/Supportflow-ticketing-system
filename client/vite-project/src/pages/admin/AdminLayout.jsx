// src/pages/admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function AdminLayout() {
  const adminLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Tickets", path: "/admin/tickets" },
    { label: "Users", path: "/admin/users" },
    { label: "Agents", path: "/admin/agents" },
    { label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar links={adminLinks} />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
