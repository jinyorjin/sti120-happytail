<!-- src/components/BannerBar.vue -->
<template>
  <transition name="fade">
    <div
      v-if="banner.visible"
      :class="[
        banner.cssClass,
        'rounded-0',
        'mb-0',
        'w-100',
        'py-2',
        'notice-sticky',
      ]"
      role="alert"
    >
      <div class="container d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-2">
          <span class="fw-semibold text-uppercase small">{{
            banner.type
          }}</span>
          <span>{{ banner.message }}</span>
        </div>
        <button class="btn btn-sm btn-outline-dark" @click="banner.hide()">
          Close
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useNoticeStore } from "../stores/useNoticeStore";
const banner = useNoticeStore();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 상단 고정 (히어로 비디오 위로) */
.notice-sticky {
  position: sticky;
  top: 0;
  z-index: 1040;
}
</style>
