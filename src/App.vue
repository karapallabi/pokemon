<template>
  <v-app>
    <v-app-bar app fixed color="light-blue-darken-1">
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
        </template>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import PokemonList from './components/PokemonList.vue';
import PokemonDetail from './components/PokemonDetail.vue';
import FavoritePokemon from './components/FavoritePokemon.vue';
import AppFooter from './components/AppFooter.vue';
import { usePokemonStore } from './store/pokemonStore';
import { ref, computed, onMounted } from 'vue';

export default {
  components: {
    PokemonList,
    PokemonDetail,
    FavoritePokemon,
    AppFooter,
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
    };

    // Method to remove a favorite Pokémon
    const removeFavorite = (pokemon) => {
      store.toggleFavorite(pokemon); // 
    };


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
<style>
.v-main {
  padding-top: 64px;
  padding-bottom: 64px; 
}
</style>
