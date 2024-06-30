<template>
  <v-footer
    class="bg-grey-lighten-1"
    app
    padless
  >
    <v-col
      class="text-center white--text"
    >
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
