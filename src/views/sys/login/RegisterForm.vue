<template>
  <login-form-title v-show="getShow" />
  <el-form
    ref="formRef"
    :rules="rules"
    label-position="right"
    label-width="100px"
    :model="loginForm"
    v-show="getShow"
  >
    <el-form-item label-width="auto" prop="email">
      <el-input size="large" placeholder="邮箱" v-model="loginForm.email" />
    </el-form-item>

    <el-form-item label-width="auto" prop="password">
      <el-input size="large" placeholder="密码" v-model="loginForm.password" />
    </el-form-item>

    <el-form-item label-width="auto">
      <el-button
        size="large"
        class="w-full"
        type="primary"
        @click="submitForm(formRef)"
      >
        提交
      </el-button>
    </el-form-item>
    <el-form-item label-width="auto">
      <el-button size="large" class="w-full" @click="handleBackLogin">
        返回
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
  import { reactive, computed, ref, unref } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { useFormRules, useLoginState, LoginStateEnum } from './useLogin'
  import LoginFormTitle from './LoginFormTitle.vue'

  const formRef = ref<FormInstance>()
  const loginForm = reactive({
    email: '',
    password: '',
  })
  const { getFormRules: rules } = useFormRules()
  async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const { getLoginState, handleBackLogin } = useLoginState()
  const getShow = computed(
    () => unref(getLoginState) === LoginStateEnum.REGISTER
  )
</script>
