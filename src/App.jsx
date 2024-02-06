import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Fight from "./views/Fight";
import Ranking from "./views/Ranking";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fight" element={<Fight />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </>
  );
}

export default App;
