const {app,BrowserWindow} = require('electron').remote

module.exports = (url) =>{
console.log(url)
let offwindow

    offwindow=new BrowserWindow({
        width:500,
        height:500,
        // show:false,
        webPreferences:{
            nodeIntegration:false,
            // offscreen:false
        }
    })
    offwindow.loadURL(url)
    offwindow.on('close',()=>{
        offwindow=null
    })

}