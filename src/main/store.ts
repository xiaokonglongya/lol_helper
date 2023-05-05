import Store from 'electron-store'

interface StoreSchema {
  token: string
  port: number
  client_info: {
    password: string
    port: number
    pid: number
    certificate: string
  }
}
export const store = new Store<StoreSchema>({
  defaults: {
    token: '',
    port: 3000,
    client_info: {
      password: '',
      port: 0,
      pid: 0,
      certificate: ''
    }
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
