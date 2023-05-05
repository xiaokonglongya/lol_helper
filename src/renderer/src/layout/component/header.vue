<template>
  <div class="header">
    <div class="user_info">
      <n-avatar :size="66" :src="avatar" />
      <span class="user_info_name">
        {{ user_info?.displayName }}
      </span>
    </div>
    <AutoReplay />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AutoReplay from '../../components/AutoReplay.vue'
import { CurrentUserInfo } from '@preload/index.d'
const user_info = ref<CurrentUserInfo>()
const avatar = ref('')
onMounted(() => {
  const userInfo = window.store.getStore<CurrentUserInfo>('user_info')
  if (userInfo) {
    user_info.value = userInfo
    getAvatar()
  }
})
const getAvatar: () => void = async () => {
  if (user_info.value?.profileIconId !== undefined) {
    const url = await window.lcu.getAvatar(user_info.value?.profileIconId)
    if (url) avatar.value = url
  }
}
</script>
<style lang="less" scoped>
.user_info {
  display: flex;
  align-items: center;
  flex-direction: column;
  &_name {
    font-size: 22px;
    font-weight: bold;
  }
}
</style>
