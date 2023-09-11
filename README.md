# 🌍 Pokémon Explorer 🌟

Dive deep into the Pokémon universe with this modern web client. Built with React, TypeScript, and TailwindCSS, this application allows you to search for Pokémon by name and view in-depth details about each one.

## 🚀 Features

- 🕵️ Search for Pokémon by name.
- 🖼 Preview with Pokémon images.
- 📄 Listing of all Pokémon on the main page.
- 🌐 Integrated with the [PokéAPI](https://pokeapi.co/) for real-time data retrieval.
- 🛠 Built with React, TypeScript, and TailwindCSS.

## 🛠 Installation and Usage

1. 📦 Clone the repository:

```bash
git clone https://github.com/0x10-z/react-pokemon-client.git
cd react-pokemon-client
```

2. 🌐 Install dependencies with pnpm:

```bash
pnpm install
```

3. 🚀 Start the application:

```bash
pnpm start
```

## 🗺️ Routes

- **/**: Displays a comprehensive list of Pokémon.
- **/search/:pokemon-name**: Search based on the Pokémon's name and displays matching results.
- **/pokemon/:pokemon-name**: Displays a modal with in-depth details of the chosen Pokémon.

## 🧪 Testing

To ensure the application's quality and functionality, we've included tests. Run them with:

```bash
pnpm test
```

Make sure to review the results and ensure all tests pass.

## 👩‍💻 Contributing

Interested in contributing? Welcome aboard! Please read the [contribution guidelines](CONTRIBUTING.md) to get started.

## 🙏 Acknowledgements

Special thanks to [PokéAPI](https://pokeapi.co/) for providing the comprehensive Pokémon data and [OpenAI](https://openai.com) for guidance. And to all Pokémon fans and trainers worldwide: Gotta catch 'em all!

## TODO

- Pagination list
- Pokemon detail: https://pokeapi.co/api/v2/pokemon/1/
  - sprites.other.official-artwork-fron_default
