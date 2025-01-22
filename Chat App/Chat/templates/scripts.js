document.addEventListener('DOMContentLoaded', (event) => {
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.querySelector('.chat-messages');
    const userList = document.getElementById('user-list');
    const socket = new WebSocket('ws://' + window.location.host + '/ws/chat/');

    // Fetch and display all registered users
    fetch('/users/')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.username;
                li.dataset.userId = user.id;
                li.addEventListener('click', () => initiateChat(user.id));
                userList.appendChild(li);
            });
        });

    // Message from server
    socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        outputMessage(data.message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Message submit
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = e.target.elements.msg.value;
        socket.send(JSON.stringify({ 'message': msg }));
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    });

    // Output message to DOM
    function outputMessage(message) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(div);
    }

    // Initiate chat with a user
    function initiateChat(userId) {
        fetch(`/chat/${userId}/messages/`)
            .then(response => response.json())
            .then(messages => {
                chatMessages.innerHTML = '';
                messages.forEach(message => {
                    outputMessage(message.text);
                });
            });
    }
});