<template v-slot:default="{ isDetailActive }">
  <v-dialog :model-value="dialog" @update:model-value="closeDialog" transition="dialog-top-transition" width="auto">
    <v-card v-if="pokemon" class="border-yellow-lighten-2 bg-brown-lighten-5">
      <v-img class="mt-3" :src="pokemon.image" aspect-ratio="1"></v-img>
      <v-card-title class="text-capitalize text-center">{{ pokemon.name }}</v-card-title>
      <p class="text-center">ID: {{ pokemon.id }}</p>
      <v-card-text>
        <v-chip class="ma-2 bg-blue-darken-2" label>
          <v-icon icon="mdi-label" start></v-icon>
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
      <v-card-actions class="justify-end">
        <v-btn class="bg-blue-lighten-5" text @click="handleClose">Close</v-btn>
        <v-btn class="bg-blue-lighten-5" @click="toggleFavorite">
          {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch, toRefs } from 'vue';
import { usePokemonStore } from '../store/pokemonStore';

const props = defineProps({
  pokemon: Object,
  dialog: Boolean,
});

const emit = defineEmits(['update:dialog']);

const { pokemon, dialog } = toRefs(props);
const store = usePokemonStore();
const isFavorite = computed(() => store.isFavorite(pokemon.value.id));
const isDetailActive = ref(false);

const toggleFavorite = () => {
  store.toggleFavorite(pokemon.value);
};

const closeDialog = (value) => {
  emit('update:dialog', value);
};

const handleClose = () => {
  isDetailActive.value = false;
  closeDialog(false);
};

watch(dialog, (newValue) => {
  if (!newValue) {
    isDetailActive.value = false;
  }
});
</script>
