<template>
    <div class="container">
        <Breadcrumb :items="['menu.luck.inviteLogList', 'menu.luck.inviteLogForm']" />
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-space direction="vertical" :size="16">
                <a-card class="general-card">
                    <template #title>
                        {{ $t("inviteLog.form") }}
                    </template>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item field="userId" :label="$t('inviteLog.form.userId')" :rules="[
                                {
                                    required: true,
                                    message: $t('inviteLog.form.userId.placeholder'),
                                },
                            ]" :validate-trigger="['change', 'blur']">
                                <a-input v-model="formData.userId"
                                    :disabled="true"
                                    :placeholder="$t('inviteLog.form.userId.placeholder')" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item field="groupId" :label="$t('inviteLog.form.groupId')"
                                :rules="[{ required: true, message: $t('inviteLog.form.groupId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.groupId" 
                                :disabled="true"
                                    :placeholder="$t('inviteLog.form.groupId')" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item field="inviteeUserId" :label="$t('inviteLog.form.inviteeUserId')"
                                :rules="[{ required: true, message: $t('inviteLog.form.inviteeUserId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.inviteeUserId" 
                                    :disabled="true"
                                    :placeholder="$t('inviteLog.form.inviteeUserId')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="inviteUrl" :label="$t('inviteLog.form.inviteUrl')"
                                :rules="[{ required: true, message: $t('inviteLog.form.inviteUrl.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.inviteUrl" 
                                :disabled="true"
                                    :placeholder="$t('inviteLog.form.inviteUrl')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="urlHash" :label="$t('inviteLog.form.urlHash')"
                                :rules="[{ required: true, message: $t('inviteLog.form.urlHash.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.urlHash" 
                                :disabled="true"
                                    :placeholder="$t('inviteLog.form.urlHash')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="remark" :label="$t('inviteLog.form.remark')"
                                :rules="[{ required: false, message: $t('inviteLog.form.remark.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.remark" 
                                :disabled="true"
                                    :placeholder="$t('inviteLog.form.remark')" />
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
import { finById, add, update, InviteLog as Resp, InviteLogReq as Req } from "@/api/luck/invite_log"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';

const router = useRouter()
const route = useRoute()
const { t } = useI18n()



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
                    router.push({ path: 'inviteLogList' })
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
                    router.push({ path: 'inviteLogList' })
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