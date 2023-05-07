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
  }
}
