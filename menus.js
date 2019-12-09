module.exports=[
    {
      label:"electron",
      submenu:[
        {label: "menu1",submenu:[ {label: "menu5"}]},
        {label:"menu2"},
        {label:"menu3"},
      ]
    },
    {
      label:"actions",
      submenu:[
        {label: "menu1",submenu:[ {label: "menu5",role:'toggleDevTools'}]},
        {role:"toggleFullScreen"},
        {label:"menu2",enabled:false},
        {
            label:"menu3",
            click: ()=>{console.log("hello")},
            accelerator:'Shift+Alt+G'
        },
      ]
    }
  ]