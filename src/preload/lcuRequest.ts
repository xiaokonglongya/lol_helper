import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { store } from '@main/store'
import { CurrentUserInfo } from '@preload/index.d'
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

/**
 * 获取当前客户端用户信息
 * @returns
 */
export function getCurrentUserInfo(): Promise<AxiosResponse<CurrentUserInfo>> {
  return createClient().get('/lol-summoner/v1/current-summoner')
}

/**
 * 获取头像
 * @param profileIconId
 * @returns
 */
export function getUserAvatar(profileIconId: number): Promise<AxiosResponse<ArrayBuffer>> {
  return createClient().get(`/lol-game-data/assets/v1/profile-icons/${profileIconId}.jpg`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'arraybuffer'
  })
}

// export function
