<template>
  <v-footer color="grey-lighten-2" app>
    <v-col class="text-center white--text">
      © {{ new Date().getFullYear() }} Pokémon
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.v-footer {
  padding: 16px 0;
}
</style>
