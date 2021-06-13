import searchProxy from "./searchproxy"

const template = document.createElement("template");
template.innerHTML = `
<style>
#detail-root{
    clip-path: polygon(0 0, 100% 0, 100% 20%, 100% 80%, 100% 100%, 19% 100%, 0 78%, 0% 20%);
    background-color: rgba(239,244,214,255);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-radius: 10px;
    padding: 16px;    
}
</style>
<div id="detail-root"></div>
`;

class PokemonDetail extends HTMLElement {



    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        let root = this.shadowRoot.querySelector("#detail-root");

        this.img = document.createElement("img");
        this.img.setAttribute("width", "150px");
        this.img.setAttribute("height", "150px");
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
        window.dispatchEvent(new Event("storage"));
    }

    handler(e) {

        let proxy = searchProxy();
        let data = proxy.getData;
        if (data.status === "ok") {
            this.img.setAttribute("src", data.image);
            this.name.innerText = "Name: " + this.toTitleCase(data.name);
            this.types.innerText = "Type: " + data.types.map(this.toTitleCase).join(", ");
            this.experience.innerText = "Experience: " + data.experience;
            this.height.innerText = "Height: " + data.height;
        } else {
            alert("No pokemon found");
        }
    }

    toTitleCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    }
}

export default PokemonDetail;