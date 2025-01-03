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
import Layout from "./Layout.jsx";
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
import Loading from "./components/Loading.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* <Route path="load" element={<Loading />} /> */}
        <Route
          path="login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="upload"
          element={
            <Suspense fallback={<Loading />}>
              <Upload />
            </Suspense>
          }
        />
        <Route
          path=""
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <ChannelDashboard />
            </Suspense>
          }
        />
        <Route
          path="history"
          element={
            <Suspense fallback={<Loading />}>
              <WatchHistory />
            </Suspense>
          }
        />
        <Route
          path="subscriptions"
          element={
            <Suspense fallback={<Loading />}>
              <Subscriptions />
            </Suspense>
          }
        />
        {/* Playlist */}
        <Route
          path="playlists"
          element={
            <Suspense fallback={<Loading />}>
              <Playlists />
            </Suspense>
          }
        />
        <Route
          path="playlists/:id"
          element={
            <Suspense fallback={<Loading />}>
              <PlaylistIndividual />
            </Suspense>
          }
        />
        {/* Video */}
        <Route
          path="video/:id"
          element={
            <Suspense fallback={<Loading />}>
              <VideoPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
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
