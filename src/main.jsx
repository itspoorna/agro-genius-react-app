import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode> ,
);
