import React from "react";
import { Pokemon } from "../types";

interface ModalProps {
  onClose: () => void;
  pokemon?: Pokemon;
}

const Modal: React.FC<ModalProps> = ({ onClose, pokemon }) => {
  if (!pokemon) return null;

  const description = pokemon.species.flavor_text_entries?.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Fondo oscuro */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Contenido del modal */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="mx-auto h-24 w-24 rounded-full"
            />
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {pokemon.name} (#{pokemon.id})
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {description}
                  <br />
                  {/* Evoluciones (si las hay) */}
                  {pokemon.evolutions && (
                    <div>
                      <strong>Evolutions:</strong>
                      <ul>
                        {pokemon.evolutions.map((evo) => (
                          <li key={evo.species_name}>{evo.species_name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
