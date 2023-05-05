import { autoReplay, getUserAvatar } from './lcuRequest'
export default {
  autoReplay: async function (): Promise<any> {
    try {
      const result = await autoReplay()
      return result
    } catch (error) {
      console.log('🚀 ~ file: index.ts:28 ~ error:', error)
    }
  },
  getAvatar: async function (summonerId: number): Promise<string | undefined> {
    try {
      const result = await getUserAvatar(summonerId)
      return (
        'data:image/png;base64,' +
        btoa(
          new Uint8Array(result?.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      )
    } catch (error) {
      console.log('获取头像失败')
      return undefined
    }
  }
}
