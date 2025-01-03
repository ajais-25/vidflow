import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const Layout = lazy(() => import("./Layout.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Subscriptions = lazy(() => import("./pages/Subscriptions.jsx"));
const WatchHistory = lazy(() => import("./pages/WatchHistory.jsx"));
const Playlists = lazy(() => import("./pages/Playlists.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const PlaylistIndividual = lazy(() => import("./pages/PlaylistIndividual.jsx"));
const ChannelDashboard = lazy(() => import("./pages/ChannelDashboard.jsx"));
const Upload = lazy(() => import("./pages/Upload.jsx"));
const VideoPage = lazy(() => import("./pages/VideoPage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Layout />
          </Suspense>
        }
      >
        <Route
          path="login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="upload"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Upload />
            </Suspense>
          }
        />
        <Route
          path=""
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChannelDashboard />
            </Suspense>
          }
        />
        <Route
          path="history"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <WatchHistory />
            </Suspense>
          }
        />
        <Route
          path="subscriptions"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Subscriptions />
            </Suspense>
          }
        />
        {/* Playlist */}
        <Route
          path="playlists"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Playlists />
            </Suspense>
          }
        />
        <Route
          path="playlists/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PlaylistIndividual />
            </Suspense>
          }
        />
        {/* Video */}
        <Route
          path="video/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <VideoPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
