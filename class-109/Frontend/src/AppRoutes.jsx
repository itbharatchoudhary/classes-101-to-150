import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "./Features/Auth/pages/LoginForm"
import RegisterForm from "./Features/Auth/pages/RegisterForm"

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* default redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default AppRoutes