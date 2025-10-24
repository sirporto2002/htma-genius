import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>404 — Page Not Found</h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          textDecoration: "none",
          color: "blue",
        }}
      >
        ⬅️ Go Back Home
      </Link>
    </main>
  );
}
