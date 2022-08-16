<template>
  <el-aside
    width="300px"
    class="relative overflow-hidden best-slider-bar-container"
  >
    <!-- <el-scrollbar :noresize="true"> -->
    <div class="header-logo-wrapper">
      <a href="/" class="inline-flex items-center w-full">
        <span
          class="logo-container left-0 top-0 fixed flex justify-center items-center"
        >
          <img src="~@/assets/logo.png" alt="" />
        </span>
        <p class="title text-2xl w-full text-center">vue admin best</p>
      </a>
    </div>
    <el-tabs tab-position="left">
      <el-tab-pane v-for="route in menuList" :key="route.name">
        <template #label>
          <router-link :to="route.path">
            <div class="best-column-grid flex-col rounded-md">
              <div>
                <i
                  class="iconfont text-lg leading-none"
                  :class="route.icon"
                ></i>
                <p class="mt-1">{{ route.name }}</p>
              </div>
            </div>
          </router-link>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-menu default-active="1" class="best-menu">
      <el-divider>首页</el-divider>
      <el-menu-item index="1" class="mr-2 ml-2 rounded-md">
        <div class="p-1">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </div>
      </el-menu-item>
      <el-menu-item index="2" class="mr-2 ml-2 rounded-md">
        <div class="p-1">
          <i class="iconfont icon-pie-chart"></i>
          <span>看板</span>
        </div>
      </el-menu-item>
    </el-menu>
    <!-- </el-scrollbar> -->
  </el-aside>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useMenus } from '.'

  const { menuList } = useMenus()

  const isCollapse = ref(false)
  function handleOpen() {
    console.log(1)
  }
  function handleClose() {
    console.log(1)
  }
</script>

<style lang="less" scoped>
  @import url('~@/style/common.less');

  @elTabwidth: 64px;
  @sliderWidth: 300px;
  @bgColor: #282c34;
  .best-slider-bar-container {
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    background-color: var(--el-color-white);
    transition: width 0.2s cubic-bezier(0.17, 0.67, 0.68, 1.02);
    .header-logo-wrapper {
      .logo-container {
        width: @elTabwidth;
        height: @elTabwidth;
        background-color: @bgColor;
        img {
          width: 32px;
        }
      }
      .title {
        height: calc(@elTabwidth - 4px);
        width: calc(@sliderWidth - @elTabwidth);
        margin-left: @elTabwidth;
        padding-right: 15px;
        padding-left: 15px;
        color: var(--el-color-black);
        line-height: 55px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
    }
    :deep(.el-tabs) {
      position: fixed;
      top: @elTabwidth;
      width: @elTabwidth;
      border-right: none !important;
      .el-tabs__header {
        margin-right: 0 !important;
      }
      .el-tabs__nav {
        padding: 0;
        height: calc(100vh - @elTabwidth);
        background-color: @bgColor;
        .el-tabs__active-bar {
          display: none;
        }
        .el-tabs__item {
          width: @elTabwidth;
          padding: 6px;
          line-height: initial;
          height: auto;
          color: var(--el-color-white);
          .best-column-grid {
            padding: 6px 0;
            flex-direction: column;
            width: 100%;
          }
          &.is-active {
            .best-column-grid {
              background: var(--el-color-primary);
            }
          }
        }
      }
    }
    :deep(.best-menu.el-menu) {
      border-right-color: transparent;
      margin-left: @elTabwidth;
      .el-divider {
        width: calc(@sliderWidth - @elTabwidth);
        margin: 0 0 20px 0;
        background-color: #f6f6f6;
        .el-divider__text {
          color: var(--el-color-black) !important;
        }
      }
      .el-menu-item {
        margin-bottom: 10px;
        &.is-active {
          background-color: var(--el-menu-hover-bg-color);
        }
      }
      .iconfont {
        margin-right: 10px;
      }
    }
  }
</style>
