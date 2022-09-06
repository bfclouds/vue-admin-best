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
              v-model="searchValue"
              placeholder="请输入用户名"
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
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="id" width="120" />
      <el-table-column property="address" label="角色码" />
      <el-table-column property="address" label="按钮权限" show-overflow-tooltip />
      <el-table-column label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small">编辑</el-button
          >
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row justify="center" class="mt-8">
      <el-col :span="12">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="添加">
    </el-dialog>
  </ContentWrapper>
</template>
<script setup lang="ts">
import ContentWrapper from '@/components/contentWrapper/index.vue';
import { ref } from 'vue';
import { useTabData } from './index'

const { tableData } = useTabData()

const searchValue = ref('');
const dialogVisible = ref(false)
function handleSelectionChange() {
  console.log(1);
}

</script>
