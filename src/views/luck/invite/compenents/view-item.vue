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
import { Invite as Resp } from '@/api/luck/invite';
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
    title: t('menu.luck.inviteView'),
    data: [
      {
        label: t('default.form.id'),
        value: renderData?.id || '-',
      },
      {
        label: t('invite.form.userId'),
        value: renderData?.userId || '-',
      },
      
      {
        label: t('invite.form.groupId'),
        value: renderData?.groupId || '-',
      },

      {
        label: t('invite.form.url'),
        value: renderData?.url || '-',
      },
      {
        label: t('invite.form.urlHash'),
        value: renderData?.urlHash || '-',
      },
   

      {
        label: t('invite.form.status'),
        value: contentStatusOptions.value.find(item => item.value === renderData.status)?.label || '-',
      },

      {
        label: t('invite.form.expiredAt'),
        value: renderData?.expiredAt || '-',
      },

      {
        label: t('invite.form.remark'),
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




const contentStatusOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("invite.form.status.enable"),
    value: 1,
  },
  {
    label: t("invite.form.status.disable"),
    value: 2,
  },
  {
    label: t("invite.form.status.all"),
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
