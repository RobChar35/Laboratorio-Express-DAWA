// Conexion al servidor de socket.io
const socket = io()

// Manejo del evento 'chatMessage' cuando se recibe un mensaje de chat del servidor
socket.on('chatMessage', (message) => {
    const messagesContainer = document.getElementById('messages')
    const messagesElement = document.createElement('div')
    
    messagesElement.textContent = message
    messagesContainer.appendChild(messagesElement)
})

// Manejo del evento de envio de formulario para enviar un mensaje de chat
document.getElementById('chatForm').addEventListener('submit', (event) => {
    event.preventDefault()
    
    const messageInput = document.getElementById('messageInput')
    const message = messageInput.value
    messageInput.value = ''

    socket.emit('chatMessage', message)
})