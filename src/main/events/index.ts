import { ipcMain, BrowserWindow } from 'electron'
import { createMatchWindow } from '../createWindow/match'
import { app } from 'electron'
import { store } from '../store'
const windowMaps = new Map<string, BrowserWindow>()

export function eventManager(main: BrowserWindow): void {
  windowMaps.set('main', main)
  ipcMain.on('openMatchWindow', async () => {
    if (windowMaps.has('match')) {
      const match = windowMaps.get('match')
      if (match) {
        match.show()
        return
      }
    }
    const match = await createMatchWindow()
    windowMaps.set('match', match)
  })
  ipcMain.on('closeMatchWindow', () => {
    if (windowMaps.has('match')) {
      const match = windowMaps.get('match')
      if (match) {
        match.destroy()
        windowMaps.delete('match')
        windowMaps.get('main')?.show()
      }
    }
  })
  ipcMain.on('offAPP', () => {
    store.delete('client_info')
    app.quit()
  })
  ipcMain.on('endOfGame', () => {
    // 通知所有窗口
    windowMaps.forEach((value) => {
      value.webContents.send('endOfGame')
    })
  })

  ipcMain.on('minimize', (_, name: 'main' | 'match') => {
    windowMaps.get(name)?.minimize()
  })
}
export function getAllWindow(): Map<string, BrowserWindow> {
  return windowMaps
}
export function getWindow(name: string): BrowserWindow | undefined {
  return windowMaps.get(name)
}
export function setWindow(name: string, window: BrowserWindow): void {
  windowMaps.set(name, window)
}
