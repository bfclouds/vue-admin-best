<template>
  <ContentWrapper>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="addData">添加</el-button>
        <el-button type="danger" @click="deleteSelectedData">
          批量删除
        </el-button>
      </el-col>
      <el-col :span="12">
        <div class="flex justify-end">
          <el-input
            class="max-w-xs"
            v-model="searchKey"
            @input="onSearchInput"
            @keyup.enter="onSearch"
            placeholder="请输入用户名"
          />
          <el-button type="primary" class="ml-3" @click="onSearch">
            搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      class="mt-10 w-full text-center"
      ref="multipleTableRef"
      style="height: 328px"
      :data="showTableData"
      @select="select"
      @select-all="selectAll"
      v-loading="loading"
      border
    >
      <el-table-column align="center" type="selection" min-width="40" />
      <el-table-column align="center" label="序号" min-width="60">
        <template #default="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column align="center" property="id" label="id" min-width="60" />
      <el-table-column
        align="center"
        property="userName"
        label="用户名"
        width="120"
      />
      <el-table-column
        align="center"
        property="email"
        label="邮箱"
        min-width="120"
      />
      <el-table-column
        align="center"
        property="role"
        label="角色"
        min-width="200"
      >
        <template #default="scope">
          <el-tag v-for="role in scope.row.role" :key="role" class="ml-2">
            {{ role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="updatedAt"
        label="更新时间"
        min-width="120"
      >
        <template #default="scope">
          <span>{{ formatData(scope.row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        min-width="120"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="edit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="deleteData(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex justify-center mt-8">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        @current-change="changePage"
      />
    </div>

    <el-dialog v-model="formVisible" title="添加" width="480px">
      <el-form :model="dataForm" label-width="auto">
        <el-form-item label="用户名">
          <el-input v-model="dataForm.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="dataForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="dataForm.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="flex justify-end">
        <el-button @click="formCancel">取消</el-button>
        <el-button type="primary" @click="formConfirm">添加</el-button>
      </div>
    </el-dialog>

    <Dialog ref="sureDialog"></Dialog>
  </ContentWrapper>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import ContentWrapper from '@/components/contentWrapper/index.vue'
  import Dialog from '@/components/dialog/index.vue'
  // import { useTableData, useEditForm } from './index'
  import { formatData, jsEncryptData } from '@/utils'
  import { useTable, useSearch, useDataHandler } from '@/hooks/web/useTable'
  import api from '@/api'
  import { User } from './type'

  const {
    tableData,
    loading,
    page,
    select,
    selectAll,
    selectedData,
    getDataList,
    changePage,
  } = useTable<User>(api.getUserList)

  const { searchKey, searchMode, searchTableData, onSearchInput, onSearch } =
    useSearch<User>((key: string) => {
      return api.searchUser({
        userName: key,
      })
    })

  const baseForm: User = {
    userName: '',
    password: '',
    email: '',
    role: undefined,
  }

  const {
    formVisible,
    dataForm,
    addData,
    edit,
    deleteData,
    deleteSelectedData,
    formCancel,
    formConfirm,
  } = useDataHandler<User>({
    baseForm,
    selectedData,
    getDataList,
    updateDataApi: (params: User) =>
      api.setUser(
        Object.assign({}, params, {
          password: jsEncryptData(params.password),
        })
      ),
  })

  const showTableData = computed(() =>
    searchMode.value ? searchTableData.value : tableData.value
  )
</script>
