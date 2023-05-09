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
 * 获取当前大厅信息
 * @returns
 * @description
 */
export async function getLobby(): Promise<Http1Response> {
  const credentials = store.get('client_info')
  return createHttp1Request(
    {
      method: 'GET',
      url: '/lol-gameflow/v1/gameflow-phase'
    },
    credentials
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

/**
 * 获取当前角色对局信息
 * @returns
 */
export function getUserRankInfo(): Promise<Http1Response> {
  return createHttp1Request(
    {
      method: 'GET',
      url: '/lol-ranked/v1/current-ranked-stats'
    },
    store.get('client_info')
  )
}

/**
 *  获取当前角色对局信息
 * @param puuid 玩家唯一标识符
 * @returns
 */
export function getSummerMatch(
  puuid: string,
  query?: { begIndex: number; endIndex: number }
): Promise<Http1Response> {
  return createHttp1Request(
    {
      method: 'GET',
      url: `/lol-match-history/v1/products/lol/${puuid}/matches?begIndex=${query?.begIndex}&endIndex=${query?.endIndex}`
    },
    store.get('client_info')
  )
}
/**
 * 获取游戏详情
 * @param matchId
 * @returns
 */
export function getSummerMatchDetails(matchId: number): Promise<Http1Response> {
  return createHttp1Request(
    {
      method: 'GET',
      url: `/lol-match-history/v1/games/${matchId}`
    },
    store.get('client_info')
  )
}
/**
 * 获取当前角色荣誉等级
 * @returns
 */
export function getSummerHonorLevel(): Promise<Http1Response> {
  return createHttp1Request(
    {
      method: 'GET',
      url: `/lol-honor-v2/v1/profile`
    },
    store.get('client_info')
  )
}
