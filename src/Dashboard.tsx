import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect user to the login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Welcome to Your Dashboard</h1>
      <p>You are successfully logged in to HTMA Genius!</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.25rem",
          background: "#0078d7",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
