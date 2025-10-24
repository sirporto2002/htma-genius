import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "3rem auto", textAlign: "center" }}
    >
      <h2>Login to HTMA Genius</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#0078d7",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      <p style={{ marginTop: "1rem" }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
