import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Briefcase, Building2, Ticket } from "lucide-react";

export default function AgentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await axios.get("/api/agents/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfile(res.data.profile);
    } catch (error) {
      console.error("Profile load error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 space-y-6">
      {/* Title */}
      <h2
        className="text-3xl font-extrabold bg-gradient-to-r 
        from-purple-500 via-pink-500 to-orange-400 
        text-transparent bg-clip-text"
      >
        Agent Profile 👤
      </h2>

      {/* Profile Card */}
      <div
        className="rounded-xl p-6 shadow-md border 
        bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200
        border-purple-300"
      >
        {/* Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-300/40">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center 
            bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-md"
          >
            <User className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-gray-700 font-medium flex items-center gap-1">
              <Mail size={16} className="text-gray-700" /> {profile.email}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Role */}
          <div
            className="rounded-lg p-3 shadow bg-white/70 border border-purple-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="text-purple-700" />
              <h4 className="font-semibold text-gray-900 text-sm">Role</h4>
            </div>
            <p className="text-gray-800 text-sm">{profile.role}</p>
          </div>

          {/* Department */}
          <div
            className="rounded-lg p-3 shadow bg-white/70 border border-pink-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="text-pink-600" />
              <h4 className="font-semibold text-gray-900 text-sm">Department</h4>
            </div>
            <p className="text-gray-800 text-sm">
              {profile.department || "Not Assigned"}
            </p>
          </div>

          {/* Assigned Tickets (smaller) */}
          <div
            className="md:col-span-2 rounded-lg p-3 bg-white/80 border 
            border-orange-300 shadow flex items-center gap-2"
          >
            <Ticket className="text-orange-600" />
            <span className="text-gray-800 font-medium text-sm">
              Assigned Tickets: {profile.assignedTicketsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
