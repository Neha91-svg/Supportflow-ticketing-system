import { useState } from "react";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    department: "IT",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 p-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg 
        shadow-xl rounded-2xl p-8 border border-white/30">

        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Create Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl bg-white/30 backdrop-blur-lg 
            border border-white/40 focus:ring-2 focus:ring-blue-500
            text-black placeholder-black/50"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl bg-white/30 backdrop-blur-lg 
            border border-white/40 focus:ring-2 focus:ring-blue-500
            text-black placeholder-black/50"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-white/30 backdrop-blur-lg 
            border border-white/40 focus:ring-2 focus:ring-blue-500
            text-black placeholder-black/50"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full p-4 rounded-xl bg-white/30 backdrop-blur-lg 
            border border-black/40 text-black"
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>

          <select
            name="department"
            className="w-full p-4 rounded-xl bg-white/30 backdrop-blur-lg 
            border border-black/40 text-black"
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Support">Support</option>
          </select>

          <button
            type="submit"
            className="w-full p-4 rounded-xl bg-gradient-to-r 
            from-indigo-500 to-blue-500 text-black font-bold 
            hover:scale-[1.03] shadow-xl transition"
          >
            Register
          </button>

          <p className="text-center text-black">
            Already have an account?
            <Link to="/login" className="font-semibold underline ml-1">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;
