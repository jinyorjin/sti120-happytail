// src/stores/ui.js
import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    theme: "light", // 'light' | 'dark'
    textSize: "base", // 'small' | 'base' | 'large'
  }),
  getters: {
    themeClass: (s) =>
      s.theme === "dark" ? "bg-dark text-light" : "bg-white text-dark",
    textSizeClass: (s) =>
      s.textSize === "small" ? "small" : s.textSize === "large" ? "fs-5" : "",
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },
    setTextSize(size) {
      this.textSize = size;
    },
  },
});
