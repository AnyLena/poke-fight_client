import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Pokedex from "./views/Pokedex";
import Fight from "./views/Fight";
import Ranking from "./views/Ranking";
import "./App.css";
import NavBar from "./components/NavBar";
import Welcome from "./components/User/Welcome";
import MyPokemons from "./components/User/MyPokemons";
import BattleStats from "./components/User/BattleStats";
import About from "./components/User/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/my-pokemons" element={<MyPokemons />} />
          <Route path="/battle-stats" element={<BattleStats />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/fight" element={<Fight />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
      <NavBar />
    </>
  );
}

export default App;
