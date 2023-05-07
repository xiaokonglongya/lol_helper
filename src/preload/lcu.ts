import { getCurrentUserInfo } from '@preload/lcuRequest'
import {
  autoReplay,
  getUserAvatar,
  getUserRankInfo,
  getSummerMatch,
  getSummerHonorLevel
} from './lcuRequest'
import { store } from '@main/store'
import { SummerMatch, SummerHonorLevel } from './index.d'
export default {
  getCurrentUserInfo: async function (): Promise<any> {
    try {
      const result = await getCurrentUserInfo()
      if (result.ok) {
        const data = await result.json()
        return data
      }
      return undefined
    } catch (error) {
      console.log('🚀 ~ file: lcu.ts:8 ~ error:', error)
      return undefined
    }
  },

  setReplay: function (value: boolean): boolean {
    try {
      store.set('replay', value)
      console.log('🚀 ~ file: lcu.ts:8 ~ value:', value)
      return true
    } catch (error) {
      console.log('🚀 ~ file: index.ts:28 ~ error:', error)
      return false
    }
  },
  getReplay: function (): boolean {
    try {
      return store.get('replay')
    } catch (error) {
      console.log('🚀 ~ file: index.ts:28 ~ error:', error)
      return false
    }
  },
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
  },
  getRankInfo: async function (): Promise<any> {
    try {
      const result = await getUserRankInfo()
      if (result.ok) {
        return result.json()
      } else {
        throw Error()
      }
    } catch (error) {
      console.log('获取rank信息失败')
    }
  },
  getSummonerMatchHistory: async function (puuid: number): Promise<SummerMatch | void> {
    try {
      const result = await getSummerMatch(puuid)
      if (result.ok) {
        return result.json()
      } else {
        throw Error()
      }
    } catch (error) {
      console.log('获取对局信息失败')
    }
  },
  /**
   * 获取荣誉等级
   * @returns
   */
  getSummerHonorLevel: async function (): Promise<SummerHonorLevel | void> {
    try {
      const result = await getSummerHonorLevel()
      if (result.ok) {
        return result.json()
      } else {
        throw Error()
      }
    } catch (error) {
      console.log('获取对局信息失败')
    }
  }
}
