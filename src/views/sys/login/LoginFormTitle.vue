<template>
  <h2 class="text-center mb-5 font-semibold">{{ getFormTitle }}</h2>
</template>
<script setup lang="ts">
  import { computed, unref } from 'vue'
  import { useLoginState, LoginStateEnum } from './useLogin'

  const formTitleMap = {
    [LoginStateEnum.LOGIN]: '登录',
    [LoginStateEnum.REGISTER]: '注册',
    [LoginStateEnum.RESET_PASSWORD]: '重置密码',
    [LoginStateEnum.MOBILE]: '手机登录',
    [LoginStateEnum.QR_CODE]: '扫码登录',
  }
  const { getLoginState } = useLoginState()
  const getFormTitle = computed(() => formTitleMap[unref(getLoginState)])
</script>
