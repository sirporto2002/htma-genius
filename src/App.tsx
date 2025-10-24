import React, { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div className="dashboard">
      <header className="hero">
        <div className="logo">HTMA Genius™</div>
        <nav>
          <a href="/">Dashboard</a>
          <a href="/about">About</a>
          <a href="/reports">Reports</a>
        </nav>
        {user ? (
          <button className="btn-logout" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <button className="btn-login" onClick={handleSignIn}>
            Sign in with Google
          </button>
        )}
      </header>

      <main>
        {!user ? (
          <div className="welcome">
            <h1>Welcome to HTMA Genius</h1>
            <p>
              Your personal mineral analysis dashboard powered by AI and systems
              biology.
            </p>
            <button className="btn-login" onClick={handleSignIn}>
              Sign in to Get Started
            </button>
          </div>
        ) : (
          <div className="content">
            <h2>Hello, {user.displayName || "User"} 👋</h2>
            <p>Welcome back! Ready to upload your HTMA report?</p>
            <div className="actions">
              <button className="btn-primary">Upload Report</button>
              <button className="btn-secondary">View My Reports</button>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>© 2025 Ninety Essentials Wellness LLC | FaithAndMinerals.com</p>
      </footer>
    </div>
  );
}

export default App;
