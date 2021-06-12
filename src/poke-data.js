async function getData(name) {
    let result = undefined;
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
        let jsonData = await response.json();
        let types = [];
        jsonData.types.forEach(element => {
            types.push(element.type.name);
        });
        let data = {
            name: jsonData.name,
            image: jsonData.sprites.front_default,
            weight: jsonData.weight,
            experience: jsonData.base_experience,
            height: jsonData.height,
            types: types,
        };
        result = data;
    } catch (e) {
        console.error(e);
    }
    return result;
}

export default getData;