const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const io = require('socket.io-client');

let win;
let socket;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  win.on('closed', () => {
    win = null;
  });

  socket = io('http://localhost:3000');
  socket.on('connect', () => {
    win.webContents.executeJavaScript(
      `document.getElementById('status').innerText = 'Server Online';`,
    );
  });
  socket.on('disconnect', () => {
    win.webContents.executeJavaScript(
      `document.getElementById('status').innerText = 'Server Offline';`,
    );
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
