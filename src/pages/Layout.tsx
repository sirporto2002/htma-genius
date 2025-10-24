// File: src/pages/Layout.tsx
import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="nav">
        {/* ✅ Brand / Logo */}
        <div className="nav__brand">
          <span className="nav__logo">HTMA Genius</span>
        </div>

        {/* ✅ Desktop Links */}
        <nav className="nav__links">
          <NavLink to="/" end className="nav__link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav__link">
            About
          </NavLink>
        </nav>

        {/* ✅ Mobile Toggle */}
        <button
          className={`nav__toggle ${open ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </header>

      {/* ✅ Mobile Menu Panel */}
      <nav
        className={`nav__panel ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      >
        <NavLink to="/" end className="nav__link">
          Home
        </NavLink>
        <NavLink to="/about" className="nav__link">
          About
        </NavLink>
      </nav>

      {/* ✅ Page Content */}
      <main className="page">
        <Outlet />
      </main>
    </>
  );
}
