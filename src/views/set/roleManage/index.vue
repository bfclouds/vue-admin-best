<template>
  <ContentWrapper>
    <el-row>
      <el-col :span="12">
        <el-button type="primary">添加</el-button>
        <el-button type="danger">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-row justify="end">
          <el-col :span="8">
            <el-input
              v-model="searchKey"
              @input="onSearchInput"
              @keyup.enter="onSearch"
              placeholder="请输入角色"
            />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="ml-3">搜索</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-table
      class="mt-10"
      ref="multipleTableRef"
      :data="showTableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="id" width="120" />
      <el-table-column property="address" label="角色码" />
      <el-table-column
        property="address"
        label="按钮权限"
        show-overflow-tooltip
      />
      <el-table-column label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row justify="center" class="mt-8">
      <el-col :span="12">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </el-col>
    </el-row>
  </ContentWrapper>
</template>
<script setup lang="ts">
  import api from '@/api'
  import ContentWrapper from '@/components/contentWrapper/index.vue'
  import { useSearch, useTable } from '@/hooks/web/useTable'
  import { ref, computed } from 'vue'
  import { Role } from './type'

  function handleSelectionChange() {
    console.log(1)
  }

  const { tableData, loading } = useTable<Role>(api.getRoleList)

  const { searchKey, searchMode, searchTableData, onSearchInput, onSearch } =
    useSearch<Role>((key: string) => {
      return api.searchRole({
        roleName: key,
      })
    })

  const showTableData = computed(() =>
    searchMode.value ? searchTableData : tableData
  )
</script>
