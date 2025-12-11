import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext"; // 🌙 DARK MODE HOOK

export default function AgentLayout() {
  const { user } = useAuth();
  const { theme } = useTheme(); // 🌙 get current theme value

  const links = [
    { label: "Dashboard", path: "/agent/dashboard" },
    { label: "Assigned Tickets", path: "/agent/assigned-tickets" },
    { label: "Profile", path: "/agent/profile" },
  ];

  return (
    <div
      className={`flex transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
    >
      <Sidebar links={links} />

      <div className="flex-1">
        <Navbar user={user} />

        <div
          className={`p-6 min-h-screen transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
            }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
