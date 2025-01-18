import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
const Home = lazy(() => import("./pages/Home.jsx"));
const LikedVideos = lazy(() => import("./pages/LikedVideos.jsx"));
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
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.user);
  return isLoggedIn ? <Layout /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="/" element={<ProtectedRoute />}>
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
            path="c/:username"
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
          <Route
            path="liked-videos"
            element={
              <Suspense fallback={<Loading />}>
                <LikedVideos />
              </Suspense>
            }
          />
          {/* Playlist */}
          <Route
            path="playlist"
            element={
              <Suspense fallback={<Loading />}>
                <Playlists />
              </Suspense>
            }
          />
          <Route
            path="playlist/:playlistId"
            element={
              <Suspense fallback={<Loading />}>
                <PlaylistIndividual />
              </Suspense>
            }
          />
          {/* Video */}
          <Route
            path="watch/:videoId"
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
