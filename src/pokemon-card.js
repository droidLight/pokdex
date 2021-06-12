import searchProxy from "./searchproxy";
import getData from "./poke-data";


class PokemonCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        //style
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "public/pokecard.css");
        this.shadowRoot.appendChild(link);

        this.detailsVisible = false;
        this.pokemonName = undefined;
        this.pokemonUrl = undefined;
    }

    connectedCallback() {
        //name and rest endpoint of the pokemon
        let pokemonName = this.getAttribute("name");
        let pokemonUrl = this.getAttribute("url");

        let container = document.createElement("div");
        container.classList.add("card-container");

        let name = document.createElement("p");
        name.classList.add("pokemon-name");
        name.innerText = pokemonName;

        let detailsBtn = document.createElement("button");
        detailsBtn.classList.add("details-btn");
        detailsBtn.innerText = "Details";

        detailsBtn.addEventListener("click", function (e) {
            getData(pokemonName).then((result) => {
                let p = searchProxy();
                p.saveData = result;
                window.dispatchEvent(new Event("storage"));
            }).catch((e) => {
                console.error(e);
            });
        });

        container.appendChild(name);
        container.appendChild(detailsBtn);

        this.shadowRoot.append(container);
    }


}

export default PokemonCard;