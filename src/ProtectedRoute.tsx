// src/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig"; // ✅ Path to your Firebase setup file

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // You can replace this with a custom spinner later
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  }

  // ✅ If user is authenticated, render children; otherwise redirect to login
  return user ? children : <Navigate to="/login" replace />;
}
