import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./assets/components/context"; // ✅ FIXED

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>   {/* ✅ THIS IS THE FIX */}
      <App />
    </AppProvider>
  </StrictMode>
);