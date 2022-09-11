<template>
  <div v-if="visible" class="fixed w-full h-full left-0 top-0 z-20">
    <div
      class="fixed w-full h-full left-0 top-0"
      style="background: rgba(29, 31, 37, 0.2)"
    ></div>
    <div
      class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-4 bg-white rounded-lg"
      style="width: 400px"
    >
      <i
        class="iconfont icon-close absolute right-3 top-3 text-sm cursor-pointer text-gray-400"
        @click="hide"
      ></i>
      <slot name="title">
        <h3 class="title text-lg mb-4">{{ message?.title }}</h3>
      </slot>
      <slot :data="data">
        <p class="text-gray-600">{{ message?.txt }}</p>
      </slot>
      <slot name="footer" :data="data">
        <p class="dialog-footer flex justify-end mt-6">
          <el-button type="info" @click="hide">取消</el-button>
          <el-button type="primary" @click="ok">确认</el-button>
        </p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash'
  import { reactive, ref } from 'vue'
  import { HandlerObj, Message } from './type'

  defineExpose({ show, hide })

  const visible = ref(false)
  const message = reactive({
    title: '温馨提示',
    txt: '',
  })
  const data = ref(null)

  const handlerObj: HandlerObj = {
    handler: new Set(),
    cancelHandler: new Set(),
    on(fn) {
      this.handler.add(fn)
    },
    onCancel(fn) {
      this.cancelHandler.add(fn)
    },
  }

  function show(d: any, msgObj: null | Message) {
    data.value = cloneDeep(d)
    message.title = msgObj?.title ?? message.title
    message.txt = msgObj?.txt ?? message.txt
    visible.value = true
    return handlerObj
  }

  function hide() {
    visible.value = false
    handlerObj.handler.clear()
    handlerObj.cancelHandler.clear()
  }

  function ok() {
    handlerObj.handler.forEach((item) => {
      item(data.value)
    })
  }
</script>
