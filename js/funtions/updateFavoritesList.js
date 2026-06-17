export function updateFavoritesList() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const contenedor = document.getElementById("favoritos");

    contenedor.innerHTML = "";

    favoritos.forEach(pokemon => {
        const div = document.createElement("div");
        div.classList.add("favorito");

        div.innerHTML = `
            <h5>${pokemon.name}</h5>
            <img src="${pokemon.image}">
        `;

        contenedor.appendChild(div);
    });
}
