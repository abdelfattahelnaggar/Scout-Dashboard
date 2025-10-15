import { Navigate } from "react-router-dom";

export default function DashboardProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <>{!isAuthenticated ? <Navigate to="/login" replace /> : children}</>
  );
}
