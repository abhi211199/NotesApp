// const electron = require('electron')
// const app = electron.app
// const BrowserWindow=electron.BrowserWindow

//--or
const {app,BrowserWindow,ipcMain} = require('electron')
const readpage=require('./readpage.js')

//the basic diff b/w the upper and lower declaation is we are extracting an attribute in different ways
//https://stackoverflow.com/questions/41058569/what-is-the-difference-between-const-and-const-in-javascript/41058622

//the window state keeper library
const winStateKeeper = require('electron-window-state')

//listen to data sent from render process and send a response
ipcMain.on('url_fetch',(e,url)=>{
  console.log(url)
  readpage(url,iurl=>{
    e.sender.send('url_sent',iurl);
  })
})

let mainWindow

function createWindow () {
  let mainWindowState = winStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });
  mainWindow = new BrowserWindow({
    width: mainWindowState.width, height: mainWindowState.height,
    maxHeight:500,maxWidth:500,minHeight:200,minWidth:200,
    webPreferences: { nodeIntegration: true },
  })
  mainWindowState.manage(mainWindow);
  mainWindow.loadFile('./renderer/main.html')
  // mainWindow.loadURL('https://github.com/')
  
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed',  () => {
    mainWindow = null
  })
  const sess=mainWindow.webContents.session
  console.log(sess)
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})


