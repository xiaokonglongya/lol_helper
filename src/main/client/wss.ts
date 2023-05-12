import { LeagueWebSocket, createWebSocketConnection } from 'league-connect'
import { autoReplay } from '@preload/lcuRequest'
import { store } from '@main/store'
import { BrowserWindow, ipcMain } from 'electron'
import { createChampSelectWindow } from '@main/createWindow/champSelect'
import { createGameStartWindow } from '@main/createWindow/gameStart'
import { getAllWindow, getWindow, setWindow } from '@main/events'
export async function createLcuWss(): Promise<LeagueWebSocket | undefined> {
  try {
    const ws = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
        pollInterval: 5000
      }
    })

    ws.subscribe('/lol-gameflow/v1/gameflow-phase', async (data) => {
      console.log('🚀 ~ file: wss.ts:16 ~ ws.subscribe ~ data:', data)
      let champ_select: BrowserWindow | null = null
      let start_windows: BrowserWindow | null = null
      if (data === 'ReadyCheck') {
        // 自动接收对局
        const replay = store.get('replay')
        if (replay) autoReplay()
      }

      if (data === 'EndOfGame') {
        // 通知渲染进程游戏已结束
        ipcMain.emit('endOfGame')
      }
      if (data === 'ChampSelect') {
        champ_select = await createChampSelectWindow()
        setWindow('champSelect', champ_select)
        const main = getAllWindow().get('main')
        if (main) main.hide()
      }
      if (data === 'InProgress') {
        champ_select?.destroy()
        start_windows = await createGameStartWindow()
      }
      // 游戏结束了
      if (data === 'WaitingForStats') {
        start_windows?.destroy()
        getWindow('main')?.show()
      }
      if (data === 'None') {
        getWindow('champSelect')?.destroy()
        getWindow('main')?.show()
      }
    })

    return ws
  } catch (error) {
    console.log(error)
    return undefined
  }
}
