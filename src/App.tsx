import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PokemonSearch from "./components/PokemonSearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/q/:searchQuery" element={<PokemonSearch />} />

        <Route path="/" element={<PokemonSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
