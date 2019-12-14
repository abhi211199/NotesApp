const {ipcRenderer}=require('electron')
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

//focus set on search box
search.focus()

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
    url.focus()//pointer bydefault in url box
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
    if(e.key=='Enter')
    add.click()
})

noted.addEventListener('keyup',e=>{
    if(e.key=='Enter')
    add.click()
})