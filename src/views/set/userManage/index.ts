import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import {
  GDialogType,
  HandlerObj,
  Message,
  MessageType,
} from '@/components/dialog/type'
import api from '@/api'
import { User } from './type'
import { ElMessage } from 'element-plus'
import { jsEncryptData } from '@/utils'

export function useTableData() {
  const tableData = ref<Nullable<User[]>>([
    {
      userName: '附小讲',
      password: 'jfskdjfkldsf',
      email: '3248293@qq.com',
      role: ['admin', 'superAdmin'],
      index: 1,
      id: 1,
      updateAt: '2022/12/12 12:12',
    },
    {
      userName: '附小讲',
      password: 'jfskdjfkldsf',
      email: '3248293@qq.com',
      role: ['admin', 'superAdmin'],
      index: 1,
      id: 2,
      updateAt: '2022/12/12 12:12',
    },
    {
      userName: '附小讲',
      password: 'jfskdjfkldsf',
      email: '3248293@qq.com',
      role: ['admin', 'superAdmin'],
      index: 1,
      id: 3,
      updateAt: '2022/12/12 12:12',
    },
    {
      userName: '附小讲',
      password: 'jfskdjfkldsf',
      email: '3248293@qq.com',
      role: ['admin', 'superAdmin'],
      index: 1,
      id: 4,
      updateAt: '2022/12/12 12:12',
    },
    {
      userName: '附小讲',
      password: 'jfskdjfkldsf',
      email: '3248293@qq.com',
      role: ['admin', 'superAdmin'],
      index: 1,
      id: 5,
      updateAt: '2022/12/12 12:12',
    },
    {
      userName: '附小讲',
      password: 'jfskdjfkldsf',
      email: '3248293@qq.com',
      role: ['admin', 'superAdmin'],
      index: 1,
      id: 6,
      updateAt: '2022/12/12 12:12',
    },
    {
      userName: '附小讲',
      password: 'jfskdjfkldsf',
      email: '3248293@qq.com',
      role: ['admin', 'superAdmin'],
      index: 1,
      id: 7,
      updateAt: '2022/12/12 12:12',
    },
  ])
  const selectedUser = ref<User[]>([])

  function select(selection: User[]) {
    selectedUser.value = selection
  }

  function selectAll(selection: User[]) {
    selectedUser.value = selection
  }

  return {
    tableData,
    select,
    selectAll,
    selectedUser,
  }
}

export function useEditForm(selectedUser: User[]) {
  const baseUserForm: User = {
    userName: '',
    password: '',
    email: '',
    role: [],
  }
  const userForm = ref(cloneDeep(baseUserForm))
  const formVisible = ref(false)
  const sureDialog = ref<Nullable<GDialogType>>(null)

  function formCancel() {
    formVisible.value = false
  }
  function formConfirm() {
    formVisible.value = false
    api
      .setUser(
        Object.assign({}, userForm.value, {
          password: jsEncryptData(userForm.value.password),
        })
      )
      .then((res) => {
        console.log(res)
      })
  }

  function setUserForm(info = baseUserForm) {
    userForm.value = cloneDeep(info)
  }

  function addUser() {
    setUserForm()
    formVisible.value = true
  }

  function edit(index: string, data: User) {
    setUserForm(data)
    formVisible.value = true
  }

  function deleteUser(data: User) {
    showTipsToSure(data, {
      type: MessageType.delete,
      txt: '确定要删除该用户吗？',
    }).on((d: User) => {
      console.log(1235, d)
    })
  }

  function deleteSelectedUsers() {
    if (selectedUser.length === 0) {
      ElMessage.error('没有选择需要删除的用户！')
      return
    }

    showTipsToSure(selectedUser, {
      type: MessageType.delete,
      txt: '确定要删除该用户吗？',
    }).on((d: User[]) => {
      console.log(d)
    })
  }

  function showTipsToSure(data: User | User[], message: Message): HandlerObj {
    return sureDialog.value?.show(data, message) as HandlerObj
  }

  return {
    userForm,
    formVisible,
    formCancel,
    formConfirm,
    addUser,
    edit,
    sureDialog,
    deleteUser,
    deleteSelectedUsers,
  }
}
