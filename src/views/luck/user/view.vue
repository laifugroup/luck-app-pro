<template>
  <div class="container">
    <Breadcrumb :items="['menu.luck.luckUserList', 'menu.luck.luckUserView']" />
    <a-space direction="vertical" :size="16" fill>
      <a-card class="general-card">
        <ViewItem :loading="preLoading" type="pre" :render-data="details" />
      </a-card>
      <OperationLog />
      <!-- <MyCreditLog v-if="Object.keys(details).length > 0" :detailData="details" /> -->
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useLoading from '@/hooks/loading';
import { finById, LuckUser as Resp } from '@/api/luck/luck_user';
import ViewItem from './compenents/view-item.vue';
import { useRoute } from 'vue-router';

let route = useRoute();

const { loading, setLoading } = useLoading(true);
const { loading: preLoading, setLoading: preSetLoading } = useLoading(true);
const details = ref<Resp>({} as Resp);
const step = ref(1);

const fetchData = async (id: string) => {
  try {
    const { data } = await finById(id);
    details.value = data;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    preSetLoading(false);
  }
};

if (route.query.id !== undefined && route.query.id !== "") {
  fetchData(route.query.id as string);
} else {
  preSetLoading(false);
}
</script>

<script lang="ts">
export default {
  name: 'Basic',
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.steps {
  max-width: 548px;
  margin: 0 auto 10px;
}
</style>
