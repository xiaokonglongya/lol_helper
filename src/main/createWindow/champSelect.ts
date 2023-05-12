import { BrowserWindow, shell, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export async function createChampSelectWindow(): Promise<BrowserWindow> {
  const main = new BrowserWindow({
    title: '当前对局',
    width: 300,
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
    const { left, top } = {
      left: screen.getPrimaryDisplay().workAreaSize.width - 460,
      top: screen.getPrimaryDisplay().workAreaSize.height - 760
    }
    main.setPosition(left, top)
    main.show()
  })

  main.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await main.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#/champSelect')
    main.webContents.openDevTools()
  } else {
    await main.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: 'champSelect'
    })
  }

  return main
}
