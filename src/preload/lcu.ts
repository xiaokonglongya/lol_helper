import axios, { AxiosInstance, AxiosResponse } from 'axios'
import https from 'https'
function createClient(config: { port: number; token: string }) {
  //   return axios.create({
  //     baseURL: `https://172.16.3.134:${config.port}`,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: 'Basic ' + Buffer.from(`riot:${config.token}`).toString('base64')
  //     }
  //   })
  return https.request({
    host: '127.0.0.1',
    port: config.port,
    path: '/lol-matchmaking/v1/ready-check/accept',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`riot:${config.token}`).toString('base64')
    }
  })
}
export function autoReplay<T>(config: { port: number; token: string }): Promise<AxiosResponse<T>> {
  return createClient(config)
}
