// src/pages/user/UserLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function UserLayout() {
  const { user } = useContext(AuthContext);

  const userLinks = [
    { label: "Dashboard", path: "/user" }, // ✅ Add dashboard link
    { label: "Create Ticket", path: "/user/create-ticket" },
    { label: "My Tickets", path: "/user/my-tickets" },
    { label: "Profile", path: "/user/profile" },
  ];

  return (
    <div className="flex">
      <Sidebar links={userLinks} />
      <div className="flex-1">
        <Navbar user={user} />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
