<!-- src/pages/SearchPage.vue -->
<template>
  <section>
    <!-- Hero Banner -->
    <div
      class="hero text-center text-white py-5"
      style="background-color: #ffcc40"
    >
      <h1>Happy pet happy life</h1>
      <p>love</p>
    </div>

    <!-- Search Bar -->
    <div class="container my-4">
      <form class="d-flex justify-content-center" @submit.prevent="onSearch">
        <input
          type="text"
          v-model="query"
          class="form-control w-50"
          placeholder="Search for pet products or tips..."
        />
        <button class="btn btn-primary ms-2" type="submit">Search</button>
        <button
          class="btn btn-outline-secondary ms-2"
          type="button"
          @click="onReset"
        >
          Reset
        </button>
      </form>
    </div>

    <!-- Results -->
    <div class="container my-5">
      <h3 class="text-center mb-4" style="font-family: cursive">
        Search Result
      </h3>

      <!-- 로딩/에러 처리 -->
      <p v-if="catalog.loading" class="text-center text-muted">Loading...</p>
      <p v-else-if="catalog.error" class="text-center text-danger">
        {{ catalog.error }}
      </p>

      <!-- 검색 결과 -->
      <div v-else-if="filteredResults.length" class="row">
        <div
          v-for="(item, i) in filteredResults"
          :key="i"
          class="col-md-4 mb-4"
        >
          <div class="card h-100">
            <img
              :src="item.img"
              class="card-img-top search-img"
              :alt="item.title"
            />
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-center text-muted">No results found.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCatalogStore } from "../stores/useCatalogStore";

const query = ref("");
const term = ref("");
const catalog = useCatalogStore();

onMounted(() => {
  catalog.fetchData();
});

const onSearch = () => {
  term.value = query.value.trim();
};
const onReset = () => {
  query.value = "";
  term.value = "";
};

const filteredResults = computed(() => {
  if (!term.value) return catalog.items;
  const t = term.value.toLowerCase();
  return catalog.items.filter(
    (item) =>
      item.title.toLowerCase().includes(t) ||
      item.text.toLowerCase().includes(t)
  );
});
</script>

<style scoped>
.search-img {
  height: 300px;
  object-fit: cover;
}
</style>
