<template>
  <div class="item-container">
    <a-space :size="16" direction="vertical" fill>
      <a-descriptions v-for="(item, idx) in blockDataList" :key="idx" :label-style="{
        textAlign: 'right',
        width: '200px',
        paddingRight: '10px',
        color: 'rgb(var(--gray-8))',
      }" :value-style="{ width: '400px' }" :title="item.title" :data="item.data">
        <template #value="{ value }">
          <a-skeleton v-if="loading" :animation="true">
            <a-skeleton-line :widths="['200px']" :rows="1" />
          </a-skeleton>
          <span v-else>{{ value }}</span>
        </template>
      </a-descriptions>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { CreditLog as Resp } from '@/api/luck/credit_log';
import type { SelectOptionData } from "@arco-design/web-vue/es/select/interface"
const { t } = useI18n()

type BlockList = {
  title: string;
  data: {
    label: string;
    value: string;
  }[];
}[];

const props = defineProps({
  renderData: {
    type: Object as PropType<Resp>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const blockDataList = computed<BlockList>(() => {
  const { renderData } = props;
  const result = [];
  result.push({
    title: t('menu.luck.creditLogView'),
    data: [
      {
        label: t('default.form.id'),
        value: renderData?.id || '-',
      },
      {
        label: t('creditLog.form.userId'),
        value: renderData?.userId || '-',
      },
      
      {
        label: t('creditLog.form.type'),
        value: contentTypeOptions.value.find(item => item.value === renderData.type)?.label || '-',
      },
      
      {
        label: t('creditLog.form.creditBefore'),
        value: renderData?.creditBefore || '-',
      },
      {
        label: t('creditLog.form.credit'),
        value: renderData?.credit || '-',
      },
      {
        label: t('creditLog.form.creditAfter'),
        value: renderData?.creditAfter || '-',
      },

      {
        label: t('creditLog.form.remark'),
        value: renderData?.remark || '-',
      },
      
    ],
  });

  result.push({
    title: t('default.form.at'),
    data: [
      {
        label: t('default.form.createdAt'),
        value: renderData?.createdAt || '-',
      },
      {
        label: t('default.form.updatedAt'),
        value: renderData?.updatedAt || '-',
      },
      {
        label: t('default.form.deletedAt'),
        value: renderData?.deletedAt || '-',
      },
    ],
  });

  return result;
});


const contentTypeOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("creditLog.form.type.RECHARGE"),
    value: 1,
  },
  {
    label: t("creditLog.form.type.CREDITED"),
    value: 2,
  },
  {
    label: t("creditLog.form.type.GRAB_RED_PACK"),
    value: 3,
  },
  {
    label: t("creditLog.form.type.SECURITY_DEPOSIT"),
    value: 4,
  },
  {
    label: t("creditLog.form.type.SECURITY_DEPOSIT_BACK"),
    value: 5,
  },

  {
    label: t("creditLog.form.type.REWARD"),
    value: 6,
  },

  {
    label: t("creditLog.form.type.SEND_RED_PACK"),
    value: 7,
  },
  {
    label: t("creditLog.form.type.BOOM"),
    value: 8,
  },
  {
    label: t("creditLog.form.type.COMPENSATION"),
    value: 9,
  },
  {
    label: t("creditLog.form.type.ADJUSTMENT_DOWN"),
    value: 10,
  },
  {
    label: t("creditLog.form.type.ADJUSTMENT_UP"),
    value: 11,
  },
  {
    label: t("creditLog.form.type.PLATFORM_WATER"),
    value: 12,
  },

  {
    label: t("creditLog.form.type.AGENT_WATER"),
    value: 13,
  },
  {
    label: t("creditLog.form.type.CHILD_BOOM_REBATE"),
    value: 14,
  },

  {
    label: t("creditLog.form.type.CREDIT_UP"),
    value: 15,
  },
  {
    label: t("creditLog.form.type.CREDIT_DOWN"),
    value: 16,
  },
  {
    label: t("creditLog.form.type.ACTIVITY"),
    value: 17,
  },

  {
    label: t("creditLog.form.type.INVITE"),
    value: 18,
  },
  {
    label: t("creditLog.form.type.CREDIT_DOWN_REJECT"),
    value: 19,
  },
  {
    label: t("creditLog.form.type.CREDIT_UP_PASS"),
    value: 20,
  },


  {
    label: t("creditLog.form.type.all"),
  },
])



</script>

<style scoped lang="less">
.item-container {
  padding-top: 20px;

  :deep(.arco-descriptions-item-label) {
    font-weight: normal;
  }
}
</style>
