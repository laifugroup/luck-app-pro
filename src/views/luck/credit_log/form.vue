<template>
    <div class="container">
        <Breadcrumb :items="['menu.luck.creditLogList', 'menu.luck.creditLogForm']" />
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-space direction="vertical" :size="16">
                <a-card class="general-card">
                    <template #title>
                        {{ $t("creditLog.form") }}
                    </template>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item field="userId" :label="$t('creditLog.form.userId')" :rules="[
                                {
                                    required: true,
                                    message: $t('creditLog.form.userId.placeholder'),
                                },
                            ]" :validate-trigger="['change', 'blur']">
                                <a-input v-model="formData.userId"
                                    :disabled="true"
                                    :placeholder="$t('creditLog.form.userId.placeholder')" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item field="creditBefore" :label="$t('creditLog.form.creditBefore')"
                                :rules="[{ required: true, message: $t('creditLog.form.creditBefore.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.creditBefore" 
                                :disabled="true"
                                    :placeholder="$t('creditLog.form.creditBefore')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="credit" :label="$t('creditLog.form.credit')"
                                :rules="[{ required: true, message: $t('creditLog.form.credit.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.credit" 
                                :disabled="true"
                                    :placeholder="$t('creditLog.form.credit')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="creditAfter" :label="$t('creditLog.form.creditAfter')"
                                :rules="[{ required: true, message: $t('creditLog.form.creditAfter.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.creditAfter" 
                                :disabled="true"
                                    :placeholder="$t('creditLog.form.creditAfter')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="type" :label="$t('creditLog.form.type')"
                                :rules="[{ required: true, message: $t('creditLog.form.type.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-select v-model="formData.type" :options="contentTypeOptions"
                                    :disabled="true"
                                    :placeholder="$t('creditLog.form.status')" />
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
import { finById, add, update, CreditLog as Resp, CreditLogReq as Req } from "@/api/luck/credit_log"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const contentTypeOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("creditLog.form.type.RECHARGE"),
    value: 1,
  },
  {
    label: t("creditLog.form.type.CREDITED"),
    value: 2,
  },
  {
    label: t("creditLog.form.type.GRAB_RED_PACK"),
    value: 3,
  },
  {
    label: t("creditLog.form.type.SECURITY_DEPOSIT"),
    value: 4,
  },
  {
    label: t("creditLog.form.type.SECURITY_DEPOSIT_BACK"),
    value: 5,
  },

  {
    label: t("creditLog.form.type.REWARD"),
    value: 6,
  },

  {
    label: t("creditLog.form.type.SEND_RED_PACK"),
    value: 7,
  },
  {
    label: t("creditLog.form.type.BOOM"),
    value: 8,
  },
  {
    label: t("creditLog.form.type.COMPENSATION"),
    value: 9,
  },
  {
    label: t("creditLog.form.type.ADJUSTMENT_DOWN"),
    value: 10,
  },
  {
    label: t("creditLog.form.type.ADJUSTMENT_UP"),
    value: 11,
  },
  {
    label: t("creditLog.form.type.PLATFORM_WATER"),
    value: 12,
  },

  {
    label: t("creditLog.form.type.INVITE_WATER"),
    value: 13,
  },
  {
    label: t("creditLog.form.type.CHILD_BOOM_REBATE"),
    value: 14,
  },

  {
    label: t("creditLog.form.type.CREDIT_UP"),
    value: 15,
  },
  {
    label: t("creditLog.form.type.CREDIT_DOWN"),
    value: 16,
  },
  {
    label: t("creditLog.form.type.ACTIVITY"),
    value: 17,
  },

  {
    label: t("creditLog.form.type.all"),
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