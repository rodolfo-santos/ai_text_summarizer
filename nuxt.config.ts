// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    openAIApiKey: process.env.OPEN_AI_API_KEY,
  },
});
