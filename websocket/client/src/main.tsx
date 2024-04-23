import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import route from "./utils/route";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {route.map((item) => (
          <Route key={item.path} path={item.path} element={<item.element />} />
        ))}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
