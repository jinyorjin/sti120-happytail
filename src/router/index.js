// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProductsPage from "../pages/ProductsPage.vue";
import TipsPage from "../pages/TipsPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import ContactPage from "../pages/ContactPage.vue";

const router = createRouter({
  // 해시 모드: dist/index.html을 파일로 열어도 라우팅 유지
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/products", name: "products", component: ProductsPage },
    { path: "/tips", name: "tips", component: TipsPage },
    { path: "/search", name: "search", component: SearchPage },
    { path: "/contact", name: "contact", component: ContactPage },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth" }; // 앵커 스크롤
    return { left: 0, top: 0 };
  },
});

export default router;
