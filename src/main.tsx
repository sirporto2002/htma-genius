// File: src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  // Prevent silent failure if root is missing
  throw new Error(
    "Root element #root not found. Ensure it exists in index.html."
  );
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
