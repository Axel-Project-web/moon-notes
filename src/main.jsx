//react
import React from "react";
import ReactDOM from "react-dom/client";

//gloabl styles
import "./index.css";

//router
import RouterApp from "./router/index.router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterApp />
  </React.StrictMode>
);
