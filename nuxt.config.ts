// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    serverSecret:
      "Swq4j1hpNBVFrOU2mSYYOpU02o7zO5gOTlTJUZtviih6ONydtKCv8jLHAMBW",
    geminiKey: "AIzaSyAr6VKD2SkeXw4nffjA3a74_jTgTi88niY",
    apiBase: "http://localhost:8000/api",
  },
});
