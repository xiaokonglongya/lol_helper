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
    return credentials
  } catch (error) {
    console.log('🚀 ~ file: getClientStatus.ts:13 ~ getClientStatus ~ error:', error)
    console.log('lol no start')
    return null
  }
}
