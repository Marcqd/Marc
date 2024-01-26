<template>
  <div style="height: 100vh">
    <n-layout class="h-full">
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <div class="flex justify-between">
          <nuxt-link to="/" class="">LOGO</nuxt-link>
          <n-dropdown trigger="hover" :options="options" @select="handleSelect" v-if="user">
            <span>{{ user?.email}}</span>
          </n-dropdown>
        </div>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
          <n-menu
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              @update:value="goTo"
          />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <slot />
        </n-layout>
      </n-layout>
      <n-layout-footer bordered position="absolute" class="h-64px flex items-center justify-center">COPY RIGHT</n-layout-footer>
    </n-layout>
  </div>

</template>
<script setup lang="ts">
import {NuxtLink} from "#components";

const options = [
      {
        label: 'logout',
        key: 'signOut'
      }
    ];
const user = useSupabaseUser()
    , collapsed = ref(false)
    , menuOptions = ref([
        {
          label: 'users',
          key: 'user',
          path:'/users'
        },
        {
          label: 'employees',
          key: 'employees',
          path:'/employees'
        },
        {
          label: 'departments',
          key: 'departments',
          path:'/departments'
        },
])
    ,supabase = useSupabaseClient();
/**
 * select dropdown menu
 * @param key
 */
async function handleSelect(key: string | number) {
  if (key == 'signOut') {
    const {error} = await supabase.auth.signOut();
    if(error){
      useNuxtApp().$message.error(error.message);
    }
    await navigateTo('/login')
  }
}
function goTo(index:number,item:object){
  return navigateTo(item.path)
}
</script>