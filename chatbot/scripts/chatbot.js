function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    // Simulate bot response
    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        appendMessage(botResponse, 'bot-message');
    }, 500);
}

function appendMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
    // Basic responses about Narendra Sharma
    const responses = {
        'hi': 'Hello! How can I assist you?',
        'hello': 'Hi there! What can I do for you?',
        'who are you': 'I am a chatbot created by Narendra Sharma.',
        'who is narendra sharma': 'Narendra Sharma is a frontend web developer skilled in HTML, CSS, JavaScript, PHP, AngularJS, and DBMS.',
        'what are your skills': 'I am skilled in HTML, CSS, JavaScript, PHP, AngularJS, and DBMS.',
        'tell me about your projects': 'I have worked on various projects including an admin product management page, a portfolio webpage, and multiple web applications with various features.',
        'how can i contact you': 'You can contact me through the contact form on my portfolio website.',
        'bye': 'Goodbye! Have a great day!',
    };

    return responses[input.toLowerCase()] || 'I am not sure how to respond to that. Can you please rephrase?';
}
