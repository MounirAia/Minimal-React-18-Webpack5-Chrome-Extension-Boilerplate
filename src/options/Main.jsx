import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Options from "./Options";

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
