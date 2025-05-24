import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import QuestionDetail from "./components/QuestionDetail.jsx"; // <- create this
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/question" element={<QuestionDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
