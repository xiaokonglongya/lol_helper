<template>
  <div>
    <n-switch v-model="replay" />
    <n-button @click="test">测试</n-button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { autoReplay } from '@preload/lcu'

const replay = ref(false)
const test: () => void = async () => {
  try {
    console.log(window.store)
    const token = window.store.getStore('token')
    const port = window.store.getStore('port')

    const result = await autoReplay({
      token,
      port
    })
    console.log('🚀 ~ file: AutoReplay.vue:17 ~ result:', result)
  } catch (error) {
    console.log(error)
  }
}
</script>
