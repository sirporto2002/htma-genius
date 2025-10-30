import { createContext, useContext, useEffect, useState } from "react";

type User = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Dev-only: restore from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("devUser");
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  async function signInWithGoogle() {
    // Mock a user (replace with Firebase later)
    const u: User = {
      uid: "dev-uid",
      displayName: "Dev User",
      email: "dev@example.com",
      photoURL: undefined,
    };
    setUser(u);
    localStorage.setItem("devUser", JSON.stringify(u));
  }

  async function signOut() {
    setUser(null);
    localStorage.removeItem("devUser");
  }

  const value: AuthContextValue = { user, loading, signInWithGoogle, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
