import searchProxy from "./searchproxy";
import {getPokemon} from "./poke-data";


class PokemonCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        //style
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "public/pokecard.css");
        this.shadowRoot.appendChild(link);        
    }

    connectedCallback() {
        //name and rest endpoint of the pokemon
        let pokemonName = this.getAttribute("name");
        let pokemonUrl = this.getAttribute("url");

        let container = document.createElement("div");
        container.classList.add("card-container");

        let name = document.createElement("p");
        name.classList.add("pokemon-name");
        name.innerText = pokemonName.charAt(0).toUpperCase()+pokemonName.substr(1).toLowerCase();
        
        this.addEventListener("click", function (e) {
            getPokemon(pokemonName).then((result) => {
                let p = searchProxy();
                p.saveData = result;
                window.dispatchEvent(new Event("storage"));
            }).catch((e) => {
                console.error(e);
            });
        });

        container.appendChild(name);

        this.shadowRoot.append(container);
    }


}

export default PokemonCard;