const io = require('socket.io'); 

let socketIO
exports.initIO = httpServer =>{
    socketIO = io(httpServer)
    return socketIO;
}

exports.getIO = () =>{
    if (!socketIO) { throw new Error('SocketIO not initialized')}
    return socketIO;
}

