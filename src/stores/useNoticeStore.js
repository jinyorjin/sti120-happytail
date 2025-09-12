// src/stores/useNoticeStore.js
import { defineStore } from "pinia";

export const useNoticeStore = defineStore("notice", {
  state: () => ({
    visible: false,
    type: "info",
    message: "",
    _timer: null,
  }),
  getters: {
    cssClass: (s) => {
      const map = {
        success: "alert alert-success",
        warning: "alert alert-warning",
        danger: "alert alert-danger",
        info: "alert alert-info",
      };
      return map[s.type] || "alert alert-info";
    },
  },
  actions: {
    show(message, type = "info") {
      this.message = message;
      this.type = type;
      this.visible = true;
    },
    hide() {
      this.visible = false;
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    },
    toast(message, type = "success", ms = 1800) {
      this.show(message, type);
      if (this._timer) clearTimeout(this._timer); //
      this._timer = setTimeout(() => {
        this.hide();
      }, ms);
    },
    clear() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      this.message = "";
      this.type = "info";
      this.visible = false;
    },
  },
});
