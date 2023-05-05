import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getStore, store as globalStore } from '../main/store'

const api = {
  toBufferBase64String: function (str: string): string {
    return Buffer.from(str).toString('base64')
  }
}
const store = {
  getStore
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('store', store)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.store = store
}
