<template>
  <login-form-title v-show="getShow" />
  <el-form
    ref="formRef"
    :rules="rules"
    label-position="right"
    label-width="100px"
    :model="registerForm"
    v-show="getShow"
  >
    <el-form-item label-width="auto" prop="email">
      <el-input size="large" placeholder="邮箱" v-model="registerForm.email" />
    </el-form-item>

    <el-form-item label-width="auto" prop="sms">
      <el-input
        type="text"
        size="large"
        placeholder="验证码"
        v-model="registerForm.sms"
      >
        <template #suffix>
          <span class="cursor-pointer">发送验证码</span>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label-width="auto" prop="password">
      <el-input
        size="large"
        placeholder="密码"
        type="password"
        show-password
        v-model="registerForm.password"
      />
      <StrengthMeter :data-score="getPasswordStrength"></StrengthMeter>
    </el-form-item>

    <el-form-item label-width="auto" prop="rePassword">
      <el-input
        size="large"
        placeholder="重复密码"
        type="password"
        show-password
        v-model="registerForm.rePassword"
      />
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
  import StrengthMeter from '@/components/strengthMeter/index.vue'
  import { zxcvbn } from '@zxcvbn-ts/core'

  const formRef = ref<FormInstance>()
  const registerForm = reactive({
    email: '',
    sms: '',
    password: '',
    rePassword: '',
  })
  const { getFormRules: rules } = useFormRules(unref(registerForm))
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

  const getPasswordStrength = computed(() => {
    const password = unref(registerForm.password)
    return password ? zxcvbn(unref(password)).score : -1
  })

  const { getLoginState, handleBackLogin } = useLoginState()
  const getShow = computed(
    () => unref(getLoginState) === LoginStateEnum.REGISTER
  )
</script>
