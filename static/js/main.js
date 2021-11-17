const socket = io()
const msg = document.querySelector('.msg')
const form = document.querySelector('.form')
const name = document.querySelector('.name')
const text = document.querySelector('.comment')


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("comments.json", (text) => {
    var data = JSON.parse(text)
    data['comments'].forEach(element => {
        const item = document.createElement('li')
        item.innerHTML = `<span>${element.name}</span>: ${element.comment}`
        msg.insertBefore(item, msg.firstChild); 
    })
});

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (text.value && name.value) {
        socket.emit('comment', {
            message: text.value,
            name: name.value
        })
        text.value = ''
    }
})

socket.on('comment', (data) => {
    const item = document.createElement('li')
    item.innerHTML = `<span>${data.name}</span>: ${data.message}`
    msg.insertBefore(item, msg.firstChild);
})