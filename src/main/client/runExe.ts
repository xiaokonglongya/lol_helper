import { exec } from 'child_process'
import { ipcMain } from 'electron'
import path from 'path'

/**
 * 运行exe程序
 */
export function runExe(exe_path: string, exe_name: string): void {
  try {
    const _path = path.join(exe_path, exe_name)
    console.log(_path, '打开的exe')
    const cmd_start = _path
    ipcMain.emit('client-start')
    exec(`"${cmd_start}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        ipcMain.emit('client-error')
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
      ipcMain.emit('client-end')
    })
  } catch (error) {
    console.log(error)
  }
}
