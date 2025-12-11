import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AgentLayout from "./AgentLayout";

const AgentDashboard = lazy(() => import("./AgentDashboard"));
const AssignedTickets = lazy(() => import("./AssignedTickets"));
const TicketDetails = lazy(() => import("./TicketDetails"));
const AgentProfile = lazy(() => import("./AgentProfile"));

const agentRoutes = {
  path: "/agent",
  element: <AgentLayout />,
  children: [
    { index: true, element: <Navigate to="/agent/dashboard" /> },
    { path: "dashboard", element: <AgentDashboard /> },
    { path: "assigned-tickets", element: <AssignedTickets /> },
    { path: "tickets/:id", element: <TicketDetails /> },
    { path: "profile", element: <AgentProfile /> },
  ],
};

export default agentRoutes;
