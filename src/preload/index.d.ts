import { ElectronAPI } from '@electron-toolkit/preload'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      toBufferBase64String: (str: string) => string
    }
    store: {
      getStore: <T>(key: string) => T
    }
    lcu: typeof import('./lcu').default
  }
}
export interface CurrentUserInfo {
  accountId: number
  displayName: 'string'
  internalName: 'string'
  nameChangeFlag: boolean
  percentCompleteForNextLevel: number
  privacy: 'PRIVATE'
  profileIconId: number
  puuid: 'string'
  rerollPoints: {
    currentPoints: number
    maxRolls: number
    numberOfRolls: number
    pointsCostToRoll: number
    pointsToReroll: number
  }
  summonerId: number
  summonerLevel: number
  unnamed: boolean
  xpSinceLastLevel: number
  xpUntilNextLevel: number
}
