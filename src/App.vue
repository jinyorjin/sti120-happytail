<!-- src/App.vue -->
<template>
  <!-- App shell: full-height column layout so the footer stays at the bottom -->
  <div
    :class="[
      'd-flex flex-column min-vh-100',
      theme.themeClass,
      theme.textSizeClass,
    ]"
  >
    <BannerBar />
    <HeaderComponent />

    <main class="flex-fill container-fluid p-0">
      <RouterView />
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import BannerBar from "./components/BannerBar.vue";
import { useThemeStore } from "./stores/useThemeStore";

const theme = useThemeStore(); // Pinia store instance
onMounted(() => theme.init()); //
</script>

<style>
:root {
  --bg: #fcedbf; /* light background */
  --fg: #efab24; /* accent text */
}
.theme-light {
  background: var(--bg);
  color: var(--fg);
}
.theme-dark {
  --bg: #b9690f8c; /* darker background */
  --fg: #834d02;
  background: var(--bg);
  color: var(--fg);
}
.text-sm {
  font-size: 0.95rem;
}
.text-md {
  font-size: 1rem;
}
.text-lg {
  font-size: 1.125rem;
}
</style>
