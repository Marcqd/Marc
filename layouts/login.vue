<template>
  <n-layout>
    <n-layout-header style="height: 64px; padding: 24px" bordered>
      <div class="flex justify-between">
        <nuxt-link to="/" class="">LOGO</nuxt-link>
      </div>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <slot />
    </n-layout-content>
    <n-layout-footer class="h-40px flex items-center justify-center">COPY RIGHT</n-layout-footer>
  </n-layout>
</template>
