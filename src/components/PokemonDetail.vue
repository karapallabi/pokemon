<template>
  
  <v-dialog :model-value="dialog" @update:model-value="closeDialog" transition="dialog-top-transition" width="auto">
    <v-card class="border-yellow-lighten-2 bg-brown-lighten-5">
    <PokemonCard v-if="pokemon" :pokemon="pokemon" />
    <v-card-actions class="justify-end">
      <v-btn class="bg-blue-lighten-5" text @click="handleClose">Close</v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
 
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import PokemonCard from '../components/PokemonCard.vue';
import { usePokemonStore } from '../store/pokemonStore';

// Define props and emits
const props = defineProps({
  pokemon: Object,
  dialog: Boolean,
});

// Define emits
const emit = defineEmits(['update:dialog']);

// Store instance
const store = usePokemonStore();

// Reactive state
const isDetailActive = ref(false);

// Methods
const closeDialog = (value) => {
  emit('update:dialog', value);
};

const handleClose = () => {
  isDetailActive.value = false;
  closeDialog(false);
};

// Watcher for dialog prop changes
watch(() => props.dialog, (newValue) => {
  if (!newValue) {
    isDetailActive.value = false;
  }
});
</script>

