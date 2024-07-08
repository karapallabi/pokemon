<template>
    <v-card class="border-yellow-lighten-2 bg-brown-lighten-5">
      <v-img class="mt-3" :src="pokemon.image" aspect-ratio="1"></v-img>
      <v-card-title class="text-capitalize text-center">{{ pokemon.name }}</v-card-title>
      <p class="text-center">ID: {{ pokemon.id }}</p>
      <v-card-text>
        <v-chip class="ma-2 bg-blue-darken-2" label>
          <v-icon class="" icon="mdi-label" start></v-icon>
          Types
        </v-chip>
        <v-chip class="bg-blue-lighten-1" v-for="(type, index) in pokemon.types" :key="index">
          {{ type }}
        </v-chip>
        <br>
        <v-chip class="ma-2 bg-orange-darken-3" label>
          <v-icon icon="mdi-label" start></v-icon>
          Abilities
        </v-chip>
        <v-chip class="bg-orange-darken-1" v-for="(ability, index) in pokemon.abilities" :key="index">
          {{ ability }}
        </v-chip>
        <br>
        <v-chip class="ma-2 bg-light-green-darken-4" label>
          <v-icon icon="mdi-label" start></v-icon>
          Stats
        </v-chip>
        <v-chip class="bg-light-green-darken-1" v-for="(stat, index) in pokemon.stats" :key="index">
          {{ stat }}
        </v-chip>
      </v-card-text>
      <v-btn class="mb-4 ml-5 bg-blue-lighten-5" @click="toggleFavorite(pokemon)">
        {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
      </v-btn>
    </v-card>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { usePokemonStore } from '../store/pokemonStore';
  // Define props
  const props = defineProps({
    pokemon: Object,
  });
  // Store instance
  const store = usePokemonStore();
  
  // Computed property to check if the Pokémon is a favorite
  const isFavorite = computed(() => store.isFavorite(props.pokemon.id));
  
  // Method to toggle favorite status
  const toggleFavorite = () => {
    store.toggleFavorite(props.pokemon);
  };
  </script>
  
  