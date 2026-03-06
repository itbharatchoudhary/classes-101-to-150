import {createBrowserRouter} from "react-router"
import Login from "../Features/Auth/pages/Login"
import Register from "../Features/Auth/pages/Register"
import Protected from "../Features/Auth/Components/Protected"
import Home from "../Features/Home/pages/Home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])

