import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonByName } from "../services/apiService"; // Asegúrate de actualizar esta función en tu apiService
import { Pokemon } from "../types";
import Modal from "./Modal";

const PokemonDetail: React.FC = () => {
  const { param } = useParams<{ param: string }>();

  if (!param) {
    throw new Error("Param is required");
  }

  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const pokeData = await fetchPokemonByName(param);
      setPokemon(pokeData);
    };

    loadPokemon();
  }, [param]);

  const handleCloseModal = () => {
    navigate("/");
  };

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      <Modal onClose={handleCloseModal} pokemon={pokemon} />
    </div>
  );
};

export default PokemonDetail;
