import { updateFavoritesList } from "./updateFavoritesList.js";
import { pokemonState } from "../singleton.js";

export function saveFavorite() {
    if (!pokemonState.pokemonActual) {
        alert("Primero busca un Pokémon");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const existe = favoritos.some(p => p.name === pokemonState.pokemonActual.name);

    if (!existe) {
        favoritos.push(pokemonState.pokemonActual);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        updateFavoritesList();
    } else {
        alert("Ya está en favoritos");
    }
}
