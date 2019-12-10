//this script fetches a scrnshot, title of a webpage
const {BrowserWindow} = require('electron')
//const {BrowserWindow} = require('electron').remote
//remote should be used if readpage is accessed from renderer and not main

let offwindow

module.exports = (url,callback)=>{
    offwindow=new BrowserWindow({
        width:500,
        height:500,
        show:false,
        webPreferences:{
            nodeIntegration:false,
            offscreen:false
        }
    })
    offwindow.loadURL(url)
    offwindow.webContents.on('did-finish-load',e=>{
        let title= offwindow.getTitle()
        offwindow.webContents.capturePage(image=>{
            let scr = image.toDataURL()
            callback({title:title,scrshot:scr,url:url})
            offwindow.close()
            offwindow=null 
        })
    })
}