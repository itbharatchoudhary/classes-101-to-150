import {createBrowserRouter} from "react-router"
import Login from "../Features/Auth/pages/Login"
import Register from "../Features/Auth/pages/Register"
import Protected from "../Features/Auth/Components/Protected"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><h1>Home Page</h1></Protected>
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

