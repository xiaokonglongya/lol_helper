<template>
  <div>
    <Header />
    <div class="home">
      <Rank />
      <Setting />
      <n-card
        style="padding: 10px; margin-top: 10px; border-radius: 12px"
        hoverable
        content-style="padding:0"
      >
        <n-button size="small" type="primary" style="width: 100%" @click="getMathList">
          对局查询
        </n-button>
      </n-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from './component/header.vue'
import Rank from './component/rank.vue'
import Setting from './component/setting.vue'
const getMathList = (): void => {
  const match = window.page.openMatchWindow()
  console.log('🚀 ~ file: index.vue:19 ~ getMathList ~ match:', match)
}
</script>
<style scoped>
.home {
  padding: 10px;
}
</style>
