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
import { LuckUser as Resp } from '@/api/luck/luck_user';
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
    title: t('menu.luck.luckUserView'),
    data: [
      {
        label: t('default.form.id'),
        value: renderData?.id || '-',
      },
      {
        label: t('luckUser.form.botUserId'),
        value: renderData?.botUserId || '-',
      },
      
      {
        label: t('luckUser.form.groupId'),
        value: renderData?.groupId || '-',
      },

      {
        label: t('luckUser.form.userName'),
        value: renderData?.userName || '-',
      },

    
      {
        label: t('luckUser.form.firstName'),
        value: renderData?.firstName || '-',
      },
      {
        label: t('luckUser.form.lastName'),
        value: renderData?.lastName || '-',
      },
      {
        label: t('luckUser.form.status'),
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


const contentRoleOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("luckUser.form.roles.admin"),
    value: "admin",
  },
  {
    label: t("luckUser.form.roles.user"),
    value: "user",
  },
  {
    label: t("luckUser.form.roles.all"),
  },
])


const contentStatusOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("luckUser.form.status.enable"),
    value: 1,
  },
  {
    label: t("luckUser.form.status.disable"),
    value: 2,
  },
  {
    label: t("luckUser.form.status.all"),
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
