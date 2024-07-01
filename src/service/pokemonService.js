import axios from 'axios';
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const query = `
  query pokemon_v2 {
    pokemon_v2_pokemon {
        id
        name
        height
        pokemon_v2_pokemontypes {
            pokemon_v2_type {
                    name
                }
        }
        pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
                    name
                }
        }
        pokemon_v2_pokemonstats {
            base_stat
            effort
            pokemon_v2_stat {
                    name
                }
        }
        pokemon_v2_pokemonsprites {
            image: sprites(path: "other.dream_world.front_default"),
            altImage2: sprites(path: "other.home.front_default"),
            altImage4: sprites(path: "other.showdown.front_default"),
            altImage5: sprites(path: "other.showdown.back_default"),
            altImage6: sprites(path: "other.official-artwork.front_default")
        }
    }
}
`;

const POKEMON_QUERY = gql`
  query pokemon_v2 {
    pokemon_v2_pokemon {
        id
        name
        height
        pokemon_v2_pokemontypes {
            pokemon_v2_type {
                    name
                }
        }
        pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
                    name
                }
        }
        pokemon_v2_pokemonstats {
            base_stat
            effort
            pokemon_v2_stat {
                    name
                }
        }
        pokemon_v2_pokemonsprites {
            image: sprites(path: "other.dream_world.front_default"),
            altImage2: sprites(path: "other.home.front_default"),
            altImage4: sprites(path: "other.showdown.front_default"),
            altImage5: sprites(path: "other.showdown.back_default"),
            altImage6: sprites(path: "other.official-artwork.front_default")
        }
    }
}
`;




export async function fetchPokemonData() {
    const response = await axios.post('https://beta.pokeapi.co/graphql/v1beta', { query });
    console.log(response);
    return response.data;
}

export async function fetchPokemons() {
    const { result, loading, error } = useQuery(POKEMON_QUERY);
    return {
        result,
        loading,
        error
    }
}

function flattenNamesObject(arrayName, tagName) {
    return arrayName.reduce((finalList, currentObject) => {
        finalList.push(currentObject[tagName].name);
        return finalList;
    }, []);
}

export function getPokemonDetail(pokemonList) {
    return pokemonList.map(
        ({
            id,
            name,
            pokemon_v2_pokemontypes,
            pokemon_v2_pokemonabilities,
            pokemon_v2_pokemonstats,
            pokemon_v2_pokemonsprites
        }) => {
            return {
                id: id,
                name: name,
                types: flattenNamesObject(pokemon_v2_pokemontypes, 'pokemon_v2_type'),
                abilities: flattenNamesObject(pokemon_v2_pokemonabilities, 'pokemon_v2_ability'),
                stats: flattenNamesObject(pokemon_v2_pokemonstats, 'pokemon_v2_stat'),
                image: pokemon_v2_pokemonsprites[0].image
                    || pokemon_v2_pokemonsprites[0].altImage2
                    || pokemon_v2_pokemonsprites[0].altImage4
                    || pokemon_v2_pokemonsprites[0].altImage6
                    || "@/assets/ImagePlaceholder.png"
            }
        }
    );
}
