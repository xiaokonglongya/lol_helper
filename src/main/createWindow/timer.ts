import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export async function createTimerWindow(): Promise<BrowserWindow> {
  const main = new BrowserWindow({
    width: 660,
    height: 170,
    show: false,
    autoHideMenuBar: true,
    transparent: true, //透明
    frame: false, //无边框
    // focusable: false,
    alwaysOnTop: true,
    x: 0,
    y: 230,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })
  main.on('ready-to-show', () => {
    // main.show()
  })

  main.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await main.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/timer')
  } else {
    await main.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: 'timer'
    })
  }

  return main
}
