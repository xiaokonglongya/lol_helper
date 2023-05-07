<template>
  <div class="header">
    <div class="header_title">
      <span class="header_title_text">LOL助手 </span>
      <div class="header-action">
        <n-space :size="10">
          <n-icon size="20" class="close-icon" @click="hindMainWindow">
            <RemoveOutline />
          </n-icon>

          <n-popconfirm
            positive-text="确认"
            negative-text="取消"
            @positive-click="handlePositiveClick"
          >
            <template #trigger>
              <n-icon size="20" class="close-icon">
                <EnterOutline />
              </n-icon>
            </template>
            是否确认关闭程序？
          </n-popconfirm>
        </n-space>
      </div>
    </div>
    <div class="user_info">
      <n-card class="user_info-card" hoverable content-style="padding: 10px">
        <div class="user_info-card-box">
          <div style="display: flex; align-items: center">
            <n-avatar :size="54" :src="avatar" round />
          </div>
          <div class="user-info-content">
            <span class="name">
              {{ user_info?.displayName }}
            </span>
            <span class="level">
              <span style="width: 70px; font-size: 14px"> LV:{{ current_level_text }}</span>
              <n-progress
                :height="12"
                type="line"
                :percentage="next_level_progress"
                :indicator-placement="'inside'"
              />
            </span>
            <span class="others">
              <n-space>
                <n-tag size="small" round type="warning">
                  荣誉等级:{{ summer_honors?.honorLevel }}
                </n-tag>
                <n-tag size="small" round type="success">
                  里程点数:{{ summer_honors?.checkpoint }}
                </n-tag>
              </n-space>
            </span>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CurrentUserInfo, SummerHonorLevel } from '@preload/index.d'
import { EnterOutline, RemoveOutline } from '@vicons/ionicons5'
const user_info = ref<CurrentUserInfo>()
const summer_honors = ref<SummerHonorLevel>()
const avatar = ref('')
onMounted(() => {
  getHeaderData()
})

const getHeaderData = async (): Promise<void> => {
  const userInfo = await window.lcu.getCurrentUserInfo()
  if (userInfo) {
    user_info.value = userInfo
    getAvatar()
    getSummerHonors()
  }
}

const getAvatar: () => void = async () => {
  if (user_info.value?.profileIconId !== undefined) {
    const url = await window.lcu.getAvatar(user_info.value?.profileIconId)
    if (url) avatar.value = url
  }
}

const getSummerHonors = async (): Promise<void> => {
  const honors = await window.lcu.getSummerHonorLevel()
  if (honors) summer_honors.value = honors
  console.log('🚀 ~ file: header.vue:67 ~ getSummerHonors ~ honors', honors)
}

// 当前等级的数值
const current_level_text = computed(() => user_info.value?.summonerLevel || 0)
// 当前等级的值
const current_level_value = computed(() => user_info.value?.xpSinceLastLevel || 0)
//下一等级的需要值
const next_level_value = computed(() => user_info.value?.xpUntilNextLevel || 0)
const next_level_progress = computed(
  () => +((current_level_value.value / next_level_value.value) * 100).toFixed(2)
)

const handlePositiveClick = (): void => {
  window.page.offAPP()
}
const hindMainWindow = (): void => {
  window.page.minimize('main')
}
window.electron.ipcRenderer.on('endOfGame', () => {
  console.log('endOfGame,更新头部数据')
  getHeaderData()
})
</script>
<style lang="less" scoped>
.header {
  padding: 10px;
}
.header_title {
  // 鼠标样式
  background-color: #f4f4f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header_title_text {
    cursor: move;
    padding: 5px 10px;
    font-weight: bold;
    flex: 1;
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }
}
.close-icon {
  display: block;
  cursor: pointer;
  &:hover {
    color: #ff4d4f;
  }
}

.user_info-card {
  border-radius: 12px;
}
.user_info-card-box {
  display: flex;
  .user-info-content {
    flex: 1;
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: space-between;
    .name {
      font-size: 16px;
      font-weight: bold;
    }
    .level {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .others {
      font-size: 10px;
      color: #999;
    }
  }
}
</style>
