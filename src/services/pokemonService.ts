import {
  IPokemon,
  IGeneration,
  IEvolutionChain,
  IType,
  IPokemonSpecies,
  Pokedex,
  IDamageRelations,
  Pokemon,
  IPokedex,
  IPokedexReference,
} from "pokeapi-js-wrapper";

class PokemonService {
  private P: Pokedex;

  constructor() {
    this.P = new Pokedex();
  }

  // Fetch a list of Pokémon based on the generation
  async getPokedex(
    id: number,
    offset: number,
    limit: number
  ): Promise<IPokedex> {
    const pokedexData: IPokedexReference = await this.P.getPokedex(id);
    const paginatedPokemon = pokedexData.pokemon_entries.slice(
      offset,
      offset + limit
    );
    // Fetch detailed information for each Pokémon in the generation
    const pokemons: Pokemon[] = await Promise.all(
      paginatedPokemon.map(async (speciesRef) => {
        return this.getPokemonDetails(speciesRef.pokemon_species.name);
      })
    );

    const sortedPokemons = pokemons.sort(
      (current, next) => current.id - next.id
    );
    const pokedex: IPokedex = {
      description: pokedexData.description,
      total_entries: pokedexData.pokemon_entries.length,
      pokemons: sortedPokemons,
    };
    return pokedex;
  }

  // Fetch a list of Pokémon based on the generation
  async getPokemonByGeneration(
    generation: string,
    offset: number,
    limit: number
  ): Promise<Pokemon[]> {
    const generationData: IGeneration = await this.P.getGenerationByName(
      generation
    );
    const paginatedSpecies = generationData.pokemon_species.slice(
      offset,
      offset + limit
    );

    console.log(paginatedSpecies);

    // Fetch detailed information for each Pokémon in the generation
    const pokemons: Pokemon[] = await Promise.all(
      paginatedSpecies.map(async (speciesRef) => {
        return this.getPokemonDetails(speciesRef.name);
      })
    );
    return pokemons.sort((current, next) => current.id - next.id);
  }

  // Fetch detailed information about a specific Pokémon
  async getPokemonDetails(pokemonName: string): Promise<Pokemon> {
    const [response, species] = await Promise.all([
      this.P.getPokemonByName(pokemonName),
      this.P.getPokemonSpeciesByName(pokemonName),
    ]);

    const entry = species.flavor_text_entries.find(
      (entrie) => entrie.language.name === "es"
    );
    const description = entry ? entry.flavor_text : "Descripción no disponible";

    const evolutionChainId = species.evolution_chain.url.split("/")[6];
    const evolutionData: IEvolutionChain = await this.P.getEvolutionChainById(
      evolutionChainId
    );

    return {
      id: species.id,
      name: pokemonName,
      description: description,
      sprites: response.sprites,
      moves: response.moves,
      types: response.types,
      evolutionChainUrl: species.evolution_chain.url,
    };
  }

  async getPokemonEvolutions(
    evolutionChainUrl: string
  ): Promise<IEvolutionChain> {
    const evolutionChainId = evolutionChainUrl.split("/")[6];

    const evolutionData: IEvolutionChain = await this.P.getEvolutionChainById(
      evolutionChainId
    );
    return evolutionData;
  }
}

// Usage example:
// const service = new PokemonService();
// const pikachuDetails = await service.getPokemonDetails("pikachu");
// console.log(pikachuDetails);

export default PokemonService;
