import { defineStore } from "pinia";

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),
  getters: {
    count: (s) => s.items.length, // 몇 개 로드됐는지 확인용
  },
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch("/data/catalog.json");
        if (!res.ok) throw new Error("Failed to load data");
        this.items = await res.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
