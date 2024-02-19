<template>
  <div class="container">
    <Breadcrumb :items="['menu.luck.luck', 'menu.luck.sendLuckList']" />
    <a-card class="general-card" :title="$t('menu.luck.sendLuckList')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="id" :label="$t('default.form.id')">
                  <a-input v-model="formModel.id" :placeholder="$t('default.form.id.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="userId" :label="$t('sendLuck.form.userId')">
                  <a-input v-model="formModel.userId" :placeholder="$t('sendLuck.form.userId.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" :label="$t('sendLuck.form.status')">
                  <a-select v-model="formModel.status" :options="contentStatusOptions"
                    :placeholder="$t('sendLuck.form.status.placeholder')" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t("default.form.search") }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t("default.form.reset") }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button :disabled="true" type="primary" @click="handleFormView(undefined)">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t("default.operation.create") }}
            </a-button>
            <a-upload :disabled="true" accept=".xlsx" :auto-upload="false" :show-file-list="false"
              @change="handleFileChange">
              <a-button loading>
                {{ $t("default.operation.import") }}
              </a-button>
            </a-upload>
            <a-popconfirm :content="$t('default.action.delete.list')" type="info" @ok="handleSelectionDelete">  
              <a-button :disabled="!hasSelection">
                <template #icon>
                  <icon-delete />
                </template>
                {{ $t("default.form.deleteSelection") }}
              </a-button>
            </a-popconfirm>
          </a-space>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-button :disabled="!hasSelection" @click="handleDownload">
            <template #icon>
              <icon-download />
            </template>
            {{ $t("default.operation.download") }}
          </a-button>
          <a-tooltip :content="$t('default.actions.refresh')">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('default.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption v-for="item in densityList" :key="item.value" :value="item.value"
                :class="{ active: item.value === size }">
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('default.actions.columnSetting')">
            <a-popover trigger="click" position="bl" @popup-visible-change="popupVisibleChange">
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div v-for="(item, index) in showColumns" :key="item.dataIndex" class="setting">
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox v-model="item.checked" @change="
                        handleChange($event, item as TableColumnData, index)
                        ">
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === "#" ? "序列号" : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table row-key="id" :loading="loading" :pagination="pagination" :columns="(cloneColumns as TableColumnData[])"
        :data="renderData" :bordered="false" :size="size" :row-selection="rowSelection" @page-change="onPageChange"
        :scroll="{ x: 1000 }" @selection-change="select">
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #status="{ record }">
          <span>{{ contentStatusOptions.find(item => item.value === record.status)?.label }}</span>
        </template>

        <template #operations="{ record }" style="width: 80px">
          <a-button v-permission="['admin']" type="text" size="small" @click="handleDetailView(record)">
            {{ $t("default.columns.operations.view") }}
          </a-button>
          <a-button v-permission="['admin']" type="text" size="small" @click="handleFormView(record)">
            {{ $t("default.columns.operations.form") }}
          </a-button>

          <span v-permission="['admin']">
            <a-popover trigger="hover" content-class="goal-list-delete-popover">
              <a-button type="text" size="small">
                <icon-more />
              </a-button>
              <template v-if="record.id" #content>
                <a-popconfirm :content="$t('default.action.delete')" position="left" type="info"
                  @ok="() => handlespecificItemDelete(record.id)">
                  <a-button type="text" size="small">{{ $t("default.operation.delete") }}</a-button>
                </a-popconfirm>
                <a-divider v-if="record.deletedAt" margin="0"></a-divider>

                <a-popconfirm :content="$t('default.action.delete.logic')" position="left" type="info"
                  @ok="() => handlespecificItemLogicDelete(record.id)">
                  <a-button type="text" size="small">{{ $t("default.operation.logicDelete") }}</a-button>
                </a-popconfirm>

                <a-divider v-if="record.deletedAt" margin="0"></a-divider>

                <a-popconfirm v-if="record.deletedAt" :content="$t('default.action.delete.logic.recovery')" position="left" type="info"
                  @ok="() => handlespecificItemLogicDeleteRevert(record.id)">
                  <a-button type="text" size="small">{{ $t("default.operation.recoveryLogicDelete") }}</a-button>
                </a-popconfirm>
              </template>
            </a-popover>
          </span>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch, nextTick } from "vue"
import { useI18n } from "vue-i18n"
import { Message } from "@arco-design/web-vue"
import { FileItem } from "@arco-design/web-vue/es/upload/interfaces"
import { BaseType } from "@arco-design/web-vue/es/_utils/types"
import { read, utils, writeFileXLSX } from "xlsx"
import Sortable from "sortablejs"
import dayjs from "dayjs"
import type { SelectOptionData } from "@arco-design/web-vue/es/select/interface"
import type {
  TableColumnData,
  TableRowSelection,
} from "@arco-design/web-vue/es/table/interface"
import cloneDeep from "lodash/cloneDeep"
import useLoading from "@/hooks/loading"
import {
  SendLuck as Resp,
  SendLuckReq as Req,
  list,
  addList,
  logicDelete,
  logicDeleteList,
  deleteById,
  revertLogicDelete,
} from "@/api/luck/send_luck"
import { PageReq } from "@/api/luck/page"
import { Pagination } from "@/types/global"
import { useRouter } from 'vue-router';
const router = useRouter()

