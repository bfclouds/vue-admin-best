import { RuleProps } from 'postcss'
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
function validateConfirmPassword(password: string) {
  return (_: RuleProps, value: string) => {
    if (!value) {
      return Promise.reject('请二次确认密码')
    }
    if (password !== value) {
      return Promise.reject('两次输入的密码不一致')
    }
    return Promise.resolve()
  }
}

export function useFormRules(registerForm?: any) {
  // function validatePassword(rule: any, value: any, callback: any) {
  //   if (value === '') {
  //     callback(new Error('请输入密码'))
  //   } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(value)) {
  //     callback(new Error('密码必须包含大小写字母和数字'))
  //   }
  // }

  const getFormRules = computed(() => {
    switch (unref(currentState)) {
      case LoginStateEnum.LOGIN:
        return {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            {
              type: 'email',
              message: '这好像不是邮箱',
              trigger: 'change',
            },
          ],
          password: [
            ...createRule('请输入密码'),
            { min: 3, max: 20, message: '密码长度为3-20', trigger: 'change' },
            // { validator: validatePassword, trigger: 'blur' },
          ],
        }
      case LoginStateEnum.REGISTER:
        return {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            {
              type: 'email',
              message: '请输入正确的邮箱',
              trigger: 'change',
            },
          ],
          sms: [...createRule('请输入验证码')],
          password: [
            ...createRule('请输入密码'),
            { min: 3, max: 10, message: '密码长度为3-10', trigger: 'change' },
          ],
          rePassword: [
            ...createRule('请再次输入密码'),
            { min: 3, max: 10, message: '密码长度为3-10', trigger: 'change' },
            { validator: validateConfirmPassword(registerForm?.password) },
          ],
        }
      default:
        return {}
    }
  })

  return {
    getFormRules,
  }
}

function createRule(message: string) {
  return [{ required: true, message, trigger: 'change' }]
}

// 加载状态
export function useLoadingState() {
  const loadingState = ref(false)

  function showLoading() {
    loadingState.value = true
  }
  function hideLoading() {
    loadingState.value = false
  }

  return {
    loadingState,
    hideLoading,
    showLoading,
  }
}
