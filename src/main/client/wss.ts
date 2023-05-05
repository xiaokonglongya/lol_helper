import { LeagueWebSocket, createWebSocketConnection } from 'league-connect'
import { autoReplay } from '@preload/lcuRequest'
export async function createLcuWss(): Promise<LeagueWebSocket> {
  const ws = await createWebSocketConnection({
    authenticationOptions: {
      awaitConnection: true
    }
  })

  ws.subscribe('/lol-gameflow/v1/gameflow-phase', (data) => {
    if (data === 'ReadyCheck') {
      // 自动接收对局
      autoReplay()
    }
  })
  return ws
}
