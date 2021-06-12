import searchProxy from "./searchproxy"

class PokemonDetail extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "public/pokedetail.css");
        this.shadowRoot.appendChild(link);

        let root = document.createElement("div");
        root.id = "detail-root";
        this.img = document.createElement("img");
        this.name = document.createElement("p");
        this.types = document.createElement("p");
        this.experience = document.createElement("p");
        this.height = document.createElement("p");

        root.appendChild(this.img);
        root.appendChild(this.name);
        root.appendChild(this.types);
        root.appendChild(this.experience);
        root.appendChild(this.height);
        this.shadowRoot.appendChild(root);

        window.addEventListener('storage', this.handler.bind(this));
    }

    handler(e) {

        let proxy = searchProxy();
        let data = proxy.getData;
        if (data.status === "ok") {
            this.img.setAttribute("src", data.image);
            this.name.innerText = data.name;
            this.types.innerText = data.types.join(", ");
            this.experience.innerText = data.experience;
            this.height.innerText = data.height;
        } else {

        }
    }

}

export default PokemonDetail;