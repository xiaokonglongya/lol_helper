import { ipcRenderer } from 'electron'
export default {
  openMatchWindow(): void {
    ipcRenderer.send('openMatchWindow')
  },
  closeMatchWindow(): void {
    ipcRenderer.send('closeMatchWindow')
  },
  offAPP(): void {
    ipcRenderer.send('offAPP')
  },
  minimize(name: 'main' | 'match'): void {
    ipcRenderer.send('minimize', name)
  },
  runExe(ext_path: string, exe_name: string): void {
    return ipcRenderer.send('runExe', ext_path, exe_name)
  }
}
