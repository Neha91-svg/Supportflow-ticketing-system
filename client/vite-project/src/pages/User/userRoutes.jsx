import { lazy } from "react";
import UserLayout from "./UserLayout";
import UserDashboard from "./UserDashboard";
const CreateTicket = lazy(() => import("./CreateTicket/CreateTicket"));
const MyTickets = lazy(() => import("./MyTickets/MyTickets"));
const Profile = lazy(() => import("./Profile/Profile"));
const TicketDetail = lazy(() => import("./MyTickets/TicketDetail"));

const userRoutes = {
  path: "/user",
  element: <UserLayout />,
  children: [
    { index: true, element: <UserDashboard /> }, // ✅ Dashboard
    { path: "create-ticket", element: <CreateTicket /> },
    { path: "my-tickets", element: <MyTickets /> },
    { path: "profile", element: <Profile /> },
    { path: "my-tickets/:id", element: <TicketDetail /> },
  ],
};

export default userRoutes;
