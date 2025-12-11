import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import api from "../../../utils/api";
import Loader from "../../../components/Loader";

export default function AdminSettings() {
  const { theme, toggleTheme } = useTheme();

  // Profile state
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);

  // System Settings
  const [ticketPriorityDefault, setTicketPriorityDefault] = useState("medium");
  const [defaultRole, setDefaultRole] = useState("user");
  const [autoAssignTickets, setAutoAssignTickets] = useState(true);
  const [loadingSystem, setLoadingSystem] = useState(false);

  // Save Profile
  const saveProfile = async () => {
    setLoadingProfile(true);
    try {
      await api.put("/admin/profile", { name: adminName, email: adminEmail });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  // Change Password
  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    setLoadingPassword(true);
    try {
      await api.put("/admin/change-password", { currentPassword, newPassword });
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to change password");
    } finally {
      setLoadingPassword(false);
    }
  };

  // Update System Settings
  const updateSystemSettings = async () => {
    setLoadingSystem(true);
    try {
      await api.put("/admin/system-settings", {
        ticketPriorityDefault,
        defaultRole,
        autoAssignTickets,
      });
      alert("System settings updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update system settings");
    } finally {
      setLoadingSystem(false);
    }
  };

  return (
    <div className={`p-6 min-h-screen space-y-10 transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text">
        Admin Settings ⚙️
      </h1>

      {/* Profile Settings */}
      <div className={`p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={saveProfile}
            disabled={loadingProfile}
          >
            {loadingProfile ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {/* Password Settings */}
      <div className={`p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border p-2 rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            onClick={changePassword}
            disabled={loadingPassword}
          >
            {loadingPassword ? "Updating..." : "Change Password"}
          </button>
        </div>
      </div>

      {/* System / Ticket Settings */}
      <div className={`p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-bold mb-4">System Settings</h2>
        <div className="space-y-3">

          <label className="block font-semibold">Default Ticket Priority</label>
          <select
            className="border p-2 rounded w-full"
            value={ticketPriorityDefault}
            onChange={(e) => setTicketPriorityDefault(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label className="block font-semibold">Default Role for New Users</label>
          <select
            className="border p-2 rounded w-full"
            value={defaultRole}
            onChange={(e) => setDefaultRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>

          <label className="block font-semibold">Auto-Assign Tickets</label>
          <input
            type="checkbox"
            checked={autoAssignTickets}
            onChange={() => setAutoAssignTickets(!autoAssignTickets)}
            className="mr-2"
          /> Enable

          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition mt-4"
            onClick={updateSystemSettings}
            disabled={loadingSystem}
          >
            {loadingSystem ? "Saving..." : "Save System Settings"}
          </button>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className={`p-6 rounded-2xl shadow-md transition ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          onClick={toggleTheme}
        >
          Toggle {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
}
