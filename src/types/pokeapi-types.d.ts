declare module "pokeapi-js-wrapper" {
  export class Pokedex {
    getPokedex(id: number): Promise<IPokedexReference>;
    getPokemonByName(name: string): Promise<IPokemon>;
    getGenerationByName(name: string): Promise<IGeneration>;
    getPokemonSpeciesByName(name: string): Promise<IPokemonSpecies>;
    getEvolutionChainById(id: string): Promise<IEvolutionChain>;
    getTypeByName(name: string): Promise<IType>;
  }

  export type Pokemon = {
    id: number;
    name: string;
    description: string;
    sprites: IPokemon["sprites"];
    moves: IPokemon["moves"];
    types: IPokemon["types"];
    evolutionChainUrl: string;
  };

  export interface IPokemon {
    moves: IMove[];
    abilities: IAbility[];
    types: ITypeReference[];
    sprites: ISprites;
  }

  export interface ISprites {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other: {
      dream_world: ISpritePictures;
      home: ISpritePictures;
      "official-artwork": ISpritePictures;
    };
    // ... add other sprite variations if needed
  }

  export interface ISpritePictures {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
  }

  export interface IMove {
    move: {
      name: string;
      url: string;
    };
  }

  export interface IAbility {
    ability: {
      name: string;
      url: string;
    };
  }

  export interface ITypeReference {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }

  export interface IGeneration {
    pokemon_species: IPokemonSpeciesReference[];
    names: IGenerationTranslation[];
  }

  export interface IGenerationTranslation {
    language: IPokemonSpeciesReference;
    name: string;
  }

  export interface IPokemonSpeciesReference {
    name: string;
    url: string;
  }

  export interface IPokedex {
    description: string;
    total_entries: number;
    pokemons: Pokemon[];
  }

  export interface IPokedexReference {
    description: string;
    pokemon_entries: IPokemonEntries[];
  }

  export interface IPokemonEntries {
    entry_number: number;
    pokemon_species: IPokemonSpeciesReference;
  }

  export interface IPokemonSpecies {
    evolution_chain: {
      url: string;
    };
    flavor_text_entries: ITextEntries[];
    id: number;
  }

  export interface ITextEntries {
    flavor_text: string;
    language: IPokemonSpeciesReference;
  }

  export interface IEvolutionChain {
    chain: IEvolutionDetail;
  }

  export interface IEvolutionDetail {
    species: IPokemonSpeciesReference;
    evolves_to: IEvolutionDetail[];
  }

  export interface IType {
    damage_relations: IDamageRelations;
  }

  export interface IDamageRelations {
    double_damage_from: ITypeReference[];
    half_damage_from: ITypeReference[];
    no_damage_from: ITypeReference[];
    double_damage_to: ITypeReference[];
    half_damage_to: ITypeReference[];
    no_damage_to: ITypeReference[];
  }
}
