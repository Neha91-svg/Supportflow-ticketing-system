import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider
import userRoutes from "./pages/User/userRoutes";
import adminRoutes from "./pages/admin/adminRoutes";
import agentRoutes from "./pages/agent/agentRoutes";
import Login from "./pages/Auth/LoginPage";
import Register from "./pages/Auth/RegisterPage";
import { useAuth } from "./hooks/useAuth";

function ProtectedRoutes({ children, allowedRoles }) {
  const { user } = useAuth(); // ✅ hook safe now

  if (!user) return <Login />;
  if (!allowedRoles.includes(user.role)) return <h1>Unauthorized</h1>;

  return children;
}

function AppRouter() {
  return useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    {
      path: "/user/*",
      element: (
        <ProtectedRoutes allowedRoles={["user"]}>
          {userRoutes.element}
        </ProtectedRoutes>
      ),
      children: userRoutes.children,
    },

    {
      path: "/admin/*",
      element: (
        <ProtectedRoutes allowedRoles={["admin"]}>
          {adminRoutes.element}
        </ProtectedRoutes>
      ),
      children: adminRoutes.children,
    },

    {
      path: "/agent/*",
      element: (
        <ProtectedRoutes allowedRoles={["agent"]}>
          {agentRoutes.element}
        </ProtectedRoutes>
      ),
      children: agentRoutes.children,
    },

    { path: "*", element: <Login /> },
  ]);
}

export default function App() {
  return (
    <AuthProvider> {/* ✅ Wrap the whole app */}
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
    </AuthProvider>
  );
}
