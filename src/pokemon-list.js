import {getPokemonList} from "./poke-data";

const template = document.createElement("template");
template.innerHTML=`
<style>
    #list-root{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        justify-content: flex-start;    
    }
</style>
<div id="list-root"></div>
`;
class PokemonList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.root = this.shadowRoot.querySelector("#list-root");
        
    }

    connectedCallback() {
        if (this.isConnected) {
                        
            getPokemonList(15, 10).then(data => {                
                data.forEach(item=>{
                    let pokeCard = document.createElement("pokemon-card");
                    pokeCard.setAttribute("name", item.name);
                    pokeCard.setAttribute("url", item.url);

                    this.root.appendChild(pokeCard);
                })
            }).catch(e => {
                console.error(e);
            })
                        
        }
    }

    render(source){
        this.shadowRoot.innerHTML = source;
    }
}

export default PokemonList;