import React from "react";
import { Pokemon } from "../types";

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div
        className="relative w-full max-w-screen-lg mx-auto my-6"
        style={{
          backdropFilter: "blur(25px) saturate(200%)",
          WebkitBackdropFilter: "blur(25px) saturate(200%)",
          backgroundColor: "rgba(255, 255, 255, 0.78)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
      >
        {/* Contenido del modal */}
        <div className="modal-body p-4 rounded-lg">
          <h1 className="text-2xl font-bold">
            {pokemon.name} (ID: {pokemon.id})
          </h1>
          <img
            src={(pokemon.sprites && pokemon.sprites.front_default) || "#"}
            alt={pokemon.name}
            className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
          />
          {/* Otros detalles del Pokémon */}
          {/* Agrega aquí la información adicional que deseas mostrar en el modal */}
        </div>
        {/* Botón para cerrar el modal */}
        <div className="modal-footer mt-4 text-center">
          <button
            className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
