import { app, BrowserWindow } from 'electron'
import { createMainWindow } from '@main/createWindow/home'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import Store from 'electron-store'
import { getClientStatus } from '@preload/getClientStatus'
import { getCurrentUserInfo } from '@preload/lcuRequest'
import { store } from './store'
import { createLcuWss } from './client/wss'
Store.initRenderer()
async function init(): Promise<void> {
  // 从客户端获取状态 并存储到 store
  const status = await getClientStatus()
  if (status) {
    store.set('client_info', status)
  }
  //  创建主窗口
  const main = await createMainWindow()
  const userInfo = await getCurrentUserInfo()
  if (userInfo?.ok) {
    const user_info = userInfo?.json()
    store.set('user_info', user_info)
  }
}
app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  await init()
  createLcuWss()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')
