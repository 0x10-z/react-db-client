import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonById } from "../services/apiService"; // Asegúrate de actualizar esta función en tu apiService
import { Pokemon } from "../types";
import PokemonModal from "./PokemonModal";

const PokemonDetail: React.FC<{
  onClose: () => void;
  pokemon: Pokemon | null;
}> = ({ onClose, pokemon }) => {
  const { param } = useParams<{ param: string }>();

  if (!param) {
    throw new Error("Param is required");
  }

  const navigate = useNavigate();

  useEffect(() => {
    const loadPokemon = async () => {
      const pokeData = await fetchPokemonById(parseInt(param));
      // Actualiza el estado del Pokémon solo si está vacío (cuando se accede directamente a la ruta)
      if (!pokemon) {
        onClose();
      }
      // Actualiza los detalles del Pokémon
      pokemon = pokeData;
    };

    loadPokemon();
  }, [param, onClose, pokemon]);

  if (!pokemon) {
    // Si no hay Pokémon, muestra un mensaje de carga o maneja el caso adecuadamente
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Contenido del modal */}
      <PokemonModal onClose={onClose} pokemon={pokemon} />
    </div>
  );
};

export default PokemonDetail;
