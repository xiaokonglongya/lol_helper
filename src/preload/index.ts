import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getStore, store as globalStore } from '../main/store'
import { autoReplay } from './lcu'
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
    contextBridge.exposeInMainWorld('lcu', {
      autoReplay: async function () {
        const token = getStore('token')
        const port = getStore('port')
        const result = await autoReplay({ port, token })
        console.log('🚀 ~ file: index.ts:24 ~ result:', result)
        return result
      }
    })
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
