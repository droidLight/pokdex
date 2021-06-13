import searchProxy from "./searchproxy";
import {getPokemon} from "./poke-data";

const template = document.createElement("template");
template.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.pokemon-name{
    font-size: 24px;   
    color: black;
    font-family: 'Roboto', sans-serif;
}

.card-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 16px;
    border-radius: 15px;
    margin: 8px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);    
    background-color: rgba(100,183,194,255);
    cursor: pointer;
}

.details-btn{
    background-color: rgba(61,50,53,255);
    text-decoration: none;
    display: inline-block;
    border: none;
    padding: 8px 16px;
}
</style>
`;

class PokemonCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
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