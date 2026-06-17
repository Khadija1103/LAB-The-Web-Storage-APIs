import { pokemonState } from "../singleton.js";

export async function searchPokemon() {
  const nombre = document
    .getElementById("pokemonInput")
    .value.toLowerCase()
    .trim();

  if (!nombre) {
    alert("Ingrese un nombre");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

    if (!response.ok) throw new Error();

    const data = await response.json();

    pokemonState.pokemonActual = {
      name: data.name,
      image: data.sprites.front_default,
    };

    document.getElementById("resultado").innerHTML = `
                    <h3>${pokemonState.pokemonActual.name}</h3>
                    <img src="${pokemonState.pokemonActual.image}">
                `;
  } catch {
    alert("Pokémon no encontrado");
  }
}
