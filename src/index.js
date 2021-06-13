import "../public/style.css";

import PokemonList from "./pokemon-list";
import PokemonCard from "./pokemon-card";
import PokemonDetail from "./pokemon-detail";
import PokemonSearch from "./pokemon-search";


customElements.define("pokemon-list", PokemonList);
customElements.define("pokemon-card", PokemonCard);
customElements.define("pokemon-detail", PokemonDetail);
customElements.define("pokemon-search", PokemonSearch);