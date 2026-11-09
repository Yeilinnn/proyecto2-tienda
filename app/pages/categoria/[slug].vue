<script setup>
definePageMeta({ key: route => route.params.slug })

const PAGE_SIZE = 4
const route = useRoute()
const slug = route.params.slug

const { data: category } = await useAsyncData(`cat-${slug}`, () =>
  queryCollection('categories').where('slug', '=', slug).first()
)

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Categoría no encontrada' })
}

const { data: items } = await useAsyncData(`items-${slug}`, () =>
  queryCollection('products').where('category', '=', slug).order('name', 'ASC').all()
)

const page = computed(() => Math.max(1, parseInt(route.query.page) || 1))
const totalPages = computed(() => Math.max(1, Math.ceil((items.value || []).length / PAGE_SIZE)))
const pageItems = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return (items.value || []).slice(start, start + PAGE_SIZE)
})

useSeoMeta({ title: `${category.value.name} – Tono & Cuerda` })
</script>

<template>
  <div>
    <NuxtLink to="/" class="back">← Todas las categorías</NuxtLink>
    <h1 class="page-title">{{ category.icon }} {{ category.name }}</h1>
    <p class="page-subtitle">{{ category.description }} ({{ items.length }} artículos)</p>

    <div class="grid">
      <ProductCard v-for="p in pageItems" :key="p.slug" :product="p" />
    </div>

    <Pagination
      :page="page"
      :total-pages="totalPages"
      :base-path="`/categoria/${slug}`"
    />
  </div>
</template>
