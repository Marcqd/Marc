

<template>
  <n-modal
      v-model:show="show"
      class="min-w-800px"
      preset="dialog"
      :title="title"
      :bordered="false"
      :showIcon = "false"
      size="huge"
  >
    <n-form
        ref="formRef"
        label-placement="left"
        label-width="auto"
        :model="form"
    >
      <n-form-item label="FIRST_NAME" path="FIRST_NAME" :rule="{required: true, trigger: ['input', 'blur']}">
        <n-input v-model:value="form.FIRST_NAME" placeholder="please input FIRST_NAME" />
      </n-form-item>
      <n-form-item label="LAST_NAME" path="LAST_NAME" :rule="{required: true, trigger: ['input', 'blur']}">
        <n-input v-model:value="form.LAST_NAME" placeholder="please input LAST_NAME" />
      </n-form-item>
      <n-form-item label="EMAIL" path="EMAIL" :rule="{required: true, trigger: ['input', 'blur']}">
        <n-input v-model:value="form.EMAIL" placeholder="please input EMAIL" />
      </n-form-item>
      <n-form-item label="PHONE_NUMBER" path="PHONE_NUMBER" :rule="{required: true, trigger: ['input', 'blur']}">
        <n-input v-model:value="form.PHONE_NUMBER" placeholder="please input PHONE_NUMBER" />
      </n-form-item>
      <n-form-item label="HIRE_DATE" path="HIRE_DATE" :rule="{required: true, trigger: ['input', 'blur']}">
        <n-input v-model:value="form.HIRE_DATE" placeholder="please input HIRE_DATE" />
<!--        <n-date-picker v-model:formatted-value="form.HIRE_DATE" type="date" value-format="yy-MM-dd" />-->
      </n-form-item>
      <n-form-item label="SALARY" path="SALARY" :rule="{required: true, type:'number', trigger: ['input', 'blur']}">
        <n-input-number v-model:value="form.SALARY" placeholder="please input SALARY" />
        <!--        <n-date-picker v-model:formatted-value="form.HIRE_DATE" type="date" value-format="yy-MM-dd" />-->
      </n-form-item>
    </n-form>
    <template #action>
      <n-space>
        <n-button @click="handleCancel">cancel</n-button>
        <n-button type="primary" :loading="loading" @click="handleSubmit">submit</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script setup lang="ts">
const show = ref(false)
    , {$message} = useNuxtApp()
    , form = <any>ref({})
    , formRef = ref(null)
    , modalType = ref('add')
    , loading = ref(false)
    , title = ref('add');
const emit = defineEmits(['ok']);
// ===== submit ===== //
function handleSubmit(){
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if(modalType.value === 'add'){
        const {data} = await $fetch('/api/employees',{headers: useRequestHeaders(['cookie']),method:'POST', body:form.value});
      }else{
        const {data} = await $fetch('/api/employees/'+ form.value.EMPLOYEE_ID,{headers: useRequestHeaders(['cookie']),method:'POST',body:form.value});
      }
      useNuxtApp().$message.success('success');
      show.value = false;
      emit('ok');
    } else {
      useNuxtApp().$message.error('validate error');
    }
  })
}
function handleCancel(){
  show.value = false;
}

// =====S add=====//
function add() {
  console.log(111)
  title.value = 'add';
  form.value = {}
  modalType.value = 'add';
  nextTick(() => {
    show.value = true;
  });
}
// =====S edit=====//
function edit(e:any) {
  title.value = 'edit';
  form.value = e;
  modalType.value = 'edit';
  nextTick(() => {
    show.value = true;
  });

}
defineExpose({
  add, edit
})
</script>