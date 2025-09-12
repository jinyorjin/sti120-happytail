<template>
  <section>
    <!-- Hero / Banner -->
    <div
      class="hero text-center text-white py-5"
      style="background-color: #ffcc40"
    >
      <h1>Happy pet happy life</h1>
      <p>love</p>
    </div>

    <!-- Search Bar -->
    <div class="container my-4">
      <form class="d-flex justify-content-center gap-3" @submit.prevent>
        <input
          type="text"
          v-model="search"
          class="form-control w-50"
          placeholder="Search for pet products or tips..."
        />
        <button class="btn btn-accent" type="submit">Search</button>
      </form>
    </div>

    <!-- Category Tabs -->
    <div class="container mt-4">
      <ul class="nav justify-content-center gap-3 custom-pills">
        <li class="nav-item">
          <button type="button" class="pill-btn active">Food</button>
        </li>
        <li class="nav-item">
          <button type="button" class="pill-btn">Toys</button>
        </li>
        <li class="nav-item">
          <button type="button" class="pill-btn">Clothes</button>
        </li>
      </ul>
    </div>

    <!-- Product Cards -->
    <div class="container mt-5 mb-0">
      <div class="row justify-content-center gap-4">
        <div class="col-md-5 mb-4">
          <div class="card h-100 text-center">
            <div class="card-body">
              <img
                src="/images/petfood.png"
                class="mx-auto mb-3"
                alt="petfood icon"
                width="80"
              />
              <h5 class="card-title">Best Pet Food</h5>
              <p class="card-text">
                High-quality nutrition for your furry friend.
              </p>
              <button type="button" class="btn btn-accent me-2">Buy Now</button>
              <button
                type="button"
                class="btn btn-accent ms-2"
                data-bs-toggle="modal"
                data-bs-target="#product1Modal"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-5 mb-4">
          <div class="card h-100 text-center">
            <div class="card-body">
              <img
                src="/images/petclothes.png"
                class="mx-auto mb-3"
                alt="pet clothes"
                width="80"
              />
              <h5 class="card-title">Best Pet Clothes</h5>
              <p class="card-text">
                Stylish outfits for every pet personality.
              </p>
              <button type="button" class="btn btn-accent">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal outside section -->
  <div
    class="modal fade"
    id="product1Modal"
    tabindex="-1"
    aria-labelledby="product1ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="product1ModalLabel">Best Pet Food</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <img
            src="/images/petfood.png"
            alt="Pet Food"
            class="img-fluid mb-3"
          />
          <p>
            This premium pet food is formulated with the finest ingredients...
          </p>
          <ul>
            <li>100% natural ingredients</li>
            <li>Grain-free formula</li>
            <li>Vet recommended</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const search = ref("");
</script>

<style scoped>
/* 공통 버튼 */
.btn-accent {
  background-color: #f4b400; /* 따뜻한 노랑 */
  color: #fff;
  border-radius: 20px;
  padding: 6px 18px;
  font-weight: 500;
  border: none;
  transition: background 0.2s;
}
.btn-accent:hover {
  background-color: #e0a200;
}

/* 카테고리 탭 버튼 */
.pill-btn {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  background: #f0f0f0;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;
}
.pill-btn:hover {
  background: #e0e0e0;
}
.pill-btn.active {
  background: #f4b400; /* 노랑 */
  color: #fff;
}
</style>
