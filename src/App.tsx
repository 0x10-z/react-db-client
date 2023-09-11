import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonSearch from "./components/PokemonSearch";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search/:param" element={<PokemonSearch />} />
        <Route path="/pokemon/:param" element={<PokemonDetail />} />
        <Route path="/" element={<PokemonSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
