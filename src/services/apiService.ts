import { Pokemon } from "../types"; // Asumiendo que tienes un tipo llamado 'Pokemon'

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=151`); // Limitado a 100 para el ejemplo, ajusta según sea necesario
  const data = await response.json();
  //return data.results; // La API retorna la lista en la clave 'results'
  const formattedData = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const pokemonDetail = await fetchPokemonByName(pokemon.name);
      return pokemonDetail;
    })
  );
  console.log(formattedData);
  return formattedData;
};

export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  const data = await response.json();
  const sprites = {
    front_default: data.sprites.other["official-artwork"].front_default,
  };
  return {
    id: parseInt(data.id),
    name: capitalizeFirstLetter(data.name),
    sprites: sprites,
    species: {
      name: data.name,
      url: data.url,
    },
    evolutions: [], // Puedes llenar esto si tienes datos de evolución
  };
};
