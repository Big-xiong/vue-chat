'use strict'

import { app, ipcMain, protocol, BrowserWindow, Menu } from 'electron'
import path from 'path'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true, stream: true }}
])
var timer
var win
function initRightMenu({
  win,
  domId,
  haveSelect,
  isImg,
  canInput
}) {
  const rightTemplate = [
    // {
    //     label: "保存图片",
    //     click: () => {
    //         win.webContents.send('saveImg', domId)
    //     },
    //     enabled: isImg
    // },
    // {
    //     label: "图片另存为",
    //     click: () => {
    //         win.webContents.send('saveAsImg', domId)
    //     },
    //     enabled: isImg
    // },
    {
      label: '复制',
      click: () => {
        win.webContents.copy()
      },
      enabled: haveSelect || isImg
    },
    {
      label: '粘贴',
      click: () => {
        win.webContents.paste()
      },
      enabled: canInput
    }
  ]
  const menu = Menu.buildFromTemplate(rightTemplate)
  return menu
}
async function createWindow() {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null)
  // Create the browser window.
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  // 监听右键
  ipcMain.handle('show-context-menu', (event, {
    domId,
    haveSelect,
    isImg,
    canInput
  }) => {
    const rightMenu = initRightMenu({
      win,
      domId,
      haveSelect,
      isImg,
      canInput
    })
    rightMenu.popup({
      window: BrowserWindow.getFocusedWindow().webContents
    })
  })

  // 监听渲染进程发送过来的 new-messagee 事件
  ipcMain.on('new-message', (event, arg) => {
    clearInterval(timer)
    timer = setInterval(() => {
      win.flashFrame(true)
    }, 1000)
  })
  app.on('browser-window-focus', () => {
    clearInterval(timer)
    win.flashFrame(false)
  })
  // win.on('closed', () => {
  //   win = null
  // })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null || BrowserWindow.getAllWindows().length === 0) createWindow()
  // if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
