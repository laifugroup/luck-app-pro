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
import { GoodLuck as Resp } from '@/api/luck/good_luck';
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
    title: t('menu.luck.goodLuckView'),
    data: [
      {
        label: t('default.form.id'),
        value: renderData?.id || '-',
      },
      {
        label: t('goodLuck.form.userId'),
        value: renderData?.userId || '-',
      },
      
      {
        label: t('goodLuck.form.sendRedPackUserId'),
        value: renderData?.sendRedPackUserId || '-',
      },

    

      {
        label: t('goodLuck.form.userName'),
        value: renderData?.userName || '-',
      },

    
      {
        label: t('goodLuck.form.firstName'),
        value: renderData?.firstName || '-',
      },
      {
        label: t('goodLuck.form.lastName'),
        value: renderData?.lastName || '-',
      },

      {
        label: t('goodLuck.form.betRedPackId'),
        value: renderData?.betRedPackId || '-',
      },

      {
        label: t('goodLuck.form.boomNumber'),
        value: renderData?.boomNumber || '-',
      },

      {
        label: t('goodLuck.form.credit'),
        value: renderData?.credit?.toFixed(2) +'U' || '-',
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





</script>

<style scoped lang="less">
.item-container {
  padding-top: 20px;

  :deep(.arco-descriptions-item-label) {
    font-weight: normal;
  }
}
</style>
