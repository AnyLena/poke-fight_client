import React from "react";
import { useState } from "react";
import "../styles/NavBar.css";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { GiPunchBlast } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";

const NavBar = () => {
  const [value, setValue] = useState(0);

  const navStyle = { backgroundColor: "#333" };

  return (
    <BottomNavigation
      style={navStyle}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        style={{ color: value === 0 ? "#fff" : "#888" }}
        className="nav-button"
        label="Pokédex"
        icon={<MdOutlineCatchingPokemon className="icon" />}
      />
      <BottomNavigationAction
        style={{ color: value === 1 ? "#fff" : "#888" }}
        className="nav-button"
        label="Fight!"
        icon={<GiPunchBlast className="icon" />}
      />
      <BottomNavigationAction
        style={{ color: value === 2 ? "#fff" : "#888" }}
        className="nav-button"
        label="Ranking"
        icon={<GoTrophy className="icon" />}
      />
    </BottomNavigation>
  );
};

export default NavBar;
