import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonSearch from "./components/PokemonSearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/q/:searchQuery" element={<PokemonSearch />} />

        <Route path="/" element={<PokemonSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
