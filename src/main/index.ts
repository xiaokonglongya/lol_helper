import { app, BrowserWindow } from 'electron'
import { createMainWindow } from '@main/createWindow/home'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import Store from 'electron-store'
import { getClientStatus } from '@preload/getClientStatus'
import { store } from './store'
Store.initRenderer()
async function init(): Promise<void> {
  // 从客户端获取状态 并存储到 store
  const status = await getClientStatus()
  if (status) {
    store.set('client_info', status)
  }
  //  创建主窗口
  const main = await createMainWindow()
}
app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  await init()
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
