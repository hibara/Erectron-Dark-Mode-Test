'use strict';
const electron = require('electron');
const app = electron.app;

const { BrowserWindow } = require('electron')

const config = require('./package.json');

let mainWindow;

function createWindow() {

  let mainWindow = new BrowserWindow({
        title: config.name,
        width: 1024,
        height: 640,
        minWidth: 1024,
        minHeight: 640
  })

  // Or load a local HTML file
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // debug: ディベロッパーツールの表示
  mainWindow.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', function() {
  // create window
  createWindow();

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

