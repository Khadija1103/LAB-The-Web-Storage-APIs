export async function searchPokemon(input) {
  if (!input) {
    alert("Ingrese un Pokémon");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

searchPokemon("pikachu");
