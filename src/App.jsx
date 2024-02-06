import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Fight from "./views/Fight";
import Ranking from "./views/Ranking";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fight" element={<Fight />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
      <NavBar />
    </>
  );
}

export default App;
