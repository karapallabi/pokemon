import { defineStore } from 'pinia';
import { fetchPokemonData, fetchPokemons, getPokemonDetail } from '../service/pokemonService';
import { watch } from 'vue'

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        pokemonList: [],
        // this holds the value of the array pokemon_v2_pokemon from GQL
        favorites: [],
        search: '',
        typeFilter: '',
        //
        pokemonResult: '',
        pokemonLoading: '',
        pokemonError: ''
    }),
    //
    //
    getters: {
        allTypes(state) {
            const types = new Set();
            state.pokemonList.forEach(pokemon => {
                pokemon.types.forEach(type => {
                    types.add(type);
                });
            });
            return Array.from(types);
        },
        filteredPokemon(state) {
            let filtered = getPokemonDetail(state.pokemonResult.pokemon_v2_pokemon);

            if (state.search.trim() !== '') {
                const query = state.search.trim().toLowerCase();
                filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(query));
            }

            if (state.typeFilter !== '') {
                filtered = filtered.filter(pokemon => pokemon.types.includes(state.typeFilter));
            }

            return filtered;
        },
        favoritePokemon(state) {
            return state.pokemonList.filter(pokemon => state.favorites.includes(pokemon.id));
        },
        isFavorite: (state) => (pokemonId) => {
            return state.favorites.includes(pokemonId);
        },
    },
    //
    //
    actions: {
        async fetchPokemon() {
            const { result, loading, error } = await fetchPokemons();
            this.pokemonResult = result;
            this.pokemonLoading = loading;
            this.pokemonError = error;
            watch(result, value => {
                this.pokemonList = getPokemonDetail(value.pokemon_v2_pokemon);
            })
        },
        toggleFavorite(pokemon) {
            const index = this.favorites.indexOf(pokemon.id);
            if (index > -1) {
                this.favorites.splice(index, 1);
            } else {
                this.favorites.push(pokemon.id);
            }
        },
    },
});
