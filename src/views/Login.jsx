import { PokemonContext } from "../provider/PokemonProvider";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "../components/Form/Form";
import Welcome from "../components/User/Welcome.jsx";
import MenuBar from "../components/MenuBar";
import MyPokemons from "../components/User/MyPokemons";
import BattleStats from "../components/User/BattleStats";
import About from "../components/User/About";

const Login = () => {
  const { userIsLoggedIn } = useContext(PokemonContext);
  return (
    <>
      <Form />
      {userIsLoggedIn && (
        <>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/my-pokemons" element={<MyPokemons />} />
            <Route path="/battle-stats" element={<BattleStats />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default Login;
