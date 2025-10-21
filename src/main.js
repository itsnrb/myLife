// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Import Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Optional: Material Design Icons (empfohlen)
import '@mdi/font/css/materialdesignicons.css'

// Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
})

// App starten
createApp(App)
  .use(vuetify)
  .mount('#app')