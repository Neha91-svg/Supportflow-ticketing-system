import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { User, Mail, Briefcase, Building2 } from "lucide-react";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all">
        
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          My Profile
        </h2>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-lg">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
            <p className="text-gray-700 flex items-center gap-1">
              <Mail size={16} /> {user?.email}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Role */}
          <div className="flex items-center gap-2 p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 transition">
            <Briefcase className="text-purple-700" />
            <span className="text-gray-800 font-medium">{user?.role}</span>
          </div>

          {/* Department */}
          <div className="flex items-center gap-2 p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 transition">
            <Building2 className="text-pink-600" />
            <span className="text-gray-800 font-medium">
              {user?.department || "Not Assigned"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
