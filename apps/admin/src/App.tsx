import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import { Login, Dashboard } from "./pages/index";
import MeetingsPage from "./pages/meetings/MeetingScreen";
import BookingsScreen from "./pages/booking/BookingsScreen";
import Settings from "./pages/settings";
import AdminAttendance from "./pages/attendance/AdminAttendance";
import LeadManagementScreen from "./pages/leads/LeadManagementScreen";
import Doctors from "./pages/doctor/Doctors";
import AddingUser from "./pages/user/AddingUser";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <AddingUser />,
      },
      {
        path: "bookings",
        element: <BookingsScreen />,
      },
      {
        path: "meetings",
        element: <MeetingsPage />,
      },
      {
        path: "attendance",
        element: <AdminAttendance />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "leads",
        element: <LeadManagementScreen />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;