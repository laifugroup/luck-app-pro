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
import { Wallet as Resp } from '@/api/luck/wallet';
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
    title: t('menu.luck.walletView'),
    data: [
      {
        label: t('default.form.id'),
        value: renderData?.id || '-',
      },
      {
        label: t('wallet.form.userId'),
        value: renderData?.userId || '-',
      },
      {// return renderData?.credit.toFixed(2) + 'U'
        label: t('wallet.form.credit'),
        value: renderData?.credit?.toFixed(2) +'U' || '-',
      },
   
      {
        label: t('wallet.form.status'),
        value: contentStatusOptions.value.find(item => item.value === renderData.status)?.label || '-',
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




const contentStatusOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("wallet.form.status.enable"),
    value: 1,
  },
  {
    label: t("wallet.form.status.disable"),
    value: 2,
  },
  {
    label: t("wallet.form.status.all"),
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
