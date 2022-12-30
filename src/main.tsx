import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import UserProvider from "./context/UserProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
