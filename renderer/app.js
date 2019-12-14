const {ipcRenderer}=require('electron')
const {globalShortcut,Menu,MenuItem,clipboard}=require('electron').remote
const items = require('./items')

let showModal=document.getElementById('show-modal'),
    hideModal=document.getElementById('close-modal'),
    Modal=document.getElementById('modal'),
    add=document.getElementById('add-item'),
    url=document.getElementById('url'),
    note=document.getElementById('note1'),
    noted=document.getElementById('noted1'),
    search=document.getElementById('search'),
    del=document.getElementById('del');

    const storage = function() { return(JSON.parse(localStorage.getItem('items_saved')) || []);};

    
var flag
   
//focus set on search box
search.onfocus=function() {flag=1}
note.onfocus=function() {flag=3}
noted.onfocus=function() {flag=4}

//search logic
search.addEventListener('keyup',e=>{
    Array.from(document.getElementsByClassName('read-item')).forEach(item=>{
        if(item.innerText.toLowerCase().includes(search.value))
        item.style.display='flex'
        else
        item.style.display='none'
    })
})

//show-modal logic
showModal.addEventListener('click',e=>{
    Modal.style.display='flex'
    url.onfocus=function(){flag=2}//pointer bydefault in url box
})

//hide-modal logic
hideModal.addEventListener('click',e=>{
    Modal.style.display='none'
})

function fx()
{
        if(url.value!==''||note.value!==''||noted.value!==''){
            if(url.value!=''&&alertOnlineStatus()==='online')
            {
                add.innerText="Saving"
                var count = storage().length
                console.log(noted.value)
                ipcRenderer.send("url_fetch",{url1:url.value,note:note.value,noted:noted.value,ids:count})
            }
            else if(url.value!=''&&alertOnlineStatus()==='offline'){
                window.alert('Connection Offline! Please check your connection.')
            }
            else{
                add.innerText="Saving"
                var count = storage().length
                ipcRenderer.send("url_fetch",{url1:url.value,note:note.value,noted:noted.value,ids:count})
    }}
        else{
            url.placeholder='Please enter a valid URL to continue!'
            note.placeholder='Please enter a valid title to contiue!'
            noted.placeholder='Please enter a valid description to continue'
        }
    //the ipc msgs are used coz the readpage.js creates BrowserWindow which is inaccessable from renderer process
    //it may be accessed from renderer if remote is used.
}

//add-item logic
add.addEventListener('click',e =>{fx()});

//hitting enter on url box submits and hitting esc hides modal
url.addEventListener('keyup',e=>{
    if(e.key==='Enter')
    fx()
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

//deletion login
del.addEventListener('click',e=>{
    var a = document.getElementsByClassName('read-item selected')
    var i
    for(i=0;i<a.length;i++)
    {
        var aaa=storage()
        aaa[a[i].querySelector('#id1').innerText]=null
        localStorage.setItem("items_saved",JSON.stringify(aaa))
        a[i].classList.add('deleted')
    }
})

const alertOnlineStatus = () => {
    return (navigator.onLine ? 'online' : 'offline')
  }

note.addEventListener('keyup',e=>{
    if(e.key==='Enter')
    add.click()
})

noted.addEventListener('keyup',e=>{
    if(e.key==='Enter')
    add.click()
})

globalShortcut.register('Control+N', () => {
    // console.log('CommandOrControl+X is pressed')
    showModal.click()
  })


const menu = new Menu()
menu.append(new MenuItem({ label: 'Paste', click() { 
    if(flag==1)
    search.value=search.value.concat(clipboard.readText())
    else if(flag==2)
    url.value=url.value.concat(clipboard.readText())
    else if(flag==3)
    note.value=note.value.concat(clipboard.readText())
    else if(flag==4)
    noted.value=noted.value.concat(clipboard.readText())
    
} }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))
  
window.addEventListener('contextmenu', (e) => {
   e.preventDefault()
   menu.popup({ window: require('electron').remote.getCurrentWindow() })
}, false)

