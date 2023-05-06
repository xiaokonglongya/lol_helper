<template>
  <div>
    <n-switch v-model="replay" />
    <n-button @click="test">测试</n-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const replay = ref(false)
const test: () => void = async () => {
  try {
    const result = await window.lcu.autoReplay()
    console.log('🚀 ~ file: AutoReplay.vue:15 ~ consttest: ~ result:', result)
  } catch (error) {
    console.log(error)
  }
}
</script>
