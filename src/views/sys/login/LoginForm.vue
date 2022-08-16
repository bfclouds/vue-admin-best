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
      <el-input size="large" placeholder="用户名" v-model="loginForm.email" />
    </el-form-item>

    <el-form-item label-width="auto" prop="password">
      <el-input size="large" placeholder="密码" v-model="loginForm.password" />
    </el-form-item>

    <el-form-item label-width="auto">
      <div class="w-full flex justify-between">
        <el-checkbox v-model="rememberMe" label="记住我" name="type" />
        <router-link to="/">
          <span class="el-link el-link--primary">忘记密码？</span>
        </router-link>
      </div>
    </el-form-item>

    <el-form-item label-width="auto">
      <el-button
        size="large"
        class="w-full"
        type="primary"
        :loading="loadingState"
        @click="submitForm(formRef)"
      >
        提交
      </el-button>
    </el-form-item>
    <el-form-item label-width="auto">
      <div class="w-full flex justify-between">
        <el-button class="w-1/4" @click="setLoginState(LoginStateEnum.MOBILE)">
          手机登录
        </el-button>
        <el-button class="w-1/4" @click="setLoginState(LoginStateEnum.QR_CODE)">
          二维码登录
        </el-button>
        <el-button
          class="w-1/4"
          @click="setLoginState(LoginStateEnum.REGISTER)"
        >
          注册
        </el-button>
      </div>
    </el-form-item>

    <el-divider content-position="center">其他登录方式</el-divider>

    <el-form-item label-width="auto">
      <div class="w-full flex justify-center">
        <i
          class="cursor-pointer text-gray-600 hover:text-blue-500 mr-10 text-3xl iconfont icon-weixin"
        ></i>
        <i
          class="cursor-pointer text-gray-600 hover:text-blue-500 mr-10 text-3xl iconfont icon-alipay"
        ></i>
        <i
          class="cursor-pointer text-gray-600 hover:text-blue-500 mr-10 text-3xl iconfont icon-github-fill"
        ></i>
        <i
          class="cursor-pointer text-gray-600 hover:text-blue-500 text-3xl iconfont icon-google-circle-fill"
        ></i>
      </div>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
  import { reactive, computed, ref, unref } from 'vue'
  import type { FormInstance } from 'element-plus'
  import {
    useFormRules,
    useLoginState,
    LoginStateEnum,
    useLoadingState,
  } from './useLogin'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { useRouter } from 'vue-router'

  const { loadingState, hideLoading, showLoading } = useLoadingState()
  const router = useRouter()

  // form表单数据
  const formRef = ref<FormInstance>()
  const rememberMe = ref(false)
  const loginForm = reactive({
    email: '',
    password: '',
  })
  const { getFormRules: rules } = useFormRules()
  async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    showLoading()
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (rememberMe.value) {
          // 记住密码
        }
        // 发起请求
        setTimeout(() => {
          hideLoading()
          router.push('home')
        }, 1000)
      } else {
        console.log('error submit!', fields)
        hideLoading()
      }
    })
  }

  // form表单状态
  const { getLoginState, setLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)
</script>
