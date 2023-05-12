import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export async function createGameStartWindow(): Promise<BrowserWindow> {
  const main = new BrowserWindow({
    title: '历史对局',
    width: 860,
    height: 570,
    // alwaysOnTop: true,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })
  main.on('ready-to-show', () => {
    main.show()
  })

  main.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await main.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/gameStart')
    main.webContents.openDevTools()
  } else {
    await main.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: 'gameStart'
    })
  }

  return main
}
