// @ts-nocheck
/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
// import { registerPlugins } from '@/plugins'

// // Components
// import App from './App.vue'

// // Composables
// import { createApp } from 'vue'
// import '@/assets/css/tailwind.css';

// const app = createApp(App)

// registerPlugins(app)

// app.mount('#app')
import { createApp, provide, h } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import '@/assets/css/tailwind.css';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
loadFonts();


import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  cache,
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
})


const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
  })
  
const pinia = createPinia();

app.use(pinia);
app.use(vuetify);
app.mount('#app');

