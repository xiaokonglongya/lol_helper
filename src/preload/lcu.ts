import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { store } from '@main/store'
axios.defaults.adapter = 'http'
function createClient(): AxiosInstance {
  const config = store.get('client_info')
  if (!config) throw new Error('未获取到客户端信息')
  return axios.create({
    baseURL: `https://127.0.0.1:${config.port}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`riot:${config.token}`).toString('base64')
    },
    httpsAgent: new (require('https').Agent)({
      rejectUnauthorized: false
    })
  })
}
export function autoReplay<T>(): Promise<AxiosResponse<T>> {
  return createClient().post('/lol-matchmaking/v1/ready-check/accept')
}

interface CurrentUserInfo {
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
/**
 * 获取当前客户端用户信息
 * @returns
 */
export function getCurrentUserInfo(): Promise<AxiosResponse<CurrentUserInfo>> {
  return createClient().get('/lol-summoner/v1/current-summoner')
}
