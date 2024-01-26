<template>
  <n-form
      inline label-placement="left"
      label-width="auto"
      :model="searchParams"
  >
    <n-form-item label="FIRST_NAME" path="FIRST_NAME">
      <n-input v-model:value="searchParams.FIRST_NAME" placeholder="please input FIRST_NAME" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" type="primary" @click="getList" >Search</n-button>
    </n-form-item>
  </n-form>
  <n-button @click="$refs.modulesEmployeesRef.add()" type="primary" class="mb-4">Add</n-button>
  <n-data-table
      :columns="columns"
      :scroll-x="1800"
      :data="tableData"
      :pagination="{pageSize:10}"
      :bordered="false"
      @update:sorter="handleSorterChange"
  />
  <ModulesEmployees ref="modulesEmployeesRef" @ok="getList" />
</template>

<script setup>
import {NButton, NSpace} from "naive-ui";

definePageMeta({
  layout: 'base'
})
useHead({
  title: 'system manger',
})
const supabase = useSupabaseClient()
    , modulesEmployeesRef = ref(null)
    , checkedRowKeys = ref([])
    , tableData = ref([])
    , {$dialog,$message} = useNuxtApp()
    , searchParams = ref({page:1,perPage:20});
const columns = [
  { title: 'EMPLOYEE_ID', key: 'EMPLOYEE_ID', sorter: true },
  { title: 'FIRST_NAME', key: 'FIRST_NAME' },
  { title: 'LAST_NAME', key: 'LAST_NAME' },
  { title: 'EMAIL', key: 'EMAIL', sorter: true },
  { title: 'PHONE_NUMBER', key: 'PHONE_NUMBER', sorter: true },
  { title: 'HIRE_DATE', key: 'HIRE_DATE' },
  { title: 'JOB_ID', key: 'JOB_ID'},
  { title: 'SALARY', key: 'SALARY' },
  { title: 'COMMISSION_PCT', key: 'COMMISSION_PCT' },
  { title: 'MANAGER_ID', key: 'MANAGER_ID' },
  { title: 'DEPARTMENT_ID', key: 'DEPARTMENT_ID' },
  {
    title: 'Action',
    key: 'actions',
    fixed: 'right',
    render (row) {
      return h(NSpace,null,{default: () =>[h(
          NButton,
          {
            size: 'small', type:"primary",
            onClick:modulesEmployeesRef.value.edit.bind(null, row)
          },
          { default: () => 'Edit' }
      ),h(
          NButton,
          {
            size: 'small',type:"error",
            onClick:handleDelete.bind(null, row),
          },
          { default: () => 'Delete' }
      )]})
    }
  }
];
onMounted(function () {
  getList()
})

// =======S sort ======= //
function handleSorterChange(sorter) {
  searchParams.value.sortName = sorter.columnKey;
  searchParams.value.sortOrder = sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : '';
  getList();
}

//=======S get list ====== //
async function getList() {
  const {data} =  await $fetch('/api/employees',{headers: useRequestHeaders(['cookie']),params:searchParams.value});
  tableData.value = data;
}

//========= delete =====  //
function handleDelete(e) {
  const selectId = e.EMPLOYEE_ID;
  const d = $dialog.warning({
    title: 'operation_tips',
    content: 'are you delete',
    positiveText: 'confirm del',
    negativeText: 'cancel',
    negativeButtonProps:{secondary:true,ghost:false},
    onPositiveClick: async () => {
      d.loading = true
      try {
        const {data} =  await $fetch('/api/employees/'+selectId,{headers: useRequestHeaders(['cookie']),method:'delete'});
        $message.success('success');
        await getList()
      }finally {
        d.loading = false
      }
    }
  })
}

</script>
