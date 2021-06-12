class PokemonList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "public/pokelist.css");        
        this.shadowRoot.appendChild(link);

        this.root = document.createElement("div");
        this.root.id = "list-root";
        
        this.shadowRoot.appendChild(this.root);
    }

    connectedCallback() {
        if (this.isConnected) {
                        
            this.getData().then(data => {                
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

    async getData() {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=20");
        let jsonData = await response.json();
        return jsonData.results;
    }

    render(source){
        this.shadowRoot.innerHTML = source;
    }
}

export default PokemonList;