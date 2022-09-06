<template>
  <div class="content-wrapper">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
  .content-wrapper {
    height: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    overflow: scroll;
  }
</style>