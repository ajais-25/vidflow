import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="upload" element={<h1>upload</h1>} />
      <Route path="" element={<h1>Home</h1>} />
      <Route path="dashboard" element={<h1>dashboard</h1>} />
      <Route path="history" element={<h1>history</h1>} />
      <Route path="playlists" element={<h1>playlists</h1>} />
      <Route path="liked-videos" element={<h1>liked-videos</h1>} />
      <Route path="subscriptions" element={<h1>subsciprtions</h1>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
