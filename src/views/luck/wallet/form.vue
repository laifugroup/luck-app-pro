<template>
    <div class="container">
        <Breadcrumb :items="['menu.luck.walletList', 'menu.luck.luckUserForm']" />
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-space direction="vertical" :size="16">
                <a-card class="general-card">
                    <template #title>
                        {{ $t("wallet.form") }}
                    </template>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item field="userId" :label="$t('wallet.form.userId')"
                                :rules="[{ required: true, message: $t('wallet.form.userId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.userId" 
                                :disabled="true"
                                    :placeholder="$t('wallet.form.userId')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="credit" :label="$t('wallet.form.credit')"
                                :rules="[{ required: true, message: $t('wallet.form.credit.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input-number v-model="formData.credit" 
                                    :disabled="true"
                                    :placeholder="$t('wallet.form.credit')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="status" :label="$t('wallet.form.status')"
                                :rules="[{ required: true, message: $t('wallet.form.status.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-select v-model="formData.status" :options="contentStatusOptions"
                                    :placeholder="$t('wallet.form.status')" />
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
import { finById, add, update, Wallet as Resp, WalletReq as Req } from "@/api/luck/wallet"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const contentStatusOptions = computed<SelectOptionData[]>(() => [
 
  {
    label: t("wallet.form.status.enable"),
    value: 1,
  },
  {
    label: t("wallet.form.status.disable"),
    value: 2,
  },
  {
    label: t("wallet.form.status.all"),
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
                    router.push({ path: 'walletList' })
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
                    router.push({ path: 'walletList' })
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