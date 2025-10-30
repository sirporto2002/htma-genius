// src/ProtectedRoute.tsx
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  // TEMP: allow everything through while auth is being wired
  return <>{children}</>;
}
