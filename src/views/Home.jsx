import Main from "../components/Main";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <h1 className="hidden">Poke-Fight</h1>
      <img className="pkmn-logo" src="../public/pokemon_logo.png" alt="Pokemon" />
      <Main />
    </>
  );
};

export default Home;
