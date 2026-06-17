const KEY = "favoritos";

export function getFavorites() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveFavorite(pokemon) {
    const favoritos = getFavorites();

    const existe = favoritos.some(
        p => p.name === pokemon.name
    );

    if (existe) {
        throw new Error("Ya está en favoritos");
    }

    favoritos.push(pokemon);

    localStorage.setItem(
        KEY,
        JSON.stringify(favoritos)
    );
}