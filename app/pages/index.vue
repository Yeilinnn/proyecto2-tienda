<script setup>
const { data: categories } = await useAsyncData('categories', () =>
  queryCollection('categories').all()
)
const { data: products } = await useAsyncData('all-products', () =>
  queryCollection('products').all()
)

const counts = computed(() => {
  const map = {}
  for (const p of products.value || []) map[p.category] = (map[p.category] || 0) + 1
  return map
})
const featured = computed(() => (products.value || []).filter(p => p.featured))
</script>

<template>
  <div>
    <section class="hero">
      <h1>Encuentra el instrumento que va con tu música</h1>
      <p>Guitarras, teclados, percusión, vientos y más. Elige una categoría para empezar.</p>
    </section>

    <h2 class="section-title">Categorías</h2>
    <div class="cat-grid">
      <NuxtLink
        v-for="c in categories"
        :key="c.slug"
        :to="`/categoria/${c.slug}`"
        class="cat-card"
      >
        <span class="cat-icon">{{ c.icon }}</span>
        <h3>{{ c.name }}</h3>
        <p>{{ c.description }}</p>
        <span class="cat-count">{{ counts[c.slug] || 0 }} artículos</span>
      </NuxtLink>
    </div>

    <h2 class="section-title">Destacados</h2>
    <div class="grid">
      <ProductCard v-for="p in featured" :key="p.slug" :product="p" />
    </div>
  </div>
</template>
