<template>
  <div>
    <canvas ref="glCanvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'

  const glCanvasRef = ref<Nullable<HTMLElement>>(null)
</script>
