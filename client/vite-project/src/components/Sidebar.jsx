import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ links }) {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-200 text-gray-900 min-h-screen p-5 shadow-md rounded-r-2xl">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-purple-600">
        SupportFlow
      </h2>

      <nav className="flex flex-col gap-2">
        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2
              ${location.pathname === item.path
                ? "bg-purple-100 text-purple-800 shadow-md"
                : "hover:bg-purple-50 hover:text-purple-700"
              }`}
          >
            {item.icon && <span className="text-lg">{item.icon}</span>}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
