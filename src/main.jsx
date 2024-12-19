import React from "react";
import ReactDOM from "react-dom/client"; // Gunakan ReactDOM untuk merender aplikasi
import "./index.css"; // Import CSS global (jika ada)
import App from "./App"; // Import App.jsx

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* Merender App ke dalam root */}
  </React.StrictMode>
);
