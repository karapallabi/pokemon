<template>
  <v-container>
    <v-row v-if="favorites.length > 0">
      <v-col cols="12">
        <h2>Favorite Pokémon</h2>
      </v-col>
      <v-col v-for="pokemon in favorites" :key="pokemon.id" cols="12" sm="6" md="4">
        <v-card class="border-yellow-lighten-2 bg-brown-lighten-5">
          <v-img class="mt-3" :src="pokemon.image" aspect-ratio="1"></v-img>
          <v-card-title>{{ pokemon.name }}</v-card-title>
          <v-card-subtitle>ID: {{ pokemon.id }}</v-card-subtitle>
          <v-card-text>
            <v-chip class="ma-2 bg-blue-darken-2 "  label>
              <v-icon class=""icon="mdi-label" start></v-icon>
              Types </v-chip>
            <v-chip class="bg-blue-lighten-1" v-for="(type, index) in pokemon.types" :key="index" >
              {{ type }}
            </v-chip>

            <br>
            <v-chip class="ma-2 bg-orange-darken-3" label>
              <v-icon icon="mdi-label" start></v-icon>
              Abilities </v-chip>
            <v-chip class="bg-orange-darken-1" v-for="(ability, index) in pokemon.abilities" :key="index">
              {{ ability }}
            </v-chip>
            <br>
            <v-chip class="ma-2 bg-light-green-darken-4" label>
              <v-icon icon="mdi-label" start></v-icon>
              Stats </v-chip>
            <v-chip class="bg-light-green-darken-1" v-for="(stat, index) in pokemon.stats" :key="index"  >
              {{ stat }}
            </v-chip>
            </v-card-text>
          
           
          <v-btn class="mb-4 ml-5 bg-blue-lighten-5" @click="toggleFavorite(pokemon)">Remove from Favorites</v-btn>

        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <p>No favorite Pokémon added yet.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { usePokemonStore } from '../store/pokemonStore';
import { computed } from 'vue';

export default {
  setup() {
    const store = usePokemonStore();
    const favorites = computed(() => store.favoritePokemon);
    const toggleFavorite = (pokemon) => {
      store.toggleFavorite(pokemon);
    };

    return {
      favorites,
      toggleFavorite,
    };
  },
};
</script>
