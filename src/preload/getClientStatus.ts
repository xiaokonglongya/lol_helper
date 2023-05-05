import { authenticate, Credentials } from 'league-connect'
/**
 * 获取客户端状态
 */
export async function getClientStatus(): Promise<Credentials | null> {
  try {
    const credentials = await authenticate({
      awaitConnection: true,
      pollInterval: 5000
    })
    console.log('🚀 ~ file: getClientStatus.ts:36 ~ getClientStatus ~ credentials:', credentials)
    return credentials
  } catch (error) {
    console.log('lol no start')
    return null
  }
}
