<template>
  <v-container>
    <!-- Search and Filter Controls -->
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field v-model="search" label="Search Pokémon" class="mb-4"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select v-model="typeFilter" :items="allTypes" label="Filter by Type" class="mb-4"></v-select>
      </v-col>
    </v-row>
    <!-- Loading Spinner -->
    <div v-if="store.pokemonLoading" class="text-center">
      <p v-if="store.pokemonError">Something went wrong... please contact @Kiddy</p>
      <p>Loading...</p>
      <v-progress-circular v-if="store.pokemonLoading" :size="70" :width="7" color="blue"
        indeterminate></v-progress-circular>
    </div>
    <!-- Pokémon Cards -->
    <div v-if="store.pokemonResult && store.pokemonResult.pokemon_v2_pokemon" class="midle w-full flex flex-wrap">
      <div v-for="pokemon in paginatedPokemon" :key="pokemon.id"
        class="card w-full sm:w-1/3 md:w-1/4 my-4 flex cursor-pointer flex-col justify-center items-center relative">
        <!-- Favorite Icon -->
        <div class="poketop shadow-xl border-white h-28 bg-light-blue-lighten-1 w-56 rounded-t-full border-8">
          <v-tooltip activator="parent" location="top">Click add/remove favorite</v-tooltip>
          <v-icon @click.stop="toggleFavorite(pokemon)" class="favorite-icon" color="red" size="large">
            {{ isFavorite(pokemon.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ snackbarMessage }}
            <template v-slot:actions>
              <v-btn color="blue" variant="text" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
        <!-- Pokémon Image and Details -->
        <div class="absolute z-10 w-full h-full flex justify-center items-center">
          <div class="bg-amber absolute pokebuttom w-10 h-10 shadow-xl border-8 border-white rounded-full"></div>
          <v-tooltip activator="parent" location="top">Click here to view details</v-tooltip>
          <img class="pokeimage rounded-full w-1/2 h-1/2" :src="pokemon.image" alt="" @click="selectPokemon(pokemon)">
        </div>
        <!-- Pokémon Name and ID -->
        <div
          class="pokebottom border-8 flex flex-col justify-center items-center border-white h-28 bg-amber shadow-xl w-56 rounded-b-full">
          <p class="text-sm text-black-400 text-capitalize">{{ pokemon.name }}</p>
          <p class="text-xs text-black-400">#{{ pokemon.id }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <v-row v-if="store.pokemonResult && store.pokemonResult.pokemon_v2_pokemon" justify="center">
      <v-col cols="12" sm="6">
        <v-pagination v-model="currentPage" :length="totalPages" class="mt-4"></v-pagination>
      </v-col>
    </v-row>

    <!-- Dialog for Detailed Pokémon View -->
    <PokemonDetail :pokemon="selectedPokemon" :dialog="dialog" @update:dialog="dialog = $event" />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonDetail from '../components/PokemonDetail.vue';

const store = usePokemonStore();
const dialog = ref(false);
const selectedPokemon = ref(null);

let snackbar = ref(false);
let snackbarMessage = '';
const timeout = 2000;

// Fetch Pokémon list on component mount
onMounted(() => {
  store.fetchPokemon();
});

// Computed properties to bind to store getters and setters
const search = computed({
  get() {
    return store.search;
  },
  set(value) {
    store.search = value;
  },
});

const typeFilter = computed({
  get() {
    return store.typeFilter;
  },
  set(value) {
    store.typeFilter = value;
  },
});

const pageSize = 8;
const currentPage = ref(1);

const filteredPokemon = computed(() => store.filteredPokemon);
const allTypes = computed(() => store.allTypes);
const isFavorite = (pokemonId) => store.isFavorite(pokemonId);

const paginatedPokemon = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredPokemon.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredPokemon.value.length / pageSize));

// Method to select a Pokémon and open dialog
const selectPokemon = (pokemon) => {
  selectedPokemon.value = pokemon;
  dialog.value = true;
};

// Method to toggle favorite status of a Pokémon
const toggleFavorite = (pokemon) => {
  store.toggleFavorite(pokemon);
  snackbar.value = true;
  snackbarMessage = snackbarMessage === 'Added to favourite' ? 'Removed from favourite' : 'Added to favourite';
};
</script>

<style scoped>

.pokemon-card {
  max-width: 500px;
  margin: auto;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.pokemon-title {
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5;
  margin-bottom: 16px;
}

.pokemon-image {
  border-radius: 50%;
  margin-bottom: 16px;
}

.pokemon-subtitle {
  font-size: 16px;
  color: #ff6347;
  margin-bottom: 16px;
}

.pokemon-info {
  font-size: 14px;
  color: #333;
  margin: 4px 0;
}

.pokemon-stats {
  margin: 16px 0;
  text-align: left;
}

.pokemon-stats h6 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.pokemon-stats ul {
  list-style-type: none;
  padding: 0;
}

.pokemon-stats li {
  font-size: 14px;
  color: #666;
}

.v-btn:first-child {
  background-color: #e0e0e0;
}

.v-btn:last-child {
  background-color: #3f51b5;
  color: #fff;
}

.v-btn:last-child:hover {
  background-color: #303f9f;
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 20;
  cursor: pointer;
}

.poketop,
.pokebottom,
.pokebuttom {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all .5s ease;
  animation: .2s ease-in;
}

.card:hover>.poketop {
  transform: perspective(1000px) translateY(-30px);
}

.card:hover>.pokebottom {
  transform: perspective(1000px) translateY(30px);
}

.card:hover .pokebuttom {
  visibility: hidden;
  height: 0;
  width: 0;
  border: 0px;
}

.card .pokeimage {
  transition: all 1s ease-out;
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.card:hover .pokeimage {
  opacity: 1;
  height: 10rem;
  -webkit-box-shadow: inset 0px 0px 50px 30px rgba(0, 0, 0, 0.69);
  box-shadow: inset 0px 0px 50px 30px rgba(0, 0, 0, 0.69);
}
</style>
