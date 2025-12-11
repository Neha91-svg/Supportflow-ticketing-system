import { useState, useContext } from "react";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      loginUser(res.data.user);

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "agent") navigate("/agent/dashboard");
      else navigate("/user");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 
      p-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg 
        shadow-xl rounded-2xl p-8 border border-white/30">

        <h2 className="text-3xl font-extrabold text-center 
          bg-gradient-to-r from-white to-gray-200 
          text-transparent bg-clip-text mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl bg-white/30 backdrop-blur-lg 
            border border-white/40 focus:ring-2 focus:ring-purple-500
            text-black placeholder-black/50"
            onChange={handleChange}
            value={form.email}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-white/30 backdrop-blur-lg 
            border border-white/40 focus:ring-2 focus:ring-purple-500
            text-black placeholder-black/50"
            onChange={handleChange}
            value={form.password}
            required
          />

          <button
            type="submit"
            className="w-full p-4 rounded-xl bg-gradient-to-r 
            from-purple-600 to-pink-500 text-white font-bold 
            shadow-lg hover:scale-[1.03] transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
 
          <p className="text-center text-black mt-2">
            Don’t have an account?
            <Link to="/register" className="font-semibold underline ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
