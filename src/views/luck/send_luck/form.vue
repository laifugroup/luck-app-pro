<template>
    <div class="container">
        <Breadcrumb :items="['menu.luck.sendLuckList', 'menu.luck.sendLuckForm']" />
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-space direction="vertical" :size="16">
                <a-card class="general-card">
                    <template #title>
                        {{ $t("sendLuck.form") }}
                    </template>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item field="sendLuck" :label="$t('sendLuck.form.userName')" :rules="[
                                {
                                    required: true,
                                    message: $t('sendLuck.form.userName.placeholder'),
                                },
                            ]" :validate-trigger="['change', 'blur']">
                                <a-input v-model="formData.userName"
                                    :disabled="true"
                                    :placeholder="$t('sendLuck.form.userName.placeholder')" />
                            </a-form-item>
                        </a-col>


                        
                        <a-col :span="8">
                            <a-form-item field="groupId" :label="$t('sendLuck.form.groupId')"
                                :rules="[{ required: true, message: $t('sendLuck.form.groupId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.groupId" 
                                    :disabled="true"
                                    :placeholder="$t('sendLuck.form.groupId')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="firstName" :label="$t('sendLuck.form.firstName')"
                                :rules="[{ required: true, message: $t('sendLuck.form.firstName.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.firstName" 
                                :disabled="true"
                                    :placeholder="$t('sendLuck.form.firstName')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="lastName" :label="$t('sendLuck.form.lastName')"
                                :rules="[{ required: true, message: $t('sendLuck.form.lastName.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.lastName" 
                                :disabled="true"
                                    :placeholder="$t('sendLuck.form.lastName')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="credit" :label="$t('sendLuck.form.credit')"
                                :rules="[{ required: true, message: $t('sendLuck.form.credit.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input-number v-model="formData.credit" 
                                :disabled="true"
                                    :placeholder="$t('sendLuck.form.credit')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="redPackNumbers" :label="$t('sendLuck.form.redPackNumbers')"
                                :rules="[{ required: true, message: $t('sendLuck.form.redPackNumbers.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.redPackNumbers" 
                                :disabled="true"
                                    :placeholder="$t('sendLuck.form.redPackNumbers')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="boomNumber" :label="$t('sendLuck.form.boomNumber')"
                                :rules="[{ required: true, message: $t('sendLuck.form.boomNumber.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.boomNumber" 
                                :disabled="true"
                                    :placeholder="$t('sendLuck.form.boomNumber')" />
                            </a-form-item>
                        </a-col>


                        
                        <a-col :span="8">
                            <a-form-item field="status" :label="$t('sendLuck.form.status')"
                                :rules="[{ required: true, message: $t('sendLuck.form.status.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-select v-model="formData.status" :options="contentStatusOptions"
                                    :placeholder="$t('sendLuck.form.status')" />
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
import { finById, add, update, SendLuck as Resp, SendLuckReq as Req } from "@/api/luck/send_luck"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

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
                    router.push({ path: 'sendLuckList' })
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