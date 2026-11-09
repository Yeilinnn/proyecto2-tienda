<script setup>
definePageMeta({ key: route => route.params.slug })

const route = useRoute()
const slug = route.params.slug

const { data: product } = await useAsyncData(`product-${slug}`, () =>
  queryCollection('products').where('slug', '=', slug).first()
)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
}

const { data: category } = await useAsyncData(`product-cat-${slug}`, () =>
  queryCollection('categories').where('slug', '=', product.value.category).first()
)

const { data: related } = await useAsyncData(`related-${slug}`, async () => {
  const list = await queryCollection('products')
    .where('category', '=', product.value.category)
    .all()
  return list.filter(p => p.slug !== slug).slice(0, 3)
})

useSeoMeta({
  title: `${product.value.name} – Tono & Cuerda`,
  description: product.value.description
})
</script>

<template>
  <article v-if="product" class="product">
    <NuxtLink
      v-if="category"
      :to="`/categoria/${category.slug}`"
      class="back"
    >
      ← {{ category.name }}
    </NuxtLink>

    <div class="product-layout">
      <img :src="product.image" :alt="product.name" class="product-img" />

      <div class="product-info">
        <p class="card-brand">{{ product.brand }}</p>
        <h1 class="page-title">{{ product.name }}</h1>
        <p class="product-price">${{ product.price.toFixed(2) }}</p>
        <p class="product-desc">{{ product.description }}</p>

        <table class="specs">
          <tbody>
            <tr><th>Marca</th><td>{{ product.brand }}</td></tr>
            <tr><th>Categoría</th><td>{{ category ? category.name : product.category }}</td></tr>
            <tr><th>Color</th><td>{{ product.color }}</td></tr>
            <tr><th>Material</th><td>{{ product.material }}</td></tr>
            <tr><th>Nivel</th><td>{{ product.level }}</td></tr>
          </tbody>
        </table>

        <BuyButton :product="product" />
      </div>
    </div>

    <section v-if="related && related.length" class="related">
      <h2 class="section-title">Más en esta categoría</h2>
      <div class="grid">
        <ProductCard v-for="p in related" :key="p.slug" :product="p" />
      </div>
    </section>

    <Comments :key="route.path" />
  </article>
</template>
