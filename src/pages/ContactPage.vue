<template>
  <div>
    <!-- Page hero -->
    <div
      class="hero text-center text-dark py-4"
      style="background-color: #ffcc40"
    >
      <h1 class="m-0">Contact Us</h1>
    </div>

    <!-- Contact options -->
    <div class="container my-5">
      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <div class="card p-3 h-100">
            <img
              src="/images/email.png"
              class="mx-auto mb-3"
              alt="Email icon"
              width="80"
            />
            <h5>Email Us</h5>
            <p>happytail@gmail.com</p>
            <a href="mailto:happytail@gmail.com" class="btn btn-outline-primary"
              >Click to send email</a
            >
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card p-3 h-100">
            <img
              src="/images/call.png"
              class="mx-auto mb-3"
              alt="Phone icon"
              width="80"
            />
            <h5>Call Us</h5>
            <p>+61 1234 5678</p>
            <a href="tel:+6112345678" class="btn btn-outline-primary"
              >Call Now</a
            >
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card p-3 h-100">
            <img
              src="/images/feedback.png"
              class="mx-auto mb-3"
              alt="Feedback icon"
              width="80"
            />
            <h5>Feedback</h5>
            <p>We value your feedback.</p>
            <a href="#feedback-form" class="btn btn-outline-primary"
              >Give Feedback</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Contact form -->
    <section class="container mb-0 pb-0" id="feedback-form">
      <h3 class="text-center mb-4">Pet Care Q&A / Feedback Form</h3>

      <form @submit.prevent="onSubmit" novalidate>
        <!-- Name -->
        <div class="mb-3">
          <label for="name" class="form-label">Your Name *</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model.trim="name"
          />
          <div class="text-danger small" v-if="errors.name">
            {{ errors.name }}
          </div>
        </div>

        <!-- Contact preference -->
        <fieldset class="mb-3">
          <legend class="form-label mb-1">Contact preference *</legend>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              value="email"
              v-model="preference"
              id="prefEmail"
            />
            <label class="form-check-label" for="prefEmail">Email</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              value="phone"
              v-model="preference"
              id="prefPhone"
            />
            <label class="form-check-label" for="prefPhone">Phone</label>
          </div>
          <div class="text-danger small" v-if="errors.preference">
            {{ errors.preference }}
          </div>
        </fieldset>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model.trim="email"
            :disabled="preference !== 'email'"
          />
          <div class="text-danger small" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>

        <!-- Phone -->
        <div class="mb-3">
          <label for="phone" class="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            class="form-control"
            v-model.trim="phone"
            :disabled="preference !== 'phone'"
          />
          <div class="text-danger small" v-if="errors.phone">
            {{ errors.phone }}
          </div>
        </div>

        <!-- Message -->
        <div class="mb-3">
          <label for="message" class="form-label">Message (optional)</label>
          <textarea
            id="message"
            rows="4"
            class="form-control"
            v-model.trim="message"
          ></textarea>
        </div>

        <!-- Country -->
        <div class="mb-3">
          <label for="country" class="form-label">Country *</label>
          <select id="country" class="form-select" v-model="country">
            <option disabled value="">-- choose --</option>
            <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
          </select>
          <div class="text-danger small" v-if="errors.country">
            {{ errors.country }}
          </div>
        </div>

        <!-- Age -->
        <div class="mb-3">
          <label for="age" class="form-label">Age *</label>
          <input
            type="number"
            id="age"
            class="form-control"
            v-model.number="age"
            min="1"
            step="1"
          />
          <div class="text-danger small" v-if="errors.age">
            {{ errors.age }}
          </div>
        </div>

        <!-- Subscribe -->
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="subscribe"
            v-model="subscribe"
          />
          <label class="form-check-label" for="subscribe"
            >Subscribe to newsletter *</label
          >
          <div class="text-danger small" v-if="errors.subscribe">
            {{ errors.subscribe }}
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary mb-4"
          :disabled="submitting"
        >
          Submit
        </button>
        <span class="ms-3 text-success fw-semibold" v-if="success"
          >Submitted successfully!</span
        >
      </form>

      <!-- Submitted preview -->
      <div class="card mt-4" v-if="ack">
        <div class="card-body">
          <h5 class="card-title">Customer Acknowledgement</h5>
          <ul class="mb-0">
            <li><strong>Name:</strong> {{ ack.name }}</li>
            <li><strong>Email:</strong> {{ ack.email }}</li>
            <li><strong>Phone:</strong> {{ ack.phone }}</li>
            <li><strong>Preference:</strong> {{ ack.preference }}</li>
            <li><strong>Country:</strong> {{ ack.country }}</li>
            <li><strong>Age:</strong> {{ ack.age }}</li>
            <li>
              <strong>Newsletter:</strong>
              {{ ack.subscribe ? "Subscribed" : "Not subscribed" }}
            </li>
            <li><strong>Message:</strong> {{ ack.message }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFormStore } from "../stores/useFormStore";
import { useNoticeStore } from "../stores/useNoticeStore";

const form = useFormStore();
const notice = useNoticeStore();


const name = computed({
  get: () => form.name,
  set: (v) => form.setField("name", v),
});
const email = computed({
  get: () => form.email,
  set: (v) => form.setField("email", v),
});
const phone = computed({
  get: () => form.phone,
  set: (v) => form.setField("phone", v),
});
const message = computed({
  get: () => form.message,
  set: (v) => form.setField("message", v),
});
const country = computed({
  get: () => form.country,
  set: (v) => form.setField("country", v),
});
const age = computed({
  get: () => form.age,
  set: (v) => form.setField("age", v),
});
const subscribe = computed({
  get: () => form.subscribe,
  set: (v) => form.setField("subscribe", v),
});
const preference = computed({
  get: () => form.preference,
  set: (v) => form.setField("preference", v),
});

const errors = computed(() => form.errors);
const success = computed(() => form.success);
const submitting = computed(() => form.submitting);
const ack = computed(() => form.ack);

const countries = [
  "Australia",
  "New Zealand",
  "South Korea",
  "Japan",
  "United States",
  "Canada",
];

function onSubmit() {
  const ok = form.submit();
  if (!ok) {
    notice.show("Please fix the errors and try again.", "warning");
    return;
  }
  notice.toast("Submitted successfully!", "success", 1200);

  setTimeout(() => {
    form.submitting = false;
    form.success = false;
    form.reset();
  }, 2000);
}
</script>

<style scoped>
.hero h1 {
  letter-spacing: 0.2px;
}
</style>
