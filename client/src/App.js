import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import Friends from "./pages/Friends/Friends";
import ImageGen from "./pages/ImageGen/ImageGen";
import Trend from "./pages/Trend/Trend";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div
      className="App"
    >
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />

        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />

        <Route
          path="/friends"
          element={user ? <Friends /> : <Navigate to="../auth" />}
        />

        <Route
          path="/ImageGen"
          element={user ? <ImageGen /> : <Navigate to="../auth" />}
        />

        <Route
          path="/trending"
          element={user ? <Trend /> : <Navigate to="../auth" />}
        />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
