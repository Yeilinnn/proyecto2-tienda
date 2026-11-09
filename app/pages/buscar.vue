<script setup>
const PAGE_SIZE = 4
const route = useRoute()

const { data: products } = await useAsyncData('search-products', () =>
  queryCollection('products').all()
)
const { data: categories } = await useAsyncData('search-categories', () =>
  queryCollection('categories').all()
)

function normalize(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const q = computed(() => String(route.query.q || '').trim())

const results = computed(() => {
  const words = normalize(q.value).split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const catName = {}
  for (const c of categories.value || []) catName[c.slug] = c.name
  return (products.value || []).filter(p => {
    const haystack = normalize(
      [p.name, p.description, p.brand, p.color, p.material, p.level, catName[p.category]].join(' ')
    )
    return words.every(w => haystack.includes(w))
  })
})

const page = computed(() => Math.max(1, parseInt(route.query.page) || 1))
const totalPages = computed(() => Math.max(1, Math.ceil(results.value.length / PAGE_SIZE)))
const pageItems = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return results.value.slice(start, start + PAGE_SIZE)
})

useSeoMeta({ title: `Búsqueda: ${q.value} – Tono & Cuerda` })
</script>

<template>
  <div>
    <h1 class="page-title">Resultados de búsqueda</h1>
    <p class="page-subtitle" v-if="q">
      {{ results.length }} resultado(s) para «{{ q }}»
    </p>
    <p class="page-subtitle" v-else>Escribe una palabra clave en el buscador.</p>

    <div v-if="results.length" class="grid">
      <ProductCard v-for="p in pageItems" :key="p.slug" :product="p" />
    </div>
    <p v-else-if="q" class="empty">
      No encontramos nada con esa búsqueda. Prueba con otra palabra, como «guitarra» o «Yamaha».
    </p>

    <Pagination
      :page="page"
      :total-pages="totalPages"
      base-path="/buscar"
      :query="{ q }"
    />
  </div>
</template>
