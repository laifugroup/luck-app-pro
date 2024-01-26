<template>
    <div class="container">
        <Breadcrumb :items="['menu.luck.goodLuckList', 'menu.luck.goodLuckForm']" />
        <a-form ref="formRef" layout="vertical" :model="formData">
            <a-space direction="vertical" :size="16">
                <a-card class="general-card">
                    <template #title>
                        {{ $t("goodLuck.form") }}
                    </template>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item field="goodLuck" :label="$t('goodLuck.form.userName')" :rules="[
                                {
                                    required: true,
                                    message: $t('goodLuck.form.userName.placeholder'),
                                },
                            ]" :validate-trigger="['change', 'blur']">
                                <a-input v-model="formData.userName"
                                    :disabled="true"
                                    :placeholder="$t('goodLuck.form.userName.placeholder')" />
                            </a-form-item>
                        </a-col>


                        
                        <a-col :span="8">
                            <a-form-item field="groupId" :label="$t('goodLuck.form.groupId')"
                                :rules="[{ required: true, message: $t('goodLuck.form.groupId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.groupId" 
                                    :disabled="true"
                                    :placeholder="$t('goodLuck.form.groupId')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="firstName" :label="$t('goodLuck.form.firstName')"
                                :rules="[{ required: true, message: $t('goodLuck.form.firstName.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.firstName" 
                                :disabled="true"
                                    :placeholder="$t('goodLuck.form.firstName')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="lastName" :label="$t('goodLuck.form.lastName')"
                                :rules="[{ required: true, message: $t('goodLuck.form.lastName.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.lastName" 
                                :disabled="true"
                                    :placeholder="$t('goodLuck.form.lastName')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="credit" :label="$t('goodLuck.form.credit')"
                                :rules="[{ required: true, message: $t('goodLuck.form.credit.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input-number v-model="formData.credit" 
                                :disabled="true"
                                    :placeholder="$t('goodLuck.form.credit')" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item field="boomNumber" :label="$t('goodLuck.form.boomNumber')"
                                :rules="[{ required: true, message: $t('goodLuck.form.boomNumber.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.boomNumber" 
                                :disabled="true"
                                    :placeholder="$t('goodLuck.form.boomNumber')" />
                            </a-form-item>
                        </a-col>


                        <a-col :span="8">
                            <a-form-item field="sendRedPackUserId" :label="$t('goodLuck.form.sendRedPackUserId')"
                                :rules="[{ required: true, message: $t('goodLuck.form.sendRedPackUserId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.sendRedPackUserId" 
                                :disabled="true"
                                    :placeholder="$t('goodLuck.form.sendRedPackUserId')" />
                            </a-form-item>
                        </a-col>


                        
                        <a-col :span="8">
                            <a-form-item field="betRedPackId" :label="$t('goodLuck.form.betRedPackId')"
                                :rules="[{ required: true, message: $t('goodLuck.form.betRedPackId.placeholder') }]"
                                :validate-trigger="['change']">
                                <a-input v-model="formData.betRedPackId" 
                                :disabled="true"
                                    :placeholder="$t('goodLuck.form.betRedPackId')" />
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
import { finById, add, update, GoodLuck as Resp, GoodLuckReq as Req } from "@/api/luck/good_luck"
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
                    router.push({ path: 'goodLuckList' })
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