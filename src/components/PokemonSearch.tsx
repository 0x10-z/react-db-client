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
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for a Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {filteredPokemons.length === 0 ? (
          <div className="col-span-3 text-center text-gray-600">
            No Pokémon found.
          </div>
        ) : (
          filteredPokemons.map((pokemon, index) => (
            <div key={index} data-id={index} className="border p-2">
              <img
                src={(pokemon.sprites && pokemon.sprites.front_default) || "#"}
                alt={pokemon.name}
                className="w-full"
              />
              <Link
                to={`/pokemon/${pokemon.name}`}
                className="text-center mt-2 block"
              >
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
