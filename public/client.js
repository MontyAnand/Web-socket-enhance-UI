var socket = io();
let name;

let textarea = document.querySelector('#textarea');

let messageArea = document.querySelector('#message-area');


do {
    name = prompt("please Enter your name");
} while (!name);


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(msg) {
    let message = {
        user: name,
        message: msg.trim()
    }
    // Append to 
    appendMessage(message, 'outgoing');
    textarea.value = '';
    scrllToBottom();

    // Send to server
    socket.emit('message', message);
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('li');
    mainDiv.classList.add('d-flex', 'justify-content-between', 'mb-4');
    let markupLeft = `
    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                    class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
                                <div class="card mask-custom">
                                    <div class="card-header d-flex justify-content-between p-3"
                                        style="border-bottom: 1px solid rgba(255,255,255,.3);">
                                        <p class="fw-bold mb-0">${msg.user}</p>
                                        <p class="text-light small mb-0"><i class="far fa-clock"></i> 12 mins ago</p>
                                    </div>
                                    <div class="card-body">
                                        <p class="mb-0">
                                            ${msg.message}
                                        </p>
                                    </div>
                                </div>

    `
    let markupRight = `
    <div class="card mask-custom w-100">
    <div class="card-header d-flex justify-content-between p-3"
        style="border-bottom: 1px solid rgba(255,255,255,.3);">
        <p class="fw-bold mb-0">${msg.user}</p>
        <p class="text-light small mb-0"><i class="far fa-clock"></i> 13 mins ago</p>
    </div>
    <div class="card-body">
        <p class="mb-0">
        ${msg.message}
        </p>
    </div>
</div>
<img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
    class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
    `
    if(type==="outgoing"){
    mainDiv.innerHTML = markupRight;
    }
    else{
        mainDiv.innerHTML = markupLeft;
    }

    messageArea.appendChild(mainDiv);
}

// Receive

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrllToBottom();
});


function scrllToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}