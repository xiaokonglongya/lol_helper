import Store from 'electron-store'

interface StoreSchema {
  client_info: {
    password: string
    port: number
    pid: number
    certificate: string
  }
  replay: boolean
}
export const store = new Store<StoreSchema>({
  defaults: {
    client_info: {
      password: '',
      port: 0,
      pid: 0,
      certificate: ''
    },
    replay: false // 是否自动接受对局
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
