export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    // ...otros sprites adicionales si los necesitas
  };
  species: {
    name: string;
    url: string;
    flavor_text_entries?: Array<{
      flavor_text: string;
      language: {
        name: string;
      };
    }>;
  };
  evolutions?: Evolution[];
  // Puedes añadir otros campos según lo que requieras de la API
}

export interface Evolution {
  species_name: string;
  // ...otros campos relacionados con las evoluciones
}
