import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../services/apiService";
import { Pokemon } from "../types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PokemonModal from "./PokemonModal";

const PokemonSearch: React.FC<{
  openModal: (pokemon: Pokemon) => void;
}> = ({ openModal }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchPokemons();
        setPokemons(data);
      } catch (err) {
        setError("An error occurred while fetching the pokemons.");
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  const skeletonCount = 150;

  const handlePokemonClick = (pokemon: Pokemon) => {
    console.log("AS");
    setSelectedPokemon(pokemon); // Limpiar el Pokémon seleccionado
    setIsModalOpen(true); // Llamar a la función para abrir el modal con el Pokémon seleccionado
  };

  const closeModal = () => {
    setSelectedPokemon(null); // Limpiar el Pokémon seleccionado
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "url('https://4kwallpapers.com/images/wallpapers/pikachu-pokemon-5k-8000x4500-10896.png')",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Pokédex</h1>
      <div className="w-full sm:max-w-screen-xl mb-4">
        <input
          type="text"
          placeholder="Search for a Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {loading ? (
          Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton key={index} width={200} height={200} />
          ))
        ) : filteredPokemons.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">
            No Pokémon found.
          </div>
        ) : (
          filteredPokemons.map((pokemon, index) => (
            <div
              key={index}
              data-id={index}
              className="border p-2 relative hover:transform hover:scale-105 transition-transform"
              style={{
                backdropFilter: "blur(2px) saturate(200%)",
                WebkitBackdropFilter: "blur(2px) saturate(200%)",
                backgroundColor: "rgba(255, 255, 255, 0.78)",
                borderRadius: "12px",
                border: "1px solid rgba(209, 213, 219, 0.3)",
              }}
              onClick={() => handlePokemonClick(pokemon)} // Llamar a la función al hacer clic
            >
              <p className="absolute top-2 left-2 text-gray-500 font-semibold">
                {index + 1}
              </p>
              <img
                src={(pokemon.sprites && pokemon.sprites.front_default) || "#"}
                alt={pokemon.name}
                className="w-full lg:max-h-60 h-auto object-fit"
              />
              <Link
                to={`/pokemon/${pokemon.id}`}
                className="text-center mt-2 block text-blue-800 font-semibold"
              >
                {pokemon.name}
              </Link>
            </div>
          ))
        )}
      </div>
      {isModalOpen && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </div>
  );
};

export default PokemonSearch;
