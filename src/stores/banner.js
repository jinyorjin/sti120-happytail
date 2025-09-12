// src/stores/banner.js
import { defineStore } from "pinia";

export const useBannerStore = defineStore("banner", {
  state: () => ({
    visible: false, // 배너 표시 여부
    type: "info", // 'info' | 'success' | 'warning' | 'danger'
    message: "Welcome to HappyTail! Enjoy free shipping this week.", // 배너 문구
  }),
  getters: {
    // 부트스트랩 클래스 매핑 (getter)
    cssClass: (s) => {
      const map = {
        info: "alert-info",
        success: "alert-success",
        warning: "alert-warning",
        danger: "alert-danger",
      };
      return `alert ${map[s.type] || map.info} mb-0 rounded-0`;
    },
  },
  actions: {
    // 배너 보이기
    show(msg, t = "info") {
      if (msg) this.message = msg;
      this.type = t;
      this.visible = true;
    },
    // 배너 숨기기
    hide() {
      this.visible = false;
    },
    // 토글 + 타입/메시지 지정 가능
    toggle(msg, t = "info") {
      if (msg) this.message = msg;
      this.type = t;
      this.visible = !this.visible;
    },
    // 메시지/타입만 교체
    set(message, t = "info") {
      this.message = message;
      this.type = t;
    },
  },
});
