import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { useAuth } from "../Features/Auth/Hooks/UseAuth"
import { useEffect } from "react"


function App() {

  const auth = useAuth()

  useEffect(() => {
    auth.handleGetMe()
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App