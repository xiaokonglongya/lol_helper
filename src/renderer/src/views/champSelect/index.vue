<template>
  <div>选人阶段</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useMessage } from 'naive-ui'
const message = useMessage()
const getSummoner = async (): Promise<void> => {
  try {
    const chat = await window.lcu.getChatSummons()

    if (!chat) throw Error('获取失败')
    const chat_id = chat.at(-1)!.id
    const chat_message = await window.lcu.getChatMessage(chat_id)
    if (!chat_message) throw Error('获取聊天组人员失败')
    console.log(chat_message)
  } catch (error) {
    message.error(error instanceof Error ? error?.message : '获取召唤师失败')
    console.log(error)
  }
}
onMounted(() => {
  setTimeout(() => {
    getSummoner()
  }, 2000)
})
</script>
