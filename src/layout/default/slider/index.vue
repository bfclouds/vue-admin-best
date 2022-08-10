<template>
  <el-aside
    width="266px"
    class="relative overflow-hidden best-slider-bar-container"
  >
    <el-scrollbar :noresize="true">
      <div class="logo-container">
        <a href="/" class="inline-flex items-center">
          <span class="logo-wrapper flex justify-center items-center">
            <img class="w-10" src="~@/assets/logo.png" alt="" />
          </span>
          <span class="text-2xl ml-3">vue-admin-best</span>
        </a>
      </div>
      <el-tabs tab-position="left">
        <el-tab-pane label="User">
          <template #label>
            <div class="text-center leading-3 rounded slider-tabs-title">
              <i class="iconfont icon-home"></i>
              <p class="mt-2">首页</p>
            </div>
          </template>
          <div>这是内容区域</div>
        </el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </el-scrollbar>

    <div class="other"></div>
  </el-aside>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  const isCollapse = ref(false)
  function handleOpen() {
    console.log(1)
  }
  function handleClose() {
    console.log(1)
  }
</script>

<style lang="less" scoped>
  .best-slider-bar-container {
    /deep/.el-tabs .el-tabs__item {
      color: var(--el-color-white);
      background-color: #000;
    }
    .logo-wrapper {
      width: 64px;
      height: 64px;
    }
    .slider-tabs-title {
    }
  }
</style>
