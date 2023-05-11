import { CurrentUserInfo } from '@preload/index.d'
import Store from 'electron-store'

export type StoreSchema = {
  client_info: {
    password: string
    port: number
    pid: number
    certificate: string
  }
  user_info: CurrentUserInfo | null
  replay: boolean
  client_install_path: string
}
export const store = new Store<StoreSchema>({
  defaults: {
    client_info: {
      password: '',
      port: 0,
      pid: 0,
      certificate: ''
    },
    user_info: null,
    replay: false, // 是否自动接受对局
    client_install_path: '' // 客户端安装目录
  }
})

export function getStore(key: string): StoreSchema[keyof StoreSchema] {
  return store.get(key)
}
export function setStore(key: string, value: StoreSchema[keyof StoreSchema]): void {
  store.set(key, value)
}

export function clearStore(): void {
  store.clear()
}
