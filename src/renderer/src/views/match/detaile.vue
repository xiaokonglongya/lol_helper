<template>
  <div class="match-details">{{ gameId }}</div>
</template>
<script setup lang="ts">
const props = defineProps<{
  gameId?: number
}>()
</script>
<style lang="less" scoped>
.match-details {
  background-color: #eee;
  padding: 10px 20px;
  height: 100%;
}
</style>
