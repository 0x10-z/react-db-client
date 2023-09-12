import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PokemonSearch from "./components/PokemonSearch";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Función para abrir el modal con el Pokémon seleccionado
  const openModal = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/search/:param"
          element={<PokemonSearch openModal={openModal} />}
        />
        {/* Agregar ruta para mostrar el modal */}
        <Route
          path="/pokemon/:param"
          element={
            isModalOpen ? (
              <PokemonDetail onClose={closeModal} pokemon={selectedPokemon} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/" element={<PokemonSearch openModal={openModal} />} />
      </Routes>
    </Router>
  );
}

export default App;
