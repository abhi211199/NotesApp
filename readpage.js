//this script fetches a scrnshot, title of a webpage
const {BrowserWindow} = require('electron')
//const {BrowserWindow} = require('electron').remote
//remote should be used if readpage is accessed from renderer and not main

let offwindow
//use module.exports or exports.func_name to declare function
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
    if(url.url1==='')
    callback({title:'',scrshot:'../images/none.png',url:url.url1,id1:url.ids,note:url.note,noted:url.noted})
    offwindow.loadURL(url.url1)
    offwindow.webContents.on('did-finish-load',e=>{
        let title= offwindow.getTitle()
        offwindow.webContents.capturePage(image=>{
            let scr = image.toDataURL()
            callback({title:title,scrshot:scr,url:url.url1,id1:url.ids,note:url.note,noted:url.noted})
            offwindow.close()
            offwindow=null 
        })
    })
}