import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { getStore } from '../main/store'
import lcu from './lcu'
import page from './page'
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
    contextBridge.exposeInMainWorld('lcu', lcu)
    contextBridge.exposeInMainWorld('page', page)
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
  // @ts-ignore (define in dts)
  window.lcu = lcu
  // @ts-ignore (define in dts)
  window.page = page
}
