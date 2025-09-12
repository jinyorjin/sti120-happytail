<template>
  <footer class="footer bg-dark text-light py-4 mt-auto">
    <div class="container text-center">
      <p class="mb-1">&copy; 2025 HappyTail. All rights reserved.</p>
      <nav>
        <RouterLink to="/" class="text-light mx-2">Home</RouterLink> |
        <RouterLink to="/products" class="text-light mx-2">Products</RouterLink>
        | <RouterLink to="/tips" class="text-light mx-2">Tips</RouterLink> |
        <RouterLink to="/contact" class="text-light mx-2">Contact</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
