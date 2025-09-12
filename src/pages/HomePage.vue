<!-- src/pages/HomePage.vue -->
<template>
  <section>
    <!-- Hero section: short looping video with a soft overlay so the title stays readable -->
    <header class="hero-video-container">
      <video autoplay muted loop playsinline class="hero-video">
        <source :src="dogVideo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="hero-overlay">
        <div class="hero-content text-white text-center">
          <h1 class="display-4 fw-bold">Welcome to HappyTail!</h1>
        </div>
      </div>
    </header>

    <!-- Feature cards that deep-link to sections on the Products page -->
    <div class="container my-5">
      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <div class="card bg-light p-4 h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Quality Food</h5>
              <p class="card-text">
                Healthy and nutritious options for your pets.
              </p>
              <!-- hash (#food) scrolls to the Food section in /products -->
              <RouterLink
                :to="{ path: '/products', hash: '#food' }"
                class="btn btn-dark mt-2"
              >
                View
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card bg-light p-4 h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Fun Toys</h5>
              <p class="card-text">
                Keep your furry friends entertained all day!
              </p>
              <!-- deep-link to the Toys section -->
              <RouterLink
                :to="{ path: '/products', hash: '#toys' }"
                class="btn btn-dark mt-2"
              >
                View
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card bg-light p-4 h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Stylish Clothing</h5>
              <p class="card-text">Outfits your pets will love to wear.</p>
              <!-- deep-link to the Clothing section -->
              <RouterLink
                :to="{ path: '/products', hash: '#clothing' }"
                class="btn btn-dark mt-2"
              >
                View
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Small promo row under the features -->
    <div class="container mb-5">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card text-center bg-light">
            <div class="card-body">
              <h5 class="card-title">New Arrival</h5>
              <p class="card-text">Check out our latest pet beds!</p>
              <RouterLink to="/products" class="btn btn-dark"
                >Explore</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card text-center bg-light">
            <div class="card-body">
              <h5 class="card-title">Bestsellers</h5>
              <p class="card-text">Popular treats and toys for your pets.</p>
              <RouterLink to="/products" class="btn btn-dark"
                >See More</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card text-center bg-light">
            <div class="card-body">
              <h5 class="card-title">Pet Care Tips</h5>
              <p class="card-text">
                Learn how to groom and care for your pets.
              </p>
              <RouterLink to="/tips" class="btn btn-dark">Read Tips</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Random cute animal demo: button shows an image and triggers a toast -->
    <div class="container text-center mt-5 mb-4">
      <h3 class="mb-4 fw-semibold" style="font-family: Georgia, serif">
        Need a Smile?
      </h3>
      <button
        class="btn btn-warning rounded-pill px-4 py-2 mb-3"
        @click="showRandomAnimal"
      >
        Do you wanna see a cute animal?
      </button>

      <div v-if="showImg" class="img-wrap mt-3">
        <img
          :src="imgSrc"
          alt="Cute animal"
          class="d-block mx-auto rounded shadow-sm mb-0"
          style="max-height: 300px; max-width: 100%; height: auto"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useNoticeStore } from "../stores/useNoticeStore";

// Import video from /assets so Vite bundles it correctly for both dev and build
import dogVideo from "../assets/dogvideo.mp4";

// Load cute1~8 images at build time (filenames like cute1.jpg, cute2.jpg, ...)
// `eager: true` returns actual URLs immediately; great for a tiny demo list
const modules = import.meta.glob("../assets/cute*.{jpg,jpeg,png,gif}", {
  eager: true,
  import: "default",
});
const cuteImages = Object.values(modules);

// Local UI state for the preview image
const showImg = ref(false);
const imgSrc = ref("");

// Pinia store for banners/toasts
const notice = useNoticeStore();

/**
 * Pick a random image from the preloaded list and show it.
 * Also show a short success toast using the notice store.
 */
function showRandomAnimal() {
  // Guard: nothing to show if the list is empty
  if (cuteImages.length === 0) return;

  // Choose a random index and update the reactive src
  const i = Math.floor(Math.random() * cuteImages.length);
  imgSrc.value = cuteImages[i];
  showImg.value = true;

  // Auto-hide toast after 2 seconds
  notice.toast("Here’s a cute friend for you! 🐾", "success", 2000);
}
</script>

<style scoped>
/* Remove extra baseline gap around the image */
.img-wrap {
  line-height: 0;
}

/* Hero video takes 40% of the viewport height, crops nicely with object-fit */
.hero-video-container {
  position: relative;
  height: 40vh;
  overflow: hidden;
}
.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* fill the box and crop the sides if needed */
}

/* Semi-transparent layer on top of the video to keep text readable */
.hero-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.2);
}
</style>
