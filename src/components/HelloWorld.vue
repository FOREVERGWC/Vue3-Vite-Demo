<template>
  <div>
    <Table :data="data" :dialog="dialog" :selection="checkedRowKeysRef" @add-or-update="getAdvertisements"
           @update-selection="updateSelection">
      <n-button style="margin-right: 10px" @click="openDialog">新增</n-button>
      <n-button @click="deleteBatch">批量删除</n-button>
    </Table>
    <AddOrUpdate :dialog="dialog" @add-or-update="getAdvertisements"></AddOrUpdate>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {DataTableRowKey, FormRules, NButton, useMessage} from 'naive-ui'
import Table from "./advertisement/component/Table.vue";
import AddOrUpdate from "./advertisement/component/AddOrUpdate.vue";
import {AdvertisementService} from "../api/AdvertisementService";

const message = useMessage()

const dialog = reactive({
  visible: false,
  title: '',
  model: {
    id: null,
    title: '',
    content: '',
    orderNum: null
  }
})

const openDialog = () => {
  dialog.title = '添加广告'
  dialog.visible = true

}

const model = reactive({
  id: null,
  title: '',
  content: '',
  orderNum: ''
})

const rules: FormRules = {
  title: [{required: true, message: '请输入标题', trigger: 'blur'}],
  content: [{required: true, message: '请输入内容', trigger: 'blur'}],
  orderNum: [{required: true, message: '请输入排序', trigger: 'blur'}]
}

const data = ref([])

const getAdvertisements = () => {
  AdvertisementService.page(1, 10, {}).then((res) => {
    if (res.code != 200) return
    data.value = res.data.page.records
  })
}

const checkedRowKeysRef = ref<DataTableRowKey[]>([])

const updateSelection = (val) => {
  checkedRowKeysRef.value = val
}

const deleteBatch = () => {
  if (checkedRowKeysRef.value.length === 0) {
    message.error('请选择行！', 3000)
    return
  }
  AdvertisementService.deleteBatch(checkedRowKeysRef.value).then((res) => {
    if (res.code != 200) {
      message.error(res.msg, 3000)
      return
    }
    message.success(res.msg, 3000)
  }).finally(() => {
    getAdvertisements()
  })
}

getAdvertisements()
</script>
