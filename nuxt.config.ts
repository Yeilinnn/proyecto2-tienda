export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Tono & Cuerda – Instrumentos musicales',
      htmlAttrs: { lang: 'es' }
    }
  }
})
