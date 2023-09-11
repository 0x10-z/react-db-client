import { Pokemon } from "../types"; // Asumiendo que tienes un tipo llamado 'Pokemon'

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=100`); // Limitado a 100 para el ejemplo, ajusta según sea necesario
  const data = await response.json();
  return data.results; // La API retorna la lista en la clave 'results'
};

export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  const data = await response.json();
  return data;
};
