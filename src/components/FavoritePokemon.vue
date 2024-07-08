<template>
  <v-container>
    <v-row v-if="favorites.length > 0">
      <v-col cols="12">
        <h2>Favorite Pokémon</h2>
      </v-col>
      <v-col v-for="pokemon in favorites" :key="pokemon.id" cols="12" sm="6" md="4">
        <PokemonCard :pokemon="pokemon" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p>No favorite Pokémon added yet.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePokemonStore } from '../store/pokemonStore';
import { computed } from 'vue';
import PokemonCard from '../components/PokemonCard.vue';

// Store instance
const store = usePokemonStore();

// Computed property for fetching favorites
const favorites = computed(() => store.favoritePokemon);
</script>


