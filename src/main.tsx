import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Si tu utilises Tailwind ou un fichier CSS global

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
