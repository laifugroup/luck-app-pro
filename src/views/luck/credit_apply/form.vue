<template>
    <div class="container">
        <Breadcrumb :items="['menu.luck.creditApplyList', 'menu.luck.creditApplyForm']" />
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-space direction="vertical" :size="16">
                <a-card class="general-card">
                    <template #title>
                        {{ $t("creditApply.form") }}
                    </template>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item field="userId" :label="$t('creditApply.form.userId')" :rules="[
                                {
                                    required: true,
                                    message: $t('creditApply.form.userId.placeholder'),
                                },
                            ]" :validate-trigger="['change', 'blur']">
                                <a-input v-model="formData.userId"
                                    :disabled="true"
                                    :placeholder="$t('creditApply.form.userId.placeholder')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="fromAddress" :label="$t('creditApply.form.fromAddress')"
                                :rules="[{ required: true, message: $t('creditApply.form.fromAddress.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.fromAddress" 
                                :disabled="false"
                                    :placeholder="$t('creditApply.form.fromAddress')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="toAddress" :label="$t('creditApply.form.toAddress')"
                                :rules="[{ required: true, message: $t('creditApply.form.toAddress.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.toAddress" 
                                :disabled="false"
                                    :placeholder="$t('creditApply.form.toAddress')" />
                            </a-form-item>
                        </a-col>


                        
                        <a-col :span="8">
                            <a-form-item field="txnHash" :label="$t('creditApply.form.txnHash')"
                                :rules="[{ required: true, message: $t('creditApply.form.txnHash.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.txnHash" 
                                :disabled="false"
                                    :placeholder="$t('creditApply.form.txnHash')" />
                            </a-form-item>
                        </a-col>




                        <a-col :span="8">
                            <a-form-item field="credit" :label="$t('creditApply.form.credit')"
                                :rules="[{ required: true, message: $t('creditApply.form.credit.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.credit" 
                                :disabled="false"
                                    :placeholder="$t('creditApply.form.credit')" />
                            </a-form-item>
                        </a-col>



                        <a-col :span="8">
                            <a-form-item field="type" :label="$t('creditApply.form.type')"
                                :rules="[{ required: true, message: $t('creditApply.form.type.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-select v-model="formData.type" :options="contentTypeOptions"
                                    :disabled="true"
                                    :placeholder="$t('creditApply.form.type')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="status" :label="$t('creditApply.form.status')"
                                :rules="[{ required: true, message: $t('creditApply.form.status.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-select v-model="formData.status" :options="contentStatusOptions"
                                    :disabled="false"
                                    :placeholder="$t('creditApply.form.status')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="remark" :label="$t('creditLog.form.remark')"
                                :rules="[{ required: true, message: $t('creditLog.form.remark.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.remark" 
                                    :disabled="true"
                                    :placeholder="$t('creditLog.form.remark')" />
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
import { finById, add, update, CreditApply as Resp, CreditApplyReq as Req } from "@/api/luck/credit_apply"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';

const router = useRouter()
const route = useRoute()
const { t } = useI18n()


const contentTypeOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("creditApply.form.type.UP"),
    value: 1,
  },
  {
    label: t("creditApply.form.type.DOWN"),
    value: 2,
  },
  {
    label: t("creditApply.form.type.all"),
  },
])

const contentStatusOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("creditApply.form.status.APPLY"),
    value: 1,
  },
  {
    label: t("creditApply.form.status.AUDIT_PASS"),
    value: 2,
  },
  {
    label: t("creditApply.form.status.TRADE_FAIL"),
    value: 3,
  },
  {
    label: t("creditApply.form.status.TRADE_SUCCESS"),
    value: 4,
  },
  {
    label: t("creditApply.form.status.REJECT"),
    value: 5,
  },
  {
    label: t("creditApply.form.status.all"),
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
                    router.push({ path: 'creditLogList' })
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
                    router.push({ path: 'creditLogList' })
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