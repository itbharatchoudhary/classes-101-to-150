import { createBrowserRouter } from "react-router";
import Login from "../Features/Auth/Pages/Login";
import Register from "../Features/Auth/Pages/Register";
import Dashboard from "../Features/Chat/Pages/DashBoard";
import Protected from "../Features/Auth/Components/Protected";
import { Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />,
  },
]);
