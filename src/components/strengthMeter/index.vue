<template>
  <div
    class="strenth-meter-bar relative w-full h-2 bg-gray-300 mt-2 mb-2 rounded-lg after:left-1/5 before:left-3/5 overflow-hidden"
  >
    <div
      class="strenth-bar--fill transition-all duration-200 absolute h-2"
      :data-score="dataScore"
    ></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'

  export default defineComponent({
    name: 'StrengthMeter',
    props: {
      dataScore: Number as PropType<number>,
    },
    setup(props) {
      console.log(props.dataScore)
    },
  })
</script>

<style lang="less">
  .strenth-meter-bar {
    &::before,
    &::after {
      content: '';
      @apply block absolute w-1/5 h-2 border-r-4 border-l-4 border-white z-10;
    }
    .strenth-bar--fill {
      &[data-score='0'] {
        @apply w-1/5 bg-red-600;
      }
      &[data-score='1'] {
        @apply w-2/5 bg-red-600;
      }
      &[data-score='2'] {
        @apply w-3/5 bg-yellow-400;
      }
      &[data-score='3'] {
        @apply w-4/5 bg-green-400;
      }
      &[data-score='4'] {
        @apply w-full bg-green-700;
      }
    }
  }
</style>
