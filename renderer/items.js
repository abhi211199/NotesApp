let items = document.getElementById("items")

exports.storage = JSON.parse(localStorage.getItem('items_saved')) || []

exports.save = () =>{
    localStorage.setItem('items_saved',JSON.stringify(this.storage))
}


exports.addItems = item =>{
    let node = document.createElement('div')
    node.setAttribute('class','read-item')
    // console.log(item.title)
    node.innerHTML='<img src='+(item.scrshot)+'><h2>'+(item.title)+'</h2>'
    if(items.innerHTML==="<p>No Items</p>")
    items.innerHTML=""
    items.appendChild(node)
    this.storage.push(JSON.stringify(item))
    this.save()
    // console.log(JSON.parse(localStorage.getItem('items_saved')))
    // localStorage.setItem('items_saved',JSON.stringify(this.storage))

    // abc()
    // localStorage.clear()
    // console.log(items.innerHTML)
}