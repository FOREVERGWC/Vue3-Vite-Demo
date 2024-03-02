<template>
  <div>
    <slot></slot>
    <n-data-table :columns="columns" :data="props.data" :pagination="pagination" :row-key="(row) => row.id"
                  style="width: 100%" @update-checked-row-keys="handleCheck"/>
  </div>
</template>

<script lang="ts" setup>
import {DataTableRowKey, NButton, NPopconfirm, NSwitch, useMessage} from "naive-ui";
import {defineEmits, defineProps, h, reactive} from "vue";
import _ from 'lodash'
import {AdvertisementService} from "../../../api/AdvertisementService";

const props = defineProps({
  data: {
    required: true
  },
  dialog: {
    required: true
  },
  selection: {
    required: true
  }
})

const emits = defineEmits(['add-or-update', 'update-selection'])

const message = useMessage()

const actions = [
  {
    title: '编辑',
    key: 'edit'
  },
  {
    title: '删除',
    key: 'delete'
  }
]

const columns = [
  {
    type: 'selection'
  },
  {
    title: '标题',
    key: 'title'
  },
  {
    title: '内容',
    key: 'content'
  },
  {
    title: '状态',
    key: 'state',
    render(row) {
      return h(
          NSwitch,
          {
            defaultValue: row.state === 1,
            onClick: () => handleState(row)
          }
      )
    }
  },
  {
    title: '排序',
    key: 'orderNum'
  },
  {
    title: '操作',
    key: 'operation',
    render(row) {
      return h('div', {},
          [
            h(NButton,
                {
                  size: 'small',
                  style: {marginRight: '6px'},
                  onClick: () => {
                    handleEdit(row)
                  }
                },
                {default: () => '编辑'}),
            h(NPopconfirm, {
                  onPositiveClick: () => handleDelete(row),
                  negativeText: '取消',
                  positiveText: '确定'
                }, {
                  trigger: () => h(NButton,
                      {size: 'small'},
                      {default: () => '删除'}),
                  default: () => h('span', {}, '删除无法撤销，是否删除？')
                }
            )
          ]
      )
    }
  }
]

const data = []

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.page = 1
    pagination.pageSize = pageSize
  }
})

const handleCheck = (rowKeys: DataTableRowKey[]) => {
  emits('update-selection', rowKeys)
}

const handleEdit = (row) => {
  props.dialog.title = '编辑广告'
  props.dialog.visible = true
  props.dialog.model = _.cloneDeep(row)
}

const handleDelete = (row) => {
  AdvertisementService.delete(row.id).then((res) => {
    res.code === 200 ? message.success(res.msg) : message.error(res.msg)
  }).finally(() => {
    emits('add-or-update')
  })
}

const handleState = (row) => {
  const data = {
    id: row.id,
    state: row.state === 1 ? 0 : 1
  }
  AdvertisementService.update(data).then((res) => {
    res.code === 200 ? message.success(res.msg) : message.error(res.msg)
  })
}
</script>

<style scoped>

</style>
