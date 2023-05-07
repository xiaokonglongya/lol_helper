import { LeagueWebSocket, createWebSocketConnection } from 'league-connect'
import { autoReplay } from '@preload/lcuRequest'
import { store } from '@main/store'
import { ipcMain } from 'electron'
export async function createLcuWss(): Promise<LeagueWebSocket | undefined> {
  try {
    const ws = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
        pollInterval: 5000
      }
    })

    ws.subscribe('/lol-gameflow/v1/gameflow-phase', (data) => {
      console.log('🚀 ~ file: wss.ts:12 ~ ws.subscribe ~ data:', data)
      if (data === 'ReadyCheck') {
        // 自动接收对局
        const replay = store.get('replay')
        if (replay) autoReplay()
      }

      if (data === 'EndOfGame') {
        // 通知渲染进程游戏已结束
        ipcMain.emit('endOfGame')
      }
    })

    return ws
  } catch (error) {
    console.log(error)
    return undefined
  }
}
