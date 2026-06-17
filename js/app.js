import { searchPokemon } from "./funtions/searchPokemon.js";
import { saveFavorite } from "./funtions/saveFavorite.js";
import { updateFavoritesList } from "./funtions/updateFavoritesList.js";

const bntPokemon = document.getElementById('search-pokemon');
const btnSaveFavorite = document.getElementById('save-favorite');

bntPokemon.addEventListener('click', (e) => {
    searchPokemon();
});

if (btnSaveFavorite) {
    btnSaveFavorite.addEventListener('click', (e) => {
        saveFavorite();
    });
}

window.addEventListener('DOMContentLoaded', updateFavoritesList());
