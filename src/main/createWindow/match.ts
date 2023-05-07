import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export async function createMatchWindow(): Promise<BrowserWindow> {
  const main = new BrowserWindow({
    title: '历史对局',
    width: 660,
    height: 470,
    show: false,
    autoHideMenuBar: true,
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
    await main.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/match')
    main.webContents.openDevTools()
  } else {
    await main.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: 'match'
    })
  }

  return main
}
