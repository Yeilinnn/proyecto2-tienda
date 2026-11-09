<script setup lang="ts">
const route = useRoute()
const container = ref<HTMLElement | null>(null)

function loadComments() {
  if (!container.value) return
  container.value.innerHTML = ''
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', 'Yeilinnn/blog-comentarios')
  script.setAttribute('issue-term', 'pathname')
  script.setAttribute('label', 'comentario')
  script.setAttribute('theme', 'github-dark')
  container.value.appendChild(script)
}

onMounted(loadComments)
watch(() => route.path, loadComments)
</script>

<template>
  <section class="comments">
    <h2>Comentarios</h2>
    <div ref="container" />
  </section>
</template>
