<template>
  <div>
    自动接受对局

    <n-switch v-model="replay" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const replay = ref(false)
</script>
