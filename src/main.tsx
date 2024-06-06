import { createRoot } from "react-dom/client";
import * as React from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./App";

createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </>
);
