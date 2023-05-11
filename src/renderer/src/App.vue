<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>
<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<style lang="less">
#app {
  //   font-family: 'use-font';
}
</style>
