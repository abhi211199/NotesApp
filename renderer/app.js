const {ipcRenderer}=require('electron')
const items = require('./items')

let showModal=document.getElementById('show-modal'),
    hideModal=document.getElementById('close-modal'),
    Modal=document.getElementById('modal'),
    add=document.getElementById('add-item'),
    url=document.getElementById('url');

//show-modal logic
showModal.addEventListener('click',e=>{
    Modal.style.display='flex'
    url.focus()//pointer bydefault in url box
})

//hide-modal logic
hideModal.addEventListener('click',e=>{
    Modal.style.display='none'
})

//add-item logic
add.addEventListener('click',fx);

function fx()
{
    //send url on add click
    add.innerText="Fetching"
    ipcRenderer.send("url_fetch",url.value)
    //the ipc msgs are used coz the readpage.js creates BrowserWindow which is inaccessable from renderer process
    //it may be accessed from renderer if remote is used.
}
//hitting enter on url box submits and hitting esc hides modal
url.addEventListener('keyup',e=>{
    if(e.key==='Enter')
    fx();
    else if(e.key==='Escape')
    hideModal.click();
})

Modal.addEventListener('keyup',e=>{
    if(e.key==='Escape')
    hideModal.click();
})

//listen response from main process
ipcRenderer.on('url_sent',(e,url)=>{
    add.innerHTML="Add item"
    console.log(url);
    items.addItems(url,true)
})