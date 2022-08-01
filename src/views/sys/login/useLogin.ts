import { computed, ref, unref } from 'vue'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}
const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  const getLoginState = computed(() => currentState.value)
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }
  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return {
    getLoginState,
    setLoginState,
    handleBackLogin,
  }
}

function validatePassword(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(value)) {
    callback(new Error('密码必须包含大小写字母和数字'))
  }
}
const loginRules = {
  email: [
    ...createRule('请填写邮箱'),
    { min: 3, max: 10, message: '用户名长度为3-10', trigger: 'change' },
  ],
  password: [
    ...createRule('请填写密码'),
    { min: 3, max: 10, message: '密码长度为3-10', trigger: 'change' },
    { validator: validatePassword, trigger: 'blur' },
  ],
}
export function useFormRules() {
  const getFormRules = computed(() => {
    switch (unref(currentState)) {
      case LoginStateEnum.LOGIN:
        return loginRules
      case LoginStateEnum.REGISTER:
        return loginRules
      default:
        return loginRules
    }
  })

  return {
    getFormRules,
  }
}

function createRule(message: string) {
  return [{ required: true, message, trigger: 'change' }]
}
