<template>
    <div class="container">
        <Breadcrumb :items="['menu.luck.inviteList', 'menu.luck.inviteForm']" />
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-space direction="vertical" :size="16">
                <a-card class="general-card">
                    <template #title>
                        {{ $t("invite.form") }}
                    </template>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item field="userId" :label="$t('invite.form.userId')" :rules="[
                                {
                                    required: true,
                                    message: $t('invite.form.userId.placeholder'),
                                },
                            ]" :validate-trigger="['change', 'blur']">
                                <a-input v-model="formData.userId"
                                    :disabled="true"
                                    :placeholder="$t('invite.form.userId.placeholder')" />
                            </a-form-item>
                        </a-col>
                     
                        <a-col :span="8">
                            <a-form-item field="groupId" :label="$t('invite.form.groupId')"
                                :rules="[{ required: true, message: $t('invite.form.groupId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.groupId" 
                                    :disabled="true"
                                    :placeholder="$t('invite.form.groupId')" />
                            </a-form-item>
                        </a-col>


                        
                        <a-col :span="8">
                            <a-form-item field="status" :label="$t('invite.form.status')"
                                :rules="[{ required: true, message: $t('invite.form.status.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-select v-model="formData.status" :options="contentStatusOptions"
                                    :placeholder="$t('invite.form.status')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="url" :label="$t('invite.form.url')"
                                :rules="[{ required: true, message: $t('invite.form.url.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.url" 
                                    :disabled="true"
                                    :placeholder="$t('invite.form.url')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="urlHash" :label="$t('invite.form.urlHash')"
                                :rules="[{ required: true, message: $t('invite.form.urlHash.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.urlHash" 
                                    :disabled="true"
                                    :placeholder="$t('invite.form.lastName')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="remark" :label="$t('invite.form.remark')"
                                :rules="[{ required: false, message: $t('invite.form.remark.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.remark" 
                                    :placeholder="$t('invite.form.remark')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="expiredAt" :label="$t('invite.form.expiredAt')"
                                :rules="[{ required: true, message: $t('invite.form.expiredAt.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.expiredAt" 
                                    :placeholder="$t('invite.form.expiredAt')" />
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
import { finById, add, update, Invite as Resp, InviteReq as Req } from "@/api/luck/invite"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

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
                    router.push({ path: 'inviteList' })
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
                    router.push({ path: 'inviteList' })
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