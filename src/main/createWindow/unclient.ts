import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export async function createUnClient(): Promise<BrowserWindow> {
  const main = new BrowserWindow({
    width: 400,
    height: 170,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    backgroundColor: '#f4f4f4',
    resizable: false,
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
    await main.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/un_client')
    // main.webContents.openDevTools()
  } else {
    await main.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: 'un_client'
    })
  }

  return main
}
