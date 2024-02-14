import React, { useContext } from "react";
import { useState } from "react";
import "../styles/NavBar.css";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { GiPunchBlast } from "react-icons/gi";
import { FiAward } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../provider/PokemonProvider";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const { userIsLoggedIn } = useContext(PokemonContext);

  const navigate = useNavigate();

  const navStyle = {
    backgroundColor: "#333",
    position: "sticky",
    bottom: 0,
    width: "100%",
    zIndex: 1000,
  };

  return (
    <BottomNavigation
      style={navStyle}
      showLabels
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    >
      <BottomNavigationAction
        style={{ color: value === 0 ? "#fff" : "#888" }}
        className="nav-button"
        label={userIsLoggedIn ? "My Profile" : "Login"}
        icon={<FaRegUserCircle className="icon" />}
        onClick={() => {
          navigate("/");
        }}
      />
      {userIsLoggedIn ? <BottomNavigationAction
        style={{ color: value === 0 ? "#fff" : "#888" }}
        className="nav-button"
        label="Pokédex"
        icon={<MdOutlineCatchingPokemon className="icon" />}
        onClick={() => {
          navigate("/pokedex");
        }}
        disabled={!userIsLoggedIn}
      /> : null }
     {userIsLoggedIn ? <BottomNavigationAction
        style={{ color: value === 0 ? "#fff" : "#888" }}
        className="nav-button"
        label="Fight!"
        onClick={() => {
          navigate("/fight");
        }}
        icon={<GiPunchBlast className="icon" />}
        disabled={!userIsLoggedIn}
      />: null}
      <BottomNavigationAction
        style={{ color: value === 3 ? "#FFD700" : "#888" }}
        className="nav-button"
        label="Ranking"
        onClick={() => {
          navigate("/ranking");
        }}
        icon={<FiAward className="icon" />}
      />
    </BottomNavigation>
  );
};

export default NavBar;
