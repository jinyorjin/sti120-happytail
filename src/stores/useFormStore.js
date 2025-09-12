// src/stores/useFormStore.js
import { defineStore } from "pinia";

/**
 * Centralised form state for the Contact page.
 * - Keeps all input values, errors, and submit status in one place.
 * - The component uses computed proxies to read/write fields via setField().
 * - After a successful submit, we keep an immutable snapshot in `ack`.
 */
const DEFAULTS = {
  name: "Default Name",
  email: "",
  phone: "",
  message: "",
  country: "",
  age: 18,
  subscribe: false,
  preference: "", // 'email' | 'phone'
};

export const useFormStore = defineStore("form", {
  state: () => ({
    // Current form values (start from DEFAULTS)
    ...DEFAULTS,

    // Per-field validation messages (empty string means “no error”)
    errors: {
      name: "",
      email: "",
      phone: "",
      country: "",
      age: "",
      subscribe: "",
      preference: "",
    },

    // Submit status flags
    submitting: false,
    success: false,

    // Last successful submission (shown as an acknowledgement preview)
    ack: null,
  }),

  getters: {
    // Convenience flags derived from preference
    isEmailPreferred: (s) => s.preference === "email",
    isPhonePreferred: (s) => s.preference === "phone",

    // Live character count for the message box
    messageCharCount: (s) => s.message.length,

    // How many fields currently have an error message
    errorsCount: (s) => Object.values(s.errors).filter(Boolean).length,

    // True when all error strings are empty
    isValid(s) {
      return Object.values(s.errors).every((v) => !v);
    },

    // Small human-readable label for the ack card title
    ackSummary: (s) =>
      s.ack
        ? `${s.ack.name} (${
            s.ack.preference === "email" ? s.ack.email : s.ack.phone
          })`
        : "",
  },

  actions: {
    /**
     * Generic setter used by v-model proxies in the component.
     * Example: this.setField('name', 'Eunjin')
     */
    setField(key, value) {
      if (key in this) this[key] = value;
    },

    /**
     * Validate all fields and populate `errors`.
     * Returns the boolean getter `isValid`.
     */
    validate() {
      // Name: required, 3–50 chars, only letters + spaces
      this.errors.name = /^[A-Za-z\s]{3,50}$/.test(this.name)
        ? ""
        : "Enter a valid name (3–50 letters only).";

      // Preference: must choose email or phone
      this.errors.preference = this.preference
        ? ""
        : "Choose contact preference.";

      // Country: required
      this.errors.country = this.country ? "" : "Country is required.";

      // Age: must be positive number
      this.errors.age =
        Number(this.age) > 0 ? "" : "Enter a valid positive age.";

      // Subscribe: required
      this.errors.subscribe = this.subscribe ? "" : "You must subscribe.";

      // Conditional validation
      if (this.preference === "email") {
        // Strong email regex (blocks @., bad domains, etc.)
        const emailPattern =
          /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+(?:\.[A-Za-z0-9._%+-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z]{2,})+$/;
        this.errors.email = emailPattern.test(this.email)
          ? ""
          : "Enter a valid email address.";
        this.errors.phone = "";
      } else if (this.preference === "phone") {
        // Must start with 0 and be exactly 10 digits
        this.errors.phone = /^0\d{9}$/.test(this.phone)
          ? ""
          : "Phone must start with 0 and be 10 digits.";
        this.errors.email = "";
      } else {
        // If no preference yet
        this.errors.email = "";
        this.errors.phone = "";
      }

      return this.isValid;
    },

    /**
     * Validate and, if valid, mark as submitted and store a snapshot in `ack`.
     * Returns true on success, false if validation failed.
     */
    submit() {
      if (!this.validate()) return false;
      this.submitting = true;
      this.success = true;

      // Immutable snapshot for the acknowledgement card
      this.ack = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message,
        country: this.country,
        age: this.age,
        subscribe: this.subscribe,
        preference: this.preference,
      };
      return true;
    },

    /**
     * Reset the form back to defaults and clear errors/status.
     * Note: we deliberately keep `ack` (assignment requires the preview to remain).
     */
    reset() {
      Object.assign(this, { ...DEFAULTS });
      Object.keys(this.errors).forEach((k) => (this.errors[k] = ""));
      this.submitting = false;
      this.success = false;
      // `ack` is preserved
    },

    /**
     * Helper used by the page: submit, then after a delay reset inputs only.
     * `ack` remains visible so users can review their submission.
     */
    async submitWithDelayReset(delayMs = 2000) {
      const ok = this.submit();
      if (!ok) return false;
      setTimeout(() => {
        this.submitting = false;
        this.success = false;
        this.reset(); // keeps `ack`
      }, delayMs);
      return true;
    },
  },
});
