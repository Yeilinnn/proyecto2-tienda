<script setup>
const router = useRouter()
const q = ref('')

function buscar() {
  const term = q.value.trim()
  if (!term) return
  router.push({ path: '/buscar', query: { q: term } })
}

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css' }
  ],
  script: [
    { src: 'https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js', defer: true }
  ]
})
</script>

<template>
  <div class="site">
    <header class="site-header">
      <div class="header-inner">
        <NuxtLink to="/" class="brand">🎵 Tono &amp; Cuerda</NuxtLink>

        <form class="search" @submit.prevent="buscar">
          <input v-model="q" type="search" placeholder="Buscar instrumentos…" aria-label="Buscar" />
          <button type="submit">Buscar</button>
        </form>

        <nav class="nav">
          <NuxtLink to="/">Categorías</NuxtLink>
          <a href="#" class="snipcart-checkout cart-link">
            🛒 Carrito (<span class="snipcart-items-count">0</span>)
          </a>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <NuxtPage />
    </main>

    <footer class="site-footer">
      <p>Tono &amp; Cuerda · Proyecto 2 · Arquitectura de Información</p>
    </footer>

    <!-- Snipcart: reemplace el valor de data-api-key por su Public API key -->
    <div
      id="snipcart"
      hidden
      data-api-key="YWIxZjFhNTMtNjYxMS00YzJiLTg0NmEtYmRlM2I2NTE5YTA1NjM5Mjk4Mjk4MTI3Mjk4MTI0"
      data-config-modal-style="side"
    ></div>
  </div>
</template>
