import { LeagueWebSocket, createWebSocketConnection } from 'league-connect'
export async function createLcuWss(): Promise<LeagueWebSocket> {
  const ws = await createWebSocketConnection({
    authenticationOptions: {
      awaitConnection: true
    }
  })

  ws.subscribe('/lol-gameflow/v1/gameflow-phase', (data) => {
    console.log('🚀 ~ file: wss.ts:11 ~ ws.subscribe ~ data:', data)

    if (data === 'ReadyCheck') {
      // 自动接收对局
    }
  })
  return ws
}
