import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      toBufferBase64String: (str: string) => string
    }
    store: {
      getStore: (key: string) => string | number
    }
  }
}
