import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import PokemonSearch from "./PokemonSearch";
import { fetchPokemons } from "../services/apiService";
import { MemoryRouter } from "react-router-dom"; // para los Link y rutas

// Mock de la llamada al servicio
jest.mock("../services/apiService");

describe("<PokemonSearch />", () => {
  const mockPokemons = [
    {
      id: 1,
      name: "Bulbasaur",
      sprites: {
        front_default: "some-image-url.png",
      },
    },
    {
      id: 2,
      name: "Ivysaur",
      sprites: {
        front_default: "some-image-url2.png",
      },
    },
  ];

  beforeEach(() => {
    (fetchPokemons as jest.Mock).mockResolvedValue(mockPokemons);
  });

  it("should render the search bar and pokemons", async () => {
    const openModal = (pokemon: any) => {
      // Esta es una función mock de openModal
    };

    const { findByPlaceholderText, findByAltText } = render(
      <MemoryRouter>
        <PokemonSearch openModal={openModal} />{" "}
      </MemoryRouter>
    );

    const searchInput = await findByPlaceholderText("Search for a Pokémon...");
    expect(searchInput).toBeInTheDocument();

    const bulbasaurImage = await findByAltText("Bulbasaur");
    expect(bulbasaurImage).toBeInTheDocument();

    const ivysaurImage = await findByAltText("Ivysaur");
    expect(ivysaurImage).toBeInTheDocument();
  });

  it("should filter pokemons based on search input", async () => {
    const openModal = (pokemon: any) => {
      // Esta es una función mock de openModal
    };

    const { findByPlaceholderText, getByAltText, queryByAltText } = render(
      <MemoryRouter>
        <PokemonSearch openModal={openModal} />{" "}
        {/* Pasa openModal como una propiedad */}
      </MemoryRouter>
    );

    const searchInput = await findByPlaceholderText("Search for a Pokémon...");
    fireEvent.change(searchInput, { target: { value: "Ivy" } });

    await waitFor(() => {
      expect(getByAltText("Ivysaur")).toBeInTheDocument();
      expect(queryByAltText("Bulbasaur")).not.toBeInTheDocument();
    });
  });

  // ... puedes añadir más pruebas
});
