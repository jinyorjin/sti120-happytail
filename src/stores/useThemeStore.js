// src/stores/useThemeStore.js
import { defineStore } from "pinia"; //

const LS_KEY = "happytail:theme";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDarkMode: false,
    textSize: "md", // 'sm' | 'md' | 'lg'
  }),
  getters: {
    themeClass: (s) => (s.isDarkMode ? "theme-dark" : "theme-light"),
    textSizeClass: (s) => `text-${s.textSize}`,
  },
  actions: {
    init() {
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (typeof saved.isDarkMode === "boolean")
          this.isDarkMode = saved.isDarkMode;
        if (["sm", "md", "lg"].includes(saved.textSize))
          this.textSize = saved.textSize;
      } catch {
        // ignore parse errors
      }
    },
    _persist() {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({ isDarkMode: this.isDarkMode, textSize: this.textSize })
      );
    },
    toggleDark() {
      this.isDarkMode = !this.isDarkMode;
      this._persist();
    },
    setTextSize(size) {
      if (["sm", "md", "lg"].includes(size)) {
        this.textSize = size;
        this._persist();
      }
    },
  },
});
