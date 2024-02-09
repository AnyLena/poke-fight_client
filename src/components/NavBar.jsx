import React from "react";
import { useState } from "react";
import "../styles/NavBar.css";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { GiPunchBlast } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [value, setValue] = useState(0);

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
        label="Login"
        icon={<FaRegUserCircle className="icon" />}
        onClick={() => {
          navigate("/");
        }}
      />
      <BottomNavigationAction
        style={{ color: value === 1 ? "#fff" : "#888" }}
        className="nav-button"
        label="Pokédex"
        icon={<MdOutlineCatchingPokemon className="icon" />}
        onClick={() => {
          navigate("/pokedex");
        }}
      />
      <BottomNavigationAction
        style={{ color: value === 2 ? "#fff" : "#888" }}
        className="nav-button"
        label="Fight!"
        onClick={() => {
          navigate("/fight");
        }}
        icon={<GiPunchBlast className="icon" />}
      />
      <BottomNavigationAction
        style={{ color: value === 3 ? "#fff" : "#888" }}
        className="nav-button"
        label="Ranking"
        onClick={() => {
          navigate("/ranking");
        }}
        icon={<GoTrophy className="icon" />}
      />
    </BottomNavigation>
  );
};

export default NavBar;
