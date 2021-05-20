const io = require('socket.io')(3000, {
    cors: {
        origin: "*",
      },
})

const users = {}

io.on('connection', socket => {
    socket.on('new-user', Name => {
      users[socket.id] = Name
      socket.broadcast.emit('user-connected', Name)
    })
    socket.on('send-chat-message', message => {
      socket.broadcast.emit('chat-message', { message: message, Name: users[socket.id] })
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users[socket.id]
    })
  })