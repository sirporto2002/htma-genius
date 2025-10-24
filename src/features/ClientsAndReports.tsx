// src/features/ClientsAndReports.tsx

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db, signInWithGoogle, signOutNow } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore"; // 👈 Needed for Firestore write

export default function ClientsAndReports() {
  const [user, setUser] = useState<User | null>(null);
  const [mineral, setMineral] = useState("");
  const [level, setLevel] = useState(0);

  // 🔐 Monitor login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ➕ Add report handler
  const handleAddReport = async () => {
    if (!user) return;

    try {
      const reportsRef = collection(db, "users", user.uid, "reports");
      await addDoc(reportsRef, {
        date: new Date().toISOString().split("T")[0],
        mineral,
        level,
      });

      setMineral("");
      setLevel(0);
      console.log("✅ Report added!");
    } catch (error) {
      console.error("❌ Error adding report:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Clients and Reports</h1>

      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.email}</p>
          <button onClick={signOutNow}>Sign Out</button>

          <div style={{ marginTop: "2rem" }}>
            <input
              type="text"
              placeholder="Mineral"
              value={mineral}
              onChange={(e) => setMineral(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <input
              type="number"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              style={{ marginRight: "1rem" }}
            />
            <button onClick={handleAddReport}>Add Report</button>
          </div>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
}
