<template>
  <div class="w-64">
    <div class="title">
      <span text-xs font-bold v-html="equi?.name || ''"></span>
      <span class="text-yellow-400 text-xs mx-1">{{ equi?.gold.total }}金币</span>
    </div>
    <div class="line bg-gray-100"></div>
    <div class="text-xs" v-html="equi?.description || ''"></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { riotSotre, Equipment } from '@renderer/src/store'
const riot_store = riotSotre()
const props = defineProps({
  id: Number
})
const equi = ref<Equipment>()
props.id && (equi.value = riot_store.getEquipmentIcon(props.id))
</script>
<style scoped>
.line {
  width: 100%;
  height: 1px;
  margin: 5px 0;
}
.max-w-sm {
}
</style>
