<template>
  <div class="relative h-screen">
    <div class="form-container">
      <LoginForm />
      <RegisterForm />
    </div>
  </div>
</template>

<script setup lang="ts">
  import LoginForm from './LoginForm.vue'
  import RegisterForm from './RegisterForm.vue'
</script>

<style lang="less">
  .form-container {
    @apply container absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-auto border p-10 w-auto max-w-xl rounded-lg;
  }
</style>
