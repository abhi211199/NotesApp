const {app,shell,dialog,Notification}=require('electron')

module.exports=[
    {
      label:"File",
      submenu:[
        {label: "Reload",role:"reload"},
        {label: "Exit",click: ()=>{app.quit()},accelerator:"Alt+F4"},
      ]
    },
    {
      label:"Actions",
      submenu:[
        {label: "Development Mode",role:'toggleDevTools'},
        {label:"Full Screen",role:"toggleFullScreen"},
        // {label:"menu2",enabled:false},
        // {
        //     label:"menu3",
        //     click: ()=>{console.log("hello")},
        //     accelerator:'Shift+Alt+G'
        // },
      ]
    },
    {
      label:"Help",
      submenu:[
        {label:"Visit Repository",click:()=>{shell.openExternal("https://github.com/abhi211199/NotesApp")}},
        {label:"About",click:()=>{
          const dialogOptions = {type: 'info', buttons: ['OK'], message: 'Developed by Abhishek Garain!'}
          dialog.showMessageBox(dialogOptions)}},
        {label:"Loved it!",click:()=>{let notif=new Notification({title:"NotesApp",body:("Star the repository!")});notif.on('click',()=>{shell.openExternal("https://github.com/abhi211199/NotesApp")});notif.show()}}
      ]
    }
]