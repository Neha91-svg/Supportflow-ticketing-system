import { lazy } from "react";
import AdminLayout from "./AdminLayout";

// Lazy load all admin pages
const AdminDashboard = lazy(() => import("../admin/Dashboard/AdminDashboard"));
const AdminSettings = lazy(() => import("../admin/Settings/AdminSettings"));
const AllTickets = lazy(() => import("../admin/Tickets/AllTickets"));
const TicketDetails = lazy(() => import("../admin/Tickets/TicketDetails"));
const UserList = lazy(() => import("../admin/Users/UserList"));
const UserDetails = lazy(() => import("../admin/Users/UserDetails"));
const AgentList = lazy(() => import("../admin/Agents/AgentsList"));
const AgentDetail = lazy(() => import("../admin/Agents/AgentDetail")); // ✅ component name fixed

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminDashboard /> },       // /admin
    { path: "dashboard", element: <AdminDashboard /> }, // /admin/dashboard

    // Tickets
    { path: "tickets", element: <AllTickets /> },       // /admin/tickets
    { path: "tickets/:id", element: <TicketDetails /> }, // /admin/tickets/:id

    // Users
    { path: "users", element: <UserList /> },          // /admin/users
    { path: "users/:id", element: <UserDetails /> },   // /admin/users/:id

    // Agents
    { path: "agents", element: <AgentList /> },        // /admin/agents
    { path: "agents/:id", element: <AgentDetail /> },  // /admin/agents/:id ✅

    // Settings
    { path: "settings", element: <AdminSettings /> }, // /admin/settings
  ],
};

export default adminRoutes;
