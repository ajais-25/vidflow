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
import Home from "./pages/Home.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import WatchHistory from "./pages/WatchHistory.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import Playlists from "./pages/Playlists.jsx";
import NotFound from "./pages/NotFound.jsx";
import PlaylistIndividual from "./pages/PlaylistIndividual.jsx";
import ChannelDashboard from "./pages/ChannelDashboard.jsx";
import Upload from "./pages/Upload.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="upload" element={<Upload />} />
      <Route path="" element={<Home />} />
      <Route path="dashboard" element={<ChannelDashboard />} />
      <Route path="history" element={<WatchHistory />} />
      <Route path="playlists" element={<Playlists />} />
      <Route path="playlists/:id" element={<PlaylistIndividual />} />
      <Route path="liked-videos" element={<LikedVideos />} />
      <Route path="subscriptions" element={<Subscriptions />} />
      {/* Video */}
      <Route path="video/:id" element={<VideoPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
