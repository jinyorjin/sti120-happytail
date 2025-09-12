<!-- src/components/HeaderComponent.vue -->
<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">HappyTail</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarNav" class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">Products</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/tips">Tips</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/search">Search</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
          </li>
        </ul>

        <!-- UI 컨트롤 -->

        <div class="d-flex align-items-center ms-3 gap-2">
          +
          <button
            class="btn btn-outline-secondary btn-sm"
            @click="theme.toggleDark()"
          >
            {{ theme.isDark ? "Light" : "Dark" }} +
          </button>

          <select
            class="form-select form-select-sm w-auto"
            v-model="theme.textSize"
          >
            <option value="sm">A-</option>

            <option value="md">A</option>

            <option value="lg">A+</option>
          </select>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useThemeStore } from "../stores/useThemeStore";
const theme = useThemeStore();
</script>
