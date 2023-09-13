import React, { useEffect, useState } from "react";
import { Pokemon } from "pokeapi-js-wrapper";
import PokemonService from "../services/pokemonService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Utils } from "../utils";
import { Transition } from "@headlessui/react";

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, onClose }) => {
  const handleClickOutside = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      {children}
    </div>
  );
};

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  pokemon,
  onClose,
}) => {
  const [evolutions, setEvolutions] = useState<any[]>([]);
  const pokemonService = new PokemonService();

  useEffect(() => {
    const fetchEvolutions = async () => {
      const evolutionData = await pokemonService.getPokemonEvolutions(
        pokemon.evolutionChainUrl
      );
      let chain = evolutionData.chain;
      const evos: any[] = [];
      while (chain) {
        evos.push(chain.species);
        chain = chain.evolves_to[0];
      }
      setEvolutions(evos);
    };

    fetchEvolutions();
  }, [pokemon.evolutionChainUrl]);

  return (
    <div
      className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-1/2"
      style={{
        backdropFilter: "blur(25px) saturate(200%)",
        WebkitBackdropFilter: "blur(25px) saturate(200%)",
        backgroundColor: "rgba(255, 255, 255, 0.78)",
        borderRadius: "12px",
        border: "1px solid rgba(209, 213, 219, 0.3)",
      }}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {Utils.capitalizeFirstLetter(pokemon.name)} (ID: {pokemon.id})
        </h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="px-4 py-6">
        <div className="flex justify-center mb-6">
          <img
            src={pokemon.sprites.front_default || "#"}
            alt={Utils.capitalizeFirstLetter(pokemon.name)}
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
        <p className="text-center mb-4">{pokemon.description}</p>
        <div className="overflow-y-auto max-h-[40vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 hover:scrollbar-thumb-blue-700">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Evolutions:</h2>
            {evolutions.map((evo, index) => (
              <div key={index} className="flex items-center mb-2">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    evo.url.split("/")[6]
                  }.png`}
                  alt={evo.name}
                  className="w-16 h-16 object-cover mr-2"
                />
                <span className="text-blue-500">
                  {Utils.capitalizeFirstLetter(evo.name)}
                </span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Moves:</h2>
            <ul className="list-disc pl-5">
              {pokemon.moves.slice(0, 10).map((move, index) => (
                <li key={index} className="mb-1">
                  {move.move.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Types:</h2>
            <ul className="flex space-x-2">
              {pokemon.types.slice(0, 10).map((type, index) => (
                <li
                  key={index}
                  className="px-2 py-1 bg-blue-500 text-white rounded">
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  return (
    <Transition
      show={pokemon != null}
      enter="transition-opacity ease-in-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition duration-200 ease-in-out"
      leaveFrom="transform translate-x-0"
      leaveTo="transform translate-x-full"
      className="bg-primary absolute right-0 h-screen w-full md:w-1/4 md:rounded-tl-lg shadow-xl">
      <ModalOverlay onClose={onClose}>
        {pokemon && <PokemonDetails pokemon={pokemon} onClose={onClose} />}
      </ModalOverlay>
    </Transition>
  );
};

export default PokemonModal;
