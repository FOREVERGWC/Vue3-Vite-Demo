<template>
  <div>
    <CustomModal :title="props.dialog.title" :visible="props.dialog.visible" @close="closeDialog"
                 @submit="submitDialog">
      <n-form ref="formRef" :model="props.dialog.model" :rules="rules" label-placement="left">
        <n-form-item label="标题" path="title">
          <n-input v-model:value="props.dialog.model.title" placeholder="请输入" @keydown.enter.prevent/>
        </n-form-item>
        <n-form-item label="内容" path="content">
          <n-input v-model:value="props.dialog.model.content" placeholder="请输入" type="textarea"
                   @keydown.enter.prevent/>
        </n-form-item>
        <n-form-item label="排序" path="orderNum">
          <n-input-number v-model:value="props.dialog.model.orderNum" :precision="0" :show-button="false"
                          placeholder="请输入"
                          style="width: 100%" @keydown.enter.prevent></n-input-number>
        </n-form-item>
      </n-form>
    </CustomModal>
  </div>
</template>

<script lang="ts" setup>
import CustomModal from "../../common/modal/CustomModal.vue";
import {defineProps, ref} from "vue";
import {FormInst, FormRules, useMessage} from "naive-ui";
import {AdvertisementService} from "../../../api/AdvertisementService";
import {defineEmits} from "vue/dist/vue";

interface Dialog {
  visible: boolean
  title: string
  model: {
    id: number | null
    title: string
    content: string
    orderNum: number | null
  }
}

const props = defineProps<{
  dialog: Dialog
}>()

const formRef = ref<FormInst>()

const message = useMessage()

const emits = defineEmits(['add-or-update'])

const closeDialog = () => {
  props.dialog.visible = false
  props.dialog.model.id = null
  props.dialog.model.title = ''
  props.dialog.model.content = ''
  props.dialog.model.orderNum = null
}

const submitDialog = () => {
  const info = props.dialog.model.id ? '编辑' : '添加'
  formRef.value?.validate().then(() => {
    const promise = props.dialog.model.id ? AdvertisementService.update(props.dialog.model) : AdvertisementService.add(props.dialog.model)
    return promise.then((res) => {
      if (res?.code !== 200) {
        throw new Error(`${info}失败！请检查表单`)
      }
      message.info(`${info}成功！`, 3000)
    })
  }).catch((error) => {
    message.error(error.message, 3000)
  }).finally(() => {
    emits('add-or-update')
    props.dialog.visible = false
  })
}

const rules: FormRules = {
  title: [{required: true, message: '请输入标题', trigger: 'blur'}],
  content: [{required: true, message: '请输入内容', trigger: 'blur'}],
  orderNum: [{required: true, message: '请输入排序', trigger: ['blur', 'change'], type: 'number'}]
}
</script>

<style lang="sass" scoped>

</style>
