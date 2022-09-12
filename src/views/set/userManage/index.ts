import { onMounted, reactive, ref, unref } from 'vue'
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
import { Page } from '@/types/config'

export function useTableData() {
  const tableData = ref<Nullable<User[]>>([])
  const selectedUser = ref<User[]>([])
  const page: Page = reactive({
    total: 0,
    current: 1,
    size: 7,
  })

  function select(selection: User[]) {
    selectedUser.value = selection
  }

  function selectAll(selection: User[]) {
    selectedUser.value = selection
  }

  function getUserList() {
    api
      .getUserList({
        size: page.size,
        current: page.current,
      })
      .then((res: User[]) => {
        tableData.value = res
      })
  }
  onMounted(() => {
    getUserList()
  })

  return {
    tableData,
    select,
    selectAll,
    selectedUser,
    getUserList,
    page,
  }
}

export function useEditForm({
  selectedUser,
  getUserList,
}: {
  selectedUser: User[]
  getUserList: () => void
}) {
  const baseUserForm: User = {
    userName: '',
    password: '',
    email: '',
    role: undefined,
  }
  const userForm = ref(cloneDeep(baseUserForm))
  const formVisible = ref(false)
  const sureDialog = ref<Nullable<GDialogType>>(null)

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
        getUserList()
      })
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
