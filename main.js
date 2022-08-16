const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");
const fs = require("fs")

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 600,
    minWidth: 700,
    minHeight: 600,
    resizable: true,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  })

  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, '/index.html'),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );
  console.log(__dirname);
  mainWindow.loadURL('http://localhost:4200');
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

try {
    require('electron-reloader')(module)
  } catch (_) {}


//ipcRegister
ipcMain.on('CLOSE_APP', (event) => {
  mainWindow.close();
});

ipcMain.on('RESOTRE_MAXIMIZIE_WIN', (event) => {
  if (mainWindow.isMaximized()) mainWindow.restore();
  else mainWindow.maximize();
});

ipcMain.on('MINIMIZE_WIN', (event) => {
  mainWindow.minimize();
});

ipcMain.on('GET_PATH', (event, arg) => {
  event.reply('RETURN_PATH', app.getPath(arg));
});

ipcMain.on('SAVE_FILE', (event, arg) => {
  fs.writeFileSync(arg[0], arg[1]);
});

ipcMain.on('LOAD_FILE', (event, arg) => {
  event.reply('RETURN_FILE', JSON.parse(fs.readFileSync(arg)));
});