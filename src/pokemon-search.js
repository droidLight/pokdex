import searchProxy from "./searchproxy";
import {getPokemon} from "./poke-data";

class PokemonSearch extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.input = document.createElement("input");
        this.input.setAttribute("type", "text");
        this.input.setAttribute("placeholder", "Search....");
        this.input.addEventListener("keyup", this.handleClick.bind(this));

        this.shadowRoot.appendChild(this.input);
    }

    handleClick(event) {
        if (event.key === "Enter") {
            getPokemon(this.input.value)
                .then((result) => {                   
                   let p = searchProxy();
                   p.saveData = result;
                   window.dispatchEvent(new Event("storage"));
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }
    
}
export default PokemonSearch;