<template>
  <div class="unline">
    <div class="header">
      <div class="title"></div>
      <n-popconfirm positive-text="确认" negative-text="取消" @positive-click="close">
        <template #trigger>
          <n-icon size="24">
            <CloseCircleOutline />
          </n-icon>
        </template>
        是否确认关闭程序？
      </n-popconfirm>
    </div>
    <div class="animation">
      <div class="sk-wave">
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
      </div>
    </div>
    <n-button
      style="margin-top: 20px"
      type="primary"
      :loading="startStatus == 'start'"
      :disabled="startStatus == 'start'"
      @click="startClient"
      >{{
        startStatus == 'start'
          ? '正在启动客户端'
          : startStatus == 'error'
          ? '启动失败，点击重试'
          : '启动客户端'
      }}
    </n-button>
    <n-text depth="3" style="font-size: 12px; margin-top: 12px">
      {{
        startStatus === 'wait'
          ? '请点击启动客户端'
          : startStatus === 'start'
          ? '正在启动客户端'
          : startStatus === 'error'
          ? '启动失败，请检查客户端路径是否正确'
          : '正在初始化...'
      }}
    </n-text>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
const message = useMessage()
const client_path = ref<string>(window.store.getStore('client_install_path') || '')
// const client_path = ref<string>('')

const startStatus = ref<'start' | 'end' | 'error' | 'wait'>('wait')

const EXENAME = 'LeagueClient.exe'
const startClient = (): void => {
  if (!client_path.value) {
    message.info('第一次使用,请先打开游戏后再启动本客户端')
    return
  }
  window.page.runExe(client_path.value, EXENAME)

  window.electron.ipcRenderer.on('client-start', () => {
    console.log('client-start')
    startStatus.value = 'start'
  })
  window.electron.ipcRenderer.on('client-error', () => {
    console.log('client-error')
    startStatus.value = 'error'
  })
  window.electron.ipcRenderer.on('client-error', () => {
    console.log('client-error')
    startStatus.value = 'error'
  })
}
const close = (): void => {
  window.electron.ipcRenderer.send('quit-client-wait')
}
</script>
<style lang="less" scoped>
@import url('spinkit/spinkit.css');
body {
  margin: 0;
}
.unline {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 3px;
    box-sizing: border-box;
    .title {
      height: 20px;
      flex: 1;
      -webkit-app-region: drag;
      -webkit-user-select: none;
    }
  }
}
</style>
