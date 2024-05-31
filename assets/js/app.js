const pokemonCount = 251;
let pokedex = {};

window.onload = async () => {

    // remove dummy list
    let listDiv = document.getElementById("pokemon-list");
    while (listDiv.firstChild) {
        listDiv.firstChild.remove();
    };

    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);

        let pokemonElement = document.createElement("div");
        pokemonElement.id = i;
        pokemonElement.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemonElement.classList.add("pokemon-name");
        pokemonElement.addEventListener('click', () => refreshPokemon(i));

        listDiv.append(pokemonElement);
    };

    // document.getElementById("pokemon-description").innerText = pokedex[1]["description"];
};

const getPokemon = async (num) => {
    let url = 
        "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    try {

        let res = await fetch(url);
        let pokemonData = await res.json();

        let pokemonName = pokemonData["name"];
        let pokemonType = pokemonData["types"];
        let pokemonImg = pokemonData["sprites"]["front_default"];

        res = await fetch(pokemonData["species"]["url"]);
        let pokemonDescData = await res.json();
        pokemonDesc = pokemonDescData["flavor_text_entries"][9]["flavor_text"];

        pokedex[num] = 
            {
                "name" : pokemonName, 
                "img" : pokemonImg, 
                "types" : pokemonType, 
                "description" : pokemonDesc
            };

    } catch (error) {
        console.error(`Error fetching or parsing Pokemon data: ${error}`);
    };
};

const refreshPokemon = (id) => {
    document.getElementById("pokemon-img").src = pokedex[id]["img"];
    document.getElementById("pokemon-description").innerText = pokedex[id]["description"];

    // remove dummy types
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    };

    let types = pokedex[id]["types"];
    types.forEach(typeInfo => {
        let typeElement = document.createElement("span");
        typeElement.innerText = typeInfo["type"]["name"].toUpperCase();
        typeElement.classList.add("type-box");
        typeElement.classList.add(typeInfo["type"]["name"]);
        typesDiv.append(typeElement);       
    });
};