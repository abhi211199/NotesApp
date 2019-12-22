const openWindow = require('./open')
let items = document.getElementById("items")
const {BrowserWindow} = require('electron').remote

exports.storage = JSON.parse(localStorage.getItem('items_saved')) || []

exports.save = () =>{
    localStorage.setItem('items_saved',JSON.stringify(this.storage))
}

//select item logic
exports.select = e=>{
    if(e.currentTarget.classList.contains('selected'))
        e.currentTarget.classList.remove('selected')
    else
        e.currentTarget.classList.add('selected')
}

//open window of url
exports.open = e=>{
    let a= new BrowserWindow({
        width:500,
        height:500,
        webPreferences:{
            nodeIntegration:true,
        },
    })
    a.loadURL(e.currentTarget.querySelector('p').innerText)
    
    //or
    
    // openWindow(e.currentTarget.querySelector('p').innerText,() =>{

    // })
}

//add items logic
exports.addItems = (item,type=false) =>{
    
    if(item!=null){   
    let node = document.createElement('div')
    node.setAttribute('class','read-item')
    var title = item.note ? "Title: "+item.note : " "
    var desc = item.noted ? "Description: "+item.noted : " "
    var htm = '<img src='+(item.scrshot)+'><h2>'+(item.title)+'</h2><p id="url1">'+(item.url)+'</p><p id="id1">'+(item.id1)+'</p><break></break>'+'<p id="note">'+title+'</p>'+'<p id="noted">'+desc+'</p>'
    // console.log(title)
    node.innerHTML=htm
    if(items.innerHTML==="<p>No Items</p>")
    items.innerHTML=""
    node.addEventListener('click',this.select)
    node.addEventListener('dblclick',this.open)
    items.appendChild(node)
    if(type)
    {
        let abc=this.storage
        abc[item.id1]=JSON.stringify(item)
        this.storage=abc
        // this.storage.push(JSON.stringify(item))
        this.save()
        require('electron').remote.getCurrentWindow().reload()

    }
}}

this.storage.forEach(item=>{
    this.addItems(JSON.parse(item),false)
})