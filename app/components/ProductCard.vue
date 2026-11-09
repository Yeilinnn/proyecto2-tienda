<script setup>
defineProps({
  product: { type: Object, required: true }
})
</script>

<template>
  <article class="card">
    <NuxtLink :to="`/producto/${product.slug}`" class="card-img">
      <img :src="product.image" :alt="product.name" loading="lazy" />
    </NuxtLink>
    <div class="card-body">
      <p class="card-brand">{{ product.brand }}</p>
      <h3 class="card-title">
        <NuxtLink :to="`/producto/${product.slug}`">{{ product.name }}</NuxtLink>
      </h3>
      <p class="card-price">${{ product.price.toFixed(2) }}</p>
      <BuyButton :product="product" />
    </div>
  </article>
</template>
