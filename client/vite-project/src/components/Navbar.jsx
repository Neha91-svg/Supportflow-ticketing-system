import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ user }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`flex justify-between items-center px-6 py-4 shadow 
      ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <h1 className="font-bold text-xl">SupportFlow</h1>

      <div className="flex items-center gap-4">
        {/* User Name */}
        <span className="font-medium">{user?.name}</span>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border hover:scale-110 transition"
        >
          {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
      </div>
    </div>
  );
}
