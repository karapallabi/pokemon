<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar class="bg-light-blue-darken-1" title="">
      <v-container>
        <v-img class="logo" src="@/assets/Pokémon_logo.png" alt="Logo" height="50"></v-img>
      </v-container>
      <v-btn class="mt-7 mb-6 mr-10 bg-blue-lighten-5" @click="toggleViewFavorites">
        {{ viewFavorites ? 'Back to List' : 'View Favorites' }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>

        <FavoritePokemon v-if="viewFavorites" :favorites="favorites" @remove-favorite="removeFavorite" />
        <template v-else>
          <PokemonList v-if="!selectedPokemon" @select-pokemon="viewPokemonDetails" />
          <!-- <PokemonDetail
            v-else
            :pokemon="selectedPokemon"
            :isFavorite="isFavorite(selectedPokemon)"
            @back="selectedPokemon = null"
            @toggle-favorite="toggleFavorite"
          /> -->
        </template>
      </v-container>
    </v-main>
  </v-layout>
</template>



<script>
import PokemonList from './components/PokemonList.vue';
// import PokemonDetail from './components/PokemonDetail.vue';
import FavoritePokemon from './components/FavoritePokemon.vue';
import { usePokemonStore } from './store/pokemonStore';
import { ref, computed, onMounted } from 'vue';

export default {
  components: {
    PokemonList,
    // PokemonDetail,
    FavoritePokemon
  },
  setup() {
    const store = usePokemonStore();
    const selectedPokemon = ref(null);
    const viewFavorites = ref(false);

    // Fetch Pokémon list on component mount
    onMounted(() => {
      store.fetchPokemon();
    });

    // Computed properties to bind to store getters and setters
    const favorites = computed(() => store.favoritePokemon);

    // Method to toggle view of favorites
    const toggleViewFavorites = () => {
      viewFavorites.value = !viewFavorites.value;
    };

    // Method to view Pokémon details
    const viewPokemonDetails = (pokemon) => {
      selectedPokemon.value = pokemon;
      // Optionally load more details using store actions
      // store.fetchPokemonDetails(pokemon.id);
    };

    // Method to remove a favorite Pokémon
    const removeFavorite = (pokemon) => {
      store.toggleFavorite(pokemon); // Assuming store handles favorite toggling
    };

    // Return reactive variables and methods to template
    return {
      viewFavorites,
      favorites,
      selectedPokemon,
      toggleViewFavorites,
      viewPokemonDetails,
      removeFavorite,
    };
  },
};
</script>





