<template>
  <n-data-table
      :columns="columns"
      :data="tableData"

      :bordered="false"
  />
</template>

<script setup>
definePageMeta({
  layout: 'base'
})
useHead({
  title: 'system manger',
})
const supabase = useSupabaseClient()
    , checkedRowKeys = ref([])
    , tableData = ref([])
    , searchParams = ref({page:1,perPage:20});
const columns = [
  { title: 'No', key: 'no', sorter: true },
]
// ======= start search params ===== //
function handleSearch(values) {
  searchParams.value = values;
  reloadTable();
}

// =======S sort ======= //
function handleSorterChange(sorter) {
  searchParams.value.sortName = sorter.columnKey;
  searchParams.value.sortOrder = sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : '';
  reloadTable();
}

//=======S get list ====== //
async function getList(res) {
  return await apiAdminUserCashList({...searchParams.value, ...res});
}

//======= reload Table ====  //
function reloadTable() {
  //加入时间 强制刷新表格
  searchParams.value['_t'] = new Date().getTime();
  TableRef.value.reload();
}

//========= 操作按钮删除 ===s=h=o=p=w=w=i== //
function handleDelete(e) {
  const selectId = e.id || checkedRowKeys.value;
  const d = $dialog.warning({
    title: t('operation_tips'),
    content: t('delete_confirm', {id: selectId}),
    positiveText: t('confirm')+ t('del'),
    negativeText: t('cancel'),
    negativeButtonProps:{secondary:true,ghost:false},
    onPositiveClick: async () => {
      d.loading = true
      try {

        $message.success(data.msg);
        reloadTable()
      }finally {
        d.loading = false
      }
    }
  })
}

</script>
