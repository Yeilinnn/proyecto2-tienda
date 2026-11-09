<script setup>
defineProps({
  product: { type: Object, required: true }
})
</script>

<template>
  <button
    class="btn snipcart-add-item"
    :data-item-id="product.slug"
    :data-item-price="product.price"
    :data-item-url="`/producto/${product.slug}`"
    :data-item-name="product.name"
    :data-item-description="product.description"
    :data-item-image="product.image"
  >
    Agregar al carrito
  </button>
</template>
