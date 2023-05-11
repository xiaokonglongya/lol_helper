import { BrowserWindow, shell, globalShortcut, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

function registerGlobalShortcut(shortcut: string, cb: () => void): boolean {
  if (!shortcut) return false
  let flag = false
  try {
    flag = globalShortcut.isRegistered(shortcut)
    if (flag) return true
    flag = globalShortcut.register(shortcut, () => {
      cb()
    })
  } catch (e) {
    console.error(e)
  }
  return flag
}
export async function createMainWindow(): Promise<BrowserWindow> {
  const main = new BrowserWindow({
    width: 300,
    height: 570,
    show: false,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: '#f4f4f4',
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })
  // 获取屏幕宽高

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
    await main.loadURL(process.env['ELECTRON_RENDERER_URL'])
    // main.webContents.openDevTools()
  } else {
    await main.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 添加全局快捷键监听,快捷隐藏/显示窗口
  registerGlobalShortcut('CommandOrControl+Alt+I', () => {
    const is_visible = main?.isVisible()
    is_visible ? main?.hide() : main?.show()
  })

  return main
}
