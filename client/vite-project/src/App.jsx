import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loader from "./components/Loader";

import userRoutes from "./pages/User/userRoutes";
import adminRoutes from "./pages/admin/adminRoutes";
import agentRoutes from "./pages/agent/agentRoutes";
import Login from "./pages/Auth/LoginPage";
import Register from "./pages/Auth/RegisterPage";





function ProtectedRoutes({ children, allowedRoles }) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return <Login />;

  const user = JSON.parse(storedUser);

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
    <Suspense fallback={<Loader />}>
      <AppRouter />
    </Suspense>
  );
}
