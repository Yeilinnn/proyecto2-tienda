<script setup>
const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  basePath: { type: String, required: true },
  query: { type: Object, default: () => ({}) }
})

function to(n) {
  return { path: props.basePath, query: { ...props.query, page: n } }
}
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Paginación">
    <NuxtLink v-if="page > 1" :to="to(page - 1)" class="pg">← Anterior</NuxtLink>
    <span v-else class="pg disabled">← Anterior</span>

    <NuxtLink
      v-for="n in totalPages"
      :key="n"
      :to="to(n)"
      class="pg"
      :class="{ active: n === page }"
    >
      {{ n }}
    </NuxtLink>

    <NuxtLink v-if="page < totalPages" :to="to(page + 1)" class="pg">Siguiente →</NuxtLink>
    <span v-else class="pg disabled">Siguiente →</span>
  </nav>
</template>
