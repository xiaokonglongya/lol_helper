import { BrowserWindow, shell, globalShortcut } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export async function createMainWindow(): Promise<BrowserWindow> {
  const main = new BrowserWindow({
    width: 360,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })
  main.on('ready-to-show', () => {
    main.webContents.openDevTools()
    main.show()
  })

  main.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await main.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    await main.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 添加全局快捷键监听,快捷隐藏/显示窗口
  globalShortcut.register('CommandOrControl+Alt+I', () => {
    const is_visible = main?.isVisible()
    is_visible ? main?.hide() : main?.show()
  })

  return main
}
