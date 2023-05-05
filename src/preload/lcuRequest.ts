import { store } from '@main/store'
import { createHttp1Request, Http1Response } from 'league-connect'
/**
 * 自动接收匹配对局
 * @returns
 */
export function autoReplay(): Promise<Http1Response> {
  const config = store.get('client_info')
  return createHttp1Request(
    {
      method: 'POST',
      url: '/lol-matchmaking/v1/ready-check/accept'
      //   url: '/lol-matchmaking/v1/ready-check/decline'
    },
    config
  )
}

/**
 * 获取当前客户端用户信息
 * @returns
 */
export function getCurrentUserInfo(): Promise<Http1Response> {
  return createHttp1Request(
    {
      method: 'GET',
      url: '/lol-summoner/v1/current-summoner'
    },
    store.get('client_info')
  )
}

/**
 * 获取头像
 * @param profileIconId
 * @returns
 */
export function getUserAvatar(profileIconId: number): Promise<Http1Response> {
  return createHttp1Request(
    {
      method: 'GET',
      url: `/lol-game-data/assets/v1/profile-icons/${profileIconId}.jpg`
    },
    store.get('client_info')
  )
}
