import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
