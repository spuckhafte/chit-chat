const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const userContainer = document.getElementById('list_users')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const Name = document.getElementById('user_name').innerHTML =  prompt('What is your Name?')

joinMessage('You Connected')
socket.emit('new-user', Name)

socket.on('chat-message', data => {
  appendMessage(`${data.Name}: ${data.message}`)
})

socket.on('user-connected', Name => {
    joinMessage(`'${Name}' connected`)
})

socket.on('user-disconnected', Name => {
  joinMessage(`${Name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

function joinMessage(message) {
    const joinElement = document.createElement('div')
    joinElement.innerText = message
    userContainer.append(joinElement)
}
