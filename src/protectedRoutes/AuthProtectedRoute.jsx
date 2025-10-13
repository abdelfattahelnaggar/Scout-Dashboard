import { Navigate } from "react-router-dom";

export default function AuthProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
}
