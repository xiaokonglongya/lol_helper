<template>
  <div class="setting">
    <n-card style="padding: 10px; border-radius: 12px" hoverable content-style="padding:0">
      <div class="setting-item">
        <div class="label">自动接收对局</div>
        <div class="right">
          <n-switch v-model:value="replay" size="small" @update-value="updateReplay" />
        </div>
      </div>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
const replay = ref(window.lcu.getReplay())
const message = useMessage()

const updateReplay = (): void => {
  const value = replay.value
  const result = window.lcu.setReplay(value)
  if (result) {
    message.success('设置成功')
  }
}
</script>
<style lang="less" scoped>
.setting {
  margin-top: 30px;
  &-item {
    display: flex;
    justify-content: space-between;
  }
}
</style>
