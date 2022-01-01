const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port)
console.log('port ', port);

const { initIO } = require('./controllers/messages')

const socketIO = initIO(server)

socketIO.on('connection', socket => {
    socket.emit('reqId')
    socket.on('resId', id => {
        console.log('Client connected', id)
    })
})
