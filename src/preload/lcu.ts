import { autoReplay, getUserAvatar } from './lcuRequest'
export default {
  autoReplay: async function (): Promise<void> {
    try {
      const result = await autoReplay()
      if (result.ok) console.log('接受对局成功')
    } catch (error) {
      console.log('🚀 ~ file: index.ts:28 ~ error:', error)
    }
  },
  getAvatar: async function (summonerId: number): Promise<string | undefined> {
    try {
      const result = await getUserAvatar(summonerId)
      if (!result.ok) return undefined
      return (
        'data:image/png;base64,' +
        btoa(
          new Uint8Array(result.buffer()).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
      )
    } catch (error) {
      console.log('获取头像失败')
      return undefined
    }
  }
}
