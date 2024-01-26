<template>
    <div class="container">
        <Breadcrumb :items="['menu.luck.luckUserList', 'menu.luck.luckUserForm']" />
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-space direction="vertical" :size="16">
                <a-card class="general-card">
                    <template #title>
                        {{ $t("luckUser.form") }}
                    </template>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item field="userName" :label="$t('luckUser.form.userName')" :rules="[
                                {
                                    required: true,
                                    message: $t('luckUser.form.userName.placeholder'),
                                },
                            ]" :validate-trigger="['change', 'blur']">
                                <a-input v-model="formData.userName"
                                    :disabled="true"
                                    :placeholder="$t('luckUser.form.userName.placeholder')" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item field="botUserId" :label="$t('luckUser.form.botUserId')"
                                :rules="[{ required: true, message: $t('luckUser.form.botUserId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.botUserId" 
                                :disabled="true"
                                    :placeholder="$t('luckUser.form.botUserId')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="status" :label="$t('luckUser.form.status')"
                                :rules="[{ required: true, message: $t('luckUser.form.status.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-select v-model="formData.status" :options="contentStatusOptions"
                                    :placeholder="$t('luckUser.form.status')" />
                            </a-form-item>
                        </a-col>

                        
                        <a-col :span="8">
                            <a-form-item field="groupId" :label="$t('luckUser.form.groupId')"
                                :rules="[{ required: true, message: $t('luckUser.form.groupId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.groupId" 
                                    :disabled="true"
                                    :placeholder="$t('luckUser.form.groupId')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="firstName" :label="$t('luckUser.form.firstName')"
                                :rules="[{ required: true, message: $t('luckUser.form.firstName.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.firstName" 
                                :disabled="true"
                                    :placeholder="$t('luckUser.form.firstName')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="lastName" :label="$t('luckUser.form.lastName')"
                                :rules="[{ required: true, message: $t('luckUser.form.lastName.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.lastName" 
                                :disabled="true"
                                    :placeholder="$t('luckUser.form.lastName')" />
                            </a-form-item>
                        </a-col>

                    
                    </a-row>
                </a-card>
               
            </a-space>
            <div class="actions">
                <a-space>
                    <a-button @click="onResetClick">
                        {{ $t("groupForm.reset") }}
                    </a-button>
                    <a-button type="primary" :loading="loading" @click="onSubmitClick">
                        {{ $t("groupForm.submit") }}
                    </a-button>
                </a-space>
            </div>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { FormInstance } from "@arco-design/web-vue/es/form"
import useLoading from "@/hooks/loading"
import { SelectOptionData } from "@arco-design/web-vue/es/select/interface"
import { reactive, computed, ref, onMounted } from "vue"
import { finById, add, update, LuckUser as Resp, LuckUserReq as Req } from "@/api/luck/luck_user"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

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


const formData = ref<Resp>({} as Resp)
const formRef = ref<FormInstance>()
const { loading, setLoading } = useLoading()
const onSubmitClick = async () => {

    const res = await formData.value
    setLoading(true)
    if (res?.id == undefined || res?.id == "") {


        try {
            add(res).then(res => {
                setLoading(false)
                Message.success(t('success.result.title'));
                if (res.status = 200) {
                    router.push({ path: 'luckUserList' })
                }
            })
        } catch (err) {
            // you can report use errorHandler or other
        } finally {
            setLoading(false)
        }
    } else {
        try {
            await update(res.id, res).then(res => {
                setLoading(false)
                Message.success(t('success.result.title'));
                if (res.status = 200) {
                    router.push({ path: 'luckUserList' })
                }
            })
        } catch (err) {
            // you can report use errorHandler or other
        } finally {
            setLoading(false)
        }
    }


}

const onResetClick = async () => {
    formData.value = {} as Req
}

const fetchData = async (id: string) => {
    try {
        const { data } = await finById(id)
        formData.value = data
    } catch (err) {
        // you can report use errorHandler or other
    } finally {
        setLoading(false)
    }
}

if (route.query.id !== undefined && route.query.id !== "") {
    fetchData(route.query.id as string)
} else {
    setLoading(false)
}
</script>

<script lang="ts">
export default {
    name: "Group",
}
</script>

<style scoped lang="less">
.container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
}

.actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
}
</style>