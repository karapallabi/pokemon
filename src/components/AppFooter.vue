<template>
  <v-footer color="grey-lighten-2" app>
    <v-col class="text-center white--text">
      © {{ currentYear }} Pokémon
    </v-col>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';

// Define the current year using Composition API
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.v-footer {
  padding: 16px 0;
}
</style>
