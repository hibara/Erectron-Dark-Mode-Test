'use strict';
const {app, Menu, BrowserWindow, ipcMain, nativeTheme} = require('electron');
const path = require('path');
const config = require('./package.json');

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
        title: config.name,
        width: 1200,
        height: 800,
        webPreferences: {
          worldSafeExecuteJavaScript: true, // In Electron 12, the default will be changed to true.
          nodeIntegration: true, // XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
          nodeIntegrationInWorker: true,
          contextIsolation: true, // レンダラープロセスに公開するAPIのファイル
          preload: path.resolve(`${__dirname}/preload.js`)
        },
     })
  // load a local HTML file
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // debug: ディベロッパーツールの表示
  mainWindow.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const createMainMenu = () => {
  const isMac = process.platform === 'darwin'
  const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'View',
      submenu: [
        { role: 'reload', enabled: false },
        { role: 'forcereload', enabled: false },
        { role: 'toggledevtools', accelerator: 'CmdOrCtrl+Alt+I' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'GitHub Repository',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://github.com/hibara/Erectron-Dark-Mode-Test')
          }
        },
        {
          label: "Qiitaの記事",
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://qiita.com/hibara')
          }
        },
        {
          label: "作者ウェブサイト",
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://hibara.org/')
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', function() {
  // create window
  createWindow();
  createMainMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// システムがダークテーマなら「true」を返す
ipcMain.handle("ipc-system-theme", () => {
  return nativeTheme.shouldUseDarkColors === true;
});

// システムカラーの変更イベント
nativeTheme.on("updated", () => {
  if (mainWindow === null) return;
  mainWindow.webContents.send("ipc-change-system-theme", nativeTheme.shouldUseDarkColors);
});
