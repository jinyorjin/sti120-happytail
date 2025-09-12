import { createApp } from "vue";
import { createPinia } from "pinia"; // Pinia = Vue’s state manager (shared app data)
import App from "./App.vue";
import router from "./router"; // Vue Router = client-side navigation (switch pages without reload)

const app = createApp(App);

// Create one Pinia instance for the whole app.
// Install Pinia BEFORE anything that might use a store (components, router guards, etc.).
const pinia = createPinia();
app.use(pinia);

// Install the router so <RouterView> and <RouterLink> work.
// In this project the router uses hash mode, so it also runs from a plain dist/index.html.
app.use(router);

// Mount the app into the #app element in index.html.
app.mount("#app");
