const openWindow = require('./open')
let items = document.getElementById("items")
const {app,BrowserWindow} = require('electron').remote

exports.storage = JSON.parse(localStorage.getItem('items_saved')) || []

exports.save = () =>{
    localStorage.setItem('items_saved',JSON.stringify(this.storage))
}
// let count = JSON.parse  (Buffer.concat(this.storage).toString()).length 
// console.log(count)

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
    let node = document.createElement('div')
    node.setAttribute('class','read-item')
    // console.log(item.title)
    node.innerHTML='<img src='+(item.scrshot)+'><h2>'+(item.title)+'</h2><p id="url1">'+(item.url)+'</p><p id="id1">'+(item.id1)+'</p>'
    if(items.innerHTML==="<p>No Items</p>")
    items.innerHTML=""
    node.addEventListener('click',this.select)
    node.addEventListener('dblclick',this.open)
    items.appendChild(node)
    if(type)
    {
        this.storage.push(JSON.stringify(item))
        this.save()
    }
    // console.log(JSON.parse(localStorage.getItem('items_saved')).length) 
}

this.storage.forEach(item=>{
    // console.log(JSON.parse(item))
    this.addItems(JSON.parse(item),false)
})