type SizeProps = "mini" | "small" | "medium" | "large"
type Column = TableColumnData & { checked?: true }

const generateFormModel = () => {
  return {

  } as Resp
}

const { loading, setLoading } = useLoading(true)
const { t } = useI18n()
const renderData = ref<Resp[]>([])
const formModel = ref(generateFormModel())
const cloneColumns = ref<Column[]>([])
const showColumns = ref<Column[]>([])

const size = ref<SizeProps>("medium")
const fileUploading = ref<boolean>(false)


const basePagination: Pagination = {
  current: 1,
  pageSize: 20,
}
const pagination = reactive({
  ...basePagination,
})
const densityList = computed(() => [
  {
    name: t("density.size.mini"),
    value: "mini",
  },
  {
    name: t("density.size.small"),
    value: "small",
  },
  {
    name: t("density.size.medium"),
    value: "medium",
  },
  {
    name: t("density.size.large"),
    value: "large",
  },
])
const columns = computed<TableColumnData[]>(() => [
  {
    title: t("default.columns.index"),
    dataIndex: "index",
    slotName: "index",
  },
  {
    title: t("default.form.id"),
    dataIndex: "id",
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
  {
    title: t("sendLuck.form.userId"),
    dataIndex: "userId",
    ellipsis: true,
    tooltip: true,
  },


  {
    title: t("sendLuck.form.firstName"),
    dataIndex: "firstName",
  },

  {
    title: t("sendLuck.form.groupId"),
    dataIndex: "groupId",
    ellipsis: true,
    tooltip: true,
  },
  {
    title: t("sendLuck.form.credit"),
    dataIndex: "credit",
    render(data) {
      return data.record.credit.toFixed(2) + 'U'
    },
  },
  {
    title: t("sendLuck.form.status"),
    dataIndex: "status",
    render(data) {
      return contentStatusOptions.value.find(item => item.value === data.record.status)?.label
    },
  },
 
  {
    title: t("default.columns.createdAt"),
    dataIndex: "createdAt",
    slotName: "createdAt",
    ellipsis: true,
    ortable: {
      sortDirections: ["ascend", "descend"],
    },
    checked: undefined,
  },

  {
    title: t("default.columns.updatedAt"),
    dataIndex: "updatedAt",
    slotName: "updatedAt",
    ellipsis: true,
    ortable: {
      sortDirections: ["ascend", "descend"],
    },
    checked: undefined,
  },

  {
    title: t("default.columns.deletedAt"),
    dataIndex: "deletedAt",
    slotName: "deletedAt",
    ellipsis: true,
    ortable: {
      sortDirections: ["ascend", "descend"],
    },
    checked: undefined,
  },

  {
    title: t("default.columns.operations"),
    fixed: "right",
    align: 'left',
    width: 200,
    isFirstRightFixed: true,
    dataIndex: "operations",
    slotName: "operations",
    ellipsis: false
  },
])

const contentStatusOptions = computed<SelectOptionData[]>(() => [
  {
    label: t("sendLuck.form.status.UNSETTLED"),
    value: 1,
  },
  {
    label: t("sendLuck.form.status.TERMED"),
    value: 2,
  },
  {
    label: t("sendLuck.form.status.EXPIRED"),
    value: 3,
  },
  {
    label: t("sendLuck.form.status.CANCEL"),
    value: 4,
  },
  {
    label: t("sendLuck.form.status.all"),
  },
])

const rowSelection = reactive<TableRowSelection>({
  type: "checkbox",
  showCheckedAll: true,
  selectedRowKeys: [],
})
const hasSelection = computed<boolean>(() => {
  return (
    rowSelection.selectedRowKeys !== undefined &&
    rowSelection.selectedRowKeys.length > 0
  )
})

const fetchData = async (
  pageParams: PageReq,
  quertyParams?: Req
) => {
  setLoading(true)
  try {
    const rsp = await list(pageParams, quertyParams)
    renderData.value = rsp.data.records
    pagination.current = rsp.data.current
    if(rsp.data.records?.length<basePagination.pageSize){
      pagination.total =(rsp.data.current) * basePagination.pageSize
    }else{
      pagination.total =(rsp.data.current+1) * basePagination.pageSize
    }
  } catch (err) {
    //you can report use errorHandler or other
  } finally {
    setLoading(false)
  }
}

const search = () => {
  fetchData(
    {
      page: basePagination.current,
      size: basePagination.pageSize,
      sort: "id,DESC",
    } as unknown as PageReq,

    formModel.value as unknown as Req
  )
}

const onPageChange = async (current: number) => {
  return fetchData({
    page: current,
    size: basePagination.pageSize,
    sort: "id,DESC",
  },
    formModel.value as unknown as Req
  )
}

fetchData(
  {
    page: basePagination.current,
    size: basePagination.pageSize,
    sort: "id,DESC",
  },
  formModel.value as unknown as Req
)

const handleDownload = () => {
  if (!hasSelection) return
  const selectKeyMap: { [index: string]: number } =
    rowSelection.selectedRowKeys!.reduce((s, n) => ({ ...s, [n]: 1 }), {})
  const matched = renderData.value.filter(
    item => selectKeyMap[item.id!] != null
  )
  const ws = utils.json_to_sheet(matched)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, "Data")
  writeFileXLSX(wb, `data.export.${dayjs().format("YYYY-MM-DD")}.xlsx`)
}

