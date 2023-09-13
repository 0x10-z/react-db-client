import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PokemonService from "../services/pokemonService";
import { Pokemon } from "pokeapi-js-wrapper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PokemonModal from "./PokemonModal";
import { Utils } from "../utils";
import InfiniteScroll from "react-infinite-scroll-component";

const PokemonSearch: React.FC = () => {
  const { searchQuery } = useParams();
  const isMounted = useRef(false); // Use useRef to track component mount state

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const navigate = useNavigate();
  const [search, setSearch] = useState<string>(searchQuery || "");

  const pokemonService = new PokemonService();
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const ITEMS_PER_PAGE = 10; // Esto es parametrizable

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const pokedex = await pokemonService.getPokedex(
        2,
        offset,
        ITEMS_PER_PAGE
      );

      // Create a set to keep track of unique Pokemon IDs
      const uniquePokemonIds = new Set(pokemons.map((pokemon) => pokemon.id));
      // Filter out duplicates from the new pokemons
      const newPokemons = pokedex.pokemons.filter(
        (pokemon) => !uniquePokemonIds.has(pokemon.id)
      );

      if (newPokemons.length > 0) {
        setPokemons((prev) => [...prev, ...newPokemons]);
        setTotalEntries(pokedex.total_entries);
      }
      setTotalEntries(pokedex.total_entries);
      //setPokemons((prevPokemons) => [...prevPokemons, ...data]);
    } catch (err) {
      setError("An error occurred while fetching the pokemons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // This effect will run whenever either offset or search changes
    if (offset !== 0) {
      loadPokemons();
    }
  }, [offset, search]);

  useEffect(() => {
    // Handle initial loading when the component mounts
    if (!isMounted.current && offset === 0) {
      loadPokemons();
      isMounted.current = true; // Set isMounted to true after initial load
    }
  }, [offset]);

  useEffect(() => {
    if (search) {
      navigate(`/q/${search}`);
    } else if (searchQuery !== undefined) {
      navigate("/");
    }
  }, [search, navigate, searchQuery]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  ); // Solo mostrar la cantidad de Pokémon definida por displayCount

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + ITEMS_PER_PAGE);
  };

  const skeletonCount = 150;

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon); // Limpiar el Pokémon seleccionado
  };

  const closeModal = () => {
    setSelectedPokemon(null); // Limpiar el Pokémon seleccionado
  };

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

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
      <div className="w-full sm:max-w-screen-xl mb-4 flex">
        <input
          type="text"
          placeholder="Search for a Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-1/2 mx-auto text-center"
        />
      </div>
      <InfiniteScroll
        dataLength={filteredPokemons.length}
        next={handleLoadMore}
        hasMore={filteredPokemons.length < totalEntries}
        loader={
          loading && (
            <div
              style={{ bottom: "6.25%" }}
              className="fixed left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-md"
            >
              <h4 className="text-center">Cargando...</h4>
            </div>
          )
        }
        endMessage={
          <p className="text-center mt-4 text-gray-500">
            ¡Has visto todos los Pokémon!
          </p>
        }
        scrollThreshold="95%"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {loading && pokemons.length === 0 ? (
            Array.from({ length: skeletonCount }).map((_, index) => (
              <Skeleton key={index} width={200} height={200} />
            ))
          ) : filteredPokemons.length === 0 ? (
            <div className="text-center text-gray-600 flex-grow flex items-center justify-center">
              No Pokémon found.
            </div>
          ) : (
            filteredPokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                data-id={pokemon.id}
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
                  {pokemon.id}
                </p>
                <img
                  src={
                    (pokemon.sprites &&
                      pokemon.sprites.other["official-artwork"]
                        .front_default) ||
                    "#"
                  }
                  alt={Utils.capitalizeFirstLetter(pokemon.name)}
                  className="w-3/6 md:w-full lg:max-h-60 h-auto object-fit mx-auto"
                />
                <h1>{Utils.capitalizeFirstLetter(pokemon.name)}</h1>
              </div>
            ))
          )}
        </div>
      </InfiniteScroll>

      <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
    </div>
  );
};

export default PokemonSearch;
