// const electron = require('electron')
// const app = electron.app
// const BrowserWindow=electron.BrowserWindow

//--or
const {app,BrowserWindow,ipcMain,Menu,Tray} = require('electron')
const readpage=require('./readpage.js')

//the basic diff b/w the upper and lower declaation is we are extracting an attribute in different ways
//https://stackoverflow.com/questions/41058569/what-is-the-difference-between-const-and-const-in-javascript/41058622

//the window state keeper library
const winStateKeeper = require('electron-window-state')

//listen to data sent from render process and send a response
ipcMain.on('url_fetch',(e,url)=>{
  // console.log(url)
  readpage(url,iurl=>{
    // console.log(iurl)
    e.sender.send('url_sent',iurl);
  })
})

let mainWindow,tray_flag
var appIcon

function createWindow () {
  let mainWindowState = winStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });
  // console.log(template)
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  mainWindow = new BrowserWindow({
    width: mainWindowState.width, height: mainWindowState.height,
    maxHeight:500,maxWidth:500,minHeight:200,minWidth:200,
    webPreferences: { nodeIntegration: true },
    icon: './images/icon.png',
  })
  mainWindowState.manage(mainWindow);
  mainWindow.loadFile('./renderer/main.html')
  // mainWindow.loadURL('https://github.com/')
  
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed',  () => {
    mainWindow = null
  })
  if(tray_flag!==1){
  appIcon = new Tray('./images/icon.png')
  appIcon.setContextMenu(contextMenu)
  tray_flag=1
  }
  
  mainWindow.on('close', function (event) {
    mainWindow = null
})

mainWindow.on('minimize', function (event) {
    event.preventDefault()
    mainWindow.hide()
})

mainWindow.on('show', function () {
    appIcon.setHighlightMode('always')
})

mainWindow.on('activate', function () {
  mainWindow.show()
})

}


      var contextMenu = Menu.buildFromTemplate([
          {
              label: 'Show App', click: function () {
                console.log("Aaa")
                createWindow()
                // createWindow()
                // mainWindow.restore()
                // if(isMac)
                  // mainWindow.show()
              }
          },
          {
            label: 'Hide App', click: function () {
              console.log("Aaa")
              // createWindow()
                mainWindow.hide()
            }
        }, 
          {
              label: 'Quit', click: function () {
                  app.isQuiting = true
                  app.quit()
              }
          }
      ])
  
    

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})


const isMac = process.platform === 'darwin'

const template = require('./menus')
