import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Account from "./pages/account.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import MovieOverview from "./pages/movieOverview.jsx";
import Trailer from "./pages/Trailer.jsx";
import AI from "./pages/AI.jsx";

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* wrapping with protectedRoute component, so that account component will
          only load if user is login. otherwise if u change in url it will
          login. */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/overview"
            element={
              <ProtectedRoute>
                <MovieOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/overview/trailer"
            element={
              <ProtectedRoute>
                <Trailer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AI"
            element={
              <ProtectedRoute>
                <AI />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
