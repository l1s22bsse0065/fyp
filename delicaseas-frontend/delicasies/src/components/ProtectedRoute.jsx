import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // If token is missing → redirect to sign-in
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Otherwise render the protected content (child routes)
  return <Outlet />;
}
