import { app, BrowserWindow } from 'electron'
import { createMainWindow } from '@main/createWindow/home'
import { createUnClient } from '@main/createWindow/unclient'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import Store from 'electron-store'
import { getClientStatus } from '@preload/getClientStatus'
import { getCurrentUserInfo } from '@preload/lcuRequest'
import { store } from './store'
import { createLcuWss } from './client/wss'
import { eventManager } from '@main/events/index'
Store.initRenderer()

async function loopUpdate(): Promise<void> {
  console.log('执行循环更新用户信息')
  try {
    const userInfo = await getCurrentUserInfo()
    if (userInfo.ok) {
      //  创建主窗口
      const user_info = userInfo?.json()
      store.set('user_info', user_info)
      const main = await createMainWindow()
      eventManager(main)
      createLcuWss()
    } else {
      const timer = setTimeout(() => {
        loopUpdate()
        clearTimeout(timer)
      }, 2500)
    }
  } catch (error) {
    const timer = setTimeout(() => {
      loopUpdate()
      clearTimeout(timer)
    }, 2500)
  }
}
async function init(): Promise<void> {
  console.log('启动')
  const unClient = await createUnClient()

  // 从客户端获取状态 并存储到 store
  const status = await getClientStatus()
  //   createTimerWindow()
  if (status) {
    store.set('client_info', status)
    unClient.hide()
    await loopUpdate()
  }
}
app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  try {
    await init()
  } catch (error) {
    console.log(error)
  }
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    store.delete('client_info')
    app.quit()
  }
})

app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')
