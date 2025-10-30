import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <header
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          gap: 16,
        }}
      >
        <strong>HTMA Genius</strong>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login" style={{ marginLeft: "auto" }}>
          Login
        </Link>
      </header>
      <main style={{ padding: 16 }}>{children}</main>
      <footer
        style={{ padding: 12, borderTop: "1px solid #e5e7eb", marginTop: 24 }}
      >
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