const handleFileChange = (fileList: FileItem[], fileItem: FileItem) => {
  if (fileItem.file == null || !window.FileReader) return
  fileUploading.value = true
  useLoading(true)
  const fileReader = new FileReader()

  fileReader.onload = async () => {
    const fileData = fileReader.result
    const wb = read(fileData, { type: "binary", cellDates: true })
    const sheets = Object.values(wb.Sheets)
    if (sheets.length === 0) return
    const jsonData = utils.sheet_to_json<Req>(sheets[0])
    await addList(jsonData)
    Message.success(t("default.import.success"))
    fileUploading.value = false
    await onPageChange(pagination.current)
    useLoading(false)
  }

  fileReader.readAsArrayBuffer(fileItem.file!)
}

const reset = () => {
  formModel.value = generateFormModel()
}

const handleSelectDensity = (
  val: string | number | Record<string, any> | undefined,
  e: Event
) => {
  size.value = val as SizeProps
}

const handleChange = (
  checked: boolean | (string | boolean | number)[],
  column: Column,
  index: number
) => {
  if (!checked) {
    cloneColumns.value = showColumns.value.filter(
      item => item.dataIndex !== column.dataIndex
    )
  } else {
    cloneColumns.value.splice(index, 0, column)
  }
}

const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(
      beforeIdx,
      1,
      newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    )
  }
  return newArray
}

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById("tableSetting") as HTMLElement
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const { oldIndex, newIndex } = e
          exchangeArray(cloneColumns.value, oldIndex, newIndex)
          exchangeArray(showColumns.value, oldIndex, newIndex)
        },
      })
    })
  }
}

watch(
  () => columns.value,
  val => {
    const excludes =["createdAt", "updatedAt", "deletedAt"]
    const allColums: Column[] = cloneDeep(val)

    const tableShowColums: Column[] = []

    const tableFilterColums: Column[] = []

    allColums.forEach((item, index) => {
      item.checked = excludes.includes(item.dataIndex!) ? undefined : true
      if (item.checked) {
        tableShowColums.push(item)
      }
      tableFilterColums.push(item)
    })

    cloneColumns.value = cloneDeep(tableShowColums)

    showColumns.value = cloneDeep(tableFilterColums)
  },
  { deep: true, immediate: true }
)

//彻底删除
const handlespecificItemDelete = async (id: string) => {
  if (!id) return
  await deleteById(id)
  Message.success(t("default.action.delete.success"))
  onPageChange(pagination.current)
}

//恢复逻辑删除
const handlespecificItemLogicDeleteRevert = async (id: string) => {
  if (!id) return
  await revertLogicDelete(id)
  Message.success(t("default.action.delete.recovery.success"))
  onPageChange(pagination.current)
}

//逻辑删除选中项[多选]
const handleSelectionDelete = () => {
  handleLogicListDelete(rowSelection.selectedRowKeys as string[])
  rowSelection.selectedRowKeys = []
}

//逻辑删除列表单项[数据项右侧点击删除]
const handlespecificItemLogicDelete = async (id: string) => {
  if (!id) return
  await handleLogicDelete(id)
}

//逻辑删除-单项
const handleLogicDelete = async (id: BaseType) => {
  await logicDelete(id)
  Message.success(t("default.action.delete.logic.success")) 
  onPageChange(pagination.current)
}

//逻辑删除-列表
const handleLogicListDelete = async (idList: string[]) => {
  if (idList.length === 0) return
  await logicDeleteList(idList)
  Message.success(t("default.action.delete.logic.success"))
  onPageChange(pagination.current)
}

const select = (rowKeys: BaseType[]) => {
  rowSelection.selectedRowKeys = rowKeys
}

const handleDetailView = (data: Resp) => {
  if (data.id !== undefined && data.id !== "") {
    router.push({ path: 'sendLuckView', query: { id: data.id } })
  }
}

const handleFormView = (data: Resp | undefined) => {
  router.push({ path: 'sendLuckForm', query: { id: data?.id } })
}
</script>

<script lang="ts">
export default {
  name: "SendLuckList",
}
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}

.action-icon {
  margin-left: 12px;
  cursor: pointer;
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.setting {
  display: flex;
  align-items: center;
  width: 200px;

  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>

<style>
.goal-list-delete-popover .arco-popover-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
