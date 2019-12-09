let items = document.getElementById("items")

exports.addItems = item =>{
    let node = document.createElement('div')
    node.setAttribute('class','read-item')
    console.log(item.title)
    node.innerHTML='<img src='+(item.scrshot)+'><h2>'+(item.title)+'</h2>'
    if(items.innerHTML==="<p>No Items</p>")
    items.innerHTML=""
    items.appendChild(node)
    // console.log(items.innerHTML)
}