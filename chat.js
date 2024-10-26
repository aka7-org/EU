// chat.js

// Load and display messages
function loadChatMessages() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Clear chat box

    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${message.user}</strong>: ${message.text}`;
        chatBox.appendChild(messageElement);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send new message and handle HK command to clear chat
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const messageText = chatInput.value.trim();
    const user = localStorage.getItem('username') || 'Anonymous';

    if (messageText.toUpperCase() === "HK") {
        // Clear chat if message is "HK"
        localStorage.removeItem('chatMessages');
        loadChatMessages(); // Refresh chat
        alert("Chat cleared by command.");
        chatInput.value = ''; // Clear input
        return;
    }

    if (messageText !== '') {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push({
            user: user,
            text: messageText,
            timestamp: Date.now()
        });
        
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        chatInput.value = ''; // Clear input after sending

        loadChatMessages(); // Refresh the chat display
    }
}

// Clear old messages every 10 minutes
function clearOldMessages() {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const recentMessages = messages.filter(message => message.timestamp >= tenMinutesAgo);
    
    localStorage.setItem('chatMessages', JSON.stringify(recentMessages));
    loadChatMessages(); // Refresh the chat display
}

// Load chat messages on page load and set interval to clear every 10 minutes
window.onload = () => {
    loadChatMessages();
    setInterval(clearOldMessages, 10 * 60 * 1000);
};
