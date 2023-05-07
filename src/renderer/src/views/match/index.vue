<template>
  <div class="match">
    <n-card closable @close="close">
      <template #header> <div class="title">历史对局</div> </template>
    </n-card>
  </div>
</template>
<script setup lang="ts">
const close = (): void => {
  window.page.closeMatchWindow()
}
</script>
<style scoped>
.title {
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
</style>
