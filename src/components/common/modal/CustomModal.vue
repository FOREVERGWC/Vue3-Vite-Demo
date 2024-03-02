<template>
  <n-modal v-model:show="show" :title="props.title" preset="dialog" @close="handleClose"
           @positive-click="handleClose">
    <slot></slot>
    <template #action>
      <n-button @click="handleClose">取消</n-button>
      <n-button @click="handleSubmit">确定</n-button>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps} from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '标题'
  }
})

const emits = defineEmits(['close', 'submit'])

const handleClose = () => {
  emits('close')
}

const handleSubmit = () => {
  emits('submit')
}

const show = computed({
  get() {
    return props.visible
  },
  set() {
    emits('close')
  }
})
</script>

<style scoped>

</style>
