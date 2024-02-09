import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Pokedex from "./views/Pokedex";
import Fight from "./views/Fight";
import Ranking from "./views/Ranking";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/fight" element={<Fight />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
      <NavBar />
    </>
  );
}

export default App;
