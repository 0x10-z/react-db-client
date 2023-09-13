import React, { useEffect, useState } from "react";
import { ISprites, Pokemon } from "pokeapi-js-wrapper";
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
    <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-hidden bg-black bg-opacity-50">
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
  const [mainImage, setMainImage] = useState(pokemon.sprites.front_default);

  const renderAvailableSprites = (sprites: ISprites) => {
    const spriteImages = [
      sprites.front_default,
      sprites.back_default,
      sprites.front_shiny,
      sprites.back_shiny,
      sprites.other.dream_world.front_default,
      sprites.other.home.front_default,
      sprites.other["official-artwork"].front_default,
      // ... añade más si hay otros sprites que quieras mostrar
    ];

    return (
      <div className="flex flex-wrap justify-center space-x-2 mt-2">
        {spriteImages.map((sprite, index) => (
          <div
            key={index}
            className={`p-1 ${
              sprite === mainImage ? "border-2 border-blue-500 rounded" : ""
            }`}
          >
            <img
              src={sprite}
              alt="Available sprite"
              className="w-16 h-16 object-contain cursor-pointer"
              onClick={() => setMainImage(sprite)}
            />
          </div>
        ))}
      </div>
    );
  };

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

  const typeColors: Record<string, string> = {
    grass: "bg-green-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-500",
    psychic: "bg-purple-500",
    bug: "bg-lime-500",
    rock: "bg-gray-600",
    ground: "bg-yellow-700",
    poison: "bg-indigo-700",
    fighting: "bg-orange-600",
    ghost: "bg-indigo-500",
    dark: "bg-gray-800",
    steel: "bg-gray-400",
    ice: "bg-cyan-500",
    dragon: "bg-indigo-900",
    fairy: "bg-pink-400",
    normal: "bg-gray-300",
    flying: "bg-sky-400",
  };

  return (
    <div
      className="rounded-lg shadow-xl w-full max-w-3xl mx-auto p-4 relative"
      style={{
        backdropFilter: "blur(25px) saturate(200%)",
        WebkitBackdropFilter: "blur(25px) saturate(200%)",
        backgroundColor: "rgba(255, 255, 255, 0.78)",
        borderRadius: "12px",
        border: "1px solid rgba(209, 213, 219, 0.3)",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <FontAwesomeIcon icon={faTimes} size="2x" />
      </button>
      <h1 className="text-2xl font-bold mb-4 text-center">
        {Utils.capitalizeFirstLetter(pokemon.name)} (ID: {pokemon.id})
      </h1>

      {/* Types */}
      <div className="overflow-y-auto max-h-[calc(100vh-100px)] scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Types:</h2>
          <ul className="flex justify-center space-x-2">
            {pokemon.types.slice(0, 10).map((type, index) => (
              <li
                key={index}
                className={`px-3 py-1 text-white rounded ${
                  typeColors[type.type.name] || "bg-gray-400"
                }`}
              >
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
        {/* Images */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={mainImage || "#"}
            alt={Utils.capitalizeFirstLetter(pokemon.name)}
            className="w-64 h-64 object-contain mb-4"
          />
          {renderAvailableSprites(pokemon.sprites)}
        </div>
        {/* Description */}
        <div className="flex flex-col items-center mb-6 mx-10">
          <p>{pokemon.description}</p>
        </div>
        {/* Evolutions */}
        <div className="mb-4 ">
          <div className="flex flex-col  mb-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Evolutions:</h2>
            <div className="flex space-x-4 overflow-x-auto items-center justify-center">
              {evolutions.map((evo, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      evo.url.split("/")[6]
                    }.png`}
                    alt={evo.name}
                    className="w-16 h-16 object-cover mb-2"
                  />
                  <span className="text-blue-500">
                    {Utils.capitalizeFirstLetter(evo.name)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Moves */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Moves:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {pokemon.moves.slice(0, 100).map((move, index) => (
                <li key={index}>{move.move.name}</li>
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
      leave="transition-opacity duration-200 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="bg-primary absolute right-0 h-screen w-full md:w-1/4 md:rounded-tl-lg shadow-xl"
    >
      <ModalOverlay onClose={onClose}>
        {pokemon && <PokemonDetails pokemon={pokemon} onClose={onClose} />}
      </ModalOverlay>
    </Transition>
  );
};

export default PokemonModal;
