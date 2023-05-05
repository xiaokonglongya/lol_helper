import axios, { AxiosInstance, AxiosResponse } from 'axios'

function createClient(config: { port: number; token: string }): AxiosInstance {
  return axios.create({
    baseURL: `https://172.16.3.134:${config.port}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: window.api.toBufferBase64String(`riot:${config.token}`)
    }
  })
}
export function autoReplay<T>(config: { port: number; token: string }): Promise<AxiosResponse<T>> {
  return createClient(config).post('/lol-matchmaking/v1/ready-check/accept')
}
