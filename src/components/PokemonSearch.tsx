import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../services/apiService";
import { Pokemon } from "../types";

const PokemonSearch: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchPokemons();
        setPokemons(data);
      } catch (err) {
        setError("An error occurred while fetching the pokemons.");
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
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
        {filteredPokemons.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">
            No Pokémon found.
          </div>
        ) : (
          filteredPokemons.map((pokemon, index) => (
            <div
              key={index}
              data-id={index}
              className="border p-2 relative hover:transform hover:scale-105 transition-transform">
              <p className="absolute top-2 left-2 text-gray-500 font-semibold">
                {index + 1}
              </p>
              <img
                src={(pokemon.sprites && pokemon.sprites.front_default) || "#"}
                alt={pokemon.name}
                className="w-full max-h-60 h-auto"
              />
              <Link
                to={`/pokemon/${pokemon.id}`}
                className="text-center mt-2 block text-blue-800 font-semibold">
                {pokemon.name}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonSearch;
